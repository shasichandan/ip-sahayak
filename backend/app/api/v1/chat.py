from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.api.deps import get_current_user
from app.db.session import get_db
from app.models import AnswerFeedback, Citation, Conversation, Message, User
from app.schemas.chat import (
    ChatRequest,
    ChatResponse,
    CitationOut,
    ConversationDetail,
    ConversationSummary,
    FeedbackCreate,
    MessageOut,
)
from app.middleware.ratelimit import chat_rate_limit_dep
from app.services.guardrails import ABSTENTION_RESPONSE, is_out_of_scope
from app.services.rag.loader import get_rag_engine

router = APIRouter(tags=["chat"], dependencies=[Depends(chat_rate_limit_dep)])

HISTORY_LIMIT = 10


async def _get_owned_conversation(
    conversation_id: int, user: User, db: AsyncSession
) -> Conversation:
    result = await db.execute(
        select(Conversation).where(
            Conversation.id == conversation_id, Conversation.user_id == user.id
        )
    )
    conv = result.scalar_one_or_none()
    if conv is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    return conv


async def _messages_to_out(conversation: Conversation) -> list[MessageOut]:
    return [
        MessageOut(
            id=m.id,
            role=m.role,
            content=m.content,
            structuredResponse=m.structured_response,
            confidenceLevel=m.confidence_level,
            confidenceScore=m.confidence_score,
            confidenceReason=m.confidence_reason,
            supportedClaimsRatio=m.supported_claims_ratio,
            citations=[
                CitationOut(
                    id=c.id,
                    title=c.title,
                    section=c.section,
                    excerpt=c.excerpt,
                    authority=c.authority,
                    category=c.category,
                    relevanceScore=c.relevance_score,
                    pageOrChapter=c.page_or_chapter,
                    sourceUrl=c.source_url,
                    isVerified=c.is_verified,
                )
                for c in m.citations
            ],
            createdAt=m.created_at,
        )
        for m in conversation.messages
    ]


@router.post("/chat", response_model=ChatResponse)
async def chat(
    payload: ChatRequest,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ChatResponse:
    # 1. Resolve conversation
    if payload.conversationId is not None:
        conv = await _get_owned_conversation(payload.conversationId, current_user, db)
        conv.jurisdiction = payload.jurisdiction
        conv.language = payload.language
    else:
        conv = Conversation(
            user_id=current_user.id,
            title=payload.message[:80],
            jurisdiction=payload.jurisdiction,
            language=payload.language,
        )
        db.add(conv)
        await db.flush()

    # 2. Persist user message
    user_msg = Message(
        conversation_id=conv.id, role="user", content=payload.message
    )
    db.add(user_msg)
    await db.flush()

    # 3. Build history and call the RAG engine
    result = await db.execute(
        select(Message)
        .where(Message.conversation_id == conv.id)
        .order_by(Message.created_at.desc(), Message.id.desc())
        .limit(HISTORY_LIMIT)
    )
    history = [
        {"role": m.role, "content": m.content}
        for m in reversed(result.scalars().all())
    ]
    if is_out_of_scope(payload.message):
        structured = dict(ABSTENTION_RESPONSE)
    else:
        engine = get_rag_engine()
        structured = await engine.answer(
            query=payload.message,
            jurisdiction=payload.jurisdiction,  # type: ignore[arg-type]
            language=payload.language,
            history=history,
            context=None,
        )

    # 4. Persist assistant message + citations
    ai_msg = Message(
        conversation_id=conv.id,
        role="assistant",
        content=structured.get("summary", ""),
        structured_response=structured,
        confidence_level=structured.get("confidence"),
        confidence_score=structured.get("confidenceScore"),
        confidence_reason=structured.get("confidenceReason"),
        supported_claims_ratio=structured.get("supportedClaimsRatio"),
    )
    db.add(ai_msg)
    await db.flush()
    for src in structured.get("sources", []):
        db.add(
            Citation(
                message_id=ai_msg.id,
                title=src.get("title", "Untitled source"),
                section=src.get("section"),
                excerpt=src.get("excerpt"),
                authority=src.get("authority"),
                category=src.get("category"),
                relevance_score=src.get("relevanceScore"),
                page_or_chapter=src.get("pageOrChapter"),
                source_url=src.get("sourceUrl"),
            )
        )
    await db.commit()
    await db.refresh(ai_msg)

    citations_out = [
        CitationOut(
            id=c.id, title=c.title, section=c.section, excerpt=c.excerpt,
            authority=c.authority, category=c.category,
            relevanceScore=c.relevance_score, pageOrChapter=c.page_or_chapter,
            sourceUrl=c.source_url, isVerified=c.is_verified,
        )
        for c in ai_msg.citations
    ]

    return ChatResponse(
        conversationId=conv.id,
        userMessage=MessageOut(
            id=user_msg.id, role="user", content=user_msg.content,
            structuredResponse=None, createdAt=user_msg.created_at,
        ),
        assistantMessage=MessageOut(
            id=ai_msg.id,
            role="assistant",
            content=ai_msg.content,
            structuredResponse=ai_msg.structured_response,
            confidenceLevel=ai_msg.confidence_level,
            confidenceScore=ai_msg.confidence_score,
            confidenceReason=ai_msg.confidence_reason,
            supportedClaimsRatio=ai_msg.supported_claims_ratio,
            citations=citations_out,
            createdAt=ai_msg.created_at,
        ),
    )


@router.get("/conversations", response_model=list[ConversationSummary])
async def list_conversations(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> list[ConversationSummary]:
    result = await db.execute(
        select(Conversation)
        .where(Conversation.user_id == current_user.id)
        .order_by(Conversation.updated_at.desc())
        .limit(100)
    )
    return [
        ConversationSummary(
            id=c.id, title=c.title, jurisdiction=c.jurisdiction,
            language=c.language, createdAt=c.created_at, updatedAt=c.updated_at,
        )
        for c in result.scalars().all()
    ]


@router.get("/conversations/{conversation_id}", response_model=ConversationDetail)
async def get_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> ConversationDetail:
    result = await db.execute(
        select(Conversation)
        .options(selectinload(Conversation.messages).selectinload(Message.citations))
        .where(Conversation.id == conversation_id, Conversation.user_id == current_user.id)
    )
    conv = result.scalar_one_or_none()
    if conv is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    return ConversationDetail(
        id=conv.id, title=conv.title, jurisdiction=conv.jurisdiction,
        language=conv.language, createdAt=conv.created_at, updatedAt=conv.updated_at,
        messages=await _messages_to_out(conv),
    )


@router.delete("/conversations/{conversation_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_conversation(
    conversation_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> None:
    conv = await _get_owned_conversation(conversation_id, current_user, db)
    await db.delete(conv)
    await db.commit()


@router.post("/messages/{message_id}/feedback", status_code=status.HTTP_201_CREATED)
async def leave_feedback(
    message_id: int,
    payload: FeedbackCreate,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
) -> dict:
    result = await db.execute(select(Message).where(Message.id == message_id))
    message = result.scalar_one_or_none()
    if message is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Message not found")
    feedback = AnswerFeedback(
        message_id=message.id, user_id=current_user.id,
        rating=payload.rating, comment=payload.comment,
    )
    db.add(feedback)
    await db.commit()
    return {"id": feedback.id, "status": "recorded"}

"""
Verification Suite for IP-Sahayak RAG-First + LLM-Fallback Architecture.
Directly verifies the 8 test cases specified in the user request.
"""

import asyncio
import os
import sys
from pathlib import Path

# Fix Windows console UTF-8 output
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

backend_dir = Path(__file__).resolve().parents[1] / "backend"
sys.path.insert(0, str(backend_dir))

from app.services.rag.production_engine import ProductionRAGEngine


async def run_tests():
    print("=" * 70)
    print(" IP-SAHAYAK: RAG-FIRST + LLM-FALLBACK VERIFICATION")
    print("=" * 70)

    engine = ProductionRAGEngine()

    test_cases = [
        {
            "id": "TEST-1",
            "name": "Natural greeting (Small Talk)",
            "query": "Hi",
            "lang": "en",
            "expected_source": "small_talk",
            "forbidden_phrases": ["not in database", "not found in database", "information not available"],
            "required_keywords": ["Hi", "IP-Sahayak", "Ayurveda"],
        },
        {
            "id": "TEST-2",
            "name": "Telugu: Dinacharya definition (RAG)",
            "query": "Dinacharya ante enti?",
            "lang": "te",
            "expected_source": "rag",
            "forbidden_phrases": ["not in database", "not found"],
            "required_keywords": ["Dinacharya", "ఆయుర్వేదం", "రోజువారీ"],
        },
        {
            "id": "TEST-3",
            "name": "Telugu: Ritucharya definition (RAG)",
            "query": "Ritucharya ante enti?",
            "lang": "te",
            "expected_source": "rag",
            "forbidden_phrases": ["not in database", "not found"],
            "required_keywords": ["Ritucharya", "ఋతువులకు అనుగుణంగా"],
        },
        {
            "id": "TEST-4",
            "name": "Telugu: Vesavilo Ayurveda em cheyyali (RAG - GRISHMA)",
            "query": "Vesavilo Ayurveda prakaram em cheyyali?",
            "lang": "te",
            "expected_source": "rag",
            "forbidden_phrases": ["not in database", "not found"],
            "required_keywords": ["గ్రీష్మ", "వేడి", "ద్రవాలు"],
        },
        {
            "id": "TEST-5",
            "name": "Panchakarma (LLM Fallback - Not in DB)",
            "query": "What is Panchakarma?",
            "lang": "en",
            "expected_source": "llm",
            "forbidden_phrases": ["not in database", "not found in database", "not available in the database"],
            "required_keywords": ["Panchakarma", "Ayurveda", "procedures"],
        },
        {
            "id": "TEST-6",
            "name": "Who are you? (Small Talk / Identity)",
            "query": "Who are you?",
            "lang": "en",
            "expected_source": "small_talk",
            "forbidden_phrases": ["not in database", "not found"],
            "required_keywords": ["IP-Sahayak", "AI assistant", "Ayurveda"],
        },
        {
            "id": "TEST-7",
            "name": "Thank you (Small Talk / Gratitude)",
            "query": "Thank you",
            "lang": "en",
            "expected_source": "small_talk",
            "forbidden_phrases": ["not in database", "not found"],
            "required_keywords": ["welcome"],
        },
        {
            "id": "TEST-8",
            "name": "Percentage query (No invented statistics)",
            "query": "Dinacharya improves health by what percentage?",
            "lang": "en",
            "expected_source": "rag",
            "forbidden_phrases": ["improves health by 50%", "50%", "70%", "80%"],
            "required_keywords": ["not provide a specific percentage", "cannot be manufactured"],
        },
    ]

    passed = 0
    failed = 0

    for tc in test_cases:
        print(f"\n[{tc['id']}] {tc['name']}")
        print(f"  User Query:      '{tc['query']}'")

        res = await engine.answer(
            query=tc["query"],
            language=tc["lang"],
            session_id=f"session_{tc['id']}",
        )

        answer = res.get("summary") or res.get("answer", "")
        actual_source = res.get("source")
        retrieved_count = res.get("retrieved_chunks_count", 0)

        print(f"  Routed Source:   {actual_source} (Expected: {tc['expected_source']})")
        print(f"  Retrieved Chunks:{retrieved_count}")
        print(f"  Answer Snippet:  {answer[:120]}...")

        # 1. Verify source matches
        source_ok = actual_source == tc["expected_source"]
        if not source_ok:
            print(f"  ❌ FAILED: Expected source '{tc['expected_source']}' but got '{actual_source}'")

        # 2. Verify no forbidden phrases appear
        forbidden_found = [p for p in tc["forbidden_phrases"] if p.lower() in answer.lower()]
        if forbidden_found:
            print(f"  ❌ FAILED: Forbidden phrase found in response: {forbidden_found}")

        # 3. Verify required keywords
        missing_kw = [k for k in tc["required_keywords"] if k.lower() not in answer.lower()]
        if missing_kw:
            print(f"  ❌ FAILED: Missing required keywords: {missing_kw}")

        if source_ok and not forbidden_found and not missing_kw:
            print("  ✅ PASSED")
            passed += 1
        else:
            failed += 1

    print("\n" + "=" * 70)
    print(f" RESULTS: {passed} PASSED, {failed} FAILED (TOTAL: {len(test_cases)})")
    print("=" * 70)

    if failed == 0:
        print(" 🎉 ALL 8 CORE TEST CASES PASSED WITH 100% COMPLIANCE!")
    else:
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(run_tests())

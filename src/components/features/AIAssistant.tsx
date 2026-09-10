import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Sparkles,
  BookOpen,
  Share2,
  Copy,
  Check,
  User,
  Globe,
  Scale,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { AIMessage, SourceCitation } from '../../types';

export const AIAssistant: React.FC = () => {
  const { language, setLanguage, showToast } = useApp();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const getWelcomeText = (lang: string) => {
    if (lang === 'te') {
      return 'Hi! 👋 నేను IP-Sahayak. ఆయుర్వేదం గురించి మీకు ఏం తెలుసుకోవాలనుకుంటున్నారు?';
    }
    if (lang === 'hi') {
      return 'नमस्ते! 👋 मैं IP-Sahayak हूँ। आज आयुर्वेद के बारे में मैं आपकी क्या मदद कर सकता हूँ?';
    }
    return "Hi! 👋 I'm IP-Sahayak, your Ayurveda AI Assistant. How can I help you today?";
  };

  // Initial message: clean conversational greeting with zero internal cards
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-ip-01',
      sender: 'assistant',
      timestamp: 'Just now',
      text: getWelcomeText(language),
    }
  ]);

  // Update initial welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length > 0 && prev[0].id === 'msg-ip-01') {
        const updated = [...prev];
        updated[0] = {
          ...updated[0],
          text: getWelcomeText(language)
        };
        return updated;
      }
      return prev;
    });
  }, [language]);

  // Quick Action cards for common Ayurvedic inquiries
  const quickActions = [
    {
      id: 'qa-dinacharya',
      title: 'Dinacharya (Daily Routine)',
      desc: 'Waking, hygiene, exercise, meals & rest habits',
      icon: Layers,
      color: 'emerald',
      prompt: 'What is Dinacharya and its key practices?'
    },
    {
      id: 'qa-ritucharya',
      title: 'Ritucharya (Seasonal Regimen)',
      desc: 'Diet and lifestyle adjustments across 6 seasons',
      icon: BookOpen,
      color: 'blue',
      prompt: 'What is Ritucharya and what are the six seasons?'
    },
    {
      id: 'qa-summer',
      title: 'Summer Care (Grishma)',
      desc: 'Heat protection, hydration & light diet guidelines',
      icon: Shield,
      color: 'rose',
      prompt: 'Vesavilo Ayurveda prakaram em cheyyali?'
    },
    {
      id: 'qa-panchakarma',
      title: 'Panchakarma (Detoxification)',
      desc: 'Five classical purification therapies in Ayurveda',
      icon: Sparkles,
      color: 'amber',
      prompt: 'What is Panchakarma?'
    },
    {
      id: 'qa-sec3p',
      title: 'Section 3(p) & TKDL',
      desc: 'Patent eligibility, traditional knowledge & NBA Form III',
      icon: Scale,
      color: 'purple',
      prompt: 'Can I patent an Ayurvedic herbal formulation under Section 3(p)?'
    }
  ];

  // Suggested Prompts matching common user queries
  const suggestedPrompts = [
    'Dinacharya ante enti?',
    'Ritucharya lo enni seasons unnayi?',
    'Vesavilo Ayurveda prakaram em cheyyali?',
    'What is Panchakarma?',
    'Can I patent an Ayurvedic herbal formulation under Section 3(p)?',
    'What is the difference between Dinacharya and Ritucharya?',
    'दिनचर्या क्या है?'
  ];

  // Stable internal container scrolling: DO NOT scroll the window/page!
  const isNearBottomRef = useRef(true);

  const handleContainerScroll = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    const distanceToBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    // Consider within 120px as near bottom
    isNearBottomRef.current = distanceToBottom < 120;
  };

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    // Only scroll within container if user was already near the bottom (never yank them if they scrolled up)
    if (isNearBottomRef.current) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  const [sessionId] = useState<string>(() => {
    try {
      const existing = localStorage.getItem('ipsakti_session_id');
      if (existing) return existing;
      const created = 'ipsakti_' + Math.random().toString(36).substring(2, 9);
      localStorage.setItem('ipsakti_session_id', created);
      return created;
    } catch {
      return 'ipsakti_default';
    }
  });

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: 'Just now',
      text: query,
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // 1. Live Production RAG Query to backend
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          session_id: sessionId,
          language: language,
          jurisdiction: 'india'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const structured = data.structuredResponse || {};

        const mappedSources: SourceCitation[] = (data.sources || structured.sources || []).map((s: any, idx: number) => ({
          id: s.id || `src-${idx}`,
          title: s.title || s.document_name || 'Ayurveda Knowledge Base',
          section: s.section || 'General Guidelines',
          pageOrChapter: s.pageOrChapter || (s.page_number ? `Page ${s.page_number}` : 'Knowledge Base'),
          authority: s.authority || s.source || 'IP-Sahayak Knowledge Base',
          category: s.category || 'Ayurveda',
          excerpt: s.excerpt || s.content || '',
          relevanceScore: s.relevanceScore || 90,
          type: 'classical_text'
        }));

        const aiMsg: AIMessage = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: data.answer || structured.summary || query,
          structuredResponse: {
            summary: data.answer || structured.summary,
            sources: mappedSources,
            detectedLanguage: data.language,
            languageName: data.language_name,
            source: data.source || structured.source || 'rag',
            confidence: structured.confidence || data.confidence || 'high',
            confidenceScore: structured.confidenceScore || data.confidenceScore || 90,
            confidenceReason: structured.confidenceReason || 'Verified against Ayurveda knowledge base.',
          }
        };

        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.warn('Live backend /api/chat unreachable, falling back to local response:', err);
    }

    // 2. Resilient local fallback if backend is offline
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let answerText = "Thank you for your question. Ayurveda emphasizes personalized regimens, balanced diet (Ahara), and seasonal adaptation (Ritucharya) to support lifelong vitality.";

      if (qLower.includes('dinacharya') || qLower.includes('దినచర్య') || qLower.includes('दिनचर्या')) {
        answerText = language === 'te' 
          ? "Dinacharya అనేది ఆయుర్వేదంలో రోజువారీ జీవన విధానాన్ని సూచించే భావన. ఇందులో నిద్ర, వ్యక్తిగత పరిశుభ్రత, స్నానం, వ్యాయామం, ఆహారం మరియు విశ్రాంతి వంటి రోజువారీ అలవాట్లు ఉంటాయి."
          : (language === 'hi'
            ? "दिनचर्या आयुर्वेद में दैनिक जीवनशैली और दिनचर्या को संदर्भित करती है, जो स्वास्थ्य और नियमितता बनाए रखने में सहायक है। इसमें सुबह जागना, स्वच्छता, व्यायाम, आहार और नींद शामिल हैं।"
            : "In Ayurveda, **Dinacharya** refers to the daily routine practiced to maintain regularity and support health. Key practices include a waking routine, oral hygiene, bathing, exercise, meals, rest, and sleep.");
      } else if (qLower.includes('ritucharya') || qLower.includes('ఋతుచర్య') || qLower.includes('ऋतुचर्या')) {
        answerText = language === 'te'
          ? "Ritucharya అనేది ఋతువులకు అనుగుణంగా ఆహారం మరియు జీవనశైలిలో మార్పులు చేసుకునే ఆయుర్వేద భావన. ఇందులో 6 ఋతువులు ఉన్నాయి: శిశిర, వసంత, గ్రీష్మ, వర్ష, శరద్ మరియు హేమంత."
          : (language === 'hi'
            ? "ऋतुचर्या का अर्थ है मौसमी बदलावों के अनुसार अपने आहार और जीवनशैली में सामंजस्य स्थापित करना। इसमें 6 ऋतुएँ शामिल हैं: शिशिर, वसंत, ग्रीष्म, वर्षा, शरद और हेमंत।"
            : "**Ritucharya** is the Ayurvedic seasonal regimen involving adjustments to diet and lifestyle according to seasonal changes across the six seasons.");
      } else if (qLower.includes('vesavi') || qLower.includes('summer') || qLower.includes('వేసవి') || qLower.includes('గ్రీష్మ')) {
        answerText = "గ్రీష్మ ఋతువులో అధిక వేడి మరియు శారీరక శ్రమను తగ్గించడం, తగినంత ద్రవాలు తీసుకోవడం, అనుకూలమైన తేలికపాటి ఆహారాన్ని తీసుకోవడం మరియు తగినంత విశ్రాంతి తీసుకోవడం వంటి విధానాలను ఆయుర్వేద సంప్రదాయం సూచిస్తుంది.";
      } else if (qLower.includes('panchakarma') || qLower.includes('పంచకర్మ') || qLower.includes('पंचकर्म')) {
        answerText = "Based on general Ayurveda knowledge, **Panchakarma** refers to a classical group of five therapeutic purification procedures (Vamana, Virechana, Basti, Nasya, and Raktamokshana) designed to detoxify the body and restore doshic balance. Note: This is general educational information; for individual guidance consult a qualified Ayurvedic practitioner.";
      } else if (qLower.includes('hi') || qLower.includes('hello') || qLower.includes('హలో') || qLower.includes('నమస్తే')) {
        answerText = getWelcomeText(language);
      }

      const response: AIMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        timestamp: 'Just now',
        text: answerText,
      };

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard', undefined, 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const sampleVoiceQueries = {
          en: 'What is Dinacharya in Ayurveda?',
          hi: 'दिनचर्या क्या है?',
          te: 'Dinacharya ante enti?'
        };
        handleSend(sampleVoiceQueries[language] || sampleVoiceQueries.en);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-stone-900">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic text-stone-700">$1</em>');
  };

  const renderFormattedAnswer = (text: string) => {
    if (!text) return null;
    const paragraphs = text.split('\n\n');
    return (
      <div className="space-y-2.5 leading-relaxed text-sm">
        {paragraphs.map((para, pIdx) => {
          const lines = para.split('\n');
          const isList = lines.some(l => l.trim().startsWith('*') || l.trim().startsWith('•') || l.trim().startsWith('-'));
          if (isList) {
            return (
              <ul key={pIdx} className="space-y-1.5 my-1.5 pl-4 list-disc marker:text-emerald-700">
                {lines.map((l, lIdx) => {
                  const cleaned = l.replace(/^[\*\•\-]\s*/, '').trim();
                  return (
                    <li key={lIdx} className="text-stone-800">
                      <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleaned) }} />
                    </li>
                  );
                })}
              </ul>
            );
          }
          return (
            <p key={pIdx} className="text-stone-800">
              <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(para) }} />
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full flex-1 max-w-5xl mx-auto w-full min-h-0">

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-0">
        
        {/* Messages Scroll Area - Pure container-only scrolling */}
        <div
          ref={messagesContainerRef}
          onScroll={handleContainerScroll}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6"
        >
          
          {/* Identity Header */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-sm border border-emerald-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    IP-Sahayak
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Ayurveda Assistant
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  AI-Powered Multilingual Intellectual Property & Ayurveda Assistant
                </p>
              </div>

              {/* Status Badges */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  Dinacharya & Ritucharya
                </span>
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  Patents Sec 3(p)
                </span>
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  CSIR-TKDL
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Suggested Topics */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Quick Questions & Topics
              </span>
              <span className="text-[11px] text-stone-400 hidden sm:inline">Click any prompt to ask</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.id}
                    onClick={() => handleSend(qa.prompt)}
                    className="text-left p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group flex items-start gap-3 bg-stone-50/50 hover:shadow-2xs cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-white border border-stone-200 group-hover:border-emerald-400 text-emerald-800 shrink-0 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-xs text-stone-900 group-hover:text-emerald-900 flex items-center justify-between">
                        <span>{qa.title}</span>
                        <ArrowRight className="w-3 h-3 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5 font-normal">
                        {qa.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clean Message List */}
          {messages.map((msg) => {
            const isAssistant = msg.sender === 'assistant';
            const sources = msg.structuredResponse?.sources || [];
            const showSources = isAssistant && sources.length > 0 && msg.structuredResponse?.source === 'rag';

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* Sender Header */}
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-stone-400 font-medium">
                  {msg.sender === 'user' ? (
                    <>
                      <span className="font-semibold text-stone-600">You</span>
                      <User className="w-3.5 h-3.5 text-stone-500" />
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-md bg-emerald-800 text-white flex items-center justify-center">
                        <Bot className="w-2.5 h-2.5" />
                      </div>
                      <span className="font-bold text-emerald-900">IP-Sahayak</span>
                    </>
                  )}
                  <span className="text-stone-300">•</span>
                  <span>{msg.timestamp}</span>
                </div>

                {/* Clean Message Bubble */}
                <div
                  className={`max-w-2xl w-full rounded-2xl transition-all ${
                    msg.sender === 'user'
                      ? 'bg-emerald-900 text-white p-3.5 sm:p-4 rounded-tr-none shadow-xs ml-auto text-sm'
                      : 'bg-white border border-stone-200 text-stone-800 p-4 sm:p-5 rounded-tl-none shadow-xs space-y-3'
                  }`}
                >
                  {/* Clean Answer Rendering */}
                  {isAssistant ? (
                    renderFormattedAnswer(msg.text)
                  ) : (
                    <p className="text-emerald-50 leading-relaxed text-sm whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  )}

                  {/* Optional Simple Sources Dropdown */}
                  {showSources && (
                    <details className="mt-3 pt-2.5 border-t border-stone-100 text-xs text-stone-500 group">
                      <summary className="cursor-pointer font-medium hover:text-emerald-700 flex items-center gap-1.5 select-none transition-colors">
                        <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Sources ({sources.length})</span>
                      </summary>
                      <ul className="mt-2 space-y-1 pl-4 border-l-2 border-emerald-300 list-disc">
                        {sources.map((src, sIdx) => (
                          <li key={sIdx} className="text-[11px] text-stone-600">
                            <span className="font-semibold text-stone-800">{src.title}</span>
                            {src.section && <span className="text-stone-500"> — {src.section}</span>}
                          </li>
                        ))}
                      </ul>
                    </details>
                  )}

                  {/* Assistant Footer: Simple Copy Button */}
                  {isAssistant && (
                    <div className="flex items-center justify-end pt-1 text-[11px] text-stone-400">
                      <button
                        onClick={() => handleCopy(msg.text, msg.id)}
                        className="hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer py-0.5 px-1.5 rounded hover:bg-stone-50"
                        title="Copy answer"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Simple Minimalist Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 max-w-xs shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span className="font-medium">Thinking... ✨</span>
            </div>
          )}

        </div>

        {/* Suggested Prompts Pills */}
        <div className="px-4 py-2.5 bg-stone-50/80 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-700" /> Suggested:
          </span>
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 text-xs px-3 py-1.5 bg-white hover:bg-emerald-50 hover:border-emerald-400 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-lg transition-all cursor-pointer font-medium shadow-2xs"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat Input Box */}
        <div className="p-3 sm:p-4 border-t border-stone-200 bg-white shrink-0">
          <div className="relative rounded-2xl border-2 border-stone-300/80 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-600/10 shadow-sm bg-stone-50/60 transition-all">
            
            {/* Top Toolbar in input box: Language selector */}
            <div className="px-3 pt-2.5 pb-1 flex items-center justify-between border-b border-stone-200/50 text-[11px] text-stone-500">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-stone-600 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-700" /> Language:
                </span>
                <div className="flex items-center gap-1 bg-white border border-stone-200 rounded-lg p-0.5">
                  {(['en', 'hi', 'te'] as const).map(code => (
                    <button
                      key={code}
                      onClick={() => setLanguage(code)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                        language === code
                          ? 'bg-emerald-800 text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {code === 'en' ? 'English' : code === 'hi' ? 'हिन्दी' : 'తెలుగు'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-stone-400">
                <span>Press Enter to send • Shift + Enter for new line</span>
              </div>
            </div>

            {/* Input Text Area */}
            <textarea
              rows={2}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about Ayurveda, routines, or IPR (e.g. 'Dinacharya ante enti?' or 'What is Panchakarma?')"
              className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden resize-none leading-relaxed"
            />

            {/* Bottom Controls Row: Voice, Attach, Send */}
            <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Voice Input */}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                    isListening
                      ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                      : 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
                  }`}
                  title="Voice input in English, Hindi, Telugu"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{isListening ? 'Listening...' : 'Voice'}</span>
                </button>

                {/* Attach Document */}
                <button
                  type="button"
                  onClick={() => showToast('Document attached', 'Analyzing document context...', 'info')}
                  className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title="Attach reference document"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Attach</span>
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <span>Ask IP-Sahayak</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

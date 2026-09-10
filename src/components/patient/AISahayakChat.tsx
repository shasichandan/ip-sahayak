import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import {
  Bot,
  Send,
  Mic,
  Paperclip,
  Sparkles,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  Stethoscope,
  Bookmark,
  Share2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  User,
  Info,
  Globe,
  ScrollText,
  Volume2
} from 'lucide-react';
import { AIMessage, SourceCitation, ConfidenceLevel } from '../../types';
import { classicalCitations } from '../../data/mockData';

export const AISahayakChat: React.FC = () => {
  const { language, setLanguage, t, saveAnswer, showToast, setInspectSourceChain } = useApp();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initial messages state with rich structured response
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-01',
      sender: 'assistant',
      timestamp: 'Just now',
      text: language === 'te' 
        ? 'నమస్కారం! నేను మీ ఏఐ ఆయుర్వేద సహాయక్. ఆయుర్వేద మూలికలు, ఆహార నియమాలు లేదా మీ ప్రిస్క్రిప్షన్ గురించి ఏదైనా అడగండి.'
        : language === 'hi'
        ? 'नमस्ते! मैं आपका एआई आयुर्वेद सहायक हूँ। शास्त्रीय औषधियों, आहार या अपने स्वास्थ्य के संबंध में कुछ भी पूछें।'
        : 'Namaste! I am your AI Sahayak. Ask anything about Ayurveda principles, formulations, diet, herbs or understanding your active prescription.',
      structuredResponse: {
        ayurvedicPerspective: 'Ayurveda views health as Swastha: a harmonious equilibrium between the three Doshas (Vata, Pitta, Kapha), balanced Agni (digestive metabolism), and tranquil mental faculties (Prasanna Atma-Indriya-Manah).',
        generalInfo: 'I can assist you with classical text references (Charaka Samhita, Sushruta Samhita), understanding prescribed herbs, identifying incompatible food pairings (Viruddha Ahara), and finding verified Vaidyas near you.',
        safetyConsiderations: 'AI Sahayak is purely educational. It never replaces physical clinical examination or independently prescribes medicines.',
        whenToConsult: 'Always consult a qualified BAMS/MD Vaidya for chronic symptoms, acute flare-ups, or before starting any new herbal course.',
        confidence: 'high',
        confidenceReason: 'Derived directly from classical Ayurvedic texts and CCRAS research protocols.',
        sources: [classicalCitations.charakaDigestive, classicalCitations.sushrutaTriphala]
      }
    }
  ]);

  const suggestedPrompts = [
    { text: 'Explain my prescription', cat: 'Prescription' },
    { text: 'What is Ashwagandha?', cat: 'Herbs' },
    { text: 'Show Ayurvedic diet principles', cat: 'Diet' },
    { text: 'Is Triphala safe daily?', cat: 'Formulations' },
    { text: 'Find a Vaidya near me', cat: 'Consultation' },
    { text: 'I have severe chest pain and breathlessness', cat: 'Urgent Alert Test' }
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    const userMsg: AIMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: 'Just now',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI synthesis with RAG retrieval
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let response: AIMessage;

      // RED-FLAG SYMPTOM CHECK
      if (qLower.includes('chest pain') || qLower.includes('breathlessness') || qLower.includes('vomiting blood') || qLower.includes('unconscious')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: '⚠ Red-Flag Symptom Detected: Please seek immediate professional medical attention or visit the nearest emergency care facility.',
          structuredResponse: {
            isRedFlag: true,
            redFlagMessage: 'Symptoms like acute chest pain, shortness of breath, or severe pain indicate potential medical emergencies. AI Sahayak strictly refuses non-emergency delay.',
            ayurvedicPerspective: 'In classical emergency surgery (Sushruta Samhita, Sutra Sthana), acute vital complications (Marma-abhighata / Sannipataja Vega) mandate immediate direct clinical intervention.',
            generalInfo: 'Do not rely on home herbs or delay transportation to an emergency hospital.',
            safetyConsiderations: 'Do not consume heavy foods or self-administer untested medications.',
            whenToConsult: 'IMMEDIATELY. Dial 112 or visit the nearest emergency room.',
            confidence: 'high',
            confidenceReason: 'Safety triage protocol enforced.',
            sources: [classicalCitations.ayushRule158B]
          }
        };
      } else if (qLower.includes('ashwagandha')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: 'Ashwagandha (Withania somnifera) is one of Ayurveda’s most revered Balya (strength-promoting) and Medhya Rasayana (neuro-nourishing) adaptogens.',
          structuredResponse: {
            ayurvedicPerspective: 'Classified under Balya and Brihaniya Mahakashaya in Charaka Samhita. It has Ushna virya (heating potency), Madhura vipaka, and pacifies aggravated Vata and Kapha doshas, particularly in Majja (nervous tissue) and Shukra dhatus.',
            generalInfo: 'Traditionally utilized to improve stress resilience, modulate cortisol levels, support nocturnal sleep quality, and enhance physical vitality.',
            safetyConsiderations: 'Should be taken with an Anupana (carrier substance) like warm A2 cow milk or almond milk. Use with caution in hyperthyroidism or severe internal Pitta heat without a physician’s supervision.',
            whenToConsult: 'Consult a Vaidya if you are pregnant, nursing, taking synthetic thyroid hormones, or have active gastric ulcerations.',
            confidence: 'high',
            confidenceReason: 'Consensus across Charaka Samhita, Bhavaprakasha Nighantu, and modern pharmacological reviews.',
            sources: [classicalCitations.charakaRasayana, classicalCitations.tkdlTurmeric]
          }
        };
      } else if (qLower.includes('prescription')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: 'Explanation of your active prescription issued by Dr. S. Kumar (Diagnosis: Pitta-Pradhana Amlapitta):',
          structuredResponse: {
            ayurvedicPerspective: 'Your prescription focuses on Deepana-Pachana (optimizing digestive fire without increasing heat) and Anulomana (gentle downward redirection of toxic Pitta and metabolic Ama).',
            generalInfo: '1. Triphala Churna (3g at bedtime with warm water): Cleanses the colon and pacifies tridosha.\n2. Avipattikar Churna (2.5g before meals): Specifically neutralizes hyperacidity and retrosternal burning.\n3. Ashwagandha Lehyam (1 tsp with warm milk): Restores Ojas and nourishes tissues.',
            safetyConsiderations: 'Maintain at least a 2-hour interval between dinner and bedtime. Never skip meals when taking Avipattikar churna.',
            whenToConsult: 'Reach out to Dr. S. Kumar if you develop nausea or loose motions.',
            confidence: 'high',
            confidenceReason: 'Synthesized directly from active Doctor prescription record #rx-2026-091.',
            sources: [classicalCitations.charakaDigestive, classicalCitations.sushrutaTriphala]
          }
        };
      } else {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Based on classical Ayurvedic texts and CCRAS research monographs regarding "${query}":`,
          structuredResponse: {
            ayurvedicPerspective: 'Ayurveda approaches all health conditions through the lens of Hetu (cause), Linga (symptoms), and Aushadha (corrective lifestyle, diet, and herbology), emphasizing preservation of the digestive Agni.',
            generalInfo: 'Classical principles emphasize customized Dinacharya (daily routine), Ritucharya (seasonal adaptation), and mindful nutrition aligned with your specific Prakriti.',
            safetyConsiderations: 'Herbal herbs act pharmacologically and can interact with modern medications. Avoid self-medicating without proper dosage guidance.',
            whenToConsult: 'Consult a qualified Vaidya for a comprehensive Nadi Pariksha (pulse diagnosis) and individualized care formulation.',
            confidence: 'high',
            confidenceReason: 'Verified against classical knowledge databases and AYUSH pharmacopeial compendiums.',
            sources: [classicalCitations.charakaDigestive, classicalCitations.ayushRule158B]
          }
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 900);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      showToast('Listening in ' + (language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'), 'Speak clearly into your microphone...', 'info');
      setTimeout(() => {
        setIsListening(false);
        const sampleVoiceQueries: Record<string, string> = {
          en: 'What are the benefits of Triphala for digestive wellness?',
          te: 'త్రిఫల చూర్ణం యొక్క ప్రయోజనాలు ఏమిటి?',
          hi: 'त्रिफला चूर्ण के मुख्य लाभ क्या हैं?'
        };
        handleSend(sampleVoiceQueries[language] || sampleVoiceQueries.en);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
      {/* AI Header */}
      <div className="p-3.5 sm:p-4 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-stone-900">AI Sahayak</h2>
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                Classical RAG Engine
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Your multilingual Ayurveda knowledge assistant • Classical sources & verified safety
            </p>
          </div>
        </div>

        {/* Language selector in chat header */}
        <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl p-1 text-xs">
          {(['en', 'te', 'hi'] as const).map(code => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`px-2 py-1 rounded-lg font-semibold transition-all ${
                language === code ? 'bg-emerald-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {code === 'en' ? 'EN' : code === 'te' ? 'తెలుగు' : 'हिन्दी'}
            </button>
          ))}
        </div>
      </div>

      {/* Safety Mandatory Disclaimer Banner */}
      <div className="bg-amber-50/80 border-b border-amber-200/80 px-4 py-2 text-[11px] text-amber-900 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            {t('safetyDisclaimer')}
          </span>
        </div>
        <button
          onClick={() => navigate('/patient/doctors')}
          className="text-amber-900 font-bold underline hover:text-amber-950 shrink-0"
        >
          {t('findVaidya')} →
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.map((msg, mIdx) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label */}
            <div className="flex items-center gap-1.5 mb-1 text-[11px] text-stone-400 font-medium">
              {msg.sender === 'user' ? (
                <>
                  <span>You</span>
                  <User className="w-3 h-3" />
                </>
              ) : (
                <>
                  <Bot className="w-3 h-3 text-emerald-700" />
                  <span className="font-semibold text-emerald-800">AI Sahayak</span>
                </>
              )}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-3xl rounded-2xl p-4 sm:p-5 transition-all ${
                msg.sender === 'user'
                  ? 'bg-emerald-800 text-white rounded-tr-none shadow-xs'
                  : 'bg-stone-50/80 border border-stone-200/80 text-stone-800 rounded-tl-none shadow-2xs space-y-4'
              }`}
            >
              {/* Primary Text */}
              <p className={`text-sm leading-relaxed ${msg.sender === 'user' ? 'text-white' : 'font-semibold text-stone-900'}`}>
                {msg.text}
              </p>

              {/* Red-Flag Alert UI */}
              {msg.structuredResponse?.isRedFlag && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900 space-y-3 animate-pulse">
                  <div className="flex items-center gap-2 font-bold text-rose-800">
                    <AlertTriangle className="w-5 h-5 text-rose-600" />
                    <span>{t('urgentCareWarning')}</span>
                  </div>
                  <p>{msg.structuredResponse.redFlagMessage}</p>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => navigate('/patient/hospitals')}
                      className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Stethoscope className="w-4 h-4" />
                      Find Nearest Emergency Hospital
                    </button>
                    <button
                      onClick={() => navigate('/patient/doctors')}
                      className="px-4 py-2 bg-white border border-rose-300 text-rose-800 font-bold rounded-lg transition-colors"
                    >
                      Consult Doctor Now
                    </button>
                  </div>
                </div>
              )}

              {/* Structured Response Accordion / Blocks */}
              {msg.structuredResponse && !msg.structuredResponse.isRedFlag && (
                <div className="space-y-3 pt-2 text-xs">
                  {/* Confidence Indicator */}
                  <div className="flex items-center justify-between pb-2 border-b border-stone-200/60">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      Evaluation & Classical Consensus:
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {t('confidenceHigh')}
                    </span>
                  </div>

                  {/* Section 1: Ayurvedic Perspective */}
                  {msg.structuredResponse.ayurvedicPerspective && (
                    <div className="p-3 bg-white rounded-xl border border-stone-200/70">
                      <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                        Ayurvedic Perspective & Doshic Action
                      </h4>
                      <p className="text-stone-600 leading-relaxed">
                        {msg.structuredResponse.ayurvedicPerspective}
                      </p>
                    </div>
                  )}

                  {/* Section 2: General Information */}
                  {msg.structuredResponse.generalInfo && (
                    <div className="p-3 bg-white rounded-xl border border-stone-200/70">
                      <h4 className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5 text-blue-700" />
                        General Information & Traditional Utility
                      </h4>
                      <p className="text-stone-600 leading-relaxed whitespace-pre-line">
                        {msg.structuredResponse.generalInfo}
                      </p>
                    </div>
                  )}

                  {/* Section 3: Safety Considerations */}
                  {msg.structuredResponse.safetyConsiderations && (
                    <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60 text-amber-900">
                      <h4 className="font-bold mb-1 flex items-center gap-1.5 text-amber-950">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                        Safety & Contraindications
                      </h4>
                      <p className="leading-relaxed">
                        {msg.structuredResponse.safetyConsiderations}
                      </p>
                    </div>
                  )}

                  {/* Section 4: When to Consult a Vaidya */}
                  {msg.structuredResponse.whenToConsult && (
                    <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60 text-emerald-950">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold flex items-center gap-1.5 text-emerald-900">
                          <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                          When to Consult a Qualified Vaidya
                        </h4>
                        <button
                          onClick={() => navigate('/patient/doctors')}
                          className="text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950"
                        >
                          Book Appointment →
                        </button>
                      </div>
                      <p className="leading-relaxed text-emerald-900/80">
                        {msg.structuredResponse.whenToConsult}
                      </p>
                    </div>
                  )}

                  {/* Section 5: Sources & Provenance Cards */}
                  {msg.structuredResponse.sources && msg.structuredResponse.sources.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] uppercase tracking-wider font-bold text-stone-500 mb-2 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-emerald-700" />
                        {t('sources')} ({msg.structuredResponse.sources.length})
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.structuredResponse.sources.map(src => (
                          <div
                            key={src.id}
                            className="p-3 bg-white rounded-xl border border-stone-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-1">
                                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                  {src.type === 'classical_text' ? 'Classical Text' : 'AYUSH Record'}
                                </span>
                                <button
                                  onClick={() =>
                                    setInspectSourceChain({
                                      claim: msg.text,
                                      source: src.title,
                                      document: src.section,
                                      section: src.pageOrChapter || 'API Ref',
                                      authority: src.authority,
                                      confidence: msg.structuredResponse?.confidence || 'high'
                                    })
                                  }
                                  className="text-[10px] text-stone-500 hover:text-emerald-800 font-semibold flex items-center gap-0.5"
                                  title="View Traceability Chain"
                                >
                                  <span>Verify Chain</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                              </div>
                              <h5 className="font-bold text-stone-900 text-xs">{src.title}</h5>
                              <p className="text-[11px] text-stone-500 mt-0.5">{src.section}</p>
                              <p className="text-[11px] text-stone-600 mt-1 italic line-clamp-2">
                                "{src.excerpt}"
                              </p>
                            </div>

                            <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                              <span>Auth: {src.authority.split('/')[0]}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions Footer: Bookmark / Share */}
                  <div className="flex items-center gap-3 pt-3 border-t border-stone-200/60 text-[11px] text-stone-500">
                    <button
                      onClick={() =>
                        saveAnswer(
                          msg.text.slice(0, 60) + '...',
                          msg.structuredResponse?.ayurvedicPerspective || msg.text,
                          'General Care',
                          msg.structuredResponse?.sources.length || 1
                        )
                      }
                      className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Save to Knowledge
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(msg.text);
                        showToast('Copied answer to clipboard', undefined, 'info');
                      }}
                      className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Share
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleSend(messages[mIdx - 1]?.text || 'Explain further')}
                      className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl max-w-xs border border-stone-200">
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce" />
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-100" />
            <div className="w-2 h-2 rounded-full bg-emerald-600 animate-bounce delay-200" />
            <span className="text-xs text-stone-500 font-medium ml-1">
              Consulting classical Ayurvedic texts...
            </span>
          </div>
        )}
      </div>

      {/* Suggested Prompts Pills */}
      <div className="px-4 py-2 bg-stone-50/70 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-600" /> Suggested:
        </span>
        {suggestedPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.text)}
            className="shrink-0 text-xs px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-lg transition-all"
          >
            {p.text}
          </button>
        ))}
      </div>

      {/* Chat Input Container */}
      <div className="p-3 sm:p-4 border-t border-stone-200 bg-white">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          {/* Microphone Voice Simulation */}
          <button
            type="button"
            onClick={toggleMic}
            className={`p-2.5 rounded-xl border transition-all ${
              isListening
                ? 'bg-rose-600 text-white border-rose-700 animate-pulse'
                : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-600'
            }`}
            title="Voice input in English, Telugu, Hindi"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Attachment button */}
          <button
            type="button"
            onClick={() => showToast('Prescription upload attached', 'Reading prescription image...', 'info')}
            className="hidden sm:flex p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-600 transition-colors"
            title="Attach prescription or lab report"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          {/* Input field */}
          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder={t('askAiPlaceholder')}
            className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all"
          />

          {/* Send Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 sm:px-4 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <span className="hidden sm:inline">Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

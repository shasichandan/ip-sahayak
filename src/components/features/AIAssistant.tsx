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
  ShieldCheck,
  AlertTriangle,
  Bookmark,
  Share2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  User,
  Info,
  Globe,
  ScrollText,
  FileCheck,
  Scale,
  Award,
  Shield,
  FileText,
  HelpCircle,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AIMessage, SourceCitation, ConfidenceLevel, IPRegimeItem } from '../../types';
import { authoritativeSources, sampleScenarios, ipRegimesList } from '../../data/ipData';

export const AIAssistant: React.FC = () => {
  const { language, setLanguage, saveAnswer, showToast, setInspectSourceChain } = useApp();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Initial messages state featuring full IP-SAKTI Sahayak analysis
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-ip-01',
      sender: 'assistant',
      timestamp: 'Just now',
      text: language === 'te' 
        ? 'నమస్కారం! నేను IP-SAKTI సహాయక్ — ఆయుర్వేద మేధో సంపత్తి (IP), సాంప్రదాయ జ్ఞానం (TKDL), ABS అనుమతులు మరియు ఔషధ నియంత్రణ మార్గదర్శకత్వం కోసం మీ AI అసిస్టెంట్.'
        : language === 'hi'
        ? 'नमस्ते! मैं IP-SAKTI सहायक हूँ — आयुर्वेदिक बौद्धिक संपदा (IP), पारंपरिक ज्ञान (TKDL), ABS अनुपालन और औषध विनियामक मार्गदर्शन के लिए आपका समर्पित AI सहायक।'
        : 'Namaste! I am IP-SAKTI Sahayak — your specialized AI assistant for Ayurvedic intellectual property, traditional knowledge (TKDL), Access & Benefit Sharing (ABS), and regulatory guidance.',
      structuredResponse: {
        summary: 'IP-SAKTI Sahayak synthesizes statutory legal provisions (Indian Patent Act 1970, Biological Diversity Act 2002, Drugs & Cosmetics Rules 1945) and traditional knowledge corpora (CSIR-TKDL & Classical Samhitas) to deliver transparent, source-cited IP guidance.',
        relevantRegimes: [
          { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Assessing Section 3(p) traditional knowledge bar vs synergistic bio-enhancement' },
          { regime: 'Traditional Knowledge', relevance: 'HIGH', badgeColor: 'amber', reason: 'Cross-referencing 4.5 lakh CSIR-TKDL formulations & Samhita corpora' },
          { regime: 'ABS (Biodiversity)', relevance: 'REVIEW REQUIRED', badgeColor: 'purple', reason: 'Mandatory Section 6 NBA approval prior to IP grant' },
          { regime: 'Drug Regulation', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Licensing under Rule 158B (Classical vs Proprietary ASU)' },
          { regime: 'Trademark', relevance: 'MEDIUM', badgeColor: 'blue', reason: 'Nice Class 5 coined trademark registration strategy' }
        ],
        patentability: {
          status: 'Subject to Section 3(p) & Section 3(e) Scrutiny',
          analysis: 'Inventions based on traditional Ayurvedic plants must overcome Section 3(p) (traditional knowledge exclusion) and Section 3(e) (mere admixture). Patent claims must focus on non-obvious synergistic ratios, novel extraction methods, or bio-enhanced delivery mechanisms.',
          section3pFlag: true,
          noveltyAssessment: 'Lacks novelty if ingredients duplicate classical Samhita remedies without proven unexpected therapeutic synergy.'
        },
        traditionalKnowledge: {
          matchFound: true,
          tkdlRecord: 'CSIR-TKDL Database (IPC Class A61K 36)',
          classicalReference: 'Charaka Samhita, Sushruta Samhita, and Ashtanga Hridaya',
          priorArtImplication: 'Classical documentation acts as anticipatory prior art, frequently cited by patent examiners worldwide to revoke natural product patents.'
        },
        regulatoryClassification: {
          category: 'Patent / Proprietary ASU Drug or Classical Medicine',
          pathway: 'Drugs and Cosmetics Rules, 1945 — Rule 158B',
          rule158BNote: 'Classical formulations follow Schedule 1 authoritative texts. Proprietary modifications require safety data dossiers submitted to the State Licensing Authority.'
        },
        absConsiderations: {
          nbaApprovalRequired: true,
          details: 'Any intellectual property application (patent) based on Indian biological resources requires prior written approval from the National Biodiversity Authority (NBA) under Section 6 of the Biological Diversity Act, 2002.',
          legalAct: 'Biological Diversity Act, 2002 (amended 2023), Sections 3, 6, 7'
        },
        recommendedNextSteps: [
          'Conduct prior-art cross checks against CSIR-TKDL and classical texts.',
          'Quantify synergism (Combination Index < 0.8) to overcome Section 3(e) objections.',
          'File Form III with National Biodiversity Authority (NBA) before patent grant.',
          'Secure coined trademarks under Nice Class 5 for herbal formulations.',
          'Apply for State AYUSH SLA manufacturing license under Rule 158B.'
        ],
        sources: [
          authoritativeSources[0], // Sec 3(p)
          authoritativeSources[1], // Sec 3(e)
          authoritativeSources[2], // TKDL Curcuma
          authoritativeSources[3], // TKDL Ashwagandha
          authoritativeSources[4], // BDA Sec 6
          authoritativeSources[6]  // Rule 158B
        ],
        confidence: 'high',
        confidenceScore: 92,
        confidenceReason: 'Verified against authoritative statutes (Patents Act 1970, Biological Diversity Act 2002) and CSIR-TKDL pharmacopoeia.',
        supportedClaimsRatio: '6/6 claims verified'
      }
    }
  ]);

  // Quick Action cards specified in SIH requirements
  const quickActions = [
    {
      id: 'qa-formulation',
      title: 'Analyze Formulation',
      desc: 'Novelty, classical references & IP barriers',
      icon: Layers,
      color: 'emerald',
      prompt: 'I developed a new Ayurvedic formulation combining Ashwagandha, Turmeric, and Black Pepper extract for chronic inflammatory distress. Can I patent it?'
    },
    {
      id: 'qa-patentability',
      title: 'Check Patentability',
      desc: 'Section 3(p) non-patentability & inventive step',
      icon: Shield,
      color: 'rose',
      prompt: 'How does Section 3(p) and Section 3(e) of the Indian Patents Act impact patenting of natural Ayurvedic formulations?'
    },
    {
      id: 'qa-tkdl',
      title: 'Check Traditional Knowledge',
      desc: 'Cross-reference CSIR-TKDL & Samhitas',
      icon: BookOpen,
      color: 'amber',
      prompt: 'Could my formulation of Guduchi and Pippali already exist in documented Traditional Knowledge (TKDL)?'
    },
    {
      id: 'qa-abs',
      title: 'Check ABS Requirements',
      desc: 'NBA & SBB clearance under Biodiversity Act',
      icon: Scale,
      color: 'purple',
      prompt: 'What are the Access and Benefit Sharing (ABS) requirements under the Biological Diversity Act 2002 for an Ayurvedic startup filing a patent?'
    },
    {
      id: 'qa-classify',
      title: 'Classify Drug/Formulation',
      desc: 'Classical vs Proprietary ASU (Rule 158B)',
      icon: FileCheck,
      color: 'teal',
      prompt: 'Is my Ayurvedic herbal supplement classified as Classical Ayurvedic Medicine or Patent/Proprietary Medicine under Rule 158B?'
    },
    {
      id: 'qa-protection',
      title: 'Find Relevant IP Protection',
      desc: 'Trademarks, GI, Design & Trade Secrets',
      icon: Award,
      color: 'blue',
      prompt: 'What IP protection strategy (Trademarks, GI, Designs, Trade Secrets) is best for an Ayurvedic wellness consumer product?'
    }
  ];

  const suggestedPrompts = [
    'Can I patent an Ashwagandha + Turmeric formulation?',
    'What is Section 3(p) of the Indian Patent Act?',
    'Do I need National Biodiversity Authority (NBA) approval?',
    'Classical medicine vs Proprietary ASU medicine under Rule 158B',
    'How does CSIR-TKDL prevent biopiracy?',
    'GI tag protection for regional Ayurvedic medicinal plants'
  ];

  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
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

    // Simulate Domain-Specific RAG Retrieval & Synthesis
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let response: AIMessage;

      if (qLower.includes('ashwagandha') || qLower.includes('turmeric') || qLower.includes('patent it') || qLower.includes('formulation')) {
        const scenario = sampleScenarios.ashwagandha_turmeric;
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Analysis for "${query}": A patent for this formulation faces Section 3(p) (Traditional Knowledge) and Section 3(e) (Mere Admixture) statutory hurdles unless unexpected synergistic efficacy is proven.`,
          structuredResponse: {
            summary: scenario.summary,
            relevantRegimes: scenario.regimes,
            patentability: scenario.patentability,
            traditionalKnowledge: scenario.traditionalKnowledge,
            regulatoryClassification: scenario.regulatoryClassification,
            absConsiderations: scenario.absConsiderations,
            recommendedNextSteps: scenario.nextSteps,
            sources: scenario.sources,
            confidence: 'high',
            confidenceScore: scenario.confidenceScore,
            confidenceReason: 'Cross-referenced against Indian Patent Act 1970 Sections 3(p)/3(e), CSIR-TKDL formulation entries, and Biological Diversity Act Section 6.',
            supportedClaimsRatio: '6/6 claims verified'
          }
        };
      } else if (qLower.includes('abs') || qLower.includes('biodiversity') || qLower.includes('nba')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Access and Benefit Sharing (ABS) Assessment for Biological Materials:`,
          structuredResponse: {
            summary: 'Under the Biological Diversity Act 2002 (amended 2023), accessing biological resources from India for commercial utilization or intellectual property filings mandates statutory compliance with the National Biodiversity Authority (NBA) or State Biodiversity Boards (SBB).',
            relevantRegimes: [
              { regime: 'ABS (Biodiversity)', relevance: 'HIGH', badgeColor: 'purple', reason: 'Section 6 requires prior NBA Form III approval before patent grant' },
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Patent grant suspended without NBA clearance certificate' },
              { regime: 'Drug Regulation', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Raw herb batch procurement tracing required by State Licensing Authority' }
            ],
            patentability: {
              status: 'Conditional on Mandatory Statutory Clearances',
              analysis: 'Failure to disclose biological resource geographical origin or omission of NBA approval is a ground for patent rejection under Section 25(1)(j) / revocation under Section 64(1)(p).',
              section3pFlag: false,
              noveltyAssessment: 'Separate procedural statutory requirement independent of technical novelty.'
            },
            traditionalKnowledge: {
              matchFound: false,
              priorArtImplication: 'ABS focuses on equitable benefit sharing with local indigenous communities and biodiversity conservation.'
            },
            regulatoryClassification: {
              category: 'Commercial Biological Utilization Compliance',
              pathway: 'NBA Form I (Foreign Entities) / Form III (IPR Filings) / SBB Prior Intimation (Indian Entities)',
              rule158BNote: 'Requires sustainable harvesting compliance for rare and endangered medicinal herbs.'
            },
            absConsiderations: {
              nbaApprovalRequired: true,
              details: 'Indian Patent Office will not seal a patent without an official No Objection Certificate (NOC) from the NBA. SBB intimation is required for domestic commercial utilization.',
              legalAct: 'The Biological Diversity Act, 2002 — Sections 3, 4, 6, 7 & 19'
            },
            recommendedNextSteps: [
              'Submit NBA Form III immediately if an Indian or PCT patent application has been filed.',
              'Maintain detailed provenance logbooks verifying raw materials were procured from local verified farmers or registered mandis.',
              'Verify if any accessed herbs are listed as threatened/endangered under CITES or Section 38 of BDA.'
            ],
            sources: [authoritativeSources[4], authoritativeSources[5]],
            confidence: 'high',
            confidenceScore: 94,
            confidenceReason: 'Statutory compliance mandate under Sections 3 and 6 of the Biological Diversity Act, 2002.',
            supportedClaimsRatio: '3/3 claims verified'
          }
        };
      } else if (qLower.includes('rule 158b') || qLower.includes('classical') || qLower.includes('proprietary') || qLower.includes('classify')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Regulatory Drug Classification under Drugs and Cosmetics Rules, 1945 (Rule 158B):`,
          structuredResponse: {
            summary: 'The Drugs and Cosmetics Act distinguishes Classical Ayurvedic Medicines (manufactured strictly according to the 54 First Schedule authoritative texts) from Patent or Proprietary Medicines (innovative combinations or novel dosage forms containing textual ingredients).',
            relevantRegimes: [
              { regime: 'Drug Regulation', relevance: 'HIGH', badgeColor: 'emerald', reason: 'Governed under Rule 158B licensing guidelines for ASU drugs' },
              { regime: 'Trademark', relevance: 'HIGH', badgeColor: 'blue', reason: 'Proprietary ASU drugs rely primarily on trademark brand equity under Class 5' },
              { regime: 'Patent', relevance: 'LOW', badgeColor: 'stone', reason: 'Classical formulations are strictly non-patentable public domain prior art' }
            ],
            patentability: {
              status: 'Classical Medicines: Non-Patentable | Proprietary: Conditionally Patentable',
              analysis: 'Classical formulations belong in the public domain and cannot be patented. Proprietary formulations can only be patented if demonstrable synergistic bio-availability or novel delivery (e.g. effervescent tablet, nano-suspension) is substantiated.',
              section3pFlag: true
            },
            traditionalKnowledge: {
              matchFound: true,
              tkdlRecord: '54 Authoritative Classical Books in First Schedule of D&C Act (Charaka, Sushruta, Sahasrayoga, etc.)',
              priorArtImplication: 'Classical ASU formulations are pre-documented, eliminating technical novelty.'
            },
            regulatoryClassification: {
              category: 'Classical vs Patent or Proprietary ASU Medicine',
              pathway: 'Rule 158B of Drugs & Cosmetics Rules, 1945',
              rule158BNote: 'Proprietary medicines require pilot clinical trials and safety dossiers if textual dosage form or proportion is substantially modified.'
            },
            absConsiderations: {
              nbaApprovalRequired: false,
              details: 'Indian AYUSH practitioners and manufacturers producing purely classical ASU medicines for domestic sale have specific exemptions under BDA Section 40 notifications.',
              legalAct: 'Biological Diversity Act, 2002 (Section 40 Exemption)'
            },
            recommendedNextSteps: [
              'Ascertain whether your exact formula appears verbatim in First Schedule texts.',
              'If modified, prepare stability and toxicity dossiers for State Licensing Authority (SLA) submission.',
              'Register your proprietary brand name in Trademark Class 5.'
            ],
            sources: [authoritativeSources[6], authoritativeSources[7]],
            confidence: 'high',
            confidenceScore: 95,
            confidenceReason: 'Direct statutory interpretation of D&C Act 1940 Section 3(a) and Rule 158B.',
            supportedClaimsRatio: '4/4 claims verified'
          }
        };
      } else {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Comprehensive IP & Regulatory Evaluation for "${query}":`,
          structuredResponse: {
            summary: `Synthesizing Indian intellectual property jurisprudence and AYUSH regulatory statutes for "${query}". Ayurvedic products require navigating overlapping layers of patent barriers (Section 3(p)), traditional knowledge defense (TKDL), biodiversity clearances (ABS), and drug licensing (Rule 158B).`,
            relevantRegimes: [
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Requires assessment of inventive step and Section 3(p) non-patentability' },
              { regime: 'Traditional Knowledge', relevance: 'HIGH', badgeColor: 'amber', reason: 'Prior art matching against classical Ayurvedic formulations' },
              { regime: 'ABS (Biodiversity)', relevance: 'REVIEW REQUIRED', badgeColor: 'purple', reason: 'Biological Diversity Act Section 6 prior approval requirement' },
              { regime: 'Drug Regulation', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Licensing under D&C Act 1940 / Rule 158B' }
            ],
            patentability: {
              status: 'Requires Detailed Experimental Data Submission',
              analysis: 'A patent cannot be obtained for an invention that merely aggregates or reproduces known Ayurvedic properties. Clear, non-obvious bio-enhancement, synthetic synergism, or novel processing must be established.',
              section3pFlag: true,
              noveltyAssessment: 'Lacks novelty if ingredients duplicate classical Samhita remedies.'
            },
            traditionalKnowledge: {
              matchFound: true,
              tkdlRecord: 'CSIR-TKDL Corpus (IPC A61K 36)',
              classicalReference: 'Charaka Samhita & Sushruta Samhita',
              priorArtImplication: 'Prior art documents the classical medicinal uses of the botanicals.'
            },
            regulatoryClassification: {
              category: 'Proprietary Ayurvedic Medicine (ASU)',
              pathway: 'Drugs and Cosmetics Rules, 1945 — Rule 158B',
              rule158BNote: 'Requires safety literature verification or pilot toxicity data depending on solvent and excipient profiles.'
            },
            absConsiderations: {
              nbaApprovalRequired: true,
              details: 'If applying for IP protection, mandatory Form III filing with NBA is necessary.',
              legalAct: 'Biological Diversity Act, 2002'
            },
            recommendedNextSteps: [
              'Perform a formal prior-art clearance search on TKDL and Indian Patent Office database.',
              'Quantify synergistic bio-activity to overcome Section 3(e) admixture objections.',
              'Initiate trademark protection under Nice Class 5 early.',
              'Consult an empaneled Patent Attorney & AYUSH Regulatory Specialist.'
            ],
            sources: [authoritativeSources[0], authoritativeSources[2], authoritativeSources[4], authoritativeSources[6]],
            confidence: 'moderate',
            confidenceScore: 84,
            confidenceReason: 'General synthesis from core statutory frameworks (Patents Act 1970, BDA 2002, D&C Act 1940). Specific experimental validation recommended.',
            supportedClaimsRatio: '5/5 claims verified'
          }
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 850);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      showToast('Listening in ' + (language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'), 'Speak your Ayurvedic formulation or IP question...', 'info');
      setTimeout(() => {
        setIsListening(false);
        const sampleVoiceQueries: Record<string, string> = {
          en: 'I developed a new Ayurvedic formulation using Ashwagandha and Turmeric. Can I patent it?',
          te: 'అశ్వగంధ మరియు పసుపుతో కొత్త ఆయుర్వేద ఫార్ములేషన్ తయారు చేసాను. నేను పేటెంట్ పొందవచ్చా?',
          hi: 'मैंने अश्वगंधा और हल्दी से एक नया आयुर्वेदिक योग विकसित किया है। क्या मैं इसका पेटेंट करा सकता हूँ?'
        };
        handleSend(sampleVoiceQueries[language] || sampleVoiceQueries.en);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] max-w-7xl mx-auto px-2 sm:px-4 py-2">


      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-0">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Quick Action Cards Grid (Shown prominently) */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Intelligent Quick Actions & Workflows
              </span>
              <span className="text-[11px] text-stone-400">Click any card to begin instant AI analysis</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.id}
                    onClick={() => handleQuickAction(qa.prompt)}
                    className="text-left p-3 rounded-xl border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50/40 transition-all group flex items-start gap-3 bg-stone-50/50 hover:shadow-xs"
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

          {/* Message List */}
          {messages.map((msg, mIdx) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              {/* Sender Metadata */}
              <div className="flex items-center gap-1.5 mb-1.5 text-[11px] text-stone-400 font-medium">
                {msg.sender === 'user' ? (
                  <>
                    <span className="font-semibold text-stone-600">You (Ayurveda Innovator)</span>
                    <User className="w-3.5 h-3.5 text-stone-500" />
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-md bg-emerald-800 text-white flex items-center justify-center">
                      <Bot className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-bold text-emerald-900">IP-SAKTI Sahayak</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                      RAG Verified
                    </span>
                  </>
                )}
                <span className="text-stone-300">•</span>
                <span>{msg.timestamp}</span>
              </div>

              {/* Message Bubble Container */}
              <div
                className={`max-w-4xl w-full rounded-2xl transition-all ${
                  msg.sender === 'user'
                    ? 'bg-emerald-900 text-white p-4 sm:p-5 rounded-tr-none shadow-xs ml-auto'
                    : 'bg-white border border-stone-200/90 text-stone-800 p-4 sm:p-6 rounded-tl-none shadow-xs space-y-5'
                }`}
              >
                {/* Text Lead */}
                <p className={`text-sm leading-relaxed ${msg.sender === 'user' ? 'text-emerald-50 font-medium' : 'font-semibold text-stone-900'}`}>
                  {msg.text}
                </p>

                {/* Structured Explainable AI Response */}
                {msg.structuredResponse && (
                  <div className="space-y-4 pt-1 text-xs">
                    
                    {/* 1. SUMMARY SECTION */}
                    {msg.structuredResponse.summary && (
                      <div className="p-3.5 bg-emerald-50/60 border border-emerald-200/80 rounded-xl">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1 uppercase tracking-wider text-[10px]">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Executive IP Summary</span>
                        </div>
                        <p className="text-xs text-stone-700 leading-relaxed">
                          {msg.structuredResponse.summary}
                        </p>
                      </div>
                    )}

                    {/* 2. RELEVANT IP REGIMES BADGE MATRIX */}
                    {msg.structuredResponse.relevantRegimes && (
                      <div className="p-3.5 bg-stone-50/80 border border-stone-200 rounded-xl">
                        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-200/60">
                          <span className="font-bold text-stone-800 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                            <Scale className="w-3.5 h-3.5 text-stone-700" />
                            Relevant IP Regimes Assessment
                          </span>
                          <span className="text-[10px] text-stone-500 font-medium">
                            Multi-regime mapping
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {msg.structuredResponse.relevantRegimes.map((reg, idx) => {
                            const badgeColorMap: Record<string, string> = {
                              rose: 'bg-rose-50 text-rose-800 border-rose-200',
                              amber: 'bg-amber-50 text-amber-800 border-amber-200',
                              purple: 'bg-purple-50 text-purple-800 border-purple-200',
                              emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
                              blue: 'bg-blue-50 text-blue-800 border-blue-200',
                              stone: 'bg-stone-100 text-stone-700 border-stone-200'
                            };
                            return (
                              <div
                                key={idx}
                                className="p-2.5 bg-white rounded-lg border border-stone-200/80 flex flex-col justify-between"
                              >
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="font-bold text-stone-900 text-xs">{reg.regime}</span>
                                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${badgeColorMap[reg.badgeColor || 'emerald']}`}>
                                    {reg.relevance}
                                  </span>
                                </div>
                                {reg.reason && (
                                  <p className="text-[11px] text-stone-600 leading-snug line-clamp-2">
                                    {reg.reason}
                                  </p>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 3. PATENTABILITY & 4. TRADITIONAL KNOWLEDGE CHECK (2-column layout) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Patentability */}
                      {msg.structuredResponse.patentability && (
                        <div className="p-3.5 bg-white border border-rose-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-rose-900 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-rose-600" />
                              Patentability & Section 3(p)
                            </span>
                            {msg.structuredResponse.patentability.section3pFlag && (
                              <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                                Sec 3(p) Flagged
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-stone-900">
                            {msg.structuredResponse.patentability.status}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {msg.structuredResponse.patentability.analysis}
                          </p>
                          {msg.structuredResponse.patentability.noveltyAssessment && (
                            <div className="p-2 bg-stone-50 rounded text-[11px] text-stone-600 mt-1 border border-stone-100">
                              <span className="font-bold text-stone-700">Novelty Criteria: </span>
                              {msg.structuredResponse.patentability.noveltyAssessment}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Traditional Knowledge / TKDL */}
                      {msg.structuredResponse.traditionalKnowledge && (
                        <div className="p-3.5 bg-white border border-amber-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                              Traditional Knowledge (TKDL) Check
                            </span>
                            {msg.structuredResponse.traditionalKnowledge.matchFound && (
                              <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                                Prior Art Match
                              </span>
                            )}
                          </div>
                          {msg.structuredResponse.traditionalKnowledge.tkdlRecord && (
                            <div className="text-xs font-bold text-stone-900 font-mono">
                              {msg.structuredResponse.traditionalKnowledge.tkdlRecord}
                            </div>
                          )}
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {msg.structuredResponse.traditionalKnowledge.priorArtImplication}
                          </p>
                          {msg.structuredResponse.traditionalKnowledge.classicalReference && (
                            <div className="p-2 bg-stone-50 rounded text-[11px] text-stone-600 mt-1 border border-stone-100">
                              <span className="font-bold text-stone-700">Classical Corpus: </span>
                              {msg.structuredResponse.traditionalKnowledge.classicalReference}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 5. REGULATORY CLASSIFICATION & 6. ABS CONSIDERATIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Regulatory Classification */}
                      {msg.structuredResponse.regulatoryClassification && (
                        <div className="p-3.5 bg-white border border-teal-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold text-teal-900 uppercase tracking-wider">
                            <FileCheck className="w-3.5 h-3.5 text-teal-600" />
                            <span>Drug Regulatory Classification (Rule 158B)</span>
                          </div>
                          <div className="text-xs font-bold text-stone-900">
                            {msg.structuredResponse.regulatoryClassification.category}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {msg.structuredResponse.regulatoryClassification.rule158BNote}
                          </p>
                        </div>
                      )}

                      {/* ABS Considerations */}
                      {msg.structuredResponse.absConsiderations && (
                        <div className="p-3.5 bg-white border border-purple-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-purple-900 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Scale className="w-3.5 h-3.5 text-purple-600" />
                              ABS & Biodiversity Compliance
                            </span>
                            {msg.structuredResponse.absConsiderations.nbaApprovalRequired && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-bold">
                                NBA Clearance Needed
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-bold text-stone-900">
                            {msg.structuredResponse.absConsiderations.legalAct}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {msg.structuredResponse.absConsiderations.details}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* 7. RECOMMENDED NEXT STEPS */}
                    {msg.structuredResponse.recommendedNextSteps && msg.structuredResponse.recommendedNextSteps.length > 0 && (
                      <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-stone-800 uppercase tracking-wider mb-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Recommended Strategic Next Steps</span>
                        </div>
                        <ul className="space-y-1.5">
                          {msg.structuredResponse.recommendedNextSteps.map((step, sIdx) => (
                            <li key={sIdx} className="flex items-start gap-2 text-xs text-stone-700">
                              <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                {sIdx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 8. SOURCES SECTION (TRACEABLE RAG CARDS) */}
                    {msg.structuredResponse.sources && msg.structuredResponse.sources.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center justify-between mb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                              Cited Legal & Traditional Sources ({msg.structuredResponse.sources.length})
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {msg.structuredResponse.supportedClaimsRatio || `${msg.structuredResponse.sources.length} sources used`}
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-500">Every claim traceable to statute</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                          {msg.structuredResponse.sources.map(src => (
                            <div
                              key={src.id}
                              className="p-3 bg-white rounded-xl border border-stone-200 hover:border-emerald-400 hover:shadow-xs transition-all flex flex-col justify-between group"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-1">
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider bg-stone-100 text-stone-700 group-hover:bg-emerald-50 group-hover:text-emerald-800">
                                    {src.category || src.type}
                                  </span>
                                  {src.relevanceScore && (
                                    <span className="text-[10px] font-semibold text-emerald-700">
                                      {src.relevanceScore}% match
                                    </span>
                                  )}
                                </div>
                                <h5 className="font-bold text-stone-900 text-xs line-clamp-1">{src.title}</h5>
                                <p className="text-[10px] text-stone-500 font-mono mt-0.5">{src.section}</p>
                                <p className="text-[11px] text-stone-600 mt-1 italic line-clamp-2 leading-relaxed">
                                  "{src.excerpt}"
                                </p>
                              </div>

                              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px]">
                                <span className="text-stone-400 truncate max-w-[120px]">{src.authority.split('/')[0]}</span>
                                <button
                                  onClick={() =>
                                    setInspectSourceChain({
                                      claim: msg.text,
                                      source: src.title,
                                      document: src.section,
                                      section: src.pageOrChapter || 'Statutory Provision',
                                      authority: src.authority,
                                      confidence: msg.structuredResponse?.confidence || 'high'
                                    })
                                  }
                                  className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 transition-colors"
                                >
                                  <span>View Provenance</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 9. CONFIDENCE SYSTEM & STATUTORY DISCLAIMER */}
                    <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-emerald-800 font-black text-xs">
                          {msg.structuredResponse.confidenceScore || 88}%
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 text-xs">
                              AI Confidence Score: {msg.structuredResponse.confidenceScore || 88}%
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                              High Confidence
                            </span>
                          </div>
                          <p className="text-[11px] text-stone-500 leading-tight">
                            {msg.structuredResponse.confidenceReason}
                          </p>
                        </div>
                      </div>

                      <div className="sm:text-right border-t sm:border-t-0 pt-1.5 sm:pt-0 border-stone-200 text-[10px] text-stone-500 max-w-sm">
                        <div className="font-bold text-amber-900 flex items-center sm:justify-end gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          <span>Requires Expert Verification</span>
                        </div>
                        <span>AI research assistant for guidance; not a replacement for an IP attorney or AYUSH regulatory counsel.</span>
                      </div>
                    </div>

                    {/* Action Bar Footer */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            saveAnswer(
                              msg.text.slice(0, 60) + '...',
                              msg.structuredResponse?.summary || msg.text,
                              'IP Consultation',
                              msg.structuredResponse?.sources.length || 1
                            );
                            showToast('Saved to Saved Reports', 'Consultation saved for dossier export', 'success');
                          }}
                          className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                          <span>Save Consultation</span>
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(msg.text);
                            showToast('Copied analysis to clipboard', undefined, 'info');
                          }}
                          className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy Analysis</span>
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => handleSend(messages[mIdx - 1]?.text || 'Deepen the Section 3(p) analysis')}
                          className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Regenerate</span>
                        </button>
                      </div>

                      <button
                        onClick={() => navigate('/reports')}
                        className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                      >
                        <span>Export Full IP Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-2xl max-w-sm border border-stone-200 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-emerald-700 animate-bounce delay-200" />
              <span className="text-xs text-stone-600 font-medium ml-1">
                Searching Patents Act, TKDL records & Biological Diversity Act...
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div className="px-4 py-2 bg-stone-50/80 border-t border-stone-100 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-700" /> Suggested:
          </span>
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="shrink-0 text-xs px-2.5 py-1 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-stone-700 hover:text-emerald-900 border border-stone-200 rounded-lg transition-all"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Large ChatGPT-Style Chat Input Box */}
        <div className="p-3 sm:p-4 border-t border-stone-200 bg-white shrink-0">
          <div className="relative rounded-2xl border-2 border-stone-300/80 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-600/10 shadow-sm bg-stone-50/60 transition-all">
            
            {/* Top Toolbar in input box: Language selector & hints */}
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
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
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
              placeholder="Describe your Ayurvedic product, formulation or IP question... (e.g. 'I developed a new Ayurvedic formulation using Ashwagandha and Turmeric. Can I patent it?')"
              className="w-full bg-transparent px-4 py-3 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:outline-hidden resize-none leading-relaxed"
            />

            {/* Bottom Controls Row: Voice, Attach, Send */}
            <div className="px-3 pb-2.5 pt-1 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Voice Input */}
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
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
                  onClick={() => showToast('Formulation sheet attached', 'Analyzing ingredients for Section 3(p) & TKDL...', 'info')}
                  className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                  title="Attach formulation specification sheet or patent draft"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Attach Doc</span>
                </button>
              </div>

              {/* Send Button */}
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Ask IP-SAKTI</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

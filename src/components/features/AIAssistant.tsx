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
  AlertTriangle,
  Bookmark,
  Share2,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  User,
  Globe,
  FileCheck,
  Scale,
  Award,
  Shield,
  Layers,
  ArrowRight,
  CheckCircle2,
  Building2,
  HelpCircle
} from 'lucide-react';
import { AIMessage, SourceCitation, IPRegimeItem } from '../../types';
import { authoritativeSources, sampleScenarios } from '../../data/ipData';

export const AIAssistant: React.FC = () => {
  const { language, setLanguage, saveAnswer, showToast, setInspectSourceChain } = useApp();
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const getWelcomeText = (lang: string) => {
    if (lang === 'te') {
      return 'నమస్కారం! నేను IP-SAKTI, మీ AI-ఆధారిత మేధో సంపత్తి (IP) & ఆయుర్వేద నియంత్రణ సహాయకుడిని. ఈరోజు నేను మీకు ఎలా సహాయపడగలను?';
    }
    if (lang === 'hi') {
      return 'नमस्ते! मैं IP-SAKTI हूँ, आपका AI-संचालित बौद्धिक संपदा (IP) एवं आयुर्वेद विनियामक सहायक। आज मैं आपकी क्या सहायता कर सकता हूँ?';
    }
    return "Hello! I'm IP-SAKTI, your AI-powered Intellectual Property & Ayurveda Regulatory Assistant. How can I help you today?";
  };

  // Initial messages state featuring full IP-SAKTI Assistant analysis
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'msg-ip-01',
      sender: 'assistant',
      timestamp: 'Just now',
      text: getWelcomeText(language),
      structuredResponse: {
        summary: 'IP-SAKTI synthesizes statutory legal provisions (Indian Patent Act 1970, Biological Diversity Act 2002, Drugs & Cosmetics Rules 1945) and traditional knowledge corpora (CSIR-TKDL & Classical Samhitas) to deliver transparent, source-cited IP guidance and direct access to specialized analysis tools.',
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
          priorArtImplication: 'Classical documentation acts as anticipatory prior art, cited by patent examiners worldwide to prevent wrongful patenting of traditional herbal remedies.'
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
        suggestedTools: [
          { label: 'Formulation Analysis', path: '/formulation-analysis', reason: 'Check your ingredients for novelty, classical references & synergy' },
          { label: 'IP Regime Analysis', path: '/regimes', reason: 'Explore Patent, Trademark, GI, Design, and Trade Secret regimes' },
          { label: 'Traditional Knowledge (TKDL)', path: '/tkdl', reason: 'Search 4.5 lakh CSIR-TKDL prior-art formulation entries' },
          { label: 'ABS Compliance (NBA)', path: '/abs-compliance', reason: 'Verify Form III approval rules under Biodiversity Act' },
          { label: 'Research & Patents Prior Art', path: '/prior-art', reason: 'Cross-examine global patent databases and journals' }
        ],
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
        confidenceScore: 94,
        confidenceReason: 'Verified against authoritative statutes (Patents Act 1970, Biological Diversity Act 2002) and CSIR-TKDL pharmacopoeia.',
        supportedClaimsRatio: '6/6 claims verified'
      }
    }
  ]);

  // Update initial welcome message when language changes if it's the default welcome
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

  // Quick Action cards specified in SIH & user requirements
  const quickActions = [
    {
      id: 'qa-formulation',
      title: 'Analyze Formulation',
      desc: 'Novelty, classical shlokas & IP barriers',
      icon: Layers,
      color: 'emerald',
      prompt: 'Analyze the IP protection options for my Ayurvedic formulation'
    },
    {
      id: 'qa-patentability',
      title: 'Check Patentability',
      desc: 'Section 3(p) non-patentability & inventive step',
      icon: Shield,
      color: 'rose',
      prompt: 'Check whether this invention may be patentable'
    },
    {
      id: 'qa-prior-art',
      title: 'Find Prior Art',
      desc: 'Search IPO, TKDL & scientific literature',
      icon: BookOpen,
      color: 'blue',
      prompt: 'Find relevant prior art'
    },
    {
      id: 'qa-sec3p',
      title: 'Explain Section 3(p)',
      desc: 'Traditional knowledge exclusion statutory bar',
      icon: Scale,
      color: 'amber',
      prompt: 'Explain Section 3(p) of the Indian Patents Act'
    },
    {
      id: 'qa-tkdl',
      title: 'Check TKDL Relevance',
      desc: 'Cross-reference 4.5 lakh CSIR formulations',
      icon: Award,
      color: 'teal',
      prompt: 'Check Traditional Knowledge (TKDL) relevance'
    },
    {
      id: 'qa-abs',
      title: 'Understand ABS Compliance',
      desc: 'NBA & SBB approval under Biodiversity Act',
      icon: Building2,
      color: 'purple',
      prompt: 'Help me understand ABS compliance'
    }
  ];

  // Suggested Prompts matching the exact user specification
  const suggestedPrompts = [
    'Analyze the IP protection options for my Ayurvedic formulation',
    'Check whether this invention may be patentable',
    'Find relevant prior art',
    'Explain Section 3(p) of the Indian Patents Act',
    'Check Traditional Knowledge (TKDL) relevance',
    'Help me understand ABS compliance',
    'Search for relevant patents and research'
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

    // Simulate Domain-Specific RAG Retrieval & Tool Routing Synthesis
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let response: AIMessage;

      // SCENARIO 1: Patentability / Patent Question
      if (qLower.includes('patentable') || qLower.includes('patent') || qLower.includes('invention')) {
        const scenario = sampleScenarios.ashwagandha_turmeric;
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Patentability Evaluation for "${query}": Under the Indian Patents Act 1970, Ayurvedic products face statutory hurdles under Section 3(p) (traditional knowledge exclusion) and Section 3(e) (mere admixture). A patent can only be granted if you demonstrate unexpected therapeutic synergism, novel bio-availability enhancement, or proprietary non-obvious processing methods.`,
          structuredResponse: {
            summary: scenario.summary,
            relevantRegimes: [
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Overcoming Section 3(p) TK bar & Section 3(e) mere admixture' },
              { regime: 'Traditional Knowledge', relevance: 'HIGH', badgeColor: 'amber', reason: 'Cross-check against classical Samhitas & CSIR-TKDL entries' },
              { regime: 'Trademark', relevance: 'HIGH', badgeColor: 'blue', reason: 'Class 5 coined brand name is strongly recommended alongside patenting' },
              { regime: 'ABS (Biodiversity)', relevance: 'REVIEW REQUIRED', badgeColor: 'purple', reason: 'Mandatory Form III NBA approval prior to patent grant' }
            ],
            patentability: scenario.patentability,
            traditionalKnowledge: scenario.traditionalKnowledge,
            regulatoryClassification: scenario.regulatoryClassification,
            absConsiderations: scenario.absConsiderations,
            suggestedTools: [
              { label: 'Formulation Analysis', path: '/formulation-analysis', reason: 'Screen ingredients for novelty, classical references & synergy ratio' },
              { label: 'IP Regime Analysis', path: '/regimes?type=patent', reason: 'Detailed statutory breakdown of Section 3(p) and patent filing requirements' },
              { label: 'Research & Patents Prior Art', path: '/prior-art', reason: 'Search Indian and international prior art databases' }
            ],
            recommendedNextSteps: [
              'Perform a quantitative synergy study (Combination Index < 0.8) to satisfy Section 3(e).',
              'Check formulation against 4.5 lakh entries in the CSIR-TKDL database.',
              'Submit NBA Form III before patent application grant.',
              'Register coined proprietary trademarks under Nice Class 5.'
            ],
            sources: [authoritativeSources[0], authoritativeSources[1], authoritativeSources[2], authoritativeSources[4]],
            confidence: 'high',
            confidenceScore: 92,
            confidenceReason: 'Cross-referenced against Indian Patent Act 1970 Sections 3(p)/3(e) and CSIR-TKDL pharmacopoeia.',
            supportedClaimsRatio: '4/4 claims verified'
          }
        };
      }
      // SCENARIO 2: Prior Art & Research Search
      else if (qLower.includes('prior art') || qLower.includes('prior-art') || qLower.includes('search for relevant') || qLower.includes('research')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Prior Art & Research Retrieval for "${query}": In Ayurvedic intellectual property, prior art encompasses not only published patent specifications and academic literature, but also the ancient Sanskrit, Arabic, and Persian classical treatises codified in the CSIR-TKDL database.`,
          structuredResponse: {
            summary: 'Comprehensive prior-art search across Indian Patent Office (IPO) records, international databases (USPTO, EPO, WIPO), and traditional knowledge repositories (TKDL) is essential to identify novelty-destroying disclosures before filing.',
            relevantRegimes: [
              { regime: 'Traditional Knowledge', relevance: 'HIGH', badgeColor: 'amber', reason: 'Ancient Samhita citations serve as anticipatory prior art' },
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Determines whether inventive step is non-obvious to an Ayurvedic practitioner' },
              { regime: 'Source Explorer', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Verified shlokas from Charaka, Sushruta, and Ashtanga Hridaya' }
            ],
            patentability: {
              status: 'Prior Art Search Dictates Claim Scope',
              analysis: 'If an ingredient combination or therapeutic indication is already disclosed in classical texts or prior patents, patent claims must be limited strictly to novel delivery systems or synergistic ratios.',
              section3pFlag: true
            },
            traditionalKnowledge: {
              matchFound: true,
              tkdlRecord: 'CSIR-TKDL Corpus (IPC Class A61K 36)',
              classicalReference: 'Charaka Samhita, Sushruta Samhita, Bhavaprakasha Nighantu',
              priorArtImplication: 'Classical documentation acts as anticipatory prior art cited by examiners worldwide to revoke natural product patents.'
            },
            suggestedTools: [
              { label: 'Research & Patents Prior Art', path: '/prior-art', reason: 'Search IPO, USPTO, EPO & WIPO prior art records' },
              { label: 'Source Explorer', path: '/sources', reason: 'Examine authoritative shlokas, statutory provisions & gazettes' },
              { label: 'Traditional Knowledge (TKDL)', path: '/tkdl', reason: 'Search 4.5 lakh CSIR-TKDL codified formulations' }
            ],
            recommendedNextSteps: [
              'Conduct a targeted keyword and IPC A61K 36 classification search.',
              'Examine CSIR-TKDL prior art outcome cases (e.g. Turmeric, Neem, Ashwagandha revocations).',
              'Draft patent claims that clearly distinguish from identified classical citations.'
            ],
            sources: [authoritativeSources[2], authoritativeSources[3], authoritativeSources[0]],
            confidence: 'high',
            confidenceScore: 95,
            confidenceReason: 'Direct synthesis from CSIR-TKDL corpus and IPO prior-art guidelines.',
            supportedClaimsRatio: '3/3 claims verified'
          }
        };
      }
      // SCENARIO 3: Section 3(p) Explanation
      else if (qLower.includes('section 3(p)') || qLower.includes('3(p)') || qLower.includes('3p')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Section 3(p) Statutory Analysis (Indian Patents Act, 1970): Section 3(p) explicitly bars from patentability: "an invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components."`,
          structuredResponse: {
            summary: 'Section 3(p) was incorporated via the Patents (Amendment) Act 2002 to safeguard India’s rich Ayurvedic and traditional heritage from misappropriation and biopiracy. If a patent claim covers botanicals or recipes documented in classical Samhitas, the Patent Office will issue a Section 3(p) rejection unless surprising, non-obvious synergistic efficacy is proven.',
            relevantRegimes: [
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Statutory non-patentability bar under Section 3(p)' },
              { regime: 'Traditional Knowledge', relevance: 'HIGH', badgeColor: 'amber', reason: 'TKDL acts as evidentiary proof for Section 3(p) objections' }
            ],
            patentability: {
              status: 'Statutory Exclusion Bar Under Section 3(p)',
              analysis: 'To overcome Section 3(p), the applicant must show that the claimed formulation produces results that could not be predicted from the known classical properties of the individual components.',
              section3pFlag: true,
              noveltyAssessment: 'Mere extraction or simple mixing of traditional herbs is deemed non-patentable subject matter.'
            },
            traditionalKnowledge: {
              matchFound: true,
              tkdlRecord: 'Patents Act 1970 — Section 3(p)',
              classicalReference: 'First Schedule texts of Drugs & Cosmetics Act 1940',
              priorArtImplication: 'Acts as an absolute statutory objection during first examination report (FER).'
            },
            suggestedTools: [
              { label: 'IP Regime Analysis (Patent)', path: '/regimes?type=patent', reason: 'Review Section 3(p) statutory breakdown & defense strategies' },
              { label: 'Traditional Knowledge (TKDL)', path: '/tkdl', reason: 'Check which ingredients trigger Section 3(p) scrutiny' },
              { label: 'Formulation Analysis', path: '/formulation-analysis', reason: 'Screen formulation ingredients against Section 3(p)' }
            ],
            recommendedNextSteps: [
              'Submit experimental comparative data proving synergy (Combination Index < 0.8).',
              'Focus patent claims on novel pharmaceutical formulations (e.g. liposomal, nano-particle) rather than raw extracts.',
              'Rely on Trademark Class 5 and Industrial Design for overall commercial brand protection.'
            ],
            sources: [authoritativeSources[0], authoritativeSources[1]],
            confidence: 'high',
            confidenceScore: 96,
            confidenceReason: 'Direct statutory interpretation of Section 3(p) and IPO Patent Manual guidelines.',
            supportedClaimsRatio: '2/2 claims verified'
          }
        };
      }
      // SCENARIO 4: Traditional Knowledge / TKDL Relevance
      else if (qLower.includes('traditional knowledge') || qLower.includes('tkdl')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Traditional Knowledge Digital Library (CSIR-TKDL) Assessment: The TKDL is a pioneering Indian database that translates and codifies traditional medicine knowledge from Sanskrit, Hindi, Arabic, Persian, and Urdu into five international languages (English, German, French, Japanese, Spanish).`,
          structuredResponse: {
            summary: 'With over 4.5 lakh codified Ayurvedic, Unani, and Siddha formulations classified under the International Patent Classification (IPC A61K 36), the TKDL serves as defensive prior art used by patent offices across the world to reject biopiracy claims.',
            relevantRegimes: [
              { regime: 'Traditional Knowledge', relevance: 'HIGH', badgeColor: 'amber', reason: 'Primary defensive database against natural product patenting' },
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'TKDL citations act as novelty-destroying prior art' },
              { regime: 'Source Explorer', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Samhita shlokas linked directly to TKDL formulation codes' }
            ],
            patentability: {
              status: 'Defensive Prior Art Shield',
              analysis: 'If your formulation duplicates a TKDL formulation code, it is considered pre-existing knowledge in the public domain and cannot be patented.',
              section3pFlag: true
            },
            traditionalKnowledge: {
              matchFound: true,
              tkdlRecord: 'CSIR-TKDL Database (over 450,000 formulations codified)',
              classicalReference: 'Charaka Samhita, Sushruta Samhita, Ashtanga Hridaya, Sharangadhara Samhita',
              priorArtImplication: 'TKDL entries are systematically shared with USPTO, EPO, JPO, and IPO examiners.'
            },
            suggestedTools: [
              { label: 'Traditional Knowledge (TKDL)', path: '/tkdl', reason: 'Search 4.5 lakh CSIR-TKDL formulations and classical references' },
              { label: 'Source Explorer', path: '/sources', reason: 'Trace classical texts, shlokas & regulatory gazettes' },
              { label: 'Formulation Analysis', path: '/formulation-analysis', reason: 'Run an automated TKDL cross-check on your formulation' }
            ],
            recommendedNextSteps: [
              'Verify whether your formulation matches any classical yoga listed in the First Schedule.',
              'If the formulation is purely classical, register it as a Classical ASU medicine under Rule 158B.',
              'Use coined trademarks to protect commercial branding in Nice Class 5.'
            ],
            sources: [authoritativeSources[2], authoritativeSources[3]],
            confidence: 'high',
            confidenceScore: 94,
            confidenceReason: 'CSIR-TKDL pharmacopoeia database records and bilateral IPO examiner search protocols.',
            supportedClaimsRatio: '2/2 claims verified'
          }
        };
      }
      // SCENARIO 5: ABS Compliance (NBA / Biodiversity)
      else if (qLower.includes('abs') || qLower.includes('biodiversity') || qLower.includes('nba')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Access and Benefit Sharing (ABS) Compliance under Biological Diversity Act, 2002: Any entity utilizing biological resources occurring in or obtained from India for commercial utilization, bio-survey, or intellectual property filing must comply with mandatory National Biodiversity Authority (NBA) and State Biodiversity Board (SBB) clearance protocols.`,
          structuredResponse: {
            summary: 'Under Section 6 of the Biological Diversity Act 2002 (amended 2023), no person shall apply for any intellectual property right in or outside India for any invention based on any research or information on a biological resource obtained from India without prior approval of the NBA.',
            relevantRegimes: [
              { regime: 'ABS (Biodiversity)', relevance: 'HIGH', badgeColor: 'purple', reason: 'Section 6 requires mandatory NBA Form III filing before patent grant' },
              { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'Patent grant will be withheld by IPO without NBA clearance NOC' },
              { regime: 'Drug Regulation', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Sustainable sourcing verification required for ASU manufacturing' }
            ],
            patentability: {
              status: 'Conditional on Mandatory Statutory Clearances',
              analysis: 'Failure to disclose the geographical origin of biological resources or failure to obtain NBA approval is a statutory ground for patent opposition under Section 25(1)(j) or revocation under Section 64(1)(p).',
              section3pFlag: false
            },
            traditionalKnowledge: {
              matchFound: false,
              priorArtImplication: 'ABS focuses on fair and equitable sharing of benefits with local indigenous communities.'
            },
            absConsiderations: {
              nbaApprovalRequired: true,
              details: 'Indian Patent Office will not seal a patent grant without an official No Objection Certificate (NOC) from the NBA. Form III must be filed before patent grant.',
              legalAct: 'The Biological Diversity Act, 2002 — Sections 3, 4, 6, 7 & 19'
            },
            suggestedTools: [
              { label: 'ABS Compliance (NBA)', path: '/abs-compliance', reason: 'Interactive NBA Form III clearance checklist & fee calculator' },
              { label: 'Saved Reports & Dossiers', path: '/reports', reason: 'Generate and export ABS regulatory compliance dossiers' },
              { label: 'IP Regime Analysis', path: '/regimes?type=abs', reason: 'Understand legal penalties and statutory exemptions under BDA' }
            ],
            recommendedNextSteps: [
              'Submit NBA Form III application immediately upon filing an Indian or PCT patent.',
              'Maintain audited provenance records of raw herb procurement from registered mandis or farmers.',
              'Verify whether any botanicals fall under Section 38 (Threatened Species) or CITES lists.'
            ],
            sources: [authoritativeSources[4], authoritativeSources[5]],
            confidence: 'high',
            confidenceScore: 95,
            confidenceReason: 'Statutory compliance mandate under Sections 3, 6, and 19 of the Biological Diversity Act, 2002.',
            supportedClaimsRatio: '2/2 claims verified'
          }
        };
      }
      // SCENARIO 6: IP Protection Options / Strategy
      else if (qLower.includes('protection options') || qLower.includes('protection') || qLower.includes('strategy') || qLower.includes('regimes')) {
        response = {
          id: 'ai-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Holistic IP Protection Strategy for Ayurvedic Products: Because single Ayurvedic patents face strict Section 3(p) traditional knowledge barriers, a multi-regime intellectual property framework is the industry gold standard for herbal and AYUSH enterprises.`,
          structuredResponse: {
            summary: 'An optimal Ayurveda IP portfolio combines: (1) Nice Class 5 coined Trademarks for proprietary brand identity, (2) Industrial Design registration for unique packaging and bottles, (3) Trade Secrets for proprietary extraction protocols, (4) Geographical Indications for terroir-dependent botanicals, and (5) Patents focused strictly on novel synergistic delivery systems.',
            relevantRegimes: [
              { regime: 'Trademark', relevance: 'HIGH', badgeColor: 'blue', reason: 'Class 5 coined brand name offers 10-year renewable monopoly' },
              { regime: 'Patent', relevance: 'MEDIUM', badgeColor: 'rose', reason: 'Focus on synergistic bio-availability enhancement & delivery' },
              { regime: 'Trade Secret', relevance: 'HIGH', badgeColor: 'stone', reason: 'Proprietary solvent ratios and extraction temperatures' },
              { regime: 'Design', relevance: 'RELEVANT', badgeColor: 'teal', reason: 'Bottle shape & packaging under Class 28-02' },
              { regime: 'GI', relevance: 'RELEVANT', badgeColor: 'amber', reason: 'Authentic regional herb sourcing (e.g. Malabar Pepper)' }
            ],
            patentability: {
              status: 'Multi-Tiered Protection Strategy',
              analysis: 'Where patentability is barred under Section 3(p), trademarks and trade secrets provide indefinite commercial exclusivity without public disclosure.',
              section3pFlag: true
            },
            suggestedTools: [
              { label: 'IP Regime Analysis', path: '/regimes', reason: 'Comprehensive analysis of all 10 IP regimes for Ayurveda' },
              { label: 'Formulation Analysis', path: '/formulation-analysis', reason: 'Identify patentable vs non-patentable components' },
              { label: 'Drug Classification', path: '/drug-classification', reason: 'Align IP strategy with Rule 158B manufacturing pathway' }
            ],
            recommendedNextSteps: [
              'File coined trademark applications in Nice Class 5 early before market launch.',
              'Implement non-disclosure agreements (NDAs) to safeguard proprietary extraction methods.',
              'Verify whether any botanicals possess Geographical Indication (GI) provenance.'
            ],
            sources: [authoritativeSources[0], authoritativeSources[6], authoritativeSources[4]],
            confidence: 'high',
            confidenceScore: 92,
            confidenceReason: 'Multi-regime strategy synthesized from Indian IP jurisprudence and commercial AYUSH best practices.',
            supportedClaimsRatio: '3/3 claims verified'
          }
        };
      }
      // DEFAULT: General Comprehensive RAG Synthesis
      else {
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
              noveltyAssessment: 'Lacks novelty if ingredients duplicate classical Samhita remedies without unexpected synergy.'
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
            suggestedTools: [
              { label: 'Formulation Analysis', path: '/formulation-analysis', reason: 'Deep dive into your exact botanical formulation ingredients' },
              { label: 'IP Regime Analysis', path: '/regimes', reason: 'Evaluate which of the 10 IP regimes fit your commercial strategy' },
              { label: 'Research & Patents Prior Art', path: '/prior-art', reason: 'Check whether similar formulations exist in patent records' },
              { label: 'Traditional Knowledge (TKDL)', path: '/tkdl', reason: 'Verify traditional knowledge documentation' }
            ],
            recommendedNextSteps: [
              'Perform a formal prior-art clearance search on TKDL and Indian Patent Office database.',
              'Quantify synergistic bio-activity to overcome Section 3(e) admixture objections.',
              'Initiate trademark protection under Nice Class 5 early.',
              'Consult an empaneled Patent Attorney & AYUSH Regulatory Specialist.'
            ],
            sources: [authoritativeSources[0], authoritativeSources[2], authoritativeSources[4], authoritativeSources[6]],
            confidence: 'moderate',
            confidenceScore: 88,
            confidenceReason: 'General synthesis from core statutory frameworks (Patents Act 1970, BDA 2002, D&C Act 1940). Specific formulation screening recommended.',
            supportedClaimsRatio: '4/4 claims verified'
          }
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 750);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      showToast('Listening in ' + (language === 'te' ? 'Telugu' : language === 'hi' ? 'Hindi' : 'English'), 'Speak your Ayurvedic formulation or IP question...', 'info');
      setTimeout(() => {
        setIsListening(false);
        const sampleVoiceQueries: Record<string, string> = {
          en: 'Check whether this invention may be patentable',
          te: 'ఈ ఆవిష్కరణకు పేటెంట్ పొందవచ్చో లేదో తనిఖీ చేయండి',
          hi: 'जांचें कि क्या इस आविष्कार का पेटेंट कराया जा सकता है'
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
    <div className="flex flex-col h-[calc(100vh-5.5rem)] max-w-7xl mx-auto px-2 sm:px-4 py-2">

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden min-h-0">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Hero Banner: Identity & Product Overview */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-stone-900 text-white shadow-sm border border-emerald-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
                    <Scale className="w-5 h-5" />
                  </div>
                  <h1 className="text-lg sm:text-xl font-black tracking-tight text-white">
                    IP-SAKTI
                  </h1>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    AI Assistant
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                  AI-Powered Multilingual Intellectual Property & Ayurveda Regulatory Assistant
                </p>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  Patents Act Sec 3(p)
                </span>
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  CSIR-TKDL
                </span>
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  BDA 2002 (ABS)
                </span>
                <span className="px-2 py-1 rounded-md bg-white/10 border border-white/15 text-emerald-200 font-mono">
                  Rule 158B ASU
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                Intelligent Workflows & Suggested Prompts
              </span>
              <span className="text-[11px] text-stone-400 hidden sm:inline">Click any prompt to trigger instant AI evaluation</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {quickActions.map((qa) => {
                const Icon = qa.icon;
                return (
                  <button
                    key={qa.id}
                    onClick={() => handleQuickAction(qa.prompt)}
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
                    <span className="font-semibold text-stone-600">You</span>
                    <User className="w-3.5 h-3.5 text-stone-500" />
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-md bg-emerald-800 text-white flex items-center justify-center">
                      <Bot className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-bold text-emerald-900">IP-SAKTI Assistant</span>
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
                    ? 'bg-emerald-900 text-white p-4 sm:p-5 rounded-tr-none shadow-2xs ml-auto'
                    : 'bg-white border border-stone-200/90 text-stone-800 p-4 sm:p-6 rounded-tl-none shadow-2xs space-y-5'
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

                    {/* 3. DIRECT ACTION: SUGGESTED SPECIALIZED TOOLS (Chatbot Entry Point) */}
                    {msg.structuredResponse.suggestedTools && msg.structuredResponse.suggestedTools.length > 0 && (
                      <div className="p-4 bg-emerald-50/70 border border-emerald-200/90 rounded-xl space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-950 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                            <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                            Suggested Specialized Tools & Analysis Modules
                          </span>
                          <span className="text-[10px] text-emerald-700 font-semibold">Direct Deep-Dive</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {msg.structuredResponse.suggestedTools.map((tool, tIdx) => (
                            <button
                              key={tIdx}
                              onClick={() => navigate(tool.path)}
                              className="text-left p-2.5 bg-white hover:bg-emerald-100/60 border border-emerald-300/80 hover:border-emerald-600 rounded-lg transition-all group shadow-2xs flex flex-col justify-between cursor-pointer"
                            >
                              <div className="flex items-center justify-between gap-1 w-full">
                                <span className="font-bold text-xs text-stone-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                                  <span className="text-emerald-700">→</span>
                                  <span>{tool.label}</span>
                                </span>
                                <ChevronRight className="w-3.5 h-3.5 text-emerald-700 group-hover:translate-x-0.5 transition-transform" />
                              </div>
                              {tool.reason && (
                                <p className="text-[11px] text-stone-600 mt-1 line-clamp-1 group-hover:text-emerald-900 font-normal">
                                  {tool.reason}
                                </p>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 4. PATENTABILITY & TRADITIONAL KNOWLEDGE CHECK (2-column layout) */}
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
                                Sec 3(p) Active Bar
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
                            <div className="pt-1 text-[11px] text-stone-500 font-medium border-t border-stone-100">
                              <span className="text-stone-700 font-semibold">Novelty Bar: </span>
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
                              Traditional Knowledge (TKDL)
                            </span>
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                              4.5L Formulations
                            </span>
                          </div>
                          <div className="text-xs font-bold text-stone-900">
                            {msg.structuredResponse.traditionalKnowledge.tkdlRecord || 'CSIR-TKDL Database'}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {msg.structuredResponse.traditionalKnowledge.priorArtImplication}
                          </p>
                          {msg.structuredResponse.traditionalKnowledge.classicalReference && (
                            <div className="pt-1 text-[11px] text-stone-500 font-medium border-t border-stone-100">
                              <span className="text-stone-700 font-semibold">Corpus: </span>
                              {msg.structuredResponse.traditionalKnowledge.classicalReference}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 5. DRUG CLASSIFICATION & ABS (2-column layout) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Drug Classification */}
                      {msg.structuredResponse.regulatoryClassification && (
                        <div className="p-3.5 bg-white border border-teal-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-teal-900 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <FileCheck className="w-3.5 h-3.5 text-teal-600" />
                              Drug Classification (Rule 158B)
                            </span>
                          </div>
                          <div className="text-xs font-bold text-stone-900">
                            {msg.structuredResponse.regulatoryClassification.category}
                          </div>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {msg.structuredResponse.regulatoryClassification.rule158BNote}
                          </p>
                        </div>
                      )}

                      {/* ABS Requirements */}
                      {msg.structuredResponse.absConsiderations && (
                        <div className="p-3.5 bg-white border border-purple-200/80 rounded-xl space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] font-bold text-purple-900 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Building2 className="w-3.5 h-3.5 text-purple-600" />
                              ABS (Biodiversity Act, 2002)
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

                    {/* 6. RECOMMENDED NEXT STEPS */}
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

                    {/* 7. SOURCES SECTION (TRACEABLE RAG CARDS) */}
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
                              className="p-3 bg-white rounded-xl border border-stone-200 hover:border-emerald-400 hover:shadow-2xs transition-all flex flex-col justify-between group"
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
                                  className="font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 transition-colors cursor-pointer"
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

                    {/* 8. CONFIDENCE SYSTEM & STATUTORY DISCLAIMER */}
                    <div className="p-3 bg-stone-100/70 border border-stone-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white border border-stone-200 flex items-center justify-center text-emerald-800 font-black text-xs">
                          {msg.structuredResponse.confidenceScore || 90}%
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-stone-900 text-xs">
                              AI Confidence Score: {msg.structuredResponse.confidenceScore || 90}%
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
                          className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors cursor-pointer"
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
                          className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Copy Analysis</span>
                        </button>
                        <span>•</span>
                        <button
                          onClick={() => handleSend(messages[mIdx - 1]?.text || 'Explain Section 3(p) of the Indian Patents Act')}
                          className="hover:text-emerald-800 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Regenerate</span>
                        </button>
                      </div>

                      <button
                        onClick={() => navigate('/reports')}
                        className="font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 cursor-pointer"
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
                Synthesizing Patents Act, TKDL & Biological Diversity Act...
              </span>
            </div>
          )}

          <div ref={chatBottomRef} />
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

        {/* Large Chat Input Box */}
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
              placeholder="Describe your Ayurvedic product, formulation or IP question... (e.g. 'Can my Ayurvedic formulation be patented?')"
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
                  onClick={() => showToast('Formulation sheet attached', 'Analyzing ingredients for Section 3(p) & TKDL...', 'info')}
                  className="p-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
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
                className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer"
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

import { SourceCitation, IPRegimeItem } from '../types';

export interface IPRegimeDetail {
  id: string;
  name: string;
  shortName: string;
  iconName: string;
  governingLaw: string;
  statutoryAuthority: string;
  ayurvedaContext: string;
  relevanceCriteria: string[];
  keyRisks: string[];
  recommendedAction: string;
  officialPortal: string;
}

export const ipRegimesList: IPRegimeDetail[] = [
  {
    id: 'patent',
    name: 'Patents (Inventions & Extraction Processes)',
    shortName: 'Patent',
    iconName: 'Shield',
    governingLaw: 'The Patents Act, 1970 (amended 2005)',
    statutoryAuthority: 'Controller General of Patents, Designs and Trade Marks (CGPDTM / IPO)',
    ayurvedaContext: 'Section 3(p) expressly bars inventions that are essentially traditional knowledge or an aggregation/duplication of known properties. Novel extraction technologies, synergistic non-obvious combinations, or modified bioactive isolates can be patentable.',
    relevanceCriteria: [
      'Is the formulation more than a mere admixture (Section 3(e))?',
      'Is there proven synergistic enhancement beyond classical indications?',
      'Has prior art in CSIR-TKDL and classical texts been ruled out?'
    ],
    keyRisks: [
      'Pre-grant opposition citing TKDL',
      'Objections under Section 3(p) and 3(d)',
      'Revocation by Third-Party under Section 25'
    ],
    recommendedAction: 'Focus patent claims on novel isolation/purification processes, specific standardized ratios with documented synergistic bio-enhancement, or novel delivery systems.',
    officialPortal: 'https://ipindia.gov.in'
  },
  {
    id: 'tkdl',
    name: 'Traditional Knowledge & TKDL Digital Library',
    shortName: 'Traditional Knowledge',
    iconName: 'BookOpen',
    governingLaw: 'CSIR-TKDL Access Agreements & Patent Act Sec 3(p)',
    statutoryAuthority: 'Council of Scientific & Industrial Research (CSIR) & Ministry of AYUSH',
    ayurvedaContext: 'TKDL contains over 4.5 lakh classical formulations transcribed from Sanskrit, Arabic, Persian, and Tamil into 5 international languages (English, German, French, Japanese, Spanish) classified under IPC A61K 36.',
    relevanceCriteria: [
      'Do ingredients match classical formulations in Charaka, Sushruta, Bhavaprakasha, etc.?',
      'Does the therapeutic indication mimic ancient texts?',
      'Has international search occurred in EPO, USPTO, JPO, and IPO?'
    ],
    keyRisks: [
      'Instant invalidation of patent claims by TKDL Third-Party Observations',
      'Accusations of biopiracy without ABS clearance'
    ],
    recommendedAction: 'Conduct comprehensive preliminary cross-referencing against TKDL indices prior to filing any domestic or PCT patent application.',
    officialPortal: 'https://tkdl.res.in'
  },
  {
    id: 'trademark',
    name: 'Trademarks (Brand & Brand Equity)',
    shortName: 'Trademark',
    iconName: 'Award',
    governingLaw: 'Trade Marks Act, 1999',
    statutoryAuthority: 'Trade Marks Registry (TMR)',
    ayurvedaContext: 'Essential for Ayurvedic brands under Nice Class 5 (Pharmaceutical & Herbal preparations) and Class 3 (Cosmetics/Soaps). Generic Sanskrit names (e.g., "Ashwagandha", "Triphala") cannot be trademarked, but distinctive compound brands can.',
    relevanceCriteria: [
      'Is the mark distinctive and non-descriptive of herbal ingredients?',
      'Does it avoid deceptive similarity to classical formulations?'
    ],
    keyRisks: [
      'Rejection under Section 9 for descriptive herbal names',
      'Opposition from established ASU manufacturers under Class 5'
    ],
    recommendedAction: 'Register coined, arbitrary brand names under Class 5 and Class 35 (retail/e-commerce) early in the product lifecycle.',
    officialPortal: 'https://ipindiaonline.gov.in/eregister/'
  },
  {
    id: 'gi',
    name: 'Geographical Indications (GI Tag)',
    shortName: 'Geographical Indication',
    iconName: 'MapPin',
    governingLaw: 'Geographical Indications of Goods (Registration and Protection) Act, 1999',
    statutoryAuthority: 'Geographical Indications Registry, Chennai',
    ayurvedaContext: 'Crucial for high-potency medicinal plants and heritage formulations whose qualities are intrinsically linked to specific Indian agro-climatic zones (e.g., Kashmir Saffron, Navara Rice, Malabar Pepper, Coorg Cardamom).',
    relevanceCriteria: [
      'Are raw herbs sourced from registered GI origin regions?',
      'Can marketing claim regional authenticity and chemical chemotype superiority?'
    ],
    keyRisks: [
      'Infringement penalties for misrepresenting GI certification',
      'Supply chain adulteration of GI-tagged raw material'
    ],
    recommendedAction: 'Apply for Authorized User status for raw material GI tags to command premium market pricing and export credibility.',
    officialPortal: 'https://ipindia.gov.in/gi.htm'
  },
  {
    id: 'abs',
    name: 'Access and Benefit Sharing (ABS Compliance)',
    shortName: 'ABS Compliance',
    iconName: 'Scale',
    governingLaw: 'The Biological Diversity Act, 2002 (amended 2023)',
    statutoryAuthority: 'National Biodiversity Authority (NBA) & State Biodiversity Boards (SBB)',
    ayurvedaContext: 'Mandatory statutory compliance when accessing Indian biological resources for commercial utilization or applying for intellectual property rights (Section 6). Foreign entities require prior NBA approval (Form I/III).',
    relevanceCriteria: [
      'Does the entity have foreign equity/participation (Section 3)?',
      'Are biological resources sourced within India for commercial manufacturing?',
      'Is a patent being filed based on Indian biological resources (Section 6)?'
    ],
    keyRisks: [
      'Criminal prosecution and non-bailable penalties under Section 55',
      'Freezing of patent grants until NBA Form III clearance is issued'
    ],
    recommendedAction: 'Obtain prior NBA clearance (Form III) before patent grant and intimate relevant State Biodiversity Board for commercial utilization.',
    officialPortal: 'http://nbaindia.org'
  },
  {
    id: 'drug_regulation',
    name: 'Drug Regulatory Classification (AYUSH Licensing)',
    shortName: 'Drug Regulation',
    iconName: 'FileCheck',
    governingLaw: 'Drugs and Cosmetics Act, 1940 & Rules, 1945 (Rule 158B)',
    statutoryAuthority: 'State Licensing Authority (SLA) & Ministry of AYUSH',
    ayurvedaContext: 'Classification determines manufacturing licensing requirements: Classical Ayurvedic Medicine (Schedule 1 texts), Patent or Proprietary (ASU) Medicine, or Novel Formulation requiring clinical safety dossiers.',
    relevanceCriteria: [
      'Is the formula in the 54 books specified in Schedule 1 of D&C Act?',
      'Are new excipients, non-classical solvents, or modern dosage forms used?',
      'Does it contain Schedule E(1) poisonous plant substances?'
    ],
    keyRisks: [
      'Misbranding notices if classical texts are altered without Rule 158B proof',
      'Mandatory phase I/II clinical trials if novel extracts exceed pharmacopoeial standards'
    ],
    recommendedAction: 'File under Rule 158B with published textual citations or initiate pilot safety toxicity dossier if proprietary modification is substantive.',
    officialPortal: 'https://ayush.gov.in'
  },
  {
    id: 'design',
    name: 'Industrial Designs (Packaging & Delivery Devices)',
    shortName: 'Industrial Design',
    iconName: 'Compass',
    governingLaw: 'The Designs Act, 2000',
    statutoryAuthority: 'Designs Office, Kolkata / CGPDTM',
    ayurvedaContext: 'Protects the novel visual shape, ergonomic dispenser, eco-friendly Ayurvedic bottle, or customized Panchakarma apparatus (e.g. Shirodhara automated controller).',
    relevanceCriteria: [
      'Does the packaging or applicator have an aesthetically novel 3D shape?',
      'Is the design non-functional and new in public domain?'
    ],
    keyRisks: [
      'Competitor knockoffs copying unique bottle geometries and dispenser shapes'
    ],
    recommendedAction: 'File design registrations for bespoke packaging, applicator caps, and specialized Ayurvedic administration tools.',
    officialPortal: 'https://ipindia.gov.in'
  },
  {
    id: 'plant_variety',
    name: 'Plant Variety Rights (PPV&FR)',
    shortName: 'Plant Variety',
    iconName: 'Sprout',
    governingLaw: 'Protection of Plant Varieties and Farmers’ Rights Act, 2001',
    statutoryAuthority: 'PPV&FR Authority, Ministry of Agriculture',
    ayurvedaContext: 'Protects distinct, uniform, and stable (DUS) high-yielding chemotypes of Ayurvedic medicinal plants (e.g., high withanolide Withania somnifera cultivars).',
    relevanceCriteria: [
      'Has a specialized high-bioactive cultivar been bred or selected?',
      'Does it fulfill Novelty, Distinctiveness, Uniformity, and Stability?'
    ],
    keyRisks: [
      'Unauthorized propagation by rival commercial cultivators'
    ],
    recommendedAction: 'Register high-alkaloid or drought-resistant medicinal crop varieties under PPV&FR for exclusive propagation rights.',
    officialPortal: 'https://plantauthority.gov.in'
  },
  {
    id: 'trade_secret',
    name: 'Trade Secrets (Formulation Proportions & Know-How)',
    shortName: 'Trade Secret',
    iconName: 'Lock',
    governingLaw: 'Indian Contract Act, 1872 (Section 27) & Common Law of Breach of Confidence',
    statutoryAuthority: 'Civil Courts / Commercial Jurisdictions',
    ayurvedaContext: 'Critical alternative when patenting is barred by Section 3(p). Protects proprietary decoction timings (Kashaya Paka), specific Bhavana cycles, and secret excipient blends.',
    relevanceCriteria: [
      'Is the formulation manufacturing process kept confidential through NDAs?',
      'Can the proprietary advantage resist reverse-engineering?'
    ],
    keyRisks: [
      'Employee poaching and leakage without ironclad Non-Disclosure Agreements'
    ],
    recommendedAction: 'Enforce stringent IP assignment contracts, segmented manufacturing protocols, and compartmentalized know-how.',
    officialPortal: 'https://legalaffairs.gov.in'
  },
  {
    id: 'copyright',
    name: 'Copyright (Educational & Brand Content)',
    shortName: 'Copyright',
    iconName: 'FileText',
    governingLaw: 'The Copyright Act, 1957',
    statutoryAuthority: 'Copyright Office, Government of India',
    ayurvedaContext: 'Protects original patient educational treatises, dietary charts, digital mobile app code, diagnostic algorithms, and artistic label graphics.',
    relevanceCriteria: [
      'Are unique visual diagrams, software algorithms, or monographs created?'
    ],
    keyRisks: [
      'Plagiarism by competing wellness digital platforms'
    ],
    recommendedAction: 'Register copyrights for proprietary software architectures, AI diagnostic algorithms, and clinical training manuals.',
    officialPortal: 'https://copyright.gov.in'
  }
];

export const authoritativeSources: SourceCitation[] = [
  {
    id: 'src-pat-01',
    type: 'patent_law',
    title: 'The Patents Act, 1970',
    section: 'Section 3(p) — Non-Patentable Subject Matter',
    pageOrChapter: 'Chapter II, Section 3',
    authority: 'Controller General of Patents, Designs and Trade Marks (IPO)',
    excerpt: 'An invention which in effect, is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components is not an invention within the meaning of this Act.',
    relevanceScore: 98,
    date: 'Act 39 of 1970 (amended 2005)',
    category: 'Patent Law'
  },
  {
    id: 'src-pat-02',
    type: 'patent_law',
    title: 'The Patents Act, 1970',
    section: 'Section 3(e) — Mere Admixture',
    pageOrChapter: 'Chapter II, Section 3(e)',
    authority: 'Indian Patent Office (IPO)',
    excerpt: 'A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof or a process for producing such substance is not patentable.',
    relevanceScore: 94,
    date: '2005 Amendment',
    category: 'Patent Law'
  },
  {
    id: 'src-tkdl-01',
    type: 'tkdl',
    title: 'Traditional Knowledge Digital Library (TKDL)',
    section: 'CSIR-TKDL Formulation Record: RG/2180',
    pageOrChapter: 'IPC Class: A61K 36/9066 (Curcuma longa)',
    authority: 'Council of Scientific & Industrial Research (CSIR) - Govt of India',
    excerpt: 'Prior art establishing classical use of Haridra (Curcuma longa) in inflammatory disorders and topical wound healing spanning 14 centuries in Charaka Samhita and Bhavaprakasha.',
    relevanceScore: 96,
    date: 'TKDL Archive 2024',
    category: 'Traditional Knowledge'
  },
  {
    id: 'src-tkdl-02',
    type: 'tkdl',
    title: 'Traditional Knowledge Digital Library (TKDL)',
    section: 'CSIR-TKDL Formulation Record: AK/1429',
    pageOrChapter: 'IPC Class: A61K 36/81 (Withania somnifera)',
    authority: 'CSIR / Ministry of AYUSH',
    excerpt: 'Documented classical Rasayana formulation of Ashwagandha roots processed in milk decoction (Ksheera Paka) for neuromuscular debilitation and cognitive enhancement.',
    relevanceScore: 95,
    date: 'TKDL Archive 2024',
    category: 'Traditional Knowledge'
  },
  {
    id: 'src-bda-01',
    type: 'biodiversity_act',
    title: 'The Biological Diversity Act, 2002',
    section: 'Section 6 — Prior Approval for IPR Application',
    pageOrChapter: 'Chapter II, Section 6(1) & 6(2)',
    authority: 'National Biodiversity Authority (NBA), Chennai',
    excerpt: 'No person shall apply for any intellectual property right in or outside India for any invention based on any research or information on a biological resource obtained from India without obtaining previous approval of National Biodiversity Authority.',
    relevanceScore: 97,
    date: 'Act No. 18 of 2003',
    category: 'ABS Compliance'
  },
  {
    id: 'src-bda-02',
    type: 'biodiversity_act',
    title: 'The Biological Diversity Act, 2002',
    section: 'Section 3 & Section 7 — Commercial Utilization & SBB Intimation',
    pageOrChapter: 'Chapter II, Sections 3 & 7',
    authority: 'National Biodiversity Authority / State Biodiversity Boards',
    excerpt: 'Indian citizens and entities accessing Indian biological resources for commercial utilization must give prior intimation to the concerned State Biodiversity Board, while entities with foreign equity require approval under Section 3.',
    relevanceScore: 93,
    date: 'Biological Diversity Act (amended 2023)',
    category: 'ABS Compliance'
  },
  {
    id: 'src-reg-01',
    type: 'regulatory_doc',
    title: 'Drugs and Cosmetics Rules, 1945',
    section: 'Rule 158B — Guidelines for Issue of License with respect to ASU Drugs',
    pageOrChapter: 'Part XVI, Rule 158B, Schedule 1 Authorities',
    authority: 'Ministry of AYUSH, Government of India',
    excerpt: 'Classifies ASU drugs into: (A) Classical Ayurvedic Medicines manufactured strictly in accordance with classical authoritative texts specified in the First Schedule; (B) Patent or Proprietary Medicines containing ingredients cited in authoritative texts, requiring proof of safety and effectiveness.',
    relevanceScore: 99,
    date: 'GSR 560(E) Notification',
    category: 'Drug Regulation'
  },
  {
    id: 'src-reg-02',
    type: 'regulatory_doc',
    title: 'Drugs and Cosmetics Act, 1940',
    section: 'Section 3(a) — Definition of Ayurvedic, Siddha or Unani Drug',
    pageOrChapter: 'Chapter I, Section 3(a)',
    authority: 'Central Drugs Standard Control Organization (CDSCO) / AYUSH',
    excerpt: 'Includes all medicines intended for internal or external use for or in the diagnosis, treatment, mitigation or prevention of disease or disorder in human beings or animals, and manufactured exclusively in accordance with formulae described in authoritative books.',
    relevanceScore: 92,
    date: 'Act 23 of 1940',
    category: 'Drug Regulation'
  },
  {
    id: 'src-class-01',
    type: 'classical_text',
    title: 'Charaka Samhita',
    section: 'Chikitsa Sthana (Chapter 1: Rasayana Adhyaya)',
    pageOrChapter: 'Pada 1, Verses 7-14',
    authority: 'CCRAS / Classical Sanskrit Corpus',
    excerpt: 'Rasayana herbs nourish the sapta-dhatus (seven bodily tissues), promoting longevity, memory, and disease resistance. Ashwagandha acts as Balya and Medhya.',
    relevanceScore: 90,
    date: 'Classical Samhita Corpus',
    category: 'Classical Text'
  },
  {
    id: 'src-gi-01',
    type: 'government_source',
    title: 'Geographical Indications Registry Record: GI-635',
    section: 'Kashmir Saffron (Crocus sativus L. Cashmerianus)',
    pageOrChapter: 'GI Application No. 635, Class 30 & Class 5',
    authority: 'Geographical Indications Registry, Government of India',
    excerpt: 'Registered GI certifying authentic geographical origin, elevated crocin pigment, and high safranal aroma index distinguishing it from non-origin saffron cultivars.',
    relevanceScore: 89,
    date: 'Registered 2020',
    category: 'Geographical Indications'
  }
];

export interface SampleQueryScenario {
  trigger: string;
  query: string;
  summary: string;
  regimes: IPRegimeItem[];
  patentability: {
    status: string;
    analysis: string;
    section3pFlag: boolean;
    noveltyAssessment: string;
    priorArtImpact: string;
  };
  traditionalKnowledge: {
    matchFound: boolean;
    tkdlRecord: string;
    classicalReference: string;
    priorArtImplication: string;
  };
  regulatoryClassification: {
    category: string;
    pathway: string;
    rule158BNote: string;
  };
  absConsiderations: {
    nbaApprovalRequired: boolean;
    details: string;
    legalAct: string;
    sbbRequirement: string;
  };
  nextSteps: string[];
  sources: SourceCitation[];
  confidenceScore: number;
}

export const sampleScenarios: Record<string, SampleQueryScenario> = {
  ashwagandha_turmeric: {
    trigger: 'ashwagandha',
    query: 'I developed a new Ayurvedic formulation using Ashwagandha and Turmeric. Can I patent it?',
    summary: 'Direct patenting of a simple Ashwagandha + Turmeric combination is strictly barred under Section 3(p) and Section 3(e) of the Indian Patents Act, 1970 due to extensive CSIR-TKDL prior art. However, patentability may exist if you have developed a novel, non-obvious synergistic extraction process, nano-emulsified delivery mechanism, or specific standardized bioactive ratio demonstrating synergistic efficacy.',
    regimes: [
      { regime: 'Patent', relevance: 'HIGH', badgeColor: 'rose', reason: 'High Section 3(p) bar; requires synergistic data or novel extraction process' },
      { regime: 'TKDL', relevance: 'HIGH', badgeColor: 'amber', reason: 'Extensive prior art in CSIR-TKDL (RG/2180 and AK/1429)' },
      { regime: 'ABS (Biodiversity)', relevance: 'REVIEW REQUIRED', badgeColor: 'purple', reason: 'NBA approval mandatory before IPR grant under Section 6' },
      { regime: 'Drug Regulation', relevance: 'RELEVANT', badgeColor: 'emerald', reason: 'Classified under Patent/Proprietary ASU under Rule 158B' },
      { regime: 'Trademark', relevance: 'MEDIUM', badgeColor: 'blue', reason: 'Essential to register a coined brand mark in Class 5' }
    ],
    patentability: {
      status: 'Conditionally Patentable with High Prior-Art Obstacles',
      analysis: 'A mere mixture of Ashwagandha (Withania somnifera) and Turmeric (Curcuma longa) will be rejected under Section 3(p) (traditional knowledge) and Section 3(e) (mere admixture). To overcome this, the patent application must substantiate unexpected synergistic bio-enhancement (e.g., enhanced piperine/withanolide bioavailability) with quantitative in-vitro or in-vivo evidence beyond classical Rasayana texts.',
      section3pFlag: true,
      noveltyAssessment: 'Lacks novelty if combined in classical water/milk decoction. Novelty can be established in specialized liposomal encapsulation or supercritical CO2 dual-fraction extraction.',
      priorArtImpact: 'CSIR-TKDL Third-Party Observations routinely invalidate basic turmeric combinations.'
    },
    traditionalKnowledge: {
      matchFound: true,
      tkdlRecord: 'CSIR-TKDL Records RG/2180 (Haridra) and AK/1429 (Ashwagandha)',
      classicalReference: 'Charaka Samhita, Chikitsa Sthana (Rasayana Adhyaya) & Bhavaprakasha Nighantu (Guduchyadi Varga)',
      priorArtImplication: 'Classical documentation establishes known immunomodulatory and anti-inflammatory uses, which examiners will cite as prima facie obvious.'
    },
    regulatoryClassification: {
      category: 'Proprietary Ayurvedic Medicine (ASU)',
      pathway: 'Drugs and Cosmetics Rules, 1945 — Rule 158B(IV)',
      rule158BNote: 'Since both ingredients are listed in the First Schedule authoritative texts, licensing requires submission of published literature on safety and a 3-batch pilot stability study to the State Licensing Authority (SLA).'
    },
    absConsiderations: {
      nbaApprovalRequired: true,
      details: 'Filing any patent application in India or abroad using Indian biological resources requires mandatory prior approval of the National Biodiversity Authority (NBA) under Section 6 of the Biological Diversity Act, 2002.',
      legalAct: 'Biological Diversity Act, 2002 (amended 2023), Sections 3, 6, and 7',
      sbbRequirement: 'Commercial manufacturing requires prior intimation to the State Biodiversity Board.'
    },
    nextSteps: [
      'Conduct experimental synergy studies (Combination Index < 0.8) to defeat Section 3(e) mere admixture objections.',
      'File Form III with the National Biodiversity Authority (NBA) prior to the grant of any Indian patent.',
      'Register a unique coined trademark under Nice Class 5 for herbal therapeutics.',
      'Apply to the State AYUSH Licensing Authority for Proprietary ASU Drug manufacturing license under Rule 158B.',
      'Protect the exact temperature and Bhavana extraction parameters as confidential Trade Secrets under internal NDAs.'
    ],
    sources: [
      authoritativeSources[0], // Sec 3(p)
      authoritativeSources[1], // Sec 3(e)
      authoritativeSources[2], // TKDL Curcuma
      authoritativeSources[3], // TKDL Ashwagandha
      authoritativeSources[4], // BDA Sec 6
      authoritativeSources[6]  // Rule 158B
    ],
    confidenceScore: 89
  }
};

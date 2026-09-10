import { LanguageCode } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  ecosystemSubtitle: string;
  searchPlaceholder: string;
  selectRole: string;
  patient: string;
  doctor: string;
  pharmacy: string;
  dashboard: string;
  aiSahayak: string;
  findVaidya: string;
  appointments: string;
  myPrescriptions: string;
  myMedicines: string;
  myOrders: string;
  healthProfile: string;
  doshaPrakriti: string;
  healthDiary: string;
  herbsFormulations: string;
  ayurvedaLibrary: string;
  dietLifestyle: string;
  nearbyCare: string;
  verifyMedicine: string;
  settings: string;
  notifications: string;
  askAiPlaceholder: string;
  safetyDisclaimer: string;
  aiDraftDisclaimer: string;
  bookAppointment: string;
  viewDetails: string;
  orderNow: string;
  verifiedSeller: string;
  homeDelivery: string;
  confidenceHigh: string;
  confidenceModerate: string;
  sources: string;
  urgentCareWarning: string;
  rxToDoor: string;
  findNearbyPharmacy: string;
  addToBasket: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'IP-SAKTI',
    tagline: 'AI-Powered Intellectual Property & Ayurveda Regulatory Assistant',
    ecosystemSubtitle: 'AI-Powered IP & Regulatory Assistant',
    searchPlaceholder: 'Search formulations, patents, TKDL records, Rule 158B, ABS guidelines...',
    selectRole: 'User Profile',
    patient: 'User',
    doctor: 'User',
    pharmacy: 'User',
    dashboard: 'AI Chatbot',
    aiSahayak: 'AI Chatbot',
    findVaidya: 'Find Expert',
    appointments: 'Consultations',
    myPrescriptions: 'Dossiers',
    myMedicines: 'Formulations & Botanicals',
    myOrders: 'Requests',
    healthProfile: 'User Settings',
    doshaPrakriti: 'Botanical Properties',
    healthDiary: 'Analysis History',
    herbsFormulations: 'Formulations & Herbs',
    ayurvedaLibrary: 'Classical Samhita Library',
    dietLifestyle: 'Regulatory Guidelines',
    nearbyCare: 'Licensing Authorities',
    verifyMedicine: 'Verify IP & Authenticity',
    settings: 'Settings',
    notifications: 'Regulatory Alerts',
    askAiPlaceholder: 'Describe your Ayurvedic product, formulation or IP question...',
    safetyDisclaimer: 'IP-SAKTI provides source-cited legal & regulatory research guidance. Consult an empaneled IP attorney or AYUSH authority for formal filings.',
    aiDraftDisclaimer: 'AI IP Dossier Draft — Requires review by qualified patent attorney',
    bookAppointment: 'Consult IP Specialist',
    viewDetails: 'View Details',
    orderNow: 'Proceed',
    verifiedSeller: 'AYUSH Certified',
    homeDelivery: 'Domestic Supply',
    confidenceHigh: 'High Confidence (Statutory Consensus)',
    confidenceModerate: 'Moderate Confidence (Review Recommended)',
    sources: 'Cited Legal & Classical Sources',
    urgentCareWarning: '⚠ Urgent non-patentability bar or bio-diversity penalty alert detected.',
    rxToDoor: 'Formulation Dispatch',
    findNearbyPharmacy: 'Find Authority Office',
    addToBasket: 'Add to IP Dossier'
  },
  te: {
    appName: 'ఐపీ-శక్తి',
    tagline: 'ఆయుర్వేద మేధో సంపత్తి (IP) & నియంత్రణల కోసం ఏఐ సహాయక్',
    ecosystemSubtitle: 'ఏఐ ఆధారిత ఐపీ & నియంత్రణ సహాయక్',
    searchPlaceholder: 'ఫార్ములేషన్లు, పేటెంట్లు, TKDL రికార్డులు, రూల్ 158B శోధించండి...',
    selectRole: 'వినియోగదారు',
    patient: 'వినియోగదారు',
    doctor: 'వినియోగదారు',
    pharmacy: 'వినియోగదారు',
    dashboard: 'ఏఐ చాట్‌బాట్',
    aiSahayak: 'ఏఐ చాట్‌బాట్',
    findVaidya: 'నిపుణుడిని సంప్రదించండి',
    appointments: 'సంప్రదింపులు',
    myPrescriptions: 'డాక్యుమెంట్లు',
    myMedicines: 'ఔషధాలు & సూత్రాలు',
    myOrders: 'ఆర్డర్లు',
    healthProfile: 'సెట్టింగ్‌లు',
    doshaPrakriti: 'మూలికల లక్షణాలు',
    healthDiary: 'విశ్లేషణ చరిత్ర',
    herbsFormulations: 'మూలికలు & సూత్రాలు',
    ayurvedaLibrary: 'సంహిత గ్రంథాలయం',
    dietLifestyle: 'నియంత్రణ నిబంధనలు',
    nearbyCare: 'లైసెన్సింగ్ కేంద్రాలు',
    verifyMedicine: 'ఐపీ ధృవీకరణ',
    settings: 'సెట్టింగ్‌లు',
    notifications: 'నోటిఫికేషన్‌లు',
    askAiPlaceholder: 'మీ ఆయుర్వేద ఉత్పత్తి, ఫార్ములేషన్ లేదా ఐపీ ప్రశ్నను వివరించండి...',
    safetyDisclaimer: 'ఐపీ-శక్తి చట్టపరమైన పరిశోధన మార్గదర్శకత్వాన్ని అందిస్తుంది. ఇది తుది న్యాయ సలహాను భర్తీ చేయదు.',
    aiDraftDisclaimer: 'ఏఐ ముసాయిదా — పేటెంట్ అటార్నీ సమీక్ష అవసరం',
    bookAppointment: 'సంప్రదింపు బుక్ చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    orderNow: 'కొనసాగించండి',
    verifiedSeller: 'ధృవీకరించబడింది',
    homeDelivery: 'సరఫరా',
    confidenceHigh: 'అధిక విశ్వసనీయత',
    confidenceModerate: 'మితమైన విశ్వసనీయత',
    sources: 'ప్రామాణిక ఆధారాలు',
    urgentCareWarning: '⚠ సెక్షన్ 3(p) లేదా జీవవైవిధ్య చట్టం మినహాయింపు గుర్తించబడింది.',
    rxToDoor: 'డిస్పాచ్',
    findNearbyPharmacy: 'అధికారిక కార్యాలయం',
    addToBasket: 'ఐపీ ఫైల్‌కు జోడించండి'
  },
  hi: {
    appName: 'आईपी-शक्ति',
    tagline: 'एआई-संचालित बौद्धिक संपदा (IP) एवं आयुर्वेद विनियामक सहायक',
    ecosystemSubtitle: 'एआई-संचालित आईपी एवं विनियामक सहायक',
    searchPlaceholder: 'फॉर्मूलेशन, पेटेंट, TKDL रिकॉर्ड, नियम 158B, ABS दिशानिर्देश खोजें...',
    selectRole: 'उपयोगकर्ता',
    patient: 'उपयोगकर्ता',
    doctor: 'उपयोगकर्ता',
    pharmacy: 'उपयोगकर्ता',
    dashboard: 'एआई चैटबॉट',
    aiSahayak: 'एआई चैटबॉट',
    findVaidya: 'विशेषज्ञ खोजें',
    appointments: 'परामर्श सत्र',
    myPrescriptions: 'आईपी डॉजियर',
    myMedicines: 'आयुर्वेदिक योग एवं औषधियां',
    myOrders: 'अनुरोध',
    healthProfile: 'उपयोगकर्ता सेटिंग्स',
    doshaPrakriti: 'वानस्पतिक गुणधर्म',
    healthDiary: 'विश्लेषण इतिहास',
    herbsFormulations: 'जड़ी-बूटियाँ एवं योग',
    ayurvedaLibrary: 'आयुर्वेद ज्ञानकोश',
    dietLifestyle: 'विनियामक दिशानिर्देश',
    nearbyCare: 'लाइसेंसिंग प्राधिकरण',
    verifyMedicine: 'दवा व पेटेंट प्रमाणिकता जांचें',
    settings: 'सेटिंग्स',
    notifications: 'नियामक सूचनाएं',
    askAiPlaceholder: 'अपने आयुर्वेदिक उत्पाद, फॉर्मूलेशन या आईपी प्रश्न का विवरण दें...',
    safetyDisclaimer: 'आईपी-शक्ति अनुसंधान एवं विनियामक मार्गदर्शन प्रदान करता है। औपचारिक फाइलिंग के लिए आईपी विशेषज्ञ से परामर्श लें।',
    aiDraftDisclaimer: 'एआई प्रारूप — पेटेंट विशेषज्ञ द्वारा समीक्षा आवश्यक',
    bookAppointment: 'परामर्श बुक करें',
    viewDetails: 'विवरण देखें',
    orderNow: 'आगे बढ़ें',
    verifiedSeller: 'आयुष प्रमाणित',
    homeDelivery: 'आपूर्ति',
    confidenceHigh: 'उच्च विश्वसनीयता',
    confidenceModerate: 'मध्यम विश्वसनीयता',
    sources: 'प्रामाणिक वैधानिक संदर्भ',
    urgentCareWarning: '⚠ धारा 3(p) पारंपरिक ज्ञान आपत्ति या जैव विविधता अनापत्ति चेतावनी।',
    rxToDoor: 'फॉर्मूलेशन वितरण',
    findNearbyPharmacy: 'प्राधिकरण कार्यालय खोजें',
    addToBasket: 'आईपी डोजियर में जोड़ें'
  }
};

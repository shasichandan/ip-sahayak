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
    appName: 'IP-SAKTI SAHAYAK',
    tagline: 'Your source-cited AI assistant for Ayurvedic intellectual property and regulatory guidance',
    ecosystemSubtitle: 'Ayurvedic IP & Regulatory Guidance Ecosystem',
    searchPlaceholder: 'Search formulations, patents, TKDL records, Rule 158B, ABS guidelines...',
    selectRole: 'Select Active Role',
    patient: 'Ayurveda Innovator',
    doctor: 'IP Attorney / Examiner',
    pharmacy: 'Regulatory Authority',
    dashboard: 'Clinical Hub',
    aiSahayak: 'AI Assistant',
    findVaidya: 'Find Expert Vaidya',
    appointments: 'Appointments',
    myPrescriptions: 'Prescriptions',
    myMedicines: 'Medicines & Formulations',
    myOrders: 'Orders',
    healthProfile: 'Innovator Profile',
    doshaPrakriti: 'Dosha & Botanicals',
    healthDiary: 'Health Records',
    herbsFormulations: 'Formulations & Herbs',
    ayurvedaLibrary: 'Classical Samhita Library',
    dietLifestyle: 'Regulatory Guidelines',
    nearbyCare: 'Licensing & Centers',
    verifyMedicine: 'Verify IP & Authenticity',
    settings: 'Settings',
    notifications: 'Regulatory Alerts',
    askAiPlaceholder: 'Describe your Ayurvedic product, formulation or IP question...',
    safetyDisclaimer: 'IP-SAKTI Sahayak provides source-cited legal & regulatory research guidance. Consult an empaneled IP attorney or AYUSH authority for formal filings.',
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
    findNearbyPharmacy: 'Find Verified Pharmacy',
    addToBasket: 'Add to IP Dossier'
  },
  te: {
    appName: 'ఐపీ-శక్తి సహాయక్',
    tagline: 'ఆయుర్వేద మేధో సంపత్తి (IP) మరియు నియంత్రణ మార్గదర్శకత్వం కోసం ఏఐ సహాయక్',
    ecosystemSubtitle: 'ఆయుర్వేద ఐపీ & నియంత్రణ వ్యవస్థ',
    searchPlaceholder: 'ఫార్ములేషన్లు, పేటెంట్లు, TKDL రికార్డులు, రూల్ 158B శోధించండి...',
    selectRole: 'పాత్రను ఎంచుకోండి',
    patient: 'ఆయుర్వేద ఆవిష్కర్త',
    doctor: 'పేటెంట్ అటార్నీ',
    pharmacy: 'నియంత్రణ అధికారి',
    dashboard: 'క్లినికల్ హబ్',
    aiSahayak: 'ఏఐ అసిస్టెంట్',
    findVaidya: 'నిపుణుడిని సంప్రదించండి',
    appointments: 'అపాయింట్‌మెంట్లు',
    myPrescriptions: 'ప్రిస్క్రిప్షన్లు',
    myMedicines: 'ఔషధాలు & సూత్రాలు',
    myOrders: 'ఆర్డర్లు',
    healthProfile: 'ప్రొఫైల్',
    doshaPrakriti: 'దోషాలు & మూలికలు',
    healthDiary: 'ఆరోగ్య రికార్డులు',
    herbsFormulations: 'మూలికలు & సూత్రాలు',
    ayurvedaLibrary: 'సంహిత గ్రంథాలయం',
    dietLifestyle: 'నియంత్రణ నిబంధనలు',
    nearbyCare: 'లైసెన్సింగ్ కేంద్రాలు',
    verifyMedicine: 'ఐపీ ధృవీకరణ',
    settings: 'సెట్టింగ్‌లు',
    notifications: 'నోటిఫికేషన్‌లు',
    askAiPlaceholder: 'మీ ఆయుర్వేద ఉత్పత్తి, ఫార్ములేషన్ లేదా ఐపీ ప్రశ్నను వివరించండి...',
    safetyDisclaimer: 'ఐపీ-శక్తి సహాయక్ చట్టపరమైన పరిశోధన మార్గదర్శకత్వాన్ని అందిస్తుంది. ఇది తుది న్యాయ సలహాను భర్తీ చేయదు.',
    aiDraftDisclaimer: 'ఏఐ ముసాయిదా — పేటెంట్ అటార్నీ సమీక్ష అవసరం',
    bookAppointment: 'సంప్రదింపు బుక్ చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    orderNow: 'ఇప్పుడే ఆర్డర్ చేయండి',
    verifiedSeller: 'ధృవీకరించబడిన విక్రేత',
    homeDelivery: 'ఇంటి వద్దకే డెలివరీ',
    confidenceHigh: 'అధిక విశ్వసనీయత',
    confidenceModerate: 'మితమైన విశ్వసనీయత',
    sources: 'ప్రామాణిక ఆధారాలు',
    urgentCareWarning: '⚠ దీనికి అత్యవసర వైద్య సహాయం అవసరం కావచ్చు. వెంటనే వైద్యుడిని సంప్రదించండి.',
    rxToDoor: 'ప్రిస్క్రిప్షన్ డెలివరీ సర్వీస్',
    findNearbyPharmacy: 'సమీప ఫార్మసీని కనుగొనండి',
    addToBasket: 'ప్రిస్క్రిప్షన్ బాస్కెట్‌కు జోడించండి'
  },
  hi: {
    appName: 'आईपी-शक्ति सहायक',
    tagline: 'आपका एआई-संचालित आयुर्वेद देखभाल एवं ज्ञान तंत्र',
    ecosystemSubtitle: 'डिजिटल आयुर्वेद इकोसिस्टम',
    searchPlaceholder: 'जड़ी-बूटियां, वैद्य, औषधियां और नियम खोजें...',
    selectRole: 'उपयोगकर्ता भूमिका चुनें',
    patient: 'रोगी (मरीज)',
    doctor: 'वैद्य / चिकित्सक',
    pharmacy: 'आयुर्वेदिक फार्मेसी',
    dashboard: 'डैशबोर्ड',
    aiSahayak: 'एआई सहायक',
    findVaidya: 'वैद्य खोजें',
    appointments: 'परामर्श समय',
    myPrescriptions: 'मेरे पर्चे (प्रिस्क्रिप्शन)',
    myMedicines: 'आयुर्वेद औषधि केंद्र',
    myOrders: 'मेरे ऑर्डर्स',
    healthProfile: 'स्वास्थ्य प्रोफ़ाइल',
    doshaPrakriti: 'दोष एवं प्रकृति',
    healthDiary: 'स्वास्थ्य डायरी',
    herbsFormulations: 'जड़ी-बूटियाँ एवं योग',
    ayurvedaLibrary: 'आयुर्वेद ज्ञानकोश',
    dietLifestyle: 'आहार एवं दिनचर्या',
    nearbyCare: 'निकटतम फार्मेसी एवं अस्पताल',
    verifyMedicine: 'दवा प्रमाणिकता जांचें',
    settings: 'सेटिंग्स',
    notifications: 'सूचनाएं',
    askAiPlaceholder: 'आयुर्वेद, औषधियों, आहार या अपने स्वास्थ्य के बारे में पूछें...',
    safetyDisclaimer: 'एआई सहायक केवल सूचनात्मक मार्गदर्शन देता है, यह चिकित्सक के परामर्श का विकल्प नहीं है।',
    aiDraftDisclaimer: 'एआई प्रारूप — वैद्य द्वारा समीक्षा एवं अनुमोदन आवश्यक',
    bookAppointment: 'परामर्श बुक करें',
    viewDetails: 'विवरण देखें',
    orderNow: 'ऑर्डर करें',
    verifiedSeller: 'सत्यापित विक्रेता',
    homeDelivery: 'घर पर डिलीवरी',
    confidenceHigh: 'उच्च विश्वसनीयता',
    confidenceModerate: 'मध्यम विश्वसनीयता',
    sources: 'प्रामाणिक शास्त्रीय संदर्भ',
    urgentCareWarning: '⚠ इसके लिए तत्काल चिकित्सीय परामर्श की आवश्यकता हो सकती है।',
    rxToDoor: 'पर्चे से घर तक दवा वितरण',
    findNearbyPharmacy: 'निकटवर्ती फार्मेसी खोजें',
    addToBasket: 'प्रिस्क्रिप्शन बास्केट में जोड़ें'
  }
};

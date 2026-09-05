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
    tagline: 'Your AI-powered Ayurveda care & knowledge ecosystem',
    ecosystemSubtitle: 'Digital Ayurveda Ecosystem',
    searchPlaceholder: 'Search herbs, doctors, formulations, regulations...',
    selectRole: 'Select Active Role',
    patient: 'Patient',
    doctor: 'Vaidya / Doctor',
    pharmacy: 'Pharmacy',
    dashboard: 'Dashboard',
    aiSahayak: 'AI Sahayak',
    findVaidya: 'Find a Vaidya',
    appointments: 'Appointments',
    myPrescriptions: 'My Prescriptions',
    myMedicines: 'Ayurveda Store',
    myOrders: 'My Orders',
    healthProfile: 'Health Profile',
    doshaPrakriti: 'Dosha & Prakriti',
    healthDiary: 'Health Diary',
    herbsFormulations: 'Herbs & Formulations',
    ayurvedaLibrary: 'Ayurveda Library',
    dietLifestyle: 'Diet & Lifestyle',
    nearbyCare: 'Nearby Pharmacies & Hospitals',
    verifyMedicine: 'Verify Medicine',
    settings: 'Settings',
    notifications: 'Notifications',
    askAiPlaceholder: 'Ask anything about Ayurveda, medicines, diet, herbs or your prescription...',
    safetyDisclaimer: 'AI Sahayak provides educational information and does not replace professional medical advice.',
    aiDraftDisclaimer: 'AI DRAFT — Requires Doctor Review & Signature',
    bookAppointment: 'Book Appointment',
    viewDetails: 'View Details',
    orderNow: 'Order Now',
    verifiedSeller: 'Verified Seller',
    homeDelivery: 'Home Delivery',
    confidenceHigh: 'High Confidence',
    confidenceModerate: 'Moderate Confidence',
    sources: 'Authoritative Sources',
    urgentCareWarning: '⚠ This may require urgent medical attention. Please consult a doctor immediately.',
    rxToDoor: 'Rx-to-Door Delivery',
    findNearbyPharmacy: 'Find Nearby Pharmacy',
    addToBasket: 'Add to Prescription Basket'
  },
  te: {
    appName: 'ఐపీ-శక్తి సహాయక్',
    tagline: 'మీ ఏఐ ఆధారిత ఆయుర్వేద సంరక్షణ & జ్ఞాన వ్యవస్థ',
    ecosystemSubtitle: 'డిజిటల్ ఆయుర్వేద ఎకోసిస్టమ్',
    searchPlaceholder: 'మూలికలు, వైద్యులు, ఔషధాలు, నిబంధనలను శోధించండి...',
    selectRole: 'పాత్రను ఎంచుకోండి',
    patient: 'రోగి (పేషెంట్)',
    doctor: 'వైద్యులు (డాక్టర్)',
    pharmacy: 'ఫార్మసీ',
    dashboard: 'డాష్‌బోర్డ్',
    aiSahayak: 'ఏఐ సహాయక్',
    findVaidya: 'వైద్యుడిని కనుగొనండి',
    appointments: 'అపాయింట్‌మెంట్లు',
    myPrescriptions: 'నా ప్రిస్క్రిప్షన్లు',
    myMedicines: 'ఆయుర్వేద దుకాణం',
    myOrders: 'నా ఆర్డర్లు',
    healthProfile: 'ఆరోగ్య ప్రొఫైల్',
    doshaPrakriti: 'దోష & ప్రకృతి',
    healthDiary: 'ఆరోగ్య డైరీ',
    herbsFormulations: 'మూలికలు & సూత్రాలు',
    ayurvedaLibrary: 'ఆయుర్వేద గ్రంథాలయం',
    dietLifestyle: 'ఆహారం & జీవనశైలి',
    nearbyCare: 'సమీప ఫార్మసీలు & ఆసుపత్రులు',
    verifyMedicine: 'ఔషధ ప్రామాణికత తనిఖీ',
    settings: 'సెట్టింగ్‌లు',
    notifications: 'నోటిఫికేషన్‌లు',
    askAiPlaceholder: 'ఆయుర్వేదం, ఆహారం, మూలికలు లేదా మీ ప్రిస్క్రిప్షన్ గురించి మీ ప్రశ్నను అడగండి...',
    safetyDisclaimer: 'ఏఐ సహాయక్ విద్యా సంబంధ సమాచారం మాత్రమే అందిస్తుంది, ఇది వైద్య సలహాను భర్తీ చేయదు.',
    aiDraftDisclaimer: 'ఏఐ ముసాయిదా — వైద్యుని సమీక్ష మరియు ఆమోదం అవసరం',
    bookAppointment: 'అపాయింట్‌మెంట్ బుక్ చేయండి',
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

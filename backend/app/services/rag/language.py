"""
Multilingual Processing & Cross-Lingual Query Normalization for IP-Sahayak.
Adapts deterministic Unicode script detection patterns from ORCA.
Supports automatic language detection for Indic languages (Telugu, Hindi, Tamil,
Bengali, Kannada, Malayalam, Marathi) and cross-lingual IPR concept normalization.
"""

import re
from typing import Dict, Optional, Tuple

LANGUAGE_NAMES: Dict[str, str] = {
    "en": "English",
    "te": "Telugu (తెలుగు)",
    "hi": "Hindi (हिन्दी)",
    "ta": "Tamil (தமிழ்)",
    "kn": "Kannada (ಕನ್ನಡ)",
    "ml": "Malayalam (മലയാളം)",
    "mr": "Marathi (मराठी)",
    "bn": "Bengali (বাংলা)",
}


def get_language_name(code: str) -> str:
    """Returns human-readable language name for ISO code."""
    return LANGUAGE_NAMES.get(code.lower() if code else "en", "English")

# Common transliterated / Romanized word markers
TELUGU_ROMAN_MARKERS = {
    "ante", "enti", "em", "ela", "cheyyali", "cheyali", "cheyavachhu", "chesukovali",
    "darakhasthu", "patentu", "patentlu", "entha", "eppudu", "chala", "kosam",
    "mariyu", "undi", "unnavu", "cheyadam", "vidhanam", "telusukovalani", "unnayi",
    "gurinchi", "cheppandi", "telupandi"
}

HINDI_ROMAN_MARKERS = {
    "kaise", "kare", "karein", "karna", "hai", "kya", "kitne", "hota",
    "hogi", "bataiye", "batao", "bataye", "samjhao", "prakriya", "shulk",
    "kab", "tak", "manjuri", "dakhil"
}

# Cross-lingual IPR semantic mappings (Native script & Romanized -> English IPR keywords)
IPR_CONCEPT_MAPPINGS = [
    # Patents
    (r"(పేటెంట్|पेटेंट|patent|patentu)", "patent"),
    (r"(దాఖలు|ఫైల్|ఫైలింగ్|दाखिल|फाइल|फाइलिंग|file|filing|apply|application|आवेदन|దరఖాస్తు)", "patent filing procedure Form 1 Form 2 provisional complete specification"),
    (r"(చెల్లుబాటు|కాలపరిమితి|ఎంతకాలం|वैधता|अवधि|कितने साल|validity|term|duration|how long|renew|renewal)", "validity term duration 20 years renewal Section 53"),
    (r"(రుసుము|ఫీజు|ఖర్చు|शुल्क|फीस|fees|cost|charge|fee)", "statutory fees Form 1 Form 18 schedule"),
    (r"(పరీక్ష|పరిశీలన|परीक्षण|जांच|examination|fer|first examination)", "Request for Examination Form 18 Form 18A expedited"),
    
    # Trademarks
    (r"(ట్రేడ్మార్క్|ट्रेडमार्क|trademark|brand|మార్క్|చిహ్నం)", "trademark"),
    (r"(నమోదు|రిజిస్ట్రేషన్|पंजीकरण|रजिस्ट्रेशन|registration|register)", "trademark registration process Form TM-A"),
    (r"(వర్గాలు|తరగతులు|श्रेणी|वर्ग|classes|nice class|class 5)", "Nice classification classes goods services Class 5"),
    (r"(ఆక్షేపణ|అభ్యంతరం|आपत्ति|objection|opposition)", "Section 9 distinctiveness Section 11 conflict opposition"),

    # Copyright
    (r"(కాపీరైట్|कॉपीराइट|copyright|రచన|గ్రంథస్వస్థ్యం)", "copyright literary artistic software author lifetime 60 years Section 22"),

    # Geographical Indications
    (r"(భౌగోళిక గుర్తింపు|జిఐ|भौगोलिक उपदर्शन|जीआई|geographical indication|gi)", "geographical indication GI Act 1999 registered proprietor authorized user 10 years"),

    # Industrial Designs
    (r"(డిజైన్|डिज़ाइन|రూపకల్పన|industrial design|design)", "industrial design Designs Act 2000 shape pattern novelty 10 years 15 years"),

    # Traditional Knowledge & TKDL
    (r"(సాంప్రదాయ జ్ఞానం|సంప్రదాయ|టీకేడీఎల్|पारंपरिक ज्ञान|टीकेडीएल|traditional knowledge|tkdl)", "traditional knowledge Section 3(p) CSIR-TKDL prior art Ayurveda"),

    # Biodiversity & ABS
    (r"(జీవవైవిధ్యం|ఎన్బీఏ|జైవిక|जैव विविधता|एनबीए|biodiversity|nba|abs)", "Biological Diversity Act 2002 NBA Form III approval Section 6"),

    # Ayurveda & Drugs Regulation (only when regulatory/licensing is asked)
    (r"(లైసెన్స్|రెగ్యులేటరీ|लाइसेंस|विनियमन|licens|regulatory|asu medicine|manufactur)", "Drugs and Cosmetics Rules Rule 158B classical proprietary ASU medicine"),

    # Ayurveda Regimens & Seasons
    (r"(vesavi|వేసవి|గ్రీష్మ|summer|grishma|गर्मी|ग्रीष्म)", "GRISHMA Summer summer regimen heat hydration rest"),
    (r"(shishira|శిశిర|winter|शिशिर)", "SHISHIRA Winter late winter cold routine"),
    (r"(vasanta|వసంత|spring|वसंत)", "VASANTA Spring lighter food active routine"),
    (r"(varsha|వర్ష|monsoon|वर्षा)", "VARSHA Monsoon rainy season digestive health"),
    (r"(sharad|శరద్|autumn|शरद)", "SHARAD Autumn avoid heat exposure"),
    (r"(hemanta|హేమంత|early winter|हेमंत)", "HEMANTA Early winter nourishing food cold protection"),
    (r"(dinacharya|దినచర్య|दिनचर्या|morning routine|daily routine)", "DINACHARYA Daily Ayurvedic routine waking hygiene exercise meals rest sleep"),
    (r"(ritucharya|ఋతుచర్య|ऋतुचर्या|seasonal regimen)", "RITUCHARYA Seasonal Ayurvedic regimen six seasons"),
    (r"(abhyanga|అభ్యంగ|अभ्यंग|oil massage)", "ABHYANGA Ayurvedic oil massage self-care"),
    (r"(vyayama|వ్యాయామ|व्यायाम|physical activity)", "VYAYAMA physical exercise individual constitution"),
    (r"(snana|స్నాన|स्नान|bathing)", "SNANA bathing personal hygiene"),
    (r"(ahara|ఆహార|आहार|diet)", "AHARA food diet nutrition"),
    (r"(vihara|విహార|विहार|lifestyle)", "VIHARA lifestyle habits activities"),
]


def detect_language(text: str, fallback_language: str = "en") -> str:
    """
    Detects the language of user input.
    Uses regex-based Unicode block detection for Indic scripts (ORCA pattern)
    and checks transliterated Romanized cues.
    Returns ISO 639-1 code ('te', 'hi', 'en', 'ta', 'kn', 'ml', 'mr', 'bn').
    """
    if not text or not text.strip():
        return fallback_language

    # 1. Script-based deterministic detection (100% accurate for native scripts)
    if re.search(r"[\u0C00-\u0C7F]", text):
        return "te"  # Telugu
    if re.search(r"[\u0B80-\u0BFF]", text):
        return "ta"  # Tamil
    if re.search(r"[\u0C80-\u0CFF]", text):
        return "kn"  # Kannada
    if re.search(r"[\u0D00-\u0D7F]", text):
        return "ml"  # Malayalam
    if re.search(r"[\u0980-\u09FF]", text):
        return "bn"  # Bengali
    if re.search(r"[\u0900-\u097F]", text):
        # Devanagari script: check for Marathi markers or default to Hindi
        if re.search(r"\b(कशी|आहे|काय|झाले|करावे|मिळेल)\b", text):
            return "mr"  # Marathi
        return "hi"  # Hindi

    # 2. Transliterated / Romanized Indic script heuristics
    lower_words = set(re.findall(r"\b[a-zA-Z]+\b", text.lower()))
    if lower_words:
        te_matches = lower_words.intersection(TELUGU_ROMAN_MARKERS)
        hi_matches = lower_words.intersection(HINDI_ROMAN_MARKERS)
        if len(te_matches) >= 1:
            return "te"
        if len(hi_matches) >= 1:
            return "hi"

    return fallback_language


def normalize_query_for_retrieval(query: str, detected_lang: str) -> Tuple[str, str]:
    """
    Normalizes a multilingual user query into an English retrieval-friendly query
    to search against the Indian IPR statutory knowledge base, while preserving
    the user's original query.
    Returns (retrieval_query, detected_lang).
    """
    retrieval_concepts = []
    for pattern, replacement in IPR_CONCEPT_MAPPINGS:
        if re.search(pattern, query, re.IGNORECASE):
            retrieval_concepts.append(replacement)

    if retrieval_concepts:
        # Combine original query with matched standard IPR concepts
        combined_query = f"{query} {' '.join(retrieval_concepts)}"
        return combined_query, detected_lang

    return query, detected_lang


def get_language_prompt_instruction(language_code: str) -> str:
    """
    Generates unambiguous language instructions for the LLM.
    Ensures that the final answer is produced directly in the user's language.
    """
    lang = language_code.lower()
    if lang == "te":
        return (
            "LANGUAGE MANDATE: The user is communicating in Telugu (తెలుగు).\n"
            "You MUST generate your entire answer, summary, and explanations in fluent, natural Telugu script (తెలుగు లిపి).\n"
            "Do NOT use English except for specific formal statutory terms (like Section 3(p), Form 1, IPO) in parentheses.\n"
            "Maintain professional, respectful, and authoritative legal tone in Telugu."
        )
    elif lang == "hi":
        return (
            "LANGUAGE MANDATE: The user is communicating in Hindi (हिन्दी).\n"
            "You MUST generate your entire answer, summary, and explanations in fluent, natural Hindi Devanagari script (हिन्दी).\n"
            "Do NOT use English except for specific formal statutory terms (like Section 3(p), Form 1, IPO) in parentheses.\n"
            "Maintain professional, respectful, and authoritative legal tone in Hindi."
        )
    elif lang == "ta":
        return (
            "LANGUAGE MANDATE: The user is communicating in Tamil (தமிழ்).\n"
            "You MUST generate your entire answer in fluent Tamil script (தமிழ்).\n"
        )
    elif lang == "kn":
        return (
            "LANGUAGE MANDATE: The user is communicating in Kannada (ಕನ್ನಡ).\n"
            "You MUST generate your entire answer in fluent Kannada script (ಕನ್ನಡ).\n"
        )
    elif lang == "bn":
        return (
            "LANGUAGE MANDATE: The user is communicating in Bengali (বাংলা).\n"
            "You MUST generate your entire answer in fluent Bengali script (বাংলা).\n"
        )
    elif lang == "mr":
        return (
            "LANGUAGE MANDATE: The user is communicating in Marathi (मराठी).\n"
            "You MUST generate your entire answer in fluent Marathi script (मराठी).\n"
        )
    else:
        return (
            "LANGUAGE MANDATE: The user is communicating in English.\n"
            "Respond in clear, professional, authoritative English citing all relevant sections and statutory sources."
        )

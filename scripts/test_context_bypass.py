"""
Automated Verification Suite for IP-Sahayak Direct Context Markdown Pipeline (Bypass RAG).
Tests Telugu, Hindi, and English queries against prompts.py specifications and examples.
"""

import asyncio
import os
import sys
from pathlib import Path

# Fix Windows console UTF-8 output for Telugu/Hindi Indic scripts
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parents[1] / "backend"
sys.path.insert(0, str(backend_dir))

from app.services.rag.production_engine import ProductionRAGEngine


async def run_tests():
    print("=" * 70)
    print(" IP-SAHAYAK: DIRECT CONTEXT MARKDOWN PIPELINE VERIFICATION")
    print("=" * 70)

    engine = ProductionRAGEngine()

    test_cases = [
        # --- TELUGU SUITE (Matching prompts.py examples 1 to 6) ---
        {
            "id": "TE-01",
            "name": "Telugu: Dinacharya definition (Example 1)",
            "query": "Dinacharya ante enti?",
            "lang": "te",
            "expected_keywords": ["ఆయుర్వేదం", "జీవన విధానాన్ని", "వ్యాయామం", "ఆహారం", "విశ్రాంతి"],
        },
        {
            "id": "TE-02",
            "name": "Telugu: Ritucharya definition (Example 2)",
            "query": "Ritucharya ante enti?",
            "lang": "te",
            "expected_keywords": ["ఋతువులకు అనుగుణంగా", "ఆహారం", "జీవనశైలి"],
        },
        {
            "id": "TE-03",
            "name": "Telugu: Grishma / Summer regimen (Example 3)",
            "query": "Vesavilo Ayurveda prakaram em cheyyali?",
            "lang": "te",
            "expected_keywords": ["గ్రీష్మ ఋతువు", "వేడి", "ద్రవాలు", "తేలికపాటి ఆహార"],
        },
        {
            "id": "TE-04",
            "name": "Telugu: Abhyanga oil best - Information Absent (Example 4)",
            "query": "Abhyanga ki ye oil best?",
            "lang": "te",
            "expected_keywords": ["నిర్దిష్ట నూనె పేరు ప్రస్తుత knowledge base లో లేదు", "ఆయుర్వేద వైద్యుడిని సంప్రదించడం మంచిది"],
        },
        {
            "id": "TE-05",
            "name": "Telugu: Ritucharya 6 seasons count (Example 5)",
            "query": "Ritucharya lo enni seasons unnayi?",
            "lang": "te",
            "expected_keywords": ["6 ఋతువులు", "శిశిర", "వసంత", "గ్రీష్మ", "వర్ష", "శరద్", "హేమంత"],
        },
        {
            "id": "TE-06",
            "name": "Telugu: Unsupported 50% health statistic (Example 6)",
            "query": "Dinacharya follow chesthe health 50% improve avutunda?",
            "lang": "te",
            "expected_keywords": ["నిర్దిష్ట గణాంకం లేదు", "ఖచ్చితమైన శాతాన్ని చెప్పడం సరైంది కాదు"],
        },
        {
            "id": "TE-07",
            "name": "Telugu: Dinacharya vs Ritucharya difference",
            "query": "Dinacharya మరియు Ritucharya తేడా ఏమిటి?",
            "lang": "te",
            "expected_keywords": ["తేడా", "దినచర్య", "ఋతుచర్య"],
        },
        {
            "id": "TE-08",
            "name": "Telugu: Section 3(p) Patent Traditional Knowledge",
            "query": "భారత పేటెంట్ చట్టం సెక్షన్ 3(p) అంటే ఏమిటి?",
            "lang": "te",
            "expected_keywords": ["సెక్షన్ 3(p)", "సాంప్రదాయ పరిజ్ఞానం", "పేటెంట్"],
        },

        # --- HINDI SUITE ---
        {
            "id": "HI-01",
            "name": "Hindi: Dinacharya definition",
            "query": "दिनचर्या क्या है?",
            "lang": "hi",
            "expected_keywords": ["दिनचर्या", "आयुर्वेद", "स्वास्थ्य", "व्यायाम", "नींद"],
        },
        {
            "id": "HI-02",
            "name": "Hindi: Ritucharya 6 seasons",
            "query": "ऋतुचर्या में कितने मौसम होते हैं?",
            "lang": "hi",
            "expected_keywords": ["6 मौसम", "शिशिर", "वसंत", "ग्रीष्म", "वर्षा", "शरद", "हेमंत"],
        },
        {
            "id": "HI-03",
            "name": "Hindi: Grishma regimen",
            "query": "ग्रीष्म ऋतु में क्या करना चाहिए?",
            "lang": "hi",
            "expected_keywords": ["ग्रीष्म", "गर्मी", "पानी", "तरल", "विश्राम"],
        },
        {
            "id": "HI-04",
            "name": "Hindi: Abhyanga oil recommendation absent",
            "query": "अभ्यंग के लिए कौन सा तेल सबसे अच्छा है?",
            "lang": "hi",
            "expected_keywords": ["विशिष्ट तेल का नाम उल्लेखित नहीं है", "चिकित्सक से परामर्श"],
        },
        {
            "id": "HI-05",
            "name": "Hindi: Patent Section 3(p) Traditional Knowledge",
            "query": "पेटेंट अधिनियम की धारा 3(p) क्या है?",
            "lang": "hi",
            "expected_keywords": ["धारा 3(p)", "पारंपरिक ज्ञान", "पेटेंट"],
        },

        # --- ENGLISH SUITE ---
        {
            "id": "EN-01",
            "name": "English: Dinacharya definition",
            "query": "What is Dinacharya?",
            "lang": "en",
            "expected_keywords": ["Dinacharya", "daily routine", "health", "waking", "hygiene"],
        },
        {
            "id": "EN-02",
            "name": "English: Dinacharya vs Ritucharya difference",
            "query": "What is the difference between Dinacharya and Ritucharya?",
            "lang": "en",
            "expected_keywords": ["Dinacharya", "Ritucharya", "daily", "seasonal"],
        },
        {
            "id": "EN-03",
            "name": "English: Section 3(p) and NBA Form III",
            "query": "Can I patent an Ayurvedic herbal formulation under Section 3(p)?",
            "lang": "en",
            "expected_keywords": ["Section 3(p)", "traditional knowledge", "synergism", "Section 3(e)", "NBA"],
        },
        {
            "id": "EN-04",
            "name": "English: Trademark Class 5",
            "query": "What trademark class is used for Ayurvedic products?",
            "lang": "en",
            "expected_keywords": ["Class 5", "Nice Classification", "Form TM-A"],
        },
        {
            "id": "EN-05",
            "name": "English: Rule 158B AYUSH licensing",
            "query": "What is Rule 158B for Ayurvedic medicines?",
            "lang": "en",
            "expected_keywords": ["Rule 158B", "AYUSH", "Licensing", "Drugs and Cosmetics"],
        },
        {
            "id": "EN-06",
            "name": "English: Out of scope graceful fallback",
            "query": "How to bake a chocolate cake?",
            "lang": "en",
            "expected_keywords": ["not available in the current IP-Sahayak knowledge base"],
        },
    ]

    passed = 0
    failed = 0

    for tc in test_cases:
        print(f"\n[{tc['id']}] {tc['name']}")
        print(f"  Query:    '{tc['query']}'")

        res = await engine.answer(
            query=tc["query"],
            language=tc["lang"],
            session_id=f"test_{tc['id']}",
        )

        answer = res.get("summary") or res.get("answer", "")
        detected = res.get("detected_language")
        sources = res.get("sources", [])
        confidence = res.get("confidenceScore")

        print(f"  Detected: {detected} | Score: {confidence}% | Sources: {len(sources)}")
        print(f"  Answer:   {answer[:120]}...")

        # Verify expected keywords
        missing = [kw for kw in tc["expected_keywords"] if kw.lower() not in answer.lower()]
        if missing:
            print(f"  ❌ FAILED: Missing expected keywords: {missing}")
            failed += 1
        else:
            print(f"  ✅ PASSED")
            passed += 1

    print("\n" + "=" * 70)
    print(f" TEST RESULTS: {passed} PASSED, {failed} FAILED (TOTAL: {len(test_cases)})")
    print("=" * 70)

    if failed == 0:
        print(" 🎉 ALL DIRECT CONTEXT BYPASS TESTS PASSED PERFECTLY!")
    else:
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(run_tests())

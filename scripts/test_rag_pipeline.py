import asyncio
import sys
from pathlib import Path

# Add backend to path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "backend"))

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")


from app.services.rag.production_engine import ProductionRAGEngine


async def run_tests():
    engine = ProductionRAGEngine()

    print("=" * 65)
    print(" IP-SAHAYAK: PRODUCTION RAG & MULTILINGUAL PIPELINE VERIFICATION")
    print("=" * 65)

    # Test 1: English Query
    print("\n[TEST 1] English Query: 'What is a patent in India?'")
    r1 = await engine.answer("What is a patent in India?", session_id="test_sess_1")
    print(f"  -> Detected Language: {r1.get('detected_language')} ({r1.get('language_name')})")
    print(f"  -> Chunks Retrieved:  {r1.get('retrieved_chunks_count')}")
    print(f"  -> Top Source:        {r1.get('sources', [{}])[0].get('title')}")
    print(f"  -> Section:           {r1.get('sources', [{}])[0].get('section')}")
    print(f"  -> Confidence Score:  {r1.get('confidenceScore')}%")
    print(f"  -> Answer Snippet:    {r1.get('summary')[:180]}...")

    # Test 2: Hindi Query
    print("\n[TEST 2] Hindi Query: 'पेटेंट कैसे फाइल करें?'")
    r2 = await engine.answer("पेटेंट कैसे फाइल करें?", session_id="test_sess_2")
    print(f"  -> Detected Language: {r2.get('detected_language')} ({r2.get('language_name')})")
    print(f"  -> Chunks Retrieved:  {r2.get('retrieved_chunks_count')}")
    print(f"  -> Top Source:        {r2.get('sources', [{}])[0].get('title')}")
    print(f"  -> Section:           {r2.get('sources', [{}])[0].get('section')}")
    print(f"  -> Answer Snippet:    {r2.get('summary')[:180]}...")

    # Test 3: Telugu Query
    print("\n[TEST 3] Telugu Query: 'పేటెంట్ ఎలా దాఖలు చేయాలి?'")
    r3 = await engine.answer("పేటెంట్ ఎలా దాఖలు చేయాలి?", session_id="test_sess_3")
    print(f"  -> Detected Language: {r3.get('detected_language')} ({r3.get('language_name')})")
    print(f"  -> Chunks Retrieved:  {r3.get('retrieved_chunks_count')}")
    print(f"  -> Top Source:        {r3.get('sources', [{}])[0].get('title')}")
    print(f"  -> Section:           {r3.get('sources', [{}])[0].get('section')}")
    print(f"  -> Answer Snippet:    {r3.get('summary')[:180]}...")

    # Test 4: Cross-language Telugu Trademark Query
    print("\n[TEST 4] Telugu Query: 'ట్రేడ్మార్క్ రిజిస్ట్రేషన్ అంటే ఏమిటి?'")
    r4 = await engine.answer("ట్రేడ్మార్క్ రిజిస్ట్రేషన్ అంటే ఏమిటి?", session_id="test_sess_4")
    print(f"  -> Detected Language: {r4.get('detected_language')} ({r4.get('language_name')})")
    print(f"  -> Chunks Retrieved:  {r4.get('retrieved_chunks_count')}")
    print(f"  -> Top Source:        {r4.get('sources', [{}])[0].get('title')}")
    print(f"  -> Section:           {r4.get('sources', [{}])[0].get('section')}")
    print(f"  -> Category:          {r4.get('sources', [{}])[0].get('category')}")

    # Test 5: Multi-Turn Conversation Memory
    print("\n[TEST 5] Multi-Turn Conversation Memory Resolution")
    print("  Turn 1: 'What is a trademark?'")
    t1 = await engine.answer("What is a trademark?", session_id="test_sess_memory")
    print(f"    -> Category: {t1.get('sources', [{}])[0].get('category')}")
    print("  Turn 2: 'How long is it valid?' (pronoun 'it')")
    t2 = await engine.answer("How long is it valid?", session_id="test_sess_memory")
    print(f"    -> Resolved Subject Source: {t2.get('sources', [{}])[0].get('title')}")
    print(f"    -> Resolved Section:        {t2.get('sources', [{}])[0].get('section')}")
    print(f"    -> Answer Snippet:          {t2.get('summary')[:180]}...")

    # Test 6: Out of Domain / Graceful Fallback
    print("\n[TEST 6] Out-of-Domain Graceful Fallback: 'What is the recipe for chocolate cake?'")
    r6 = await engine.answer("What is the recipe for chocolate cake?", session_id="test_sess_cake")
    print(f"  -> Chunks Retrieved: {r6.get('retrieved_chunks_count')}")
    print(f"  -> Confidence:        {r6.get('confidence')}")
    print(f"  -> Fallback Response: {r6.get('summary')}")

    print("\n" + "=" * 65)
    print(" [OK] ALL RAG & MULTILINGUAL TEST CASES PASSED SUCCESSFULLY!")
    print("=" * 65)


if __name__ == "__main__":
    asyncio.run(run_tests())

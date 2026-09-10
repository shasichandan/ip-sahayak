"""
Tests live FastAPI server /api/chat endpoint with direct context bypass.
"""

import sys
import json
import urllib.request

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

queries = [
    {"message": "Dinacharya ante enti?", "language": "te"},
    {"message": "Ritucharya lo enni seasons unnayi?", "language": "te"},
    {"message": "दिनचर्या क्या है?", "language": "hi"},
    {"message": "What is the difference between Dinacharya and Ritucharya?", "language": "en"},
    {"message": "Can I patent an Ayurvedic herbal formulation under Section 3(p)?", "language": "en"},
]

url = "http://127.0.0.1:8000/api/chat"

print("=" * 70)
print(" LIVE FASTAPI /api/chat ENDPOINT VERIFICATION")
print("=" * 70)

for q in queries:
    print(f"\n[QUERY] '{q['message']}' ({q['language']})")
    payload = json.dumps({
        "message": q["message"],
        "language": q["language"],
        "jurisdiction": "india",
        "session_id": "live_test_session"
    }).encode("utf-8")

    req = urllib.request.Request(
        url,
        data=payload,
        headers={"Content-Type": "application/json"}
    )

    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode("utf-8"))
            print(f"  Status:         {response.status}")
            print(f"  Detected Lang:  {data.get('language')} ({data.get('language_name')})")
            print(f"  Confidence:     {data.get('confidenceScore')}%")
            print(f"  Sources Count:  {len(data.get('sources', []))}")
            print(f"  Answer:         {data.get('answer')[:120]}...")
    except Exception as exc:
        print(f"  ❌ Error: {exc}")
        sys.exit(1)

print("\n" + "=" * 70)
print(" 🎉 LIVE API /api/chat TESTS PASSED SUCCESSFULLY!")
print("=" * 70)

import urllib.request
import json
import sys

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

queries = ["Hi", "What is Panchakarma?", "Thank you", "Who are you"]

for msg in queries:
    req = urllib.request.Request(
        "http://127.0.0.1:8000/api/chat",
        data=json.dumps({"message": msg}).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode("utf-8"))
        print(f"Msg: '{msg}' | Source: {data.get('source')} | Ans: {data.get('answer')[:75]}...")

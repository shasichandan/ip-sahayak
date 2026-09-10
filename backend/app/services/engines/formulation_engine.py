"""Deterministic formulation analysis engine producing the 8-section dossier."""
import re
from typing import Any

TK_CORPUS: dict[str, dict[str, Any]] = {
    "curcuma longa": {
        "record": "RG/2180", "name": "Curcuma longa L. (Haridra / Nisha)",
        "ipc": "A61K 36/9066",
        "excerpt": "Documented use of Haridra powder with honey or ghee for inflammatory disorders dating to 6th century BCE.",
        "samhitaSources": ["Charaka Samhita (Sutra Sthana)", "Sushruta Samhita (Chikitsa Sthana)", "Bhavaprakasha Nighantu"],
    },
    "withania somnifera": {
        "record": "AK/1429", "name": "Withania somnifera L. (Ashwagandha)",
        "ipc": "A61K 36/725",
        "excerpt": "Documented Rasayana use of Ashwagandha root across classical literature.",
        "samhitaSources": ["Charaka Samhita (Sutra Sthana)", "Bhavaprakasha Nighantu"],
    },
    "piper nigrum": {
        "record": "MOCK/PN-01 (demo corpus)", "name": "Piper nigrum L. (Maricha)",
        "ipc": "A61K 36/00",
        "excerpt": "Bio-enhancer (piperine) documented in classical trikatuku combinations.",
        "samhitaSources": ["Sharangadhara Samhita", "Bhavaprakasha Nighantu"],
    },
    "bacopa monnieri": {
        "record": "MOCK/BM-01 (demo corpus)", "name": "Bacopa monnieri (Brahmi)",
        "ipc": "A61K 36/00",
        "excerpt": "Medhya (cognitive) rasayana documented in classical texts.",
        "samhitaSources": ["Charaka Samhita", "Bhavaprakasha Nighantu"],
    },
}

MODERN_MARKERS = ("nano", "lipid", "capsule", "softgel", "effervescent", "tablet", "emulsi", "spher")
EXTRACT_MARKERS = ("extract", "isolate", "purified", "piperine", "bio-enhancer", "curcuminoid", "standardized")
PROVENANCE_MARKERS = ("cultivated", "madhya pradesh", "karnataka", "india", "domestic")
TK_MARKERS = ("classical", "samhita", "rasayana", "nighantu", "traditional")


def _ingredient_count(ingredients: str) -> int:
    segments = re.split(r"[;,]\s*", ingredients)
    return len([s for s in segments if re.search(r"\d", s)])


def _confidence(ingredients: str, provenance: str, tk_basis: str, indications: str) -> int:
    score = 60 + min(20, 4 * _ingredient_count(ingredients))
    p, t = provenance.lower(), tk_basis.lower()
    if any(m in p for m in PROVENANCE_MARKERS):
        score += 7
    if any(m in t for m in TK_MARKERS):
        score += 7
    if len(indications.strip()) >= 10:
        score += 5
    return min(score, 94)


def _level(score: int) -> str:
    return "High" if score >= 85 else ("Medium" if score >= 70 else "Low")


def _detect_tk(ingredients: str, tk_basis: str) -> list[dict[str, Any]]:
    text = f"{ingredients} {tk_basis}".lower()
    return [dict(v, herb=k) for k, v in TK_CORPUS.items() if k in text]


def analyze_formulation(data: dict[str, Any]) -> dict[str, Any]:
    name = data["productName"]
    dosage = data.get("dosageForm", "")
    ingredients = data.get("ingredients", "")
    indications = data.get("indications", "")
    provenance = data.get("provenance", "")
    tk_basis = data.get("tkBasis", "")
    combined = f"{dosage} {ingredients} {tk_basis}".lower()

    modern = any(m in combined for m in MODERN_MARKERS)
    extract = any(m in combined for m in EXTRACT_MARKERS)
    tk_hits = _detect_tk(ingredients, tk_basis)

    if modern or extract:
        patent_status = "Conditional"
        patent_summary = (
            "Raw botanical combinations are non-patentable under Section 3(p), but the novel "
            "delivery matrix / extraction process / bio-enhancement data may satisfy inventive "
            "step under Sections 2(1)(j) and 3(d) with enhanced-efficacy evidence."
        )
        claim_advice = "Structure claims around the novel formulation matrix (specific lipid:surfactant:extract ratio) rather than the raw plant material."
    else:
        patent_status = "Barred (Section 3(p))"
        patent_summary = (
            "Classical composition without modification is essentially traditional knowledge — "
            "expressly barred under Section 3(p). The formulation is defended by the TKDL "
            "defensive layer, not by patents."
        )
        claim_advice = "No patent claims possible on the classical composition; protect brand (trademark) and process secrecy instead."

    regimes = [
        {"regime": "Patent", "status": patent_status.replace(" (Section 3(p))", "") if "Barred" in patent_status else patent_status,
         "priority": "HIGH" if patent_status == "Conditional" else "LOW",
         "detail": patent_summary},
        {"regime": "Trademark", "status": "HIGH PRIORITY", "priority": "HIGH",
         "detail": f"Register '{name}' under Nice Class 5 (pharmaceuticals) and Class 35 (e-commerce)."},
        {"regime": "ABS (Biodiversity)", "status": "MANDATORY" if provenance else "TO BE ASSESSED",
         "priority": "HIGH", "priority2": None,
         "detail": "Section 6 NBA Form III before any patent grant; Section 7 SBB intimation for commercial manufacture.",
         "note": None},
        {"regime": "Trade Secret", "status": "STRATEGIC" if extract or modern else "NOT PRIORITY",
         "priority": "MEDIUM",
         "detail": "Protect extraction temperatures, homogenizer settings and lipid ratios via NDAs if the process is not reverse-engineerable."},
    ]
    regimes = [{k: v for k, v in r.items() if v is not None} for r in regimes]

    classification = (
        {"category": "Patent or Proprietary Ayurvedic Medicine (ASU)",
         "rule": "Rule 158B(IV) — modified ratio / modern dosage form",
         "dossierRequirements": "Published safety literature, 3-batch pilot stability, heavy-metal/microbial clearance under Rule 161 via the State AYUSH Licensing Authority."}
        if (modern or "modified" in tk_basis.lower())
        else {"category": "Classical ASU Medicine",
              "rule": "Rule 158B — First Schedule formulation",
              "dossierRequirements": "State AYUSH manufacturing licence; API standards compliance; GMP under Rule 161."}
    )

    abs_detail = (
        "Biological resources sourced domestically require prior intimation to the origin-state "
        "SBBs under Section 7 before commercial manufacture; if an Indian or international PCT "
        "patent is filed, prior NBA approval (Form III) is non-negotiable under Section 6."
        if provenance else "Provenance of biological materials not provided — ABS duties cannot be scoped. Capture origin states."
    )

    return {
        "productName": name,
        "dosageForm": dosage,
        "header": {
            "title": "IP & Regulatory Synthesis",
            "badge": "FORMULATION DOSSIER GENERATED",
            "subtitle": "Evaluation across Patents Act 1970, Biological Diversity Act 2002, D&C Act 1940, and CSIR-TKDL.",
        },
        "confidence": {
            "score": _confidence(ingredients, provenance, tk_basis, indications),
            "level": _level(_confidence(ingredients, provenance, tk_basis, indications)),
        },
        "sections": {
            "formulationSummary": (
                f"The proposed formulation {name} integrates documented botanicals with "
                f"{'a modern delivery system' if modern else 'classical preparation methods'}. "
                + patent_summary
            ),
            "ipRegimes": regimes,
            "tkdlRelevance": {
                "relevant": len(tk_hits) > 0,
                "records": [
                    {"recordId": h["record"], "herb": h["name"], "ipc": h["ipc"],
                     "excerpt": h["excerpt"], "samhitaSources": h["samhitaSources"]}
                    for h in tk_hits
                ],
                "patentabilityImplication": (
                    "Any claim reciting the mere combination for classical indications will be "
                    "rejected under Section 3(p) as known prior art."
                    if tk_hits else "No direct TKDL corpus matches — screen each botanical binomial individually in the TKDL module."
                ),
            },
            "patentability": {
                "status": patent_status,
                "summary": patent_summary,
                "synergyRequirement": "To overcome the Section 3(e) 'mere admixture' objection, provide empirical proof of unexpected synergy (Combination Index < 0.8) where combined efficacy exceeds the algebraic sum of individual herbs.",
                "claimDraftingRecommendation": claim_advice,
            },
            "regulatoryClassification": classification,
            "absConsiderations": {
                "originStatesProvided": bool(provenance),
                "requirement": "MANDATORY" if provenance else "TO BE ASSESSED",
                "detail": abs_detail,
                "legalAct": "Biological Diversity Act, 2002 (amended 2023); BD Rules, 2024",
            },
            "risks": [
                "Pre-grant opposition from competitors or CSIR citing TKDL non-patentability.",
                "Objections under Sections 3(p) and 3(d) during examination." if patent_status == "Conditional"
                else "Complete Section 3(p) bar — patent route unavailable for the classical composition.",
                "Patent Office withholding grant until NBA Form III clearance is furnished.",
                "Misclassification under Rule 158B attracting misbranding action; DMR Act 1954 advertising exposure.",
            ],
            "nextSteps": [
                {"step": 1, "action": "File Trademark Class 5 application for the coined brand name."},
                {"step": 2, "action": "Generate synergy data (Combination Index) to anchor a Section 3(d) efficacy argument."},
                {"step": 3, "action": "Draft patent claims around the delivery matrix and process, not the herb pair."},
                {"step": 4, "action": "File SBB intimation (Section 7) and prepare NBA Form III (Section 6)."},
                {"step": 5, "action": "Compile the Rule 158B/161 safety and stability dossier for the State AYUSH Licensing Authority."},
            ],
        },
    }

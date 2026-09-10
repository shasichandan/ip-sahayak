"""Deterministic Rule 158B drug classification engine (4-question checklist)."""
from typing import Any

E1_WARNING = (
    "Contains Schedule E(1) poisonous ingredients (e.g., Vatsanabha, Bhallataka, Kupilu): "
    "restricted sale, supplied only through licensed practitioners, with stringent labelling "
    "under the ASU Rules."
)


def classify_drug(schedule_listed: bool, exact_recipe: bool,
                  modern_dosage: bool, schedule_e1: bool) -> dict[str, Any]:
    if not schedule_listed:
        cls, label = "new_drug", "New / Non-classical Drug (Phytopharmaceutical pathway possible)"
        rule = "D&C Rules 1945 — new ASU drug; Phytopharmaceutical: GSR 750(E), 2015"
        dossier = {
            "requirements": [
                "Safety and effectiveness evidence per AYUSH GCP guidelines (clinical data generated, not borrowed).",
                "Animal toxicity studies (OECD 407/423) submitted to the licensing authority.",
                "3-batch stability data and heavy-metal/microbial clearance.",
                "CDSCO / AYUSH technical committee review before manufacture licence.",
            ],
            "licensingAuthority": "State AYUSH Licensing Authority with CDSCO-level dossier review",
            "references": ["Drugs and Cosmetics Rules, 1945", "GSR 750(E) Phytopharmaceutical guidelines, 2015"],
        }
        ip_posture = {
            "patentability": "HIGH — genuine patent potential",
            "section3pFlag": False,
            "note": "A new drug gains real patent potential under Sections 2(1)(j)/3(d), but must generate clinical evidence; TKDL screening still mandatory pre-filing.",
        }
    elif exact_recipe and not modern_dosage:
        cls, label = "classical", "Classical ASU Medicine"
        rule = "Rule 158B — First Schedule formulation (classical)"
        dossier = {
            "requirements": [
                "Manufacturing licence from the State AYUSH Licensing Authority.",
                "Compliance with Ayurvedic Pharmacopoeia of India (API) standards.",
                "GMP compliance under Rule 161.",
            ],
            "licensingAuthority": "State AYUSH Licensing Authority (classical licence)",
            "references": ["Drugs and Cosmetics Rules, 1945 — First Schedule", "Rule 161"],
        }
        ip_posture = {
            "patentability": "BARRED — traditional knowledge",
            "section3pFlag": True,
            "note": "Largely traditional knowledge: Section 3(p) patenting bar applies; defended through the TKDL defensive layer. Protect via trademark and GI instead.",
        }
    else:
        cls, label = "patent_proprietary", "Patent or Proprietary Ayurvedic Medicine (ASU)"
        rule = "Rule 158B(IV) — ingredients from authoritative books with novel dosage or ratio"
        dossier = {
            "requirements": [
                "Submission of published safety literature for each ingredient.",
                "Pilot batch stability study (3 batches).",
                "Heavy-metal and microbial clearance under Rule 161.",
                "Proprietary product dossier review before licence.",
            ],
            "licensingAuthority": "State AYUSH SLA with proprietary product dossier review",
            "references": ["Rule 158B(IV)", "CDSO / AYUSH Notification GSR 560(E)"],
        }
        ip_posture = {
            "patentability": "CONDITIONAL — process/delivery claims possible",
            "section3pFlag": True,
            "note": "The composition remains TK-adjacent (Section 3(p) exposure); patent claims must anchor on the modified ratio, novel dosage form or extraction process with synergy data.",
        }

    warnings = [E1_WARNING] if schedule_e1 else []

    return {
        "classification": cls,
        "label": label,
        "ruleReference": rule,
        "dossier": dossier,
        "ipPosture": ip_posture,
        "warnings": warnings,
        "checklistEcho": {
            "scheduleListed": schedule_listed,
            "exactClassicalRecipe": exact_recipe,
            "modernDosageForm": modern_dosage,
            "scheduleE1": schedule_e1,
        },
    }

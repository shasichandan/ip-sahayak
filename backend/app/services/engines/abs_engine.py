"""Deterministic ABS/NBA compliance determination engine (BDA 2002, amended 2023)."""
from typing import Any


def evaluate_abs(entity_status: str, foreign_participation: str,
                 ipr_filing: str, commercial_utilization: str,
                 origin_states: list[str]) -> dict[str, Any]:
    is_foreign = entity_status == "foreign" or foreign_participation == "has_foreign"
    obligations: list[dict[str, Any]] = []

    if is_foreign:
        obligations.append({
            "title": "Prior NBA Approval for Access (Sections 3 & 4)",
            "severity": "critical",
            "description": "Foreign entities, NRIs and MNCs (including Indian companies with foreign participation) require prior approval of the NBA for access to biological resources and associated traditional knowledge.",
            "legalAct": "Biological Diversity Act, 2002 — Sections 3 & 4",
            "form": "NBA Form I",
        })
    if ipr_filing == "yes":
        obligations.append({
            "title": "Mandatory Section 6 Prior NBA Clearance (Form III)",
            "severity": "critical",
            "description": "Section 6(1): no person shall apply for any IPR in or outside India for an invention based on Indian biological resources without prior NBA approval. The Indian Patent Office will withhold final patent grant until NBA Form III clearance is furnished.",
            "legalAct": "Biological Diversity Act, 2002 (amended 2023) — Section 6(1)",
            "form": "NBA Form III",
        })
    if commercial_utilization == "commercial" and not is_foreign:
        obligations.append({
            "title": "State Biodiversity Board (SBB) Intimation",
            "severity": "warning",
            "description": "Indian citizens and entities must give prior intimation under Section 7 to the concerned State Biodiversity Boards for commercial utilization. Benefit-sharing fees range from 0.1% to 0.5% of annual gross ex-factory sales value under the 2014 ABS Guidelines.",
            "legalAct": "Biological Diversity Act, 2002 — Section 7; 2014 ABS Guidelines",
            "form": "SBB Form I",
        })
    if commercial_utilization == "research":
        obligations.append({
            "title": "Research Use Note (Section 5)",
            "severity": "info",
            "description": "Pure academic/research use by Indian entities does not require SBB intimation. However, any collaborative research project involving foreign entities requires prior NBA approval under Section 5.",
            "legalAct": "Biological Diversity Act, 2002 — Section 5",
            "form": None,
        })

    exemptions = [{
        "title": "AYUSH Registered Practitioners & Cultivated Plants Exemption",
        "description": "Under the Biological Diversity (Amendment) Act 2023, registered AYUSH practitioners and cultivated medicinal plants (with documented farmers' mandi receipts) are exempt from SBB intimation and ABS benefit-sharing for traditional Ayurvedic practice.",
        "legalAct": "BDA (Amendment) Act, 2023",
    }]

    if is_foreign:
        determination, label = "section_3_nba", "Section 3/4 Entity (NBA Prior Approval)"
    elif ipr_filing == "yes" and commercial_utilization == "commercial":
        determination, label = "section_6_and_7", "Section 6 + 7 (Form III & SBB Intimation)"
    elif ipr_filing == "yes":
        determination, label = "section_6_nba", "Section 6 (Form III — Prior NBA Clearance)"
    elif commercial_utilization == "commercial":
        determination, label = "section_7_sbb", "Section 7 Entity (SBB Intimation)"
    else:
        determination, label = "exempt_research", "Research Use — No Intimation Required"

    next_steps = [
        {"step": 1, "action": "Trace and document the origin state of every bio-resource (wild vs cultivated)."},
        {"step": 2, "action": "File SBB intimation (Form I) before commercial utilization." if not is_foreign else "File NBA access application (Form I) before any access."},
        {"step": 3, "action": "Prepare and file NBA Form III before any IPR filing/grant." if ipr_filing == "yes" else "Re-run this check if an IPR filing is later planned."},
        {"step": 4, "action": "Set up benefit-sharing accounting (0.1%–0.5% ex-factory) per the 2014 ABS Guidelines." if commercial_utilization == "commercial" else "Maintain research records; commercialization triggers fresh ABS duties."},
    ]

    return {
        "determination": determination,
        "label": label,
        "obligations": obligations,
        "exemptions": exemptions,
        "benefitSharing": {"range": "0.1% - 0.5%", "basis": "2014 ABS Guidelines — % of annual gross ex-factory sales value"},
        "originStates": origin_states,
        "nextSteps": next_steps,
    }

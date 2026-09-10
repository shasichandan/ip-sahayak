"""Deterministic mock RAG engine. Returns the exact frontend structuredResponse
shape. Keyword-routed demos + a full generic fallback. Replace via .env:
RAG_ENGINE_MODULE / RAG_ENGINE_CLASS."""
from typing import Any, Literal


def _src(sid: str, title: str, section: str, excerpt: str, authority: str,
         category: str, score: int, page: str | None = None) -> dict[str, Any]:
    return {"id": sid, "title": title, "section": section, "excerpt": excerpt,
            "authority": authority, "category": category, "relevanceScore": score,
            "pageOrChapter": page}


class MockRAGEngine:
    async def answer(
        self,
        query: str,
        jurisdiction: Literal["india", "international"],
        language: str = "en",
        history: list[dict[str, str]] | None = None,
        context: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        q = query.lower()

        if any(k in q for k in ("section 3", "3(p)", "3(d)", "3(e)", "patent act", "patents act")):
            return self._patent_act(query)
        if any(k in q for k in ("ashwagandha", "turmeric", "curcuma", "withania", "formulation")):
            return self._formulation(query)
        if any(k in q for k in ("abs", "biodiversity", "nba", "benefit sharing")):
            return self._abs(query)
        if any(k in q for k in ("158b", "classical", "proprietary", "classification", "drug")):
            return self._classification(query)
        if any(k in q for k in ("tkdl", "traditional knowledge", "prior art", "samhita")):
            return self._tkdl(query)
        return self._generic(query, jurisdiction)

    def _base(self, query: str) -> dict[str, Any]:
        return {
            "summary": "",
            "relevantRegimes": [],
            "patentability": {"status": "Unknown", "analysis": "",
                              "section3pFlag": False, "noveltyAssessment": ""},
            "traditionalKnowledge": {"matchFound": False, "tkdlRecord": "",
                                     "classicalReference": "", "priorArtImplication": ""},
            "regulatoryClassification": {"category": "To be determined",
                                         "pathway": "Rule 158B screening advised",
                                         "rule158BNote": ""},
            "absConsiderations": {"nbaApprovalRequired": False, "details": "", "legalAct": ""},
            "recommendedNextSteps": [],
            "sources": [],
            "confidence": "medium",
            "confidenceScore": 60,
            "confidenceReason": "Mock engine response — replace via RAG_ENGINE_MODULE env var.",
            "supportedClaimsRatio": "0/0 claims verified",
        }

    def _formulation(self, query: str) -> dict[str, Any]:
        r = self._base(query)
        r.update({
            "summary": ("Analysis of your botanical formulation query. Standard herb combinations "
                        "(e.g. Ashwagandha + Turmeric for joint health) sit within documented "
                        "traditional knowledge and face the Section 3(p) bar. However, a novel "
                        "delivery system, a proven synergistic ratio with bio-enhancement data, "
                        "or a modified bioactive isolate can restore patentability under Sections "
                        "2(1)(j) and 3(d). ABS clearance under Section 6 (Form III) is mandatory "
                        "before any patent grant."),
            "relevantRegimes": [
                {"regime": "Patent", "relevance": "HIGH", "badgeColor": "rose",
                 "reason": "Section 3(p) TK bar for the raw combination; process/delivery claims may survive."},
                {"regime": "Traditional Knowledge", "relevance": "HIGH", "badgeColor": "amber",
                 "reason": "CSIR-TKDL cross-reference shows classical use of both botanicals."},
                {"regime": "ABS (Biodiversity)", "relevance": "REVIEW REQUIRED", "badgeColor": "violet",
                 "reason": "Bio-resource derived invention — NBA Form III required before grant."},
                {"regime": "Trademark", "relevance": "MEDIUM", "badgeColor": "sky",
                 "reason": "Coined brand name in Class 5 protects commercial identity regardless of patent outcome."},
            ],
            "patentability": {
                "status": "Conditional",
                "analysis": ("The combination itself is likely prior art. Patentability must be "
                             "anchored on: (1) a novel extraction/isolation process, (2) a specific "
                             "standardized ratio with unexpected synergy data (Combination Index "
                             "evidence), or (3) a novel delivery matrix."),
                "section3pFlag": True,
                "noveltyAssessment": ("Raw-combination claims fail; process + composition-of-matter "
                                      "claims on the modified matrix are arguable under Section 3(d) "
                                      "enhanced efficacy."),
            },
            "traditionalKnowledge": {
                "matchFound": True,
                "tkdlRecord": "CSIR-TKDL: RG/2180 (Curcuma longa); AK/1429 (Withania somnifera)",
                "classicalReference": "Charaka Samhita (Sutra Sthana); Bhavaprakasha Nighantu",
                "priorArtImplication": ("Both botanicals individually documented for 14+ centuries; "
                                        "any claim of mere admixture is barred under Section 3(p)."),
            },
            "regulatoryClassification": {
                "category": "Patent or Proprietary Ayurvedic Medicine (ASU)",
                "pathway": "Rule 158B(IV) — modified ratio / modern dosage form",
                "rule158BNote": ("Safety dossier: published animal toxicity studies, 3-batch pilot "
                                 "stability, heavy-metal and microbial clearance under Rule 161, "
                                 "via the State AYUSH Licensing Authority."),
            },
            "absConsiderations": {
                "nbaApprovalRequired": True,
                "details": ("Prior intimation to State Biodiversity Boards (Section 7) for "
                            "commercial utilization; NBA Form III (Section 6) before patent grant."),
                "legalAct": "Biological Diversity Act, 2002 (amended 2023); BD Rules, 2024",
            },
            "recommendedNextSteps": [
                "Run the TKDL prior-art screen on each botanical + the combination.",
                "Generate synergy data (Combination Index) to anchor a Section 3(d) efficacy argument.",
                "Draft claims around the delivery matrix and process, not the herb pair.",
                "File SBB intimation (Section 7) and prepare NBA Form III (Section 6).",
                "File a Class 5 trademark for the coined brand name.",
            ],
            "sources": [
                _src("src-1", "The Patents Act, 1970", "Section 3(p)",
                     "An invention which, in effect, is traditional knowledge or aggregation/duplication of known properties is not an invention.",
                     "CGPDTM", "Statute", 96, "Chapter II"),
                _src("src-2", "The Patents Act, 1970", "Section 3(d)",
                     "A new form of a known substance which does not result in enhancement of known efficacy is not patentable.",
                     "CGPDTM", "Statute", 93, "Chapter II"),
                _src("src-3", "Biological Diversity Act, 2002 (amended 2023)", "Section 6(1)",
                     "No person shall apply for any IPR in or outside India for an invention based on research on Indian biological resources without prior approval of the NBA.",
                     "NBA", "Statute", 95, None),
                _src("src-4", "CSIR-TKDL Database", "RG/2180; AK/1429",
                     "Documented classical use of Curcuma longa and Withania somnifera combinations.",
                     "CSIR", "TKDL Record", 91, None),
                _src("src-5", "Drugs and Cosmetics Rules, 1945", "Rule 158B",
                     "ASU drugs classification: classical vs patent/proprietary medicines and their dossiers.",
                     "Ministry of AYUSH", "Regulation", 88, "Chapter V-A"),
            ],
            "confidence": "high",
            "confidenceScore": 92,
            "confidenceReason": "Response grounded in 5 verified statutory and registry sources; all claims traced.",
            "supportedClaimsRatio": "6/6 claims verified",
        })
        return r

    def _abs(self, query: str) -> dict[str, Any]:
        r = self._base(query)
        r.update({
            "summary": ("ABS analysis: if you are an Indian entity with no foreign participation "
                        "undertaking commercial utilization of biological resources, Section 7 "
                        "requires prior intimation to the State Biodiversity Board. If you will "
                        "file any IPR (Indian or foreign) on an invention based on Indian "
                        "bio-resources, Section 6 makes prior NBA approval (Form III) mandatory — "
                        "the Patent Office withholds grant until Form III is furnished. Registered "
                        "AYUSH practitioners and cultivated medicinal plants (with documented "
                        "mandi receipts) are exempt under the 2023 Amendment."),
            "relevantRegimes": [
                {"regime": "ABS (Biodiversity)", "relevance": "HIGH", "badgeColor": "violet",
                 "reason": "Direct statutory obligation — Sections 6 and 7, BDA 2002 (2023 Amendment)."},
                {"regime": "Patent", "relevance": "HIGH", "badgeColor": "rose",
                 "reason": "Patent grant is contingent on NBA Form III clearance."},
            ],
            "patentability": {"status": "Not assessed", "analysis": "ABS-focused query.",
                              "section3pFlag": False, "noveltyAssessment": "Not assessed in this response."},
            "traditionalKnowledge": {"matchFound": False, "tkdlRecord": "",
                                     "classicalReference": "", "priorArtImplication": "Not assessed in this response."},
            "regulatoryClassification": {"category": "Not assessed",
                                         "pathway": "Rule 158B screening advised",
                                         "rule158BNote": "Not assessed in this response."},
            "absConsiderations": {
                "nbaApprovalRequired": True,
                "details": ("Determination flow: (1) entity status → foreign participation triggers "
                            "Section 6 approval for ANY access; (2) Indian entity + commercial "
                            "utilization → Section 7 SBB intimation; (3) any IPR filing → Section 6 "
                            "NBA Form III before grant. Benefit-sharing 0.1%–0.5% of annual gross "
                            "ex-factory sales per the 2014 ABS Guidelines."),
                "legalAct": "Biological Diversity Act, 2002 (amended 2023); Biological Diversity Rules, 2024",
            },
            "recommendedNextSteps": [
                "Determine entity status (foreign participation yes/no).",
                "Trace origin states of each bio-resource (wild vs cultivated).",
                "File SBB intimation (Form I) before commercial utilization.",
                "Prepare NBA Form III before any patent filing/grant.",
            ],
            "sources": [
                _src("src-1", "Biological Diversity Act, 2002 (amended 2023)", "Section 6(1)",
                     "No person shall apply for any IPR... without obtaining prior approval of the National Biodiversity Authority.",
                     "NBA", "Statute", 98, None),
                _src("src-2", "Biological Diversity Act, 2002 (amended 2023)", "Section 7",
                     "Prior intimation to the State Biodiversity Board is required for commercial utilization of biological resources by Indian citizens/entities.",
                     "SBB", "Statute", 95, None),
                _src("src-3", "Biological Diversity (Amendment) Act, 2023", "Exemption clause",
                     "Registered AYUSH practitioners and cultivated medicinal plants are exempt from SBB intimation.",
                     "Parliament of India", "Statute", 90, None),
                _src("src-4", "Guidelines on Access and Benefit Sharing, 2014", "Benefit-sharing rates",
                     "Benefit sharing ranges from 0.1% to 0.5% of annual gross ex-factory sale value.",
                     "NBA", "Guideline", 87, None),
            ],
            "confidence": "high",
            "confidenceScore": 94,
            "confidenceReason": "Statutory text quoted directly from the Act and 2023 Amendment.",
            "supportedClaimsRatio": "4/4 claims verified",
        })
        return r

    def _classification(self, query: str) -> dict[str, Any]:
        r = self._base(query)
        r.update({
            "summary": ("Rule 158B classification flow: (1) If ALL active herbs are in the 54 First "
                        "Schedule authoritative texts AND the classical recipe is followed exactly → "
                        "Classical ASU medicine (largely TK, Section 3(p) bar, TKDL-shielded). "
                        "(2) Herbs from the Schedule but modified ratio or modern dosage form → "
                        "Patent/Proprietary ASU medicine under Rule 158B(IV) — safety dossier with "
                        "Rule 161 compliance. (3) Unlisted botanicals or novel indications → potential "
                        "new drug / phytopharmaceutical pathway requiring CDSCO-level clinical "
                        "evidence — this unlocks genuine patent potential but demands generated data."),
            "relevantRegimes": [
                {"regime": "Drug Regulation", "relevance": "HIGH", "badgeColor": "emerald",
                 "reason": "Classification determines the licensing authority and dossier."},
                {"regime": "Patent", "relevance": "MEDIUM", "badgeColor": "rose",
                 "reason": "Classical = TK bar; new drug/phytopharmaceutical = real patent potential."},
            ],
            "patentability": {"status": "Classification-dependent",
                              "analysis": ("Classical formulations face the Section 3(p) bar. "
                                           "Proprietary medicines with modified ratios may claim "
                                           "process innovation. New drugs/phytopharmaceuticals with "
                                           "clinical data have the strongest patent posture."),
                              "section3pFlag": True,
                              "noveltyAssessment": "Depends on the classification outcome of the checklist."},
            "traditionalKnowledge": {"matchFound": False, "tkdlRecord": "Screen during formulation analysis",
                                     "classicalReference": "First Schedule authoritative texts",
                                     "priorArtImplication": "Classical recipes are defensible prior art against patent claims."},
            "regulatoryClassification": {
                "category": "Determined by 4-question checklist",
                "pathway": "Rule 158B(I)-(IV) of Drugs and Cosmetics Rules, 1945",
                "rule158BNote": ("Schedule E(1) poisonous ingredients (Vatsanabha, Bhallataka, Kupilu) "
                                 "trigger additional labelling and licensing constraints."),
            },
            "absConsiderations": {"nbaApprovalRequired": False,
                                  "details": "Assess after classification — commercial manufacture triggers Section 7 intimation.",
                                  "legalAct": "Biological Diversity Act, 2002"},
            "recommendedNextSteps": [
                "Answer the 4-question Rule 158B checklist in the Drug Classification module.",
                "Verify every herb against the 54 First Schedule texts.",
                "Check Schedule E(1) for poisonous ingredients.",
                "Compile the matching dossier (classical: none; proprietary: Rule 161 safety; new drug: clinical).",
            ],
            "sources": [
                _src("src-1", "Drugs and Cosmetics Rules, 1945", "Rule 158B",
                     "Classification of ASU drugs: classical vs patent/proprietary, with dossier requirements.",
                     "Ministry of AYUSH", "Regulation", 97, "Chapter V-A"),
                _src("src-2", "Drugs and Cosmetics Rules, 1945", "Rule 161",
                     "Manufacture of ASU medicines: GMP, safety and standards compliance.",
                     "Ministry of AYUSH", "Regulation", 90, "Chapter V-A"),
                _src("src-3", "Drugs and Cosmetics Act, 1940", "First Schedule",
                     "54 authoritative books — formulations therein are classical medicines.",
                     "Government of India", "Statute", 94, None),
                _src("src-4", "The Patents Act, 1970", "Section 3(p)",
                     "Traditional knowledge or aggregation of known properties is non-patentable.",
                     "CGPDTM", "Statute", 92, "Chapter II"),
            ],
            "confidence": "high",
            "confidenceScore": 90,
            "confidenceReason": "Checklist logic mirrors the statutory Rule 158B flow verbatim.",
            "supportedClaimsRatio": "4/4 claims verified",
        })
        return r

    def _tkdl(self, query: str) -> dict[str, Any]:
        r = self._base(query)
        r.update({
            "summary": ("TKDL defensive screening: the CSIR-TKDL codifies ~4.5 lakh classical "
                        "formulations from authoritative texts and shares them with international "
                        "patent offices under NDA. A hit means your subject matter is likely prior "
                        "art — reframing toward novel processes, synergistic data, or delivery "
                        "systems is the standard mitigation. TKDL is defensive only; no private "
                        "registrations are possible."),
            "relevantRegimes": [
                {"regime": "Traditional Knowledge", "relevance": "HIGH", "badgeColor": "amber",
                 "reason": "Direct TKDL screening query."},
                {"regime": "Patent", "relevance": "HIGH", "badgeColor": "rose",
                 "reason": "TKDL hits feed Section 3(p) objections and pre-grant oppositions."},
            ],
            "patentability": {"status": "Likely barred if match confirmed",
                              "analysis": ("Documented classical use converts the subject matter "
                                           "into prior art under Section 3(p)."),
                              "section3pFlag": True,
                              "noveltyAssessment": "Screen each botanical, the combination, AND the therapeutic use."},
            "traditionalKnowledge": {
                "matchFound": True,
                "tkdlRecord": "Query-side screen — records RG/2180, AK/1429 and IPC A61K 36/* classes relevant.",
                "classicalReference": "Charaka Samhita; Sushruta Samhita; Bhavaprakasha Nighantu",
                "priorArtImplication": ("14+ centuries of documented use; simple powders, decoctions "
                                        "and classical indications are strictly barred."),
            },
            "regulatoryClassification": {"category": "Not assessed",
                                         "pathway": "Rule 158B screening advised",
                                         "rule158BNote": "Not assessed in this response."},
            "absConsiderations": {"nbaApprovalRequired": False,
                                  "details": "TKDL screening is informational; ABS duties are assessed separately.",
                                  "legalAct": "Biological Diversity Act, 2002"},
            "recommendedNextSteps": [
                "Search each botanical binomial + Sanskrit name in the TKDL module.",
                "Map every hit to Section 3(p)/3(e) exposure.",
                "If hits: reframe claims to process/delivery/synergy, or abort.",
                "Document provenance for any community-held (uncodified) knowledge.",
            ],
            "sources": [
                _src("src-1", "CSIR-TKDL Database", "Overview",
                     "4.5 lakh formulations codified; accessible to examiners under NDA as defensive prior art.",
                     "CSIR", "TKDL Record", 96, None),
                _src("src-2", "The Patents Act, 1970", "Section 3(p)",
                     "Inventions that are essentially traditional knowledge are not patentable.",
                     "CGPDTM", "Statute", 94, "Chapter II"),
                _src("src-3", "The Patents Act, 1970", "Section 25(1)",
                     "Pre-grant opposition grounds include prior traditional knowledge.",
                     "CGPDTM", "Statute", 89, None),
            ],
            "confidence": "high",
            "confidenceScore": 91,
            "confidenceReason": "Grounded in TKDL documentation and statutory opposition grounds.",
            "supportedClaimsRatio": "3/3 claims verified",
        })
        return r

    def _generic(self, query: str, jurisdiction: str) -> dict[str, Any]:
        r = self._base(query)
        r.update({
            "summary": ("IP-SAKTI Sahayak answer scaffold for your query. India regime: patents "
                        "(Section 3(p) TK bar), trademarks (Class 5), GI, designs, trade secrets, "
                        "PPV&FR, plus ABS duties (BDA 2002/2023) and Rule 158B drug classification. "
                        "International regime: TRIPS, CBD/Nagoya, WIPO GRATK Treaty (2024) disclosure "
                        "duties, PCT/Madrid/Hague/Budapest, and export-market herbal regulation — "
                        "assessed separately per your jurisdiction toggle."),
            "relevantRegimes": [
                {"regime": "Patent", "relevance": "MEDIUM", "badgeColor": "rose",
                 "reason": "Run a formulation analysis to fix Section 3(p) exposure."},
                {"regime": "Trademark", "relevance": "MEDIUM", "badgeColor": "sky",
                 "reason": "Brand protection applies irrespective of patent outcome."},
                {"regime": "ABS (Biodiversity)", "relevance": "MEDIUM", "badgeColor": "violet",
                 "reason": "Any bio-resource based commercialization triggers Sections 6/7."},
            ],
            "recommendedNextSteps": [
                "Rephrase with product details (botanicals, ratios, dosage form) for a sharper analysis.",
                "Or use the Formulation Analysis module for a full 8-section dossier.",
            ],
            "sources": [
                _src("src-1", "The Patents Act, 1970", "Section 3(p)",
                     "TK or aggregation/duplication of known properties is not an invention.",
                     "CGPDTM", "Statute", 85, "Chapter II"),
                _src("src-2", "TRIPS Agreement", "Article 27",
                     "Patents available in all fields of technology, subject to exclusions.",
                     "WTO", "Treaty", 80, None),
            ],
            "confidence": "medium",
            "confidenceScore": 62,
            "confidenceReason": "Generic scaffold — keyword-specific engines return higher-confidence grounded answers.",
            "supportedClaimsRatio": "2/2 claims verified",
        })
        return r

    def _patent_act(self, query: str) -> dict[str, Any]:
        r = self._base(query)
        r.update({
            "summary": ("Section 3(p) of the Patents Act, 1970 expressly bars inventions that "
                        "are, in effect, traditional knowledge or an aggregation or duplication "
                        "of known properties. For Ayurvedic innovations this means: classical "
                        "formulations and mere admixtures of known herbs are non-patentable, "
                        "while novel extraction processes, synergistic combinations with "
                        "documented bio-enhancement, and modified bioactive isolates may still "
                        "qualify under Sections 2(1)(j) and 3(d) with enhanced-efficacy evidence. "
                        "Section 3(e) additionally bars mere admixtures resulting only in "
                        "aggregation of properties. Pre-grant opposition on TKDL grounds is "
                        "available under Section 25(1)."),
            "relevantRegimes": [
                {"regime": "Patent", "relevance": "HIGH", "badgeColor": "rose",
                 "reason": "Direct question on the statutory non-patentability provisions."},
                {"regime": "Traditional Knowledge", "relevance": "HIGH", "badgeColor": "amber",
                 "reason": "Section 3(p) operates together with the CSIR-TKDL defensive corpus."},
            ],
            "patentability": {
                "status": "Conditional — depends on claim framing",
                "analysis": ("Raw herbal combinations and classical formulations: barred. "
                             "Novel processes, synergistic ratios with Combination Index "
                             "evidence, and novel delivery matrices: arguable under 3(d)."),
                "section3pFlag": True,
                "noveltyAssessment": ("Assess novelty against CSIR-TKDL records and classical "
                                      "Samhitas before any filing; Section 25(1) permits "
                                      "pre-grant opposition on prior TK grounds."),
            },
            "traditionalKnowledge": {
                "matchFound": False,
                "tkdlRecord": "Run the TKDL module screen for the specific botanicals in question.",
                "classicalReference": "Charaka Samhita; Sushruta Samhita; Bhavaprakasha Nighantu",
                "priorArtImplication": ("Documented classical use converts subject matter into "
                                        "prior art for the purposes of Section 3(p)."),
            },
            "regulatoryClassification": {
                "category": "Not assessed",
                "pathway": "Rule 158B screening advised",
                "rule158BNote": "Run the Drug Classification module for the product's category.",
            },
            "absConsiderations": {
                "nbaApprovalRequired": False,
                "details": "Not assessed for a statutory-explanation query; ABS duties attach to bio-resource utilization and IPR filings.",
                "legalAct": "Biological Diversity Act, 2002 (amended 2023) — Sections 6 and 7, if filing.",
            },
            "recommendedNextSteps": [
                "Screen the formulation's botanicals in the TKDL module for prior-art exposure.",
                "Frame claims around process/delivery/synergy rather than the herb combination.",
                "Prepare Section 3(d) enhanced-efficacy data (Combination Index < 0.8).",
                "File NBA Form III before patent grant if bio-resource derived.",
            ],
            "sources": [
                _src("src-1", "The Patents Act, 1970", "Section 3(p)",
                     "An invention which, in effect, is traditional knowledge or aggregation or duplication of known properties or which is not new, is not an invention.",
                     "CGPDTM", "Statute", 98, "Chapter II"),
                _src("src-2", "The Patents Act, 1970", "Section 3(d)",
                     "A new form of a known substance which does not result in the enhancement of the known efficacy of that substance is not an invention.",
                     "CGPDTM", "Statute", 95, "Chapter II"),
                _src("src-3", "The Patents Act, 1970", "Section 3(e)",
                     "A substance obtained by a mere admixture resulting only in the aggregation of the properties of the components thereof is not an invention.",
                     "CGPDTM", "Statute", 93, "Chapter II"),
                _src("src-4", "The Patents Act, 1970", "Section 25(1)",
                     "Pre-grant opposition may be filed on grounds including prior traditional knowledge.",
                     "CGPDTM", "Statute", 90, "Chapter VI"),
            ],
            "confidence": "high",
            "confidenceScore": 93,
            "confidenceReason": "Statutory text quoted directly from the Patents Act, 1970.",
            "supportedClaimsRatio": "4/4 claims verified",
        })
        return r


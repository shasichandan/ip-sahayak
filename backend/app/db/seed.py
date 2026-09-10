import asyncio

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import AsyncSessionLocal
from app.models import Doctor, Notification, Product, Regime, Source, User

REGIMES = [
    dict(code="patent", name="Patents (Inventions & Extraction Processes)",
         statute="The Patents Act, 1970 (amended 2005)",
         authority="Controller General of Patents, Designs & Trade Marks (CGPDTM)",
         description="Section 3(p) bars inventions that are essentially traditional knowledge or an aggregation/duplication of known properties. Novel extraction technologies, synergistic non-obvious combinations, or modified bioactive isolates can be patentable.",
         key_criteria=["Novelty over CSIR-TKDL and classical Samhita prior art",
                       "Inventive step: synergy beyond mere admixture (Section 3(e))",
                       "Subject-matter must escape the Section 3(p) TK bar"],
         risks=["Pre-grant opposition citing TKDL records",
                "Objections under Sections 3(p) and 3(d)",
                "Revocation by third party under Section 25"],
         strategy="Structure claims around novel isolation/extraction processes, standardized synergistic ratios with bio-enhancement data, or novel delivery systems — never the raw plant combination.",
         portal_url="https://ipindia.gov.in", jurisdiction="india"),
    dict(code="trademark", name="Trademarks (Class 5 Pharmaceutical Brands)",
         statute="Trade Marks Act, 1999", authority="Trade Marks Registry (CGPDTM)",
         description="Protects brand names, logos and trade dress for Ayurvedic products. Class 5 covers pharmaceuticals and herbal medicaments; Class 35 covers retail and e-commerce services.",
         key_criteria=["Distinctive coined mark (not a generic Sanskrit herb name)",
                       "No likelihood of confusion with prior Class 5 marks",
                       "Mark not descriptive of the product's character or quality"],
         risks=["Descriptiveness refusal for herb-name marks",
                "Relative-ground opposition by prior registrants",
                "Genericide through improper use"],
         strategy="File coined word + device marks in Classes 5 and 35; maintain consistent brand usage evidence; renew every 10 years.",
         portal_url="https://ipindia.gov.in", jurisdiction="india"),
    dict(code="gi", name="Geographical Indications",
         statute="Geographical Indications of Goods (Registration & Protection) Act, 1999",
         authority="Geographical Indications Registry",
         description="Community right linking product quality or reputation to geographic origin — relevant for region-specific medicinal plants and processed ASU goods.",
         key_criteria=["Defined territory and demonstrable product-origin linkage",
                       "Quality, reputation or characteristics attributable to the origin",
                       "Application by registered proprietor with producers as authorized users"],
         risks=["Weak producer organization delays registration",
                "Genericization erodes protectable distinctiveness",
                "Unauthorized traders operating outside the territory"],
         strategy="Organize producer associations, document agro-climatic uniqueness, register with an authorized-user framework and enforce via customs recordal.",
         portal_url="https://ipindia.gov.in", jurisdiction="india"),
    dict(code="copyright", name="Copyright (Texts, Dossiers, Software)",
         statute="Copyright Act, 1957", authority="Copyright Office, Government of India",
         description="Protects original expression — annotated texts, formulation dossiers, monographs, packaging artwork, application software and UI — not the underlying ideas or formulations.",
         key_criteria=["Originality and fixation in tangible form",
                       "Documented authorship and ownership chain",
                       "Work qualifies as literary, artistic, or a computer program"],
         risks=["Idea-expression conflation in claims",
                "Fair dealing and educational-use defences",
                "Ownership disputes with contractors absent written assignment"],
         strategy="Record written assignments from authors/contractors, register key works, and protect dossiers, databases, labels and source code.",
         portal_url="https://copyright.gov.in", jurisdiction="india"),
    dict(code="industrial_design", name="Industrial Designs (Pack & Presentation)",
         statute="Designs Act, 2000", authority="Design Wing, CGPDTM",
         description="Protects the novel, eye-appealing shape or ornamentation of articles — jars, bottles, blister packs, label layouts — for 10 years, renewable for 5.",
         key_criteria=["Novelty over prior published designs worldwide",
                       "Appeal to the eye judged solely by the consumer",
                       "Not purely functional and not used as a trademark"],
         risks=["Invalidation for prior disclosure before filing",
                "Functional-shape exclusion",
                "Piracy enforcement burden rests on the proprietor"],
         strategy="File before any public disclosure of packaging; maintain design records; layer with trademark protection for full pack identity.",
         portal_url="https://ipindia.gov.in", jurisdiction="india"),
    dict(code="trade_secret", name="Trade Secrets (Process Know-How)",
         statute="No dedicated statute — Indian Contract Act, 1872 + equitable breach of confidence",
         authority="Civil courts (injunctive and damages remedies)",
         description="Protects process know-how — extraction temperatures, lipid ratios, homogenizer settings — through secrecy rather than registration.",
         key_criteria=["Information not generally known and commercially valuable",
                       "Reasonable protective measures (NDAs, access control)",
                       "Commercial value derives precisely from secrecy"],
         risks=["Reverse engineering remains lawful",
                "Employee mobility and information leakage",
                "Loss of secrecy destroys the right permanently"],
         strategy="Use tiered NDAs, split-supplier formulation and internal access logs; prefer trade secret where the process cannot be reverse-engineered from the product.",
         portal_url=None, jurisdiction="india"),
    dict(code="plant_variety", name="Plant Variety (PPV&FR)",
         statute="Protection of Plant Varieties and Farmers' Rights Act, 2001",
         authority="PPV&FR Authority",
         description="Sui generis protection for new medicinal-plant varieties balancing breeders' rights with farmers' save/swap/breed rights and community benefit-sharing.",
         key_criteria=["Novel, Distinct, Uniform and Stable (NDUS) variety",
                       "Variety denomination and full documentation",
                       "Farmers' variety or essentially-derived declarations handled"],
         risks=["Farmers' rights limit absolute exclusivity",
                "Benefit-sharing claims from contributing communities",
                "Disputes over essentially derived varieties"],
         strategy="Register new varieties of cultivated medicinal plants; keep farmer benefit-sharing and provenance records aligned with ABS obligations.",
         portal_url="https://plantauthority.gov.in", jurisdiction="india"),
    dict(code="tkdl", name="Traditional Knowledge (TKDL Defensive Layer)",
         statute="Traditional Knowledge Digital Library — defensive prior-art resource",
         authority="CSIR in partnership with Ministry of AYUSH",
         description="4.5 lakh codified formulations from classical texts, made accessible to patent examiners under NDA to defeat erroneous novelty grants in India and abroad. Not a registration regime — a shield.",
         key_criteria=["Search botanical names and classical references before any filing",
                       "Map hits to Section 3(p)/3(e) exposure",
                       "Document provenance for community-held knowledge"],
         risks=["Foreign patents on Indian TK trigger costly revocation battles",
                "Community knowledge not yet codified remains exposed",
                "TKDL is defensive only — no private registrations possible"],
         strategy="Run TKDL + Samhita screening pre-filing; use hits to reframe claims toward novel processes and delivery systems, or to abort weak filings early.",
         portal_url="https://tkdl.res.in", jurisdiction="india"),
    dict(code="drug_regulation", name="Drug Regulation (Rule 158B ASU Classification)",
         statute="Drugs and Cosmetics Act, 1940 & Rules, 1945 (ASU Drugs Chapter, Rule 158B)",
         authority="State AYUSH Licensing Authorities; CDSCO at the centre",
         description="Determines whether a product is a Classical ASU medicine, Patent/Proprietary ASU medicine, new drug, phytopharmaceutical, Ayurveda Aahar food or cosmetic — each with distinct dossiers and IP posture.",
         key_criteria=["Are all ingredients traceable to First Schedule authoritative texts?",
                       "Is the classical recipe followed exactly, or modified?",
                       "Does it use modern dosage forms or Schedule E(1) content?"],
         risks=["Wrong category attracts misbranding or prohibition action",
                "Safety dossier gaps under Rule 161",
                "Advertising violations under the DMR Act, 1954"],
         strategy="Classify first via the Rule 158B flow, compile the matching safety/stability dossier, obtain the State AYUSH licence before manufacture — then finalize IP strategy.",
         portal_url="https://cdsco.gov.in", jurisdiction="india"),
    dict(code="abs", name="ABS Compliance (Biodiversity Act / NBA)",
         statute="Biological Diversity Act, 2002 (amended 2023) + Biological Diversity Rules, 2024",
         authority="National Biodiversity Authority (NBA); State Biodiversity Boards (SBBs)",
         description="India's sovereignty over biological resources: Section 6 requires prior NBA approval (Form III) before any IPR is granted on research deriving from Indian bio-resources; Section 7 requires prior SBB intimation for commercial utilization.",
         key_criteria=["Entity status: Indian vs foreign participation",
                       "IPR filing planned, or pure manufacturing only",
                       "Origin states; cultivated vs wild sourcing"],
         risks=["Patent withheld at grant until NBA Form III clearance is furnished",
                "Benefit-sharing obligations (0.1%–0.5% ex-factory, 2014 ABS Guidelines)",
                "Penalties for non-intimation tightened by the 2023 amendment"],
         strategy="Trace resource origin states, give SBB intimation before commercialization, file NBA Form III before patent grant. Registered AYUSH practitioners and cultivated-plant sourcing enjoy exemptions.",
         portal_url="https://nbaindia.org", jurisdiction="india"),
]

SOURCES = [
    dict(title="Charaka Samhita", source_type="classical_text", author="Agnivesha, redacted by Charaka", era="c. 400-200 BCE",
         excerpt="Foundational treatise of Kayachikitsa (internal medicine); primary First Schedule authority for classical formulations.", language="en"),
    dict(title="Sushruta Samhita", source_type="classical_text", author="Sushruta", era="c. 600 BCE",
         excerpt="Principal authority for Shalya Tantra (surgery) and classical preparations including decoctions and medicated oils.", language="en"),
    dict(title="Ashtanga Hridaya", source_type="classical_text", author="Vagbhata", era="c. 600 CE",
         excerpt="Synthesis of Charaka and Sushruta traditions; First Schedule authority for dosage forms.", language="en"),
    dict(title="Bhavaprakasha Nighantu", source_type="classical_text", author="Bhavamishra", era="16th century CE",
         excerpt="Materia medica of drugs, their properties and formulations; key TKDL source text.", language="en"),
    dict(title="Sharangadhara Samhita", source_type="classical_text", author="Sharngadhara", era="13th century CE",
         excerpt="Authoritative text on dosage-form design — vati, churna, kvatha proportions.", language="en"),
    dict(title="The Patents Act, 1970", source_type="statute", author="Government of India", era="amended 2005",
         excerpt="Sections 3(p), 3(d), 3(e) and 25 govern TK non-patentability and opposition procedure.", language="en"),
    dict(title="Biological Diversity Act, 2002 (amended 2023)", source_type="statute", author="Government of India", era="amended 2023",
         excerpt="Sections 6 and 7: NBA prior approval for IPR (Form III); SBB intimation for commercial utilization.", language="en"),
    dict(title="Drugs and Cosmetics Act, 1940", source_type="statute", author="Government of India", era="Rule 158B chapter",
         excerpt="Governs ASU drug classification, licensing and safety dossiers.", language="en"),
    dict(title="Convention on Biological Diversity (CBD)", source_type="treaty", author="United Nations", era="1992",
         excerpt="Article 8(j): respect and equitable benefit-sharing for traditional knowledge.", language="en"),
    dict(title="Nagoya Protocol on Access and Benefit-Sharing", source_type="treaty", author="CBD Secretariat", era="2010",
         excerpt="Operationalizes ABS for genetic resources and associated TK across party states.", language="en"),
    dict(title="WIPO Treaty on Intellectual Property, Genetic Resources and Associated Traditional Knowledge", source_type="treaty", author="WIPO", era="2024",
         excerpt="Requires patent applicants to disclose the origin of genetic resources and associated TK.", language="en"),
    dict(title="Ayurvedic Pharmacopoeia of India (API)", source_type="pharmacopoeia", author="Ministry of AYUSH", era="current edition",
         excerpt="Standards for identity, purity and strength of Ayurvedic drugs; Part I single drugs, Part II compound formulations.", language="en"),
]

DOCTORS = [
    dict(name="Vaidya Anjali Deshmukh", specialty="Kayachikitsa (Internal Medicine)", qualifications="BAMS, MD (Ayu)", rating=4.8, languages=["en", "hi", "mr"], fee=500),
    dict(name="Dr. Ramesh Kulkarni", specialty="Panchakarma", qualifications="BAMS, PhD (Panchakarma)", rating=4.7, languages=["en", "hi", "kn"], fee=700),
    dict(name="Dr. Priya Nair", specialty="Rasayana & Geriatric Care", qualifications="BAMS, MD (Rasayana)", rating=4.9, languages=["en", "ml", "ta"], fee=650),
    dict(name="Vaidya Deepak Mishra", specialty="Shalakya Tantra", qualifications="BAMS", rating=4.5, languages=["hi", "en"], fee=400),
]

PRODUCTS = [
    dict(name="Ashwagandha Churna", manufacturer="Dabur India", category="Classical Churna", price=220.0, stock=120, requires_prescription=False,
         description="Withania somnifera root powder — First Schedule classical preparation."),
    dict(name="Triphala Tablets", manufacturer="Patanjali Ayurved", category="Proprietary Vati", price=180.0, stock=200, requires_prescription=False,
         description="Three-fruit classical combination in modern tablet dosage form."),
    dict(name="Chyawanprash Special", manufacturer="Baidyanath", category="Classical Avaleha", price=385.0, stock=80, requires_prescription=False,
         description="Amalaka-based rasayana avaleha with 40+ herbs."),
    dict(name="Brahmi Vati", manufacturer="Baidyanath", category="Proprietary Vati", price=160.0, stock=150, requires_prescription=False,
         description="Bacopa monnieri vati for cognitive support."),
    dict(name="Kaishore Guggulu", manufacturer="Arya Vaidya Pharmacy", category="Classical Guggulu", price=260.0, stock=90, requires_prescription=False,
         description="Classical guggulu kalpa for metabolic balance."),
    dict(name="AshwaShakti Nano-Capsule", manufacturer="Sahayak Nutra (Demo)", category="Proprietary Nano", price=540.0, stock=40, requires_prescription=True,
         description="Demo proprietary nano-lipid formulation requiring prescription."),
]

NOTIFICATIONS = [
    dict(type="regulatory", title="BDA Amendment 2023 now in force",
         message="NBA Form III is mandatory before any patent grant on bio-resource-derived inventions. Benefit-sharing rates revised under the 2024 Rules.", severity="warning"),
    dict(type="info", title="Phytopharmaceutical pathway clarified",
         message="CDSCO guidance streamlines phytopharmaceutical drug approval — distinct from proprietary ASU medicines.", severity="info"),
    dict(type="tkdl", title="TKDL cross-reference advised",
         message="Before filing, screen formulations against CSIR-TKDL records to assess Section 3(p) exposure.", severity="warning"),
]


async def add_if_missing(session: AsyncSession, model: type, rows: list[dict], key_field: str) -> int:
    keys = set((await session.execute(select(getattr(model, key_field)))).scalars())
    new_rows = [model(**row) for row in rows if row[key_field] not in keys]
    session.add_all(new_rows)
    return len(new_rows)


async def main() -> None:
    async with AsyncSessionLocal() as session:
        demo = await session.execute(select(User).where(User.email == "demo@ipsahayak.in"))
        if demo.scalar_one_or_none() is None:
            session.add(User(email="demo@ipsahayak.in", full_name="Anjali Sharma", role="innovator"))
        added = 0
        added += await add_if_missing(session, Regime, REGIMES, "code")
        added += await add_if_missing(session, Source, SOURCES, "title")
        added += await add_if_missing(session, Doctor, DOCTORS, "name")
        added += await add_if_missing(session, Product, PRODUCTS, "name")
        added += await add_if_missing(session, Notification, NOTIFICATIONS, "title")
        await session.commit()
        print(f"SEED_OK added={added}")


if __name__ == "__main__":
    asyncio.run(main())

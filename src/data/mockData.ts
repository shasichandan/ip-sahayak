import {
  UserProfile,
  Doctor,
  Appointment,
  Prescription,
  AyurvedaProduct,
  Pharmacy,
  Hospital,
  HerbDetail,
  HealthDiaryEntry,
  Order,
  CommunityPost,
  NotificationItem,
  SourceCitation
} from '../types';

export const mockUsers: Record<'patient' | 'doctor' | 'pharmacy', UserProfile> = {
  patient: {
    id: 'usr-p-01',
    name: 'Anjali Sharma',
    role: 'patient',
    email: 'anjali.sharma@example.com',
    phone: '+91 98450 12345',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    location: 'Indiranagar, Bengaluru, KA',
    doshaProfile: {
      primary: 'Pitta-Vata (Balanced/Seasonal)',
      vata: 35,
      pitta: 45,
      kapha: 20
    }
  },
  doctor: {
    id: 'usr-d-01',
    name: 'Dr. S. Kumar',
    title: 'Senior Ayurveda Physician & Researcher',
    role: 'doctor',
    specialization: 'Kaya Chikitsa (Internal Medicine) & Gastroenterology',
    licenseNumber: 'AYUSH-KA-2012-09844',
    email: 'dr.skumar@ayurcare.org',
    phone: '+91 94480 56789',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    location: 'Jayanagar Ayurveda Clinic, Bengaluru'
  },
  pharmacy: {
    id: 'usr-ph-01',
    name: 'Green Ayurveda Pharmacy',
    title: 'Licensed AYUSH Retail & Dispensing Hub',
    role: 'pharmacy',
    licenseNumber: 'DL-KA-AYUSH-R-88412',
    email: 'support@greenayurveda.in',
    phone: '+91 80 2520 7890',
    avatar: 'https://images.unsplash.com/photo-1586015555751-63c2305342d7?w=150&auto=format&fit=crop&q=80',
    location: '12th Main, Indiranagar, Bengaluru'
  }
};

export const classicalCitations: Record<string, SourceCitation> = {
  charakaDigestive: {
    id: 'src-cs-01',
    type: 'classical_text',
    title: 'Charaka Samhita',
    section: 'Chikitsa Sthana (Chapter 15: Grahani Chikitsa)',
    pageOrChapter: 'Verses 5-11',
    authority: 'Central Council for Research in Ayurvedic Sciences (CCRAS) / Ministry of AYUSH',
    excerpt: 'Agni (digestive fire) is the root cause of life, complexion, strength, and immunity. When impaired, ama (metabolic toxin) accumulates.'
  },
  charakaRasayana: {
    id: 'src-cs-02',
    type: 'classical_text',
    title: 'Charaka Samhita',
    section: 'Chikitsa Sthana (Chapter 1: Rasayana Adhyaya)',
    pageOrChapter: 'Pada 1, Verses 7-14',
    authority: 'National Institute of Ayurveda / Classical Sanskrit Corpus',
    excerpt: 'Rasayana herbs nourish the sapta-dhatus (seven bodily tissues), promoting longevity, memory, and disease resistance.'
  },
  sushrutaTriphala: {
    id: 'src-ss-01',
    type: 'classical_text',
    title: 'Sushruta Samhita',
    section: 'Sutra Sthana (Chapter 38: Dravya Sangrahaniya)',
    pageOrChapter: 'Verses 56-59',
    authority: 'Ayurvedic Pharmacopoeia of India (API Part 1, Vol 1)',
    excerpt: 'Triphala (Amalaki, Haritaki, Bibhitaki) acts as Chakshushya (vision promoting), Deepana (digestive stimulant), and Tridosha hara.'
  },
  tkdlTurmeric: {
    id: 'src-tkdl-01',
    type: 'tkdl',
    title: 'Traditional Knowledge Digital Library (TKDL)',
    section: 'CSIR-TKDL Formulation Record: RG/2180',
    pageOrChapter: 'IPC Class: A61K 36/9066',
    authority: 'Council of Scientific & Industrial Research (CSIR) - Govt of India',
    excerpt: 'Prior art establishing traditional use of Haridra (Curcuma longa) in inflammatory and respiratory disorders spanning 14 centuries.'
  },
  ayushRule158B: {
    id: 'src-reg-01',
    type: 'regulatory_doc',
    title: 'Drugs and Cosmetics Rules, 1945',
    section: 'Rule 158B - Guidelines for Licensing of Ayurvedic Drugs',
    pageOrChapter: 'Schedule E(1) & Schedule T compliance',
    authority: 'Ministry of AYUSH, Government of India',
    excerpt: 'Defines regulatory pathways for Classical ASU drugs, Patented/Proprietary ASU formulations, and safety dossier submissions.'
  }
};

export const mockDoctors: Doctor[] = [
  {
    id: 'doc-01',
    name: 'Dr. S. Kumar',
    title: 'Senior Ayurveda Physician (BAMS, MD - Ayurveda)',
    degree: 'BAMS, MD (Ayu) - Gujarat Ayurved University',
    specialties: ['Digestive Health', 'Metabolic Disorders', 'Panchakarma', 'Lifestyle Consultation'],
    languages: ['English', 'తెలుగు', 'हिन्दी', 'ಕನ್ನಡ'],
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 328,
    consultationFee: 500,
    availableSlot: 'Today 5:30 PM',
    hospitalAffiliation: 'National AYUSH Research Centre & Clinic',
    location: 'Indiranagar, Bengaluru (1.4 km)',
    distance: '1.4 km',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80',
    verified: true,
    about: 'Specializes in classical Nadi Pariksha, GI distress, GERD/Amlapitta, and tailored Dinacharya lifestyle rejuvenation plans.'
  },
  {
    id: 'doc-02',
    name: 'Dr. Priya Nambiar',
    title: 'Vaidya & Panchakarma Specialist (BAMS, MS - Shalya Tantra)',
    degree: 'BAMS, MS (Ayurveda) - Kottakkal Ayurveda College',
    specialties: ['Joint & Spine Health', 'Arthritis', 'Kerala Panchakarma', 'Pain Management'],
    languages: ['English', 'മലയാളം', 'हिन्दी'],
    experienceYears: 11,
    rating: 4.8,
    reviewCount: 215,
    consultationFee: 600,
    availableSlot: 'Tomorrow 10:00 AM',
    hospitalAffiliation: 'Kerala Vaidya Shala Care Center',
    location: 'Koramangala, Bengaluru (3.2 km)',
    distance: '3.2 km',
    image: 'https://images.unsplash.com/photo-1594824813589-3221b6d17b5f?w=200&auto=format&fit=crop&q=80',
    verified: true,
    about: 'Expertise in chronic musculoskeletal disorders, degenerative spinal wellness, and therapeutic oil therapies.'
  },
  {
    id: 'doc-03',
    name: 'Dr. Anand Joshi',
    title: 'Ayurveda Diabetologist & Rasayana Expert',
    degree: 'BAMS, PhD (Ayurveda) - BHU Varanasi',
    specialties: ['Madhumeha (Diabetes Care)', 'Immunity & Rasayana', 'Stress & Insomnia'],
    languages: ['English', 'हिन्दी', 'मराठी'],
    experienceYears: 18,
    rating: 4.9,
    reviewCount: 412,
    consultationFee: 750,
    availableSlot: 'Tomorrow 4:15 PM',
    hospitalAffiliation: 'Integrated Holistic Health Foundation',
    location: 'Whitefield, Bengaluru (6.8 km)',
    distance: '6.8 km',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&auto=format&fit=crop&q=80',
    verified: true,
    about: 'Bridging modern metabolic diagnostics with ancient Charaka Rasayana therapy for long-term health stabilization.'
  },
  {
    id: 'doc-04',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Stri Roga & Prasuti Tantra (Women’s Health Specialist)',
    degree: 'BAMS, MD (Ayu) - Govt Ayurvedic College Mysore',
    specialties: ['PCOS/PCOD Management', 'Hormonal Balance', 'Postpartum Care', 'Skin Health'],
    languages: ['English', 'தமிழ்', 'తెలుగు'],
    experienceYears: 9,
    rating: 4.85,
    reviewCount: 184,
    consultationFee: 550,
    availableSlot: 'Friday 11:30 AM',
    hospitalAffiliation: 'AyurShakti Women Wellness Sanctuary',
    location: 'HSR Layout, Bengaluru (4.1 km)',
    distance: '4.1 km',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&auto=format&fit=crop&q=80',
    verified: true,
    about: 'Dedicated practitioner for holistic endocrine harmony, utilizing natural herbs like Shatavari, Lodhra, and Ashoka.'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: 'apt-101',
    doctorId: 'doc-01',
    doctorName: 'Dr. S. Kumar',
    doctorSpecialty: 'Digestive Health & Lifestyle',
    doctorImage: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&auto=format&fit=crop&q=80',
    patientName: 'Anjali Sharma',
    patientAge: 29,
    date: 'Tomorrow, Sep 5',
    time: '10:30 AM',
    type: 'Video Consultation',
    status: 'upcoming',
    reason: 'Follow-up for Amlapitta (acid reflux) and post-meal heaviness',
    meetLink: 'https://meet.ayursahayak.in/cons-482-kumar'
  },
  {
    id: 'apt-102',
    doctorId: 'doc-02',
    doctorName: 'Dr. Priya Nambiar',
    doctorSpecialty: 'Joint & Spine Health',
    doctorImage: 'https://images.unsplash.com/photo-1594824813589-3221b6d17b5f?w=100&auto=format&fit=crop&q=80',
    patientName: 'Anjali Sharma',
    patientAge: 29,
    date: 'Aug 22, 2026',
    time: '04:00 PM',
    type: 'In-Clinic',
    status: 'completed',
    reason: 'Mild cervical strain from desk work — recommended ergonomic Dinacharya and Karpasasthyadi Thailam',
    notes: 'Patient showed 80% improvement after 10 days of warm oil application and posture correction.'
  }
];

export const mockProducts: AyurvedaProduct[] = [
  {
    id: 'prod-01',
    name: 'Triphala Churna (Shodhit Classical)',
    sanskritName: 'त्रिफला चूर्ण',
    brand: 'Green Ayurveda Labs',
    category: 'Classical Formulations',
    price: 180,
    mrp: 220,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300&auto=format&fit=crop&q=80',
    rating: 4.8,
    reviewsCount: 542,
    requiresPrescription: false,
    isVerified: true,
    batchNumber: 'TRP-2026-001',
    ayushLicense: 'AYUSH-KA-GMP-4491',
    description: 'Authentic 1:1:1 blend of organic Amalaki, Haritaki, and Bibhitaki micro-pulverized per Sharangadhara Samhita standards.',
    ingredients: ['Amalaki (Emblica officinalis)', 'Haritaki (Terminalia chebula)', 'Bibhitaki (Terminalia bellirica)'],
    dosageForm: 'Fine Churna (Herbal Powder)',
    indications: ['Deepana (Digestive)', 'Anulomana (Gentle detox)', 'Tridoshic balancing'],
    inStock: true,
    stockCount: 84
  },
  {
    id: 'prod-02',
    name: 'Ashwagandha Rasayana Lehyam',
    sanskritName: 'अश्वगन्धा रसायनम्',
    brand: 'Vaidya Ratnam Oushadhasala',
    category: 'Classical Formulations',
    price: 340,
    mrp: 395,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 389,
    requiresPrescription: true,
    isVerified: true,
    batchNumber: 'ASH-2026-089',
    ayushLicense: 'AYUSH-KL-GMP-1102',
    description: 'Potent rejuvenating confection prepared with winter cherry extract, pure A2 cow ghee, and forest honey for stress & vitality.',
    ingredients: ['Ashwagandha (Withania somnifera)', 'A2 Cow Ghee', 'Raw Forest Honey', 'Cardamom', 'Nutmeg'],
    dosageForm: 'Semi-solid Lehyam / Jam',
    indications: ['Balya (Strength)', 'Nidrajanana (Restful sleep)', 'Ojas enhancement'],
    inStock: true,
    stockCount: 42
  },
  {
    id: 'prod-03',
    name: 'Brahmi Vati with Gold Dust (Suvarna)',
    sanskritName: 'ब्राह्मी वटी',
    brand: 'Kottakkal Arya Vaidya Sala',
    category: 'Classical Formulations',
    price: 520,
    mrp: 600,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&auto=format&fit=crop&q=80',
    rating: 4.95,
    reviewsCount: 219,
    requiresPrescription: true,
    isVerified: true,
    batchNumber: 'BRH-2026-034',
    ayushLicense: 'AYUSH-KL-R-9981',
    description: 'Prestigious classical Medhya Rasayana tablet for cognitive stamina, memory retention, and calming the central nervous system.',
    ingredients: ['Brahmi (Bacopa monnieri)', 'Shankhpushpi', 'Vacha', 'Suvarna Bhasma (Trace)'],
    dosageForm: 'Tablets (60 Tabs)',
    indications: ['Medhya (Intellect)', 'Manasika Shanti (Mental calm)', 'Focus & sleep rhythm'],
    inStock: true,
    stockCount: 29
  },
  {
    id: 'prod-04',
    name: 'Chyawanprash Special (48 Herbs)',
    sanskritName: 'च्यवनप्राश अवलेह',
    brand: 'Green Ayurveda Labs',
    category: 'Wellness Supplements',
    price: 450,
    mrp: 499,
    image: 'https://images.unsplash.com/photo-1615485290176-0683a45cbe35?w=300&auto=format&fit=crop&q=80',
    rating: 4.7,
    reviewsCount: 680,
    requiresPrescription: false,
    isVerified: true,
    batchNumber: 'CHY-2026-104',
    ayushLicense: 'AYUSH-KA-GMP-4491',
    description: 'Time-tested Ayurvedic rasayana formulated per Charaka Samhita with wild fresh Amla fruit pulp, Dashamoola, and natural jaggery.',
    ingredients: ['Fresh Amalaki', 'Dashamoola', 'Pippali', 'Guduchi', 'Bala', 'Saffron'],
    dosageForm: 'Avaleha / Paste (500g)',
    indications: ['Rasayana (Immunity)', 'Pranavaha Srotas (Respiratory health)'],
    inStock: true,
    stockCount: 110
  },
  {
    id: 'prod-05',
    name: 'Mahasudarshan Kwath Liquid',
    sanskritName: 'महासुदर्शन क्वाथ',
    brand: 'AyurCare Herbals',
    category: 'Herbal Extracts',
    price: 210,
    mrp: 240,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=300&auto=format&fit=crop&q=80',
    rating: 4.6,
    reviewsCount: 142,
    requiresPrescription: true,
    isVerified: true,
    batchNumber: 'MSD-2026-055',
    ayushLicense: 'AYUSH-MH-GMP-3199',
    description: 'Classical decoction consisting of 54 bitter herbs led by Chirayata for Pitta disorders, seasonal pyrexia, and liver detoxification.',
    ingredients: ['Kiratatikta (Swertia chirata)', 'Haridra', 'Daruharidra', 'Guduchi', 'Musta'],
    dosageForm: 'Liquid Decoction (200ml)',
    indications: ['Pitta pacifying', 'Deepana-Pachana', 'Liver & skin detox'],
    inStock: true,
    stockCount: 35
  },
  {
    id: 'prod-06',
    name: 'Kumkumadi Tailam (Kashmir Saffron)',
    sanskritName: 'कुंकुमादि तैलम्',
    brand: 'Vaidya Ratnam Oushadhasala',
    category: 'Oils & Ghee',
    price: 780,
    mrp: 899,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&auto=format&fit=crop&q=80',
    rating: 4.9,
    reviewsCount: 420,
    requiresPrescription: false,
    isVerified: true,
    batchNumber: 'KKM-2026-012',
    ayushLicense: 'AYUSH-KL-GMP-1102',
    description: 'Infused with Grade-1 Kashmiri Saffron, Sandalwood, and Manjistha in pure cold-pressed Sesame oil for luminous skin complexion.',
    ingredients: ['Kumkuma (Crocus sativus)', 'Chandana (Santalum album)', 'Manjistha', 'Yashtimadhu'],
    dosageForm: 'Facial Oil / Thailam (25ml)',
    indications: ['Varnya (Complexion booster)', 'Blemish reduction', 'Hydration'],
    inStock: true,
    stockCount: 50
  }
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'rx-2026-091',
    doctorName: 'Dr. S. Kumar',
    doctorTitle: 'BAMS, MD (Ayu) — Reg. No. AYUSH-KA-2012-09844',
    doctorLicense: 'AYUSH-KA-2012-09844',
    patientName: 'Anjali Sharma',
    patientAge: 29,
    patientGender: 'Female',
    date: 'Sep 02, 2026',
    validTill: 'Oct 02, 2026',
    diagnosis: 'Functional Dyspepsia with Hyperacidity',
    ayurvedicDiagnosis: 'Pitta-Pradhana Amlapitta (Agni-mandya & Vidagdha Jirna)',
    status: 'active',
    isApprovedByDoctor: true,
    medicines: [
      {
        id: 'pm-01',
        name: 'Triphala Churna (Shodhit Classical)',
        formulation: 'Powder (Fine Churna)',
        dosage: '1 teaspoon (3-5 grams)',
        frequency: 'Once Daily',
        duration: '30 Days',
        instructions: 'Mix with half a glass of lukewarm water or pure honey.',
        timing: 'At Bedtime',
        category: 'Classical Formulations',
        price: 180,
        inStock: true
      },
      {
        id: 'pm-02',
        name: 'Avipattikar Churna',
        formulation: 'Herbal Digestive Powder',
        dosage: '1/2 teaspoon (2.5g)',
        frequency: 'Twice Daily',
        duration: '15 Days',
        instructions: 'Take with warm water before meals to pacify Tikshna Pitta.',
        timing: 'Before Meals',
        category: 'Classical Formulations',
        price: 165,
        inStock: true
      },
      {
        id: 'pm-03',
        name: 'Ashwagandha Rasayana Lehyam',
        formulation: 'Herbal Medicated Paste',
        dosage: '1 teaspoon (5g)',
        frequency: 'Once Daily',
        duration: '30 Days',
        instructions: 'Consume slowly along with 100ml warm almond milk or A2 milk.',
        timing: 'With Warm Milk',
        category: 'Classical Formulations',
        price: 340,
        inStock: true
      }
    ],
    lifestyleAdvice: [
      'Avoid sleeping immediately after meals; maintain a 2-hour gap before lying down.',
      'Adopt Shitali Pranayama for 10 minutes in the morning to calm internal Pitta heat.',
      'Avoid high-contrast food pairings (Viruddha Ahara such as fish with milk, or fruit yogurt).'
    ],
    dietAdvice: [
      'Favor sweet, bitter, and astringent tastes: pomegranates, soaked raisins, boiled barley, coriander water.',
      'Reduce sour, excessively pungent, salty foods, green chilies, and deep-fried items.'
    ]
  }
];

export const mockPharmacies: Pharmacy[] = [
  {
    id: 'ph-01',
    name: 'Green Ayurveda Pharmacy',
    address: 'Shop 4, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru',
    distance: '1.2 km',
    rating: 4.9,
    phone: '+91 80 2520 7890',
    license: 'DL-KA-AYUSH-R-88412',
    verifiedSeller: true,
    homeDelivery: true,
    deliveryTime: '45 mins (Instant dispatch)',
    medicinesInStock: 840,
    lat: 12.9716,
    lng: 77.6412
  },
  {
    id: 'ph-02',
    name: 'Vaidya Ratnam Aushadhalaya',
    address: '24, 100 Feet Road, Defense Colony, Indiranagar, Bengaluru',
    distance: '1.8 km',
    rating: 4.8,
    phone: '+91 80 4115 6210',
    license: 'DL-KA-AYUSH-R-55201',
    verifiedSeller: true,
    homeDelivery: true,
    deliveryTime: 'Same Day (by 6 PM)',
    medicinesInStock: 1250,
    lat: 12.9784,
    lng: 77.6408
  },
  {
    id: 'ph-03',
    name: 'Kottakkal Arya Vaidya Sala Bengaluru',
    address: 'Near BDA Complex, CMH Road, Indiranagar, Bengaluru',
    distance: '2.4 km',
    rating: 4.95,
    phone: '+91 80 2528 9012',
    license: 'DL-KA-AYUSH-R-10023',
    verifiedSeller: true,
    homeDelivery: true,
    deliveryTime: 'Next Day Delivery',
    medicinesInStock: 2100,
    lat: 12.9802,
    lng: 77.6321
  }
];

export const mockHospitals: Hospital[] = [
  {
    id: 'hosp-01',
    name: 'National AYUSH Research Institute & Hospital',
    type: 'NABH AYUSH Hospital',
    distance: '3.1 km',
    specialties: ['Kaya Chikitsa', 'Panchakarma', 'Shalya Tantra', 'Geriatric Care'],
    emergencyAvailability: true,
    phone: '+91 80 2341 8900',
    address: 'Ashoka Pillar Road, Jayanagar 1st Block, Bengaluru',
    rating: 4.85,
    bedsAvailable: 45
  },
  {
    id: 'hosp-02',
    name: 'Sri Sri Ayurveda Hospital & Integrated Wellness',
    type: 'Integrated Wellness Centre',
    distance: '7.5 km',
    specialties: ['Integrative Cardiology', 'Rheumatology', 'Ayurvedic Oncology Support', 'Dinacharya Rehab'],
    emergencyAvailability: true,
    phone: '+91 80 6797 6797',
    address: '21st Km, Kanakapura Road, Udayapura, Bengaluru',
    rating: 4.9,
    bedsAvailable: 80
  },
  {
    id: 'hosp-03',
    name: 'Government Ayurvedic Medical College & Hospital',
    type: 'Govt Ayurvedic Hospital',
    distance: '5.2 km',
    specialties: ['General Ayurveda OPD', 'Panchakarma Unit', 'Rasayana & Vajeekarana', 'Herb Garden Pharmacy'],
    emergencyAvailability: true,
    phone: '+91 80 2287 2848',
    address: 'Dhanvantari Road, Majestic, Bengaluru',
    rating: 4.6,
    bedsAvailable: 120
  }
];

export const mockHerbs: HerbDetail[] = [
  {
    id: 'herb-01',
    name: 'Ashwagandha',
    botanicalName: 'Withania somnifera (L.) Dunal',
    sanskritName: 'अश्वगन्धा (Varahakarni, Balada)',
    category: 'Rasayana & Balya (Rejuvenative Adaptogen)',
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)', 'Madhura (Sweet)'],
    virya: 'Ushna (Warm Potency)',
    vipaka: 'Madhura (Sweet Post-digestive)',
    guna: ['Laghu (Light)', 'Snigdha (Unctuous)'],
    doshaImpact: 'Pacifies Vata and Kapha; may increase Pitta in large excess.',
    classicalReferences: [
      'Charaka Samhita, Sutra Sthana 4: Balya & Brihaniya Mahakashaya',
      'Sushruta Samhita, Sutra Sthana 39: Urdhvabhagahara Gana',
      'Bhavaprakasha Nighantu, Guduchyadi Varga: Verses 189-191'
    ],
    traditionalUses: [
      'Medhya Rasayana for mental clarity and adaptogenic resistance to stress.',
      'Enhances Shukra Dhatu and physical stamina (Balya).',
      'Aids healthy sleep architecture by calming aggravated Vata in Majja Dhatu.'
    ],
    modernFormulations: [
      'Ashwagandhadya Arishta',
      'Ashwagandha Churna',
      'Chyawanprash',
      'Ksheerabala Thailam'
    ],
    safetyNotes: 'Caution in acute Pitta inflammation, hyperthyroidism, and active gastric ulcers without doctor guidance.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'herb-02',
    name: 'Triphala (Three Sacred Fruits)',
    botanicalName: 'Synergy of Amalaki, Haritaki & Bibhitaki',
    sanskritName: 'त्रिफला (Vara, Phalatrikam)',
    category: 'Chakshushya & Rasayana (Digestive & Ocular Tonic)',
    rasa: ['Contains 5 of 6 Tastes (except Lavana / Salty)'],
    virya: 'Sheeta-Sama (Balanced, slightly cooling)',
    vipaka: 'Madhura',
    guna: ['Laghu (Light)', 'Ruksha (Dry)'],
    doshaImpact: 'Tridosha Shamaka (Pacifies Vata, Pitta, and Kapha equally).',
    classicalReferences: [
      'Charaka Samhita, Chikitsa Sthana 1/3: Triphala Rasayana',
      'Sharangadhara Samhita, Madhyama Khanda: Churna Kalpana',
      'Ashtanga Hridaya, Uttara Tantra: Netra Rogas'
    ],
    traditionalUses: [
      'Gentle bowel regulatory agent without causing habituation.',
      'Chakshushya (maintains healthy eyesight and retinal microcirculation).',
      'Potent antioxidant scavenging free radicals in Dhatu transformation.'
    ],
    modernFormulations: [
      'Triphala Ghritham',
      'Triphala Kwath',
      'Triphala Guggulu',
      'Triphala Eye Wash'
    ],
    safetyNotes: 'Avoid during active diarrhea, severe dehydration, or third trimester of pregnancy without Vaidya consultation.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'herb-03',
    name: 'Brahmi',
    botanicalName: 'Bacopa monnieri (L.) Wettst.',
    sanskritName: 'ब्राह्मी (Saraswati, Medhya)',
    category: 'Medhya Rasayana (Cognitive & Neuro-Nourishing)',
    rasa: ['Tikta (Bitter)', 'Kashaya (Astringent)'],
    virya: 'Sheeta (Cooling)',
    vipaka: 'Madhura',
    guna: ['Laghu (Light)', 'Sara (Flowing)'],
    doshaImpact: 'Pacifies Pitta and Vata; clears excess Kapha cloudiness from mind.',
    classicalReferences: [
      'Charaka Samhita, Chikitsa Sthana 1/3: Medhya Rasayana quartet',
      'Sushruta Samhita, Chikitsa Sthana 28: Rasayana Vidhi',
      'Ayurvedic Pharmacopoeia of India (API Part 1, Vol II)'
    ],
    traditionalUses: [
      'Supports concentration, working memory, and neurological equilibrium.',
      'Alleviates stress-induced restlessness and emotional overheating.',
      'Beneficial in hair tonic formulations when combined with Bhringraj.'
    ],
    modernFormulations: [
      'Brahmi Ghrita',
      'Brahmi Vati',
      'Saraswatarishta',
      'Brahmi Thailam'
    ],
    safetyNotes: 'May cause mild nausea on an empty stomach if taken in excessive powder form without anupana (carrier like ghee/honey).',
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'herb-04',
    name: 'Turmeric (Haridra)',
    botanicalName: 'Curcuma longa L.',
    sanskritName: 'हरिद्रा (Nisha, Gauri, Krimighna)',
    category: 'Varnya & Vishaghna (Anti-inflammatory & Blood Purifier)',
    rasa: ['Tikta (Bitter)', 'Katu (Pungent)'],
    virya: 'Ushna (Warm)',
    vipaka: 'Katu',
    guna: ['Ruksha (Dry)', 'Laghu (Light)'],
    doshaImpact: 'Pacifies Kapha and Vata; balances Pitta in modest culinary amounts.',
    classicalReferences: [
      'Charaka Samhita, Sutra Sthana 4: Lekhaniya & Kushtaghna',
      'TKDL Record: RG/2180, CSIR India (Century-old Indian Traditional Art)',
      'Bhavaprakasha: Haridradi Varga'
    ],
    traditionalUses: [
      'Natural Rakta Shodhaka (blood purifier) promoting skin clarity.',
      'Supports joint mobility and modulates healthy inflammatory responses.',
      'Key protective agent in upper respiratory defense when combined with warm milk.'
    ],
    modernFormulations: [
      'Haridra Khanda',
      'Nisha Amalaki Churna',
      'Turmeric Curcumin Softgels',
      'Eladi Thailam'
    ],
    safetyNotes: 'Use cautiously with pharmaceutical blood thinners or bile duct obstructions.',
    image: 'https://images.unsplash.com/photo-1615485290176-0683a45cbe35?w=400&auto=format&fit=crop&q=80'
  }
];

export const mockViruddhaAharaCombinations = [
  {
    food1: 'Milk',
    food2: 'Fish / Seafood',
    status: 'Incompatible (Viruddha)',
    severity: 'High',
    explanation: 'Milk has Sheeta virya (cooling potency) while fish has Ushna virya (heating potency). Consuming both together impairs Agni, produces Ama, and corrupts Rakta Dhatu according to Charaka Samhita.',
    source: 'Charaka Samhita, Sutra Sthana 26: Atreya Bhadrakapya Adhyaya (Verses 81-84)'
  },
  {
    food1: 'Honey',
    food2: 'Ghee in Equal Ratio by Weight',
    status: 'Incompatible (Viruddha)',
    severity: 'High',
    explanation: 'When pure honey and clarified butter (ghee) are mixed in exactly 1:1 equal parts by weight, their opposing enzymatic properties generate toxic metabolites (Vishamashana). They must be consumed in unequal ratios.',
    source: 'Ashtanga Hridaya, Sutra Sthana 7: Annaraksha Adhyaya'
  },
  {
    food1: 'Milk',
    food2: 'Citrus / Sour Fruits',
    status: 'Incompatible (Viruddha)',
    severity: 'High',
    explanation: 'Sour acids cause instant curdling of milk proteins inside the digestive tract, severely disrupting Jatharagni and leading to fermentation, gas, and skin eruptions.',
    source: 'Charaka Samhita, Sutra Sthana 26'
  },
  {
    food1: 'Heated / Cooked Honey',
    food2: 'Boiling Hot Water / Tea',
    status: 'Incompatible (Viruddha)',
    severity: 'Moderate',
    explanation: 'Ayurveda explicitly warns against heating honey above 40°C. Heating alters its delicate sugar matrix into Ama-visha (clogging metabolic sludge) which binds tightly into microchannels (Srotas).',
    source: 'Charaka Samhita, Sutra Sthana 27'
  },
  {
    food1: 'Curd / Yogurt',
    food2: 'Night-time Consumption',
    status: 'Incompatible (Kala Viruddha)',
    severity: 'Moderate',
    explanation: 'Curd is Abhishyandi (channel-blocking) and heavy. When eaten at night when Kapha naturally peaks, it obstructs circulation and exacerbates sinusitis or morning puffiness.',
    source: 'Bhavaprakasha Nighantu'
  }
];

export const dinacharyaRoutine = [
  { time: '05:30 AM (Brahma Muhurta)', activity: 'Waking & Gratitude', dosha: 'Vata', description: 'Wake up 48 minutes before sunrise when Sattva quality is peak. Drink warm water (Ushnodaka).', benefit: 'Cleanses bowels and clears mental mist.' },
  { time: '06:00 AM', activity: 'Danta Dhavana & Jihwa Nirlekhana', dosha: 'Kapha', description: 'Brush teeth with astringent/bitter herbs (Neem/Khadira) and gently scrape tongue with copper scraper.', benefit: 'Stimulates digestive enzymes and removes Ama.' },
  { time: '06:30 AM', activity: 'Abhyanga (Warm Oil Massage)', dosha: 'Vata', description: 'Self-massage with warm sesame or Mahanarayana oil followed by mild warm bath.', benefit: 'Nourishes Dhatus, pacifies nervous system and strengthens joints.' },
  { time: '07:15 AM', activity: 'Pranayama & Gentle Yoga', dosha: 'Tridoshic', description: 'Nadi Shodhana (Alternate nostril breathing) and Suryanamaskar suited to Prakriti.', benefit: 'Balances Prana Vayu and oxygenates microcirculation.' },
  { time: '08:30 AM', activity: 'Light Warm Breakfast', dosha: 'Kapha/Pitta', description: 'Cooked porridge, stewed apples, or warm moong dal. Never cold or processed.', benefit: 'Awakens Agni gently without heavy overburden.' },
  { time: '12:30 PM', activity: 'Chief Meal (Lunch)', dosha: 'Pitta', description: 'Sun is at zenith; Agni is at peak strength. Enjoy complete balanced 6-rasa meal.', benefit: 'Optimal nutrient breakdown and tissue nourishment.' },
  { time: '07:30 PM', activity: 'Light Dinner (Pathya)', dosha: 'Kapha', description: 'Moong khichdi, vegetable soup, or steamed squash at least 2.5 hours before sleep.', benefit: 'Prevents nocturnal metabolic Ama accumulation.' },
  { time: '10:00 PM', activity: 'Ratri Charya & Sleep', dosha: 'Pitta/Kapha', description: 'Retire to bed before 10 PM. Foot massage (Pada-abhyanga) with warm ghee or Brahmi oil.', benefit: 'Ensures deep restorative sleep and Ojas rejuvenation.' }
];

export const ritucharyaSeasons = [
  {
    season: 'Shishira & Vasanta (Late Winter to Spring)',
    months: 'Jan – Apr',
    doshaState: 'Accumulated Kapha liquefies in warming sun',
    agniStatus: 'Moderate to variable',
    recommendedDiet: 'Barley, dry roasted grains, bitter greens, ginger tea, honey, warm spices (Trikatu).',
    avoidDiet: 'Heavy cold sweets, deep-fried snacks, day-time naps, cold milk drinks.'
  },
  {
    season: 'Grishma (Summer)',
    months: 'May – Jun',
    doshaState: 'Pitta accumulates, Vata increases due to heat dryness',
    agniStatus: 'Mild (Mandagni) due to external environmental heat',
    recommendedDiet: 'Sweet ripe fruits, coconut water, coriander infusions, cow milk with rock candy, cucumber.',
    avoidDiet: 'Pungent red chilies, sour curds, fermented foods, excessive alcohol, direct midday sun.'
  },
  {
    season: 'Varsha (Monsoon)',
    months: 'Jul – Aug',
    doshaState: 'Vata aggravates severely; Pitta starts accumulating',
    agniStatus: 'Weakened by dampness and cloudy days',
    recommendedDiet: 'Lightly oiled soups, aged wheat/rice, warm ginger water, rock salt, moderate honey.',
    avoidDiet: 'Raw unpeeled salads, heavy river fish, sleeping during day, stagnant water.'
  },
  {
    season: 'Sharad (Autumn)',
    months: 'Sep – Oct',
    doshaState: 'Pitta reaches sudden severe aggravation (Prakopa)',
    agniStatus: 'Re-intensifying after rains',
    recommendedDiet: 'Ghee (Tikta Ghrita), bitter gourd, sweet fruits, Amalaki, moonlit strolls (Hansodaka water).',
    avoidDiet: 'Sour citrus in excess, curd, curdled cheese, mustard oil, sea salt.'
  }
];

export const incompatibleFoodsList = mockViruddhaAharaCombinations.map(c => ({
  food1: c.food1,
  food2: c.food2,
  consequence: c.explanation,
  classicalReference: c.source
}));

export const mockOrders: Order[] = [
  {
    id: 'ord-9941',
    orderDate: 'Sep 03, 2026',
    prescriptionId: 'rx-2026-091',
    pharmacyName: 'Green Ayurveda Pharmacy',
    pharmacyPhone: '+91 80 2520 7890',
    deliveryAddress: 'Flat 402, Lotus Residency, 12th Main Indiranagar, Bengaluru - 560038',
    totalAmount: 685,
    status: 'out_for_delivery',
    items: [
      {
        product: mockProducts[0],
        quantity: 1,
        prescribedDose: '1 tsp with warm water at bedtime'
      },
      {
        product: mockProducts[1],
        quantity: 1,
        prescribedDose: '1 tsp with warm milk once daily'
      }
    ],
    trackingSteps: [
      { title: 'Prescription Verified & Order Placed', timestamp: '09:30 AM', completed: true, active: false },
      { title: 'Pharmacy Accepted & Batch Authenticated', timestamp: '10:05 AM', completed: true, active: false },
      { title: 'Formulations Dispensed & Packed', timestamp: '11:15 AM', completed: true, active: false },
      { title: 'Rider Dispatched (Eco-Delivery)', timestamp: '11:45 AM', completed: true, active: false },
      { title: 'Out for Delivery (1.2 km away)', timestamp: 'Now', completed: false, active: true },
      { title: 'Delivered to Doorstep', timestamp: 'Est. 12:45 PM', completed: false, active: false }
    ]
  }
];

export const mockDiaryEntries: HealthDiaryEntry[] = [
  {
    id: 'hd-01',
    date: 'Sep 03, 2026',
    sleepHours: 7.5,
    energyLevel: 'High',
    digestionStatus: 'Balanced (Sama)',
    mood: 'Calm',
    waterLiters: 2.8,
    foodNotes: 'Steamed moong khichdi with cumin ghee, warm pomegranate juice, no sour foods.',
    symptoms: ['Mild evening bloating resolved after Triphala']
  },
  {
    id: 'hd-02',
    date: 'Sep 02, 2026',
    sleepHours: 6.2,
    energyLevel: 'Moderate',
    digestionStatus: 'Sharp/Acidic (Tikshna)',
    mood: 'Restless',
    waterLiters: 2.1,
    foodNotes: 'Spicy lunch at canteen caused slight retrosternal burning. Took Avipattikar churna.',
    symptoms: ['Mild acidity', 'Delayed afternoon digestion']
  },
  {
    id: 'hd-03',
    date: 'Sep 01, 2026',
    sleepHours: 8.0,
    energyLevel: 'Very High',
    digestionStatus: 'Balanced (Sama)',
    mood: 'Joyful',
    waterLiters: 3.0,
    foodNotes: 'Oatmeal with soaked almonds, pumpkin soup for dinner. Completed 15 min Pranayama.',
    symptoms: ['None']
  }
];

export const mockCommunityPosts: CommunityPost[] = [
  {
    id: 'post-01',
    authorName: 'Ramesh Patel',
    authorRole: 'Patient',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    timeAgo: '2 hours ago',
    category: 'Digestive Health',
    title: 'How long does Triphala usually take to normalize sluggish morning digestion?',
    content: 'My Vaidya recommended 3g Triphala churna with warm water before bed. Just started 4 days ago. Feeling slightly lighter, but wondering how long until Agni stabilizes completely?',
    upvotes: 24,
    replyCount: 5,
    isVaidyaApproved: true,
    verifiedDoctorName: 'Dr. S. Kumar (Senior Vaidya)',
    replies: [
      {
        id: 'rep-01',
        authorName: 'Dr. S. Kumar',
        authorRole: 'Vaidya / Doctor',
        content: 'Namaste Ramesh ji. Triphala is a mild Anulomana and Rasayana, not a harsh purgative. Typically, subtle digestive improvements manifest in 5-7 days, while true tissue-level detoxification and Agni stabilization require 4-6 weeks of consistent Dinacharya compliance.',
        timeAgo: '1 hour ago',
        isDoctor: true
      }
    ]
  },
  {
    id: 'post-02',
    authorName: 'Sunita Mehra',
    authorRole: 'Patient',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    timeAgo: '5 hours ago',
    category: 'Lifestyle & Sleep',
    title: 'Best time for Ashwagandha intake for desk workers experiencing mental fatigue?',
    content: 'Is it better in the morning or at night with warm milk? I experience high screen fatigue and restlessness by 9 PM.',
    upvotes: 38,
    replyCount: 8,
    isVaidyaApproved: true,
    verifiedDoctorName: 'Dr. Priya Nambiar (Panchakarma Specialist)',
    replies: [
      {
        id: 'rep-02',
        authorName: 'Dr. Priya Nambiar',
        authorRole: 'Vaidya / Doctor',
        content: 'For desk workers with Prana-Vata agitation and nocturnal restlessness, taking Ashwagandha with lukewarm nutmeg milk 45 minutes prior to sleep yields superior Majja Dhatu calming compared to morning intake.',
        timeAgo: '3 hours ago',
        isDoctor: true
      }
    ]
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-01',
    title: 'Consultation Tomorrow with Dr. S. Kumar',
    message: 'Your video consultation is scheduled for tomorrow at 10:30 AM. Video link is ready.',
    timestamp: '10 mins ago',
    type: 'appointment',
    read: false,
    actionUrl: '/patient/appointments'
  },
  {
    id: 'notif-02',
    title: 'Rx-to-Door Out for Delivery',
    message: 'Order #ord-9941 containing Triphala & Ashwagandha is on the way from Green Ayurveda.',
    timestamp: '35 mins ago',
    type: 'order',
    read: false,
    actionUrl: '/patient/orders'
  },
  {
    id: 'notif-03',
    title: 'Medicine Batch Authenticated',
    message: 'Batch TRP-2026-001 verified through AYUSH National Registry records.',
    timestamp: '2 hours ago',
    type: 'verification',
    read: true,
    actionUrl: '/patient/verify'
  },
  {
    id: 'notif-04',
    title: 'Regulatory Alert: Rule 158B Advisory',
    message: 'Ministry of AYUSH published updated guidelines on ASU proprietary clinical evidence requirements.',
    timestamp: 'Yesterday',
    type: 'regulatory',
    read: true,
    actionUrl: '/ipr/regulations'
  }
];

export const mockDoctorPatientQueue = [
  {
    id: 'pt-q-01',
    name: 'Ravi Kumar',
    age: 42,
    gender: 'Male',
    time: '10:30 AM (Next in Queue)',
    appointmentType: 'Video Consultation',
    primaryComplaint: 'Chronic Gerd, epigastric burning after meals, disturbed sleep cycle.',
    duration: '6 months',
    vitals: { bp: '124/82 mmHg', pulse: '74 bpm', prakriti: 'Pitta-Prakriti (Aggravated)' },
    reportsUploaded: ['Upper GI Endoscopy (Mild Gastritis)', 'LFT & CBC (Normal)', 'Health Diary (High Acidity)'],
    previousVisits: 2,
    lastPrescription: 'Sutshekhar Rasa 125mg BD, Kamadudha Rasa 250mg OD',
    aiSummary: 'Patient exhibits classic signs of Pitta-Pradhana Amlapitta complicated by irregular eating hours and high stress. Reports confirm non-erosive antral gastritis. Previous Kamadudha gave partial relief. Recommending cooling Rasayana, lifestyle alignment, and diet overhaul.'
  },
  {
    id: 'pt-q-02',
    name: 'Anjali Sharma',
    age: 29,
    gender: 'Female',
    time: '11:15 AM',
    appointmentType: 'Video Consultation',
    primaryComplaint: 'Post-prandial bloating, sluggish morning metabolism, mild neck stiffness.',
    duration: '3 weeks',
    vitals: { bp: '118/76 mmHg', pulse: '70 bpm', prakriti: 'Pitta-Vata' },
    reportsUploaded: ['Routine Blood Work (Normal)', 'Health Diary Log (Consistent Track)'],
    previousVisits: 1,
    lastPrescription: 'Triphala Churna 3g HS, Avipattikar Churna 2.5g BD',
    aiSummary: 'Follow-up consultation. Diary metrics indicate 70% resolution of bloating after 2 weeks on Triphala. Recommending 2-week maintenance regimen and transition to gentle Dinacharya.'
  },
  {
    id: 'pt-q-03',
    name: 'Govind Rao',
    age: 58,
    gender: 'Male',
    time: '12:00 PM',
    appointmentType: 'In-Clinic',
    primaryComplaint: 'Bilateral knee joint crepitus, morning stiffness in cold weather (Sandhivata).',
    duration: '1.5 years',
    vitals: { bp: '138/88 mmHg', pulse: '78 bpm', prakriti: 'Vata-Kapha' },
    reportsUploaded: ['X-Ray Both Knees (Grade 2 Osteoarthritis)', 'Serum Uric Acid (Normal)'],
    previousVisits: 4,
    lastPrescription: 'Yogaraj Guggulu 2 tabs BD, Mahanarayana Thailam local application',
    aiSummary: 'Vata-dominant Sandhigata Vata. Joint crepitus aggravated by cold climate. Good tolerance to Yogaraj Guggulu. Recommending Janu Basti therapeutic course and Dashmoola decoction.'
  }
];

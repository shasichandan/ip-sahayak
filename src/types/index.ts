export type UserRole = 'patient' | 'doctor' | 'pharmacy';

export type LanguageCode = 'en' | 'te' | 'hi';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  phone: string;
  avatar: string;
  title?: string;
  specialization?: string;
  licenseNumber?: string;
  location: string;
  doshaProfile?: {
    primary: string;
    vata: number;
    pitta: number;
    kapha: number;
  };
}

export type ConfidenceLevel = 'high' | 'moderate' | 'low';

export interface SourceCitation {
  id: string;
  type: 'classical_text' | 'government_source' | 'research_study' | 'regulatory_doc' | 'tkdl';
  title: string;
  section: string;
  pageOrChapter?: string;
  authority: string;
  referenceUrl?: string;
  excerpt: string;
}

export interface AISourceChain {
  claim: string;
  source: string;
  document: string;
  section: string;
  authority: string;
  confidence: ConfidenceLevel;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  language?: LanguageCode;
  structuredResponse?: {
    ayurvedicPerspective?: string;
    generalInfo?: string;
    safetyConsiderations?: string;
    whenToConsult?: string;
    sources: SourceCitation[];
    confidence: ConfidenceLevel;
    confidenceReason: string;
    isRedFlag?: boolean;
    redFlagMessage?: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  degree: string;
  specialties: string[];
  languages: string[];
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availableSlot: string;
  hospitalAffiliation: string;
  location: string;
  distance: string;
  image: string;
  verified: boolean;
  about: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  patientName: string;
  patientAge: number;
  date: string;
  time: string;
  type: 'Video Consultation' | 'In-Clinic' | 'Follow-up';
  status: 'upcoming' | 'completed' | 'cancelled';
  reason: string;
  meetLink?: string;
  notes?: string;
}

export interface PrescribedMedicine {
  id: string;
  name: string;
  formulation: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  timing: 'Before Meals' | 'After Meals' | 'With Warm Milk' | 'At Bedtime';
  category: string;
  price: number;
  inStock?: boolean;
}

export interface Prescription {
  id: string;
  doctorName: string;
  doctorTitle: string;
  doctorLicense: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  date: string;
  validTill: string;
  diagnosis: string;
  ayurvedicDiagnosis: string; // e.g. "Pitta-Vata imbalance / Amlapitta"
  medicines: PrescribedMedicine[];
  lifestyleAdvice: string[];
  dietAdvice: string[];
  status: 'active' | 'completed' | 'expired';
  isApprovedByDoctor: boolean;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  license: string;
  licenseNumber?: string;
  verifiedSeller: boolean;
  homeDelivery: boolean;
  deliveryTime: string;
  timing?: string;
  medicinesInStock: number;
  stockAvailable?: boolean;
  lat?: number;
  lng?: number;
}

export interface Hospital {
  id: string;
  name: string;
  type: 'NABH AYUSH Hospital' | 'Integrated Wellness Centre' | 'Govt Ayurvedic Hospital' | string;
  distance: string;
  specialties: string[];
  emergencyAvailability: boolean;
  emergencyAvailable?: boolean;
  phone: string;
  address: string;
  rating: number;
  bedsAvailable?: number;
  bedCapacity?: number;
  accreditation?: string;
}

export interface AyurvedaProduct {
  id: string;
  name: string;
  sanskritName?: string;
  brand: string;
  category: 'Classical Formulations' | 'Herbal Extracts' | 'Wellness Supplements' | 'Oils & Ghee';
  price: number;
  mrp: number;
  image: string;
  rating: number;
  reviewsCount: number;
  requiresPrescription: boolean;
  isVerified: boolean;
  batchNumber: string;
  ayushLicense: string;
  description: string;
  ingredients: string[];
  dosageForm: string;
  indications: string[];
  inStock: boolean;
  stockCount: number;
}

export interface CartItem {
  product: AyurvedaProduct;
  quantity: number;
  prescribedDose?: string;
}

export interface Order {
  id: string;
  orderDate: string;
  items: CartItem[];
  totalAmount: number;
  pharmacyName: string;
  pharmacyPhone: string;
  deliveryAddress: string;
  status: 'placed' | 'accepted' | 'preparing' | 'dispatched' | 'out_for_delivery' | 'delivered';
  trackingSteps: {
    title: string;
    timestamp: string;
    completed: boolean;
    active: boolean;
  }[];
  prescriptionId?: string;
}

export interface HerbDetail {
  id: string;
  name: string;
  botanicalName: string;
  sanskritName: string;
  category: string;
  rasa: string[]; // Taste
  virya: string;  // Potency: Sheeta / Ushna
  vipaka: string; // Post-digestive
  guna: string[]; // Qualities
  doshaImpact: string;
  classicalReferences: string[];
  traditionalUses: string[];
  modernFormulations: string[];
  safetyNotes: string;
  image: string;
}

export interface HealthDiaryEntry {
  id: string;
  date: string;
  sleepHours: number;
  energyLevel: 'Low' | 'Moderate' | 'High' | 'Very High' | string;
  digestionStatus?: 'Sluggish (Manda)' | 'Balanced (Sama)' | 'Sharp/Acidic (Tikshna)' | 'Irregular (Visham)' | string;
  digestionQuality?: string;
  mood: 'Calm' | 'Restless' | 'Fatigued' | 'Joyful' | 'Irritable' | string;
  waterLiters?: number;
  waterGlasses?: number;
  foodNotes: string;
  symptoms: string[];
}

export interface SavedAIAnswer {
  id: string;
  question: string;
  summary: string;
  date: string;
  category: string;
  confidence: ConfidenceLevel;
  sourcesCount: number;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorRole: 'Patient' | 'Vaidya' | 'Pharmacist';
  authorAvatar: string;
  timeAgo: string;
  category: string;
  title: string;
  content: string;
  upvotes: number;
  replyCount: number;
  isVaidyaApproved: boolean;
  verifiedDoctorName?: string;
  replies?: {
    id: string;
    authorName: string;
    authorRole: string;
    content: string;
    timeAgo: string;
    isDoctor?: boolean;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'appointment' | 'prescription' | 'order' | 'verification' | 'regulatory' | 'ai';
  read: boolean;
  actionUrl?: string;
}

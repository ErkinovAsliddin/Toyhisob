export interface BudgetBreakdownItem {
  category: string;
  categorySlug: string;
  amount: number;
  percentage: number;
  icon: string;
  color: string;
  notes: string;
}

export interface BudgetScenario {
  name: string;
  description: string;
  guestCount: number;
  totalCost: number;
  breakdown: BudgetBreakdownItem[];
}

export interface BudgetPlan {
  id: string;
  totalBudget: number;
  guestCount: number;
  city: string;
  priorities: Record<string, number>;
  breakdown: BudgetBreakdownItem[];
  scenarios: BudgetScenario[];
  createdAt: string;
}

export interface VendorTierData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  priceUnit: string;
  capacity: number | null;
  minGuests: number | null;
  maxGuests: number | null;
  features: string[];
  images: string[];
  popular: boolean;
}

export interface VendorCategoryData {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  tiers: VendorTierData[];
}

export interface VendorData {
  id: string;
  businessName: string;
  slug: string;
  description: string | null;
  city: string;
  logo: string | null;
  coverImage: string | null;
  verified: boolean;
  featured: boolean;
  rating: number | null;
  reviewCount: number;
  categories: VendorCategoryData[];
}

export interface ComparisonResult {
  category: string;
  budget: number;
  guestCount: number;
  recommendations: {
    tier: VendorTierData;
    vendor: VendorData;
    score: number;
    reasoning: string;
  }[];
  bestValue: string;
  savingsTips: string[];
}

export interface OrganizeClient {
  id: string;
  coupleName: string;
  partnerName: string | null;
  weddingDate: string | null;
  city: string;
  guestCount: number | null;
  totalBudget: number | null;
  status: string;
  pendingDecisions: string[];
}

export type WeddingCategory =
  | "catering"
  | "venue"
  | "photography"
  | "music"
  | "decoration"
  | "clothing"
  | "transport"
  | "invitations"
  | "gifts";

export const WEDDING_CATEGORIES: Record<WeddingCategory, { name: string; icon: string; color: string }> = {
  catering: { name: "Catering & Osh", icon: "UtensilsCrossed", color: "#f59e0b" },
  venue: { name: "Venue & Hall", icon: "Building2", color: "#ec4899" },
  photography: { name: "Photo & Video", icon: "Camera", color: "#8b5cf6" },
  music: { name: "Music & Entertainment", icon: "Music", color: "#06b6d4" },
  decoration: { name: "Decoration & Florals", icon: "Flower2", color: "#10b981" },
  clothing: { name: "Clothing & Accessories", icon: "Shirt", color: "#f43f5e" },
  transport: { name: "Transport & Cars", icon: "Car", color: "#3b82f6" },
  invitations: { name: "Invitations & Cards", icon: "Mail", color: "#a855f7" },
  gifts: { name: "Gifts & Sarpo", icon: "Gift", color: "#ef4444" },
};

export const UZBEKISTAN_CITIES = [
  "Tashkent",
  "Samarkand",
  "Bukhara",
  "Namangan",
  "Andijan",
  "Fergana",
  "Nukus",
  "Karshi",
  "Termez",
  "Jizzakh",
  "Urgench",
  "Navoi",
];

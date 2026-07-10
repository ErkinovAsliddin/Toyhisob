import type { BudgetBreakdownItem, BudgetScenario } from "@/types";

const CATEGORY_DATA: Record<string, { name: string; icon: string; color: string; defaultPct: number }> = {
  catering: { name: "Catering & Osh", icon: "UtensilsCrossed", color: "#f59e0b", defaultPct: 35 },
  venue: { name: "Venue & Hall", icon: "Building2", color: "#ec4899", defaultPct: 25 },
  photography: { name: "Photo & Video", icon: "Camera", color: "#8b5cf6", defaultPct: 10 },
  music: { name: "Music & Entertainment", icon: "Music", color: "#06b6d4", defaultPct: 10 },
  decoration: { name: "Decoration & Florals", icon: "Flower2", color: "#10b981", defaultPct: 10 },
  clothing: { name: "Clothing & Accessories", icon: "Shirt", color: "#f43f5e", defaultPct: 5 },
  transport: { name: "Transport & Cars", icon: "Car", color: "#3b82f6", defaultPct: 3 },
  invitations: { name: "Invitations & Cards", icon: "Mail", color: "#a855f7", defaultPct: 1 },
  gifts: { name: "Gifts & Sarpo", icon: "Gift", color: "#ef4444", defaultPct: 1 },
};

const CITY_MULTIPLIERS: Record<string, number> = {
  Tashkent: 1.0, Samarkand: 0.85, Bukhara: 0.8, Namangan: 0.75,
  Andijan: 0.75, Fergana: 0.75, Nukus: 0.7, Karshi: 0.7,
  Termez: 0.65, Jizzakh: 0.7, Urgench: 0.7, Navoi: 0.7,
};

export interface GenerateBudgetInput {
  totalBudget: number;
  guestCount: number;
  city: string;
  priorities: Record<string, number>;
}

function getNotesForCategory(slug: string, guests: number, multiplier: number): string {
  const notes: Record<string, string> = {
    catering: `Est. ${(150000 * multiplier * guests / 1000000).toFixed(1)}M for ${guests} guests at ${(150000 * multiplier).toFixed(0)}k/person`,
    venue: `Hall rental for ${guests} capacity, ${multiplier < 0.8 ? "lower" : "standard"} regional pricing`,
    photography: `${guests > 150 ? "Full team recommended" : "Solo photographer viable"}`,
    music: `${guests > 100 ? "Live band recommended" : "DJ may suffice"}`,
    decoration: `Floral + stage setup, scale with guest count`,
    clothing: `Bride + groom outfits and accessories`,
    transport: `Decorated car rental + guest shuttles if needed`,
    invitations: `Printed + digital cards for ${guests} guests`,
    gifts: `Choy-nabor, sarpo, and guest return gifts`,
  };
  return notes[slug] || "";
}

export function generateBudgetBreakdown(input: GenerateBudgetInput): BudgetBreakdownItem[] {
  const multiplier = CITY_MULTIPLIERS[input.city] || 0.75;
  return Object.entries(CATEGORY_DATA).map(([slug, data]) => {
    const pct = input.priorities[slug] ?? data.defaultPct;
    const amount = Math.round((input.totalBudget * pct) / 100);
    return {
      category: data.name,
      categorySlug: slug,
      amount,
      percentage: pct,
      icon: data.icon,
      color: data.color,
      notes: getNotesForCategory(slug, input.guestCount, multiplier),
    };
  });
}

export function generateScenarios(input: GenerateBudgetInput): BudgetScenario[] {
  const guestCounts = [
    Math.max(30, Math.round(input.guestCount * 0.5)),
    input.guestCount,
    Math.round(input.guestCount * 1.5),
  ];
  const labels = [
    { name: "Intimate", description: "Close family & friends only" },
    { name: "Standard", description: "Your current plan" },
    { name: "Grand", description: "Extended family & community" },
  ];
  return guestCounts.map((gc, i) => {
    const factor = gc / input.guestCount;
    const adjustedBudget = Math.round(input.totalBudget * factor);
    return {
      name: labels[i].name,
      description: labels[i].description + " (" + gc + " guests)",
      guestCount: gc,
      totalCost: adjustedBudget,
      breakdown: generateBudgetBreakdown({ ...input, guestCount: gc, totalBudget: adjustedBudget }),
    };
  });
}

export function calculateSavings(budget1: number, budget2: number): { amount: number; percent: number } {
  return { amount: budget1 - budget2, percent: Math.round(((budget1 - budget2) / budget1) * 100) };
}

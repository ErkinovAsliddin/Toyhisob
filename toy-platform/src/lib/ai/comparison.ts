import type { ComparisonResult, VendorData, VendorTierData } from "@/types";

export interface CompareInput {
  category: string;
  budget: number;
  guestCount: number;
  preferences?: string;
  city?: string;
}

export function rankVendors(
  vendors: (VendorData & { tiers: VendorTierData[] })[],
  input: CompareInput
): ComparisonResult["recommendations"] {
  const scored = vendors.flatMap((vendor) =>
    vendor.tiers
      .filter((tier) => tier.price <= input.budget)
      .filter((tier) => !tier.maxGuests || tier.maxGuests >= input.guestCount)
      .map((tier) => {
        let score = 0;
        const priceRatio = tier.price / input.budget;
        score += (1 - priceRatio) * 30;
        score += (vendor.rating ? Number(vendor.rating) : 3) * 10;
        score += vendor.verified ? 10 : 0;
        score += vendor.featured ? 5 : 0;
        score += tier.popular ? 8 : 0;
        const features = Array.isArray(tier.features) ? tier.features : [];
        score += Math.min(features.length * 2, 10);
        if (tier.capacity && tier.capacity >= input.guestCount && tier.capacity <= input.guestCount * 1.3) {
          score += 10;
        }
        return { tier, vendor, score: Math.round(score), reasoning: generateReasoning(tier, vendor, score) };
      })
  );
  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

function generateReasoning(tier: VendorTierData, vendor: VendorData, score: number): string {
  const parts: string[] = [];
  if (vendor.verified) parts.push("Verified vendor");
  if (vendor.rating && Number(vendor.rating) >= 4.5) parts.push("Highly rated");
  if (tier.popular) parts.push("Most popular tier");
  const features = Array.isArray(tier.features) ? tier.features : [];
  if (features.length > 3) parts.push(features.length + " included features");
  if (score > 70) parts.push("Excellent value for money");
  else if (score > 50) parts.push("Good overall value");
  return parts.join(" | ") || "Meets your budget requirements";
}

export function generateSavingsTips(category: string, budget: number, guestCount: number): string[] {
  const tips: Record<string, string[]> = {
    catering: [
      "Consider osh/plov instead of a full multi-course menu — saves 30-40%",
      "Negotiate per-guest pricing for 100+ guests for bulk discounts",
      "Ask about off-peak day pricing (Sunday-Thursday is often cheaper)",
    ],
    venue: [
      "Look for venues that include basic tables/chairs in the rental",
      "Off-season months (Nov-Feb) can save 20-30% on hall rental",
      "Consider community centers or restaurant private rooms vs dedicated wedding halls",
    ],
    photography: [
      "Book a package that includes both photo and video for a bundle discount",
      "Consider hiring a talented emerging photographer (2-3 years exp) vs top studios",
      "Limit shooting hours to essential moments only",
    ],
    music: [
      "A good DJ is often 40-60% cheaper than a live band",
      "Use a curated playlist during dinner to reduce live performance hours",
      "Ask about all-inclusive sound system + lighting packages",
    ],
    decoration: [
      "Use seasonal flowers — they're 50% cheaper and fresher",
      "Rent reusable decorations instead of buying single-use items",
      "Focus decoration budget on the stage/head table area only",
    ],
    clothing: [
      "Rent wedding outfits instead of buying — many shops offer this now",
      "Look for sample sales at bridal shops for significant discounts",
      "Consider traditional Uzbek clothing which is often more affordable",
    ],
    transport: [
      "Coordinate with friends/family for guest transport instead of hiring buses",
      "Use one decorated car for the couple instead of a full convoy",
      "Book transport packages early for better rates",
    ],
  };
  return tips[category] || ["Compare at least 3 vendors before deciding", "Book early for better rates"];
}

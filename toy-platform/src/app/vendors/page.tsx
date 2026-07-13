"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Search,
  Filter,
  MapPin,
  Star,
  Shield,
  ChevronDown,
  ArrowRight,
  Users,
  CheckCircle2,
  UtensilsCrossed,
  Building2,
  Camera,
  Music,
  Flower2,
  Sparkles,
  Heart,
  SlidersHorizontal,
  Grid3X3,
  List,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/animations/animated";
import { formatPrice, formatPriceCompact, cn } from "@/lib/utils";
import { WEDDING_CATEGORIES, UZBEKISTAN_CITIES, type WeddingCategory } from "@/types";

const MOCK_VENDORS = [
  {
    id: "1",
    name: "Osh Bey Wedding Catering",
    slug: "osh-bey",
    category: "catering",
    city: "Tashkent",
    rating: 4.8,
    reviews: 124,
    verified: true,
    featured: true,
    image: "/placeholder-catering.jpg",
    tiers: [
      { name: "Budget", price: 180000, perGuest: true, features: ["Traditional osh", "Bread & salads", "Tea service"] },
      { name: "Standard", price: 320000, perGuest: true, features: ["Multi-course meal", "Fruit platter", "Waiter service", "Table settings"] },
      { name: "Premium", price: 500000, perGuest: true, features: ["Full luxury menu", "Live cooking station", "Premium drinks", "VIP waiter team", "Custom cake"] },
    ],
  },
  {
    id: "2",
    name: "Golden Palace Banquet Hall",
    slug: "golden-palace",
    category: "venue",
    city: "Tashkent",
    rating: 4.6,
    reviews: 89,
    verified: true,
    featured: false,
    image: "/placeholder-venue.jpg",
    tiers: [
      { name: "Hall Only", price: 15000000, perGuest: false, capacity: 200, features: ["Basic sound system", "Tables & chairs", "Parking"] },
      { name: "Hall + Decor", price: 22000000, perGuest: false, capacity: 200, features: ["Stage setup", "Floral arrangements", "Lighting", "Sound system"] },
      { name: "Full Package", price: 35000000, perGuest: false, capacity: 300, features: ["Premium decor", "Live flowers", "VIP lounge", "Full AV system", "Bridal room"] },
    ],
  },
  {
    id: "3",
    name: "Dilshod Studio Photography",
    slug: "dilshod-studio",
    category: "photography",
    city: "Tashkent",
    rating: 4.9,
    reviews: 203,
    verified: true,
    featured: true,
    image: "/placeholder-photo.jpg",
    tiers: [
      { name: "Essential", price: 5000000, perGuest: false, features: ["6 hours coverage", "1 photographer", "200+ edited photos", "Online gallery"] },
      { name: "Professional", price: 10000000, perGuest: false, features: ["Full day coverage", "2 photographers", "Videographer", "500+ photos", "Highlight video"] },
      { name: "Cinematic", price: 18000000, perGuest: false, features: ["Full day + prep", "3-person team", "Drone shots", "Cinematic film", "Album & prints"] },
    ],
  },
  {
    id: "4",
    name: "Navo'i Ensemble Live Music",
    slug: "navoi-ensemble",
    category: "music",
    city: "Tashkent",
    rating: 4.7,
    reviews: 67,
    verified: true,
    featured: false,
    image: "/placeholder-music.jpg",
    tiers: [
      { name: "DJ Only", price: 3000000, perGuest: false, features: ["Professional DJ", "Sound system", "4 hours", "Custom playlist"] },
      { name: "DJ + Saxophone", price: 6000000, perGuest: false, features: ["DJ + live sax", "Full sound system", "6 hours", "MC service"] },
      { name: "Full Band", price: 12000000, perGuest: false, features: ["5-piece band", "Traditional + modern", "Full AV setup", "MC + coordination", "8 hours"] },
    ],
  },
  {
    id: "5",
    name: "Gulnora Floral Design",
    slug: "gulnora-floral",
    category: "decoration",
    city: "Tashkent",
    rating: 4.5,
    reviews: 45,
    verified: false,
    featured: false,
    image: "/placeholder-decor.jpg",
    tiers: [
      { name: "Simple", price: 3000000, perGuest: false, features: ["Basic table arrangements", "Entrance decor", "Seasonal flowers"] },
      { name: "Elegant", price: 7000000, perGuest: false, features: ["Stage backdrop", "Centerpieces", "Candles & draping", "Aisle decor"] },
      { name: "Luxury", price: 15000000, perGuest: false, features: ["Full venue transformation", "Imported flowers", "Custom installations", "Lighting design", "Ice sculptures"] },
    ],
  },
];

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed, Building2, Camera, Music, Flower2,
};

export default function VendorsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("Tashkent");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTier, setSelectedTier] = useState<string>("all");

  const filteredVendors = MOCK_VENDORS.filter((v) => {
    if (selectedCategory !== "all" && v.category !== selectedCategory) return false;
    if (v.city !== selectedCity) return false;
    if (searchQuery && !v.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <Badge variant="accent" className="mb-4">
                <Store className="h-3 w-3 mr-1" />
                Wedding Marketplace
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Compare vendors at every price tier
              </h1>
              <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                Every category has budget, standard, and premium options.
                Find the perfect match for your wedding.
              </p>
            </div>
          </FadeIn>

          {/* Category Filter */}
          <FadeIn delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button
                variant={selectedCategory === "all" ? "default" : "secondary"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Categories
              </Button>
              {Object.entries(WEDDING_CATEGORIES).slice(0, 5).map(([slug, cat]) => {
                const Icon = ICON_MAP[cat.icon] || Store;
                return (
                  <Button
                    key={slug}
                    variant={selectedCategory === slug ? "default" : "secondary"}
                    size="sm"
                    onClick={() => setSelectedCategory(slug)}
                  >
                    <Icon className="h-4 w-4" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>
          </FadeIn>

          {/* Search and Filters */}
          <FadeIn delay={0.2}>
            <Card className="p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400"
                  />
                </div>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="h-10 px-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                >
                  {UZBEKISTAN_CITIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="flex gap-1 bg-slate-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-lg transition-all",
                      viewMode === "grid" ? "bg-white shadow-sm text-slate-900" : "text-slate-400"
                    )}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "flex items-center justify-center h-8 w-8 rounded-lg transition-all",
                      viewMode === "list" ? "bg-white shadow-sm text-slate-900" : "text-slate-400"
                    )}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Vendors Grid */}
          <AnimatedGroup
            className={cn(
              "gap-6",
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "flex flex-col"
            )}
            stagger={0.1}
          >
            {filteredVendors.map((vendor) => {
              const catData = WEDDING_CATEGORIES[vendor.category as WeddingCategory];
              const Icon = ICON_MAP[catData?.icon] || Store;

              return (
                <AnimatedItem key={vendor.id}>
                  <Card hover className="overflow-hidden h-full">
                    {/* Card Image */}
                    <div className="relative h-48 bg-gradient-to-br from-primary-100 to-rose-100">
                      {vendor.featured && (
                        <Badge variant="accent" className="absolute top-3 left-3 z-10 text-xs">
                          <Sparkles className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                      {vendor.verified && (
                        <div className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white">
                          <Shield className="h-3.5 w-3.5" />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="h-16 w-16 text-primary-300/60" />
                      </div>
                    </div>

                    <div className="p-5">
                      {/* Vendor Info */}
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-slate-900">{vendor.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="h-3.5 w-3.5 text-accent-400 fill-accent-400" />
                              <span className="text-sm font-medium text-slate-700">{vendor.rating}</span>
                            </div>
                            <span className="text-xs text-slate-400">({vendor.reviews} reviews)</span>
                            <span className="text-xs text-slate-300">•</span>
                            <div className="flex items-center gap-1 text-xs text-slate-400">
                              <MapPin className="h-3 w-3" />
                              {vendor.city}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tiers */}
                      <div className="space-y-2 mt-4">
                        {vendor.tiers.map((tier, i) => (
                          <div
                            key={tier.name}
                            className={cn(
                              "flex items-center justify-between p-3 rounded-xl border transition-all hover:border-primary-300 hover:bg-primary-50/50 cursor-pointer",
                              i === 1 ? "border-primary-200 bg-primary-50/30" : "border-slate-100"
                            )}
                          >
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-900">{tier.name}</span>
                                {i === 1 && (
                                  <Badge variant="default" className="text-[10px] px-1.5 py-0">Popular</Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {tier.features.slice(0, 2).map((f) => (
                                  <span key={f} className="text-[10px] text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                                    {f}
                                  </span>
                                ))}
                                {tier.features.length > 2 && (
                                  <span className="text-[10px] text-slate-400">
                                    +{tier.features.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right shrink-0 ml-3">
                              <div className="text-sm font-bold text-slate-900">
                                {formatPriceCompact(tier.price)} UZS
                              </div>
                              {tier.perGuest && (
                                <div className="text-[10px] text-slate-400">per guest</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4">
                        <Button variant="secondary" size="sm" className="flex-1">
                          <Heart className="h-3.5 w-3.5" />
                          Save
                        </Button>
                        <Button size="sm" className="flex-1">
                          Compare
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </AnimatedItem>
              );
            })}
          </AnimatedGroup>

          {/* Empty State */}
          {filteredVendors.length === 0 && (
            <FadeIn>
              <div className="text-center py-20">
                <Store className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  No vendors found
                </h3>
                <p className="text-slate-500 mb-6">
                  Try adjusting your filters or search query.
                </p>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calculator,
  MapPin,
  Users,
  Wallet,
  Heart,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus,
  Share2,
  Download,
  RotateCcw,
  Info,
  CheckCircle2,
  AlertTriangle,
  UtensilsCrossed,
  Building2,
  Camera,
  Music,
  Flower2,
  Shirt,
  Car,
  Mail,
  Gift,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input, Select } from "@/components/ui/input";
import { FadeIn, ScaleIn } from "@/components/animations/animated";
import { useBudgetStore } from "@/lib/store";
import {
  generateBudgetBreakdown,
  generateScenarios,
} from "@/lib/ai/budget";
import { formatPrice, formatPriceCompact, cn } from "@/lib/utils";
import { UZBEKISTAN_CITIES, WEDDING_CATEGORIES, type WeddingCategory } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  UtensilsCrossed, Building2, Camera, Music, Flower2, Shirt, Car, Mail, Gift,
};

const steps = [
  { title: "Location & Date", icon: MapPin },
  { title: "Guest Count", icon: Users },
  { title: "Your Budget", icon: Wallet },
  { title: "Priorities", icon: Heart },
  { title: "Your Plan", icon: Calculator },
];

export default function BudgetPlannerPage() {
  const store = useBudgetStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [showScenarios, setShowScenarios] = useState(false);

  const breakdown = useMemo(
    () =>
      generateBudgetBreakdown({
        totalBudget: store.totalBudget,
        guestCount: store.guestCount,
        city: store.city,
        priorities: store.priorities,
      }),
    [store.totalBudget, store.guestCount, store.city, store.priorities]
  );

  const scenarios = useMemo(
    () =>
      generateScenarios({
        totalBudget: store.totalBudget,
        guestCount: store.guestCount,
        city: store.city,
        priorities: store.priorities,
      }),
    [store.totalBudget, store.guestCount, store.city, store.priorities]
  );

  const maxAmount = Math.max(...breakdown.map((b) => b.amount));

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <FadeIn>
            <div className="text-center mb-12">
              <Badge variant="premium" className="mb-4">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered Budget Planner
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your wedding budget
              </h1>
              <p className="mt-3 text-slate-500 max-w-xl mx-auto">
                A few inputs, and we&apos;ll show you exactly where your money
                should go — based on real Tashkent market data.
              </p>
            </div>
          </FadeIn>

          {/* Progress Steps */}
          <FadeIn delay={0.2}>
            <div className="flex items-center justify-center gap-2 mb-12">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isComplete = i < currentStep;
                const isCurrent = i === currentStep;
                return (
                  <div key={i} className="flex items-center">
                    <motion.div
                      className={cn(
                        "flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300",
                        isComplete && "bg-emerald-100 text-emerald-700",
                        isCurrent && "bg-primary-100 text-primary-700 shadow-md shadow-primary-200",
                        !isComplete && !isCurrent && "bg-slate-100 text-slate-400"
                      )}
                      whileHover={{ scale: 1.05 }}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                      <span className="hidden sm:inline">{step.title}</span>
                    </motion.div>
                    {i < steps.length - 1 && (
                      <div
                        className={cn(
                          "w-8 h-0.5 mx-1 transition-colors duration-300",
                          i < currentStep ? "bg-emerald-300" : "bg-slate-200"
                        )}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </FadeIn>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100">
                        <MapPin className="h-5 w-5 text-primary-600" />
                      </div>
                      Where and when?
                    </CardTitle>
                  </CardHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="City"
                      value={store.city}
                      onChange={(e) => store.setCity(e.target.value)}
                      options={UZBEKISTAN_CITIES.map((c) => ({
                        value: c,
                        label: c,
                      }))}
                    />
                    <Input
                      label="Wedding Date"
                      type="date"
                      value={store.weddingDate}
                      onChange={(e) => store.setWeddingDate(e.target.value)}
                    />
                    <Input
                      label="Your Name"
                      placeholder="Your name"
                      value={store.partnerName}
                      onChange={(e) => store.setPartnerName(e.target.value)}
                    />
                  </div>
                </Card>
              )}

              {currentStep === 1 && (
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-100">
                        <Users className="h-5 w-5 text-accent-600" />
                      </div>
                      How many guests?
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-slate-700">
                          Guest Count
                        </span>
                        <span className="text-2xl font-bold gradient-text">
                          {store.guestCount}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={500}
                        step={10}
                        value={store.guestCount}
                        onChange={(e) => store.setGuestCount(Number(e.target.value))}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer accent-primary-500"
                        style={{
                          background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${((store.guestCount - 20) / 480) * 100}%, #e2e8f0 ${((store.guestCount - 20) / 480) * 100}%, #e2e8f0 100%)`,
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>20 (intimate)</span>
                        <span>250 (standard)</span>
                        <span>500 (grand)</span>
                      </div>
                    </div>

                    {/* Quick presets */}
                    <div className="flex flex-wrap gap-3">
                      {[50, 80, 100, 150, 200, 300].map((count) => (
                        <Button
                          key={count}
                          variant={store.guestCount === count ? "default" : "secondary"}
                          size="sm"
                          onClick={() => store.setGuestCount(count)}
                        >
                          {count} guests
                        </Button>
                      ))}
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
                      <Info className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-amber-700">
                        According to survey data, 65% of Uzbek weddings have 100-200 guests.
                        Smaller weddings save an average of 40-60% on catering alone.
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {currentStep === 2 && (
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                        <Wallet className="h-5 w-5 text-emerald-600" />
                      </div>
                      What&apos;s your total budget?
                    </CardTitle>
                  </CardHeader>
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium text-slate-700">
                          Total Budget (UZS)
                        </span>
                        <span className="text-2xl font-bold gradient-text">
                          {formatPrice(store.totalBudget)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10_000_000}
                        max={200_000_000}
                        step={5_000_000}
                        value={store.totalBudget}
                        onChange={(e) => store.setTotalBudget(Number(e.target.value))}
                        className="w-full h-3 rounded-full appearance-none cursor-pointer accent-emerald-500"
                        style={{
                          background: `linear-gradient(to right, #10b981 0%, #10b981 ${((store.totalBudget - 10_000_000) / 190_000_000) * 100}%, #e2e8f0 ${((store.totalBudget - 10_000_000) / 190_000_000) * 100}%, #e2e8f0 100%)`,
                        }}
                      />
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>10M (budget)</span>
                        <span>100M (mid)</span>
                        <span>200M (premium)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {[20, 50, 80, 100, 150].map((b) => (
                        <Button
                          key={b}
                          variant={store.totalBudget === b * 1_000_000 ? "default" : "secondary"}
                          size="sm"
                          onClick={() => store.setTotalBudget(b * 1_000_000)}
                        >
                          {b}M UZS
                        </Button>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-emerald-700">
                          Per-guest cost estimate
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-emerald-700">
                        {formatPrice(Math.round(store.totalBudget / store.guestCount))} / guest
                      </p>
                      <p className="text-xs text-emerald-600 mt-1">
                        {store.totalBudget / store.guestCount < 300_000
                          ? "Great budget discipline!"
                          : store.totalBudget / store.guestCount < 500_000
                          ? "Moderate range — room to optimize"
                          : "Premium range — consider if this aligns with your priorities"}
                      </p>
                    </div>
                  </div>
                </Card>
              )}

              {currentStep === 3 && (
                <Card className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100">
                        <Heart className="h-5 w-5 text-rose-600" />
                      </div>
                      What matters most to you?
                    </CardTitle>
                  </CardHeader>
                  <p className="text-sm text-slate-500 mb-6">
                    Drag the sliders to allocate your budget across categories.
                    The percentages should add up to 100%.
                  </p>
                  <div className="space-y-5">
                    {Object.entries(WEDDING_CATEGORIES).map(([slug, cat]) => {
                      const Icon = ICON_MAP[cat.icon] || Heart;
                      const value = store.priorities[slug] || 0;
                      return (
                        <div key={slug} className="group">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-8 w-8 items-center justify-center rounded-lg"
                                style={{ backgroundColor: cat.color + "20" }}
                              >
                                <Icon
                                  className="h-4 w-4"
                                  style={{ color: cat.color }}
                                />
                              </div>
                              <span className="text-sm font-medium text-slate-700">
                                {cat.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900 w-10 text-right">
                                {value}%
                              </span>
                              <span className="text-xs text-slate-400 w-16 text-right">
                                {formatPriceCompact(
                                  Math.round((store.totalBudget * value) / 100)
                                )} UZS
                              </span>
                            </div>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={50}
                            value={value}
                            onChange={(e) =>
                              store.setPriorities({
                                ...store.priorities,
                                [slug]: Number(e.target.value),
                              })
                            }
                            className="w-full h-2 rounded-full appearance-none cursor-pointer"
                            style={{
                              accentColor: cat.color,
                              background: `linear-gradient(to right, ${cat.color} 0%, ${cat.color} ${value * 2}%, #e2e8f0 ${value * 2}%, #e2e8f0 100%)`,
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <span className="text-sm font-medium text-slate-600">
                      Total allocated
                    </span>
                    <span
                      className={cn(
                        "text-sm font-bold",
                        Object.values(store.priorities).reduce((a, b) => a + b, 0) === 100
                          ? "text-emerald-600"
                          : "text-amber-600"
                      )}
                    >
                      {Object.values(store.priorities).reduce((a, b) => a + b, 0)}%
                    </span>
                  </div>
                </Card>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  {/* Summary Header */}
                  <Card className="p-8 bg-gradient-to-br from-primary-50 to-rose-50 border-primary-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-1">
                          Your Wedding Budget Plan
                        </h2>
                        <p className="text-slate-500">
                          {store.city} • {store.guestCount} guests •{" "}
                          {formatPrice(store.totalBudget)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm">
                          <Share2 className="h-4 w-4" /> Share
                        </Button>
                        <Button variant="secondary" size="sm">
                          <Download className="h-4 w-4" /> Export
                        </Button>
                      </div>
                    </div>
                  </Card>

                  {/* Breakdown */}
                  <Card className="p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle>Cost Breakdown by Category</CardTitle>
                    </CardHeader>
                    <div className="space-y-6">
                      {breakdown.map((item, i) => {
                        const Icon = ICON_MAP[item.icon] || Heart;
                        return (
                          <motion.div
                            key={item.categorySlug}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className="flex items-center gap-4">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                style={{ backgroundColor: item.color + "20" }}
                              >
                                <Icon
                                  className="h-5 w-5"
                                  style={{ color: item.color }}
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium text-slate-900 text-sm">
                                    {item.category}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-slate-400">
                                      {item.percentage}%
                                    </span>
                                    <span className="font-bold text-slate-900 text-sm">
                                      {formatPrice(item.amount)}
                                    </span>
                                  </div>
                                </div>
                                <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                                  <motion.div
                                    className="h-full rounded-full"
                                    style={{ backgroundColor: item.color }}
                                    initial={{ width: 0 }}
                                    animate={{
                                      width: `${(item.amount / maxAmount) * 100}%`,
                                    }}
                                    transition={{
                                      duration: 0.8,
                                      delay: i * 0.1,
                                      ease: "easeOut",
                                    }}
                                  />
                                </div>
                                <p className="text-xs text-slate-400 mt-1">
                                  {item.notes}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </Card>

                  {/* Scenarios */}
                  <Card className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <CardHeader className="p-0">
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-primary-500" />
                          Scenario Comparison
                        </CardTitle>
                      </CardHeader>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowScenarios(!showScenarios)}
                      >
                        {showScenarios ? "Hide" : "Show"} Scenarios
                      </Button>
                    </div>

                    <AnimatePresence>
                      {showScenarios && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {scenarios.map((scenario, i) => (
                              <div
                                key={scenario.name}
                                className={cn(
                                  "p-5 rounded-2xl border-2 transition-all",
                                  i === 1
                                    ? "border-primary-300 bg-primary-50"
                                    : "border-slate-200 bg-white hover:border-slate-300"
                                )}
                              >
                                {i === 1 && (
                                  <Badge className="mb-2 text-xs">
                                    Your Plan
                                  </Badge>
                                )}
                                <h3 className="font-bold text-slate-900">
                                  {scenario.name}
                                </h3>
                                <p className="text-xs text-slate-500 mb-3">
                                  {scenario.description}
                                </p>
                                <div className="text-xl font-bold gradient-text mb-2">
                                  {formatPrice(scenario.totalCost)}
                                </div>
                                <p className="text-xs text-slate-400">
                                  {scenario.guestCount} guests
                                </p>
                                {i === 0 && (
                                  <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600">
                                    <TrendingDown className="h-3 w-3" />
                                    Save{" "}
                                    {formatPrice(
                                      scenarios[1].totalCost - scenario.totalCost
                                    )}{" "}
                                    vs Standard
                                  </div>
                                )}
                                {i === 2 && (
                                  <div className="mt-3 flex items-center gap-1 text-xs text-amber-600">
                                    <TrendingUp className="h-3 w-3" />
                                    +{formatPrice(
                                      scenario.totalCost - scenarios[1].totalCost
                                    )}{" "}
                                    vs Standard
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Tips */}
                  <Card className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200">
                    <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Money-Saving Tips
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Book venues in off-season (Nov-Feb) for 20-30% savings",
                        "Consider osh/plov instead of a full multi-course menu",
                        "Use seasonal flowers — they're 50% cheaper and fresher",
                        "A talented DJ is often 40-60% cheaper than a live band",
                      ].map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-emerald-700"
                        >
                          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="secondary"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    store.reset();
                    setCurrentStep(0);
                  }}
                >
                  <RotateCcw className="h-4 w-4" />
                  Start Over
                </Button>
                <Link href="/vendors">
                  <Button>
                    Browse Vendors
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

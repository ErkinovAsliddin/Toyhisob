"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart,
  Calculator,
  ArrowRight,
  TrendingDown,
  Users,
  Star,
  Shield,
  Sparkles,
  Building2,
  UtensilsCrossed,
  Camera,
  Music,
  Flower2,
  CheckCircle2,
  ChevronRight,
  BarChart3,
  GitCompareArrows,
  Wallet,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/animations/animated";
import { useI18n } from "@/i18n/context";

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const { t } = useI18n();

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 mesh-gradient opacity-50" />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 right-[10%] w-72 h-72 bg-primary-300/30 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-[5%] w-96 h-96 bg-accent-300/20 rounded-full blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] left-[30%] w-48 h-48 bg-emerald-300/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20"
        >
          <div className="text-center max-w-4xl mx-auto">
            <FadeIn delay={0.2}>
              <Badge variant="premium" className="mb-6 text-sm px-4 py-1.5">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {t("hero.badge")}
              </Badge>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-balance">
                {t("hero.title1")}{" "}
                <span className="gradient-text">{t("hero.titleHighlight")}</span>
                <br />
                {t("hero.title2")}{" "}
                <span className="text-slate-400 line-through decoration-rose-300">{t("hero.titleStrikethrough")}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
                {t("hero.subtitle")}
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/budget">
                  <Button size="xl" className="min-w-[240px]">
                    <Calculator className="h-5 w-5" />
                    {t("hero.cta")}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/vendors">
                  <Button variant="secondary" size="xl" className="min-w-[200px]">
                    {t("nav.browseVendors")}
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Social proof */}
            <FadeIn delay={1.0}>
              <div className="mt-16 flex items-center justify-center gap-8 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-primary-300 to-rose-300"
                      />
                    ))}
                  </div>
                  <span>{t("hero.socialProof")}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-accent-400 fill-accent-400" />
                  ))}
                  <span className="ml-1">{t("hero.ratingText")}</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="h-8 w-5 rounded-full border-2 border-slate-300 flex justify-center pt-1.5">
            <motion.div
              className="h-1.5 w-1.5 rounded-full bg-slate-400"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Problem Stats */}
      <section className="py-20 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {t("problems.title")}
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                {t("problems.subtitle")}
              </p>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            {[
              { number: t("problems.stat1Number"), label: t("problems.stat1Label"), icon: Wallet },
              { number: t("problems.stat2Number"), label: t("problems.stat2Label"), icon: TrendingDown },
              { number: t("problems.stat3Number"), label: t("problems.stat3Label"), icon: BarChart3 },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <AnimatedItem key={i}>
                  <Card className="text-center p-8 bg-white/60">
                    <div className="flex justify-center mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-rose-500/10">
                        <Icon className="h-7 w-7 text-primary-500" />
                      </div>
                    </div>
                    <div className="text-4xl font-black gradient-text mb-2">
                      {stat.number}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {stat.label}
                    </p>
                  </Card>
                </AnimatedItem>
              );
            })}
          </AnimatedGroup>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">
                {t("features.badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {t("features.title")}
              </h2>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.12}>
            {[
              { icon: Calculator, title: t("features.budgetPlanner.title"), description: t("features.budgetPlanner.description"), color: "from-primary-500 to-rose-500", shadow: "shadow-primary-500/20" },
              { icon: GitCompareArrows, title: t("features.comparison.title"), description: t("features.comparison.description"), color: "from-accent-400 to-accent-500", shadow: "shadow-accent-500/20" },
              { icon: Shield, title: t("features.pressureProof.title"), description: t("features.pressureProof.description"), color: "from-emerald-500 to-emerald-600", shadow: "shadow-emerald-500/20" },
              { icon: Users, title: t("features.forEveryone.title"), description: t("features.forEveryone.description"), color: "from-purple-500 to-violet-500", shadow: "shadow-purple-500/20" },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <AnimatedItem key={i}>
                  <Card hover className="p-8 h-full">
                    <div className="flex gap-5">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg ${feature.shadow}`}
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-slate-500 leading-relaxed text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedItem>
              );
            })}
          </AnimatedGroup>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="accent" className="mb-4">
                {t("categories.badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {t("categories.title")}
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                {t("categories.subtitle")}
              </p>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-2 md:grid-cols-5 gap-4" stagger={0.08}>
            {[
              { icon: UtensilsCrossed, name: t("categories.catering"), slug: "catering", count: 45, color: "bg-amber-50 text-amber-600" },
              { icon: Building2, name: t("categories.venue"), slug: "venue", count: 32, color: "bg-primary-50 text-primary-600" },
              { icon: Camera, name: t("categories.photography"), slug: "photography", count: 28, color: "bg-violet-50 text-violet-600" },
              { icon: Music, name: t("categories.music"), slug: "music", count: 21, color: "bg-cyan-50 text-cyan-600" },
              { icon: Flower2, name: t("categories.decoration"), slug: "decoration", count: 19, color: "bg-emerald-50 text-emerald-600" },
            ].map((cat, i) => {
              const Icon = cat.icon;
              return (
                <AnimatedItem key={i}>
                  <Link href={`/vendors/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
                    <Card hover className="p-6 text-center h-full">
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${cat.color} mb-4`}>
                        <Icon className="h-7 w-7" />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm mb-1">{cat.name}</h3>
                      <p className="text-xs text-slate-400">{cat.count} vendors</p>
                    </Card>
                  </Link>
                </AnimatedItem>
              );
            })}
          </AnimatedGroup>
        </div>
      </section>

      {/* How it works - Steps */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="default" className="mb-4">
                {t("steps.badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {t("steps.title")}
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: t("steps.step1.number"), title: t("steps.step1.title"), description: t("steps.step1.description") },
              { step: t("steps.step2.number"), title: t("steps.step2.title"), description: t("steps.step2.description") },
              { step: t("steps.step3.number"), title: t("steps.step3.title"), description: t("steps.step3.description") },
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.2}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary-300 to-transparent" />
                  )}
                  <Card className="p-8 text-center relative">
                    <div className="text-6xl font-black text-primary-100 mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <Badge variant="success" className="mb-4">
                {t("testimonials.badge")}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {t("testimonials.title")}
              </h2>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            {[
              { name: t("testimonials.items.0.name"), text: t("testimonials.items.0.text") },
              { name: t("testimonials.items.1.name"), text: t("testimonials.items.1.text") },
              { name: t("testimonials.items.2.name"), text: t("testimonials.items.2.text") },
            ].map((testimonial, i) => (
              <AnimatedItem key={i}>
                <Card className="p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="h-4 w-4 text-accent-400 fill-accent-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-6 text-sm italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-300 to-rose-300" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 via-primary-500 to-rose-500 p-12 md:p-16 text-center shadow-2xl shadow-primary-500/30">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-300 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              </div>
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="inline-block mb-6"
                >
                  <Heart className="h-12 w-12 text-white" fill="white" />
                </motion.div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  {t("cta.title")}
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  {t("cta.subtitle")}
                </p>
                <Link href="/budget">
                  <Button
                    size="xl"
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-white/90 shadow-xl min-w-[260px]"
                  >
                    <Sparkles className="h-5 w-5" />
                    {t("cta.button")}
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

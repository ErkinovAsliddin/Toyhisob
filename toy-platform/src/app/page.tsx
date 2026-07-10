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

const stats = [
  { number: "65%", label: "of weddings cost more than a year's income", icon: Wallet },
  { number: "44%", label: "of couples regret how much they spent", icon: TrendingDown },
  { number: "0", label: "platforms for real cost comparison in UZ", icon: BarChart3 },
];

const features = [
  {
    icon: Calculator,
    title: "AI Budget Planner",
    description: "Enter your budget, guest count, and priorities. Get a realistic breakdown with real local prices — not generic advice.",
    color: "from-primary-500 to-rose-500",
    shadow: "shadow-primary-500/20",
  },
  {
    icon: GitCompareArrows,
    title: "Multi-Tier Comparison",
    description: "Compare catering, venues, and services at budget/standard/premium tiers side by side. See exactly what your money buys.",
    color: "from-accent-400 to-accent-500",
    shadow: "shadow-accent-500/20",
  },
  {
    icon: Shield,
    title: "Pressure-Proof Data",
    description: "Share a professional cost breakdown with family. Reframe 'we're cutting costs' as 'we did the math.' Numbers speak louder.",
    color: "from-emerald-500 to-emerald-600",
    shadow: "shadow-emerald-500/20",
  },
  {
    icon: Users,
    title: "For Everyone Involved",
    description: "Built for couples, families paying, wedding organizers, and vendors. Everyone sees what they need in one place.",
    color: "from-purple-500 to-violet-500",
    shadow: "shadow-purple-500/20",
  },
];

const categories = [
  { icon: UtensilsCrossed, name: "Catering & Osh", count: 45, color: "bg-amber-50 text-amber-600" },
  { icon: Building2, name: "Venues & Halls", count: 32, color: "bg-primary-50 text-primary-600" },
  { icon: Camera, name: "Photo & Video", count: 28, color: "bg-violet-50 text-violet-600" },
  { icon: Music, name: "Music & DJ", count: 21, color: "bg-cyan-50 text-cyan-600" },
  { icon: Flower2, name: "Decoration", count: 19, color: "bg-emerald-50 text-emerald-600" },
];

const steps = [
  {
    step: "01",
    title: "Tell us your budget",
    description: "Enter your total budget, guest count, and city. Or say 'I don't know' and let us help figure it out.",
  },
  {
    step: "02",
    title: "See your breakdown",
    description: "Get a realistic cost allocation across all wedding categories based on real Tashkent market data.",
  },
  {
    step: "03",
    title: "Compare & decide",
    description: "Compare vendors at different price tiers. Ask our AI 'what's the best catering under 5M for 100 guests?'",
  },
];

const testimonials = [
  {
    name: "Dilnoza & Sardor",
    text: "We saved 12M UZS by switching from a 200-person to 80-person wedding. The budget planner showed us exactly where the money was going.",
    rating: 5,
  },
  {
    name: "Farida & Ozodbek",
    text: "Showing our families the cost comparison ended the 'you must invite everyone' conversation. Numbers are harder to argue with.",
    rating: 5,
  },
  {
    name: "Malika婚礼 planner",
    text: "As a wedding organizer, managing 5 clients' budgets in one dashboard saves me hours every week. Game changer.",
    rating: 5,
  },
];

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
                Uzbekistan&apos;s First Smart Wedding Planner
              </Badge>
            </FadeIn>

            <FadeIn delay={0.4}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-balance">
                Plan the wedding{" "}
                <span className="gradient-text">you want</span>
                <br />
                not the one you&apos;re{" "}
                <span className="text-slate-400 line-through decoration-rose-300">pressured into</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.6}>
              <p className="mt-8 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed text-balance">
                See real costs, compare vendors at every price tier, and get
                a budget your whole family can agree on — backed by real data
                from Tashkent&apos;s wedding market.
              </p>
            </FadeIn>

            <FadeIn delay={0.8}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/budget">
                  <Button size="xl" className="min-w-[240px]">
                    <Calculator className="h-5 w-5" />
                    Start Planning — Free
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/vendors">
                  <Button variant="secondary" size="xl" className="min-w-[200px]">
                    Browse Vendors
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
                  <span>2,400+ couples</span>
                </div>
                <div className="hidden sm:flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 text-accent-400 fill-accent-400" />
                  ))}
                  <span className="ml-1">4.9/5</span>
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
                The real problem with weddings in Uzbekistan
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                It&apos;s not about finding vendors. It&apos;s about the financial and social pressure
                that makes weddings cost more than a year&apos;s income.
              </p>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            {stats.map((stat, i) => {
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
                How it works
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Everything you need to plan smart
              </h2>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-2 gap-8" stagger={0.12}>
            {features.map((feature, i) => {
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
                Marketplace
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Compare vendors at every price tier
              </h2>
              <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
                Every category has budget, standard, and premium options.
                See real prices, real photos, and real reviews — side by side.
              </p>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-2 md:grid-cols-5 gap-4" stagger={0.08}>
            {categories.map((cat, i) => {
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
                3 Simple Steps
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From &quot;I don&apos;t know where to start&quot; to &quot;I&apos;ve got this&quot;
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
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
                Real Stories
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Couples who planned smarter
              </h2>
            </div>
          </FadeIn>

          <AnimatedGroup className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
            {testimonials.map((t, i) => (
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
                    &quot;{t.text}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-300 to-rose-300" />
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">
                        {t.name}
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
                  Ready to plan smarter?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                  Join thousands of couples who chose information over pressure.
                  Your perfect wedding starts with a realistic budget.
                </p>
                <Link href="/budget">
                  <Button
                    size="xl"
                    variant="secondary"
                    className="bg-white text-primary-600 hover:bg-white/90 shadow-xl min-w-[260px]"
                  >
                    <Sparkles className="h-5 w-5" />
                    Start Your Free Budget Plan
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

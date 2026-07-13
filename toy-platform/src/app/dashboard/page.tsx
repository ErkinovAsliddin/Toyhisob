"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Calculator,
  Users,
  Calendar,
  Bell,
  Settings,
  TrendingUp,
  Wallet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Plus,
  Search,
  BarChart3,
  Store,
  Star,
  Sparkles,
  UserPlus,
  Timer,
  Receipt,
} from "lucide-react";
import { useI18n } from "@/i18n/context";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { FadeIn, AnimatedGroup, AnimatedItem } from "@/components/animations/animated";
import { formatPrice, cn } from "@/lib/utils";

const MOCK_CLIENTS = [
  {
    id: "1",
    couple: "Dilnoza & Sardor",
    weddingDate: "2026-08-15",
    guestCount: 150,
    budget: 80_000_000,
    spent: 52_000_000,
    status: "active",
    pendingDecisions: ["Finalize catering vendor", "Book photographer"],
  },
  {
    id: "2",
    couple: "Farida & Ozodbek",
    weddingDate: "2026-09-20",
    guestCount: 100,
    budget: 50_000_000,
    spent: 15_000_000,
    status: "active",
    pendingDecisions: ["Choose venue", "Set budget allocation"],
  },
  {
    id: "3",
    couple: "Malika & Jamshid",
    weddingDate: "2026-07-05",
    guestCount: 200,
    budget: 120_000_000,
    spent: 118_000_000,
    status: "completed",
    pendingDecisions: [],
  },
];

const upcomingTasks = [
  { task: "Confirm catering order for Dilnoza & Sardor", deadline: "In 3 days", urgent: true },
  { task: "Venue site visit with Farida & Ozodbek", deadline: "Next week", urgent: false },
  { task: "Review decoration proposals", deadline: "In 5 days", urgent: false },
  { task: "Final payment to photographer", deadline: "In 2 days", urgent: true },
];

export default function DashboardPage() {
  const [selectedTab, setSelectedTab] = useState<"overview" | "clients" | "vendors">("overview");
  const { t } = useI18n();

  const totalBudget = MOCK_CLIENTS.reduce((acc, c) => acc + c.budget, 0);
  const totalSpent = MOCK_CLIENTS.reduce((acc, c) => acc + c.spent, 0);
  const activeCount = MOCK_CLIENTS.filter((c) => c.status === "active").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="pt-28 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {t("dashboard.title")}
                </h1>
                <p className="text-slate-500 mt-1">
                  {t("dashboard.subtitle")}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" size="sm">
                  <Bell className="h-4 w-4" />
                  {t("nav.notifications")}
                  <span className="ml-1 h-5 w-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                    3
                  </span>
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  {t("guestList.addGuest")}
                </Button>
              </div>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: t("dashboard.activeWeddings"), value: activeCount, icon: Users, color: "text-primary-500", bg: "bg-primary-50" },
                { label: t("dashboard.totalBudget"), value: formatPrice(totalBudget), icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-50" },
                { label: t("dashboard.revenueCollected"), value: formatPrice(totalSpent), icon: TrendingUp, color: "text-accent-500", bg: "bg-amber-50" },
                { label: t("dashboard.pendingTasks"), value: upcomingTasks.filter((t) => t.urgent).length, icon: Clock, color: "text-rose-500", bg: "bg-rose-50" },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card key={i} className="p-5">
                    <div className="flex items-center gap-3">
                      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", stat.bg)}>
                        <Icon className={cn("h-5 w-5", stat.color)} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                        <p className="text-lg font-bold text-slate-900">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Client List */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary-500" />
                      {t("dashboard.yourClients")}
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t("dashboard.searchClients")}
                        className="h-8 pl-8 pr-3 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {MOCK_CLIENTS.map((client) => (
                        <motion.div
                          key={client.id}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all cursor-pointer"
                        >
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-300 to-rose-300 flex items-center justify-center text-white font-bold text-sm shrink-0">
                            {client.couple.split(" & ").map((n) => n[0]).join("")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-slate-900 text-sm truncate">
                                {client.couple}
                              </h3>
                              <Badge
                                variant={client.status === "active" ? "success" : "secondary"}
                                className="text-[10px]"
                              >
                                {client.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {client.weddingDate}
                              </span>
                              <span>{client.guestCount} guests</span>
                            </div>
                            <div className="mt-2">
                              <ProgressBar
                                value={client.spent}
                                max={client.budget}
                                color={client.spent / client.budget > 0.9 ? "#f43f5e" : "#ec4899"}
                                size="sm"
                              />
                              <div className="flex justify-between mt-1 text-[10px] text-slate-400">
                                <span>{formatPrice(client.spent)} spent</span>
                                <span>{formatPrice(client.budget)} budget</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-300 shrink-0" />
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Quick Actions */}
              <FadeIn delay={0.3}>
                <Card className="p-6">
                  <CardTitle className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-accent-500" />
                    {t("dashboard.quickActions")}
                  </CardTitle>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: t("dashboard.newBudgetPlan"), icon: Calculator, href: "/budget", color: "bg-primary-50 text-primary-600" },
                      { label: t("dashboard.browseVendors"), icon: Store, href: "/vendors", color: "bg-emerald-50 text-emerald-600" },
                      { label: t("dashboard.comparePrices"), icon: BarChart3, href: "/vendors", color: "bg-accent-50 text-accent-600" },
                      { label: t("guestList.title"), icon: UserPlus, href: "/guests", color: "bg-violet-50 text-violet-600" },
                      { label: t("costTracker.title"), icon: Receipt, href: "/cost-tracker", color: "bg-rose-50 text-rose-600" },
                      { label: t("dashboard.settings"), icon: Settings, href: "/dashboard", color: "bg-slate-100 text-slate-600" },
                    ].map((action) => {
                      const Icon = action.icon;
                      return (
                        <Link key={action.label} href={action.href}>
                          <div className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-xl hover:scale-105 transition-transform cursor-pointer",
                            action.color
                          )}>
                            <Icon className="h-6 w-6" />
                            <span className="text-xs font-medium">{action.label}</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              </FadeIn>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Pending Tasks */}
              <FadeIn delay={0.2}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Clock className="h-4 w-4 text-amber-500" />
                      {t("dashboard.pendingTasksTitle")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingTasks.map((task, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-start gap-3 p-3 rounded-xl text-sm",
                            task.urgent ? "bg-amber-50 border border-amber-200" : "bg-slate-50"
                          )}
                        >
                          {task.urgent ? (
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                          )}
                          <div>
                            <p className="text-slate-700 text-xs">{task.task}</p>
                            <p className={cn(
                              "text-[10px] mt-1",
                              task.urgent ? "text-amber-600 font-medium" : "text-slate-400"
                            )}>
                              {task.deadline}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Vendor Performance */}
              <FadeIn delay={0.3}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Star className="h-4 w-4 text-accent-500" />
                      {t("dashboard.topVendors")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Osh Bey Catering", bookings: 12, rating: 4.8 },
                        { name: "Golden Palace", bookings: 8, rating: 4.6 },
                        { name: "Dilshod Studio", bookings: 15, rating: 4.9 },
                      ].map((vendor, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-100 to-rose-100 flex items-center justify-center text-xs font-bold text-primary-600">
                            {i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-slate-900 truncate">{vendor.name}</p>
                            <p className="text-[10px] text-slate-400">{vendor.bookings} bookings</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-accent-400 fill-accent-400" />
                            <span className="text-xs font-medium text-slate-700">{vendor.rating}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              {/* Calendar Widget */}
              <FadeIn delay={0.4}>
                <Card className="p-5">
                  <h3 className="font-semibold text-sm text-slate-900 mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary-500" />
                    {t("dashboard.upcomingEvents")}
                  </h3>
                  <div className="space-y-2">
                    {[
                      { event: "Malika & Jamshid", date: "Jul 5", type: "Wedding Day" },
                      { event: "Dilnoza & Sardor", date: "Aug 15", type: "Wedding Day" },
                      { event: "Farida & Ozodbek", date: "Sep 20", type: "Wedding Day" },
                    ].map((ev, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                        <div className="text-center shrink-0">
                          <div className="text-xs font-bold text-primary-600">{ev.date.split(" ")[0]}</div>
                          <div className="text-[10px] text-slate-400">{ev.date.split(" ")[1]}</div>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-900">{ev.event}</p>
                          <p className="text-[10px] text-slate-400">{ev.type}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

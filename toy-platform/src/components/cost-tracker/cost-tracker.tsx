"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wallet,
  Plus,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  DollarSign,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress";
import { FadeIn } from "@/components/animations/animated";
import { useI18n } from "@/i18n/context";
import { formatPrice, cn } from "@/lib/utils";
import { WEDDING_CATEGORIES, type WeddingCategory } from "@/types";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: WeddingCategory;
  date: string;
}

const BUDGET_ALLOCATIONS: Record<WeddingCategory, number> = {
  catering: 17_500_000,
  venue: 12_500_000,
  photography: 5_000_000,
  music: 5_000_000,
  decoration: 5_000_000,
  clothing: 2_500_000,
  transport: 1_500_000,
  invitations: 500_000,
  gifts: 500_000,
};

const MOCK_EXPENSES: Expense[] = [
  { id: "1", description: "Deposit for Golden Palace", amount: 5_000_000, category: "venue", date: "2026-06-15" },
  { id: "2", description: "Photography deposit - Dilshod Studio", amount: 3_000_000, category: "photography", date: "2026-06-18" },
  { id: "3", description: "DJ booking - Navo'i Ensemble", amount: 1_500_000, category: "music", date: "2026-06-20" },
  { id: "4", description: "Catering pre-order 50 guests", amount: 9_000_000, category: "catering", date: "2026-06-25" },
  { id: "5", description: "Invitation cards printing", amount: 350_000, category: "invitations", date: "2026-06-22" },
];

export function CostTracker() {
  const { t } = useI18n();
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "catering" as WeddingCategory,
  });

  const totalBudget = Object.values(BUDGET_ALLOCATIONS).reduce((a, b) => a + b, 0);
  const totalSpent = expenses.reduce((a, b) => a + b.amount, 0);
  const remaining = totalBudget - totalSpent;
  const percentUsed = (totalSpent / totalBudget) * 100;
  const isOverBudget = remaining < 0;

  const categoryBreakdown = Object.entries(BUDGET_ALLOCATIONS).map(([slug, budget]) => {
    const spent = expenses
      .filter((e) => e.category === slug)
      .reduce((a, b) => a + b.amount, 0);
    return {
      slug: slug as WeddingCategory,
      name: WEDDING_CATEGORIES[slug as WeddingCategory]?.name || slug,
      budget,
      spent,
      remaining: budget - spent,
    };
  });

  const addExpense = () => {
    if (!newExpense.description.trim() || !newExpense.amount) return;
    setExpenses([
      {
        id: Date.now().toString(),
        description: newExpense.description,
        amount: Number(newExpense.amount),
        category: newExpense.category,
        date: new Date().toISOString().split("T")[0],
      },
      ...expenses,
    ]);
    setNewExpense({ description: "", amount: "", category: "catering" });
    setShowAddForm(false);
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <FadeIn>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-emerald-500" />
              {t("costTracker.title")}
            </CardTitle>
            <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4" />
              {t("costTracker.addExpense")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-primary-50 border border-primary-100">
              <p className="text-xs text-primary-600 font-medium">{t("costTracker.budgeted")}</p>
              <p className="text-lg font-bold text-primary-700">{formatPrice(totalBudget)}</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-600 font-medium">{t("costTracker.spent")}</p>
              <p className="text-lg font-bold text-amber-700">{formatPrice(totalSpent)}</p>
            </div>
            <div className={cn(
              "p-4 rounded-xl border",
              isOverBudget
                ? "bg-rose-50 border-rose-100"
                : "bg-emerald-50 border-emerald-100"
            )}>
              <p className={cn("text-xs font-medium", isOverBudget ? "text-rose-600" : "text-emerald-600")}>
                {isOverBudget ? t("costTracker.overBudget") : t("costTracker.remaining")}
              </p>
              <p className={cn("text-lg font-bold", isOverBudget ? "text-rose-700" : "text-emerald-700")}>
                {isOverBudget ? "-" : ""}{formatPrice(Math.abs(remaining))}
              </p>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-6">
            <ProgressBar
              value={totalSpent}
              max={totalBudget}
              color={isOverBudget ? "#f43f5e" : "#10b981"}
              size="md"
            />
          </div>

          {/* Add Form */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-3 mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <input
                    type="text"
                    placeholder={t("costTracker.expenseDescription")}
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="flex-1 min-w-[150px] h-10 px-3 rounded-lg border border-emerald-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <input
                    type="number"
                    placeholder={t("costTracker.expenseAmount")}
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-36 h-10 px-3 rounded-lg border border-emerald-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value as WeddingCategory })}
                    className="h-10 px-3 rounded-lg border border-emerald-200 bg-white text-sm focus:outline-none"
                  >
                    {Object.entries(WEDDING_CATEGORIES).map(([slug, cat]) => (
                      <option key={slug} value={slug}>{cat.name}</option>
                    ))}
                  </select>
                  <Button size="sm" onClick={addExpense}>
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>
                    <AlertTriangle className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Breakdown */}
          <div className="space-y-3 mb-6">
            <h4 className="text-sm font-semibold text-slate-700">{t("costTracker.budgeted")} vs {t("costTracker.spent")}</h4>
            {categoryBreakdown.map((cat) => {
              const pct = cat.budget > 0 ? (cat.spent / cat.budget) * 100 : 0;
              const isOver = cat.spent > cat.budget;
              return (
                <div key={cat.slug} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-24 truncate shrink-0">{cat.name}</span>
                  <div className="flex-1">
                    <ProgressBar
                      value={cat.spent}
                      max={cat.budget}
                      color={isOver ? "#f43f5e" : "#10b981"}
                      size="sm"
                    />
                  </div>
                  <span className={cn("text-xs font-medium w-16 text-right shrink-0", isOver ? "text-rose-600" : "text-slate-500")}>
                    {Math.round(pct)}%
                  </span>
                </div>
              );
            })}
          </div>

          {/* Recent Expenses */}
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3">{t("costTracker.recentExpenses")}</h4>
            <div className="space-y-2">
              <AnimatePresence>
                {expenses.slice(0, 6).map((expense) => (
                  <motion.div
                    key={expense.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group"
                  >
                    <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                      <DollarSign className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-900 truncate">{expense.description}</p>
                      <p className="text-[10px] text-slate-400">
                        {WEDDING_CATEGORIES[expense.category]?.name} • {expense.date}
                      </p>
                    </div>
                    <span className="text-sm font-bold text-slate-900 shrink-0">
                      {formatPrice(expense.amount)}
                    </span>
                    <button
                      onClick={() => removeExpense(expense.id)}
                      className="p-1 rounded text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </CardContent>
      </Card>
    </FadeIn>
  );
}

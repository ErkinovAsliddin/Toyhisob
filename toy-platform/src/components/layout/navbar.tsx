"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Menu,
  X,
  Calculator,
  Store,
  LayoutDashboard,
  LogIn,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Budget Planner", href: "/budget", icon: Calculator },
  { label: "Marketplace", href: "/vendors", icon: Store },
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-4">
          <div className="glass rounded-2xl px-6 py-3 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-rose-500 shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                    <Heart className="h-5 w-5 text-white" fill="white" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="h-4 w-4 text-accent-400" />
                  </motion.div>
                </div>
                <div>
                  <span className="text-xl font-bold gradient-text">
                    To&apos;y
                  </span>
                  <span className="text-xl font-light text-slate-600 ml-1">
                    Platform
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary-50 text-primary-700"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                </Link>
                <Link href="/budget">
                  <Button size="sm">
                    <Sparkles className="h-4 w-4" />
                    Plan Your Wedding
                  </Button>
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? (
                  <X className="h-5 w-5 text-slate-600" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-24 z-40 px-4 md:hidden"
          >
            <div className="glass rounded-2xl p-4 shadow-xl space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary-50 text-primary-700"
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
              <hr className="my-2 border-slate-200" />
              <Link
                href="/budget"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full"
              >
                <Button className="w-full" size="lg">
                  <Sparkles className="h-4 w-4" />
                  Plan Your Wedding
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

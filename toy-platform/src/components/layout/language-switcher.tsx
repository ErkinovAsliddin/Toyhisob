"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useI18n, type Locale } from "@/i18n/context";
import { cn } from "@/lib/utils";

const LANGUAGES: { code: Locale; label: string; nativeName: string; flag: string }[] = [
  { code: "en", label: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ru", label: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "uz", label: "Uzbek", nativeName: "O'zbek", flag: "🇺🇿" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) || LANGUAGES[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all",
          "bg-white/80 border border-slate-200 hover:border-primary-300 hover:bg-primary-50",
          open && "border-primary-300 bg-primary-50"
        )}
      >
        <Globe className="h-4 w-4 text-slate-500" />
        <span className="text-lg leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-slate-700">{current.nativeName}</span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-slate-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl shadow-black/10 overflow-hidden z-50"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLocale(lang.code);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 text-sm transition-all",
                  locale === lang.code
                    ? "bg-primary-50 text-primary-700"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex-1 text-left">
                  <div className="font-medium">{lang.nativeName}</div>
                  <div className="text-xs text-slate-400">{lang.label}</div>
                </div>
                {locale === lang.code && (
                  <Check className="h-4 w-4 text-primary-500" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

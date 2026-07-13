"use client";

import Link from "next/link";
import { Heart, Instagram, Send, Phone } from "lucide-react";
import { useI18n } from "@/i18n/context";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative mt-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-slate-800" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent-400 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-rose-500">
                <Heart className="h-5 w-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-white">To&apos;y Platform</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{t("footer.plan")}</h3>
            <ul className="space-y-3">
              {[
                { label: t("footer.budgetPlanner"), href: "/budget" },
                { label: t("footer.costComparison"), href: "/vendors" },
                { label: t("footer.weddingChecklist"), href: "/checklist" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendors */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{t("footer.vendors")}</h3>
            <ul className="space-y-3">
              {[
                { label: t("categories.catering"), href: "/vendors/catering" },
                { label: t("categories.venue"), href: "/vendors/venue" },
                { label: t("categories.photography"), href: "/vendors/photography" },
                { label: t("categories.decoration"), href: "/vendors/decoration" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">{t("footer.connect")}</h3>
            <div className="flex gap-3">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-slate-400 hover:bg-primary-500 hover:text-white transition-all">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-sm">
            {t("footer.madeWith")} <Heart className="h-3 w-3 text-rose-400 mx-1" fill="currentColor" /> {t("footer.notDebt")}
          </div>
        </div>
      </div>
    </footer>
  );
}

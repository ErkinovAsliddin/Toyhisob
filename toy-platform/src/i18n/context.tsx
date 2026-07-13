"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import en from "./en.json";
import ru from "./ru.json";
import uz from "./uz.json";

export type Locale = "en" | "ru" | "uz";

const translations: Record<Locale, Record<string, any>> = { en, ru, uz };

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string | undefined {
  return path.split(".").reduce((current, key) => {
    if (current === undefined || current === null) return undefined;
    if (Array.isArray(current)) {
      const index = parseInt(key, 10);
      return current[index];
    }
    return current[key];
  }, obj);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("toy-locale") as Locale) || "en";
    }
    return "en";
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("toy-locale", newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const value = getNestedValue(translations[locale], key);
      if (value === undefined || value === null) {
        const fallback = getNestedValue(translations.en, key);
        if (fallback === undefined || fallback === null) return key;
        return interpolate(fallback, params);
      }
      if (typeof value === "object") return JSON.stringify(value);
      return interpolate(value, params);
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return Object.entries(params).reduce(
    (result, [key, value]) => result.replace(new RegExp(`\\{${key}\\}`, "g"), String(value)),
    template
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within I18nProvider");
  return context;
}

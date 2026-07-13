"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useI18n } from "@/i18n/context";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function WeddingCountdown({ weddingDate }: { weddingDate?: string | null }) {
  const { t } = useI18n();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const targetDate = weddingDate
      ? new Date(weddingDate)
      : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000); // Default: 90 days from now

    const calculateTimeLeft = (): TimeLeft => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [weddingDate]);

  if (!timeLeft) return null;

  const units = [
    { value: timeLeft.days, label: t("countdown.days") },
    { value: timeLeft.hours, label: t("countdown.hours") },
    { value: timeLeft.minutes, label: t("countdown.minutes") },
    { value: timeLeft.seconds, label: t("countdown.seconds") },
  ];

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-1 mb-3">
        <Heart className="h-4 w-4 text-primary-400" fill="currentColor" />
        <span className="text-sm text-slate-500 font-medium">
          {t("countdown.untilWedding")}
        </span>
        <Heart className="h-4 w-4 text-primary-400" fill="currentColor" />
      </div>
      <div className="flex items-center justify-center gap-3 sm:gap-4">
        {units.map((unit, i) => (
          <motion.div
            key={unit.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-rose-500 shadow-lg shadow-primary-500/30 flex items-center justify-center">
                <motion.span
                  key={unit.value}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl sm:text-3xl font-black text-white"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </div>
            </div>
            <span className="text-xs text-slate-500 mt-2 font-medium uppercase tracking-wider">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

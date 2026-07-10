"use client";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  color = "#ec4899",
  size = "md",
  showLabel = false,
  animated = true,
  className,
}: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const heights = { sm: "h-1.5", md: "h-3", lg: "h-5" };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-slate-600">{value}</span>
          <span className="text-xs text-slate-400">{Math.round(pct)}%</span>
        </div>
      )}
      <div className={cn("w-full rounded-full bg-slate-100 overflow-hidden", heights[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all",
            animated && "duration-1000 ease-out"
          )}
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
        />
      </div>
    </div>
  );
}

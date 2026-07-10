import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, icon, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all duration-200",
              "placeholder:text-slate-400",
              "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
              "hover:border-slate-300",
              icon && "pl-10",
              error && "border-rose-400 focus:ring-rose-500/20 focus:border-rose-400",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-semibold text-slate-700">
            {label}
          </label>
        )}
        <select
          className={cn(
            "flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400",
            "hover:border-slate-300",
            error && "border-rose-400",
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-rose-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Input, Select };

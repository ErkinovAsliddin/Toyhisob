"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

interface AnimatedGroupProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (stagger: number) => ({
    opacity: 1,
    transition: { staggerChildren: stagger || 0.1 },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export function AnimatedGroup({ children, className, delay = 0, stagger = 0.1 }: AnimatedGroupProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={stagger}
      className={className}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
}

export function FadeIn({ children, className, delay = 0, direction = "up", duration = 0.6 }: FadeInProps) {
  const dirMap = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ScaleInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScaleIn({ children, className, delay = 0 }: ScaleInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay, type: "spring", stiffness: 200, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ from = 0, to, duration = 2, className, prefix = "", suffix = "" }: CountUpProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
      >
        {prefix}
        <motion.span
          initial={from}
          animate={to}
          transition={{ duration, ease: "easeOut" }}
          onUpdate={(latest) => {
            // Will be animated via framer motion
          }}
        >
          {/* Fallback: just show the target value */}
          {to.toLocaleString()}
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
}

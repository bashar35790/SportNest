"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "p";
  once?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = true,
  as = "div",
  once = true,
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  const Comp = motion[as];

  return (
    <Comp
      className={className}
      initial={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y, filter: blur ? "blur(8px)" : "none" }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: PREMIUM_EASE }}
    >
      {children}
    </Comp>
  );
}

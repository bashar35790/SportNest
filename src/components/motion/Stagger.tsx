"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

type StaggerConfig = {
  y: number;
  blur: boolean;
  bounce: boolean;
};

const StaggerContext = createContext<StaggerConfig>({
  y: 30,
  blur: true,
  bounce: true,
});

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  blur?: boolean;
  bounce?: boolean;
};

export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  y = 30,
  blur = true,
  bounce = true,
}: StaggerGroupProps) {
  const reduceMotion = useReducedMotion();

  return (
    <StaggerContext.Provider value={{ y, blur, bounce }}>
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: reduceMotion ? 0 : stagger },
          },
        }}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const { y, blur, bounce } = useContext(StaggerContext);

  const enterTransition = bounce
    ? {
        type: "spring" as const,
        stiffness: 260,
        damping: 18,
        mass: 0.9,
      }
    : { duration: 0.75, ease: PREMIUM_EASE };

  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduceMotion
          ? { opacity: 1 }
          : { opacity: 0, y, filter: blur ? "blur(6px)" : "none" },
        visible: reduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: enterTransition,
            },
      }}
    >
      {children}
    </motion.div>
  );
}

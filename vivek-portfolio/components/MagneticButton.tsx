"use client";

import { useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

function useMagnetic() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { springX, springY, handleMove, handleLeave };
}

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  className,
  type = "button",
  disabled,
}: MagneticButtonProps) {
  const ref = useRef(null);
  const { springX, springY, handleMove, handleLeave } = useMagnetic();

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-mono text-xs uppercase tracking-widest2 transition-colors duration-300 cinematic",
    variant === "solid"
      ? "bg-accent text-bg hover:bg-highlight"
      : "border border-white/25 text-ink hover:border-accent hover:text-accent",
    className
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        data-cursor="hover"
        style={{ x: springX, y: springY }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={baseClasses}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-cursor="hover"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(baseClasses, disabled && "opacity-60")}
    >
      {children}
    </motion.button>
  );
}

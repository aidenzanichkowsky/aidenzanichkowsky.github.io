"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LiquidCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function LiquidCard({ children, className, ...props }: LiquidCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-[24px] border border-black/5 bg-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-2xl transition-colors dark:border-white/10 dark:bg-white/5 dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        className
      )}
      {...props}
    >
      {/* Light Mode Liquid Glow */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 dark:hidden"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.8), transparent 40%)`,
        }}
      />

      {/* Dark Mode Liquid Glow */}
      <div
        className="pointer-events-none absolute -inset-px hidden transition-opacity duration-500 dark:block"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.1), transparent 40%)`,
        }}
      />

      {/* Inner border to simulate glass edge */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/40 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100 dark:border-white/20" />

      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { playMacPopSound } from "@/lib/sounds";

export interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  target?: string;
}

export const LiquidButton = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, LiquidButtonProps>(
  ({ className, href, target, ...props }, ref) => {
    const internalRef = React.useRef<HTMLElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const setRefs = (node: HTMLElement | null) => {
      (internalRef as React.MutableRefObject<HTMLElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node as any);
      } else if (ref) {
        (ref as React.MutableRefObject<any>).current = node;
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (!internalRef.current) return;
      const btn = internalRef.current;
      const rect = btn.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
      playMacPopSound();
      if (props.onMouseDown) {
        props.onMouseDown(e as any);
      }
    };

    const content = (
      <>
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 dark:hidden"
          style={{
            opacity,
            background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.9), transparent 40%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -inset-px hidden transition-opacity duration-300 dark:block"
          style={{
            opacity,
            background: `radial-gradient(100px circle at ${position.x}px ${position.y}px, rgba(255, 255, 255, 0.2), transparent 40%)`,
          }}
        />
        <span className="relative z-10 flex items-center justify-center">{props.children}</span>
      </>
    );

    const baseClasses = cn(
      "group relative overflow-hidden rounded-full border border-black/10 bg-white/50 px-6 py-2 shadow-sm backdrop-blur-md transition-all hover:border-black/20 hover:shadow-md dark:border-white/10 dark:bg-white/10 dark:hover:border-white/20 inline-flex items-center justify-center",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          target={target}
          ref={setRefs as any}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          className={baseClasses}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={setRefs as any}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        className={baseClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);
LiquidButton.displayName = "LiquidButton";

"use client";

import Link from "next/link";

import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { LiquidButton } from "@/components/ui/liquid-button";
import { playMacPopSound } from "@/lib/sounds";

type SiteHeaderProps = {
  currentPath: string;
};

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/30 bg-white/45 backdrop-blur-2xl dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <div className="flex-1">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.08em] text-foreground/90"
            onMouseDown={playMacPopSound}
          >
            Aiden Zanichkowsky
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-none items-center gap-6">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? currentPath === item.href
                : currentPath.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseDown={playMacPopSound}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  active
                    ? "text-foreground underline underline-offset-4 decoration-2"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4">
          <ThemeToggle />
          <LiquidButton href="/contact" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90 transition-colors">
            Let&apos;s Talk
          </LiquidButton>
        </div>
      </div>
    </header>
  );
}

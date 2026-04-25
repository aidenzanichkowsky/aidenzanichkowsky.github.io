import { ReactNode } from "react";

import { SiteFooter } from "@/components/portfolio/site-footer";
import { SiteHeader } from "@/components/portfolio/site-header";

type PageShellProps = {
  currentPath: string;
  children: ReactNode;
};

export function PageShell({ currentPath, children }: PageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top_left,rgba(245,245,244,0.8),transparent_42%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.94),transparent_30%),linear-gradient(180deg,#fafaf9_0%,#f5f5f4_44%,#fafaf9_100%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_36%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.04),transparent_26%),linear-gradient(180deg,#111111_0%,#151515_44%,#111111_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-64 max-w-5xl rounded-[32px] bg-white/20 blur-3xl" />
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader currentPath={currentPath} />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}

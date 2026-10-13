import Link from "next/link";
import { ArrowDown, ExternalLink } from "lucide-react";

import { PageShell } from "@/components/portfolio/page-shell";
import { TerminalHero } from "@/components/portfolio/terminal-hero";
import { ContributionGraph } from "@/components/portfolio/contribution-graph";
import { projects } from "@/data/portfolio";
import { LiquidCard } from "@/components/ui/liquid-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResumeModal } from "@/components/portfolio/resume-modal";

export default function HomePage() {
  return (
    <PageShell currentPath="/">
      {/* Hero Section */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-12 px-6 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28 text-center">
        <TerminalHero />

        <div className="mt-8 flex flex-col items-center gap-6">
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-6xl lg:text-7xl">
            Building the Future,<br />One Line at a Time.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            Crafting high-performance applications and exploring the frontiers of artificial intelligence with clean, elegant code.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <LiquidButton href="/projects" className="rounded-full px-8 py-6 text-sm font-semibold tracking-wide border-white/20 hover:border-white/40">
              VIEW WORK <ArrowDown className="ml-2 h-4 w-4" />
            </LiquidButton>
            <ResumeModal>
              <LiquidButton className="rounded-full px-8 py-6 text-sm font-semibold tracking-wide border-white/20 bg-transparent hover:bg-white/10 dark:hover:bg-white/5">
                <ArrowDown className="mr-2 h-4 w-4 -rotate-90" /> RESUME
              </LiquidButton>
            </ResumeModal>
          </div>
        </div>
      </section>

      <Separator className="bg-border/50" />

      {/* Selected Works Section */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 md:px-8">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight text-foreground">Selected Works</h2>
          <p className="mt-3 text-lg text-muted-foreground">Real projects built with Python and other development tools.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <a key={project.id} href={project.href} target="_blank" rel="noopener noreferrer" className="block group">
              <LiquidCard className="h-full overflow-hidden p-0 border-border/50 transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex aspect-[16/10] items-center justify-center rounded-t-[24px] bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-900">
                  <span className="text-8xl" role="img" aria-label="Animated film frames">🎞️</span>
                </div>
                <div className="p-8">
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="rounded-md bg-secondary/60">{tag}</Badge>
                    ))}
                  </div>
                  <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                    {project.title} <ExternalLink className="h-4 w-4" />
                  </h3>
                  <p className="mt-3 text-muted-foreground">{project.summary}</p>
                  <p className="mt-4 text-sm font-medium text-foreground">View on GitHub →</p>
                </div>
              </LiquidCard>
            </a>
          ))}
        </div>
      </section>

      <Separator className="bg-border/50" />

      {/* Open Source Contributions */}
      <section className="mx-auto w-full max-w-6xl px-6 py-24 md:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-12">Open Source Contributions</h2>
        <ContributionGraph />
      </section>
    </PageShell>
  );
}

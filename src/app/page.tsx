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
                <div className="aspect-[16/10] overflow-hidden rounded-t-[24px] bg-[#07366d]">
                  <img src="data:image/png;base64,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" alt="Pixel art Nyan Cat flying across a blue starry sky with a rainbow trail" className="h-full w-full object-cover" />
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

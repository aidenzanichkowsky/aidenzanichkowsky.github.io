import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Search } from "lucide-react";

import { PageShell } from "@/components/portfolio/page-shell";
import { TerminalHero } from "@/components/portfolio/terminal-hero";
import { ContributionGraph } from "@/components/portfolio/contribution-graph";
import { projects } from "@/data/portfolio";
import { LiquidCard } from "@/components/ui/liquid-card";
import { LiquidButton } from "@/components/ui/liquid-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">Selected Works</h2>
            <p className="mt-3 text-lg text-muted-foreground">A curated collection of recent full-stack and AI projects.</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="w-full sm:w-64 pl-9 rounded-full bg-secondary/50 border-border/50 focus-visible:ring-1 focus-visible:ring-ring"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'React', 'Python', 'AI/ML'].map((filter, i) => (
                <Badge
                  key={filter}
                  variant={i === 0 ? "default" : "secondary"}
                  className={`rounded-full px-4 py-1.5 cursor-pointer ${i !== 0 ? 'bg-secondary/50 hover:bg-secondary' : ''}`}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <LiquidCard key={project.id} className="group p-0 border-border/50">
              <div className="aspect-[16/10] overflow-hidden bg-muted relative rounded-t-[24px]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-secondary/60 rounded-md backdrop-blur-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                <p className="mt-3 text-muted-foreground line-clamp-2">
                  {project.summary}
                </p>
              </div>
            </LiquidCard>
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

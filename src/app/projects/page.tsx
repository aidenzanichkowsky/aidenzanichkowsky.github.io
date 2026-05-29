import { PageShell } from "@/components/portfolio/page-shell";
import { ProjectEmptyState } from "@/components/portfolio/project-empty-state";
import { SectionHeading } from "@/components/portfolio/section-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectsPage() {
  return (
    <PageShell currentPath="/projects">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Projects"
          title="A clean stage for real work."
          description="This page is designed to hold genuine case studies in AI, automation, and data visualization without padding the story with invented work."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <a
            href="/lumina/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:-translate-y-1.5 block"
          >
            <Card className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)] h-full cursor-pointer hover:border-amber-500/40 hover:shadow-[0_20px_55px_-40px_rgba(245,158,11,0.25)] transition-all duration-300">
              <CardHeader className="px-5 pt-5">
                <CardTitle className="flex items-center gap-2">
                  <span>🌤️</span> Lumina Weather
                </CardTitle>
                <CardDescription>
                  Vanilla JS • Canvas Physics
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
                An immersive ambient weather platform. Renders highly optimized, locked 60fps custom weather particle streams (rain, snow, storm lightnings) behind glassmorphic dashboard cards.
              </CardContent>
            </Card>
          </a>

          <a
            href="/apexdev/index.html"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform duration-300 hover:-translate-y-1.5 block"
          >
            <Card className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)] h-full cursor-pointer hover:border-violet-500/40 hover:shadow-[0_20px_55px_-40px_rgba(168,85,247,0.25)] transition-all duration-300">
              <CardHeader className="px-5 pt-5">
                <CardTitle className="flex items-center gap-2">
                  <span>📊</span> ApexDev Analytics
                </CardTitle>
                <CardDescription>
                  Vanilla JS • Custom SVG Charts
                </CardDescription>
              </CardHeader>
              <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
                A premium space-black profile metrics dashboard. Coded completely from scratch to avoid bloated graphing libraries, drawing interactive animated donut segments dynamically with native math.
              </CardContent>
            </Card>
          </a>

          <Card className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)] h-full opacity-70">
            <CardHeader className="px-5 pt-5">
              <CardTitle className="flex items-center gap-2 text-muted-foreground">
                <span>➕</span> More Coming Soon
              </CardTitle>
              <CardDescription>
                Zero Fabricated Work
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              New genuine builds in AI engineering, databases, and micro-frontends will be added directly into this stage as they are completed.
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}

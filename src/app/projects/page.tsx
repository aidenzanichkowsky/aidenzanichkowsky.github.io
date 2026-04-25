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

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)]">
            <CardHeader className="px-5 pt-5">
              <CardTitle>Case Study Ready</CardTitle>
              <CardDescription>
                Structured for future additions like context, stack, and impact.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              Real projects can be added without changing the overall layout.
            </CardContent>
          </Card>
          <Card className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)]">
            <CardHeader className="px-5 pt-5">
              <CardTitle>Flexible Layout</CardTitle>
              <CardDescription>
                Works for one featured build or a growing collection over time.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              The design stays minimal until there is real work to showcase.
            </CardContent>
          </Card>
          <Card className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)]">
            <CardHeader className="px-5 pt-5">
              <CardTitle>No Filler</CardTitle>
              <CardDescription>
                No fabricated project cards, teams, or launch claims.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-5 pb-5 text-sm leading-7 text-muted-foreground">
              The portfolio remains credible while leaving room to grow.
            </CardContent>
          </Card>
        </div>

        <ProjectEmptyState />
      </section>
    </PageShell>
  );
}

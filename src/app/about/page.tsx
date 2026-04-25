import { PageShell } from "@/components/portfolio/page-shell";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { aboutHighlights, focusAreas, skillGroups } from "@/data/portfolio";

export default function AboutPage() {
  return (
    <PageShell currentPath="/about">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 py-12 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="About"
          title="Focused on building useful software with clarity and intent."
          description="Aiden is a recent Algonquin College graduate from 2025, with a growing focus on full-stack development, automation, and AI."
        />

        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-[22px] border border-black/6 bg-white/85 py-0 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.42)]">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl">Background</CardTitle>
              <CardDescription className="text-base leading-7 text-foreground/80 dark:text-muted-foreground">
                Early in his career, with a strong interest in systems that feel
                reliable, efficient, and well considered.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 px-6 pb-6">
              {aboutHighlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[18px] border border-black/6 bg-white/55 px-4 py-4 text-sm leading-7 text-foreground/90 dark:text-muted-foreground dark:bg-white/6"
                >
                  {highlight}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[22px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(245,245,244,0.9)_100%)] py-0 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.42)]">
            <CardHeader className="px-6 pt-6">
              <CardTitle className="text-2xl">Focus Areas</CardTitle>
              <CardDescription className="text-base leading-7 text-foreground/80 dark:text-muted-foreground">
                Technical interests centered around product-building disciplines
                that connect engineering and usability.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 px-6 pb-6">
              {focusAreas.map((area) => (
                <Badge
                  key={area}
                  variant="secondary"
                  className="rounded-full border border-black/6 bg-white/70 px-3 py-1.5 text-sm text-foreground dark:bg-white/8"
                >
                  {area}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <Card
              key={group.title}
              className="rounded-[20px] border border-black/6 bg-white/80 py-0 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.4)]"
            >
              <CardHeader className="px-5 pt-5">
                <CardTitle>{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2 px-5 pb-5">
                {group.items.map((item) => (
                  <Badge
                    key={item}
                    variant="secondary"
                    className="rounded-full border border-black/6 bg-white/55 px-3 py-1.5 text-sm text-foreground dark:bg-white/8"
                  >
                    {item}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          ))}
        </section>
      </section>
    </PageShell>
  );
}

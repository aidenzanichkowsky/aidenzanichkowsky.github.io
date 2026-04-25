import {
  FolderGit2,
  Link as LinkIcon,
  Mail,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

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

export default function ContactPage() {
  return (
    <PageShell currentPath="/contact">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-12 md:px-8 md:py-20">
        <SectionHeading
          eyebrow="Contact"
          title="Open to meaningful opportunities and good technical conversations."
          description="This page keeps the contact experience clean and ready for real channels to be added when preferred details are finalized."
        />

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="rounded-[22px] border border-black/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(238,242,255,0.92)_100%)] py-0 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.42)]">
            <CardHeader className="px-6 pt-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/70 text-foreground shadow-sm dark:bg-white/8">
                <MessageSquareText />
              </div>
              <CardTitle className="text-2xl">What to reach out about</CardTitle>
              <CardDescription className="text-base leading-7 text-foreground/80 dark:text-muted-foreground">
                Junior full-stack roles, collaborative product work, AI-focused
                builds, automation ideas, and data visualization projects.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 px-6 pb-6">
              {[
                "Full-stack development",
                "AI and automation",
                "Data visualization",
                "Clean product implementation",
              ].map((item) => (
                <Badge
                  key={item}
                  variant="secondary"
                  className="rounded-full border border-black/6 bg-white/70 px-3 py-1.5 text-sm text-foreground dark:bg-white/8"
                >
                  {item}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[22px] border border-black/6 bg-white/85 py-0 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.42)]">
            <CardHeader className="px-6 pt-6">
              <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/70 text-foreground dark:bg-white/8">
                <Mail />
              </div>
              <CardTitle className="text-2xl">Contact details</CardTitle>
              <CardDescription className="text-base leading-7 text-foreground/80 dark:text-muted-foreground">
                Reach out directly through email or connect through the profiles
                below.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-6 pb-6">
              <a
                href="mailto:aidenzanic@gmail.com"
                className="flex items-center gap-3 rounded-[18px] border border-black/6 bg-white/70 px-4 py-4 text-sm text-foreground transition-colors hover:bg-white dark:bg-white/8 dark:hover:bg-white/10"
              >
                <Mail className="text-muted-foreground" />
                <span className="truncate">aidenzanic@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/aiden-zanichkowsky-9a1506379/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-[18px] border border-black/6 bg-white/70 px-4 py-4 text-sm text-foreground transition-colors hover:bg-white dark:bg-white/8 dark:hover:bg-white/10"
              >
                <LinkIcon className="text-muted-foreground" />
                <span className="truncate">linkedin.com/in/aiden-zanichkowsky-9a1506379</span>
              </a>
              <a
                href="https://github.com/aidenzanichkowsky"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-[18px] border border-black/6 bg-white/70 px-4 py-4 text-sm text-foreground transition-colors hover:bg-white dark:bg-white/8 dark:hover:bg-white/10"
              >
                <FolderGit2 className="text-muted-foreground" />
                <span className="truncate">github.com/aidenzanichkowsky</span>
              </a>
              <div className="flex items-center gap-3 rounded-[18px] border border-black/6 bg-white/70 px-4 py-4 text-sm text-foreground dark:bg-white/8">
                <Sparkles className="text-muted-foreground" />
                Open to junior full-stack roles, AI-focused builds, and
                thoughtful product collaboration.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}

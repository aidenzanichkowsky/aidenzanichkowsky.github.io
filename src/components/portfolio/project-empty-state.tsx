import Link from "next/link";
import { ArrowRight, FolderOpenDot } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProjectEmptyState() {
  return (
    <Card className="rounded-[20px] border border-black/6 bg-white/85 py-0 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.42)] backdrop-blur">
      <CardHeader className="border-b border-black/6 px-6 py-6">
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-white/70 text-foreground dark:bg-white/8">
          <FolderOpenDot />
        </div>
        <CardTitle className="text-2xl">Projects will live here</CardTitle>
        <CardDescription className="max-w-2xl text-base leading-7">
          No public project case studies have been added yet. This space is
          intentionally left clean until real work is ready to share.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 py-6 text-sm leading-7 text-muted-foreground">
        The structure is ready for real project cards, technical writeups, and
        links to live work without relying on filler content.
      </CardContent>
      <CardFooter className="justify-start gap-3 border-t border-black/6 bg-white/40 px-6 py-5 dark:bg-white/4">
        <Button asChild size="lg" className="rounded-full px-5">
          <Link href="/contact">
            <ArrowRight data-icon="inline-end" />
            Start a conversation
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="rounded-full px-5">
          <Link href="/about">Learn more about Aiden</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

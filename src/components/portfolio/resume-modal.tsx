"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText } from "lucide-react";

interface ResumeModalProps { children: React.ReactNode; }

export function ResumeModal({ children }: ResumeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl w-[95vw] h-[85vh] p-0 flex flex-col gap-0 overflow-hidden border-black/10 bg-white/95 backdrop-blur-3xl dark:border-white/10 dark:bg-black/90">
        <DialogHeader className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pr-14">
          <div className="text-left space-y-1">
            <DialogTitle className="text-lg">Application Documents</DialogTitle>
            <DialogDescription>General-purpose resume and cover letter</DialogDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm" className="rounded-full"><a href="/resume" target="_blank" rel="noopener noreferrer"><FileText className="mr-2 h-4 w-4" />Resume <ExternalLink className="ml-1 h-3 w-3" /></a></Button>
            <Button asChild size="sm" variant="outline" className="rounded-full"><a href="/cover-letter" target="_blank" rel="noopener noreferrer"><FileText className="mr-2 h-4 w-4" />Cover Letter <ExternalLink className="ml-1 h-3 w-3" /></a></Button>
          </div>
        </DialogHeader>
        <div className="flex-1 min-h-0 w-full bg-black/5 dark:bg-white/5">
          <iframe src="/resume" className="w-full h-full border-0" title="General resume preview" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

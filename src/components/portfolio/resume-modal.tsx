"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ResumeModalProps {
  children: React.ReactNode;
}

export function ResumeModal({ children }: ResumeModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl w-[95vw] h-[85vh] p-0 flex flex-col gap-0 overflow-hidden border-black/10 bg-white/95 backdrop-blur-3xl dark:border-white/10 dark:bg-black/90">
        <DialogHeader className="px-6 py-4 border-b border-black/5 dark:border-white/5 flex flex-row items-center justify-between pr-14">
          <div className="text-left space-y-1">
            <DialogTitle className="text-lg">Aiden Zanichkowsky - Resume</DialogTitle>
            <DialogDescription className="sr-only">
              PDF Preview of Aiden's Resume
            </DialogDescription>
          </div>
          <div className="flex items-center">
            <Button asChild size="sm" className="rounded-full">
              <a href="/resume.pdf" download="Aiden_Zanichkowsky_Resume.pdf" tabIndex={-1}>
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </a>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 w-full bg-black/5 dark:bg-white/5">
          <iframe 
            src="/resume.pdf" 
            className="w-full h-full border-0"
            title="Resume PDF Preview"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

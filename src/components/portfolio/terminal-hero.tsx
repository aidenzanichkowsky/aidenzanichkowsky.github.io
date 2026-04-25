import { Terminal } from "lucide-react";

export function TerminalHero() {
  return (
    <div className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-[20px] border border-white/10 bg-[#1e1e24] shadow-2xl">
      {/* Glow Effect */}
      <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-500/30 blur-[60px]" />
      <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-blue-500/30 blur-[60px]" />

      {/* Header */}
      <div className="relative flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="relative p-6 text-sm font-mono leading-relaxed text-slate-300">
        <div className="flex flex-col gap-2">
          <p>
            <span className="text-green-400">guest@aiden-dev</span>
            <span className="text-white">:</span>
            <span className="text-blue-400">~$</span> ./initialize_portfolio.sh
          </p>
          <p className="text-slate-400">Loading core modules... [DONE]</p>
          <p className="text-slate-400">Initializing AI sub-routines... [DONE]</p>
          <p className="mt-2 text-blue-300 flex items-center">
            &gt; Aiden Zanichkowsky: Full-Stack Developer & AI Enthusiast_
            <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-blue-300" />
          </p>
        </div>
      </div>
    </div>
  );
}

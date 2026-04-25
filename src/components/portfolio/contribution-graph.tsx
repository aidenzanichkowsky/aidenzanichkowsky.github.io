import { GitCommit, Star, GitFork } from "lucide-react";

export function ContributionGraph() {
  // Generate random mock contribution data (0-4 levels of contribution)
  const days = Array.from({ length: 14 * 7 }).map(() => 
    Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0
  );

  return (
    <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-[20px] border border-white/10 bg-[#161b22] shadow-2xl p-6">
      {/* Background Glow */}
      <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-indigo-500/10 blur-[80px]" />
      <div className="absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <GitCommit className="h-4 w-4 text-slate-400" />
            <span className="font-semibold text-white">1,248</span> contributions in the last year
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" /> 342 Stars
            </div>
            <div className="flex items-center gap-1">
              <GitFork className="h-3.5 w-3.5" /> 89 Forks
            </div>
          </div>
        </div>

        <div className="flex gap-[3px] overflow-x-auto pb-2 scrollbar-none">
          {Array.from({ length: 52 }).map((_, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, rowIndex) => {
                const level = days[colIndex * 7 + rowIndex] || 0;
                return (
                  <div
                    key={rowIndex}
                    className="h-[10px] w-[10px] rounded-[2px]"
                    style={{
                      backgroundColor: 
                        level === 0 ? "rgba(255,255,255,0.05)" :
                        level === 1 ? "#0e4429" :
                        level === 2 ? "#006d32" :
                        level === 3 ? "#26a641" :
                        "#39d353"
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-[3px]">
            <div className="h-[10px] w-[10px] rounded-[2px] bg-white/5" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-[#0e4429]" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-[#006d32]" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-[#26a641]" />
            <div className="h-[10px] w-[10px] rounded-[2px] bg-[#39d353]" />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

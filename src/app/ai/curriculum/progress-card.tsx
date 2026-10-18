'use client';

interface ProgressCardProps {
  totalTopics: number;
  coveredCount: number;
  totalInterview: number;
  coveredInterview: number;
  totalWritten: number;
  coveredWritten: number;
  totalPhases: number;
}

export function ProgressCard({
  totalTopics,
  coveredCount,
  totalInterview,
  coveredInterview,
  totalWritten,
  coveredWritten,
  totalPhases,
}: ProgressCardProps) {
  const pct = totalTopics > 0 ? Math.round((coveredCount / totalTopics) * 100) : 0;

  return (
    <section className="mb-6 rounded-xl border border-zinc-200 bg-white p-5 shadow-xs dark:border-zinc-800/80 dark:bg-zinc-950">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Curriculum Progress
          </span>
          <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            {pct}% Covered
          </span>
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">{coveredCount}</span>
          <span> / {totalTopics} Topics</span>
        </div>
      </div>

      <div className="mt-3.5 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-900">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-900">
        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            Interview Core
          </span>
          <span className="mt-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {coveredInterview}{' '}
            <small className="font-normal text-zinc-500 dark:text-zinc-400">
              / {totalInterview}
            </small>
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            Written Docs
          </span>
          <span className="mt-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {coveredWritten}{' '}
            <small className="font-normal text-zinc-500 dark:text-zinc-400">/ {totalWritten}</small>
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
            Curriculum Phases
          </span>
          <span className="mt-0.5 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            {totalPhases}{' '}
            <small className="font-normal text-zinc-500 dark:text-zinc-400">Phases</small>
          </span>
        </div>
      </div>
    </section>
  );
}

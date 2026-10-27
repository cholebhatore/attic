'use client';

import Link from 'next/link';
import { Check, ChevronDown, ArrowRight } from 'lucide-react';
import type { Topic } from './types';
import type { GroupStat } from './topic-tree';

interface TopicRowProps {
  topic: Topic;
  isCovered: boolean;
  onToggle: (id: string) => void;
  expandable?: boolean;
  open?: boolean;
  onToggleOpen?: (id: string) => void;
  badge?: GroupStat;
}

export function TopicRow({
  topic,
  isCovered,
  onToggle,
  expandable,
  open,
  onToggleOpen,
  badge,
}: TopicRowProps) {
  return (
    <div
      onClick={() => (expandable ? onToggleOpen?.(topic.id) : onToggle(topic.id))}
      className={`group flex items-start gap-3 rounded-lg border p-3 transition cursor-pointer select-none ${
        isCovered
          ? 'border-emerald-500/20 bg-emerald-500/5 dark:border-emerald-500/15 dark:bg-emerald-500/[0.03]'
          : 'border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/60 dark:border-zinc-800/60 dark:bg-zinc-950/40 dark:hover:border-zinc-700/60 dark:hover:bg-zinc-900/40'
      }`}
    >
      {/* Checkbox */}
      <button
        type="button"
        role="checkbox"
        aria-checked={isCovered}
        aria-label={`Mark ${topic.title} as ${isCovered ? 'uncovered' : 'covered'}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(topic.id);
        }}
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition cursor-pointer ${
          isCovered
            ? 'border-emerald-500 bg-emerald-500 text-white dark:bg-emerald-400 dark:text-zinc-950'
            : 'border-zinc-300 bg-white group-hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:group-hover:border-zinc-500'
        }`}
      >
        {isCovered && <Check className="h-3 w-3 stroke-[3]" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-xs font-medium transition ${
              isCovered
                ? 'text-zinc-500 line-through dark:text-zinc-400'
                : 'text-zinc-900 dark:text-zinc-100'
            }`}
          >
            {topic.title}
          </span>

          {badge && (
            <span
              className={`font-mono tabular-nums rounded border px-1.5 py-0.5 text-[9.5px] font-semibold ${
                badge.total > 0 && badge.covered === badge.total
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400'
              }`}
              title={`${badge.covered} of ${badge.total} topics in ${topic.title} covered`}
            >
              {badge.covered}/{badge.total}
            </span>
          )}

          {topic.interview && (
            <span className="rounded border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-amber-600 dark:text-amber-400">
              ⭐ INTERVIEW-CORE
            </span>
          )}

          {isCovered && (
            <span className="rounded border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 text-[9.5px] font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Covered
            </span>
          )}

          {(expandable || topic.url) && (
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              {expandable && (
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={open ? `topic-children-${topic.id}` : undefined}
                  aria-label={
                    open ? `Collapse ${topic.title} topics` : `Expand ${topic.title} topics`
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleOpen?.(topic.id);
                  }}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 cursor-pointer"
                >
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </button>
              )}

              {topic.url && (
                <Link
                  href={topic.url}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10.5px] font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                  title="Open documentation page"
                >
                  <span>Read</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          )}
        </div>

        {topic.desc && (
          <p className="mt-1 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
            {topic.desc}
          </p>
        )}
      </div>
    </div>
  );
}

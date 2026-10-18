'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import type { Topic } from './types';

interface TopicRowProps {
  topic: Topic;
  isCovered: boolean;
  onToggle: (id: string) => void;
}

export function TopicRow({ topic, isCovered, onToggle }: TopicRowProps) {
  return (
    <div
      onClick={() => onToggle(topic.id)}
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

          {topic.url && (
            <Link
              href={topic.url}
              onClick={(e) => e.stopPropagation()}
              className="ml-auto inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10.5px] font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              title="Open documentation page"
            >
              <span>Read</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
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

'use client';

import { Search, X } from 'lucide-react';
import type { FilterType } from './types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeFilter: FilterType;
  onFilterChange: (f: FilterType) => void;
  counts: {
    total: number;
    uncovered: number;
    covered: number;
    interview: number;
    written: number;
  };
  onExpandAll: () => void;
  onCollapseAll: () => void;
  onMarkAll: () => void;
  onResetAll: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
  counts,
  onExpandAll,
  onCollapseAll,
  onMarkAll,
  onResetAll,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-3">
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search topics (e.g. LoRA, DPO, Softmax, vLLM)..."
            className="w-full rounded-lg border border-zinc-200 bg-white py-1.5 pl-9 pr-8 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-zinc-600 dark:focus:ring-zinc-600"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              type="button"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              title="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
            <button
              onClick={onExpandAll}
              type="button"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer font-medium"
            >
              Expand All
            </button>
            <span>•</span>
            <button
              onClick={onCollapseAll}
              type="button"
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition cursor-pointer font-medium"
            >
              Collapse All
            </button>
          </div>

          <span className="text-zinc-300 dark:text-zinc-700">|</span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onMarkAll}
              type="button"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition cursor-pointer font-medium"
            >
              Mark All
            </button>
            <span className="text-zinc-500 dark:text-zinc-400">•</span>
            <button
              onClick={onResetAll}
              type="button"
              className="text-red-500/80 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition cursor-pointer font-medium"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          onClick={() => onFilterChange('all')}
          type="button"
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          All ({counts.total})
        </button>

        <button
          onClick={() => onFilterChange('uncovered')}
          type="button"
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
            activeFilter === 'uncovered'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          Uncovered ({counts.uncovered})
        </button>

        <button
          onClick={() => onFilterChange('covered')}
          type="button"
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
            activeFilter === 'covered'
              ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-black font-semibold'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          Covered ({counts.covered})
        </button>

        <button
          onClick={() => onFilterChange('interview')}
          type="button"
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
            activeFilter === 'interview'
              ? 'bg-amber-500 text-black font-semibold'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          ⭐ Interview Core ({counts.interview})
        </button>

        <button
          onClick={() => onFilterChange('written')}
          type="button"
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition cursor-pointer ${
            activeFilter === 'written'
              ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900'
          }`}
        >
          📖 Written ({counts.written})
        </button>
      </div>
    </div>
  );
}

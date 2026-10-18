'use client';

import Link from 'next/link';
import { ArrowLeft, Copy, Moon, Sun, Brain } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

interface HeaderProps {
  onCopySummary: () => void;
}

const emptySubscribe = () => () => {};

export function Header({ onCopySummary }: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="mb-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="inline-flex items-center gap-2 rounded-md border border-zinc-200 bg-zinc-100/80 px-2.5 py-1 text-xs font-semibold text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200">
          <Brain className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <span>AI Engineering Curriculum</span>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/ai"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            title="Return to documentation"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Docs</span>
          </Link>

          <button
            onClick={onCopySummary}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
            title="Copy learning progress summary in Markdown format"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>Copy Summary</span>
          </button>

          {mounted && (
            <button
              onClick={toggleTheme}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs transition hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 cursor-pointer"
              title="Toggle color theme"
              aria-label="Toggle color theme"
            >
              {resolvedTheme === 'dark' ? (
                <>
                  <Sun className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Light</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Dark</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl dark:text-zinc-50">
          AI Engineering Documentation — Curriculum Roadmap
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
          Thirteen-phase interactive syllabus covering linear algebra, PyTorch mechanics,
          transformers, frontier LLMs, fine-tuning, advanced RAG, inference optimizations, and
          autonomous agents.
        </p>
      </div>
    </header>
  );
}

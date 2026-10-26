'use client';

import { ChevronDown } from 'lucide-react';
import { TopicGroup } from './topic-group';
import type { GroupStat } from './topic-tree';
import type { Phase, TreeNode } from './types';

interface PhaseAccordionProps {
  phase: Phase;
  nodes: TreeNode[];
  groupStats: Map<string, GroupStat>;
  expandedGroups: ReadonlySet<string>;
  isExpanded: boolean;
  onToggleExpand: (phaseId: string) => void;
  onToggleGroup: (id: string) => void;
  coveredSet: Set<string>;
  onToggleTopic: (topicId: string) => void;
}

export function PhaseAccordion({
  phase,
  nodes,
  groupStats,
  expandedGroups,
  isExpanded,
  onToggleExpand,
  onToggleGroup,
  coveredSet,
  onToggleTopic,
}: PhaseAccordionProps) {
  const totalInPhase = phase.topics.length;
  const coveredInPhase = phase.topics.filter((t) => coveredSet.has(t.id)).length;
  const pct = totalInPhase > 0 ? Math.round((coveredInPhase / totalInPhase) * 100) : 0;
  const isPhaseComplete = totalInPhase > 0 && coveredInPhase === totalInPhase;

  if (nodes.length === 0) {
    return null;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-white shadow-xs transition dark:border-zinc-800/80 dark:bg-zinc-950">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={() => onToggleExpand(phase.id)}
        className="flex w-full items-start justify-between gap-4 p-4 text-left transition hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 cursor-pointer"
      >
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2 py-0.5 text-[10.5px] font-semibold tracking-wide uppercase ${
                isPhaseComplete
                  ? 'border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300'
              }`}
            >
              {phase.number}
            </span>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              {phase.title}
            </h3>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {phase.description}
          </p>
        </div>

        {/* Phase Progress & Chevron */}
        <div className="flex shrink-0 items-center gap-3 pt-0.5">
          <div className="hidden sm:flex flex-col items-end gap-1">
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              <strong className="text-zinc-900 dark:text-zinc-200">{coveredInPhase}</strong>
              <small> / {totalInPhase} covered</small>
            </span>
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-300"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <div
            className={`flex h-6 w-6 items-center justify-center rounded-md text-zinc-400 transition-transform duration-200 ${
              isExpanded ? 'rotate-180 text-zinc-900 dark:text-zinc-100' : ''
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </button>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="border-t border-zinc-100 p-3 sm:p-4 dark:border-zinc-900 bg-zinc-50/30 dark:bg-zinc-950/20">
          <div className="space-y-2">
            {nodes.map((node) => (
              <TopicGroup
                key={node.topic.id}
                node={node}
                coveredSet={coveredSet}
                expandedGroups={expandedGroups}
                groupStats={groupStats}
                onToggleTopic={onToggleTopic}
                onToggleGroup={onToggleGroup}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { Header } from './header';
import { ProgressCard } from './progress-card';
import { FilterBar } from './filter-bar';
import { PhaseAccordion } from './phase-accordion';
import { Toast } from './toast';
import { curriculumData } from './curriculum-data';
import type { FilterType } from './types';

const STORAGE_KEY = 'ai-curriculum-progress-v1';

function subscribeToStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('local-storage-update', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-update', callback);
  };
}

function getStorageSnapshot(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '[]';
  } catch {
    return '[]';
  }
}

function getServerStorageSnapshot(): string {
  return '[]';
}

function updateStorage(nextSet: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(nextSet)));
    window.dispatchEvent(new Event('local-storage-update'));
  } catch (err) {
    console.error('Failed to update localStorage', err);
  }
}

export function CurriculumView() {
  const rawProgress = useSyncExternalStore(
    subscribeToStorage,
    getStorageSnapshot,
    getServerStorageSnapshot,
  );

  const coveredSet = useMemo(() => {
    try {
      const parsed = JSON.parse(rawProgress);
      return new Set<string>(Array.isArray(parsed) ? parsed : []);
    } catch {
      return new Set<string>();
    }
  }, [rawProgress]);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // All phase IDs
  const allPhaseIds = useMemo(() => curriculumData.flatMap((g) => g.phases.map((p) => p.id)), []);

  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(() => new Set(allPhaseIds));

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  }, []);

  // Toggle single topic
  const handleToggleTopic = useCallback(
    (topicId: string) => {
      const next = new Set(coveredSet);
      if (next.has(topicId)) {
        next.delete(topicId);
      } else {
        next.add(topicId);
      }
      updateStorage(next);
    },
    [coveredSet],
  );

  // Toggle single phase
  const handleToggleExpand = useCallback((phaseId: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(phaseId)) {
        next.delete(phaseId);
      } else {
        next.add(phaseId);
      }
      return next;
    });
  }, []);

  const handleExpandAll = useCallback(() => {
    setExpandedPhases(new Set(allPhaseIds));
  }, [allPhaseIds]);

  const handleCollapseAll = useCallback(() => {
    setExpandedPhases(new Set());
  }, []);

  const handleMarkAll = useCallback(() => {
    const allTopicIds: string[] = [];
    curriculumData.forEach((g) => {
      g.phases.forEach((p) => {
        p.topics.forEach((t) => allTopicIds.push(t.id));
      });
    });
    updateStorage(new Set(allTopicIds));
    showToast('All topics marked as covered! 🎉');
  }, [showToast]);

  const handleResetAll = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all your progress?')) {
      updateStorage(new Set());
      showToast('Progress reset.');
    }
  }, [showToast]);

  // Copy Markdown Progress Summary
  const handleCopySummary = useCallback(() => {
    const totalTopics = curriculumData.reduce(
      (sum, g) => sum + g.phases.reduce((pSum, p) => pSum + p.topics.length, 0),
      0,
    );
    const coveredCount = coveredSet.size;
    const pct = totalTopics > 0 ? Math.round((coveredCount / totalTopics) * 100) : 0;

    let summary = '# AI Engineering Learning Progress Report\n\n';
    summary += `**Overall Progress:** ${coveredCount} / ${totalTopics} (${pct}%)\n\n`;

    curriculumData.forEach((g) => {
      summary += `### ${g.group}\n`;
      g.phases.forEach((p) => {
        const phaseCovered = p.topics.filter((t) => coveredSet.has(t.id)).length;
        summary += `- **${p.number}: ${p.title}** (${phaseCovered}/${p.topics.length} covered)\n`;
      });
      summary += '\n';
    });

    navigator.clipboard
      .writeText(summary)
      .then(() => {
        showToast('Markdown summary copied to clipboard! 📋');
      })
      .catch((err) => {
        console.error('Clipboard error', err);
        showToast('Could not access clipboard.');
      });
  }, [coveredSet, showToast]);

  // Aggregate Metrics
  const stats = useMemo(() => {
    let total = 0;
    let covered = 0;
    let interview = 0;
    let coveredInterview = 0;
    let written = 0;
    let coveredWritten = 0;
    let totalPhases = 0;

    curriculumData.forEach((g) => {
      totalPhases += g.phases.length;
      g.phases.forEach((p) => {
        p.topics.forEach((t) => {
          total++;
          const isCov = coveredSet.has(t.id);
          if (isCov) covered++;
          if (t.interview) {
            interview++;
            if (isCov) coveredInterview++;
          }
          if (t.status === 'written') {
            written++;
            if (isCov) coveredWritten++;
          }
        });
      });
    });

    return {
      total,
      covered,
      uncovered: Math.max(0, total - covered),
      interview,
      coveredInterview,
      written,
      coveredWritten,
      totalPhases,
    };
  }, [coveredSet]);

  // Filter & Search logic
  const query = searchQuery.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    return curriculumData
      .map((group) => {
        const filteredPhases = group.phases
          .map((phase) => {
            const matchingTopics = phase.topics.filter((t) => {
              // Filter by search query
              if (query) {
                const matchesTitle = t.title.toLowerCase().includes(query);
                const matchesDesc = t.desc.toLowerCase().includes(query);
                const matchesPhase = phase.title.toLowerCase().includes(query);
                if (!matchesTitle && !matchesDesc && !matchesPhase) return false;
              }

              // Filter by pill
              if (activeFilter === 'covered') return coveredSet.has(t.id);
              if (activeFilter === 'uncovered') return !coveredSet.has(t.id);
              if (activeFilter === 'interview') return t.interview;
              if (activeFilter === 'written') return t.status === 'written';
              return true;
            });

            return {
              phase,
              filteredTopics: matchingTopics,
            };
          })
          .filter((item) => item.filteredTopics.length > 0);

        return {
          groupName: group.group,
          phases: filteredPhases,
        };
      })
      .filter((group) => group.phases.length > 0);
  }, [query, activeFilter, coveredSet]);

  return (
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 transition-colors dark:bg-black dark:text-zinc-100">
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        <Header onCopySummary={handleCopySummary} />

        <ProgressCard
          totalTopics={stats.total}
          coveredCount={stats.covered}
          totalInterview={stats.interview}
          coveredInterview={stats.coveredInterview}
          totalWritten={stats.written}
          coveredWritten={stats.coveredWritten}
          totalPhases={stats.totalPhases}
        />

        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={{
            total: stats.total,
            uncovered: stats.uncovered,
            covered: stats.covered,
            interview: stats.interview,
            written: stats.written,
          }}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
          onMarkAll={handleMarkAll}
          onResetAll={handleResetAll}
        />

        {/* Group & Phase List */}
        <div className="space-y-8">
          {filteredGroups.length === 0 ? (
            <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400">
              No topics match your current filter or search criteria.
            </div>
          ) : (
            filteredGroups.map((group) => (
              <section key={group.groupName} className="space-y-3">
                <div className="border-b border-zinc-200 pb-1.5 dark:border-zinc-800/80">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {group.groupName}
                  </h2>
                </div>

                <div className="space-y-3">
                  {group.phases.map(({ phase, filteredTopics }) => (
                    <PhaseAccordion
                      key={phase.id}
                      phase={phase}
                      filteredTopics={filteredTopics}
                      isExpanded={expandedPhases.has(phase.id)}
                      onToggleExpand={handleToggleExpand}
                      coveredSet={coveredSet}
                      onToggleTopic={handleToggleTopic}
                    />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </main>

      <Toast message={toastMessage} />
    </div>
  );
}

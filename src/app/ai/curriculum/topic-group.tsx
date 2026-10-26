'use client';

import { TopicRow } from './topic-row';
import type { GroupStat } from './topic-tree';
import type { TreeNode } from './types';

interface TopicGroupProps {
  node: TreeNode;
  coveredSet: Set<string>;
  expandedGroups: ReadonlySet<string>;
  groupStats: Map<string, GroupStat>;
  onToggleTopic: (id: string) => void;
  onToggleGroup: (id: string) => void;
}

export function TopicGroup({
  node,
  coveredSet,
  expandedGroups,
  groupStats,
  onToggleTopic,
  onToggleGroup,
}: TopicGroupProps) {
  const hasChildren = node.children.length > 0;
  const open = node.forcedOpen || expandedGroups.has(node.topic.id);

  return (
    <div className="space-y-2">
      <TopicRow
        topic={node.topic}
        isCovered={coveredSet.has(node.topic.id)}
        onToggle={onToggleTopic}
        expandable={hasChildren}
        open={open}
        onToggleOpen={onToggleGroup}
        badge={hasChildren ? groupStats.get(node.topic.id) : undefined}
      />

      {hasChildren && open && (
        <div
          id={`topic-children-${node.topic.id}`}
          className="ml-3 space-y-2 border-l border-zinc-200/90 pl-2.5 dark:border-zinc-800/80"
        >
          {node.children.map((child) => (
            <TopicGroup
              key={child.topic.id}
              node={child}
              coveredSet={coveredSet}
              expandedGroups={expandedGroups}
              groupStats={groupStats}
              onToggleTopic={onToggleTopic}
              onToggleGroup={onToggleGroup}
            />
          ))}
        </div>
      )}
    </div>
  );
}

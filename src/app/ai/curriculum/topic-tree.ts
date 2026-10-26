import type { Phase, Topic, TreeNode } from './types';

export function phaseRootUrl(phase: Phase): string {
  return phase.folder.replace(/^content\/docs/, '').replace(/\/$/, '');
}

function dirname(url: string): string {
  const segments = url.split('/').filter(Boolean);
  if (segments.length < 2) return '';
  return `/${segments.slice(0, -1).join('/')}`;
}

/** Topics group by the folder in their url, but only where a tracked parent has 2+ children. */
export function buildTopicTree(phase: Phase): TreeNode[] {
  const root = phaseRootUrl(phase);

  const topicsByUrl = new Map<string, Topic[]>();
  for (const topic of phase.topics) {
    const bucket = topicsByUrl.get(topic.url);
    if (bucket) bucket.push(topic);
    else topicsByUrl.set(topic.url, [topic]);
  }

  const childIdsByParent = new Map<string, string[]>();
  for (const topic of phase.topics) {
    const parentUrl = dirname(topic.url);
    if (!parentUrl || parentUrl === root) continue;

    const candidates = topicsByUrl.get(parentUrl);
    // An absent parent keeps the child at top level; an ambiguous one (two rows sharing
    // a url) is left ungrouped rather than silently dropping a topic.
    if (!candidates || candidates.length !== 1) continue;

    const parent = candidates[0];
    if (!topic.url.startsWith(`${parent.url}/`)) continue;
    if (!parent.url.startsWith(`${root}/`)) continue;

    const list = childIdsByParent.get(parent.id);
    if (list) list.push(topic.id);
    else childIdsByParent.set(parent.id, [topic.id]);
  }

  const parentOfChild = new Map<string, string>();
  for (const [parentId, childIds] of childIdsByParent) {
    if (childIds.length < 2) continue;
    for (const childId of childIds) parentOfChild.set(childId, parentId);
  }

  const nodesById = new Map<string, TreeNode>();
  for (const topic of phase.topics) {
    nodesById.set(topic.id, {
      topic,
      children: [],
      ancestorTitles: [],
      totalDescendants: 0,
      matched: true,
      forcedOpen: false,
    });
  }

  const topLevel: TreeNode[] = [];
  for (const topic of phase.topics) {
    const node = nodesById.get(topic.id);
    if (!node) continue;
    const parentId = parentOfChild.get(topic.id);
    const parent = parentId ? nodesById.get(parentId) : undefined;
    if (parent) parent.children.push(node);
    else topLevel.push(node);
  }

  const annotate = (node: TreeNode, ancestors: string[]): number => {
    node.ancestorTitles = ancestors;
    let total = 0;
    for (const child of node.children) {
      total += 1 + annotate(child, [...ancestors, node.topic.title]);
    }
    node.totalDescendants = total;
    return total;
  };
  for (const node of topLevel) annotate(node, []);

  return topLevel;
}

/** A node survives when it matches or when anything below it does, so children never orphan. */
export function filterTopicTree(
  nodes: TreeNode[],
  matches: (node: TreeNode) => boolean,
): TreeNode[] {
  const walk = (list: TreeNode[]): TreeNode[] => {
    const kept: TreeNode[] = [];
    for (const node of list) {
      const children = walk(node.children);
      const matched = matches(node);
      if (matched || children.length > 0) {
        kept.push({ ...node, children, matched, forcedOpen: children.length > 0 });
      }
    }
    return kept;
  };
  return walk(nodes);
}

export function allGroupIds(nodes: TreeNode[], acc: string[] = []): string[] {
  for (const node of nodes) {
    if (node.children.length > 0) {
      acc.push(node.topic.id);
      allGroupIds(node.children, acc);
    }
  }
  return acc;
}

export function countCoveredDescendants(node: TreeNode, covered: Set<string>): number {
  let count = 0;
  for (const child of node.children) {
    if (covered.has(child.topic.id)) count += 1;
    count += countCoveredDescendants(child, covered);
  }
  return count;
}

/** Transitive descendants of each group parent, so a parent's checkbox can cascade down. */
export function collectDescendantIds(
  nodes: TreeNode[],
  acc: Map<string, string[]> = new Map(),
): Map<string, string[]> {
  const walk = (list: TreeNode[]): string[] => {
    const ids: string[] = [];
    for (const node of list) {
      const nested = walk(node.children);
      if (nested.length > 0) acc.set(node.topic.id, nested);
      ids.push(node.topic.id, ...nested);
    }
    return ids;
  };
  walk(nodes);
  return acc;
}

export interface GroupStat {
  covered: number;
  total: number;
}

/** Computed from the unfiltered tree so a search never changes what 3/9 means. */
export function collectGroupStats(
  nodes: TreeNode[],
  covered: Set<string>,
  acc: Map<string, GroupStat> = new Map(),
): Map<string, GroupStat> {
  for (const node of nodes) {
    if (node.children.length > 0) {
      acc.set(node.topic.id, {
        covered: countCoveredDescendants(node, covered),
        total: node.totalDescendants,
      });
    }
    collectGroupStats(node.children, covered, acc);
  }
  return acc;
}

/** Ancestor titles and url segments belong here: child titles lose their module prefix. */
export function topicHaystack(node: TreeNode, phaseTitle: string): string {
  const { topic, ancestorTitles } = node;
  const segments = topic.url.split('/').filter((segment) => segment && segment !== 'ai');
  return [topic.title, topic.desc, phaseTitle, ...ancestorTitles, ...segments]
    .join(' ')
    .toLowerCase();
}

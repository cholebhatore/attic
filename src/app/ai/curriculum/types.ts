export interface Topic {
  id: string;
  title: string;
  url: string;
  desc: string;
  status: 'written' | 'planned' | string;
  interview: boolean;
}

export interface Phase {
  id: string;
  number: string;
  title: string;
  description: string;
  folder: string;
  status: string;
  topics: Topic[];
}

export interface CurriculumGroup {
  group: string;
  phases: Phase[];
}

export interface TreeNode {
  topic: Topic;
  children: TreeNode[];
  ancestorTitles: string[];
  totalDescendants: number;
  /** True when this topic passes the active filter on its own. */
  matched: boolean;
  /** True when a descendant is visible, so the group has to render open. */
  forcedOpen: boolean;
}

export type FilterType = 'all' | 'uncovered' | 'covered' | 'interview' | 'written';

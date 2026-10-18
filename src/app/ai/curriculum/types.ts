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

export type FilterType = 'all' | 'uncovered' | 'covered' | 'interview' | 'written';

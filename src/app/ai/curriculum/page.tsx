import type { Metadata } from 'next';
import { CurriculumView } from './curriculum-view';

export const metadata: Metadata = {
  title: 'AI Engineering Curriculum | Attic',
  description:
    'Thirteen-phase interactive syllabus covering linear algebra, PyTorch mechanics, frontier LLMs, advanced RAG, inference, and autonomous agents.',
};

export default function AICurriculumPage() {
  return <CurriculumView />;
}

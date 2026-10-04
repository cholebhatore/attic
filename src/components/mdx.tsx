import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './mermaid';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import { Files, Folder, File } from 'fumadocs-ui/components/files';
import { Zap, ShieldCheck, Cpu, Layers, Workflow, Terminal, Database, BookOpen } from 'lucide-react';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Mermaid,
    Tabs,
    Tab,
    Steps,
    Step,
    Accordions,
    Accordion,
    Files,
    FileTree: Files,
    Folder,
    File,
    Zap,
    ShieldCheck,
    Cpu,
    Layers,
    Workflow,
    Terminal,
    Database,
    BookOpen,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}


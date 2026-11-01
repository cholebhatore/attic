import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './mermaid';
import { Tip } from './tip';
import { Callout as BaseCallout } from 'fumadocs-ui/components/callout';
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
import { Steps, Step } from 'fumadocs-ui/components/steps';
import { Accordions, Accordion } from 'fumadocs-ui/components/accordion';
import { Files, Folder, File } from 'fumadocs-ui/components/files';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import {
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Workflow,
  Terminal,
  Database,
  BookOpen,
  Cloud,
  Globe,
  Package,
  GitBranch,
  Code,
  Brain,
  Binary,
  Sparkles,
  Calculator,
  Bot,
  Boxes,
  CodeXml,
  FileCode,
  LayoutGrid,
  Link,
  ListOrdered,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react';

function getNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join('');
  if (
    typeof node === 'object' &&
    'props' in node &&
    (node.props as { children?: React.ReactNode })?.children
  ) {
    return getNodeText((node.props as { children?: React.ReactNode }).children);
  }
  return '';
}

function isMermaidCode(text: string): boolean {
  const trimmed = text.trim();
  return /^(?:flowchart(?:\s+(?:TD|TB|BT|RL|LR))?|graph(?:\s+(?:TD|TB|BT|RL|LR))?|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|quadrantChart|requirementDiagram|gitGraph|C4Context|mindmap|timeline|zenuml|sankey-beta|xychart-beta|block-beta|packet-beta|kanban|architecture-beta)\b/m.test(
    trimmed,
  );
}

function MdxImageZoom({ children, ...props }: React.ComponentProps<typeof ImageZoom>) {
  if (children || (props.width && props.height)) {
    return <ImageZoom {...props}>{children}</ImageZoom>;
  }

  return (
    <ImageZoom {...props}>
      <img {...(props as React.ImgHTMLAttributes<HTMLImageElement>)} />
    </ImageZoom>
  );
}

function Callout({ icon = false, ...props }: React.ComponentProps<typeof BaseCallout>) {
  return <BaseCallout icon={icon} {...props} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Callout,
    pre: (props) => {
      const isMermaid =
        (props as Record<string, unknown>)['data-language'] === 'mermaid' ||
        props.className?.includes('language-mermaid') ||
        (typeof props.children === 'object' &&
          props.children !== null &&
          'props' in props.children &&
          Boolean(
            (props.children.props as { className?: string })?.className?.includes(
              'language-mermaid',
            ) || (props.children.props as Record<string, unknown>)?.['data-language'] === 'mermaid',
          ));

      const chart = getNodeText(props.children);

      if (isMermaid || isMermaidCode(chart)) {
        return <Mermaid chart={chart} />;
      }

      return defaultMdxComponents.pre(props);
    },
    img: (props) => <MdxImageZoom {...(props as any)} />,
    ImageZoom: (props) => <MdxImageZoom {...(props as any)} />,
    Mermaid,
    Tip,
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
    Cloud,
    Globe,
    Package,
    GitBranch,
    Code,
    Brain,
    Binary,
    Sparkles,
    Calculator,
    Bot,
    Boxes,
    Code2: CodeXml,
    FileCode,
    LayoutGrid,
    Link,
    ListOrdered,
    RefreshCw,
    ShieldAlert,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

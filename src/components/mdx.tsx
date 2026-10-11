import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from './mermaid';
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

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
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

      if (isMermaid) {
        const chart = getNodeText(props.children);
        return <Mermaid chart={chart} />;
      }

      return defaultMdxComponents.pre(props);
    },
    img: (props) => <MdxImageZoom {...(props as any)} />,
    ImageZoom: (props) => <MdxImageZoom {...(props as any)} />,
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
    Cloud,
    Globe,
    Package,
    GitBranch,
    Code,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

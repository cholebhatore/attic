"use client";

import { use, useId, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(
  key: string,
  setPromise: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;

  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

type RenderResult =
  | { success: true; svg: string; bindFunctions?: (element: Element) => void }
  | { success: false; error: string };

function MermaidContent({
  chart,
  className = "",
}: {
  chart: string;
  className?: string;
}) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const neutralBorder = isDark ? "#52525b" : "#71717a";
  const neutralLine = isDark ? "#71717a" : "#71717a";

  const { default: mermaid } = use(
    cachePromise("mermaid", () => import("mermaid")),
  );

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "loose",
    fontFamily: "inherit",
    fontSize: 13,
    themeCSS: "margin: 0 !important;",
    theme: "base",
    look: "classic",
    flowchart: {
      padding: 8,
    },
    themeVariables: {
      useGradient: false,
      dropShadow: "none",
      darkMode: isDark,
      background: "transparent",
      fontFamily: "inherit",
      fontSize: "13px",

      // Node background & text (strictly neutral shades of black/zinc)
      primaryColor: isDark ? "#18181b" : "#ffffff",
      primaryTextColor: isDark ? "#f4f4f5" : "#18181b",
      primaryBorderColor: neutralBorder,

      secondaryColor: isDark ? "#27272a" : "#f4f4f5",
      secondaryTextColor: isDark ? "#f4f4f5" : "#18181b",
      secondaryBorderColor: neutralBorder,

      tertiaryColor: isDark ? "#18181b" : "#ffffff",
      tertiaryTextColor: isDark ? "#f4f4f5" : "#18181b",
      tertiaryBorderColor: neutralBorder,

      // Edges, lines, and arrowheads (pure neutral gray/zinc)
      lineColor: neutralLine,
      arrowheadColor: neutralLine,

      // Text colors
      textColor: isDark ? "#f4f4f5" : "#18181b",

      // Subgraphs & Clusters
      clusterBkg: isDark ? "#121214" : "#fafafa",
      clusterBorder: isDark ? "#27272a" : "#e4e4e7",
      titleColor: isDark ? "#a1a1aa" : "#52525b",

      // Edge labels
      edgeLabelBackground: isDark ? "#18181b" : "#ffffff",

      // Flowchart nodes
      nodeBorder: neutralBorder,
      nodeTextColor: isDark ? "#f4f4f5" : "#18181b",
      mainBkg: isDark ? "#18181b" : "#ffffff",

      // Sequence diagrams
      actorBkg: isDark ? "#18181b" : "#ffffff",
      actorBorder: neutralBorder,
      actorTextColor: isDark ? "#f4f4f5" : "#18181b",
      actorLineColor: neutralBorder,
      signalColor: neutralLine,
      signalTextColor: isDark ? "#f4f4f5" : "#18181b",
      labelBoxBkgColor: isDark ? "#18181b" : "#ffffff",
      labelBoxBorderColor: neutralBorder,
      labelTextColor: isDark ? "#f4f4f5" : "#18181b",
      loopTextColor: isDark ? "#f4f4f5" : "#18181b",
      noteBkgColor: isDark ? "#27272a" : "#f4f4f5",
      noteBorderColor: isDark ? "#3f3f46" : "#d4d4d8",
      noteTextColor: isDark ? "#f4f4f5" : "#18181b",
      activationBkgColor: isDark ? "#27272a" : "#e4e4e7",
      activationBorderColor: neutralBorder,

      // State & Class diagrams
      classText: isDark ? "#f4f4f5" : "#18181b",
      stateBkg: isDark ? "#18181b" : "#ffffff",
      stateLabelColor: isDark ? "#f4f4f5" : "#18181b",
    },
  });

  const result = use(
    cachePromise<RenderResult>(`${chart}-${resolvedTheme}`, async () => {
      try {
        const res = await mermaid.render(id, chart.replaceAll("\\n", "\n"));
        return {
          success: true,
          svg: res.svg,
          bindFunctions: res.bindFunctions,
        };
      } catch (err: unknown) {
        return {
          success: false,
          error: err instanceof Error ? err.message : String(err),
        };
      }
    }),
  );

  if (!result.success) {
    return (
      <div className="my-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs font-mono text-red-400">
        Mermaid Render Error: {result.error}
      </div>
    );
  }

  return (
    <div
      className={`mermaid-wrapper my-4 flex w-full justify-start overflow-x-auto rounded-lg border border-fd-border bg-fd-card/30 p-4 shadow-xs [&>svg]:m-0! [&>svg]:max-w-135 [&>svg]:w-auto [&>svg]:h-auto [&_rect]:filter-none! [&_polygon]:filter-none! [&_circle]:filter-none! [&_.node_rect]:stroke-[1.25px]! ${className}`}
      ref={(container) => {
        if (container && result.bindFunctions) {
          result.bindFunctions(container);
        }
      }}
      dangerouslySetInnerHTML={{ __html: result.svg }}
    />
  );
}

export function Mermaid({
  chart,
  children,
  className = "",
}: {
  chart?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const code = (
    typeof chart === "string"
      ? chart
      : typeof children === "string"
        ? children
        : ""
  ).trim();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient || !code) return null;

  return <MermaidContent chart={code} className={className} />;
}

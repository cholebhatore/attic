'use client';

import {
  use,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { useTheme } from 'next-themes';
import type { MermaidConfig } from 'mermaid';
import { Maximize2, Minus, Plus, Scan, X } from 'lucide-react';

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const MAX_FIT_SCALE = 2;
const SCALE_STEP = 0.25;

const cache = new Map<string, Promise<unknown>>();

function cachePromise<T>(key: string, setPromise: () => Promise<T>): Promise<T> {
  const cached = cache.get(key);
  if (cached) return cached as Promise<T>;

  const promise = setPromise();
  cache.set(key, promise);
  return promise;
}

function clampScale(value: number): number {
  const rounded = Math.round(value * 100) / 100;
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, rounded));
}

function clampFitScale(value: number): number {
  const rounded = Math.round(value * 100) / 100;
  return Math.min(MAX_FIT_SCALE, Math.max(MIN_SCALE, rounded));
}

type RenderResult =
  | { success: true; svg: string; bindFunctions?: (element: Element) => void }
  | { success: false; error: string };

function createConfig(isDark: boolean): MermaidConfig {
  const neutralBorder = isDark ? '#52525b' : '#71717a';
  const neutralLine = '#71717a';

  return {
    startOnLoad: false,
    securityLevel: 'loose',
    fontFamily: 'inherit',
    fontSize: 13,
    themeCSS: 'margin: 0 !important;',
    theme: 'base',
    look: 'classic',
    flowchart: {
      padding: 8,
    },
    themeVariables: {
      useGradient: false,
      dropShadow: 'none',
      darkMode: isDark,
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: '13px',

      // Node background & text (strictly neutral shades of black/zinc)
      primaryColor: isDark ? '#18181b' : '#ffffff',
      primaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      primaryBorderColor: neutralBorder,

      secondaryColor: isDark ? '#27272a' : '#f4f4f5',
      secondaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      secondaryBorderColor: neutralBorder,

      tertiaryColor: isDark ? '#18181b' : '#ffffff',
      tertiaryTextColor: isDark ? '#f4f4f5' : '#18181b',
      tertiaryBorderColor: neutralBorder,

      // Edges, lines, and arrowheads (pure neutral gray/zinc)
      lineColor: neutralLine,
      arrowheadColor: neutralLine,

      // Text colors
      textColor: isDark ? '#f4f4f5' : '#18181b',

      // Subgraphs & Clusters
      clusterBkg: isDark ? '#121214' : '#fafafa',
      clusterBorder: isDark ? '#27272a' : '#e4e4e7',
      titleColor: isDark ? '#a1a1aa' : '#52525b',

      // Edge labels
      edgeLabelBackground: isDark ? '#18181b' : '#ffffff',

      // Flowchart nodes
      nodeBorder: neutralBorder,
      nodeTextColor: isDark ? '#f4f4f5' : '#18181b',
      mainBkg: isDark ? '#18181b' : '#ffffff',

      // Sequence diagrams
      actorBkg: isDark ? '#18181b' : '#ffffff',
      actorBorder: neutralBorder,
      actorTextColor: isDark ? '#f4f4f5' : '#18181b',
      actorLineColor: neutralBorder,
      signalColor: neutralLine,
      signalTextColor: isDark ? '#f4f4f5' : '#18181b',
      labelBoxBkgColor: isDark ? '#18181b' : '#ffffff',
      labelBoxBorderColor: neutralBorder,
      labelTextColor: isDark ? '#f4f4f5' : '#18181b',
      loopTextColor: isDark ? '#f4f4f5' : '#18181b',
      noteBkgColor: isDark ? '#27272a' : '#f4f4f5',
      noteBorderColor: isDark ? '#3f3f46' : '#d4d4d8',
      noteTextColor: isDark ? '#f4f4f5' : '#18181b',
      activationBkgColor: isDark ? '#27272a' : '#e4e4e7',
      activationBorderColor: neutralBorder,

      // State & Class diagrams
      classText: isDark ? '#f4f4f5' : '#18181b',
      stateBkg: isDark ? '#18181b' : '#ffffff',
      stateLabelColor: isDark ? '#f4f4f5' : '#18181b',
    },
  };
}

async function renderChart(chart: string, isDark: boolean, id: string): Promise<RenderResult> {
  const { default: mermaid } = await import('mermaid');
  mermaid.initialize(createConfig(isDark));

  try {
    const res = await mermaid.render(id, chart.replaceAll('\\n', '\n'));
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
}

type Size = { w: number; h: number };
type PanAnchor = { scale: number; px: number; py: number; cx: number; cy: number };
type DragState = { x: number; y: number; left: number; top: number; pointerId: number };

/**
 * Zoom + drag-to-pan for a rendered mermaid SVG.
 *
 * The baseline size (`base`) is whatever the SVG naturally renders as inside the
 * container, measured on mount. At scale 1 mermaid's own inline sizing is restored, so
 * the diagram keeps behaving exactly like a plain responsive SVG; zooming away from 1
 * pins explicit pixel dimensions so the scroll container can pan over it.
 */
function useDiagramZoom({
  svg,
  autoFit,
  hostRef,
  scrollRef,
}: {
  svg: string;
  autoFit: boolean;
  hostRef: React.RefObject<HTMLDivElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const anchorRef = useRef<PanAnchor | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const originalStyleRef = useRef<{ width: string; height: string; maxWidth: string } | null>(null);

  const [base, setBase] = useState<Size | null>(null);
  const [scale, setScale] = useState(1);
  const [pannable, setPannable] = useState(false);
  const [panning, setPanning] = useState(false);

  // Measure the natural size of the freshly injected SVG.
  useLayoutEffect(() => {
    const svgEl = hostRef.current?.querySelector('svg');
    if (!svgEl) return;

    const rect = svgEl.getBoundingClientRect();
    const viewBox = svgEl.viewBox?.baseVal;
    const width = rect.width || viewBox?.width || 0;
    const height = rect.height || viewBox?.height || 0;
    if (!width || !height) return;

    const next = { w: width, h: height };
    setBase(next);

    // Remember mermaid's own inline sizing so scale 1 can restore it exactly.
    originalStyleRef.current = {
      width: svgEl.style.width,
      height: svgEl.style.height,
      maxWidth: svgEl.style.maxWidth,
    };

    if (autoFit) {
      const available = scrollRef.current?.clientWidth ?? width;
      setScale(clampFitScale(available / width));
    } else {
      setScale(1);
    }
  }, [svg, autoFit, hostRef, scrollRef]);

  // Apply (or clear) explicit sizing for the current scale.
  useLayoutEffect(() => {
    const svgEl = hostRef.current?.querySelector('svg');
    if (!svgEl || !base) return;

    if (scale === 1) {
      const original = originalStyleRef.current;
      svgEl.style.width = original?.width ?? '';
      svgEl.style.height = original?.height ?? '';
      svgEl.style.maxWidth = original?.maxWidth ?? '';
      return;
    }

    svgEl.style.maxWidth = 'none';
    svgEl.style.width = `${Math.round(base.w * scale)}px`;
    svgEl.style.height = `${Math.round(base.h * scale)}px`;
    svgEl.style.margin = '0';
  }, [base, scale, svg, hostRef]);

  // Track whether there is anything to pan, and keep the wheel-zoom anchor stable.
  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setPannable(el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1);

    const anchor = anchorRef.current;
    if (anchor) {
      anchorRef.current = null;
      if (anchor.scale !== scale) {
        const ratio = scale / anchor.scale;
        el.scrollLeft = anchor.px * ratio - anchor.cx;
        el.scrollTop = anchor.py * ratio - anchor.cy;
      }
    }
  }, [base, scale, svg, scrollRef]);

  // Ctrl/Cmd + wheel (and trackpad pinch, which reports itself as ctrl + wheel).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (!event.ctrlKey && !event.metaKey) return;
      event.preventDefault();

      const next = clampScale(scale * (event.deltaY < 0 ? 1.15 : 1 / 1.15));
      if (next === scale) return;

      const rect = el.getBoundingClientRect();
      const cx = event.clientX - rect.left;
      const cy = event.clientY - rect.top;
      anchorRef.current = {
        scale,
        px: cx + el.scrollLeft,
        py: cy + el.scrollTop,
        cx,
        cy,
      };
      setScale(next);
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [scale, scrollRef]);

  function zoomIn() {
    setScale((current) => clampScale(current + SCALE_STEP));
  }

  function zoomOut() {
    setScale((current) => clampScale(current - SCALE_STEP));
  }

  function resetZoom() {
    setScale(1);
  }

  function fitToWidth() {
    const el = scrollRef.current;
    if (!el || !base) return;
    const available = el.clientWidth - 2;
    if (available <= 0) return;
    setScale(clampFitScale(available / base.w));
  }

  function endPan() {
    dragRef.current = null;
    setPanning(false);
  }

  const panHandlers = {
    onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
      // Touch scrolls natively; only mouse drags pan.
      if (!pannable || event.pointerType !== 'mouse' || event.button !== 0) return;

      const el = scrollRef.current;
      if (!el) return;
      if ((event.target as Element | null)?.closest('a')) return;

      dragRef.current = {
        x: event.clientX,
        y: event.clientY,
        left: el.scrollLeft,
        top: el.scrollTop,
        pointerId: event.pointerId,
      };
      try {
        el.setPointerCapture(event.pointerId);
      } catch {
        // Pointer already released; the drag still works without capture.
      }
      setPanning(true);
      event.preventDefault();
    },
    onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
      const el = scrollRef.current;
      const drag = dragRef.current;
      if (!el || !drag) return;

      el.scrollLeft = drag.left - (event.clientX - drag.x);
      el.scrollTop = drag.top - (event.clientY - drag.y);
    },
    onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
      const el = scrollRef.current;
      if (el?.hasPointerCapture(event.pointerId)) {
        el.releasePointerCapture(event.pointerId);
      }
      endPan();
    },
    onPointerCancel() {
      endPan();
    },
  };

  return {
    scale,
    pannable,
    panning,
    zoomIn,
    zoomOut,
    resetZoom,
    fitToWidth,
    panHandlers,
  };
}

function ToolbarButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid size-7 place-items-center rounded-md border border-fd-border/70 bg-fd-background/90 text-fd-muted-foreground shadow-xs backdrop-blur-sm transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function MermaidDiagram({
  svg,
  bindFunctions,
  autoFit = false,
  scrollClassName = '',
  controlsClassName = '',
  compactControls = false,
  extraControls,
}: {
  svg: string;
  bindFunctions?: (element: Element) => void;
  autoFit?: boolean;
  scrollClassName?: string;
  controlsClassName?: string;
  compactControls?: boolean;
  extraControls?: React.ReactNode;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const zoom = useDiagramZoom({ svg, autoFit, hostRef, scrollRef });

  // Re-bind mermaid's own interactions (node clicks, tooltips) after each render.
  useLayoutEffect(() => {
    const host = hostRef.current;
    if (host && bindFunctions) bindFunctions(host);
  }, [svg, bindFunctions, hostRef]);

  const cursor = !zoom.pannable ? '' : zoom.panning ? 'cursor-grabbing' : 'cursor-grab';

  return (
    <>
      <div
        ref={scrollRef}
        className={`flex w-full overflow-auto overscroll-contain ${zoom.scale > 1 ? 'max-h-[75vh]' : ''} ${cursor} ${scrollClassName}`}
        {...zoom.panHandlers}
      >
        <div
          ref={hostRef}
          className="m-auto w-full [&>svg]:m-0! [&>svg]:max-w-135 [&>svg]:w-auto [&>svg]:h-auto [&_rect]:filter-none! [&_polygon]:filter-none! [&_circle]:filter-none! [&_.node_rect]:stroke-[1.25px]!"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      <div
        role="toolbar"
        aria-label="Diagram controls"
        className={`absolute top-2 right-2 z-10 flex items-center gap-1 rounded-lg border border-fd-border/60 bg-fd-background/80 p-1 shadow-xs backdrop-blur-sm transition-opacity duration-150 ${controlsClassName}`}
      >
        <div
          className={
            compactControls ? 'hidden items-center gap-1 sm:flex' : 'flex items-center gap-1'
          }
        >
          <ToolbarButton label="Zoom out" onClick={zoom.zoomOut} disabled={zoom.scale <= MIN_SCALE}>
            <Minus className="size-3.5" />
          </ToolbarButton>

          <button
            type="button"
            onClick={zoom.resetZoom}
            title="Reset zoom to 100%"
            aria-label={`Reset zoom (currently ${Math.round(zoom.scale * 100)} percent)`}
            className="h-7 min-w-10 rounded-md px-1.5 text-[11px] font-medium tabular-nums text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:outline-none"
          >
            {Math.round(zoom.scale * 100)}%
          </button>

          <ToolbarButton label="Zoom in" onClick={zoom.zoomIn} disabled={zoom.scale >= MAX_SCALE}>
            <Plus className="size-3.5" />
          </ToolbarButton>

          <ToolbarButton label="Fit to width" onClick={zoom.fitToWidth}>
            <Scan className="size-3.5" />
          </ToolbarButton>
        </div>

        {extraControls}
      </div>
    </>
  );
}

type DialogState =
  { status: 'loading' } | { status: 'ready'; svg: string } | { status: 'error'; error: string };

let dialogRenderCount = 0;

function MermaidDialog({
  chart,
  isDark,
  onClose,
}: {
  chart: string;
  isDark: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const titleId = useId();
  const [state, setState] = useState<DialogState>({ status: 'loading' });

  useLayoutEffect(() => {
    const el = dialogRef.current;
    if (el && !el.open) el.showModal();
  }, []);

  // Native <dialog> does not lock background scrolling in every browser.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const key = `dialog:${isDark}:${chart}`;
    const id = `mermaid-dialog-${++dialogRenderCount}`;

    cachePromise<RenderResult>(key, () => renderChart(chart, isDark, id)).then((result) => {
      if (cancelled) return;
      setState(
        result.success
          ? { status: 'ready', svg: result.svg }
          : { status: 'error', error: result.error },
      );
    });

    return () => {
      cancelled = true;
    };
  }, [chart, isDark]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
      className="not-prose fixed inset-0 m-auto max-h-[92vh] w-[92vw] max-w-6xl overflow-hidden rounded-xl border border-fd-border bg-fd-card p-0 text-fd-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm max-sm:w-[96vw]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-fd-border px-3 py-2">
        <span
          id={titleId}
          className="pl-1 text-xs font-medium tracking-wide text-fd-muted-foreground uppercase"
        >
          Diagram
        </span>
        <ToolbarButton label="Close diagram" onClick={onClose}>
          <X className="size-3.5" />
        </ToolbarButton>
      </div>

      <div className="mermaid-wrapper relative flex h-[74vh] w-full flex-col overflow-hidden p-4">
        {state.status === 'loading' && (
          <div className="grid h-full flex-1 place-items-center text-xs text-fd-muted-foreground">
            Rendering diagram…
          </div>
        )}

        {state.status === 'error' && (
          <div className="m-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 font-mono text-xs text-red-400">
            Mermaid Render Error: {state.error}
          </div>
        )}

        {state.status === 'ready' && (
          <MermaidDiagram
            svg={state.svg}
            autoFit
            scrollClassName="min-h-0 flex-1"
            controlsClassName="opacity-100"
          />
        )}
      </div>
    </dialog>
  );
}

function MermaidContent({ chart, className = '' }: { chart: string; className?: string }) {
  const rawId = useId();
  const id = `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [dialogOpen, setDialogOpen] = useState(false);

  const result = use(
    cachePromise<RenderResult>(`${chart}-${resolvedTheme}`, () => renderChart(chart, isDark, id)),
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
      className={`mermaid-wrapper group relative my-4 w-full rounded-lg border border-fd-border bg-fd-card/30 p-4 shadow-xs ${className}`}
    >
      <MermaidDiagram
        svg={result.svg}
        bindFunctions={result.bindFunctions}
        controlsClassName="opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 [@media(hover:none)]:opacity-100"
        compactControls
        extraControls={
          <ToolbarButton label="Open diagram in a larger view" onClick={() => setDialogOpen(true)}>
            <Maximize2 className="size-3.5" />
          </ToolbarButton>
        }
      />

      {dialogOpen && (
        <MermaidDialog chart={chart} isDark={isDark} onClose={() => setDialogOpen(false)} />
      )}
    </div>
  );
}

export function Mermaid({
  chart,
  children,
  className = '',
}: {
  chart?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const code = (
    typeof chart === 'string' ? chart : typeof children === 'string' ? children : ''
  ).trim();

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!isClient || !code) return null;

  return <MermaidContent chart={code} className={className} />;
}

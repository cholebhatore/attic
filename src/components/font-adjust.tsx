'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { cn } from '@/lib/cn';
import { Type, RotateCcw } from 'lucide-react';

export type FontSize = 'sm' | 'md' | 'lg';
export type LineHeight = 'compact' | 'normal' | 'relaxed';

interface ReadingSettingsState {
  size: FontSize;
  lineHeight: LineHeight;
}

const DEFAULT_SETTINGS: ReadingSettingsState = {
  size: 'md',
  lineHeight: 'normal',
};

const SIZES: { id: FontSize; label: string; tag: string }[] = [
  { id: 'sm', label: 'Small', tag: 'S' },
  { id: 'md', label: 'Default', tag: 'M' },
  { id: 'lg', label: 'Large', tag: 'L' },
];

const LINE_HEIGHTS: { id: LineHeight; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'normal', label: 'Normal' },
  { id: 'relaxed', label: 'Relaxed' },
];

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  if (typeof window !== 'undefined') {
    window.addEventListener('storage', callback);
  }
  return () => {
    listeners.delete(callback);
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', callback);
    }
  };
}

function getSnapshot(): string {
  if (typeof window === 'undefined') return 'md:normal';
  const size = localStorage.getItem('attic-font-size') || 'md';
  const lineHeight = localStorage.getItem('attic-line-height') || 'normal';
  return `${size}:${lineHeight}`;
}

function getServerSnapshot(): string {
  return 'md:normal';
}

function applyDomSettings(settings: ReadingSettingsState) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  root.dataset.fontSize = settings.size;
  root.dataset.lineHeight = settings.lineHeight;
}

export function FontAdjustPopover() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [sizeRaw, lineHeightRaw] = snapshot.split(':');

  const size = (sizeRaw as FontSize) || DEFAULT_SETTINGS.size;
  const lineHeight = (lineHeightRaw as LineHeight) || DEFAULT_SETTINGS.lineHeight;

  useEffect(() => {
    applyDomSettings({ size, lineHeight });
  }, [size, lineHeight]);

  const update = <K extends keyof ReadingSettingsState>(key: K, value: ReadingSettingsState[K]) => {
    const current = { size, lineHeight };
    const next = { ...current, [key]: value };

    const storageKey = key === 'size' ? 'attic-font-size' : 'attic-line-height';

    localStorage.setItem(storageKey, value);
    applyDomSettings(next);
    emitChange();
  };

  const reset = () => {
    localStorage.removeItem('attic-font-size');
    localStorage.removeItem('attic-line-height');
    applyDomSettings(DEFAULT_SETTINGS);
    emitChange();
  };

  const isCustomized = size !== DEFAULT_SETTINGS.size || lineHeight !== DEFAULT_SETTINGS.lineHeight;

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          buttonVariants({
            variant: 'secondary',
            size: 'sm',
          }),
          'gap-1.5 text-xs text-fd-muted-foreground hover:text-fd-foreground data-[popup-open]:bg-fd-accent data-[popup-open]:text-fd-accent-foreground',
        )}
        aria-label="Reading appearance"
      >
        <Type className="size-3.5 text-fd-muted-foreground" />
        <span>Text</span>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={6}
        className="w-64 p-3.5 flex flex-col gap-3.5 rounded-xl border border-fd-border bg-fd-popover/95 backdrop-blur-md shadow-xl text-fd-popover-foreground text-xs"
      >
        <div className="flex items-center justify-between pb-1 border-b border-fd-border/60">
          <span className="font-semibold text-fd-foreground">Reading Appearance</span>
          {isCustomized && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1 text-[11px] text-fd-muted-foreground hover:text-fd-foreground transition-colors cursor-pointer"
              title="Reset to default"
            >
              <RotateCcw className="size-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Font Size */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-fd-muted-foreground">
            <span>Size</span>
            <span className="text-[11px] text-fd-muted-foreground capitalize">
              {SIZES.find((s) => s.id === size)?.label}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-fd-muted/70 border border-fd-border/50">
            {SIZES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => update('size', s.id)}
                className={cn(
                  'py-1 text-center font-medium rounded-md transition-all cursor-pointer text-xs',
                  size === s.id
                    ? 'bg-fd-background text-fd-foreground shadow-xs font-semibold'
                    : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-background/50',
                )}
              >
                {s.tag}
              </button>
            ))}
          </div>
        </div>

        {/* Line Spacing */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-fd-muted-foreground">
            <span>Spacing</span>
            <span className="text-[11px] text-fd-muted-foreground capitalize">{lineHeight}</span>
          </div>
          <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-fd-muted/70 border border-fd-border/50">
            {LINE_HEIGHTS.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => update('lineHeight', l.id)}
                className={cn(
                  'py-1 text-center font-medium rounded-md transition-all cursor-pointer text-xs',
                  lineHeight === l.id
                    ? 'bg-fd-background text-fd-foreground shadow-xs font-semibold'
                    : 'text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-background/50',
                )}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

'use client';

import { Tooltip } from '@base-ui/react/tooltip';

export function Tip({ term, children }: { term: string; children?: React.ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        delay={150}
        render={
          <span
            tabIndex={0}
            className="cursor-default underline decoration-dotted decoration-fd-muted-foreground underline-offset-4"
          />
        }
      >
        {term}
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Positioner side="top" align="start" sideOffset={8} className="z-50 max-w-72">
          <Tooltip.Popup className="rounded-xl border bg-fd-popover/60 p-3 text-sm text-fd-popover-foreground shadow-lg backdrop-blur-lg data-open:animate-fd-popover-in data-closed:animate-fd-popover-out">
            {children}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

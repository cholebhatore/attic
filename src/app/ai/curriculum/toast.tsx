'use client';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900/95 px-4 py-2.5 text-xs font-medium text-zinc-100 shadow-2xl backdrop-blur-md transition-all">
      <span>{message}</span>
    </div>
  );
}

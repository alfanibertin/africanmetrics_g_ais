import React from 'react';
import { Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export default function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed top-24 right-5 glass-panel text-brand-text px-5 py-3.5 rounded-2xl shadow-xl z-50 flex items-center gap-3 max-w-sm border-l-4 border-l-slate-500 animate-in fade-in slide-in-from-top-4 duration-300">
      <Sparkles className="w-5 h-5 text-slate-600 shrink-0" />
      <span className="text-xs font-sans font-medium">{message}</span>
    </div>
  );
}

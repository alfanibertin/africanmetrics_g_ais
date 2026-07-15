import React from 'react';

interface DataBadgeProps {
  source: 'static' | 'live' | 'simulated';
  year?: number | string;
}

export const DataBadge: React.FC<DataBadgeProps> = ({ source, year }) => {
  let bgClass = 'bg-slate-100 text-slate-700 border-slate-300';
  let dotClass = 'bg-slate-500';
  let label = 'Static Baseline';

  if (source === 'live') {
    bgClass = 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    dotClass = 'bg-emerald-500 animate-pulse';
    label = 'Live (World Bank)';
  } else if (source === 'simulated') {
    bgClass = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    dotClass = 'bg-amber-500';
    label = 'Simulated';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono border font-medium ${bgClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      <span>{label}</span>
      {year && <span className="opacity-60">({year})</span>}
    </span>
  );
};

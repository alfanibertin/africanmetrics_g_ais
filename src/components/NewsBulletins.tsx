import React from 'react';
import { Newspaper, Sparkles, TrendingUp } from 'lucide-react';

export interface Bulletin {
  id: string;
  title: string;
  summary: string;
  impact: string;
  category: string;
}

interface NewsBulletinsProps {
  bulletins: Bulletin[];
}

export default function NewsBulletins({ bulletins }: NewsBulletinsProps) {
  if (bulletins.length === 0) {
    return (
      <div className="bg-brand-input border border-brand-border rounded-2xl p-6 text-center text-brand-dim font-sans shadow-2xs">
        <Newspaper className="w-8 h-8 mx-auto mb-2 text-brand-dim/50" />
        <p className="text-xs">No active news bulletins. Click "Update Economic Data" above to generate live economic intelligence using Gemini AI models.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4" id="ai-news-bulletins-list">
      <div className="flex items-center gap-2 mb-1.5">
        <Sparkles className="w-4 h-4 text-[#c2410c]" />
        <h4 className="text-[11px] font-bold font-mono tracking-wider text-[#c2410c] uppercase">Gemini AI Economic Intelligence bulletins</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {bulletins.map((bulletin) => (
          <div
            key={bulletin.id}
            className="bg-brand-card border border-brand-border hover:border-brand-dim/35 rounded-2xl p-5 transition-all duration-300 hover:shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 bg-[#c2410c]/10 border border-[#c2410c]/20 text-[10px] text-[#c2410c] font-mono rounded-md font-semibold">
                  {bulletin.category}
                </span>
                <span className="text-[10px] text-brand-dim font-mono">2026 Live</span>
              </div>
              <h5 className="text-xs font-bold text-brand-text font-display mb-2 leading-snug">
                {bulletin.title}
              </h5>
              <p className="text-[11px] text-brand-muted leading-relaxed mb-4">
                {bulletin.summary}
              </p>
            </div>
            <div className="mt-2 pt-3 border-t border-brand-border-muted flex items-start gap-2 text-[10px] text-brand-muted bg-brand-input p-2.5 rounded-xl">
              <TrendingUp className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#15803d] font-semibold">Policy Impact:</strong> {bulletin.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

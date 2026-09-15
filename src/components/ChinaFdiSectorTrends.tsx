import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  ArrowUpRight, 
  Compass, 
  Factory, 
  Pickaxe, 
  Zap, 
  Ship, 
  Radio, 
  Sprout, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { CHINA_FDI_SECTOR_TRENDS, ChinaFdiSectorTrend } from '../data/chinaAfricaFdiData';

interface ChinaFdiSectorTrendsProps {
  onSelectSector?: (sector: ChinaFdiSectorTrend) => void;
}

export const ChinaFdiSectorTrends: React.FC<ChinaFdiSectorTrendsProps> = ({ onSelectSector }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>(CHINA_FDI_SECTOR_TRENDS[0].id);

  const activeSector = CHINA_FDI_SECTOR_TRENDS.find(s => s.id === selectedSectorId) || CHINA_FDI_SECTOR_TRENDS[0];

  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'mining-metals':
        return <Pickaxe className="w-4 h-4 text-amber-600" />;
      case 'infrastructure-transport':
        return <Ship className="w-4 h-4 text-teal-600" />;
      case 'energy-power':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'manufacturing-industrial':
        return <Factory className="w-4 h-4 text-emerald-600" />;
      case 'telecom-digital':
        return <Radio className="w-4 h-4 text-indigo-600" />;
      case 'agriculture-services':
        return <Sprout className="w-4 h-4 text-orange-600" />;
      default:
        return <Layers className="w-4 h-4 text-teal-600" />;
    }
  };

  const getTrendBadge = (status: ChinaFdiSectorTrend['trendStatus']) => {
    switch (status) {
      case 'Rapid Expansion':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
            Rapid Expansion
          </span>
        );
      case 'Strategic Pivot':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20">
            <Compass className="w-3 h-3 text-amber-600" />
            Strategic Pivot
          </span>
        );
      case 'Industrializing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-900 border border-indigo-500/20">
            <Factory className="w-3 h-3 text-indigo-600" />
            Industrializing
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-500/10 text-slate-800 border border-slate-500/20">
            <TrendingUp className="w-3 h-3 text-slate-600" />
            Steady Growth
          </span>
        );
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-amber-600 bg-amber-500/5 shadow-md" id="china-fdi-sector-trends-card">
      {/* Header with high-level trend summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-amber-600/15 text-amber-800 rounded-2xl border border-amber-600/20 shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-500/10 text-amber-900 border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                Sector Investment Trends Summary
              </span>
              <span className="text-[10px] font-mono text-brand-dim">Johns Hopkins SAIS-CARI & MOFCOM Baseline</span>
            </div>
            <h3 className="text-xl font-bold text-brand-text font-display">
              China-Africa FDI Investment Dynamics by Sector
            </h3>
            <p className="text-xs text-brand-muted mt-0.5 max-w-2xl">
              Analysis of capital stock allocation, structural pivots from raw extractive concessions to in-country battery mineral refining, green power generation, and AfCFTA industrial parks.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/70 px-4 py-2 rounded-2xl border border-brand-border/40 shrink-0 font-mono text-xs">
          <div>
            <span className="text-[10px] text-brand-dim uppercase block">Cumulative Stock</span>
            <span className="font-bold text-base text-brand-text">$53.8 Billion</span>
          </div>
          <div className="h-8 w-px bg-brand-border/60" />
          <div>
            <span className="text-[10px] text-brand-dim uppercase block">Annual Inflow</span>
            <span className="font-bold text-base text-amber-700">+$4.60B / yr</span>
          </div>
        </div>
      </div>

      {/* Grid of Sector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CHINA_FDI_SECTOR_TRENDS.map((sector) => {
          const isSelected = selectedSectorId === sector.id;
          return (
            <div
              key={sector.id}
              onClick={() => {
                setSelectedSectorId(sector.id);
                if (onSelectSector) onSelectSector(sector);
              }}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'bg-white shadow-md border-amber-600/50 ring-2 ring-amber-500/20'
                  : 'bg-white/60 hover:bg-white hover:shadow-xs border-brand-border/60'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-100 border border-slate-200/60">
                      {getSectorIcon(sector.id)}
                    </div>
                    <span className="text-xs font-bold text-brand-text font-display leading-tight">
                      {sector.sector}
                    </span>
                  </div>
                  {getTrendBadge(sector.trendStatus)}
                </div>

                {/* Progress bar representing share */}
                <div className="space-y-1 my-3">
                  <div className="flex justify-between text-[11px] font-mono text-brand-dim">
                    <span>FDI Stock Share</span>
                    <span className="font-bold text-brand-text">{sector.sharePercentage}% (${sector.cumulativeFdiBillions}B)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${sector.sharePercentage}%`,
                        backgroundColor: sector.color
                      }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-brand-muted line-clamp-2 leading-relaxed">
                  {sector.trendDescription}
                </p>
              </div>

              <div className="pt-2 border-t border-brand-border/30 flex items-center justify-between font-mono text-[11px]">
                <span className="text-brand-dim">5-Yr CAGR:</span>
                <span className="font-bold text-emerald-700">+{sector.cagr5Year}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel for Active Sector */}
      {activeSector && (
        <div className="bg-white p-6 rounded-2xl border border-brand-border/60 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/30 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                {getSectorIcon(activeSector.id)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-text font-display">
                  {activeSector.sector} — Strategic Trend Breakdown
                </h4>
                <span className="text-[11px] font-mono text-brand-dim">
                  Driver: {activeSector.strategicDriver}
                </span>
              </div>
            </div>
            {getTrendBadge(activeSector.trendStatus)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Trend Narrative & Primary Corridor Hubs */}
            <div className="md:col-span-7 space-y-3 text-xs text-brand-muted leading-relaxed">
              <div>
                <span className="font-bold text-brand-text block mb-1">Key Trend Evolution & Policy Shift:</span>
                <p className="text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/60 font-sans">
                  {activeSector.trendDescription}
                </p>
              </div>

              <div>
                <span className="font-bold text-brand-text block mb-1">Primary Sovereign Destinations:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeSector.primaryDestinations.map((dest, i) => (
                    <span key={i} className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-lg text-[11px] font-mono font-medium">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Major Landmark Deals & Projects */}
            <div className="md:col-span-5 space-y-2">
              <span className="text-xs font-bold text-brand-text font-display block">
                Flagship FDI Concessions & Joint Ventures:
              </span>
              <ul className="space-y-1.5 text-xs text-brand-text">
                {activeSector.keyProjects.map((proj, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-[11px] leading-snug font-sans text-slate-800">{proj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

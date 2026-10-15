import React, { useState } from 'react';
import { 
  TrendingUp, 
  Layers, 
  ArrowUpRight, 
  Compass, 
  Factory, 
  Zap, 
  Ship, 
  Radio, 
  Sprout, 
  CheckCircle2, 
  ChevronRight,
  Sparkles,
  Building2,
  Landmark
} from 'lucide-react';
import { EUROPE_FDI_SECTOR_TRENDS, EuropeFdiSectorTrend } from '../data/europeAfricaFdiData';

interface EuropeFdiSectorTrendsProps {
  onSelectSector?: (sector: EuropeFdiSectorTrend) => void;
}

export const EuropeFdiSectorTrends: React.FC<EuropeFdiSectorTrendsProps> = ({ onSelectSector }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>(EUROPE_FDI_SECTOR_TRENDS[0].id);

  const activeSector = EUROPE_FDI_SECTOR_TRENDS.find(s => s.id === selectedSectorId) || EUROPE_FDI_SECTOR_TRENDS[0];

  const getSectorIcon = (id: string) => {
    switch (id) {
      case 'energy-gas-renewables':
        return <Zap className="w-4 h-4 text-sky-600" />;
      case 'financial-services':
        return <Landmark className="w-4 h-4 text-blue-600" />;
      case 'transport-logistics':
        return <Ship className="w-4 h-4 text-teal-600" />;
      case 'manufacturing-automotive':
        return <Factory className="w-4 h-4 text-amber-600" />;
      case 'telecom-digital':
        return <Radio className="w-4 h-4 text-indigo-600" />;
      case 'agrifood-pharma':
        return <Sprout className="w-4 h-4 text-emerald-600" />;
      default:
        return <Layers className="w-4 h-4 text-blue-600" />;
    }
  };

  const getTrendBadge = (status: EuropeFdiSectorTrend['trendStatus']) => {
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-500/10 text-sky-900 border border-sky-500/20">
            <Compass className="w-3 h-3 text-sky-600" />
            Strategic Pivot
          </span>
        );
      case 'Industrializing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/10 text-amber-900 border border-amber-500/20">
            <Factory className="w-3 h-3 text-amber-600" />
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
    <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-blue-600 bg-blue-500/5 shadow-md" id="europe-fdi-sector-trends-card">
      {/* Header with high-level trend summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-blue-600/15 text-blue-800 rounded-2xl border border-blue-600/20 shrink-0">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-900 border border-blue-500/20">
                <Sparkles className="w-3.5 h-3.5 text-blue-700" />
                European Sector Investment Dynamics
              </span>
              <span className="text-[10px] font-mono text-brand-dim">Eurostat & UNCTAD Baseline Analytics</span>
            </div>
            <h3 className="text-xl font-bold text-brand-text font-display">
              European Capital Allocation & Sector Trajectories in Africa
            </h3>
            <p className="text-xs text-brand-muted mt-0.5 max-w-2xl">
              Tracking $268.4 Billion in European cumulative stock across 6 macro pillars: from Mediterranean offshore gas & green hydrogen corridors to automotive nearshoring and pan-African banking.
            </p>
          </div>
        </div>

        <div className="bg-white/80 px-4 py-2.5 rounded-2xl border border-brand-border/50 text-right shrink-0">
          <span className="text-[10px] text-brand-dim uppercase tracking-wider block font-mono">Total European FDI Stock</span>
          <span className="text-lg font-bold text-blue-800 font-mono">$268.4 Billion</span>
          <span className="text-[10px] text-emerald-700 font-semibold block">+5.6% YoY Expansion</span>
        </div>
      </div>

      {/* Interactive Sector Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {EUROPE_FDI_SECTOR_TRENDS.map((sector) => {
          const isSelected = sector.id === activeSector.id;
          return (
            <button
              key={sector.id}
              onClick={() => {
                setSelectedSectorId(sector.id);
                if (onSelectSector) onSelectSector(sector);
              }}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20 ring-2 ring-blue-500/30'
                  : 'bg-white/70 hover:bg-white text-brand-text border-brand-border/60 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-brand-text'}`}>
                  {getSectorIcon(sector.id)}
                </div>
                <span className={`text-[10px] font-mono font-semibold ${isSelected ? 'text-blue-100' : 'text-brand-dim'}`}>
                  {sector.sharePercentage}%
                </span>
              </div>
              <div>
                <span className={`text-[11px] font-bold block leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-brand-text'}`}>
                  {sector.sector.split(',')[0]}
                </span>
                <span className={`text-[10px] font-mono block mt-1 ${isSelected ? 'text-blue-100' : 'text-blue-700 font-semibold'}`}>
                  ${sector.cumulativeFdiBillions}B Stock
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Sector Deep-Dive Card */}
      <div className="bg-white/90 rounded-2xl p-6 border border-brand-border/60 shadow-xs space-y-5 animate-in fade-in duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-brand-border/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100/80 rounded-xl text-blue-800">
              {getSectorIcon(activeSector.id)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="text-base font-bold text-brand-text font-display">
                  {activeSector.sector}
                </h4>
                {getTrendBadge(activeSector.trendStatus)}
              </div>
              <p className="text-xs text-brand-muted mt-0.5 font-mono">
                5-Year CAGR: <strong className="text-brand-text">+{activeSector.cagr5Year}%</strong> • 2026 Annual Flow: <strong className="text-brand-text">${activeSector.recentAnnualFlowBillions}B</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <span className="text-[10px] text-brand-dim block uppercase">Sector Stock</span>
              <span className="text-base font-bold text-blue-800">${activeSector.cumulativeFdiBillions} Billion</span>
            </div>
            <div className="text-right border-l border-brand-border/40 pl-4">
              <span className="text-[10px] text-brand-dim block uppercase">Share of EU FDI</span>
              <span className="text-base font-bold text-brand-text">{activeSector.sharePercentage}%</span>
            </div>
          </div>
        </div>

        {/* Narrative Description & Strategic Driver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200/60 space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-brand-dim tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Structural Investment Trend
            </span>
            <p className="text-brand-muted leading-relaxed">
              {activeSector.trendDescription}
            </p>
          </div>

          <div className="bg-blue-50/40 p-4 rounded-xl border border-blue-200/50 space-y-1.5">
            <span className="text-[10px] font-mono uppercase font-bold text-blue-900 tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              European Policy & Market Driver
            </span>
            <p className="text-blue-950/80 leading-relaxed">
              {activeSector.strategicDriver}
            </p>
          </div>
        </div>

        {/* Flagship Projects & Top Recipient Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2">
          <div className="lg:col-span-7 space-y-2">
            <span className="text-[11px] font-bold text-brand-text uppercase font-mono tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Flagship European Projects & Concessions
            </span>
            <ul className="space-y-1.5 text-xs text-brand-muted">
              {activeSector.keyProjects.map((project, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                  <span className="leading-snug text-brand-text">{project}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-2">
            <span className="text-[11px] font-bold text-brand-text uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-600" />
              Primary Recipient Sovereign Nations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {activeSector.primaryDestinations.map((country, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 bg-white border border-brand-border/70 rounded-xl text-xs font-semibold text-brand-text shadow-2xs flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                  {country}
                </span>
              ))}
            </div>
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/50 text-[11px] text-amber-900 mt-2">
              <strong className="font-semibold">EU Global Gateway Alignment:</strong> Targeted under the €150 Billion Africa-Europe Investment Package for clean energy, connectivity, and green industrialization.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

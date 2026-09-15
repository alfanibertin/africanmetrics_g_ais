import React from 'react';
import { Sparkles, CheckCircle2, Clock, ExternalLink, ArrowRight, Layers } from 'lucide-react';
import { HEALTH_ROADMAP_MODULES, HealthRoadmapModule } from '../../data/healthFertilityData';

interface HealthRoadmapBannerProps {
  activeModuleId: string;
  onSelectModule?: (moduleId: string) => void;
}

export const HealthRoadmapBanner: React.FC<HealthRoadmapBannerProps> = ({
  activeModuleId,
  onSelectModule,
}) => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-emerald-600" />
              Health Surveillance Pillar • Modular Ingestion Roadmap
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Progressive Health & Demographic Surveillance Architecture
          </h3>
          <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
            This specialized Health intelligence pillar is configured for gradual multi-indicator expansion. 
            Phase 1 initiates with official <strong>World Bank Fertility Rate</strong> data (<code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">SP.DYN.TFRT.IN</code>), tracking demographic momentum, childbearing patterns, and labor dependency ratios across 54 sovereign African nations.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://data.worldbank.org/indicator/SP.DYN.TFRT.IN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl border border-emerald-200/70 transition-colors shadow-2xs"
          >
            <span>World Bank SP.DYN.TFRT.IN</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
          </a>
        </div>
      </div>

      {/* Grid of Planned and Active Health Modules */}
      <div>
        <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Surveillance Indicator Pipeline (Phased Ingestion)
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {HEALTH_ROADMAP_MODULES.map((mod: HealthRoadmapModule) => {
            const isLive = mod.status === 'live';
            const isCurrent = mod.id === activeModuleId;

            return (
              <div
                key={mod.id}
                onClick={() => isLive && onSelectModule && onSelectModule(mod.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 relative ${
                  isCurrent
                    ? 'bg-emerald-50/70 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                    : isLive
                    ? 'bg-slate-50/70 border-slate-200 hover:border-emerald-300 cursor-pointer'
                    : 'bg-slate-50/40 border-slate-200/60 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white shadow-2xs">
                        <CheckCircle2 className="w-3 h-3" />
                        Live Feed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-200 text-slate-700">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {mod.phase}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                    {mod.indicatorCode}
                  </span>
                </div>

                <div className="font-bold text-xs text-slate-900 mb-1 flex items-center justify-between">
                  <span>{mod.title}</span>
                  {isCurrent && <span className="text-[10px] font-mono text-emerald-700 font-bold">Active View</span>}
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {mod.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono">Source: World Bank WDI</span>
                  <a
                    href={mod.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold inline-flex items-center gap-1"
                  >
                    Documentation <ArrowRight className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

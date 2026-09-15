import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import {
  Sparkles,
  ShieldCheck,
  FileText,
  Cpu,
  CheckCircle2,
  RefreshCw,
  Layers,
  BookOpen,
  TrendingUp,
  Coins,
  Shield,
  Truck,
  Landmark
} from 'lucide-react';

interface CategoryConfig {
  key: string;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  primarySource: string;
  badgeColor: string;
}

const CATEGORIES: CategoryConfig[] = [
  {
    key: 'sovereignty-defense',
    name: 'Sovereignty & Collective Defense',
    shortDesc: 'Liptako-Gourma Pact, mutual defense obligations, Joint Force AES, border security.',
    icon: Shield,
    primarySource: 'Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
  },
  {
    key: 'macroeconomic-monetary',
    name: 'Macroeconomic & Monetary Space',
    shortDesc: 'Gold-backed settlement mechanism, preferential trade tariffs, AES Stabilisation Fund.',
    icon: Coins,
    primarySource: 'AES_First_Head_of_State_Summit_Niamey_Declaration.pdf',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
  },
  {
    key: 'external-debt-fiscal',
    name: 'External Debt & Fiscal Profile',
    shortDesc: '$18.9B total debt structure, multilateral vs bilateral breakdown, security spending ratios.',
    icon: TrendingUp,
    primarySource: 'AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  },
  {
    key: 'infrastructure-corridors',
    name: 'Infrastructure & Transit Corridors',
    shortDesc: 'Trans-Saharan Highway alignment, AES Investment Bank, port transit access.',
    icon: Truck,
    primarySource: 'Combined Charter & Summit Declarations',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  },
  {
    key: 'government-economic-budget',
    name: 'Government Economic, Budget & Finance',
    shortDesc: 'Sovereign budget allocations, public finance management, tax revenue mobilization, fiscal policy.',
    icon: Landmark,
    primarySource: 'AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
  }
];

const INDEXED_SOURCE_FILES = [
  {
    title: 'Charter_of_the_Alliance_of_Sahel_States_Liptako_Gourma_Pact.pdf',
    type: 'Sovereign Treaty',
    date: 'Sept 16, 2023',
    scope: 'Burkina Faso, Mali, Niger'
  },
  {
    title: 'AES_First_Head_of_State_Summit_Niamey_Declaration.pdf',
    type: 'Summit Declaration',
    date: 'July 6, 2024',
    scope: 'Confederation Policy'
  },
  {
    title: 'AES_Confederation_External_Debt_and_Fiscal_Outlook.pdf',
    type: 'Macro-Fiscal Report',
    date: '2024 Financial Outlook',
    scope: 'Public External Debt'
  }
];

export const SahelDriveIntelligenceCard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryConfig>(CATEGORIES[0]);
  const [summaryText, setSummaryText] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState<boolean>(false);
  const [cachedSummaries, setCachedSummaries] = useState<Record<string, string>>({});

  // Auto-fetch summary when selected category changes
  useEffect(() => {
    fetchCategorySummary(selectedCategory);
  }, [selectedCategory.key]);

  const fetchCategorySummary = async (cat: CategoryConfig, forceRefresh = false) => {
    if (!forceRefresh && cachedSummaries[cat.key]) {
      setSummaryText(cachedSummaries[cat.key]);
      return;
    }

    setIsLoadingSummary(true);
    try {
      const res = await fetch('/api/sahel-category-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryKey: cat.key,
          categoryName: cat.name
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.summary) {
          setSummaryText(data.summary);
          setCachedSummaries(prev => ({ ...prev, [cat.key]: data.summary }));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch category summary:', err);
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <div id="sahel-intelligence-card" className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Cpu className="w-6 h-6 shrink-0" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-400 text-slate-950">
                <Sparkles className="w-3.5 h-3.5" />
                DeepSeek AI
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active Integration
              </span>
            </div>
            <h3 className="text-xl font-bold font-display tracking-tight text-white mt-1">
              Sahel Region Policy Synthesis & AI Category Summaries
            </h3>
          </div>
        </div>

        {/* RE-SYNTHESIZE BUTTON */}
        <button
          onClick={() => fetchCategorySummary(selectedCategory, true)}
          disabled={isLoadingSummary}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoadingSummary ? 'animate-spin' : ''}`} />
          <span>Synthesize Category Summary</span>
        </button>
      </div>

      {/* ARCHITECTURE NOTICE BANNER (NO DRIVE LINKS) */}
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 mb-6 backdrop-blur-xs relative z-10">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h4 className="text-sm font-semibold text-amber-300 font-mono uppercase tracking-wider">
              AI Sourced Document Summaries (DeepSeek AI Engine)
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Powered by <strong className="text-white">DeepSeek AI</strong>, this module dynamically generates structured summaries categorized by sovereign policy domain, directly derived from official indexed source PDF documents.
            </p>
          </div>
        </div>
      </div>

        {/* CATEGORIES SECTION */}
        <div className="space-y-6 relative z-10">
          {/* CATEGORY SELECTION CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {CATEGORIES.map(cat => {
              const IconComp = cat.icon;
              const isSelected = selectedCategory.key === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-slate-800 border-amber-400/80 shadow-lg ring-1 ring-amber-400/30'
                      : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl border ${cat.badgeColor}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Active Selection
                      </span>
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                      {cat.name}
                    </h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2 mt-1 leading-snug">
                      {cat.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ACTIVE CATEGORY AI SUMMARY BOX */}
          <div className="bg-slate-800/50 border border-slate-700/80 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-700/80 pb-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-base font-bold text-white font-display">
                    {selectedCategory.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Primary Sourced Tag: {selectedCategory.primarySource}
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                AI Grounded Summary
              </span>
            </div>

            {isLoadingSummary ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3 text-slate-300">
                <Sparkles className="w-7 h-7 text-amber-400 animate-spin" />
                <p className="text-xs font-mono">
                  Synthesizing category summary with DeepSeek AI...
                </p>
              </div>
            ) : (
              <div className="bg-slate-900/80 border border-slate-700/60 rounded-xl p-5 sm:p-7 shadow-inner space-y-4 text-slate-200 text-sm sm:text-base leading-relaxed">
                <Markdown
                  components={{
                    h3: ({ children }) => (
                      <h3 className="text-base sm:text-lg font-bold font-display text-amber-300 mt-5 mb-2.5 pb-1 border-b border-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-4 bg-amber-400 rounded-full inline-block" />
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-sm sm:text-base font-bold text-slate-100 mt-4 mb-2 flex items-center gap-2">
                        <span className="w-1 h-3 bg-amber-400/80 rounded-full inline-block" />
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed my-2.5">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-5 sm:pl-7 space-y-2.5 my-3 text-xs sm:text-sm text-slate-200">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-5 sm:pl-7 space-y-2.5 my-3 text-xs sm:text-sm text-slate-200">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="pl-1 leading-relaxed text-slate-200">
                        {children}
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-amber-200 font-semibold">
                        {children}
                      </strong>
                    ),
                    hr: () => (
                      <hr className="border-slate-800 my-6" />
                    )
                  }}
                >
                  {summaryText}
                </Markdown>
              </div>
            )}
          </div>
        </div>

      {/* FOOTER METADATA (NO DRIVE LINKS OR URLS) */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-mono relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Active DeepSeek AI Data Engine</span>
        </div>
        <div className="text-slate-400">
          Alliance of Sahel States (AES) Economic Intelligence Platform
        </div>
      </div>
    </div>
  );
};

export default SahelDriveIntelligenceCard;

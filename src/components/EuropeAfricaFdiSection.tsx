import React, { useState, useMemo } from 'react';
import { 
  Globe2, 
  TrendingUp, 
  Layers, 
  BarChart3, 
  Search, 
  Download, 
  ArrowUpDown, 
  Building2, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Info,
  Table,
  Database,
  CheckCircle2,
  Calendar,
  Landmark,
  Euro,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  EUROPE_FDI_SECTOR_TRENDS, 
  EUROPE_FDI_YEARLY_FLOWS, 
  EUROPE_FDI_TOP_COUNTRIES, 
  EUROPE_FDI_REGIONAL_SUMMARY,
  EUROPE_FDI_MACRO_METRICS,
  EuropeFdiSectorTrend
} from '../data/europeAfricaFdiData';
import { EuropeFdiSectorTrends } from './EuropeFdiSectorTrends';
import { EuropeanCompaniesSection } from './EuropeanCompaniesSection';

interface EuropeAfricaFdiSectionProps {
  onSwitchToChinaHub?: () => void;
}

export const EuropeAfricaFdiSection: React.FC<EuropeAfricaFdiSectionProps> = ({ onSwitchToChinaHub }) => {
  // Active view toggle: 'overview' | 'trends' | 'companies' | 'recipients' | 'dataset' | 'source'
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'trends' | 'companies' | 'recipients' | 'dataset' | 'source'>('overview');
  
  // Selected sector for filtering
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>('all');
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('');
  const [countrySortBy, setCountrySortBy] = useState<'stock' | 'name' | 'share'>('stock');
  const [countrySortAsc, setCountrySortAsc] = useState<boolean>(false);
  const [datasetSearchTerm, setDatasetSearchTerm] = useState<string>('');

  // Filtered Top Recipient Sovereign Countries
  const filteredCountries = useMemo(() => {
    let list = [...EUROPE_FDI_TOP_COUNTRIES];

    if (selectedSectorFilter !== 'all') {
      list = list.filter(c => c.topSectors.some(s => s.toLowerCase().includes(selectedSectorFilter.toLowerCase())));
    }

    if (countrySearchQuery.trim()) {
      const q = countrySearchQuery.toLowerCase();
      list = list.filter(c => 
        c.countryName.toLowerCase().includes(q) || 
        c.region.toLowerCase().includes(q) ||
        c.majorInitiatives.toLowerCase().includes(q) ||
        c.topEuropeanInvestors.some(inv => inv.toLowerCase().includes(q))
      );
    }

    list.sort((a, b) => {
      if (countrySortBy === 'name') {
        return countrySortAsc ? a.countryName.localeCompare(b.countryName) : b.countryName.localeCompare(a.countryName);
      }
      if (countrySortBy === 'share') {
        return countrySortAsc ? a.shareOfTotalPercent - b.shareOfTotalPercent : b.shareOfTotalPercent - a.shareOfTotalPercent;
      }
      return countrySortAsc ? a.fdiStockBillions - b.fdiStockBillions : b.fdiStockBillions - a.fdiStockBillions;
    });

    return list;
  }, [selectedSectorFilter, countrySearchQuery, countrySortBy, countrySortAsc]);

  // Export FDI data to CSV
  const handleExportFdiCSV = () => {
    const headers = ['Country', 'Region', 'European FDI Stock ($B)', 'Share of Total (%)', 'Global Gateway Priority', 'Top Sectors', 'Top European Origin Countries', 'Key Initiatives'];
    const rows = EUROPE_FDI_TOP_COUNTRIES.map(c => [
      `"${c.countryName}"`,
      `"${c.region}"`,
      c.fdiStockBillions,
      c.shareOfTotalPercent,
      `"${c.globalGatewayPriority}"`,
      `"${c.topSectors.join('; ')}"`,
      `"${c.topEuropeanInvestors.join('; ')}"`,
      `"${c.majorInitiatives.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Europe_Africa_FDI_Surveillance_Dataset_2026.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="europe-africa-fdi-hub">
      {/* Strategic Header & Highlights Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-blue-600 bg-blue-500/5 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-blue-600/15 text-blue-800 rounded-2xl border border-blue-600/20 shrink-0">
              <Globe2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-500/10 text-blue-900 border border-blue-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                  European Union & Team Europe Global Gateway Hub
                </span>
                <span className="text-[10px] font-mono text-brand-dim">Eurostat / UNCTAD / EIB Global Verified</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text font-display">
                Europe's Foreign Direct Investment (FDI) in Africa
              </h2>
              <p className="text-xs text-brand-muted mt-0.5 max-w-3xl">
                Comprehensive tracking of European sovereign capital, private multinational equity, green energy corridors, and industrial nearshoring across 55 African economies. Europe is Africa's largest collective source of foreign direct investment ($268.4 Billion cumulative stock).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={handleExportFdiCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-brand-text border border-brand-border shadow-2xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Export FDI Dataset</span>
            </button>
            {onSwitchToChinaHub && (
              <button
                onClick={onSwitchToChinaHub}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-800 border border-red-200 shadow-2xs transition cursor-pointer"
              >
                <span>View China FDI Hub</span>
                <ArrowRight className="w-3.5 h-3.5 text-red-700" />
              </button>
            )}
          </div>
        </div>

        {/* 4 Macro Key Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Total European FDI Stock</span>
            <div className="text-xl sm:text-2xl font-bold text-blue-900">$268.4 Billion</div>
            <span className="text-[11px] text-emerald-700 font-semibold block">+5.6% YoY Expansion</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Top Investment Sector</span>
            <div className="text-xl sm:text-2xl font-bold text-sky-800">Energy & Transition</div>
            <span className="text-[11px] text-brand-dim block">36.7% ($98.5B) of Capital</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Fastest Growing Sector</span>
            <div className="text-xl sm:text-2xl font-bold text-indigo-800">Clean Power & Hydrogen</div>
            <span className="text-[11px] text-indigo-700 font-semibold block">+18.2% 5-Yr CAGR</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Top Sovereign Destination</span>
            <div className="text-xl sm:text-2xl font-bold text-blue-950">South Africa & Egypt</div>
            <span className="text-[11px] text-brand-dim block">38.0% Combined Share</span>
          </div>
        </div>

        {/* Bilateral Comparison Intelligence Callout */}
        <div className="p-4 rounded-2xl bg-white/70 border border-blue-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="p-2 bg-blue-100 text-blue-800 rounded-xl">
              <Landmark className="w-4 h-4" />
            </span>
            <div>
              <strong className="text-brand-text font-bold">Comparative Investment Architecture: </strong>
              <span className="text-brand-muted">
                While China leads in bilateral engineering EPC debt financing and critical raw mineral smelting ($53.8B stock), European capital accounts for Africa's largest equity base ($268.4B stock) across offshore gas, automotive nearshoring, logistics terminals, and retail banking.
              </span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 font-mono text-[10px] font-bold shrink-0">
            EU Global Gateway: €150B Package
          </span>
        </div>

        {/* Sub-section Navigation Tabs */}
        <div className="border-b border-slate-200 pt-1.5">
          <nav className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar scroll-smooth" aria-label="Europe FDI Navigation Tabs">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-lg ${
                activeSubTab === 'overview'
                  ? 'bg-blue-50/90 border-t border-x border-blue-200/90 border-b-2 border-b-blue-600 text-blue-950 font-semibold shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>FDI Analytics & Trajectory</span>
              {activeSubTab === 'overview' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200 shrink-0" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('companies')}
              className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-lg ${
                activeSubTab === 'companies'
                  ? 'bg-blue-50/90 border-t border-x border-blue-200/90 border-b-2 border-b-blue-600 text-blue-950 font-semibold shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <Building2 className="w-4 h-4 text-blue-700 shrink-0" />
              <span>European Multinationals by Country</span>
              {activeSubTab === 'companies' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200 shrink-0" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('trends')}
              className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-lg ${
                activeSubTab === 'trends'
                  ? 'bg-blue-50/90 border-t border-x border-blue-200/90 border-b-2 border-b-blue-600 text-blue-950 font-semibold shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
              <span>Sector Trends Summary</span>
              {activeSubTab === 'trends' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200 shrink-0" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('recipients')}
              className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-lg ${
                activeSubTab === 'recipients'
                  ? 'bg-blue-50/90 border-t border-x border-blue-200/90 border-b-2 border-b-blue-600 text-blue-950 font-semibold shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Top Sovereign Recipients</span>
              {activeSubTab === 'recipients' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200 shrink-0" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('dataset')}
              className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-lg ${
                activeSubTab === 'dataset'
                  ? 'bg-blue-50/90 border-t border-x border-blue-200/90 border-b-2 border-b-blue-600 text-blue-950 font-semibold shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <Table className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Sector Aggregate Table</span>
              {activeSubTab === 'dataset' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200 shrink-0" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setActiveSubTab('source')}
              className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-lg ${
                activeSubTab === 'source'
                  ? 'bg-blue-50/90 border-t border-x border-blue-200/90 border-b-2 border-b-blue-600 text-blue-950 font-semibold shadow-2xs'
                  : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
              }`}
            >
              <Database className="w-4 h-4 text-indigo-700 shrink-0" />
              <span>Data Source Summary</span>
              {activeSubTab === 'source' && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-blue-200 shrink-0" aria-hidden="true" />
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* 1. SECTOR TRENDS SUMMARY COMPONENT */}
      <div className="space-y-6">
        <EuropeFdiSectorTrends />
      </div>

      {/* 2. TAB CONTENT: OVERVIEW (CHARTS & HISTORICAL FLOWS) */}
      {(activeSubTab === 'overview' || activeSubTab === 'trends') && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Multi-Year Trend Chart */}
            <div className="lg:col-span-8 glass-panel rounded-3xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/40 pb-3">
                <div>
                  <h3 className="text-base font-bold text-brand-text font-display">
                    Annual European FDI Inflows by Sector Category (2014–2026)
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Evolution of capital inflows (USD Billions/year) illustrating the rise of clean energy corridors and automotive nearshoring.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-brand-dim">
                  <Calendar className="w-3.5 h-3.5 text-blue-700" />
                  <span>2014 - 2026 Historical / Calibrated</span>
                </div>
              </div>

              <div className="h-80 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={EUROPE_FDI_YEARLY_FLOWS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0284c7" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorFinance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorLogistics" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0f766e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#0f766e" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#b45309" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#b45309" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorDigital" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" fontSize={11} />
                    <YAxis stroke="#64748b" fontSize={11} unit="$B" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px' }}
                      formatter={(val: any) => [`$${val}B`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Area type="monotone" dataKey="energyRenewablesGas" name="Energy & Transition" stackId="1" stroke="#0284c7" fill="url(#colorEnergy)" />
                    <Area type="monotone" dataKey="financialServices" name="Banking & Finance" stackId="1" stroke="#1d4ed8" fill="url(#colorFinance)" />
                    <Area type="monotone" dataKey="infrastructureLogistics" name="Ports & Logistics" stackId="1" stroke="#0f766e" fill="url(#colorLogistics)" />
                    <Area type="monotone" dataKey="manufacturingAutomotive" name="Automotive & Nearshoring" stackId="1" stroke="#b45309" fill="url(#colorAuto)" />
                    <Area type="monotone" dataKey="telecomDigital" name="Digital & Telecom" stackId="1" stroke="#4f46e5" fill="url(#colorDigital)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Leading European Source Nations Breakdown */}
            <div className="lg:col-span-4 glass-panel rounded-3xl p-6 space-y-4">
              <div className="border-b border-brand-border/40 pb-3">
                <h3 className="text-base font-bold text-brand-text font-display">
                  Top European Source Nations
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Breakdown of Europe's $268.4B African FDI stock by sovereign origin.
                </p>
              </div>

              <div className="space-y-2.5">
                {EUROPE_FDI_MACRO_METRICS.topEuropeanSourceCountries.map((item, idx) => (
                  <div key={idx} className="bg-white/80 p-2.5 rounded-xl border border-brand-border/50 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{item.flag}</span>
                      <span className="font-semibold text-brand-text">{item.country}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="font-bold text-blue-900">${item.stockBillions}B</span>
                      <span className="text-[10px] text-brand-dim ml-1.5">({item.share}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Allocation Architecture */}
          <div className="glass-panel rounded-3xl p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-border/40 pb-3">
              <div>
                <h3 className="text-base font-bold text-brand-text font-display">
                  Regional Distribution of European Capital Across Africa
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Capital stock allocation across African regional economic communities (SADC, Maghreb, ECOWAS, ECCAS, EAC).
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                Southern & North Africa Absorb 58.8%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {EUROPE_FDI_REGIONAL_SUMMARY.map((reg, idx) => (
                <div key={idx} className="bg-white/80 p-4 rounded-2xl border border-brand-border/60 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-text">{reg.region}</span>
                      <span className="text-xs font-mono font-bold text-blue-800">{reg.sharePercentage}%</span>
                    </div>
                    <div className="text-lg font-bold text-brand-text font-mono">${reg.totalStockBillions}B</div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${reg.sharePercentage * 2.5}%` }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-brand-border/40 text-[11px] space-y-1">
                    <span className="text-brand-dim block font-mono text-[10px] uppercase font-semibold">Anchor Hubs:</span>
                    <span className="text-brand-text font-medium block leading-tight">{reg.keyAnchorCountries.join(', ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: EUROPEAN COMPANIES BY COUNTRY */}
      {activeSubTab === 'companies' && (
        <div className="space-y-6">
          <EuropeanCompaniesSection />
        </div>
      )}

      {/* 4. TAB CONTENT: TOP SOVEREIGN RECIPIENTS */}
      {activeSubTab === 'recipients' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/40 pb-4">
            <div>
              <h3 className="text-base font-bold text-brand-text font-display">
                Top Sovereign Recipients of European Foreign Direct Investment
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Surveillance across recipient nations, Team Europe priority alignment, and key bilateral industrial partnerships.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-brand-dim absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by country or investor..."
                  value={countrySearchQuery}
                  onChange={(e) => setCountrySearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-brand-border/60 rounded-xl text-xs text-brand-text focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="bg-white border border-brand-border/60 rounded-xl px-2.5 py-1.5 text-xs text-brand-text focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Sectors</option>
                <option value="automotive">Automotive</option>
                <option value="gas">Gas / LNG</option>
                <option value="rail">Rail / Transit</option>
                <option value="telecom">Telecom</option>
                <option value="hydrogen">Green Hydrogen</option>
              </select>
            </div>
          </div>

          {/* Recipient Countries Table */}
          <div className="overflow-x-auto rounded-2xl border border-brand-border/60">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-slate-100/80 text-brand-dim font-mono uppercase text-[10px] tracking-wider border-b border-brand-border/50">
                <tr>
                  <th 
                    onClick={() => { setCountrySortBy('name'); setCountrySortAsc(!countrySortAsc); }}
                    className="py-3 px-4 cursor-pointer hover:text-brand-text"
                  >
                    Country / Hub
                  </th>
                  <th className="py-3 px-4">Region</th>
                  <th 
                    onClick={() => { setCountrySortBy('stock'); setCountrySortAsc(!countrySortAsc); }}
                    className="py-3 px-4 cursor-pointer hover:text-brand-text font-mono"
                  >
                    FDI Stock ($B)
                  </th>
                  <th 
                    onClick={() => { setCountrySortBy('share'); setCountrySortAsc(!countrySortAsc); }}
                    className="py-3 px-4 cursor-pointer hover:text-brand-text font-mono"
                  >
                    Share (%)
                  </th>
                  <th className="py-3 px-4">Global Gateway Tier</th>
                  <th className="py-3 px-4">Key European Investors</th>
                  <th className="py-3 px-4">Key Flagship Initiatives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/30">
                {filteredCountries.map(country => (
                  <tr key={country.countryId} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-text">
                      {country.countryName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-brand-dim text-[11px]">
                      {country.region}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-900">
                      ${country.fdiStockBillions}B
                    </td>
                    <td className="py-3.5 px-4 font-mono text-brand-text font-semibold">
                      {country.shareOfTotalPercent}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        country.globalGatewayPriority.includes('Tier 1')
                          ? 'bg-blue-50 text-blue-900 border border-blue-200'
                          : country.globalGatewayPriority.includes('Energy')
                          ? 'bg-sky-50 text-sky-900 border border-sky-200'
                          : country.globalGatewayPriority.includes('Nearshoring')
                          ? 'bg-amber-50 text-amber-900 border border-amber-200'
                          : 'bg-teal-50 text-teal-900 border border-teal-200'
                      }`}>
                        {country.globalGatewayPriority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-brand-text text-[11px]">
                      {country.topEuropeanInvestors.join(', ')}
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted text-[11px] max-w-sm">
                      {country.majorInitiatives}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: SECTOR AGGREGATE TABLE */}
      {activeSubTab === 'dataset' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-brand-border/40 pb-4">
            <div>
              <h3 className="text-base font-bold text-brand-text font-display">
                Sector Aggregate Matrix
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Cross-sector comparison of cumulative capital, recent annual flow, CAGR trajectory, and primary destinations.
              </p>
            </div>
            <button
              onClick={handleExportFdiCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-brand-border rounded-xl text-xs font-semibold text-brand-text hover:bg-slate-50 cursor-pointer self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Export Full Matrix</span>
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-border/60">
            <table className="w-full text-left text-xs bg-white">
              <thead className="bg-slate-100/80 text-brand-dim font-mono uppercase text-[10px] tracking-wider border-b border-brand-border/50">
                <tr>
                  <th className="py-3 px-4">Strategic Sector</th>
                  <th className="py-3 px-4 font-mono">Stock ($B)</th>
                  <th className="py-3 px-4 font-mono">Share (%)</th>
                  <th className="py-3 px-4 font-mono">2026 Flow ($B)</th>
                  <th className="py-3 px-4 font-mono">5-Yr CAGR</th>
                  <th className="py-3 px-4">Dynamic Status</th>
                  <th className="py-3 px-4">Primary Anchor Countries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/30">
                {EUROPE_FDI_SECTOR_TRENDS.map(sector => (
                  <tr key={sector.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-brand-text">
                      {sector.sector}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-900">
                      ${sector.cumulativeFdiBillions}B
                    </td>
                    <td className="py-3.5 px-4 font-mono text-brand-text font-semibold">
                      {sector.sharePercentage}%
                    </td>
                    <td className="py-3.5 px-4 font-mono text-emerald-800 font-semibold">
                      ${sector.recentAnnualFlowBillions}B
                    </td>
                    <td className="py-3.5 px-4 font-mono text-blue-800 font-bold">
                      +{sector.cagr5Year}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {sector.trendStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-brand-muted text-[11px]">
                      {sector.primaryDestinations.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB CONTENT: DATA SOURCE & METHODOLOGY SUMMARY */}
      {activeSubTab === 'source' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600/10 text-blue-700 rounded-xl">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-text font-display">
                  Data Source & Statistical Compilation Summary
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Methodology, surveillance coverage, and European statistical standards.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-mono font-bold rounded-xl self-start">
              Eurostat & UNCTAD Harmonized Baseline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text font-display">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Primary Source Base</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Synthesized from Eurostat Foreign Direct Investment Statistics, European Investment Bank (EIB Global), UNCTAD World Investment Report, and European Commission Global Gateway indicators.
              </p>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text font-display">
                <Globe2 className="w-4 h-4 text-sky-600" />
                <span>Scope & Geographic Reach</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Covers 55 African sovereign nations across 6 macro strategic sectors spanning 2014 through 2026, accounting for $268.4B in cumulative capital stock.
              </p>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text font-display">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Validation & Calibration</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Cross-calibrated against National Central Bank balance of payments (Banque de France, Deutsche Bundesbank, Bank of England, DNB) and bilateral EDFI concession filings.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Dataset is calibrated for macroeconomic surveillance, Global Gateway tracking, and bilateral strategic investment benchmarking.</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">Updated: Q2 2026 Baseline</span>
          </div>
        </div>
      )}

      {/* Persistent Concise Data Source Summary Footer Banner */}
      <div className="p-4 rounded-2xl bg-white/70 border border-brand-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center gap-2.5 text-brand-muted">
          <Database className="w-4 h-4 text-blue-700 shrink-0" />
          <span>
            <strong className="text-brand-text font-semibold">Data Source Summary:</strong> Aggregated from official statistical bulletins (Eurostat), UNCTAD FDI databases, European Investment Bank (EIB Global), and European Commission Team Europe disclosures (2014–2026).
          </span>
        </div>
        <button
          onClick={() => setActiveSubTab('source')}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline whitespace-nowrap cursor-pointer self-start sm:self-auto"
        >
          View Methodology
        </button>
      </div>
    </div>
  );
};

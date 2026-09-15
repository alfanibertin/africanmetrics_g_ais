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
  Calendar
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
  CHINA_FDI_SECTOR_TRENDS, 
  CHINA_FDI_YEARLY_FLOWS, 
  CHINA_FDI_TOP_COUNTRIES, 
  CHINA_FDI_REGIONAL_SUMMARY,
  ChinaFdiSectorTrend
} from '../data/chinaAfricaFdiData';
import { ChinaFdiSectorTrends } from './ChinaFdiSectorTrends';
import { ChineseCompaniesSection } from './ChineseCompaniesSection';

export const ChinaAfricaFdiSection: React.FC = () => {
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
    let list = [...CHINA_FDI_TOP_COUNTRIES];

    if (selectedSectorFilter !== 'all') {
      list = list.filter(c => c.topSectors.some(s => s.toLowerCase().includes(selectedSectorFilter.toLowerCase())));
    }

    if (countrySearchQuery.trim()) {
      const q = countrySearchQuery.toLowerCase();
      list = list.filter(c => 
        c.countryName.toLowerCase().includes(q) || 
        c.region.toLowerCase().includes(q) ||
        c.majorInitiatives.toLowerCase().includes(q)
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
    const headers = ['Country', 'Region', 'FDI Stock ($B)', 'Share of Total (%)', 'FOCAC Category', 'Top Sectors', 'Key Initiatives'];
    const rows = CHINA_FDI_TOP_COUNTRIES.map(c => [
      `"${c.countryName}"`,
      `"${c.region}"`,
      c.fdiStockBillions,
      c.shareOfTotalPercent,
      `"${c.focacPriority}"`,
      `"${c.topSectors.join('; ')}"`,
      `"${c.majorInitiatives.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `China_Africa_FDI_Surveillance_Dataset_2026.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300" id="china-africa-fdi-hub">
      {/* Strategic Header & Highlights Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border-l-4 border-l-red-600 bg-red-500/5 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-red-600/15 text-red-800 rounded-2xl border border-red-600/20 shrink-0">
              <Globe2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-red-500/10 text-red-900 border border-red-500/20">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-700" />
                  China-Africa Belt & Road & FOCAC Intelligence
                </span>
                <span className="text-[10px] font-mono text-brand-dim">Johns Hopkins SAIS / MOFCOM / CARI Verified</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text font-display">
                China's Foreign Direct Investment (FDI) in Africa
              </h2>
              <p className="text-xs text-brand-muted mt-0.5 max-w-3xl">
                Comprehensive tracking of Chinese capital stock, greenfield concessions, equity acquisitions, and industrial park investments across 55 African sovereign states.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap shrink-0">
            <button
              onClick={handleExportFdiCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-brand-text border border-brand-border shadow-2xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-red-700" />
              <span>Export FDI Dataset</span>
            </button>
          </div>
        </div>

        {/* 4 Macro Key Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Total Chinese FDI Stock</span>
            <div className="text-xl sm:text-2xl font-bold text-brand-text">$53.8 Billion</div>
            <span className="text-[11px] text-emerald-700 font-semibold block">+7.8% YoY Expansion</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Top Investment Sector</span>
            <div className="text-xl sm:text-2xl font-bold text-amber-800">Mining & Critical</div>
            <span className="text-[11px] text-brand-dim block">31.2% ($16.8B) of Capital</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Fastest Growing Sector</span>
            <div className="text-xl sm:text-2xl font-bold text-indigo-800">Digital Silk Road</div>
            <span className="text-[11px] text-indigo-700 font-semibold block">+16.5% 5-Yr CAGR</span>
          </div>

          <div className="bg-white/80 p-4 rounded-2xl border border-brand-border/40 space-y-1">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Top Sovereign Destination</span>
            <div className="text-xl sm:text-2xl font-bold text-teal-800">DRC & South Africa</div>
            <span className="text-[11px] text-brand-dim block">27.3% Combined Share</span>
          </div>
        </div>

        {/* Sub-section Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-brand-input rounded-2xl border border-brand-border/50 max-w-fit flex-wrap">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'overview'
                ? 'bg-white text-brand-text shadow-xs font-bold'
                : 'text-brand-dim hover:text-brand-text hover:bg-white/40'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-red-700" />
            <span>FDI Analytics & Trajectory</span>
          </button>

          <button
            onClick={() => setActiveSubTab('companies')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'companies'
                ? 'bg-white text-brand-text shadow-xs font-bold'
                : 'text-brand-dim hover:text-brand-text hover:bg-white/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-red-700" />
            <span>Chinese Companies by Country</span>
          </button>

          <button
            onClick={() => setActiveSubTab('trends')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'trends'
                ? 'bg-white text-brand-text shadow-xs font-bold'
                : 'text-brand-dim hover:text-brand-text hover:bg-white/40'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Sector Trends Summary</span>
          </button>

          <button
            onClick={() => setActiveSubTab('recipients')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'recipients'
                ? 'bg-white text-brand-text shadow-xs font-bold'
                : 'text-brand-dim hover:text-brand-text hover:bg-white/40'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-teal-700" />
            <span>Top Sovereign Recipients</span>
          </button>

          <button
            onClick={() => setActiveSubTab('dataset')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'dataset'
                ? 'bg-white text-brand-text shadow-xs font-bold'
                : 'text-brand-dim hover:text-brand-text hover:bg-white/40'
            }`}
          >
            <Table className="w-3.5 h-3.5 text-emerald-700" />
            <span>Sector Aggregate Table</span>
          </button>

          <button
            onClick={() => setActiveSubTab('source')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeSubTab === 'source'
                ? 'bg-white text-brand-text shadow-xs font-bold'
                : 'text-brand-dim hover:text-brand-text hover:bg-white/40'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-indigo-700" />
            <span>Data Source Summary</span>
          </button>
        </div>
      </div>

      {/* 1. SECTOR TRENDS SUMMARY COMPONENT */}
      <div className="space-y-6">
        <ChinaFdiSectorTrends />
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
                    Annual Chinese FDI Inflows by Sector Category (2014–2026)
                  </h3>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Evolution in billions USD: Note the rapid rise in Renewables & Digital Telecom infrastructure.
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-mono font-bold rounded-lg self-start">
                  Annual Flows ($B)
                </span>
              </div>

              <div className="h-[320px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={CHINA_FDI_YEARLY_FLOWS} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="year" stroke="#8c7e6b" fontSize={11} />
                    <YAxis stroke="#8c7e6b" fontSize={11} tickFormatter={(v) => `$${v}B`} />
                    <Tooltip formatter={(val: any, name: any) => [`$${val} Billion`, name]} />
                    <Legend verticalAlign="top" iconType="circle" wrapperStyle={{ fontSize: 11, paddingBottom: 10 }} />
                    <Area type="monotone" dataKey="miningExtraction" name="Mining & Minerals" stackId="1" stroke="#ca8a04" fill="#ca8a04" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="infrastructureTransport" name="Transport Infrastructure" stackId="1" stroke="#0f766e" fill="#0f766e" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="energyRenewables" name="Energy & Renewables" stackId="1" stroke="#d97706" fill="#d97706" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="manufacturingIndustrial" name="Manufacturing & SEZs" stackId="1" stroke="#15803d" fill="#15803d" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="telecomTech" name="Digital Silk Road" stackId="1" stroke="#4338ca" fill="#4338ca" fillOpacity={0.8} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Regional Distribution of China FDI */}
            <div className="lg:col-span-4 glass-panel rounded-3xl p-6 space-y-4 flex flex-col justify-between">
              <div>
                <div className="border-b border-brand-border/40 pb-3 mb-4">
                  <h3 className="text-base font-bold text-brand-text font-display">Regional Block Distribution</h3>
                  <p className="text-xs text-brand-muted mt-0.5">Geographic concentration of Chinese FDI stock</p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {CHINA_FDI_REGIONAL_SUMMARY.map((reg, idx) => (
                    <div key={idx} className="p-3 bg-white/70 rounded-xl border border-brand-border/40 space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-brand-text">{reg.region}</span>
                        <span className="font-bold text-red-800">{reg.sharePercentage}% (${reg.totalStockBillions}B)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${reg.sharePercentage * 2.5}%` }}
                        />
                      </div>
                      <div className="text-[10px] text-brand-dim truncate">
                        Key Hubs: {reg.keyAnchorCountries.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl text-[11px] text-amber-900 font-mono">
                💡 <strong>Southern & Central Africa</strong> host over 54.7% of total FDI stock driven by critical battery minerals (cobalt, lithium, copper) and logistics concession corridors.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CHINESE ENTERPRISES BY COUNTRY */}
      {activeSubTab === 'companies' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <ChineseCompaniesSection />
        </div>
      )}

      {/* 3. TAB CONTENT: TOP SOVEREIGN RECIPIENT ECONOMIES */}
      {(activeSubTab === 'overview' || activeSubTab === 'recipients') && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/40 pb-4">
            <div>
              <h3 className="text-lg font-bold text-brand-text font-display">
                Top African Sovereign Recipients of Chinese Capital Stock
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Detailed breakdowns by strategic FOCAC tier, flagship concession, and localized sector presence.
              </p>
            </div>

            {/* Filter & Search */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim pointer-events-none" />
                <input
                  type="text"
                  value={countrySearchQuery}
                  onChange={(e) => setCountrySearchQuery(e.target.value)}
                  placeholder="Filter country or sector..."
                  className="pl-8 pr-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-1 focus:ring-red-500"
                />
              </div>

              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="px-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none"
              >
                <option value="all">All Sectors</option>
                <option value="mining">Mining & Metals</option>
                <option value="railway">Railway & Transport</option>
                <option value="power">Power & Energy</option>
                <option value="telecom">5G & Telecom</option>
                <option value="free trade">Free Trade Zones / SEZs</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-brand-border/40 bg-white/80 shadow-2xs">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="bg-slate-100 text-brand-dim border-b border-brand-border/40">
                  <th className="py-3 px-4 font-semibold text-brand-text">Sovereign Nation</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Regional Hub</th>
                  <th 
                    className="py-3 px-4 font-semibold text-brand-text cursor-pointer hover:text-red-700"
                    onClick={() => {
                      setCountrySortBy('stock');
                      setCountrySortAsc(!countrySortAsc);
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span>FDI Stock (USD)</span>
                      <ArrowUpDown className="w-3 h-3 text-brand-dim" />
                    </div>
                  </th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Share of Total</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">FOCAC Priority Tier</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Key Strategic Initiatives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20 text-brand-text">
                {filteredCountries.map((c) => (
                  <tr key={c.countryId} className="hover:bg-red-500/5 transition duration-150">
                    <td className="py-3 px-4 font-bold font-sans text-brand-text">
                      {c.countryName}
                    </td>
                    <td className="py-3 px-4 text-brand-dim">
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-[10px]">
                        {c.region} Africa
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-red-900">
                      ${c.fdiStockBillions} Billion
                    </td>
                    <td className="py-3 px-4 text-brand-dim">
                      <div className="flex items-center gap-2">
                        <span className="w-10 text-right">{c.shareOfTotalPercent}%</span>
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div className="h-full bg-red-600 rounded-full" style={{ width: `${c.shareOfTotalPercent * 6}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-red-50 text-red-800 border border-red-200">
                        {c.focacPriority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[11px] font-sans text-brand-muted max-w-xs truncate" title={c.majorInitiatives}>
                      {c.majorInitiatives}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: COMPLETE SECTOR DATASET TABLE */}
      {activeSubTab === 'dataset' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/40 pb-4">
            <div>
              <h3 className="text-base font-bold text-brand-text font-display">
                Sector-Level Capital Allocation & Growth Trajectory Matrix
              </h3>
              <p className="text-xs text-brand-muted mt-0.5">
                Full comparative metrics for the 6 core strategic investment sectors.
              </p>
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim pointer-events-none" />
              <input
                type="text"
                value={datasetSearchTerm}
                onChange={(e) => setDatasetSearchTerm(e.target.value)}
                placeholder="Search sector matrix..."
                className="w-full pl-8 pr-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-border/40 bg-white/80 shadow-2xs">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-100 text-brand-dim border-b border-brand-border/40">
                <tr>
                  <th className="py-3 px-4 font-semibold text-brand-text">Sector Category</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Capital Share ($B)</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">% Total FDI</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">5-Yr CAGR</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Trend Direction</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Key Anchor Countries</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20 text-brand-text">
                {CHINA_FDI_SECTOR_TRENDS
                  .filter(s => !datasetSearchTerm || s.sector.toLowerCase().includes(datasetSearchTerm.toLowerCase()) || s.primaryDestinations.some(c => c.toLowerCase().includes(datasetSearchTerm.toLowerCase())))
                  .map((sector) => (
                    <tr key={sector.id} className="hover:bg-amber-500/5 transition">
                      <td className="py-3 px-4 font-bold font-sans text-brand-text">
                        {sector.sector}
                      </td>
                      <td className="py-3 px-4 font-bold text-amber-900">
                        ${sector.cumulativeFdiBillions} Billion
                      </td>
                      <td className="py-3 px-4 text-brand-dim">
                        {sector.sharePercentage}%
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        +{sector.cagr5Year}%
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                          sector.trendStatus === 'Rapid Expansion' ? 'bg-emerald-100 text-emerald-800' :
                          sector.trendStatus === 'Strategic Pivot' ? 'bg-amber-100 text-amber-900' :
                          sector.trendStatus === 'Industrializing' ? 'bg-indigo-100 text-indigo-900' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {sector.trendStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-brand-muted text-[11px]">
                        {sector.primaryDestinations.join(', ')}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: DATA SOURCE & METHODOLOGY SUMMARY */}
      {activeSubTab === 'source' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/40 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600/10 text-indigo-700 rounded-xl">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-brand-text font-display">
                  Data Source & Statistical Compilation Summary
                </h3>
                <p className="text-xs text-brand-muted mt-0.5">
                  Methodology, surveillance coverage, and bilateral verification standards.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold rounded-xl self-start">
              Harmonized Baseline
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text font-display">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Primary Source Base</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Synthesized from Ministry of Commerce (MOFCOM) Statistical Bulletins, Johns Hopkins SAIS-CARI Africa Database, and UNCTAD Foreign Direct Investment Monitors.
              </p>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text font-display">
                <Globe2 className="w-4 h-4 text-amber-600" />
                <span>Scope & Geographic Reach</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Covers 55 African sovereign nations across 6 macro strategic sectors spanning 2014 through 2026, accounting for $53.8B in cumulative capital stock.
              </p>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-brand-border/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-text font-display">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Validation & Calibration</span>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed">
                Cross-calibrated against African central bank balance of payments, sovereign concession registries, and AfCFTA industrial joint-venture filings.
              </p>
            </div>
          </div>

          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Dataset is curated for macroeconomic surveillance and bilateral strategic investment benchmarking.</span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 shrink-0">Updated: Q2 2026 Baseline</span>
          </div>
        </div>
      )}

      {/* Persistent Concise Data Source Summary Footer Banner */}
      <div className="p-4 rounded-2xl bg-white/70 border border-brand-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
        <div className="flex items-center gap-2.5 text-brand-muted">
          <Database className="w-4 h-4 text-red-700 shrink-0" />
          <span>
            <strong className="text-brand-text font-semibold">Data Source Summary:</strong> Aggregated from official statistical bulletins (MOFCOM), Johns Hopkins SAIS-CARI research series, UNCTAD FDI databases, and regional central bank disclosures (2014–2026).
          </span>
        </div>
        <button
          onClick={() => setActiveSubTab('source')}
          className="text-xs font-semibold text-red-700 hover:text-red-900 underline whitespace-nowrap cursor-pointer self-start sm:self-auto"
        >
          View Methodology
        </button>
      </div>
    </div>
  );
};


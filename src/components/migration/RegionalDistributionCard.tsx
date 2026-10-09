import React, { useState, useMemo } from 'react';
import {
  AFRICAN_REGIONAL_DISTRIBUTION_PROFILES,
  MACRO_REGIONAL_COMPARISON,
  RegionalDistributionProfile,
  RegionalHotspotItem,
} from '../../data/migrationData';
import {
  BarChart3,
  Layers,
  ArrowRightLeft,
  Compass,
  Globe,
  DollarSign,
  TrendingUp,
  Info,
  SlidersHorizontal,
  ShieldCheck,
  Check,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
} from 'recharts';

interface RegionalDistributionCardProps {
  initialRegionId?: string;
  onExploreCorridor?: (destinationName: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Intra-African Hub': '#0d9488', // Teal
  Europe: '#2563eb', // Blue
  'Middle East / GCC': '#d97706', // Amber
  'North America': '#7c3aed', // Purple
  Other: '#64748b', // Slate
};

export const RegionalDistributionCard: React.FC<RegionalDistributionCardProps> = ({
  initialRegionId = 'north-africa',
  onExploreCorridor,
}) => {
  const [viewMode, setViewMode] = useState<'macro-comparison' | 'regional-hotspots'>('macro-comparison');
  const [selectedRegionId, setSelectedRegionId] = useState<string>(initialRegionId);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'volume' | 'share'>('volume');
  const [expandedHotspot, setExpandedHotspot] = useState<string | null>(null);

  // Active region data
  const activeRegion: RegionalDistributionProfile = useMemo(() => {
    return (
      AFRICAN_REGIONAL_DISTRIBUTION_PROFILES.find(r => r.id === selectedRegionId) ||
      AFRICAN_REGIONAL_DISTRIBUTION_PROFILES[0]
    );
  }, [selectedRegionId]);

  // Filtered & sorted hotspots
  const filteredHotspots: RegionalHotspotItem[] = useMemo(() => {
    let list = [...activeRegion.topHotspots];
    if (categoryFilter !== 'all') {
      list = list.filter(h => h.category === categoryFilter);
    }
    list.sort((a, b) => {
      if (sortBy === 'volume') {
        return b.migrantStockThousands - a.migrantStockThousands;
      }
      return b.sharePercent - a.sharePercent;
    });
    return list;
  }, [activeRegion, categoryFilter, sortBy]);

  // Recharts data for regional hotspots
  const hotspotChartData = useMemo(() => {
    return filteredHotspots.slice(0, 8).map(h => ({
      name: h.destination.split(' ')[0],
      fullName: h.destination,
      flag: h.flag,
      migrantsK: h.migrantStockThousands,
      migrantsM: Number((h.migrantStockThousands / 1000).toFixed(2)),
      sharePercent: h.sharePercent,
      category: h.category,
      fill: CATEGORY_COLORS[h.category] || '#0d9488',
    }));
  }, [filteredHotspots]);

  // Recharts data for Macro Comparison (North Africa vs Sub-Saharan Africa)
  const macroChartData = useMemo(() => {
    return MACRO_REGIONAL_COMPARISON.map(item => ({
      category: item.destinationCategory.split(' ')[0],
      fullCategory: item.destinationCategory,
      northAfricaShare: item.northAfricaSharePercent,
      northAfricaMigrants: item.northAfricaMigrantsM,
      subSaharanShare: item.subSaharanSharePercent,
      subSaharanMigrants: item.subSaharanMigrantsM,
      contrastInsight: item.contrastInsight,
    }));
  }, []);

  const northAfricaProfile = AFRICAN_REGIONAL_DISTRIBUTION_PROFILES.find(r => r.id === 'north-africa');
  const subSaharanProfile = AFRICAN_REGIONAL_DISTRIBUTION_PROFILES.find(r => r.id === 'sub-saharan');

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border-b border-slate-100 pb-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-teal-700">
            <span className="font-semibold uppercase tracking-wider">IOM World Migration Report Special Module</span>
            <span aria-hidden="true">·</span>
            <span>UN DESA Bilateral Matrix</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-teal-600 shrink-0" />
            <span>Migration Destination Hotspots by African Region</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Breakdown of where emigrants from <strong className="text-slate-900 font-semibold">North Africa</strong> vs{' '}
            <strong className="text-slate-900 font-semibold">Sub-Saharan Africa</strong> and regional economic blocs settle, contrasting intra-continental mobility with extra-continental corridors.
          </p>
        </div>

        {/* PRIMARY VIEW MODE SWITCHER */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl shrink-0 self-start lg:self-center">
          <button
            onClick={() => setViewMode('macro-comparison')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              viewMode === 'macro-comparison'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-teal-600" />
            <span>North vs Sub-Saharan Africa</span>
          </button>
          <button
            onClick={() => setViewMode('regional-hotspots')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
              viewMode === 'regional-hotspots'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-teal-600" />
            <span>Regional Hotspots Explorer</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: MACRO COMPARISON (NORTH AFRICA VS SUB-SAHARAN AFRICA) */}
      {viewMode === 'macro-comparison' && (
        <div className="space-y-6">
          {/* COMPARATIVE KPI HERO CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* North Africa Profile Card */}
            <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                    Regional Bloc
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    North Africa (Maghreb & Nile Basin)
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-blue-100/70 text-blue-800 text-xs font-mono font-bold rounded-lg">
                  9.1M Emigrants
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200/70 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Intra-African</span>
                  <span className="font-bold text-slate-800 font-mono tabular-nums">
                    {northAfricaProfile?.intraAfricanSharePercent}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">1.0M people</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Extra-Continental</span>
                  <span className="font-bold text-blue-700 font-mono tabular-nums">
                    {northAfricaProfile?.extraContinentalSharePercent}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">8.1M people</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Remittances</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    ${northAfricaProfile?.annualRemittancesUSD_B}B
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Annual Inflows</span>
                </div>
              </div>

              {/* Progress bar split */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                  <span>Intra-Africa (10.9%)</span>
                  <span>Extra-Continental (89.1%)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-teal-600 h-full" style={{ width: '10.9%' }} title="Intra-African: 10.9%" />
                  <div className="bg-blue-600 h-full" style={{ width: '89.1%' }} title="Extra-Continental: 89.1%" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Overwhelmingly extra-continental: 89% live outside Africa, anchored by France, Saudi Arabia, Spain, Italy, and UAE.
              </p>
            </div>

            {/* Sub-Saharan Africa Profile Card */}
            <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                    Regional Bloc
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    Sub-Saharan Africa (West, East, Southern, Central)
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-teal-100/70 text-teal-800 text-xs font-mono font-bold rounded-lg">
                  31.3M Emigrants
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-200/70 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Intra-African</span>
                  <span className="font-bold text-teal-700 font-mono tabular-nums">
                    {subSaharanProfile?.intraAfricanSharePercent}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">20.1M people</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Extra-Continental</span>
                  <span className="font-bold text-slate-800 font-mono tabular-nums">
                    {subSaharanProfile?.extraContinentalSharePercent}%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">11.2M people</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase font-mono">Remittances</span>
                  <span className="font-bold text-slate-900 font-mono tabular-nums">
                    ${subSaharanProfile?.annualRemittancesUSD_B}B
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Annual Inflows</span>
                </div>
              </div>

              {/* Progress bar split */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mb-1">
                  <span>Intra-Africa (64.2%)</span>
                  <span>Extra-Continental (35.8%)</span>
                </div>
                <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-teal-600 h-full" style={{ width: '64.2%' }} title="Intra-African: 64.2%" />
                  <div className="bg-blue-600 h-full" style={{ width: '35.8%' }} title="Extra-Continental: 35.8%" />
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Predominantly intra-continental: 64.2% reside in neighboring African nations under ECOWAS, SADC, and EAC free-movement treaties.
              </p>
            </div>
          </div>

          {/* STYLIZED COMPARATIVE BAR CHART */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                  <span>Destination Share Comparison: North Africa vs Sub-Saharan Africa (%)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Percentage of each region's total emigrant stock distributed across global destination zones.
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-sm bg-blue-600 inline-block" />
                  North Africa
                </span>
                <span className="flex items-center gap-1.5 text-slate-700">
                  <span className="w-3 h-3 rounded-sm bg-teal-600 inline-block" />
                  Sub-Saharan Africa
                </span>
              </div>
            </div>

            <div className="h-72 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={macroChartData}
                  margin={{ top: 15, right: 15, left: -15, bottom: 25 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 11, fill: '#475569' }}
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#475569' }}
                    tickLine={false}
                    axisLine={false}
                    unit="%"
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-lg border border-slate-800 text-xs space-y-2 max-w-xs">
                            <p className="font-bold text-slate-100">{data.fullCategory}</p>
                            <div className="space-y-1 font-mono">
                              <p className="text-blue-300">
                                North Africa: <span className="font-bold">{data.northAfricaShare}%</span> ({data.northAfricaMigrants}M)
                              </p>
                              <p className="text-teal-300">
                                Sub-Saharan: <span className="font-bold">{data.subSaharanShare}%</span> ({data.subSaharanMigrants}M)
                              </p>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-tight border-t border-slate-700/60 pt-1.5 font-sans">
                              {data.contrastInsight}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="northAfricaShare"
                    name="North Africa"
                    fill="#2563eb"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                  <Bar
                    dataKey="subSaharanShare"
                    name="Sub-Saharan Africa"
                    fill="#0d9488"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* STRUCTURAL CONTRAST INSIGHTS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
              {MACRO_REGIONAL_COMPARISON.slice(0, 3).map((item) => (
                <div key={item.destinationCategory} className="p-3 bg-white rounded-xl border border-slate-200/70 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 truncate">{item.destinationCategory}</span>
                    <span className="font-mono text-[11px] text-slate-500">
                      NA: {item.northAfricaSharePercent}% | SSA: {item.subSaharanSharePercent}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.contrastInsight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: REGIONAL HOTSPOTS EXPLORER */}
      {viewMode === 'regional-hotspots' && (
        <div className="space-y-6">
          {/* REGION SELECTION TABS */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Select African Origin Region:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {AFRICAN_REGIONAL_DISTRIBUTION_PROFILES.map((region) => (
                <button
                  key={region.id}
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedRegionId === region.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {region.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* ACTIVE REGION SUMMARY BANNER */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span>{activeRegion.subTitle}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  {activeRegion.regionName} — Destination Hotspots Breakdown
                </h3>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Emigrant Stock</span>
                  <span className="text-base font-extrabold text-slate-900 font-mono tabular-nums">
                    {activeRegion.totalEmigrantsMillion}M
                  </span>
                </div>
                <div className="text-right border-l border-slate-200 pl-3">
                  <span className="text-[10px] text-slate-500 uppercase font-mono block">Remittances</span>
                  <span className="text-base font-extrabold text-teal-700 font-mono tabular-nums">
                    ${activeRegion.annualRemittancesUSD_B}B
                  </span>
                </div>
              </div>
            </div>

            {/* Intra vs Extra Share Progress Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-teal-800 font-semibold">
                  Intra-African: {activeRegion.intraAfricanSharePercent}%
                </span>
                <span className="text-blue-800 font-semibold">
                  Extra-Continental: {activeRegion.extraContinentalSharePercent}%
                </span>
              </div>
              <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-teal-600 h-full transition-all duration-500"
                  style={{ width: `${activeRegion.intraAfricanSharePercent}%` }}
                />
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${activeRegion.extraContinentalSharePercent}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {activeRegion.keyPolicyDynamic}
            </p>
          </div>

          {/* CONTROLS BAR: CATEGORY FILTER & SORTING */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 mr-1 flex items-center gap-1 font-mono">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter:
              </span>
              {['all', 'Intra-African Hub', 'Europe', 'Middle East / GCC', 'North America'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'All Hotspots' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <span className="text-xs text-slate-500 font-mono">Sort:</span>
              <div className="flex p-0.5 bg-slate-100 rounded-md">
                <button
                  onClick={() => setSortBy('volume')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    sortBy === 'volume' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  By Volume
                </button>
                <button
                  onClick={() => setSortBy('share')}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors cursor-pointer ${
                    sortBy === 'share' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  By Share %
                </button>
              </div>
            </div>
          </div>

          {/* HOTSPOTS VISUALIZATION: STYLIZED BAR CHART + INTERACTIVE BARS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Recharts Bar Chart */}
            <div className="lg:col-span-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase font-mono tracking-wider">
                  Top Hotspots by Migrant Count (Thousands)
                </h4>
                <span className="text-[11px] font-mono text-slate-400">
                  {filteredHotspots.length} destinations
                </span>
              </div>

              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={hotspotChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: '#475569' }}
                      tickLine={false}
                      axisLine={false}
                      unit="k"
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 11, fill: '#1e293b', fontWeight: 500 }}
                      tickLine={false}
                      width={65}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-slate-800 text-xs space-y-1">
                              <p className="font-bold flex items-center gap-1.5">
                                <span>{data.flag}</span>
                                <span>{data.fullName}</span>
                              </p>
                              <p className="font-mono text-slate-300">
                                Category: <span className="font-semibold text-teal-300">{data.category}</span>
                              </p>
                              <p className="font-mono text-slate-200">
                                Migrants: <span className="font-bold">{data.migrantsK.toLocaleString()}k</span> ({data.migrantsM}M)
                              </p>
                              <p className="font-mono text-slate-300">
                                Share of Regional Emigrants: <span className="font-bold text-amber-400">{data.sharePercent}%</span>
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="migrantsK" radius={[0, 4, 4, 0]}>
                      {hotspotChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Legend of Categories */}
              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-200/70 text-[11px] font-mono">
                {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                  <span key={cat} className="flex items-center gap-1.5 text-slate-600">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: color }} />
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Detailed Hotspot Ranking Cards with Drivers */}
            <div className="lg:col-span-6 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredHotspots.map((hotspot, idx) => {
                const isExpanded = expandedHotspot === hotspot.destination;
                const barColor = CATEGORY_COLORS[hotspot.category] || '#0d9488';
                return (
                  <div
                    key={hotspot.destination}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isExpanded
                        ? 'bg-slate-50 border-teal-500 shadow-xs'
                        : 'bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                    onClick={() => setExpandedHotspot(isExpanded ? null : hotspot.destination)}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400 w-4">#{idx + 1}</span>
                        <span className="text-base">{hotspot.flag}</span>
                        <span className="text-xs font-bold text-slate-900">{hotspot.destination}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono text-xs">
                        <span className="font-bold text-slate-900 tabular-nums">
                          {hotspot.migrantStockThousands.toLocaleString()}k
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {hotspot.sharePercent}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Fill Bar */}
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(hotspot.sharePercent * 2.5, 100)}%`,
                          backgroundColor: barColor,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="text-[10px] font-mono uppercase" style={{ color: barColor }}>
                        {hotspot.category}
                      </span>
                      <span className="text-slate-400 hover:text-slate-600">
                        {isExpanded ? 'Collapse ▲' : 'Details ▼'}
                      </span>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2 text-xs animate-in fade-in">
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-400 block">Primary Corridor Drivers</span>
                          <p className="text-slate-700 leading-relaxed">{hotspot.primaryDrivers}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Dominant Origins</span>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {hotspot.dominantOrigins.map(origin => (
                                <span key={origin} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                  {origin}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-slate-400 block">Key Sectors</span>
                            <div className="flex flex-wrap gap-1 mt-0.5">
                              {hotspot.keySectors.map(sector => (
                                <span key={sector} className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">
                                  {sector}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {onExploreCorridor && (
                          <div className="pt-2 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onExploreCorridor(hotspot.destination);
                              }}
                              className="text-xs font-semibold text-teal-700 hover:text-teal-800 underline cursor-pointer"
                            >
                              Explore Corridor Details &rarr;
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER CITATION NOTE */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-teal-600 shrink-0" />
          <span>Data grounded in {activeRegion.iomCitation}</span>
        </div>
        <a
          href="https://worldmigrationreport.iom.int/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-700 hover:text-teal-800 font-semibold underline shrink-0"
        >
          IOM Interactive Portal &rarr;
        </a>
      </div>
    </div>
  );
};

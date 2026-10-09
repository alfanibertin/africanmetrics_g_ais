import React, { useState, useMemo } from 'react';
import {
  TOP_DESTINATIONS,
  TOP_BILATERAL_CORRIDORS,
  DestinationProfile,
  BilateralCorridor,
} from '../../data/migrationData';
import {
  Globe,
  Compass,
  ArrowRight,
  ArrowRightLeft,
  Search,
  Filter,
  DollarSign,
  Building,
  ShieldAlert,
  Info,
  Layers,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';

export const DestinationsCorridorExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    'All' | 'Intra-African Hub' | 'Europe' | 'Middle East / GCC' | 'North America'
  >('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [corridorFilter, setCorridorFilter] = useState<'All' | 'Intra-African' | 'Inter-Continental'>('All');
  const [selectedDestination, setSelectedDestination] = useState<DestinationProfile | null>(
    TOP_DESTINATIONS[0]
  );

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    return TOP_DESTINATIONS.filter(dest => {
      const matchesCategory =
        selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesSearch =
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.topOriginCountries.some(c =>
          c.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        dest.keySectors.some(s =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered corridors
  const filteredCorridors = useMemo(() => {
    return TOP_BILATERAL_CORRIDORS.filter(corridor => {
      const matchesType =
        corridorFilter === 'All' || corridor.flowType === corridorFilter;
      const matchesSearch =
        corridor.originCountry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        corridor.destinationCountry
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        corridor.primaryDemographics
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [corridorFilter, searchQuery]);

  // Chart data for top destinations by migrant volume
  const destinationChartData = useMemo(() => {
    return [...TOP_DESTINATIONS]
      .sort((a, b) => b.totalAfricanMigrants - a.totalAfricanMigrants)
      .slice(0, 8)
      .map(d => ({
        name: d.name,
        migrantsK: d.totalAfricanMigrants,
        category: d.category,
      }));
  }, []);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Intra-African Hub':
        return '#0d9488'; // teal
      case 'Europe':
        return '#2563eb'; // blue
      case 'Middle East / GCC':
        return '#d97706'; // amber
      case 'North America':
        return '#7c3aed'; // purple
      default:
        return '#64748b';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION HEADER & INTRO */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-800 text-[11px] font-mono font-bold uppercase rounded-md">
              Corridor Intelligence
            </span>
            <span className="text-xs text-slate-500 font-mono">
              IOM World Migration Report Grounded
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Top Global Destinations & Bilateral Migration Corridors
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl">
            Surveillance of receiving hubs across Africa, Europe, the Gulf Cooperation Council (GCC), and North America, tracing labor channels, remittance outflows, and regulatory regimes.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search countries, sectors..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* TOP DESTINATIONS BAR CHART */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              Highest Volume Receiving Countries for African Migrants (Thousands)
            </h4>
            <p className="text-xs text-slate-500">
              Aggregated resident stock of African international migrants across major receiving states.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block" /> Intra-African
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" /> Europe
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" /> Middle East
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" /> North America
            </span>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={destinationChartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748b' }}
                tickLine={false}
                axisLine={false}
                unit="k"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-slate-800 text-xs space-y-1">
                        <p className="font-bold text-teal-300">{data.name}</p>
                        <p className="text-slate-300 text-[11px] font-mono">{data.category}</p>
                        <p className="font-mono text-slate-200">
                          African Migrants: <span className="font-bold">{(data.migrantsK / 1000).toFixed(2)}M</span> ({data.migrantsK.toLocaleString()}k)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="migrantsK" radius={[6, 6, 0, 0]}>
                {destinationChartData.map(entry => (
                  <Cell key={entry.name} fill={getCategoryColor(entry.category)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTER TABS FOR DESTINATIONS */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
          {(['All', 'Intra-African Hub', 'Europe', 'Middle East / GCC', 'North America'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All Destinations' : cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-slate-500">
          Showing {filteredDestinations.length} destination profiles
        </span>
      </div>

      {/* DESTINATION CARDS & SELECTED PROFILE DETAIL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Destination Cards Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredDestinations.map(dest => {
            const isSelected = selectedDestination?.id === dest.id;
            return (
              <div
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-3 relative overflow-hidden ${
                  isSelected
                    ? 'bg-teal-50/50 border-teal-500/80 shadow-md ring-1 ring-teal-500/20'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{dest.flag}</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {dest.name}
                      </h4>
                      <span className="text-[10px] font-mono text-slate-500">
                        {dest.category}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      dest.category === 'Intra-African Hub'
                        ? 'bg-teal-100 text-teal-800'
                        : dest.category === 'Europe'
                        ? 'bg-blue-100 text-blue-800'
                        : dest.category === 'Middle East / GCC'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {(dest.totalAfricanMigrants / 1000).toFixed(2)}M Stock
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Remittances Outflow:</span>
                    <span className="font-bold text-slate-800 font-mono">
                      ${(dest.annualRemittanceOutflowsUSD / 1000).toFixed(2)}B USD/yr
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 pt-1">
                    <span className="text-[10px] text-slate-400 font-mono">Origins:</span>
                    {dest.topOriginCountries.slice(0, 3).map(o => (
                      <span
                        key={o}
                        className="text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                      >
                        {o}
                      </span>
                    ))}
                    {dest.topOriginCountries.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-mono">
                        +{dest.topOriginCountries.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {dest.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">Brain Drain:</span>
                  <span
                    className={`font-semibold font-mono text-[10px] px-1.5 py-0.2 rounded ${
                      dest.brainDrainSeverity === 'Critical'
                        ? 'bg-rose-100 text-rose-700'
                        : dest.brainDrainSeverity === 'Severe'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {dest.brainDrainSeverity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Destination Deep-Dive Dossier */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          {selectedDestination ? (
            <>
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedDestination.flag}</span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-600 font-bold block">
                      Destination Dossier
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedDestination.name}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">
                      {selectedDestination.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-mono block">
                    African Migrant Stock:
                  </span>
                  <span className="text-base font-bold text-teal-700 font-mono">
                    {(selectedDestination.totalAfricanMigrants / 1000).toFixed(2)}M
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Description */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    IOM Regional Assessment
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedDestination.description}
                  </p>
                </div>

                {/* Primary Origins */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Primary Origin Countries
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDestination.topOriginCountries.map(origin => (
                      <span
                        key={origin}
                        className="text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/60 px-2.5 py-1 rounded-lg font-mono"
                      >
                        {origin}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Employment Sectors */}
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Key Employment Sectors
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedDestination.keySectors.map(sector => (
                      <span
                        key={sector}
                        className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg"
                      >
                        {sector}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Mobility & Policy Details */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">
                      Mobility Channel & Visa Pathway:
                    </span>
                    <span className="font-semibold text-slate-800">
                      {selectedDestination.mobilityChannel}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[11px]">
                      Regulatory & Integration Policy:
                    </span>
                    <span className="text-slate-700">
                      {selectedDestination.policyRegime}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-400 font-mono text-[11px]">
                      Annual Remittance Outflow:
                    </span>
                    <span className="font-mono font-bold text-amber-700">
                      ${(selectedDestination.annualRemittanceOutflowsUSD / 1000).toFixed(2)}B USD
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs">
              Select a destination country to view full intelligence breakdown.
            </div>
          )}
        </div>
      </div>

      {/* BILATERAL MIGRATION CORRIDORS TABLE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <ArrowRightLeft className="w-4 h-4 text-teal-600" />
              High-Volume Bilateral Migration Corridors (IOM Matrix)
            </h4>
            <p className="text-xs text-slate-500">
              Top 15 cross-border African origin-to-destination corridors ranked by migrant headcount and annual financial flows.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
            {(['All', 'Intra-African', 'Inter-Continental'] as const).map(type => (
              <button
                key={type}
                onClick={() => setCorridorFilter(type)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  corridorFilter === type
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3">Corridor</th>
                <th className="py-3 px-3">Flow Type</th>
                <th className="py-3 px-3 text-right">Migrant Stock</th>
                <th className="py-3 px-3 text-right">Remittance Flow</th>
                <th className="py-3 px-3">Primary Demographics</th>
                <th className="py-3 px-3">Strategic Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCorridors.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-slate-700">{c.originCountry}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span className="font-mono text-teal-800">{c.destinationCountry}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        c.flowType === 'Intra-African'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                          : 'bg-blue-50 text-blue-700 border border-blue-200/60'
                      }`}
                    >
                      {c.flowType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-800">
                    {(c.migrantStock / 1000).toFixed(2)}M
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-amber-700">
                    ${c.remittanceVolumeUSD.toLocaleString()}M
                  </td>
                  <td className="py-3 px-3 text-slate-600 max-w-xs truncate">
                    {c.primaryDemographics}
                  </td>
                  <td className="py-3 px-3 text-slate-500 max-w-sm text-[11px] leading-relaxed">
                    {c.strategicNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  Globe,
  DollarSign,
  Users,
  Landmark,
  TrendingUp,
  ArrowUpRight,
  Search,
  Info,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { Country } from '../types';
import { DataBadge } from '../components/DataBadge';
import { CountryFlag } from '../components/CountryFlag';
import AfricaMap from '../components/AfricaMap';
import DashboardCharts from '../components/DashboardCharts';
import NewsBulletins, { Bulletin } from '../components/NewsBulletins';

interface OverviewPageProps {
  countries: Country[];
  isLatestDataLive: boolean;
  bulletins: Bulletin[];
  isUpdating: boolean;
  handleUpdateEconomicData: () => void;
}

export default function OverviewPage({
  countries,
  isLatestDataLive,
  bulletins,
  isUpdating,
  handleUpdateEconomicData,
}: OverviewPageProps) {
  // Local state for filters and sorting
  const [selectedRegion, setSelectedRegion] = useState<'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern' | null>(null);
  const [chartTab, setChartTab] = useState<'gdp' | 'debt' | 'unemployment' | 'overview'>('gdp');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'gdp' | 'population' | 'unemployment' | 'growthRate' | 'year'>('name');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc');

  // Dynamically compute global metrics from live state
  const totals = useMemo(() => {
    const sumGdp = countries.reduce((acc, c) => acc + c.gdp, 0) / 1000;
    const sumPopulation = countries.reduce((acc, c) => acc + c.population, 0) / 1000;
    const sumBudget = countries.reduce((acc, c) => acc + c.budget, 0) / 1000;

    return {
      gdp: `${sumGdp.toFixed(2)}T`,
      population: `${sumPopulation.toFixed(2)}B`,
      budget: `${sumBudget.toFixed(2)}T`,
      countriesCount: countries.length
    };
  }, [countries]);

  // Sorting and searching
  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      const matchesRegion = selectedRegion ? c.region === selectedRegion : true;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.highlight.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    }).sort((a, b) => {
      const valA = a[sortBy];
      const valB = b[sortBy];
      
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      
      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [countries, selectedRegion, searchQuery, sortBy, sortOrder]);

  const handleSort = (field: 'name' | 'gdp' | 'population' | 'unemployment' | 'growthRate' | 'year') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* DATA MANAGEMENT FORECASTING ENGINE */}
      <div className="glass-panel rounded-3xl p-6 shadow-2xs" id="data-management-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-brand-text font-display tracking-tight">Macroeconomic Forecasting Engine</h3>
            <p className="text-xs text-brand-muted mt-0.5">Simulate actual global shifts and update indicators using LLM macroeconomic modeling</p>
          </div>
          <button
            onClick={handleUpdateEconomicData}
            disabled={isUpdating}
            className="px-5 py-3 bg-slate-700 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 self-start sm:self-center shrink-0 shadow-xs"
            id="update-economic-data-btn"
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Synthesizing Indicators...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-white" />
                <span>Run Macroeconomic Update</span>
              </>
            )}
          </button>
        </div>

        {/* AI Bulletins section (Fills when updated) */}
        {bulletins.length > 0 && (
          <div className="mt-6 pt-6 border-t border-brand-border">
            <NewsBulletins bulletins={bulletins} isLive={isLatestDataLive} />
          </div>
        )}
      </div>

      {/* METRICS OVERVIEW GRID (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="totals-metrics-row">
        {/* TOTAL GDP */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
          <div className="space-y-1.5">
            <span className="text-[11px] tracking-wider text-brand-dim font-mono uppercase block">Total GDP</span>
            <h2 className="text-3xl font-bold text-brand-text font-display">{`$${totals.gdp}`}</h2>
            <p className="text-xs text-brand-muted font-sans">Combined African economies</p>
          </div>
          <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* TOTAL POPULATION */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
          <div className="space-y-1.5">
            <span className="text-[11px] tracking-wider text-brand-dim font-mono uppercase block">Total Population</span>
            <h2 className="text-3xl font-bold text-brand-text font-display">{totals.population}</h2>
            <p className="text-xs text-brand-muted font-sans">People across Africa</p>
          </div>
          <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* TOTAL BUDGET */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
          <div className="space-y-1.5">
            <span className="text-[11px] tracking-wider text-brand-dim font-mono uppercase block">Total Budget</span>
            <h2 className="text-3xl font-bold text-brand-text font-display">{`$${totals.budget}`}</h2>
            <p className="text-xs text-brand-muted font-sans">Combined Gov. Spending</p>
          </div>
          <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
            <Landmark className="w-5 h-5" />
          </div>
        </div>

        {/* COUNTRIES TRACKED */}
        <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
          <div className="space-y-1.5">
            <span className="text-[11px] tracking-wider text-brand-dim font-mono uppercase block">Countries Tracked</span>
            <h2 className="text-3xl font-bold text-brand-text font-display">{totals.countriesCount}</h2>
            <p className="text-xs text-brand-muted font-sans">African nations</p>
            <div className="flex items-center gap-1.5 pt-2">
              <DataBadge source="static" />
            </div>
          </div>
          <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
            <Globe className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* CHARTS AND INTERACTIVE MAP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* CHART BLOCK */}
        <div className="lg:col-span-6 glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-6" id="economic-indicators-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-brand-text font-display tracking-tight">Macroeconomic Indicator Charting</h3>
              <p className="text-xs text-brand-muted mt-0.5">Compare GDP, fiscal debt, and structural unemployment regionally</p>
            </div>

            {/* Chart Tabs */}
            <div className="bg-brand-input/60 p-1 rounded-xl border border-brand-border/60 flex gap-1 self-start" id="chart-tabs-nav">
              {(['gdp', 'debt', 'unemployment', 'overview'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChartTab(tab)}
                  className={`px-3 py-1.5 text-[11px] font-semibold rounded-lg capitalize transition cursor-pointer ${
                    chartTab === tab
                      ? 'bg-white text-brand-text border border-brand-border/40 shadow-2xs font-bold'
                      : 'text-brand-dim hover:text-brand-text hover:bg-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <DashboardCharts
            activeTab={chartTab}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            countries={countries}
          />

          {selectedRegion && (
            <div className="p-3.5 bg-slate-500/5 border border-brand-border rounded-xl text-brand-text text-xs flex items-center justify-between font-sans shadow-2xs">
              <span className="flex items-center gap-1.5">
                <Info className="w-4 h-4 shrink-0 text-slate-600" />
                <span>Currently filtering by <strong className="text-slate-700">{selectedRegion} Africa</strong></span>
              </span>
              <button
                onClick={() => setSelectedRegion(null)}
                className="text-[11px] text-slate-600 hover:text-slate-800 underline font-mono cursor-pointer font-bold"
              >
                Clear filter
              </button>
            </div>
          )}
        </div>

        {/* INTERACTIVE MAP */}
        <div className="lg:col-span-6 h-full">
          <AfricaMap selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
        </div>
      </div>

      {/* KEY ECONOMIES SPOTLIGHT */}
      <div className="glass-panel rounded-3xl p-6" id="country-spotlight-card">
        <div className="border-b border-brand-border pb-4 mb-5">
          <h3 className="text-lg font-bold text-brand-text font-display tracking-tight">Key Economies Spotlight</h3>
          <p className="text-xs text-brand-muted mt-0.5">Nations with high regional structural weight</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Nigeria Card */}
          <div className="bg-slate-300/15 border border-brand-border hover:border-brand-dim/20 rounded-2xl p-5 space-y-4 transition duration-300 hover:bg-slate-300/30 shadow-2xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-brand-text font-display">Nigeria</h4>
                  <DataBadge source={isLatestDataLive ? 'live' : 'static'} year={countries.find(c => c.id === 'nigeria')?.year || 2024} />
                </div>
                <span className="text-[11px] text-slate-600 font-mono uppercase tracking-wider block mt-1">West Africa</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 border-t border-b border-brand-border/60 py-3 font-mono text-center">
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">GDP</span>
                <span className="text-[11px] font-bold text-brand-text">{`$${countries.find(c => c.id === 'nigeria')?.gdp || 440.8}B`}</span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">Population</span>
                <span className="text-[11px] font-bold text-brand-text font-semibold">218.5M</span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">Unempl.</span>
                <span className="text-[11px] font-bold text-brand-text">8.1%</span>
              </div>
            </div>

            <p className="text-xs text-brand-dim italic">"Largest economic production volume in West Africa"</p>
          </div>

          {/* Egypt Card */}
          <div className="bg-slate-300/15 border border-brand-border hover:border-brand-dim/20 rounded-2xl p-5 space-y-4 transition duration-300 hover:bg-slate-300/30 shadow-2xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-brand-text font-display">Egypt</h4>
                  <DataBadge source={isLatestDataLive ? 'live' : 'static'} year={countries.find(c => c.id === 'egypt')?.year || 2024} />
                </div>
                <span className="text-[11px] text-slate-600 font-mono uppercase tracking-wider block mt-1">North Africa</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 border-t border-b border-brand-border/60 py-3 font-mono text-center">
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">GDP</span>
                <span className="text-[11px] font-bold text-brand-text">{`$${countries.find(c => c.id === 'egypt')?.gdp || 469.4}B`}</span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">Population</span>
                <span className="text-[11px] font-bold text-brand-text font-semibold">109.3M</span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">Unempl.</span>
                <span className="text-[11px] font-bold text-brand-text">7.4%</span>
              </div>
            </div>

            <p className="text-xs text-brand-dim italic">"Growing Suez logistics corridor and service sector"</p>
          </div>

          {/* South Africa Card */}
          <div className="bg-slate-300/15 border border-brand-border hover:border-brand-dim/20 rounded-2xl p-5 space-y-4 transition duration-300 hover:bg-slate-300/30 shadow-2xs">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-brand-text font-display">South Africa</h4>
                  <DataBadge source={isLatestDataLive ? 'live' : 'static'} year={countries.find(c => c.id === 'south-africa')?.year || 2024} />
                </div>
                <span className="text-[11px] text-slate-600 font-mono uppercase tracking-wider block mt-1">Southern Africa</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-600" />
            </div>
            
            <div className="grid grid-cols-3 gap-2 border-t border-b border-brand-border/60 py-3 font-mono text-center">
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">GDP</span>
                <span className="text-[11px] font-bold text-brand-text">{`$${countries.find(c => c.id === 'south-africa')?.gdp || 419.0}B`}</span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">Population</span>
                <span className="text-[11px] font-bold text-brand-text font-semibold">60.4M</span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim uppercase block">Unempl.</span>
                <span className="text-[11px] font-bold text-brand-text">29.8%</span>
              </div>
            </div>

            <p className="text-xs text-brand-dim italic">"Highly industrialized mineral and automotive production base"</p>
          </div>
        </div>
      </div>

      {/* CENTRAL DATABASE SEARCH TABLE */}
      <div className="glass-panel rounded-3xl p-6" id="country-data-table-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border pb-5 mb-5">
          <div>
            <h3 className="text-lg font-bold text-brand-text font-display tracking-tight">Central Country Database</h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Explore indicators for {countries.length} nations. Select any region above or search below.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-dim" />
            <input
              type="text"
              placeholder="Filter by country name or economic segment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-300/25 backdrop-blur-md border border-brand-border text-brand-text text-xs rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-slate-500/40 shadow-2xs placeholder-brand-dim"
              id="search-country-db"
            />
          </div>
        </div>

        {/* TABLE DISPLAY */}
        <div className="max-h-[520px] overflow-y-auto overflow-x-auto rounded-xl border border-brand-border bg-slate-300/10 backdrop-blur-md relative database-scroll-container">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-brand-border bg-slate-300/95 backdrop-blur-md text-brand-muted font-mono font-medium">
                <th className="p-4.5 cursor-pointer hover:text-brand-text sticky top-0 bg-slate-300/95 backdrop-blur-md" onClick={() => handleSort('name')}>
                  Country {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-4.5 sticky top-0 bg-slate-300/95 backdrop-blur-md">Region</th>
                <th className="p-4.5 cursor-pointer hover:text-brand-text text-center sticky top-0 bg-slate-300/95 backdrop-blur-md" onClick={() => handleSort('year')}>
                  Year {sortBy === 'year' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-4.5 cursor-pointer hover:text-brand-text text-right sticky top-0 bg-slate-300/95 backdrop-blur-md" onClick={() => handleSort('gdp')}>
                  GDP (USD) {sortBy === 'gdp' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-4.5 cursor-pointer hover:text-brand-text text-right sticky top-0 bg-slate-300/95 backdrop-blur-md" onClick={() => handleSort('growthRate')}>
                  Annual Growth {sortBy === 'growthRate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-4.5 cursor-pointer hover:text-brand-text text-right sticky top-0 bg-slate-300/95 backdrop-blur-md" onClick={() => handleSort('population')}>
                  Population {sortBy === 'population' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-4.5 cursor-pointer hover:text-brand-text text-right sticky top-0 bg-slate-300/95 backdrop-blur-md" onClick={() => handleSort('unemployment')}>
                  Unemployment {sortBy === 'unemployment' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                </th>
                <th className="p-4.5 sticky top-0 bg-slate-300/95 backdrop-blur-md">Structural Highlight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border bg-transparent">
              {filteredCountries.map((country) => (
                <tr
                  key={country.id}
                  className="hover:bg-slate-400/15 transition-colors animate-fade-in animate-duration-300"
                >
                  <td className="p-4.5 font-bold text-brand-text font-display flex items-center gap-2">
                    <CountryFlag id={country.id} name={country.name} />
                    <span>{country.name}</span>
                  </td>
                  <td className="p-4.5 text-brand-muted">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-mono border font-semibold ${
                      country.region === 'Northern' ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' :
                      country.region === 'Western' ? 'bg-teal-500/10 text-teal-700 border-teal-500/20' :
                      country.region === 'Eastern' ? 'bg-orange-500/10 text-orange-700 border-orange-500/20' :
                      country.region === 'Central' ? 'bg-[#15803d]/10 text-[#15803d] border-[#15803d]/20' : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                    }`}>
                      {country.region}
                    </span>
                  </td>
                  <td className="p-4.5 font-mono text-center text-brand-muted">
                    {country.year}
                  </td>
                  <td className="p-4.5 font-mono text-right text-brand-text font-semibold">
                    {`$${country.gdp >= 1 ? `${country.gdp.toFixed(1)}B` : `${(country.gdp * 1000).toFixed(0)}M`}`}
                  </td>
                  <td className={`p-4.5 font-mono text-right font-bold ${country.growthRate >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {country.growthRate >= 0 ? `+${country.growthRate}%` : `${country.growthRate}%`}
                  </td>
                  <td className="p-4.5 font-mono text-right text-brand-muted">
                    {country.population >= 1 ? `${country.population.toFixed(1)}M` : `${(country.population * 1000).toFixed(0)}K`}
                  </td>
                  <td className="p-4.5 font-mono text-right text-brand-muted">{country.unemployment}%</td>
                  <td className="p-4.5 text-brand-muted text-[11px] font-sans">{country.highlight}</td>
                </tr>
              ))}
              {filteredCountries.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-brand-dim font-sans text-[11px]">
                    No countries match the selected search query or regional filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

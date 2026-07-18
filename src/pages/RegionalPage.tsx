import React, { useState, useMemo } from 'react';
import { TrendingUp, Info, ChevronRight } from 'lucide-react';
import { Country } from '../types';
import { getRegionalSummaries } from '../lib/aggregations';
import DashboardCharts from '../components/DashboardCharts';
import { CountryFlag } from '../components/CountryFlag';

interface RegionalPageProps {
  countries: Country[];
}

export default function RegionalPage({ countries }: RegionalPageProps) {
  const [selectedRegion, setSelectedRegion] = useState<'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern' | null>(null);
  const [chartTab, setChartTab] = useState<'gdp' | 'debt' | 'unemployment' | 'overview'>('gdp');
  const [sortBy, setSortBy] = useState<'name' | 'gdp' | 'population' | 'unemployment' | 'growthRate' | 'year'>('name');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc');

  // Computed Values - Regional Averages for rendering
  const regionsSummary = useMemo(() => {
    const regionalSummaries = getRegionalSummaries(countries);
    return Object.entries(regionalSummaries).map(([name, val]) => ({
      name: name === 'Northern' ? 'North Africa' :
            name === 'Western' ? 'West Africa' :
            name === 'Eastern' ? 'East Africa' :
            name === 'Central' ? 'Central Africa' : 'Southern Africa',
      rawName: name,
      countriesCount: val.countriesCount,
      gdp: val.gdp,
      unemployment: val.unemployment,
      population: val.population,
      color: name === 'Northern' ? 'bg-[#ca8a04]' :
             name === 'Western' ? 'bg-[#0f766e]' :
             name === 'Eastern' ? 'bg-[#d97706]' :
             name === 'Central' ? 'bg-[#15803d]' : 'bg-[#9a3412]',
      borderColor: name === 'Northern' ? 'border-[#ca8a04]/30' :
                   name === 'Western' ? 'border-[#0f766e]/30' :
                   name === 'Eastern' ? 'border-[#d97706]/30' :
                   name === 'Central' ? 'border-[#15803d]/30' : 'border-[#9a3412]/30',
      activeBg: name === 'Northern' ? 'bg-[#ca8a04]/5 border-[#ca8a04]/40' :
                name === 'Western' ? 'bg-[#0f766e]/5 border-[#0f766e]/40' :
                name === 'Eastern' ? 'bg-[#d97706]/5 border-[#d97706]/40' :
                name === 'Central' ? 'bg-[#15803d]/5 border-[#15803d]/40' : 'bg-[#9a3412]/5 border-[#9a3412]/40',
    }));
  }, [countries]);

  const selectedRegionSummary = useMemo(() => {
    if (!selectedRegion) return null;
    return getRegionalSummaries(countries)[selectedRegion];
  }, [selectedRegion, countries]);

  const handleSort = (field: 'name' | 'gdp' | 'population' | 'unemployment' | 'growthRate' | 'year') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortedConstituentCountries = useMemo(() => {
    if (!selectedRegion) return [];
    return countries
      .filter(c => c.region === selectedRegion)
      .sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
      });
  }, [countries, selectedRegion, sortBy, sortOrder]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* REGIONAL SUMMARY BANNER */}
      <div className="glass-panel rounded-3xl p-6" id="regional-hub-header">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-teal-600/15 border border-teal-600/20 text-teal-700 rounded-2xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-display tracking-tight text-brand-text">Continental Region Surveillance Hub</h2>
            <p className="text-xs text-brand-muted mt-0.5">
              Consolidated macroeconomic aggregates. Select any region below to inspect component countries.
            </p>
          </div>
        </div>
        <p className="text-xs text-brand-muted leading-relaxed max-w-4xl">
          Africa's economic structure is heavily defined by regional blocks. From Northern Africa's oil and maritime service corridors to Southern Africa's deep mining and automotive hubs, and Western Africa's massive agricultural and trading volumes. Click any region box to activate the surveillance query filters.
        </p>
      </div>

      {/* REGIONAL OVERVIEW INTERACTIVE CARDS */}
      <div className="glass-panel rounded-3xl p-6" id="regional-overview-card">
        <div className="border-b border-brand-border pb-4 mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-brand-text font-display">Macro-Region Averages (World Bank 2026 Baseline)</h3>
            <p className="text-xs text-brand-muted mt-0.5">Weighted metrics across all continent blocks</p>
          </div>
          {selectedRegion && (
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-xs font-mono text-slate-700 bg-slate-300/60 hover:bg-slate-300/80 px-3 py-1 rounded-lg transition border border-brand-border font-bold cursor-pointer"
            >
              Reset Filter
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {regionsSummary.map((region) => {
            const isSelected = selectedRegion === region.rawName;
            return (
              <div
                key={region.rawName}
                onClick={() => setSelectedRegion(isSelected ? null : (region.rawName as any))}
                className={`p-4.5 border transition-all duration-300 rounded-2xl flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-slate-300/80 border-slate-500/40 shadow-xs ring-1 ring-slate-400'
                    : 'border-brand-border/60 hover:border-brand-dim/30 bg-slate-400/10'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${region.color} opacity-85`} />
                    <h4 className="text-[11px] font-bold text-brand-text font-sans">{region.name}</h4>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-brand-dim transition-transform shrink-0 ${isSelected ? 'transform rotate-90 text-brand-text' : ''}`} />
                </div>
                
                <div className="space-y-1.5 mt-1 font-mono text-[11px]">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] text-brand-dim uppercase">GDP total</span>
                    <span className="text-xs font-bold text-brand-text">{`$${region.gdp}B`}</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] text-brand-dim uppercase">Avg Unempl</span>
                    <span className="text-xs font-bold text-brand-text">{region.unemployment}%</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] text-brand-dim uppercase">Population</span>
                    <span className="text-xs font-bold text-brand-text">{region.population}M</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CHARTS COMPARISON BLOCK & REGION DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Regional Charting */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-base font-bold text-brand-text font-display">Macro-Region Comparative Metrics</h3>
            <p className="text-xs text-brand-muted mt-0.5">Visual representation of economic weights across continent sectors</p>
          </div>
          <div className="bg-brand-input/40 p-1 rounded-xl border border-brand-border/60 flex gap-1 self-start">
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

          <DashboardCharts
            activeTab={chartTab}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            countries={countries}
          />
        </div>

        {/* Regional Economic Profile Card */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <div className="border-b border-brand-border pb-3 mb-4">
              <h3 className="text-base font-bold text-brand-text font-display">Active Region Profile</h3>
              <p className="text-xs text-brand-muted mt-0.5">Structural highlights of chosen surveillance block</p>
            </div>

            {selectedRegion ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-700 border border-teal-500/20 rounded-full font-mono font-bold text-[11px] uppercase">
                    {selectedRegion} Africa
                  </span>
                  <span className="text-xs text-brand-muted font-semibold">
                    {countries.filter(c => c.region === selectedRegion).length} countries mapped
                  </span>
                </div>

                <div className="space-y-3 font-mono text-[11px] bg-brand-input p-4 rounded-2xl border border-brand-border">
                  <div className="flex justify-between">
                    <span className="text-brand-dim">GDP Weight:</span>
                    <span className="font-bold text-brand-text">{`$${selectedRegionSummary?.gdp || 0}B`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dim">Debt to GDP (avg):</span>
                    <span className="font-bold text-[#ca8a04]">{selectedRegionSummary?.debtToGdp || 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dim">Government Budget:</span>
                    <span className="font-bold text-brand-text">{`$${selectedRegionSummary?.budget || 0}B`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dim">Unemployment Rate:</span>
                    <span className="font-bold text-rose-700">{selectedRegionSummary?.unemployment || 0}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-dim">Est Population:</span>
                    <span className="font-bold text-brand-text">{selectedRegionSummary?.population || 0}M</span>
                  </div>
                </div>

                <div className="text-xs text-brand-muted space-y-2 leading-relaxed">
                  <strong className="text-brand-text font-semibold block">Strategic Hub Description:</strong>
                  <p className="text-[11px]">
                    {selectedRegion === 'Northern' ? 'Northern Africa focuses heavily on petrochemical manufacturing, gas infrastructure integration, and key transcontinental logistics corridors such as the Suez Canal.' :
                     selectedRegion === 'Western' ? 'Western Africa relies on rich mineral and commodity trading blocks, with Nigeria forming the single largest population and manufacturing volume.' :
                     selectedRegion === 'Eastern' ? 'Eastern Africa represents the digital and tea trade hub, lead by Kenyas Silicon Savannah fintech innovations and Rwandas institutional efficiency.' :
                     selectedRegion === 'Central' ? 'Central Africa contains the worlds richest raw metal deposits including cobalt, lithium and massive forest basins vital for carbon credit modeling.' :
                     'Southern Africa features high industrialization, sophisticated financial service sectors, and advanced automotive manufacturing, alongside persistent labor adjustments.'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-brand-dim h-48">
                <Info className="w-8 h-8 mb-2 text-brand-dim" />
                <p className="text-xs">Select any continent region card above to inspect its granular consolidated aggregates.</p>
              </div>
            )}
          </div>

          <div className="bg-brand-input border border-brand-border rounded-xl p-3 text-[11px] text-brand-dim text-center italic mt-4 font-mono">
            All region values aggregated and normalized to 2026 surveillance cycles.
          </div>
        </div>
      </div>

      {/* CONSTITUENT REGIONAL COUNTRIES TABLE */}
      {selectedRegion && (
        <div className="glass-panel rounded-3xl p-6 animate-in slide-in-from-bottom-2 duration-300">
          <div className="border-b border-brand-border pb-4 mb-4">
            <h3 className="text-base font-bold text-brand-text font-display">Constituent Economies in {selectedRegion} Africa</h3>
            <p className="text-xs text-brand-muted mt-0.5">Granular indicators for member nations belonging strictly to this block</p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-brand-border bg-slate-300/10 backdrop-blur-md">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-brand-border bg-slate-300/25 text-brand-muted font-mono font-medium">
                  <th className="p-4 cursor-pointer hover:text-brand-text" onClick={() => handleSort('name')}>
                    Country Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 cursor-pointer hover:text-brand-text text-right" onClick={() => handleSort('gdp')}>
                    GDP (USD) {sortBy === 'gdp' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 cursor-pointer hover:text-brand-text text-right" onClick={() => handleSort('growthRate')}>
                    Annual Growth {sortBy === 'growthRate' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 cursor-pointer hover:text-brand-text text-right" onClick={() => handleSort('population')}>
                    Population {sortBy === 'population' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4 cursor-pointer hover:text-brand-text text-right" onClick={() => handleSort('unemployment')}>
                    Unemployment {sortBy === 'unemployment' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
                  </th>
                  <th className="p-4">Structural Highlight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border">
                {sortedConstituentCountries.map((country) => (
                  <tr key={country.id} className="hover:bg-slate-400/15 transition-colors">
                    <td className="p-4 font-bold text-brand-text font-display flex items-center gap-2">
                      <CountryFlag id={country.id} name={country.name} />
                      <span>{country.name}</span>
                    </td>
                    <td className="p-4 font-mono text-right text-brand-text font-semibold">
                      {`$${country.gdp >= 1 ? `${country.gdp.toFixed(1)}B` : `${(country.gdp * 1000).toFixed(0)}M`}`}
                    </td>
                    <td className={`p-4 font-mono text-right font-bold ${country.growthRate >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {country.growthRate >= 0 ? `+${country.growthRate}%` : `${country.growthRate}%`}
                    </td>
                    <td className="p-4 font-mono text-right text-brand-muted">
                      {country.population >= 1 ? `${country.population.toFixed(1)}M` : `${(country.population * 1000).toFixed(0)}K`}
                    </td>
                    <td className="p-4 font-mono text-right text-brand-muted">{country.unemployment}%</td>
                    <td className="p-4 text-brand-muted text-[11px] font-sans">{country.highlight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

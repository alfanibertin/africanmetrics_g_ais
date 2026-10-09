import React, { useState, useMemo } from 'react';
import {
  COUNTRY_MIGRATION_PROFILES,
  CountryMigrationProfile,
} from '../../data/migrationData';
import {
  Search,
  Filter,
  Globe,
  DollarSign,
  HeartPulse,
  Award,
  ShieldAlert,
  ArrowRight,
  Download,
  Building,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

export const CountryMigrationDossier: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('nigeria');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [whoFilter, setWhoFilter] = useState<'All' | 'Red-Listed' | 'Monitored' | 'Standard'>('All');

  const filteredCountries = useMemo(() => {
    return COUNTRY_MIGRATION_PROFILES.filter(c => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.primaryDestinations.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesWho =
        whoFilter === 'All' ||
        (whoFilter === 'Red-Listed' && c.whoSafeguardStatus.includes('Red-Listed')) ||
        (whoFilter === 'Monitored' && c.whoSafeguardStatus.includes('Monitored')) ||
        (whoFilter === 'Standard' && c.whoSafeguardStatus === 'Standard');

      return matchesSearch && matchesWho;
    });
  }, [searchQuery, whoFilter]);

  const activeCountry = useMemo(() => {
    return (
      COUNTRY_MIGRATION_PROFILES.find(c => c.id === selectedCountryId) ||
      COUNTRY_MIGRATION_PROFILES[0]
    );
  }, [selectedCountryId]);

  // Export CSV of country migration dossiers
  const handleExportCSV = () => {
    const headers = [
      'Country',
      'Code',
      'Population (M)',
      'Emigrant Stock (k)',
      'Emigrant % of Pop',
      'Remittances ($M USD)',
      'Remittance % of GDP',
      'Brain Drain Severity Index (0-100)',
      'WHO Safeguard Status',
      'Diaspora Engagement Grade',
      'Top Destinations',
    ];

    const rows = COUNTRY_MIGRATION_PROFILES.map(c => [
      c.name,
      c.code,
      c.populationMillion,
      c.emigrantStockThousands,
      c.emigrantPercentPop,
      c.remittancesReceivedUSDMillion,
      c.remittancesPercentGDP,
      c.brainDrainSeverityIndex,
      `"${c.whoSafeguardStatus}"`,
      c.diasporaEngagementGrade,
      `"${c.primaryDestinations.join('; ')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `african_migration_dossiers_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-800 text-[11px] font-mono font-bold uppercase rounded-md">
              Sovereign Profiles
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Country-Specific Diaspora Intelligence
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            African Sovereign Migration & Brain Drain Dossiers
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
            Examine country-by-country diaspora distributions, remittance dependencies, healthcare brain drain vulnerabilities, and national return frameworks.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs w-fit"
        >
          <Download className="w-3.5 h-3.5 text-teal-400" />
          <span>Export Migration CSV</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl">
          {(['All', 'Red-Listed', 'Monitored', 'Standard'] as const).map(w => (
            <button
              key={w}
              onClick={() => setWhoFilter(w)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                whoFilter === w
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {w === 'All' ? 'All WHO Statuses' : w}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search African nation..."
            className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* MAIN LAYOUT: COUNTRY LIST TABS + DETAILED DOSSIER CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Country Selector Grid / Sidebar */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
          {filteredCountries.map(c => {
            const isSelected = activeCountry.id === c.id;
            return (
              <div
                key={c.id}
                onClick={() => setSelectedCountryId(c.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-500 shadow-sm ring-1 ring-teal-500/30'
                    : 'bg-white hover:bg-slate-50 border-slate-200/80 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{c.name}</h4>
                      <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                        {c.code}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block">
                      {(c.emigrantStockThousands / 1000).toFixed(2)}M Emigrants ({c.emigrantPercentPop}% pop)
                    </span>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      BDSI Score
                    </span>
                    <span
                      className={`text-xs font-mono font-bold ${
                        c.brainDrainSeverityIndex > 80
                          ? 'text-rose-700'
                          : c.brainDrainSeverityIndex > 70
                          ? 'text-amber-700'
                          : 'text-teal-700'
                      }`}
                    >
                      {c.brainDrainSeverityIndex}/100
                    </span>
                  </div>
                  <ArrowRight
                    className={`w-3.5 h-3.5 ${
                      isSelected ? 'text-teal-600' : 'text-slate-300'
                    }`}
                  />
                </div>
              </div>
            );
          })}

          {filteredCountries.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
              No country matches the search criteria.
            </div>
          )}
        </div>

        {/* Selected Country Detailed Dossier Card */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <span className="text-4xl">{activeCountry.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{activeCountry.name}</h3>
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {activeCountry.code}
                  </span>
                  <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200/60">
                    Grade {activeCountry.diasporaEngagementGrade}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono mt-0.5 block">
                  Population: {activeCountry.populationMillion} Million citizens
                </span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
              <span className="text-[11px] font-mono text-slate-400">
                WHO Safeguards Status:
              </span>
              <span
                className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                  activeCountry.whoSafeguardStatus.includes('Red-Listed')
                    ? 'bg-rose-100 text-rose-800'
                    : activeCountry.whoSafeguardStatus.includes('Monitored')
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {activeCountry.whoSafeguardStatus}
              </span>
            </div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Emigrant Stock
              </span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {(activeCountry.emigrantStockThousands / 1000).toFixed(2)}M
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                {activeCountry.emigrantPercentPop}% of pop
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Remittances
              </span>
              <span className="text-sm font-bold text-amber-700 font-mono">
                ${(activeCountry.remittancesReceivedUSDMillion / 1000).toFixed(2)}B
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                USD received/yr
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                Share of GDP
              </span>
              <span className="text-sm font-bold text-slate-900 font-mono">
                {activeCountry.remittancesPercentGDP}%
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                Macro footprint
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">
                BDSI Score
              </span>
              <span
                className={`text-sm font-bold font-mono ${
                  activeCountry.brainDrainSeverityIndex > 80
                    ? 'text-rose-700'
                    : activeCountry.brainDrainSeverityIndex > 70
                    ? 'text-amber-700'
                    : 'text-teal-700'
                }`}
              >
                {activeCountry.brainDrainSeverityIndex}/100
              </span>
              <span className="text-[10px] text-slate-500 font-mono block">
                Vulnerability rating
              </span>
            </div>
          </div>

          {/* Strategic Narrative */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
              Strategic Intelligence Synthesis
            </span>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
              {activeCountry.strategicSummary}
            </p>
          </div>

          {/* Primary Destinations & Talent Loss Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-teal-800 block font-semibold">
                Primary Destination Corridors
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCountry.primaryDestinations.map(d => (
                  <span
                    key={d}
                    className="text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200/60 px-2.5 py-1 rounded-lg font-mono"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-rose-800 block font-semibold">
                Critical Talent Outflows
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeCountry.keyTalentLossAreas.map(t => (
                  <span
                    key={t}
                    className="text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/60 px-2.5 py-1 rounded-lg"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Return & Diaspora Frameworks */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 block font-semibold">
              National Return & Diaspora Engagement Initiatives
            </span>
            <div className="flex flex-wrap gap-2">
              {activeCountry.topReturnPrograms.map(prog => (
                <div
                  key={prog}
                  className="flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-xl font-medium"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{prog}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

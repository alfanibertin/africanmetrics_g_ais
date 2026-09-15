import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Globe2, 
  Briefcase, 
  Layers, 
  Filter, 
  Download, 
  ChevronRight, 
  Activity, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Sparkles,
  ExternalLink,
  Table as TableIcon,
  LayoutGrid,
  Flag
} from 'lucide-react';
import { 
  CHINESE_COMPANIES_BY_COUNTRY, 
  ChineseCompanyPresence 
} from '../data/chinaAfricaFdiData';

export const ChineseCompaniesSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'country' | 'grid' | 'table'>('country');

  // Extract unique countries list
  const allCountries = useMemo(() => {
    const countriesSet = new Set<string>();
    CHINESE_COMPANIES_BY_COUNTRY.forEach(c => {
      countriesSet.add(c.country);
    });
    return Array.from(countriesSet).sort();
  }, []);

  // Extract unique sectors list
  const allSectors = useMemo(() => {
    const sectorsSet = new Set<string>();
    CHINESE_COMPANIES_BY_COUNTRY.forEach(c => {
      sectorsSet.add(c.primarySector);
    });
    return Array.from(sectorsSet).sort();
  }, []);

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return CHINESE_COMPANIES_BY_COUNTRY.filter(company => {
      // Country match
      if (selectedCountry !== 'all' && company.country !== selectedCountry) {
        return false;
      }
      // Sector match
      if (selectedSector !== 'all' && company.primarySector !== selectedSector) {
        return false;
      }
      // Ownership match
      if (selectedOwnership !== 'all') {
        if (selectedOwnership === 'SOE' && !company.ownershipType.includes('State-Owned')) return false;
        if (selectedOwnership === 'POE' && !company.ownershipType.includes('Private')) return false;
        if (selectedOwnership === 'JV' && !company.ownershipType.includes('Joint Venture')) return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = company.companyName.toLowerCase().includes(q);
        const matchesChinese = company.chineseName ? company.chineseName.toLowerCase().includes(q) : false;
        const matchesAcronym = company.acronym ? company.acronym.toLowerCase().includes(q) : false;
        const matchesCountry = company.country.toLowerCase().includes(q);
        const matchesSector = company.primarySector.toLowerCase().includes(q);
        const matchesHQ = company.headquartersChina.toLowerCase().includes(q);
        const matchesProjects = company.flagshipProjects.some(p => p.toLowerCase().includes(q));
        const matchesImpact = company.keyImpact.toLowerCase().includes(q);

        return matchesName || matchesChinese || matchesAcronym || matchesCountry || matchesSector || matchesHQ || matchesProjects || matchesImpact;
      }
      return true;
    });
  }, [selectedCountry, selectedSector, selectedOwnership, searchQuery]);

  // Group companies by country for 'country' view
  const companiesByCountry = useMemo(() => {
    const grouped: Record<string, ChineseCompanyPresence[]> = {};
    filteredCompanies.forEach(company => {
      if (!grouped[company.country]) {
        grouped[company.country] = [];
      }
      grouped[company.country].push(company);
    });
    return grouped;
  }, [filteredCompanies]);

  // Key metrics calculation
  const totalTracked = CHINESE_COMPANIES_BY_COUNTRY.length;
  const uniqueNationsCount = allCountries.length;
  const soeCount = CHINESE_COMPANIES_BY_COUNTRY.filter(c => c.ownershipType.includes('State-Owned')).length;
  const poeCount = CHINESE_COMPANIES_BY_COUNTRY.filter(c => c.ownershipType.includes('Private')).length;
  const jvCount = CHINESE_COMPANIES_BY_COUNTRY.filter(c => c.ownershipType.includes('Joint Venture')).length;

  // CSV Export Handler
  const handleExportCsv = () => {
    const headers = ['Company Name', 'Chinese Name', 'Acronym', 'Host Country', 'Primary Sector', 'Ownership Type', 'China HQ', 'Investment Scale', 'Status', 'Flagship Projects', 'Key Economic Impact'];
    const rows = filteredCompanies.map(c => [
      `"${c.companyName}"`,
      `"${c.chineseName || ''}"`,
      `"${c.acronym || ''}"`,
      `"${c.country}"`,
      `"${c.primarySector}"`,
      `"${c.ownershipType}"`,
      `"${c.headquartersChina}"`,
      `"${c.investmentScaleUSD}"`,
      `"${c.status}"`,
      `"${c.flagshipProjects.join('; ')}"`,
      `"${c.keyImpact.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Chinese_Companies_Africa_By_Country_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-600/10 text-red-800 border border-red-200 text-xs font-mono font-bold rounded-xl flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-red-700" />
                Enterprise Directory & Host Country Mapping
              </span>
              <span className="text-[10px] font-mono text-brand-dim">Bilateral Corporate Footprint</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-text font-display">
              Chinese Enterprises by African Host Country
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted max-w-3xl leading-relaxed">
              Comprehensive directory of major State-Owned Enterprises (SOEs), Private Sector Champions (POEs), and Strategic Joint Ventures driving critical minerals extraction, rail and deepwater port infrastructure, clean energy grids, and manufacturing clusters across Africa.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center">
            <button
              onClick={handleExportCsv}
              className="px-3.5 py-2 bg-white hover:bg-slate-50 text-brand-text border border-brand-border rounded-xl text-xs font-mono font-semibold transition cursor-pointer flex items-center gap-2 shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-red-700" />
              <span>Export Companies (.CSV)</span>
            </button>
          </div>
        </div>

        {/* Quick Macro KPI Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-brand-border/40">
          <div className="p-3 bg-white/70 rounded-2xl border border-brand-border/40 space-y-0.5">
            <div className="text-[10px] font-mono text-brand-dim uppercase tracking-wider">Tracked Enterprises</div>
            <div className="text-lg font-bold text-brand-text font-display flex items-baseline gap-1.5">
              <span>{totalTracked}</span>
              <span className="text-[10px] text-emerald-700 font-mono font-medium">Major Conglomerates</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 rounded-2xl border border-brand-border/40 space-y-0.5">
            <div className="text-[10px] font-mono text-brand-dim uppercase tracking-wider">Host Jurisdictions</div>
            <div className="text-lg font-bold text-teal-800 font-display flex items-baseline gap-1.5">
              <span>{uniqueNationsCount}</span>
              <span className="text-[10px] text-brand-dim font-mono">Sovereign States</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 rounded-2xl border border-brand-border/40 space-y-0.5">
            <div className="text-[10px] font-mono text-brand-dim uppercase tracking-wider">Ownership Profile</div>
            <div className="text-xs font-bold text-brand-text font-mono flex items-center gap-1.5 pt-1">
              <span className="text-amber-800">{soeCount} SOEs</span>
              <span className="text-brand-dim">•</span>
              <span className="text-emerald-800">{poeCount} POEs</span>
              <span className="text-brand-dim">•</span>
              <span className="text-indigo-800">{jvCount} JVs</span>
            </div>
          </div>

          <div className="p-3 bg-white/70 rounded-2xl border border-brand-border/40 space-y-0.5">
            <div className="text-[10px] font-mono text-brand-dim uppercase tracking-wider">Strategic Focus</div>
            <div className="text-xs font-bold text-red-800 font-display pt-1">
              Minerals • Rail/Ports • Power • Tech
            </div>
          </div>
        </div>
      </div>

      {/* Filter Toolbar & Search Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-dim pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, Chinese character, country, sector, or project..."
              className="w-full pl-9 pr-4 py-2 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text placeholder-brand-dim focus:outline-none focus:ring-1 focus:ring-red-600 focus:border-red-600 transition"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-brand-dim hover:text-brand-text cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-brand-border/40 self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('country')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'country'
                  ? 'bg-white text-brand-text shadow-2xs font-bold'
                  : 'text-brand-dim hover:text-brand-text'
              }`}
            >
              <Flag className="w-3.5 h-3.5 text-red-700" />
              <span>By Country</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-brand-text shadow-2xs font-bold'
                  : 'text-brand-dim hover:text-brand-text'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-teal-700" />
              <span>Card Grid</span>
            </button>

            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-white text-brand-text shadow-2xs font-bold'
                  : 'text-brand-dim hover:text-brand-text'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5 text-indigo-700" />
              <span>Table</span>
            </button>
          </div>
        </div>

        {/* Multi-Filter Bar: Country / Sector / Ownership */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-brand-border/30">
          <div className="flex items-center gap-1.5 text-xs text-brand-dim font-mono mr-1">
            <Filter className="w-3.5 h-3.5 text-brand-dim" />
            <span>Filters:</span>
          </div>

          {/* Country Filter Select */}
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
          >
            <option value="all">All Countries ({allCountries.length})</option>
            {allCountries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Sector Filter Select */}
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
          >
            <option value="all">All Sectors ({allSectors.length})</option>
            {allSectors.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Ownership Filter Select */}
          <select
            value={selectedOwnership}
            onChange={(e) => setSelectedOwnership(e.target.value)}
            className="px-3 py-1.5 text-xs font-mono bg-white border border-brand-border rounded-xl text-brand-text focus:outline-none focus:ring-1 focus:ring-red-600 cursor-pointer"
          >
            <option value="all">All Ownership Types</option>
            <option value="SOE">State-Owned Enterprises (SOE)</option>
            <option value="POE">Private Enterprises (POE)</option>
            <option value="JV">Joint Ventures / Mixed</option>
          </select>

          {(selectedCountry !== 'all' || selectedSector !== 'all' || selectedOwnership !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCountry('all');
                setSelectedSector('all');
                setSelectedOwnership('all');
                setSearchQuery('');
              }}
              className="px-2.5 py-1 text-[11px] font-mono text-red-700 hover:text-red-900 underline ml-auto cursor-pointer"
            >
              Reset Filters
            </button>
          )}

          <span className="text-[11px] font-mono text-brand-dim ml-auto">
            Showing <strong className="text-brand-text">{filteredCompanies.length}</strong> of {totalTracked} listings
          </span>
        </div>

        {/* Quick Country Pills Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-xs">
          <button
            onClick={() => setSelectedCountry('all')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] whitespace-nowrap transition cursor-pointer ${
              selectedCountry === 'all'
                ? 'bg-red-700 text-white font-bold'
                : 'bg-white/80 hover:bg-white text-brand-dim border border-brand-border/50'
            }`}
          >
            All Host Nations ({CHINESE_COMPANIES_BY_COUNTRY.length})
          </button>
          {allCountries.map(country => {
            const count = CHINESE_COMPANIES_BY_COUNTRY.filter(c => c.country === country).length;
            const isSelected = selectedCountry === country;
            return (
              <button
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`px-2.5 py-1 rounded-lg font-mono text-[11px] whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-red-700 text-white font-bold shadow-2xs'
                    : 'bg-white/80 hover:bg-white text-brand-text border border-brand-border/50'
                }`}
              >
                <span>{country}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-brand-dim'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. VIEW MODE: GROUPED BY COUNTRY */}
      {viewMode === 'country' && (
        <div className="space-y-8">
          {Object.keys(companiesByCountry).length === 0 ? (
            <div className="glass-panel rounded-3xl p-12 text-center space-y-3">
              <Building2 className="w-10 h-10 mx-auto text-brand-dim/50" />
              <div className="text-base font-bold text-brand-text">No enterprises match your active filter criteria</div>
              <p className="text-xs text-brand-muted max-w-sm mx-auto">
                Try resetting your search query or selecting "All Countries" and "All Sectors".
              </p>
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setSelectedSector('all');
                  setSelectedOwnership('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-red-700 text-white text-xs font-semibold rounded-xl hover:bg-red-800 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            Object.entries(companiesByCountry).map(([countryName, companies]) => (
              <div key={countryName} className="glass-panel rounded-3xl p-6 sm:p-7 space-y-5 border border-brand-border/60">
                {/* Country Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-brand-border/40">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-red-600/10 text-red-700 rounded-2xl border border-red-200/60 font-bold font-mono text-sm">
                      <Flag className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-brand-text font-display">
                          {countryName}
                        </h4>
                        <span className="px-2 py-0.5 bg-slate-100 text-brand-dim text-[10px] font-mono font-bold rounded-md">
                          {companies.length} Active {companies.length === 1 ? 'Conglomerate' : 'Conglomerates'}
                        </span>
                      </div>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Key Chinese investment footprint, state concessions, and strategic manufacturing assets.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-brand-dim">Primary Sectors:</span>
                    <span className="font-bold text-brand-text">
                      {Array.from(new Set(companies.map(c => c.primarySector))).slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>

                {/* Country Enterprises Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="bg-white/90 rounded-2xl p-5 border border-brand-border/50 hover:border-red-600/40 hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-3">
                        {/* Card Top: Badges & Status */}
                        <div className="flex items-start justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono ${
                            company.ownershipType.includes('State-Owned') 
                              ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                              : company.ownershipType.includes('Private')
                              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                              : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                          }`}>
                            {company.ownershipType.includes('State-Owned') ? 'SOE' : company.ownershipType.includes('Private') ? 'POE' : 'JV'}
                          </span>

                          <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold rounded-md">
                            {company.investmentScaleUSD}
                          </span>
                        </div>

                        {/* Company Names */}
                        <div>
                          <div className="flex items-baseline justify-between gap-1">
                            <h5 className="text-sm font-bold text-brand-text font-display leading-snug">
                              {company.companyName}
                            </h5>
                          </div>
                          {company.chineseName && (
                            <div className="flex items-center gap-2 text-xs font-mono text-brand-dim mt-0.5">
                              <span className="text-red-700 font-semibold">{company.chineseName}</span>
                              {company.acronym && <span>• {company.acronym}</span>}
                            </div>
                          )}
                        </div>

                        {/* Sector & HQ Tag */}
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-1.5 text-teal-800 font-medium">
                            <Layers className="w-3.5 h-3.5 shrink-0" />
                            <span>{company.primarySector}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-brand-dim text-[11px] font-mono">
                            <MapPin className="w-3 h-3 shrink-0 text-red-600" />
                            <span>HQ: {company.headquartersChina}</span>
                          </div>
                        </div>

                        {/* Flagship Projects */}
                        <div className="space-y-1.5 pt-2 border-t border-brand-border/30">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim font-bold block">
                            Flagship Assets & Concessions:
                          </span>
                          <ul className="space-y-1 text-xs text-brand-text">
                            {company.flagshipProjects.map((proj, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                                <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                                <span className="text-slate-800 text-[11px]">{proj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Economic Impact Footer Note */}
                      <div className="pt-3 border-t border-brand-border/20 text-[11px] text-brand-muted leading-relaxed italic bg-slate-50/70 p-2.5 rounded-xl">
                        "{company.keyImpact}"
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 2. VIEW MODE: CARD GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="glass-panel rounded-2xl p-5 border border-brand-border/50 hover:border-red-600/40 hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 bg-red-50 text-red-800 border border-red-200 text-[10px] font-bold font-mono rounded-md">
                      {company.country}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono ${
                      company.ownershipType.includes('State-Owned') 
                        ? 'bg-amber-50 text-amber-900 border border-amber-200' 
                        : company.ownershipType.includes('Private')
                        ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                        : 'bg-indigo-50 text-indigo-900 border border-indigo-200'
                    }`}>
                      {company.ownershipType.includes('State-Owned') ? 'SOE' : company.ownershipType.includes('Private') ? 'POE' : 'JV'}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono font-semibold rounded-md">
                    {company.investmentScaleUSD}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-brand-text font-display leading-snug">
                    {company.companyName}
                  </h5>
                  {company.chineseName && (
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-dim mt-0.5">
                      <span className="text-red-700 font-semibold">{company.chineseName}</span>
                      {company.acronym && <span>• {company.acronym}</span>}
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-teal-800 font-medium">
                    <Layers className="w-3.5 h-3.5 shrink-0" />
                    <span>{company.primarySector}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-dim text-[11px] font-mono">
                    <MapPin className="w-3 h-3 shrink-0 text-red-600" />
                    <span>HQ: {company.headquartersChina}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-brand-border/30">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim font-bold block">
                    Flagship Assets:
                  </span>
                  <ul className="space-y-1 text-xs text-brand-text">
                    {company.flagshipProjects.map((proj, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 leading-relaxed">
                        <span className="text-red-600 font-bold shrink-0 mt-0.5">•</span>
                        <span className="text-slate-800 text-[11px]">{proj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-brand-border/20 text-[11px] text-brand-muted leading-relaxed italic bg-slate-50/70 p-2.5 rounded-xl">
                "{company.keyImpact}"
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 3. VIEW MODE: TABULAR MATRIX */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/40 pb-4">
            <div>
              <h4 className="text-base font-bold text-brand-text font-display">
                Tabular Registry of Chinese Enterprises Operating in Africa
              </h4>
              <p className="text-xs text-brand-muted mt-0.5">
                Structured multi-attribute dataset with investment scale and ownership classifications.
              </p>
            </div>
            <span className="text-xs font-mono text-brand-dim">
              {filteredCompanies.length} records active
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-brand-border/40 bg-white/90 shadow-2xs">
            <table className="w-full text-left font-mono text-xs">
              <thead className="bg-slate-100 text-brand-dim border-b border-brand-border/40">
                <tr>
                  <th className="py-3 px-4 font-semibold text-brand-text">Company Name & Acronym</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Chinese Name</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Host Country</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Primary Sector</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Ownership</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">HQ China</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Est. Investment</th>
                  <th className="py-3 px-4 font-semibold text-brand-text">Flagship Concessions / Assets</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/20 text-brand-text">
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-red-500/5 transition">
                    <td className="py-3 px-4 font-bold font-sans text-brand-text">
                      <div>{company.companyName}</div>
                      {company.acronym && <div className="text-[10px] text-brand-dim font-mono">{company.acronym}</div>}
                    </td>
                    <td className="py-3 px-4 font-semibold text-red-700">
                      {company.chineseName || '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-brand-text text-[11px] font-bold rounded-md">
                        {company.country}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-teal-800 text-[11px]">
                      {company.primarySector}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        company.ownershipType.includes('State-Owned') 
                          ? 'bg-amber-100 text-amber-900' 
                          : company.ownershipType.includes('Private')
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-indigo-100 text-indigo-900'
                      }`}>
                        {company.ownershipType.includes('State-Owned') ? 'SOE' : company.ownershipType.includes('Private') ? 'POE' : 'JV'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-brand-muted text-[11px]">
                      {company.headquartersChina}
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-900 text-[11px]">
                      {company.investmentScaleUSD}
                    </td>
                    <td className="py-3 px-4 text-brand-muted text-[11px] max-w-xs truncate">
                      {company.flagshipProjects.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

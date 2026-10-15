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
  Table as TableIcon,
  LayoutGrid,
  Flag,
  Landmark
} from 'lucide-react';
import { 
  EUROPEAN_COMPANIES_BY_COUNTRY, 
  EuropeanCompanyPresence 
} from '../data/europeAfricaFdiData';

export const EuropeanCompaniesSection: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedHomeCountry, setSelectedHomeCountry] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedOwnership, setSelectedOwnership] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'country' | 'grid' | 'table'>('country');

  // Extract unique host countries list
  const allHostCountries = useMemo(() => {
    const countriesSet = new Set<string>();
    EUROPEAN_COMPANIES_BY_COUNTRY.forEach(c => {
      countriesSet.add(c.country);
    });
    return Array.from(countriesSet).sort();
  }, []);

  // Extract unique European home countries list
  const allHomeCountries = useMemo(() => {
    const set = new Set<string>();
    EUROPEAN_COMPANIES_BY_COUNTRY.forEach(c => {
      set.add(c.homeCountry);
    });
    return Array.from(set).sort();
  }, []);

  // Extract unique sectors list
  const allSectors = useMemo(() => {
    const sectorsSet = new Set<string>();
    EUROPEAN_COMPANIES_BY_COUNTRY.forEach(c => {
      sectorsSet.add(c.primarySector);
    });
    return Array.from(sectorsSet).sort();
  }, []);

  // Helper for home country flag
  const getCountryFlag = (homeCountry: string) => {
    if (homeCountry.includes('France')) return '🇫🇷';
    if (homeCountry.includes('Germany')) return '🇩🇪';
    if (homeCountry.includes('United Kingdom')) return '🇬🇧';
    if (homeCountry.includes('Italy')) return '🇮🇹';
    if (homeCountry.includes('Netherlands')) return '🇳🇱';
    if (homeCountry.includes('Spain')) return '🇪🇸';
    if (homeCountry.includes('Switzerland')) return '🇨🇭';
    if (homeCountry.includes('Denmark')) return '🇩🇰';
    if (homeCountry.includes('Belgium')) return '🇧🇪';
    if (homeCountry.includes('Portugal')) return '🇵🇹';
    return '🇪🇺';
  };

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    return EUROPEAN_COMPANIES_BY_COUNTRY.filter(company => {
      // Host Country match
      if (selectedCountry !== 'all' && company.country !== selectedCountry) {
        return false;
      }
      // Home Country match
      if (selectedHomeCountry !== 'all' && !company.homeCountry.includes(selectedHomeCountry)) {
        return false;
      }
      // Sector match
      if (selectedSector !== 'all' && company.primarySector !== selectedSector) {
        return false;
      }
      // Ownership match
      if (selectedOwnership !== 'all') {
        if (selectedOwnership === 'Public' && !company.ownershipType.includes('Public')) return false;
        if (selectedOwnership === 'JV' && !company.ownershipType.includes('Joint Venture')) return false;
        if (selectedOwnership === 'Private' && !company.ownershipType.includes('Private')) return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = company.companyName.toLowerCase().includes(q);
        const matchesHome = company.homeCountry.toLowerCase().includes(q);
        const matchesCity = company.homeCityHq.toLowerCase().includes(q);
        const matchesCountry = company.country.toLowerCase().includes(q);
        const matchesSector = company.primarySector.toLowerCase().includes(q);
        const matchesProjects = company.flagshipProjects.some(p => p.toLowerCase().includes(q));
        const matchesImpact = company.keyImpact.toLowerCase().includes(q);

        return matchesName || matchesHome || matchesCity || matchesCountry || matchesSector || matchesProjects || matchesImpact;
      }
      return true;
    });
  }, [selectedCountry, selectedHomeCountry, selectedSector, selectedOwnership, searchQuery]);

  // Group companies by host country for 'country' view
  const companiesByCountry = useMemo(() => {
    const grouped: Record<string, EuropeanCompanyPresence[]> = {};
    filteredCompanies.forEach(company => {
      if (!grouped[company.country]) {
        grouped[company.country] = [];
      }
      grouped[company.country].push(company);
    });
    return grouped;
  }, [filteredCompanies]);

  // Key metrics calculation
  const totalTracked = EUROPEAN_COMPANIES_BY_COUNTRY.length;
  const uniqueNationsCount = allHostCountries.length;
  const publicCount = EUROPEAN_COMPANIES_BY_COUNTRY.filter(c => c.ownershipType.includes('Public')).length;
  const jvCount = EUROPEAN_COMPANIES_BY_COUNTRY.filter(c => c.ownershipType.includes('Joint Venture')).length;

  // CSV Export Handler
  const handleExportCsv = () => {
    const headers = ['Company Name', 'European Home Country', 'Headquarters City', 'Host Country', 'Primary Sector', 'Ownership Type', 'Investment Scale', 'Status', 'Flagship Projects', 'Key Economic Impact'];
    const rows = filteredCompanies.map(c => [
      `"${c.companyName}"`,
      `"${c.homeCountry}"`,
      `"${c.homeCityHq}"`,
      `"${c.country}"`,
      `"${c.primarySector}"`,
      `"${c.ownershipType}"`,
      `"${c.investmentScaleUSD}"`,
      `"${c.status}"`,
      `"${c.flagshipProjects.join('; ')}"`,
      `"${c.keyImpact.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `European_Multinationals_Africa_Presence_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden border-l-4 border-l-blue-600 bg-blue-500/5 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-600/10 text-blue-900 border border-blue-600/20">
                European Corporate Footprint
              </span>
              <span className="text-[10px] font-mono text-brand-dim">
                Global Gateway & Team Europe Tracked
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-text font-display flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-blue-700" />
              European Multinationals & Joint Ventures Across Africa
            </h3>
            <p className="text-xs text-brand-muted max-w-3xl leading-relaxed">
              Granular surveillance of premier European enterprises (FTSE 100, CAC 40, DAX 40, Euronext, and bilateral consortia) deploying direct equity, industrial factories, energy infrastructure, and logistics corridors across sovereign African hosts.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-brand-text border border-brand-border shadow-2xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-blue-700" />
              <span>Export Companies CSV</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-white/80 p-3.5 rounded-2xl border border-brand-border/40 font-mono">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Tracked Conglomerates</span>
            <div className="text-xl font-bold text-brand-text mt-0.5">{totalTracked} Enterprises</div>
            <span className="text-[10px] text-blue-700 font-sans block mt-0.5">Top European Majors</span>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-brand-border/40 font-mono">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">African Host Nations</span>
            <div className="text-xl font-bold text-emerald-800 mt-0.5">{uniqueNationsCount} Sovereigns</div>
            <span className="text-[10px] text-brand-dim font-sans block mt-0.5">Primary Investment Hubs</span>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-brand-border/40 font-mono">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Public Multinationals</span>
            <div className="text-xl font-bold text-blue-800 mt-0.5">{publicCount} Listed</div>
            <span className="text-[10px] text-brand-dim font-sans block mt-0.5">CAC 40, DAX, FTSE Listed</span>
          </div>

          <div className="bg-white/80 p-3.5 rounded-2xl border border-brand-border/40 font-mono">
            <span className="text-[10px] text-brand-dim uppercase tracking-wider block">Joint Ventures & Consortia</span>
            <div className="text-xl font-bold text-purple-800 mt-0.5">{jvCount} Consortia</div>
            <span className="text-[10px] text-brand-dim font-sans block mt-0.5">Global Gateway / Public-Private</span>
          </div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-4 border border-brand-border/60 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-brand-dim absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by company name, home country, African host, sector, or project..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-brand-border/60 rounded-xl text-xs text-brand-text placeholder-brand-dim/70 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto shrink-0">
            <button
              onClick={() => setViewMode('country')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'country'
                  ? 'bg-white text-blue-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>By Host Country</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Card Grid</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table'
                  ? 'bg-white text-blue-800 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Data Table</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1 text-xs">
          {/* African Host Country Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-brand-dim shrink-0">Host:</span>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full bg-slate-50 border border-brand-border/60 rounded-xl px-2.5 py-1.5 text-xs text-brand-text focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All African Host Countries ({uniqueNationsCount})</option>
              {allHostCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* European Origin Country Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-brand-dim shrink-0">Origin:</span>
            <select
              value={selectedHomeCountry}
              onChange={(e) => setSelectedHomeCountry(e.target.value)}
              className="w-full bg-slate-50 border border-brand-border/60 rounded-xl px-2.5 py-1.5 text-xs text-brand-text focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All European Origins</option>
              {allHomeCountries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Sector Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-brand-dim shrink-0">Sector:</span>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-slate-50 border border-brand-border/60 rounded-xl px-2.5 py-1.5 text-xs text-brand-text focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Sectors ({allSectors.length})</option>
              {allSectors.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Ownership Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-semibold text-brand-dim shrink-0">Type:</span>
            <select
              value={selectedOwnership}
              onChange={(e) => setSelectedOwnership(e.target.value)}
              className="w-full bg-slate-50 border border-brand-border/60 rounded-xl px-2.5 py-1.5 text-xs text-brand-text focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Corporate Structures</option>
              <option value="Public">Public Multinational (Listed)</option>
              <option value="JV">Joint Venture / Consortium</option>
              <option value="Private">Private Conglomerate</option>
            </select>
          </div>
        </div>

        {/* Showing Filter Results Summary */}
        <div className="flex items-center justify-between text-[11px] text-brand-dim pt-1 border-t border-brand-border/30">
          <span>
            Showing <strong className="text-brand-text font-semibold">{filteredCompanies.length}</strong> of {totalTracked} European corporate presences
          </span>
          {(selectedCountry !== 'all' || selectedHomeCountry !== 'all' || selectedSector !== 'all' || selectedOwnership !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCountry('all');
                setSelectedHomeCountry('all');
                setSelectedSector('all');
                setSelectedOwnership('all');
                setSearchQuery('');
              }}
              className="text-blue-700 hover:text-blue-900 font-semibold cursor-pointer underline"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: GROUPED BY AFRICAN HOST COUNTRY */}
      {viewMode === 'country' && (
        <div className="space-y-6">
          {Object.keys(companiesByCountry).length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-brand-border/60 text-brand-muted text-xs">
              No European companies found matching the specified filter criteria.
            </div>
          ) : (
            Object.entries(companiesByCountry).map(([countryName, companies]) => (
              <div key={countryName} className="bg-white rounded-3xl p-6 border border-brand-border/60 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-brand-border/40 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-blue-50 text-blue-800 rounded-xl border border-blue-200">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-brand-text font-display">
                        {countryName}
                      </h4>
                      <span className="text-[11px] text-brand-dim font-mono">
                        {companies.length} Major European Investment Presence{companies.length > 1 ? 's' : ''} Tracked
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {companies.map(company => (
                    <div
                      key={company.id}
                      className="bg-slate-50/70 hover:bg-slate-50 p-4 rounded-2xl border border-slate-200/80 transition-all space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-semibold">{getCountryFlag(company.homeCountry)}</span>
                            <h5 className="text-sm font-bold text-brand-text">
                              {company.companyName}
                            </h5>
                          </div>
                          <span className="text-[11px] text-brand-dim block font-mono">
                            {company.homeCountry} ({company.homeCityHq}) • {company.ownershipType.split('(')[0]}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100/80 text-blue-900 border border-blue-200 shrink-0">
                          {company.investmentScaleUSD}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded-md text-brand-text font-semibold">
                          {company.primarySector}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md ${
                          company.status === 'Operational'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold'
                            : company.status === 'Expanding'
                            ? 'bg-blue-50 text-blue-800 border border-blue-200 font-semibold'
                            : 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold'
                        }`}>
                          {company.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <span className="text-[10px] font-bold text-brand-dim uppercase tracking-wider block font-mono">
                          Flagship Concessions & Operations
                        </span>
                        <ul className="space-y-1 text-brand-muted text-[11px]">
                          {company.flagshipProjects.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-blue-600 font-bold shrink-0">•</span>
                              <span className="leading-snug">{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] text-blue-950/80 leading-relaxed">
                        <strong className="text-blue-900 font-semibold">Economic Impact: </strong>
                        {company.keyImpact}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* VIEW MODE 2: CARD GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map(company => (
            <div
              key={company.id}
              className="bg-white rounded-2xl p-5 border border-brand-border/60 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-sm">{getCountryFlag(company.homeCountry)}</span>
                      <h4 className="text-sm font-bold text-brand-text leading-tight">
                        {company.companyName}
                      </h4>
                    </div>
                    <span className="text-[10px] text-brand-dim font-mono block mt-0.5">
                      {company.homeCountry} ({company.homeCityHq})
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100/80 text-blue-900 border border-blue-200 shrink-0">
                    {company.investmentScaleUSD}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono">
                  <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-md text-brand-text font-semibold flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5 text-blue-700" />
                    {company.country}
                  </span>
                  <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-md text-brand-dim">
                    {company.primarySector}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-brand-dim uppercase tracking-wider block">
                    Flagship Projects
                  </span>
                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed">
                    {company.flagshipProjects.join(' • ')}
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/60 text-[11px] text-brand-muted leading-snug">
                <strong className="text-brand-text font-semibold">Impact: </strong>
                {company.keyImpact}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 3: DATA TABLE */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-3xl border border-brand-border/60 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/80 text-brand-dim font-mono uppercase text-[10px] tracking-wider border-b border-brand-border/50">
                <tr>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">European HQ</th>
                  <th className="py-3 px-4">Host African Country</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4">Investment Scale</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Flagship Concession</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/30 text-brand-text">
                {filteredCompanies.map(company => (
                  <tr key={company.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-bold text-brand-text">
                      <div className="flex items-center gap-2">
                        <span>{getCountryFlag(company.homeCountry)}</span>
                        <span>{company.companyName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-brand-muted">
                      {company.homeCountry} ({company.homeCityHq})
                    </td>
                    <td className="py-3 px-4 font-semibold text-blue-900">
                      {company.country}
                    </td>
                    <td className="py-3 px-4 text-brand-muted">
                      {company.primarySector}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-800">
                      {company.investmentScaleUSD}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        company.status === 'Operational'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : company.status === 'Expanding'
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-brand-muted text-[11px] max-w-xs truncate" title={company.flagshipProjects.join('; ')}>
                      {company.flagshipProjects[0]}
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

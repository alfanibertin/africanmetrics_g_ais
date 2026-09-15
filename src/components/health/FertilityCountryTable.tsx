import React, { useState, useMemo } from 'react';
import {
  CountryFertilityRecord,
  AFRICAN_FERTILITY_DATA,
  DemographicStage,
} from '../../data/healthFertilityData';
import {
  Search,
  Filter,
  ArrowUpDown,
  Download,
  Check,
  TrendingDown,
  TrendingUp,
  Minus,
  Sparkles,
  Info,
} from 'lucide-react';

interface FertilityCountryTableProps {
  onSelectCountry?: (countryId: string) => void;
  selectedCountryId?: string;
}

export const FertilityCountryTable: React.FC<FertilityCountryTableProps> = ({
  onSelectCountry,
  selectedCountryId,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [sortField, setSortField] = useState<'rate' | 'name' | 'change' | 'rank'>('rate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort the dataset
  const filteredCountries = useMemo(() => {
    let list = [...AFRICAN_FERTILITY_DATA];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.iso3.toLowerCase().includes(q) ||
          c.region.toLowerCase().includes(q)
      );
    }

    // Region filter
    if (selectedRegion !== 'all') {
      list = list.filter((c) => c.region.toLowerCase() === selectedRegion.toLowerCase());
    }

    // Stage filter
    if (selectedStage !== 'all') {
      list = list.filter((c) => c.stage === selectedStage);
    }

    // Sorting
    list.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'rate') {
        comparison = a.latestRate - b.latestRate;
      } else if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortField === 'change') {
        comparison = a.netChange2000toLatest - b.netChange2000toLatest;
      } else if (sortField === 'rank') {
        comparison = a.latestRate - b.latestRate;
      }
      return sortDirection === 'desc' ? -comparison : comparison;
    });

    return list;
  }, [searchTerm, selectedRegion, selectedStage, sortField, sortDirection]);

  // CSV Export for Fertility data
  const handleExportCSV = () => {
    const headers = [
      'Country',
      'ISO3',
      'Region',
      'Latest Fertility Rate (Births/Woman)',
      'Reporting Year',
      'Rate 2020',
      'Rate 2010',
      'Rate 2000',
      'Rate 1990',
      'Net Change (2000 to Latest)',
      'Demographic Stage',
      'Source Indicator'
    ];

    const rows = filteredCountries.map((c) => [
      c.name,
      c.iso3,
      c.region,
      c.latestRate,
      c.latestYear,
      c.rate2020,
      c.rate2010,
      c.rate2000,
      c.rate1990,
      c.netChange2000toLatest,
      c.stage,
      'World Bank SP.DYN.TFRT.IN'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row
          .map((val) => {
            const str = String(val);
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `worldbank_africa_fertility_rates_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleSort = (field: 'rate' | 'name' | 'change' | 'rank') => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getStageBadgeColor = (stage: DemographicStage) => {
    switch (stage) {
      case 'High Fertility (Pre-Transition)':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      case 'Early Transition':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Advanced Transition':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Sub-Replacement':
        return 'bg-sky-50 text-sky-800 border-sky-200/80';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header & Meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider">
              Sovereign Registry • 54 Nations
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Total Fertility Rate by African Nation
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Official World Bank Indicator <code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">SP.DYN.TFRT.IN</code> measuring births per woman across sub-Saharan and North African economies.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export Fertility Dataset (CSV)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search country, ISO code, or region..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>

        {/* Region & Stage Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Region selector */}
          <div className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-xl border border-slate-200/80 text-xs">
            {['all', 'Western', 'Eastern', 'Central', 'Northern', 'Southern'].map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer text-[11px] ${
                  selectedRegion.toLowerCase() === reg.toLowerCase()
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {reg === 'all' ? 'All Africa' : reg}
              </button>
            ))}
          </div>

          {/* Demographic Stage Filter */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value)}
            aria-label="Filter by Demographic Stage"
            className="px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
          >
            <option value="all">All Demographic Stages</option>
            <option value="High Fertility (Pre-Transition)">High Fertility (&gt; 5.0)</option>
            <option value="Early Transition">Early Transition (3.0 – 5.0)</option>
            <option value="Advanced Transition">Advanced Transition (2.1 – 3.0)</option>
            <option value="Sub-Replacement">Sub-Replacement (&lt; 2.1)</option>
          </select>
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>
          Showing <strong>{filteredCountries.length}</strong> of 54 African Sovereign States
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          Click any nation row to inspect trajectory on time-series chart
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-600">
            <tr>
              <th
                onClick={() => toggleSort('rank')}
                className="px-4 py-3.5 font-bold cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>#</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => toggleSort('name')}
                className="px-4 py-3.5 font-bold cursor-pointer hover:text-slate-900 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Sovereign State</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="px-4 py-3.5 font-bold">Region</th>
              <th
                onClick={() => toggleSort('rate')}
                className="px-4 py-3.5 font-bold cursor-pointer hover:text-slate-900 select-none text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Latest Rate (Births/Woman)</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="px-4 py-3.5 font-bold text-right">2000 Baseline</th>
              <th
                onClick={() => toggleSort('change')}
                className="px-4 py-3.5 font-bold cursor-pointer hover:text-slate-900 select-none text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Net Change</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="px-4 py-3.5 font-bold">Demographic Stage</th>
              <th className="px-4 py-3.5 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {filteredCountries.map((c, idx) => {
              const isSelected = c.id === selectedCountryId;
              const isNegative = c.netChange2000toLatest < 0;
              const isZero = c.netChange2000toLatest === 0;

              return (
                <tr
                  key={c.id}
                  onClick={() => onSelectCountry && onSelectCountry(c.id)}
                  className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                    isSelected ? 'bg-emerald-50/50 font-semibold' : ''
                  }`}
                >
                  <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">
                    {idx + 1}
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{c.flag}</span>
                      <div>
                        <div className="text-xs font-bold text-slate-900">{c.name}</div>
                        <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1 py-0.2 rounded">
                          {c.iso3}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium">
                      {c.region}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`font-mono text-sm font-bold px-2 py-0.5 rounded-lg ${
                        c.latestRate >= 5.0
                          ? 'text-rose-700 bg-rose-50 border border-rose-200/50'
                          : c.latestRate >= 3.0
                          ? 'text-amber-700 bg-amber-50 border border-amber-200/50'
                          : c.latestRate >= 2.1
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/50'
                          : 'text-sky-700 bg-sky-50 border border-sky-200/50'
                      }`}
                    >
                      {c.latestRate.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-slate-500 text-xs">
                    {c.rate2000.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1 font-mono text-xs font-semibold">
                      {isNegative ? (
                        <span className="text-emerald-700 flex items-center gap-0.5">
                          <TrendingDown className="w-3.5 h-3.5" />
                          {c.netChange2000toLatest.toFixed(2)}
                        </span>
                      ) : isZero ? (
                        <span className="text-slate-400 flex items-center gap-0.5">
                          <Minus className="w-3 h-3" />
                          0.00
                        </span>
                      ) : (
                        <span className="text-amber-700 flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          +{c.netChange2000toLatest.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${getStageBadgeColor(
                        c.stage
                      )}`}
                    >
                      {c.stage}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectCountry) onSelectCountry(c.id);
                      }}
                      className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isSelected ? 'Viewing' : 'Inspect'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

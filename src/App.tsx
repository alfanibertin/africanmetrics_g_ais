import React, { useState, useMemo } from 'react';
import {
  Globe,
  DollarSign,
  Users,
  Landmark,
  TrendingUp,
  ArrowUpRight,
  Download,
  RefreshCw,
  Search,
  ChevronRight,
  Info,
  Loader2,
  Sparkles,
  Shield,
  FileText,
  Anchor,
  Truck,
  Percent,
  ShieldAlert,
  Wrench,
  Briefcase,
} from 'lucide-react';
import { COUNTRIES, REGIONAL_SCREENSHOT_VALUES, getCountryFlag, getCountryISO2 } from './data';
import { Country } from './types';
import AfricaMap from './components/AfricaMap';
import AIAnalyzer from './components/AIAnalyzer';
import DashboardCharts from './components/DashboardCharts';
import NewsBulletins, { Bulletin } from './components/NewsBulletins';
import SahelDeepSeekAI from './components/SahelDeepSeekAI';
import { AESTradeWITS } from './components/AESTradeWITS';
import { CountryFlag } from './components/CountryFlag';
import { AESFlagIcon } from './components/AESFlagIcon';

const aesBudgetProfiles: Record<string, {
  revenueFCFA: string;
  revenueUSD: string;
  expenseFCFA: string;
  expenseUSD: string;
  deficitFCFA: string;
  deficitUSD: string;
  deficitPercentGDP: string;
  externalDebtFCFA: string;
  externalDebtUSD: string;
  internalDebtFCFA: string;
  internalDebtUSD: string;
  source: string;
  fiscalYear: string;
}> = {
  'burkina-faso': {
    revenueFCFA: '3,016 Billion',
    revenueUSD: '$5.03 Billion',
    expenseFCFA: '3,745 Billion',
    expenseUSD: '$6.24 Billion',
    deficitFCFA: '-729 Billion',
    deficitUSD: '-$1.21 Billion',
    deficitPercentGDP: '-5.1%',
    externalDebtFCFA: '3,720 Billion',
    externalDebtUSD: '$6.20 Billion',
    internalDebtFCFA: '2,280 Billion',
    internalDebtUSD: '$3.80 Billion',
    source: 'Burkina Faso Ministry of Economy, Finance & Development / IMF ECF Profile',
    fiscalYear: 'FY 2024/2025'
  },
  'mali': {
    revenueFCFA: '2,342 Billion',
    revenueUSD: '$3.90 Billion',
    expenseFCFA: '2,925 Billion',
    expenseUSD: '$4.88 Billion',
    deficitFCFA: '-583 Billion',
    deficitUSD: '-$0.97 Billion',
    deficitPercentGDP: '-4.7%',
    externalDebtFCFA: '4,080 Billion',
    externalDebtUSD: '$6.80 Billion',
    internalDebtFCFA: '2,340 Billion',
    internalDebtUSD: '$3.90 Billion',
    source: 'Mali Ministry of Economy & Finance / IMF Article IV Consultation',
    fiscalYear: 'FY 2024/2025'
  },
  'niger': {
    revenueFCFA: '1,850 Billion',
    revenueUSD: '$3.08 Billion',
    expenseFCFA: '2,420 Billion',
    expenseUSD: '$4.03 Billion',
    deficitFCFA: '-570 Billion',
    deficitUSD: '-$0.95 Billion',
    deficitPercentGDP: '-5.8%',
    externalDebtFCFA: '3,540 Billion',
    externalDebtUSD: '$5.90 Billion',
    internalDebtFCFA: '1,620 Billion',
    internalDebtUSD: '$2.70 Billion',
    source: 'Niger Ministry of Economy and Finance / World Bank Economic Update',
    fiscalYear: 'FY 2024/2025'
  }
};

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<'all' | 'sahel' | 'regional' | 'detail'>('all');
  
  // Core State
  const [countries, setCountries] = useState<Country[]>(COUNTRIES);
  const [selectedRegion, setSelectedRegion] = useState<'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern' | null>(null);
  const [chartTab, setChartTab] = useState<'gdp' | 'debt' | 'unemployment' | 'overview'>('gdp');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState('6/25/2026 at 6:05:33 AM');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Sorting State
  const [sortBy, setSortBy] = useState<'name' | 'gdp' | 'population' | 'unemployment' | 'growthRate' | 'year'>('name');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('asc');

  // Page 2: Sahel States State variables
  const [sahelTradeCorridor, setSahelTradeCorridor] = useState<'togo' | 'benin' | 'trans-sahara'>('togo');
  const [sahelSecurityBudgetRatio, setSahelSecurityBudgetRatio] = useState<number>(45);

  // Page 4: Detailed Country Profile State variables
  const [detailCountryId, setDetailCountryId] = useState<string>('nigeria');

  // Computed Values - Regional Averages for rendering (Matches screenshots)
  const regionsSummary = useMemo(() => {
    return Object.entries(REGIONAL_SCREENSHOT_VALUES).map(([name, val]) => ({
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
  }, []);

  // Filtered countries based on search and regional selection
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
      
      // Numbers sorting
      return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
    });
  }, [countries, selectedRegion, searchQuery, sortBy, sortOrder]);

  // Aggregate Totals - Displays matching screenshot values initially, updates if live data updates
  const totals = useMemo(() => {
    const initialTotals = {
      gdp: '2.67T',
      gdpGrowth: '+5.2%',
      population: '1.28B',
      populationGrowth: '+2.8%',
      budget: '0.13T',
      budgetGrowth: '+4.5%',
      countriesCount: 55
    };

    const hasUpdates = bulletins.length > 0;
    if (!hasUpdates) {
      return initialTotals;
    }

    const sumGdp = countries.reduce((acc, c) => acc + c.gdp, 0) / 1000;
    const sumPopulation = countries.reduce((acc, c) => acc + c.population, 0) / 1000;
    const sumBudget = countries.reduce((acc, c) => acc + c.budget, 0) / 1000;

    return {
      gdp: `${sumGdp.toFixed(2)}T`,
      gdpGrowth: '+5.4%',
      population: `${sumPopulation.toFixed(2)}B`,
      populationGrowth: '+2.9%',
      budget: `${sumBudget.toFixed(2)}T`,
      budgetGrowth: '+4.8%',
      countriesCount: 55
    };
  }, [countries, bulletins]);

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = ['Country Name', 'Region', 'GDP (Billion USD)', 'Population (Million)', 'Unemployment (%)', 'Debt-to-GDP (%)', 'Growth Rate (%)', 'Primary Sector Highlight'];
    const rows = countries.map(c => [
      c.name,
      c.region,
      c.gdp,
      c.population,
      c.unemployment,
      c.debtToGdp,
      c.growthRate,
      `"${c.highlight.replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `african_economic_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    triggerNotification('Economic database exported successfully in CSV format!');
  };

  // Reset/Refresh Data
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCountries(COUNTRIES);
      setBulletins([]);
      setLastUpdated('6/25/2026 at 6:05:33 AM');
      setSelectedRegion(null);
      setSearchQuery('');
      setSahelTradeCorridor('togo');
      setSahelSecurityBudgetRatio(45);
      setIsRefreshing(false);
      triggerNotification('Dashboard reset to certified baseline economic data.');
    }, 700);
  };

  // Update Economic Data (Server-side Gemini Integration)
  const handleUpdateEconomicData = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/update-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      
      if (data.success) {
        setLastUpdated(data.lastUpdated);
        setBulletins(data.bulletins);

        setCountries(prevCountries => {
          return prevCountries.map(c => {
            if (data.spotlightChanges[c.id]) {
              return {
                ...c,
                growthRate: data.spotlightChanges[c.id].growthRate,
                gdp: data.spotlightChanges[c.id].gdp,
              };
            }
            return c;
          });
        });

        triggerNotification('Successfully updated indicators and generated economic bulletins with Gemini!');
      } else {
        triggerNotification('Could not connect to Gemini update engine.');
      }
    } catch (e) {
      triggerNotification('Network error updating economic database.');
    } finally {
      setIsUpdating(false);
    }
  };

  const triggerNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 4000);
  };

  const handleSort = (field: 'name' | 'gdp' | 'population' | 'unemployment' | 'growthRate' | 'year') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  // Sahel AES states data mapping
  const aesStates = useMemo(() => {
    return countries.filter(c => ['burkina-faso', 'mali', 'niger'].includes(c.id));
  }, [countries]);

  // Simulated AES policy metrics based on corridor and budget slider inputs
  const sahelSimulationResults = useMemo(() => {
    let transportSurcharge = 0;
    let shippingTime = 0;
    let diplomaticRisk = '';
    let description = '';

    if (sahelTradeCorridor === 'togo') {
      transportSurcharge = 4.5;
      shippingTime = 12;
      diplomaticRisk = 'Low';
      description = 'Togo serves as a pragmatically open maritime conduit for AES states. Port of Lomé is highly automated but experiences moderate regional transport fees.';
    } else if (sahelTradeCorridor === 'benin') {
      transportSurcharge = 2.0;
      shippingTime = 7;
      diplomaticRisk = 'Moderate-High';
      description = 'Port of Cotonou provides the shortest overland logistical transit distance to Niamey. However, periodic diplomatic bottlenecks and checkpoint friction can trigger sudden supply delays.';
    } else {
      transportSurcharge = 14.0;
      shippingTime = 25;
      diplomaticRisk = 'Low';
      description = 'Bypasses coastal West African routes entirely through northern desert infrastructure connections to Algeria and Morocco. Extremely secure, but high transport surcharges reduce trading margins.';
    }

    // Effect of security budget allocation ratio
    let growthMultiplier = 1.0;
    let developmentAlert = '';
    let securityRating = '';

    if (sahelSecurityBudgetRatio < 30) {
      growthMultiplier = 1.15; // initially fast growth projection
      securityRating = 'Vulnerable';
      developmentAlert = 'Capital flows into critical public services are elevated, but essential mineral extraction projects (gold, uranium) face high operational interruption risks due to minimal border patrols.';
    } else if (sahelSecurityBudgetRatio >= 30 && sahelSecurityBudgetRatio <= 55) {
      growthMultiplier = 1.0;
      securityRating = 'Stable / Balanced';
      developmentAlert = 'Recommended configuration. Adequate joint counter-terror efforts combined with sustained agricultural inputs and infrastructure expansion programs.';
    } else {
      growthMultiplier = 0.85; // defense priority crowds out development
      securityRating = 'Highly Secured';
      developmentAlert = 'Severe development crowding-out. Sourcing defense material stabilizes export mining sites, but social services, public schools, and trade-corridor logistics projects face extreme budget deficits.';
    }

    return {
      transportSurcharge,
      shippingTime,
      diplomaticRisk,
      description,
      securityRating,
      developmentAlert,
      projectedAESGrowth: (3.6 * growthMultiplier).toFixed(2),
    };
  }, [sahelTradeCorridor, sahelSecurityBudgetRatio]);

  // Selected country details for Page 4
  const selectedDetailCountry = useMemo(() => {
    return countries.find(c => c.id === detailCountryId) || countries[0];
  }, [countries, detailCountryId]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-slate-500/10 selection:text-slate-700 font-sans pb-16 relative overflow-hidden" id="main-app-container">
      {/* Decorative Elegant Soft Gradients behind glass panels to give depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-tr from-slate-300/30 to-slate-200/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-10%] w-[45%] h-[45%] bg-gradient-to-bl from-slate-300/30 to-slate-200/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Floating Notification Toast */}
      {showNotification && (
        <div className="fixed top-24 right-5 glass-panel text-brand-text px-5 py-3.5 rounded-2xl shadow-xl z-50 flex items-center gap-3 max-w-sm border-l-4 border-l-slate-500 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-5 h-5 text-slate-600 shrink-0" />
          <span className="text-xs font-sans font-medium">{showNotification}</span>
        </div>
      )}

      {/* GLOBAL PROFESSIONAL TOP MENU HEADER */}
      <header className="sticky top-0 z-40 w-full bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-4">
            
            {/* BRANDING SECTION */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 shadow-sm shrink-0">
                  <Globe className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold font-mono tracking-wider text-teal-400 uppercase bg-teal-500/10 px-2 py-0.5 rounded-md">
                      AEIP
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase hidden sm:inline">
                      Macroeconomic Surveillance
                    </span>
                  </div>
                  <h1 className="text-sm font-bold tracking-tight text-white mt-0.5">
                    African Economic Intelligence Platform
                  </h1>
                </div>
              </div>
            </div>

            {/* NAVIGATION MENU TABS */}
            <nav className="flex flex-wrap items-center gap-1.5" aria-label="Global navigation">
              <button
                onClick={() => setActivePage('all')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activePage === 'all'
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                All Africa Core Data
              </button>
              <button
                onClick={() => setActivePage('sahel')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activePage === 'sahel'
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Sahel Alliance
              </button>
              <button
                onClick={() => setActivePage('regional')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activePage === 'regional'
                    ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Regional Hub
              </button>
              <button
                onClick={() => setActivePage('detail')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  activePage === 'detail'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Detailed Country Profiles
              </button>
            </nav>

            {/* ACTION CONTROLS */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleExportCSV}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
                title="Export Database to CSV"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                title="Reset Database Baseline"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Resetting...' : 'Reset'}</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* REFINED PAGE TITLE HEADER CONTAINER (Elegantly positioned below top menu) */}
        <div className="pb-6 border-b border-brand-border flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="dashboard-header">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-slate-500/10 border border-slate-500/15 text-[10px] text-slate-700 font-mono rounded-full uppercase tracking-wider font-semibold">
                {activePage === 'all' && 'Surveillance Engine'}
                {activePage === 'sahel' && 'Geopolitical Policy Explorer'}
                {activePage === 'regional' && 'Comparative Analysis'}
                {activePage === 'detail' && 'Surveillance Dossier'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider font-mono">
                System Active
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display tracking-tight text-brand-text">
              {activePage === 'all' && 'All Africa Macroeconomic Indicators'}
              {activePage === 'sahel' && 'Sahel Alliance Interactive Explorer (Burkina, Mali, Niger)'}
              {activePage === 'regional' && 'Regional Economic Hub Analysis'}
              {activePage === 'detail' && `Surveillance Dossier: ${selectedDetailCountry.name}`}
            </h2>
            <p className="text-xs text-brand-muted mt-1 max-w-3xl">
              {activePage === 'all' && 'Comprehensive surveillance across 55 African sovereign economies with interactive charting, filters, and smart LLM database updates.'}
              {activePage === 'sahel' && 'Logistical corridor routing simulation, border security allocations, and defense-vs-development spending trade-off analysis.'}
              {activePage === 'regional' && 'Deep-dive into regional economic aggregations. Compare GDP weightings, regional unemployment, and average population metrics.'}
              {activePage === 'detail' && `AI-powered macroeconomic diagnostic tools, fiscal risk forecasting, and comprehensive structural policy recommendations.`}
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] text-brand-dim font-mono block">
              Data Synchronization Cycle:
            </span>
            <span className="text-xs font-mono font-bold text-brand-text bg-slate-300/30 px-2 py-1 rounded-md border border-slate-300/40 inline-block mt-0.5">
              {lastUpdated}
            </span>
          </div>
        </div>

        {/* ----------------- PAGE 1: ALL AFRICA CORE DATA ----------------- */}
        {activePage === 'all' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* DATA MANAGEMENT PANEL */}
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
                      Synthesizing Indicators...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-white" />
                      Run Macroeconomic Update
                    </>
                  )}
                </button>
              </div>

              {/* AI Bulletins section (Fills when updated) */}
              {bulletins.length > 0 && (
                <div className="mt-6 pt-6 border-t border-brand-border">
                  <NewsBulletins bulletins={bulletins} />
                </div>
              )}
            </div>

            {/* METRICS OVERVIEW GRID (4 CARDS) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" id="totals-metrics-row">
              {/* TOTAL GDP */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-wider text-brand-dim font-mono uppercase block">Total GDP</span>
                  <h2 className="text-3xl font-bold text-brand-text font-display">{`$${totals.gdp}`}</h2>
                  <p className="text-xs text-brand-muted font-sans">Combined African economies</p>
                  <div className="flex items-center gap-1 pt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600 font-semibold">{totals.gdpGrowth}</span>
                    <span className="text-[10px] text-brand-dim">vs last year</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              {/* TOTAL POPULATION */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-wider text-brand-dim font-mono uppercase block">Total Population</span>
                  <h2 className="text-3xl font-bold text-brand-text font-display">{totals.population}</h2>
                  <p className="text-xs text-brand-muted font-sans">People across Africa</p>
                  <div className="flex items-center gap-1 pt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600 font-semibold">{totals.populationGrowth}</span>
                    <span className="text-[10px] text-brand-dim">vs last year</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              {/* TOTAL BUDGET */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-wider text-brand-dim font-mono uppercase block">Total Budget</span>
                  <h2 className="text-3xl font-bold text-brand-text font-display">{`$${totals.budget}`}</h2>
                  <p className="text-xs text-brand-muted font-sans">Combined Gov. Spending</p>
                  <div className="flex items-center gap-1 pt-1">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[11px] text-emerald-600 font-semibold">{totals.budgetGrowth}</span>
                    <span className="text-[10px] text-brand-dim">vs last year</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
                  <Landmark className="w-5 h-5" />
                </div>
              </div>

              {/* COUNTRIES TRACKED */}
              <div className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between transition duration-300">
                <div className="space-y-1.5">
                  <span className="text-[10px] tracking-wider text-brand-dim font-mono uppercase block">Countries Tracked</span>
                  <h2 className="text-3xl font-bold text-brand-text font-display">{totals.countriesCount}</h2>
                  <p className="text-xs text-brand-muted font-sans">African nations</p>
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    <span className="text-[10px] text-emerald-600 font-mono font-semibold">100% Certified Data</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-500/5 border border-brand-border rounded-2xl text-slate-700">
                  <Globe className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* MIDDLE SECTION: CHARTS AND INTERACTIVE MAP */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* CHART BLOCK (6 cols) */}
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
                />

                {selectedRegion && (
                  <div className="p-3.5 bg-slate-500/5 border border-brand-border rounded-xl text-brand-text text-xs flex items-center justify-between font-sans shadow-2xs">
                    <span className="flex items-center gap-1.5">
                      <Info className="w-4 h-4 shrink-0 text-slate-600" />
                      Currently filtering by <strong className="text-slate-700">{selectedRegion} Africa</strong>
                    </span>
                    <button
                      onClick={() => setSelectedRegion(null)}
                      className="text-[10px] text-slate-600 hover:text-slate-800 underline font-mono cursor-pointer font-bold"
                    >
                      Clear filter
                    </button>
                  </div>
                )}
              </div>

              {/* INTERACTIVE MAP BLOCK (6 cols) */}
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
                      <h4 className="text-sm font-bold text-brand-text font-display">Nigeria</h4>
                      <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider block mt-0.5">West Africa</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-brand-border/60 py-3 font-mono text-center">
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">GDP</span>
                      <span className="text-xs font-bold text-brand-text">{`$${countries.find(c => c.id === 'nigeria')?.gdp || 440.8}B`}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">Population</span>
                      <span className="text-xs font-bold text-brand-text font-semibold">218.5M</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">Unempl.</span>
                      <span className="text-xs font-bold text-brand-text">8.1%</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-dim italic">"Largest economic production volume in West Africa"</p>
                </div>

                {/* Egypt Card */}
                <div className="bg-slate-300/15 border border-brand-border hover:border-brand-dim/20 rounded-2xl p-5 space-y-4 transition duration-300 hover:bg-slate-300/30 shadow-2xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-brand-text font-display">Egypt</h4>
                      <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider block mt-0.5">North Africa</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-brand-border/60 py-3 font-mono text-center">
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">GDP</span>
                      <span className="text-xs font-bold text-brand-text">{`$${countries.find(c => c.id === 'egypt')?.gdp || 469.4}B`}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">Population</span>
                      <span className="text-xs font-bold text-brand-text font-semibold">109.3M</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">Unempl.</span>
                      <span className="text-xs font-bold text-brand-text">7.4%</span>
                    </div>
                  </div>

                  <p className="text-xs text-brand-dim italic">"Growing Suez logistics corridor and service sector"</p>
                </div>

                {/* South Africa Card */}
                <div className="bg-slate-300/15 border border-brand-border hover:border-brand-dim/20 rounded-2xl p-5 space-y-4 transition duration-300 hover:bg-slate-300/30 shadow-2xs">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-brand-text font-display">South Africa</h4>
                      <span className="text-[10px] text-slate-600 font-mono uppercase tracking-wider block mt-0.5">Southern Africa</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 border-t border-b border-brand-border/60 py-3 font-mono text-center">
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">GDP</span>
                      <span className="text-xs font-bold text-brand-text">{`$${countries.find(c => c.id === 'south-africa')?.gdp || 419.0}B`}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">Population</span>
                      <span className="text-xs font-bold text-brand-text font-semibold">60.4M</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-brand-dim uppercase block">Unempl.</span>
                      <span className="text-xs font-bold text-brand-text">29.8%</span>
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
                        className="hover:bg-slate-400/15 transition-colors animate-fade-in"
                      >
                        <td className="p-4.5 font-bold text-brand-text font-display flex items-center gap-2">
                          <CountryFlag id={country.id} name={country.name} />
                          <span>{country.name}</span>
                        </td>
                        <td className="p-4.5 text-brand-muted">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono border font-semibold ${
                            country.region === 'Northern' ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' :
                            country.region === 'Western' ? 'bg-teal-500/10 text-teal-700 border-teal-500/20' :
                            country.region === 'Eastern' ? 'bg-orange-500/10 text-orange-700 border-orange-500/20' :
                            country.region === 'Central' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
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
                        <td colSpan={8} className="p-8 text-center text-brand-dim font-sans">
                          No countries match the selected search query or regional filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- PAGE 2: SAHEL STATES ALLIANCE (AES) ----------------- */}
        {activePage === 'sahel' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* SAHEL INSIGHT BLOCK */}
            <div className="glass-panel rounded-3xl p-6" id="sahel-overview-header">
              <div className="flex items-center gap-3.5 mb-3">
                <AESFlagIcon size="md" />
                <div>
                  <h2 className="text-xl font-bold font-display tracking-tight text-brand-text">Alliance of Sahel States (AES) Research Hub</h2>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Strategic economic integration, security budgets, and trade corridor transit simulations for Burkina Faso, Mali, and Niger
                  </p>
                </div>
              </div>
              <p className="text-xs text-brand-muted leading-relaxed max-w-4xl">
                Formed as a tripartite defense pact (Liptako-Gourma Charter) and evolving into a confederation, the AES represents a landlocked bloc of over 70 million people. Rich in raw exportable assets (Mali and Burkina Faso gold reserves, Niger uranium deposits and agricultural output), the alliance must navigate severe regional security expenditures, transit sanctions, and maritime access workarounds to sustain growth.
              </p>
            </div>

            {/* AES STATES SIDE-BY-SIDE STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aesStates.map((country) => (
                <div
                  key={country.id}
                  className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 border-l-4 border-l-amber-600"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <CountryFlag id={country.id} name={country.name} size="md" className="mt-0.5" />
                        <div>
                          <h4 className="text-base font-bold text-brand-text font-display">{country.name}</h4>
                          <span className="text-[10px] text-amber-700 font-mono font-bold uppercase tracking-wider block mt-0.5">AES Member State</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-brand-dim bg-slate-300/40 px-2 py-0.5 rounded-md border border-brand-border">
                        ID: {country.id}
                      </span>
                    </div>

                    <div className="space-y-3.5 border-t border-b border-brand-border/60 py-4 font-mono text-xs">
                      <div className="flex justify-between items-baseline">
                        <span className="text-brand-dim">GDP (Est):</span>
                        <span className="text-brand-text font-bold">{`$${country.gdp} Billion`}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-brand-dim">Population:</span>
                        <span className="text-brand-text font-semibold">{country.population} Million</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-brand-dim">Growth Rate:</span>
                        <span className="text-emerald-700 font-bold">+{country.growthRate}%</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-brand-dim">Unemployment:</span>
                        <span className="text-brand-muted font-semibold">{country.unemployment}%</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-brand-dim">Debt to GDP:</span>
                        <span className="text-[#9a3412] font-semibold">{country.debtToGdp}%</span>
                      </div>
                    </div>

                    {/* Ministry of Finance & IMF Budget Profile */}
                    {aesBudgetProfiles[country.id] && (
                      <div className="mt-4 pt-4 border-t border-brand-border/60 space-y-2.5">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-amber-800">
                            Annual fiscal balance (IMF & MoF)
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px] bg-slate-300/15 p-2.5 rounded-2xl border border-brand-border/30">
                          <div>
                            <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Annual Revenue</span>
                            <span className="font-bold text-brand-text block">{aesBudgetProfiles[country.id].revenueUSD}</span>
                            <span className="text-[9px] text-brand-dim block">{aesBudgetProfiles[country.id].revenueFCFA} FCFA</span>
                          </div>
                          <div>
                            <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Annual Expense</span>
                            <span className="font-bold text-brand-text block">{aesBudgetProfiles[country.id].expenseUSD}</span>
                            <span className="text-[9px] text-brand-dim block">{aesBudgetProfiles[country.id].expenseFCFA} FCFA</span>
                          </div>
                          <div className="col-span-2 pt-1.5 border-t border-brand-border/30 flex justify-between items-center">
                            <div>
                              <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Deficit / Surplus</span>
                              <span className="font-bold text-red-700">{aesBudgetProfiles[country.id].deficitUSD}</span>
                              <span className="text-[9px] text-brand-dim ml-1">({aesBudgetProfiles[country.id].deficitFCFA} FCFA)</span>
                            </div>
                            <div className="text-right">
                              <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Deficit % GDP</span>
                              <span className="text-[10px] font-bold text-red-700 bg-red-100/80 px-1.5 py-0.5 rounded border border-red-200/40 inline-block mt-0.5">
                                {aesBudgetProfiles[country.id].deficitPercentGDP}
                              </span>
                            </div>
                          </div>
                          <div className="col-span-2 pt-1.5 border-t border-brand-border/30 grid grid-cols-2 gap-2">
                            <div>
                              <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">External Debt</span>
                              <span className="font-semibold text-brand-text block">{aesBudgetProfiles[country.id].externalDebtUSD}</span>
                              <span className="text-[9px] text-brand-dim block">{aesBudgetProfiles[country.id].externalDebtFCFA} FCFA</span>
                            </div>
                            <div>
                              <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Internal/Domestic Debt</span>
                              <span className="font-semibold text-brand-text block">{aesBudgetProfiles[country.id].internalDebtUSD}</span>
                              <span className="text-[9px] text-brand-dim block">{aesBudgetProfiles[country.id].internalDebtFCFA} FCFA</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-1 text-[9px] text-brand-dim leading-normal bg-amber-500/5 p-2 rounded-xl border border-amber-500/10">
                          <Info className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                          <span>Source: {aesBudgetProfiles[country.id].source} ({aesBudgetProfiles[country.id].fiscalYear})</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Briefcase className="w-4 h-4 text-brand-dim shrink-0" />
                      <span>
                        <strong className="text-brand-text font-semibold">Asset:</strong> {country.id === 'niger' ? 'Uranium Deposits' : 'Gold Export Lead'}
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted italic leading-relaxed">
                      "{country.highlight}"
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* AES COMBINED CONFEDERATION STATS */}
            <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-amber-700 bg-amber-500/5 mt-6" id="aes-combined-profile-card">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-brand-border/40">
                <div className="flex items-center gap-4">
                  <AESFlagIcon size="md" />
                  <div>
                    <h3 className="text-base font-bold text-brand-text font-display">Combined AES Confederation Profile</h3>
                    <span className="text-[10px] text-amber-800 font-mono font-bold uppercase tracking-wider block mt-0.5">
                      Consolidated Tripartite Alliance (Burkina Faso, Mali, Niger)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-brand-dim bg-slate-300/40 px-2.5 py-1 rounded-md border border-brand-border">
                    Confederation ID: AES-CONSOLIDATED
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Left Column: Combined Base KPIs */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider font-mono">Consolidated Economic Indicators</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-300/15 p-4 rounded-2xl border border-brand-border/30">
                    <div>
                      <span className="text-[10px] text-brand-dim font-mono block">GDP (Est Sum):</span>
                      <span className="text-base font-bold text-brand-text block mt-0.5">
                        ${aesStates.reduce((acc, c) => acc + c.gdp, 0).toFixed(1)} Billion
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-dim font-mono block">Total Population:</span>
                      <span className="text-base font-bold text-brand-text block mt-0.5">
                        {aesStates.reduce((acc, c) => acc + c.population, 0).toFixed(1)} Million
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-dim font-mono block">Avg Growth Rate:</span>
                      <span className="text-base font-bold text-emerald-700 block mt-0.5">
                        +{(aesStates.reduce((acc, c) => acc + c.growthRate, 0) / (aesStates.length || 1)).toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-dim font-mono block">Avg Unemployment:</span>
                      <span className="text-base font-bold text-brand-text block mt-0.5">
                        {(aesStates.reduce((acc, c) => acc + c.unemployment, 0) / (aesStates.length || 1)).toFixed(1)}%
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[10px] text-brand-dim font-mono block">Avg Debt to GDP:</span>
                      <span className="text-base font-bold text-[#9a3412] block mt-0.5">
                        {(aesStates.reduce((acc, c) => acc + c.debtToGdp, 0) / (aesStates.length || 1)).toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-brand-muted">
                      <Briefcase className="w-4 h-4 text-brand-dim shrink-0" />
                      <span>
                        <strong className="text-brand-text font-semibold">Consolidated Sovereign Assets:</strong> Gold Export Lead (ML, BF), Uranium Deposits (NE)
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted italic mt-1.5 leading-relaxed">
                      "Pooled resource reserves forming an economic and defensive corridor across landlocked West Africa, offering massive strategic leverage for intra-regional value chains."
                    </p>
                  </div>
                </div>

                {/* Right Column: Combined Fiscal Profiles */}
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5">
                    <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
                    <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider font-mono">Consolidated Fiscal Balance (FY 2024/2025)</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-3 font-mono text-[11px] bg-slate-300/15 p-4 rounded-2xl border border-brand-border/30">
                    <div>
                      <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Total Annual Revenue</span>
                      <span className="font-bold text-brand-text text-sm block mt-0.5">$12.01 Billion</span>
                      <span className="text-[9.5px] text-brand-dim block">7,208 Billion FCFA</span>
                    </div>
                    <div>
                      <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Total Annual Expense</span>
                      <span className="font-bold text-brand-text text-sm block mt-0.5">$15.15 Billion</span>
                      <span className="text-[9.5px] text-brand-dim block">9,090 Billion FCFA</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-brand-border/30 flex justify-between items-center">
                      <div>
                        <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Unified Deficit</span>
                        <span className="font-bold text-red-700 text-sm">-$3.13 Billion</span>
                        <span className="text-[9.5px] text-brand-dim ml-1.5">(-1,882 Billion FCFA)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Average Deficit % GDP</span>
                        <span className="text-[10.5px] font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded border border-red-200/40 inline-block mt-0.5">
                          -5.2%
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-brand-border/30 grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Total External Debt</span>
                        <span className="font-semibold text-brand-text block">$18.90 Billion</span>
                        <span className="text-[9.5px] text-brand-dim block">11,340 Billion FCFA</span>
                      </div>
                      <div>
                        <span className="text-brand-dim block text-[8px] uppercase font-bold tracking-wider">Total Internal/Domestic Debt</span>
                        <span className="font-semibold text-brand-text block">$10.40 Billion</span>
                        <span className="text-[9.5px] text-brand-dim block">6,240 Billion FCFA</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 text-[9px] text-brand-dim leading-normal bg-amber-500/5 p-2 rounded-xl border border-amber-500/10">
                    <Info className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                    <span>Source: Consolidated Ministries of Economy & Finance of Burkina Faso, Mali, and Niger</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AES WORLD BANK WITS TRADE STATISTICS */}
            <div className="my-8">
              <AESTradeWITS />
            </div>

            {/* DEEPSEEK AI POLICY PROJECTIONS */}
            <SahelDeepSeekAI
              corridor={sahelTradeCorridor}
              securityRatio={sahelSecurityBudgetRatio}
              aesStates={aesStates}
            />
          </div>
        )}

        {/* ----------------- PAGE 3: REGIONAL HUB COMPARISON ----------------- */}
        {activePage === 'regional' && (
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
                          <h4 className="text-xs font-bold text-brand-text font-sans">{region.name}</h4>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-brand-dim transition-transform shrink-0 ${isSelected ? 'transform rotate-90 text-brand-text' : ''}`} />
                      </div>
                      
                      <div className="space-y-1.5 mt-1 font-mono text-xs">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-brand-dim uppercase">GDP total</span>
                          <span className="text-xs font-bold text-brand-text">{`$${region.gdp}B`}</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-brand-dim uppercase">Avg Unempl</span>
                          <span className="text-xs font-bold text-brand-text">{region.unemployment}%</span>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] text-brand-dim uppercase">Population</span>
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
                        <span className="px-2.5 py-0.5 bg-teal-500/10 text-teal-700 border border-teal-500/20 rounded-full font-mono font-bold text-[10px] uppercase">
                          {selectedRegion} Africa
                        </span>
                        <span className="text-xs text-brand-muted font-semibold">
                          {countries.filter(c => c.region === selectedRegion).length} countries mapped
                        </span>
                      </div>

                      <div className="space-y-3 font-mono text-xs bg-brand-input p-4 rounded-2xl border border-brand-border">
                        <div className="flex justify-between">
                          <span className="text-brand-dim">GDP Weight:</span>
                          <span className="font-bold text-brand-text">{`$${REGIONAL_SCREENSHOT_VALUES[selectedRegion].gdp}B`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-dim">Debt to GDP (avg):</span>
                          <span className="font-bold text-[#ca8a04]">{REGIONAL_SCREENSHOT_VALUES[selectedRegion].debtToGdp}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-dim">Government Budget:</span>
                          <span className="font-bold text-brand-text">{`$${REGIONAL_SCREENSHOT_VALUES[selectedRegion].budget}B`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-dim">Unemployment Rate:</span>
                          <span className="font-bold text-rose-700">{REGIONAL_SCREENSHOT_VALUES[selectedRegion].unemployment}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-dim">Est Population:</span>
                          <span className="font-bold text-brand-text">{REGIONAL_SCREENSHOT_VALUES[selectedRegion].population}M</span>
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

                <div className="bg-brand-input border border-brand-border rounded-xl p-3 text-[10px] text-brand-dim text-center italic mt-4 font-mono">
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
                      {countries
                        .filter(c => c.region === selectedRegion)
                        .sort((a, b) => {
                          const valA = a[sortBy];
                          const valB = b[sortBy];
                          if (typeof valA === 'string' && typeof valB === 'string') {
                            return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                          }
                          return sortOrder === 'asc' ? (valA as number) - (valB as number) : (valB as number) - (valA as number);
                        })
                        .map((country) => (
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
        )}

        {/* ----------------- PAGE 4: DETAILED COUNTRY PROFILES ----------------- */}
        {activePage === 'detail' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* IN-DEPTH PROFILE WORKSPACE */}
            <div className="glass-panel rounded-3xl p-6" id="country-detail-workspace">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border pb-5 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-display tracking-tight text-brand-text">Detailed Country Profile Analyst</h2>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Query detailed indicators and run targeted AI macroeconomic policy simulations for any of the 55 nations
                  </p>
                </div>

                {/* Country Selector Dropdown */}
                <div className="flex items-center gap-3">
                  <label className="text-xs font-mono font-bold text-brand-dim uppercase whitespace-nowrap">Select Country:</label>
                  <select
                    value={detailCountryId}
                    onChange={(e) => setDetailCountryId(e.target.value)}
                    className="bg-slate-300/30 border border-brand-border text-brand-text text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#c2410c]/40 font-semibold cursor-pointer shadow-2xs"
                  >
                    {[...countries].sort((a, b) => a.name.localeCompare(b.name)).map((c) => (
                      <option key={c.id} value={c.id} className="bg-slate-300 text-brand-text font-sans">
                        [{getCountryISO2(c.id).toUpperCase()}] {c.name} ({c.region} Africa)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TWO COLUMNS PROFILE AND AI ASSISTANT */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Granular Stats Profile (5 cols) */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
                  {/* Detailed Indicator values */}
                  <div className="bg-slate-300/15 border border-brand-border rounded-3xl p-6 space-y-5">
                    <div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-mono border font-semibold ${
                        selectedDetailCountry.region === 'Northern' ? 'bg-amber-500/10 text-amber-700 border-amber-500/20' :
                        selectedDetailCountry.region === 'Western' ? 'bg-teal-500/10 text-teal-700 border-teal-500/20' :
                        selectedDetailCountry.region === 'Eastern' ? 'bg-orange-500/10 text-orange-700 border-orange-500/20' :
                        selectedDetailCountry.region === 'Central' ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20' : 'bg-rose-500/10 text-rose-700 border-rose-500/20'
                      }`}>
                        {selectedDetailCountry.region} Africa Region
                      </span>
                      <h3 className="text-2xl font-bold text-brand-text font-display mt-2 flex items-center gap-2.5">
                        <CountryFlag id={selectedDetailCountry.id} name={selectedDetailCountry.name} size="lg" />
                        <span>{selectedDetailCountry.name}</span>
                      </h3>
                      <p className="text-xs text-brand-dim font-mono mt-0.5">SURVEILLANCE CODE: AES-{selectedDetailCountry.id.toUpperCase()}</p>
                    </div>

                    <div className="space-y-3 font-mono text-xs pt-2">
                      <div className="flex justify-between items-baseline border-b border-brand-border/40 pb-2">
                        <span className="text-brand-dim">Est GDP:</span>
                        <span className="text-sm font-bold text-brand-text">{`$${selectedDetailCountry.gdp} Billion`}</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-brand-border/40 pb-2">
                        <span className="text-brand-dim">Annual Growth:</span>
                        <span className="text-sm font-bold text-emerald-700">+{selectedDetailCountry.growthRate}%</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-brand-border/40 pb-2">
                        <span className="text-brand-dim">Est Population:</span>
                        <span className="text-sm font-bold text-brand-text">{selectedDetailCountry.population} Million</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-brand-border/40 pb-2">
                        <span className="text-brand-dim">Unemployment Rate:</span>
                        <span className="text-sm font-bold text-amber-700">{selectedDetailCountry.unemployment}%</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-brand-border/40 pb-2">
                        <span className="text-brand-dim">Debt to GDP:</span>
                        <span className="text-sm font-bold text-rose-700">{selectedDetailCountry.debtToGdp}%</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-brand-dim">Gov Budget (Est):</span>
                        <span className="text-sm font-bold text-brand-text">{`$${selectedDetailCountry.budget} Billion`}</span>
                      </div>
                    </div>

                    {/* Progress Debt-to-GDP load */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-[10px] font-mono text-brand-dim uppercase">
                        <span>Debt-To-GDP Burden Ratio</span>
                        <span>{selectedDetailCountry.debtToGdp}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            selectedDetailCountry.debtToGdp > 80 ? 'bg-rose-600' :
                            selectedDetailCountry.debtToGdp > 55 ? 'bg-amber-600' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${Math.min(selectedDetailCountry.debtToGdp, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-slate-300/10 border border-brand-border rounded-2xl space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-dim block font-bold">Primary Structural Highlight</span>
                    <p className="text-xs text-brand-muted leading-relaxed italic">
                      "{selectedDetailCountry.highlight}"
                    </p>
                  </div>
                </div>

                {/* Grounded AI Analyzer workspace (8 cols) */}
                <div className="lg:col-span-8">
                  <AIAnalyzer
                    countries={countries}
                    selectedCountryId={detailCountryId}
                    setSelectedCountryId={setDetailCountryId}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="text-center pt-8 border-t border-brand-border" id="app-footer">
          <p className="text-xs text-brand-dim font-sans">
            Economic Statistics Surveillance Platform • Baseline World Bank Indicators
          </p>
        </div>

      </div>
    </div>
  );
}

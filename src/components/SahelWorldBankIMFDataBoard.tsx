import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  RefreshCw, 
  Database, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Percent, 
  ShieldAlert, 
  CheckCircle2, 
  Info,
  ExternalLink,
  Layers,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { 
  sahelCachedDataService, 
  SahelDataResponse, 
  SahelCountryCombinedMetrics 
} from '../services/sahelDataService';
import { AESFlagIcon } from './AESFlagIcon';

export const SahelWorldBankIMFDataBoard: React.FC = () => {
  const [dataResponse, setDataResponse] = useState<SahelDataResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'growth' | 'population' | 'poverty'>('overview');

  const loadData = async (force: boolean = false) => {
    if (force) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const res = force 
        ? await sahelCachedDataService.forceRefresh()
        : await sahelCachedDataService.getData();
      setDataResponse(res);
    } catch (err) {
      console.error('Error loading Sahel World Bank / IMF data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center space-y-3 my-8 text-brand-dim font-mono border-l-4 border-l-amber-600">
        <RefreshCw className="w-8 h-8 text-amber-600 animate-spin" />
        <p className="text-xs">Fetching live World Bank & IMF data for Mali (MLI), Niger (NER), Burkina Faso (BFA)...</p>
      </div>
    );
  }

  const metrics = dataResponse?.countryMetrics || {};
  const mli = metrics.MLI;
  const ner = metrics.NER;
  const bfa = metrics.BFA;

  // Aggregate Tripartite Totals
  const totalGdp = ((mli?.gdpCurrentUSD || 0) + (ner?.gdpCurrentUSD || 0) + (bfa?.gdpCurrentUSD || 0)).toFixed(1);
  const totalPop = ((mli?.populationTotal || 0) + (ner?.populationTotal || 0) + (bfa?.populationTotal || 0)).toFixed(1);
  const avgGrowth = (((mli?.realGdpGrowthPct || 0) + (ner?.realGdpGrowthPct || 0) + (bfa?.realGdpGrowthPct || 0)) / 3).toFixed(1);
  const avgInflation = (((mli?.inflationRatePct || 0) + (ner?.inflationRatePct || 0) + (bfa?.inflationRatePct || 0)) / 3).toFixed(1);
  const avgPoverty = (((mli?.povertyRatePct || 0) + (ner?.povertyRatePct || 0) + (bfa?.povertyRatePct || 0)) / 3).toFixed(1);

  // Time Series Chart Format
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  
  const growthTrendData = years.map(yr => ({
    year: yr,
    MLI: mli?.historicalGdpGrowth.find(h => h.year === yr)?.value || 0,
    NER: ner?.historicalGdpGrowth.find(h => h.year === yr)?.value || 0,
    BFA: bfa?.historicalGdpGrowth.find(h => h.year === yr)?.value || 0,
  }));

  const populationCompareData = [
    { country: 'Burkina Faso', code: 'BFA', population: bfa?.populationTotal || 0, gdp: bfa?.gdpCurrentUSD || 0, fill: '#0f766e' },
    { country: 'Mali', code: 'MLI', population: mli?.populationTotal || 0, gdp: mli?.gdpCurrentUSD || 0, fill: '#c2410c' },
    { country: 'Niger', code: 'NER', population: ner?.populationTotal || 0, gdp: ner?.gdpCurrentUSD || 0, fill: '#d97706' },
  ];

  const povertyInflationData = [
    { country: 'Burkina Faso', code: 'BFA', inflation: bfa?.inflationRatePct || 0, poverty: bfa?.povertyRatePct || 0 },
    { country: 'Mali', code: 'MLI', inflation: mli?.inflationRatePct || 0, poverty: mli?.povertyRatePct || 0 },
    { country: 'Niger', code: 'NER', inflation: ner?.inflationRatePct || 0, poverty: ner?.povertyRatePct || 0 },
  ];

  const formattedTimestamp = dataResponse?.timestamp 
    ? new Date(dataResponse.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Just now';

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-6 border-l-4 border-l-emerald-600 bg-emerald-500/5" id="sahel-wb-imf-dashboard">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
        <div className="flex items-center gap-4">
          <AESFlagIcon size="md" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Live World Bank & IMF Data Service
              </span>
              <span className="text-[10px] font-mono text-brand-dim bg-brand-input/50 px-2 py-0.5 rounded border border-brand-border">
                Cache 24h: {formattedTimestamp}
              </span>
            </div>
            <h3 className="text-lg font-bold text-brand-text font-display">
              Sahel Alliance Macroeconomic Data Hub (MLI, NER, BFA)
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Direct open-access data integration sourced from World Bank (v2) and IMF SDMX REST endpoints
            </p>
          </div>
        </div>

        {/* Action Button & Target Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-xs bg-brand-input/40 px-3 py-1.5 rounded-xl border border-brand-border">
            <span className="text-emerald-700 font-bold">🇲🇱 MLI</span>
            <span className="text-brand-dim">•</span>
            <span className="text-amber-700 font-bold">🇳🇪 NER</span>
            <span className="text-brand-dim">•</span>
            <span className="text-teal-700 font-bold">🇧🇫 BFA</span>
          </div>

          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-semibold bg-brand-card hover:bg-white text-brand-text border border-brand-border shadow-xs transition duration-200 disabled:opacity-50 cursor-pointer"
            id="btn-refresh-sahel-data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-600' : 'text-brand-dim'}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh APIs'}</span>
          </button>
        </div>
      </div>

      {/* Tripartite Key Indicator KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white/60 p-3.5 rounded-2xl border border-brand-border/40 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-brand-dim text-[10px] font-mono uppercase font-bold">
            <span>Confederation GDP</span>
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
          </div>
          <span className="text-lg font-bold font-display text-brand-text block">${totalGdp}B</span>
          <span className="text-[10px] text-brand-muted font-mono block">WB Code: NY.GDP.MKTP.CD</span>
        </div>

        <div className="bg-white/60 p-3.5 rounded-2xl border border-brand-border/40 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-brand-dim text-[10px] font-mono uppercase font-bold">
            <span>Total Population</span>
            <Users className="w-3.5 h-3.5 text-teal-700" />
          </div>
          <span className="text-lg font-bold font-display text-brand-text block">{totalPop}M</span>
          <span className="text-[10px] text-brand-muted font-mono block">WB Code: SP.POP.TOTL</span>
        </div>

        <div className="bg-white/60 p-3.5 rounded-2xl border border-brand-border/40 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-brand-dim text-[10px] font-mono uppercase font-bold">
            <span>IMF Real GDP Growth</span>
            <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <span className="text-lg font-bold font-display text-emerald-700 block">+{avgGrowth}%</span>
          <span className="text-[10px] text-brand-muted font-mono block">IMF Code: NGDP_RPCH</span>
        </div>

        <div className="bg-white/60 p-3.5 rounded-2xl border border-brand-border/40 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-brand-dim text-[10px] font-mono uppercase font-bold">
            <span>Avg Inflation (CPI)</span>
            <Percent className="w-3.5 h-3.5 text-rose-700" />
          </div>
          <span className="text-lg font-bold font-display text-brand-text block">{avgInflation}%</span>
          <span className="text-[10px] text-brand-muted font-mono block">WB Code: FP.CPI.TOTL.ZG</span>
        </div>

        <div className="bg-white/60 p-3.5 rounded-2xl border border-brand-border/40 shadow-2xs space-y-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-brand-dim text-[10px] font-mono uppercase font-bold">
            <span>Avg Poverty Rate</span>
            <Activity className="w-3.5 h-3.5 text-purple-700" />
          </div>
          <span className="text-lg font-bold font-display text-purple-900 block">{avgPoverty}%</span>
          <span className="text-[10px] text-brand-muted font-mono block">WB Code: SI.POV.DDAY</span>
        </div>
      </div>

      {/* Visual Navigation Tabs */}
      <div className="flex justify-between items-center border-b border-brand-border/30 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-1 text-xs font-semibold relative transition-all ${
              activeTab === 'overview'
                ? 'text-brand-text border-b-2 border-emerald-700 font-bold'
                : 'text-brand-dim hover:text-brand-text'
            }`}
          >
            Comparative Metrics Table
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`pb-2 px-1 text-xs font-semibold relative transition-all ${
              activeTab === 'growth'
                ? 'text-brand-text border-b-2 border-emerald-700 font-bold'
                : 'text-brand-dim hover:text-brand-text'
            }`}
          >
            Real GDP Growth Trends (2015-2025)
          </button>
          <button
            onClick={() => setActiveTab('population')}
            className={`pb-2 px-1 text-xs font-semibold relative transition-all ${
              activeTab === 'population'
                ? 'text-brand-text border-b-2 border-emerald-700 font-bold'
                : 'text-brand-dim hover:text-brand-text'
            }`}
          >
            Population vs GDP
          </button>
          <button
            onClick={() => setActiveTab('poverty')}
            className={`pb-2 px-1 text-xs font-semibold relative transition-all ${
              activeTab === 'poverty'
                ? 'text-brand-text border-b-2 border-emerald-700 font-bold'
                : 'text-brand-dim hover:text-brand-text'
            }`}
          >
            Inflation & Poverty Ratio
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-brand-dim">
          <span>Source APIs: World Bank v2 & IMF SDMX</span>
        </div>
      </div>

      {/* TAB CONTENT: Comparative Metrics Table */}
      {activeTab === 'overview' && (
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="bg-slate-300/20 text-brand-muted border-b border-brand-border/40">
                <th className="py-3 px-3">Country</th>
                <th className="py-3 px-3">Code</th>
                <th className="py-3 px-3">GDP (Current US$)</th>
                <th className="py-3 px-3">GDP per Capita</th>
                <th className="py-3 px-3">Population</th>
                <th className="py-3 px-3">Real Growth (IMF)</th>
                <th className="py-3 px-3">Inflation %</th>
                <th className="py-3 px-3">Poverty Rate ($2.15/d)</th>
                <th className="py-3 px-3">Current Acc. (% GDP)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/20 text-brand-text">
              {[bfa, mli, ner].map((country) => {
                if (!country) return null;
                return (
                  <tr key={country.countryCode} className="hover:bg-slate-300/10 transition duration-150">
                    <td className="py-3 px-3 font-bold font-sans flex items-center gap-2">
                      <span>{country.countryCode === 'MLI' ? '🇲🇱' : country.countryCode === 'NER' ? '🇳🇪' : '🇧🇫'}</span>
                      <span>{country.countryName}</span>
                    </td>
                    <td className="py-3 px-3 font-bold text-brand-dim">{country.countryCode}</td>
                    <td className="py-3 px-3 font-bold">${country.gdpCurrentUSD}B</td>
                    <td className="py-3 px-3">${country.gdpPerCapitaUSD}</td>
                    <td className="py-3 px-3">{country.populationTotal}M</td>
                    <td className="py-3 px-3 font-bold text-emerald-800">+{country.realGdpGrowthPct}%</td>
                    <td className="py-3 px-3">{country.inflationRatePct}%</td>
                    <td className="py-3 px-3 text-purple-900 font-semibold">{country.povertyRatePct}%</td>
                    <td className="py-3 px-3 text-rose-800">{country.currentAccountGdpPct}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB CONTENT: Real GDP Growth Line Chart */}
      {activeTab === 'growth' && (
        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthTrendData} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="year" stroke="#8c7e6b" fontSize={11} />
              <YAxis stroke="#8c7e6b" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value: any) => [`${value}%`, 'Real GDP Growth']} />
              <Legend />
              <Line type="monotone" dataKey="BFA" name="Burkina Faso (BFA)" stroke="#0f766e" strokeWidth={3} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="MLI" name="Mali (MLI)" stroke="#c2410c" strokeWidth={3} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="NER" name="Niger (NER)" stroke="#d97706" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* TAB CONTENT: Population vs GDP */}
      {activeTab === 'population' && (
        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={populationCompareData} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="country" stroke="#8c7e6b" fontSize={11} />
              <YAxis stroke="#8c7e6b" fontSize={11} />
              <Tooltip />
              <Legend />
              <Bar dataKey="population" name="Population (Millions)" fill="#0f766e" radius={[8, 8, 0, 0]} barSize={36} />
              <Bar dataKey="gdp" name="GDP (Billions USD)" fill="#c2410c" radius={[8, 8, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* TAB CONTENT: Inflation & Poverty Ratio */}
      {activeTab === 'poverty' && (
        <div className="h-[280px] w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={povertyInflationData} margin={{ top: 10, right: 30, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
              <XAxis dataKey="country" stroke="#8c7e6b" fontSize={11} />
              <YAxis stroke="#8c7e6b" fontSize={11} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(value: any) => [`${value}%`]} />
              <Legend />
              <Bar dataKey="poverty" name="Poverty Headcount % ($2.15/day)" fill="#7e22ce" radius={[8, 8, 0, 0]} barSize={36} />
              <Bar dataKey="inflation" name="Consumer Inflation % (CPI)" fill="#e11d48" radius={[8, 8, 0, 0]} barSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Indicator Code Footnote Mapping */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-[10px] text-brand-dim font-mono bg-white/40 p-3 rounded-2xl border border-brand-border/30">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span><strong>World Bank Indicators:</strong> NY.GDP.MKTP.CD (GDP), NY.GDP.PCAP.CD (Capita), SP.POP.TOTL (Pop), FP.CPI.TOTL.ZG (CPI), SI.POV.DDAY (Poverty)</span>
        </div>
        <div>
          <span><strong>IMF WEO Indicators:</strong> NGDP_RPCH (Growth), PCPIEPCH (Inflation), BCA_NGDPD (Current Acc.)</span>
        </div>
      </div>
    </div>
  );
};

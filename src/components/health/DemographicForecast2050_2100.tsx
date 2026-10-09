import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  EXTENDED_FORECAST_TIMELINE,
  POPULATION_SHARE_PROJECTIONS,
} from '../../data/continentalHealthData';
import { WORLD_BANK_DATA_DATE } from '../../constants/dataSource';
import {
  Calendar,
  TrendingDown,
  Users,
  Compass,
  Zap,
  Building2,
  GraduationCap,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const DemographicForecast2050_2100: React.FC = () => {
  const [activeHorizon, setActiveHorizon] = useState<'both' | '2050' | '2100'>('both');
  const [chartMode, setChartMode] = useState<'fertility' | 'populationShare'>('fertility');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Forecast Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-400" />
              Demographic Forecasting Horizon
            </span>
            <span className="px-3 py-1 bg-white/10 text-white/90 rounded-full text-xs font-mono">
              UN WPP Projections (Medium Variant) &amp; World Bank Models (Data Source Date: {WORLD_BANK_DATA_DATE})
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Africa&apos;s Demographic Trajectory to 2050 &amp; 2100
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            Over the next 75 years, the global demographic center of gravity will shift decisively to the African continent. As fertility rates in Europe, East Asia, and the Americas remain entrenched in sub-replacement, Africa will generate over <strong className="text-white">half of all net global workforce growth</strong> by 2050 and represent <strong className="text-white">nearly 40% of humanity</strong> by 2100.
          </p>
        </div>
      </div>

      {/* 2050 & 2100 Milestone KPI Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 2050 Pop */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              2050 Population
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700">
              Mid-Century Pivot
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">2.49B</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              25.7% of World
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Africa adds +1.03 billion people, doubling from 2000 levels to represent 1 in every 4 people on Earth.
          </p>
        </div>

        {/* 2050 Working Age */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800">
              2050 Global Youth Share
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-50 text-teal-700">
              Ages 15–24
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">36.4%</span>
            <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
              &gt;1 in 3 youth
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Over 36% of all global youths will be African, supplying critical talent as the OECD and East Asia age rapidly.
          </p>
        </div>

        {/* 2100 Pop */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-800">
              2100 Population
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-sky-50 text-sky-700">
              Century Horizon
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">3.92B</span>
            <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
              38.2% of World
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Nearly 4 out of 10 people on the planet will be African, while Europe shrinks by over 20% to just 5.7% of Earth.
          </p>
        </div>

        {/* 2100 Fertility */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
              2100 Fertility Rate
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700">
              Stabilization Target
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">1.96</span>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
              Sub-Replacement
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Africa&apos;s fertility smoothly completes transition, dropping below 2.10 replacement into demographic equilibrium.
          </p>
        </div>
      </div>

      {/* Interactive Forecast Visualizer Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3 h-3 text-emerald-600" />
                Long-Term Demographic Projection Models (1990 – 2100)
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              {chartMode === 'fertility'
                ? 'Total Fertility Rate Convergence Path (1990 – 2100)'
                : 'Share of Global Population by Continent (1950 – 2100)'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl">
              {chartMode === 'fertility'
                ? 'UN World Population Prospects medium variant showing historical data through 2024 and forecasted convergence across continents toward 2050 and 2100.'
                : 'Long-term percentage distribution of humanity by continent, tracing Africa’s expansion from 9% in 1950 to 38.2% in 2100.'}
            </p>
          </div>

          {/* Toggle between fertility and population share views */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setChartMode('fertility')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                chartMode === 'fertility'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Fertility Convergence (Rate)
            </button>
            <button
              onClick={() => setChartMode('populationShare')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                chartMode === 'populationShare'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Population Share (% Global)
            </button>
          </div>
        </div>

        {/* Dynamic Chart Display */}
        {chartMode === 'fertility' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Solid: 1990–2024 Historical (World Bank • Data Source Date: {WORLD_BANK_DATA_DATE}) • Dashed: 2024–2100 Forecast (UN WPP)</span>
              <span className="text-rose-600 font-semibold">2.10 = Demographic Replacement Line</span>
            </div>
            <div className="h-88 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={EXTENDED_FORECAST_TIMELINE}
                  margin={{ top: 15, right: 25, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="year"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    domain={[1.0, 7.0]}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickFormatter={(v) => `${v.toFixed(1)}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '12px',
                      padding: '10px 14px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                    }}
                    formatter={(val: any, name: any) => {
                      if (typeof val === 'number') {
                        return [`${val.toFixed(2)} births/woman`, name];
                      }
                      return [val, name];
                    }}
                    labelFormatter={(label) => {
                      const yr = Number(label);
                      return yr > 2024 ? `Year: ${yr} (UN Forecast)` : `Year: ${yr} (World Bank: ${WORLD_BANK_DATA_DATE})`;
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
                    iconType="circle"
                  />

                  {/* Replacement Reference Line */}
                  <ReferenceLine
                    y={2.1}
                    stroke="#ef4444"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: 'Replacement (2.10)',
                      position: 'right',
                      fill: '#dc2626',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />

                  {/* Mid-century and Century Vertical Markers */}
                  <ReferenceLine
                    x={2050}
                    stroke="#059669"
                    strokeDasharray="3 3"
                    label={{
                      value: '2050 Milestone',
                      position: 'top',
                      fill: '#059669',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />

                  <ReferenceLine
                    x={2100}
                    stroke="#0f766e"
                    strokeDasharray="3 3"
                    label={{
                      value: '2100 Horizon',
                      position: 'top',
                      fill: '#0f766e',
                      fontSize: 10,
                      fontWeight: 600,
                    }}
                  />

                  {/* African Forecast Series */}
                  <Line
                    type="monotone"
                    dataKey="subSaharanAfrica"
                    name="Sub-Saharan Africa (Forecast to 1.96)"
                    stroke="#059669"
                    strokeWidth={3.5}
                    strokeDasharray="4 2"
                    dot={{ r: 3, fill: '#059669' }}
                    activeDot={{ r: 6 }}
                  />

                  <Line
                    type="monotone"
                    dataKey="allAfrica"
                    name="All Africa Total"
                    stroke="#0d9488"
                    strokeWidth={2.5}
                    strokeDasharray="3 3"
                    dot={false}
                  />

                  {/* Continental Comparison Forecasts */}
                  <Line
                    type="monotone"
                    dataKey="world"
                    name="World Average (Forecast to 1.84)"
                    stroke="#475569"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="latinAmerica"
                    name="Latin America (Forecast ~1.65)"
                    stroke="#f59e0b"
                    strokeWidth={1.5}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="europe"
                    name="Europe (Forecast ~1.58)"
                    stroke="#3b82f6"
                    strokeWidth={1.5}
                    dot={false}
                  />

                  <Line
                    type="monotone"
                    dataKey="eastAsia"
                    name="East Asia (Forecast ~1.45)"
                    stroke="#ef4444"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>UN World Population Prospects (Share of Total Global Humanity)</span>
              <span className="text-emerald-700 font-semibold">Africa: 9% (1950) → 25.7% (2050) → 38.2% (2100)</span>
            </div>
            <div className="h-88 sm:h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={POPULATION_SHARE_PROJECTIONS}
                  margin={{ top: 15, right: 25, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="label"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis
                    stroke="#94a3b8"
                    fontSize={11}
                    unit="%"
                    domain={[0, 70]}
                    tickLine={false}
                    axisLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      borderRadius: '12px',
                      border: '1px solid #334155',
                      color: '#fff',
                      fontSize: '12px',
                      padding: '10px 14px',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
                    }}
                    formatter={(val: any, name: any) => [`${val}% of Earth`, name]}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="africaSharePercent"
                    name="Africa (Expanding to 38.2%)"
                    fill="#059669"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="asiaSharePercent"
                    name="Asia (Peaking then Shrinking to 45.9%)"
                    fill="#d97706"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="europeSharePercent"
                    name="Europe (Shrinking to 5.7%)"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="latinAmericaSharePercent"
                    name="Latin America (7.6% → 6.3%)"
                    fill="#f59e0b"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="northAmericaSharePercent"
                    name="North America (4.4%)"
                    fill="#8b5cf6"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>

      {/* Strategic Horizon Analysis (2050 vs 2100) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 2050 Deep Dive */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-mono font-bold text-xs">
                2050
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  The Mid-Century Demographic Arbitrage
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Population: 2.49 Billion • SSF Fertility: 2.81
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-emerald-100/70 text-emerald-800">
              Prime Dividend Window
            </span>
          </div>

          <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Global Workforce Dominance:</strong> While Europe and East Asia lose tens of millions of working-age adults annually, Africa&apos;s working cohort expands by <strong>+740 million adults</strong>, providing the majority of the world&apos;s new engineers, manufacturing labor, and services talent.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Rapid Megacity Expansion:</strong> African urban conurbations will dominate the global top 10 list. Lagos (projected ~32M), Kinshasa (~29M), and Cairo (~25M) will require massive logistical corridors, clean grids, and digital infrastructure.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Female Education Multiplier:</strong> In countries where secondary school completion among girls reaches 70%, total fertility declines toward 2.40 faster, unlocking high domestic savings and capital accumulation.
              </span>
            </li>
          </ul>
        </div>

        {/* 2100 Deep Dive */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-mono font-bold text-xs">
                2100
              </span>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  The Century Horizon &amp; Equilibrium
                </h4>
                <span className="text-[11px] text-slate-400 font-mono">
                  Population: 3.92 Billion • SSF Fertility: 1.96
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-teal-100/70 text-teal-800">
              Demographic Anchor
            </span>
          </div>

          <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <Users className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Global Population Plurality:</strong> Representing <strong>38.2% of all humans</strong>, Africa will be the primary consumer market, cultural exporter, and demographic anchor for planetary stability as total global population peaks around 10.3 billion.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Scale className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Multilateral Geopolitical Realignment:</strong> Multilateral institutions (UN Security Council, IMF, World Bank, G20) will reflect African voting power proportional to its near 40% human share.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <span>
                <strong>Demographic Plateau &amp; Aging Finance:</strong> By 2100, Africa&apos;s median age will reach ~35 years, entering its own mature demographic phase with fertility stabilizing at <strong>1.96 births/woman</strong>.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  REGIONAL_FERTILITY_BENCHMARKS,
  AFRICAN_FERTILITY_DATA,
  CountryFertilityRecord,
} from '../../data/healthFertilityData';
import { TrendingDown, Info, SlidersHorizontal, Eye } from 'lucide-react';

interface FertilityTrendChartProps {
  selectedCountryId?: string;
  onSelectCountry?: (countryId: string) => void;
}

export const FertilityTrendChart: React.FC<FertilityTrendChartProps> = ({
  selectedCountryId = 'nigeria',
  onSelectCountry,
}) => {
  const [timeframe, setTimeframe] = useState<'all' | '2000s' | '2010s'>('all');
  const [activeCountryId, setActiveCountryId] = useState<string>(selectedCountryId);
  const [compareCountryId, setCompareCountryId] = useState<string>('south-africa');

  // Sync state if prop changes
  React.useEffect(() => {
    if (selectedCountryId && selectedCountryId !== activeCountryId) {
      setActiveCountryId(selectedCountryId);
    }
  }, [selectedCountryId]);

  const primaryCountry = useMemo(() => {
    return (
      AFRICAN_FERTILITY_DATA.find((c: CountryFertilityRecord) => c.id === activeCountryId) ||
      AFRICAN_FERTILITY_DATA[0]
    );
  }, [activeCountryId]);

  const secondaryCountry = useMemo(() => {
    return (
      AFRICAN_FERTILITY_DATA.find((c: CountryFertilityRecord) => c.id === compareCountryId) ||
      null
    );
  }, [compareCountryId]);

  // Merge benchmark timeline with selected country series
  const chartData = useMemo(() => {
    let filtered = REGIONAL_FERTILITY_BENCHMARKS;
    if (timeframe === '2000s') {
      filtered = filtered.filter((d) => d.year >= 2000);
    } else if (timeframe === '2010s') {
      filtered = filtered.filter((d) => d.year >= 2010);
    }

    const primaryHistoryMap = new Map(
      primaryCountry?.history.map((h) => [h.year, h.rate]) || []
    );
    const secondaryHistoryMap = new Map(
      secondaryCountry?.history.map((h) => [h.year, h.rate]) || []
    );

    return filtered.map((bench) => ({
      year: bench.year,
      subSaharanAfrica: bench.subSaharanAfrica,
      easternSouthernAfrica: bench.easternSouthernAfrica,
      westernCentralAfrica: bench.westernCentralAfrica,
      middleEastNorthAfrica: bench.middleEastNorthAfrica,
      world: bench.world,
      replacementBenchmark: 2.1,
      [primaryCountry.name]: primaryHistoryMap.get(bench.year) ?? null,
      ...(secondaryCountry && {
        [secondaryCountry.name]: secondaryHistoryMap.get(bench.year) ?? null,
      }),
    }));
  }, [timeframe, primaryCountry, secondaryCountry]);

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setActiveCountryId(val);
    if (onSelectCountry) onSelectCountry(val);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Chart Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-teal-50 text-teal-800 border border-teal-200/70 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <TrendingDown className="w-3 h-3 text-teal-600" />
              World Bank Time-Series Analysis (1990 – 2024)
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Fertility Rate Trajectory & Demographic Transition Paths
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Comparing Sub-Saharan regional blocs against individual sovereign trajectories and the global demographic replacement benchmark (<strong className="font-semibold text-slate-700">2.10 births/woman</strong>).
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Timeframe selector */}
          <div className="flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setTimeframe('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                timeframe === 'all'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1990 – 2024
            </button>
            <button
              onClick={() => setTimeframe('2000s')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                timeframe === '2000s'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2000 – 2024
            </button>
            <button
              onClick={() => setTimeframe('2010s')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                timeframe === '2010s'
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2010 – 2024
            </button>
          </div>

          {/* Primary Country Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Focus:</span>
            <select
              value={activeCountryId}
              onChange={handlePrimaryChange}
              aria-label="Select Focus Country"
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              {AFRICAN_FERTILITY_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.latestRate})
                </option>
              ))}
            </select>
          </div>

          {/* Comparison Country Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">Compare:</span>
            <select
              value={compareCountryId}
              onChange={(e) => setCompareCountryId(e.target.value)}
              aria-label="Select Comparison Country"
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-900 text-xs font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">None (Continental only)</option>
              {AFRICAN_FERTILITY_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flag} {c.name} ({c.latestRate})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Chart Area */}
      <div className="h-80 sm:h-96 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
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
              domain={[1.0, 7.5]}
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
              labelFormatter={(label) => `Year: ${label}`}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
              iconType="circle"
            />

            {/* Reference Line for Replacement Fertility (2.1) */}
            <ReferenceLine
              y={2.1}
              stroke="#ef4444"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Replacement Rate (2.10)',
                position: 'right',
                fill: '#dc2626',
                fontSize: 10,
                fontWeight: 600,
              }}
            />

            {/* Regional Lines */}
            <Line
              type="monotone"
              dataKey="subSaharanAfrica"
              name="Sub-Saharan Africa (SSF)"
              stroke="#0f766e" // Deep teal
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="westernCentralAfrica"
              name="Western & Central Africa"
              stroke="#d97706" // Amber
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="easternSouthernAfrica"
              name="Eastern & Southern Africa"
              stroke="#2563eb" // Royal blue
              strokeWidth={1.5}
              strokeDasharray="2 2"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="middleEastNorthAfrica"
              name="North Africa & Mid-East"
              stroke="#7c3aed" // Violet
              strokeWidth={1.5}
              strokeDasharray="3 3"
              dot={false}
            />

            {/* Primary Focused Country Line */}
            {primaryCountry && (
              <Line
                type="monotone"
                dataKey={primaryCountry.name}
                name={`★ ${primaryCountry.name}`}
                stroke="#059669" // Vivid Emerald
                strokeWidth={3.5}
                dot={{ r: 3, fill: '#059669', stroke: '#fff', strokeWidth: 1.5 }}
                activeDot={{ r: 7 }}
              />
            )}

            {/* Comparison Country Line */}
            {secondaryCountry && (
              <Line
                type="monotone"
                dataKey={secondaryCountry.name}
                name={`★ ${secondaryCountry.name}`}
                stroke="#db2777" // Rose pink
                strokeWidth={2.5}
                dot={{ r: 2.5, fill: '#db2777', stroke: '#fff', strokeWidth: 1.5 }}
                activeDot={{ r: 6 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Analytical Callout Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-2xl">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Sub-Saharan Africa Trend (1990 → 2024)
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-slate-900 font-mono">6.30 → 4.26</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
              -2.04 births/woman
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Steady secular decline driven by female educational attainment, urbanization, and child survival improvements.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-2xl">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            {primaryCountry.flag} {primaryCountry.name} Profile
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-slate-900 font-mono">
              {primaryCountry.latestRate}
            </span>
            <span
              className={`text-xs font-semibold px-1.5 py-0.5 rounded ${
                primaryCountry.netChange2000toLatest < 0
                  ? 'text-emerald-700 bg-emerald-100/60'
                  : 'text-amber-700 bg-amber-100/60'
              }`}
            >
              {primaryCountry.netChange2000toLatest > 0 ? '+' : ''}
              {primaryCountry.netChange2000toLatest} since 2000
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            Classification: <strong>{primaryCountry.stage}</strong>. {primaryCountry.demographicNotes}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 p-3.5 rounded-2xl">
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
            Demographic Transition Thresholds
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-bold text-slate-900 font-mono">2.10</span>
            <span className="text-xs font-medium text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">
              Replacement Level
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            When total fertility falls below 2.1, generations cease replacing themselves without net positive immigration.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
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
  CONTINENTAL_HISTORICAL_DATA,
  CONTINENTAL_PROFILES,
  ContinentalProfile,
} from '../../data/continentalHealthData';
import { WORLD_BANK_DATA_DATE } from '../../constants/dataSource';
import {
  Globe2,
  TrendingDown,
  Users,
  AlertCircle,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';

export const ContinentalComparison: React.FC = () => {
  const [selectedContinents, setSelectedContinents] = useState<string[]>([
    'subSaharanAfrica',
    'europeCentralAsia',
    'northAmerica',
    'latinAmericaCaribbean',
    'eastAsiaPacific',
    'world',
  ]);

  const toggleContinent = (key: string) => {
    if (selectedContinents.includes(key)) {
      if (selectedContinents.length > 1) {
        setSelectedContinents(selectedContinents.filter((k) => k !== key));
      }
    } else {
      setSelectedContinents([...selectedContinents, key]);
    }
  };

  const continentSeriesConfig = [
    { key: 'subSaharanAfrica', name: 'Sub-Saharan Africa', stroke: '#059669', width: 3.5 }, // Emerald
    { key: 'allAfrica', name: 'All Africa Aggregate', stroke: '#0d9488', width: 2.5 }, // Teal
    { key: 'europeCentralAsia', name: 'Europe & Central Asia', stroke: '#3b82f6', width: 2 }, // Blue
    { key: 'northAmerica', name: 'North America (US & CAN)', stroke: '#8b5cf6', width: 2 }, // Purple
    { key: 'latinAmericaCaribbean', name: 'Latin America & Caribbean', stroke: '#f59e0b', width: 2 }, // Amber
    { key: 'eastAsiaPacific', name: 'East Asia & Pacific', stroke: '#ef4444', width: 2 }, // Red
    { key: 'southAsia', name: 'South Asia', stroke: '#d97706', width: 2 }, // Brown
    { key: 'world', name: 'World Average', stroke: '#475569', width: 2.5 }, // Slate
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Cards: Continental Divergence */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800">
              Africa (Sub-Saharan)
            </span>
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
              Median Age: 18.7y
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">4.26</span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              +2.16 vs. 2.10 replacement
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            The only global continental bloc with fertility well above replacement level, driving global working-age cohort additions.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-800">
              Europe (inc. EU)
            </span>
            <span className="text-[10px] font-mono font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
              Median Age: 43.1y
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">1.55</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              -0.55 sub-replacement
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            EU members average 1.34 births/woman. Working-age cohort is actively shrinking, with heavy fiscal strain on state pensions.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-800">
              East Asia & Pacific
            </span>
            <span className="text-[10px] font-mono font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
              Median Age: 39.8y
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">1.34</span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
              Plummeting from 2.60
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Sharpest demographic contraction worldwide; South Korea (0.72) and China have experienced severe fertility collapse.
          </p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              World Average
            </span>
            <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
              Median Age: 30.5y
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 font-mono">2.19</span>
            <span className="text-xs font-medium text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded">
              Near Replacement (2.10)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Global fertility has declined from 3.31 in 1990 to 2.19 today, and is projected to cross below replacement by 2035.
          </p>
        </div>
      </div>

      {/* Main Historical Comparative Chart: 1990 - 2024 */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/60 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Globe2 className="w-3 h-3 text-emerald-600" />
                World Bank Continental Benchmark (1990 – 2024) • Data Source Date: {WORLD_BANK_DATA_DATE}
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Continental Fertility Trajectories: How Africa Compares to the World
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
              Tracking the divergence between Africa&apos;s youth-driven demographic expansion and the below-replacement fertility contractions across Europe, East Asia, Latin America, and North America.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://data.worldbank.org/indicator/SP.DYN.TFRT.IN"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors"
            >
              <span>World Bank Indicator WDI ({WORLD_BANK_DATA_DATE})</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Continental Series Toggle Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-slate-400 mr-1">Toggle Continents:</span>
          {continentSeriesConfig.map((item) => {
            const isSelected = selectedContinents.includes(item.key);
            return (
              <button
                key={item.key}
                onClick={() => toggleContinent(item.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.stroke }}
                />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Recharts Line Chart */}
        <div className="h-84 sm:h-96 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={CONTINENTAL_HISTORICAL_DATA}
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
                labelFormatter={(label) => `World Bank Data (${WORLD_BANK_DATA_DATE}) • Year: ${label}`}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '16px' }}
                iconType="circle"
              />

              {/* Benchmark Reference Line for Population Replacement */}
              <ReferenceLine
                y={2.1}
                stroke="#ef4444"
                strokeDasharray="4 4"
                strokeWidth={1.5}
                label={{
                  value: 'Replacement Level (2.10)',
                  position: 'right',
                  fill: '#dc2626',
                  fontSize: 10,
                  fontWeight: 600,
                }}
              />

              {/* Render Selected Continental Series */}
              {continentSeriesConfig.map((item) => {
                if (!selectedContinents.includes(item.key)) return null;
                return (
                  <Line
                    key={item.key}
                    type="monotone"
                    dataKey={item.key}
                    name={item.name}
                    stroke={item.stroke}
                    strokeWidth={item.width}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                );
              })}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insight Breakdown Box */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold text-xs text-slate-900 font-mono uppercase tracking-wider">
              Strategic Insight: The Great Continental Divergence
            </span>
          </div>
          <div className="text-xs text-slate-600 leading-relaxed space-y-2">
            <p>
              In 1990, the global fertility landscape had multiple high-fertility regions: 
              Sub-Saharan Africa was at <strong>6.30</strong>, South Asia at <strong>4.09</strong>, and Latin America at <strong>3.25</strong>.
              Over the last 34 years, almost all non-African continents have plunged below the <strong>2.10 replacement threshold</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block text-xs">Asia & Latin America</span>
                <span className="text-[11px] text-slate-500">
                  Latin America (1.79) and South Asia (1.98) have completed their transitions and entered sub-replacement earlier than previously modeled.
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block text-xs">East Asia & Europe Collapse</span>
                <span className="text-[11px] text-slate-500">
                  East Asia (1.34) and Europe (1.55) face structural population decline, with Japan, Korea, Italy, and China losing millions of workers annually.
                </span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                <span className="font-bold text-slate-900 block text-xs">Africa as the World&apos;s Talent Engine</span>
                <span className="text-[11px] text-slate-500">
                  Sub-Saharan Africa&apos;s orderly decline from 6.30 to 4.26 provides an expansive working-age cohort, making African workforce integration central to 21st-century global output.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Side-by-Side Matrix */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-800 border border-blue-200/60 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider">
                Comparative Matrix • 6 Continental Zones
              </span>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Continental Demographic Profiles & Macroeconomic Stance
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Direct comparison of fertility levels, aging metrics, and macroeconomic implications across major global regions.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200/80">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-mono uppercase tracking-wider text-slate-600">
              <tr>
                <th className="px-4 py-3.5 font-bold">Continent / Region</th>
                <th className="px-4 py-3.5 font-bold text-right">2024 Fertility Rate</th>
                <th className="px-4 py-3.5 font-bold text-right">2000 Rate</th>
                <th className="px-4 py-3.5 font-bold text-right">1990 Baseline</th>
                <th className="px-4 py-3.5 font-bold text-right">Net 1990–2024</th>
                <th className="px-4 py-3.5 font-bold text-center">Median Age</th>
                <th className="px-4 py-3.5 font-bold">Demographic Phase</th>
                <th className="px-4 py-3.5 font-bold">Macroeconomic Implication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {CONTINENTAL_PROFILES.map((prof: ContinentalProfile) => {
                const isAfrica = prof.id.includes('africa');
                return (
                  <tr
                    key={prof.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isAfrica ? 'bg-emerald-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="px-4 py-3 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: prof.color }}
                        />
                        <span>{prof.name}</span>
                        <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">
                          {prof.shortCode}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-mono text-sm font-bold px-2 py-0.5 rounded-lg ${
                          prof.latestFertilityRate >= 3.0
                            ? 'text-emerald-700 bg-emerald-50 border border-emerald-200/50'
                            : prof.latestFertilityRate >= 2.1
                            ? 'text-teal-700 bg-teal-50 border border-teal-200/50'
                            : prof.latestFertilityRate >= 1.6
                            ? 'text-amber-700 bg-amber-50 border border-amber-200/50'
                            : 'text-rose-700 bg-rose-50 border border-rose-200/50'
                        }`}
                      >
                        {prof.latestFertilityRate.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-500">
                      {prof.rate2000.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-slate-500">
                      {prof.rate1990.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-emerald-700 font-semibold">
                      {prof.netChange1990to2024.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {prof.medianAge2024} yrs
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-semibold border ${
                          prof.demographicStatus === 'High Youth Demographic'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80'
                            : prof.demographicStatus === 'Below Replacement'
                            ? 'bg-amber-50 text-amber-800 border-amber-200/80'
                            : 'bg-rose-50 text-rose-800 border-rose-200/80'
                        }`}
                      >
                        {prof.demographicStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-600 max-w-xs leading-relaxed">
                      {prof.strategicInsight}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Indicator: SP.DYN.TFRT.IN • Continental Aggregations</span>
          <span>Source: World Bank WDI • Data Source Date: {WORLD_BANK_DATA_DATE}</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  MIGRATION_OVERVIEW,
  CONTINENTAL_DESTINATION_SHARES,
} from '../../data/migrationData';
import { RegionalDistributionCard } from './RegionalDistributionCard';
import {
  Users,
  Compass,
  ArrowRightLeft,
  DollarSign,
  HeartPulse,
  Building2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
  Scale,
  Layers,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';

interface MigrationOverviewProps {
  onSelectTab: (tab: 'destinations' | 'braindrain' | 'return' | 'countries' | 'regional') => void;
}

const REGION_COLORS = ['#0d9488', '#2563eb', '#d97706', '#7c3aed', '#64748b'];

export const MigrationOverview: React.FC<MigrationOverviewProps> = ({ onSelectTab }) => {
  const chartData = CONTINENTAL_DESTINATION_SHARES.map(item => ({
    name: item.destinationRegion.split(' ')[0],
    fullName: item.destinationRegion,
    migrants: item.migrantCountMillion,
    share: item.sharePercent,
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Migrant Stock */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Total African Migrant Stock
            </span>
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {MIGRATION_OVERVIEW.totalAfricanMigrantsStock}M
            </span>
            <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md font-mono">
              14.4% of Global
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            International migrants originating from 55 African sovereign nations worldwide.
          </p>
        </div>

        {/* Intra-African Dominance */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Intra-African Migrants
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              {MIGRATION_OVERVIEW.intraAfricanMigrants}M
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
              {MIGRATION_OVERVIEW.intraAfricanShare}% of Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Over 52% of African international migrants remain within the African continent.
          </p>
        </div>

        {/* Remittances Volume */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Continental Remittances
            </span>
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              ${MIGRATION_OVERVIEW.totalRemittanceInflowsUSD}B
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-mono">
              ${MIGRATION_OVERVIEW.subSaharanRemittancesUSD}B SSA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Exceeds official development assistance (ODA) and FDI flows into most African economies.
          </p>
        </div>

        {/* Healthcare Talent Loss */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
              Health Workers in OECD
            </span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-xl">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight font-mono">
              148.5k+
            </span>
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md font-mono">
              ${MIGRATION_OVERVIEW.brainDrainFiscalLossUSD}B Loss
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Trained with domestic state budgets; 3.6 doctors per 10k in Africa vs 38.2 in Europe.
          </p>
        </div>
      </div>

      {/* MYTH VS REALITY: IOM WORLD MIGRATION REPORT GROUNDING */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-teal-500/20 text-teal-400 rounded-2xl border border-teal-500/30">
                <Scale className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-teal-400 font-bold block">
                  Empirical Fact Sheet • IOM World Migration Report
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Debunking Migration Myths: Intra-African Mobility is the Dominant Reality
                </h3>
              </div>
            </div>
            <a
              href="https://worldmigrationreport.iom.int/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-teal-300 hover:text-white rounded-xl text-xs font-semibold transition border border-white/10 w-fit shrink-0"
            >
              <span>Visit IOM Report Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-rose-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider font-mono">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                Common Narrative (Distorted)
              </div>
              <h4 className="text-sm font-bold text-white">
                "African migration consists overwhelmingly of irregular crossings toward European borders."
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                International media coverage disproportionately fixates on dangerous Mediterranean maritime routes, creating a false impression that the vast majority of Africans seek to leave the continent.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                IOM Empirical Data (Verified)
              </div>
              <h4 className="text-sm font-bold text-white">
                52% of African international migrants move between neighboring African states.
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                With 21.0 million intra-African migrants, regional economic corridors (ECOWAS free movement in West Africa, EAC common market, SADC mining links) absorb more African migrants than Europe, North America, and the Gulf combined.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* REGIONAL DISTRIBUTION CARD: DESTINATION HOTSPOTS BY AFRICAN REGION */}
      <RegionalDistributionCard
        onExploreCorridor={() => onSelectTab('destinations')}
      />

      {/* CONTINENTAL DESTINATION DISTRIBUTION & REGIONAL COMPARISON */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recharts Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-teal-600" />
                Destination Breakdown of African Migrants (Millions)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Distribution of the 40.4 million African international migrant population across global regions.
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              IOM 2024 / UN DESA
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={false}
                  unit="M"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-lg border border-slate-800 text-xs space-y-1">
                          <p className="font-bold text-teal-300">{data.fullName}</p>
                          <p className="font-mono text-slate-200">
                            Migrant Stock: <span className="font-bold">{data.migrants} Million</span>
                          </p>
                          <p className="font-mono text-slate-300">
                            Share of Total: <span className="font-bold text-amber-400">{data.share}%</span>
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="migrants" radius={[6, 6, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {chartData.map((item, idx) => (
              <div key={item.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-500 block truncate">
                  {item.name}
                </span>
                <span className="text-sm font-bold text-slate-800 font-mono">
                  {item.migrants}M
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {item.share}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Key Regional Corridor Characteristics */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-4 h-4 text-teal-600" />
              Regional Corridor Characteristics
            </h3>
            <button
              onClick={() => onSelectTab('destinations')}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Corridors</span>
              <ArrowRightLeft className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {CONTINENTAL_DESTINATION_SHARES.slice(0, 4).map((region, idx) => (
              <div
                key={region.destinationRegion}
                className="p-3.5 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition-colors space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: REGION_COLORS[idx] }}
                    />
                    {region.destinationRegion}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                    {region.sharePercent}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {region.primaryDrivers}
                </p>
                <div className="flex flex-wrap items-center gap-1 pt-1">
                  <span className="text-[10px] text-slate-400 font-mono">Hubs:</span>
                  {region.topReceivingCountries.slice(0, 4).map(country => (
                    <span
                      key={country}
                      className="text-[10px] font-medium text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK JUMP NAVIGATION BANNERS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onSelectTab('destinations')}
          className="p-5 text-left bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-teal-300 rounded-2xl shadow-xs transition-all group cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Compass className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-teal-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              View Corridors &rarr;
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Top Destinations & Bilateral Corridors
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Examine Côte d'Ivoire, South Africa, Gulf States, France, and North American labor networks.
          </p>
        </button>

        <button
          onClick={() => onSelectTab('braindrain')}
          className="p-5 text-left bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-rose-300 rounded-2xl shadow-xs transition-all group cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-rose-50 text-rose-700 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <HeartPulse className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-rose-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Analyze Costs &rarr;
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Brain Drain & Fiscal Trade-off Model
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Examine the exodus of physicians, STEM leaders, and uncompensated taxpayer training subsidies.
          </p>
        </button>

        <button
          onClick={() => onSelectTab('return')}
          className="p-5 text-left bg-white hover:bg-slate-50 border border-slate-200/80 hover:border-amber-300 rounded-2xl shadow-xs transition-all group cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="p-2 bg-amber-50 text-amber-700 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Explore Policy &rarr;
            </span>
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Return Migration & Brain Circulation
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Review Ghana 'Year of Return', Nigeria NiDCOM, diaspora bonds, and returnee tech ventures.
          </p>
        </button>
      </div>
    </div>
  );
};

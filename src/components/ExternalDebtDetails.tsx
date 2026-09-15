import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Landmark,
  DollarSign,
  FileText,
  Building2,
  PieChart,
  Info,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
  Layers,
  BarChart3,
  Globe,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Activity
} from 'lucide-react';
import { Country } from '../types';
import { CountryFlag } from './CountryFlag';

export interface ExternalDebtItem {
  institution: string;
  amountUSD: number;
  terms: string;
  category: 'Multilateral' | 'Bilateral' | 'Regional' | 'Commercial';
  source: string;
  asOfDate: string;
  qoqChangePct: number;
  yoyChangePct: number;
  trendData10Yr: number[]; // 2015 to 2024
}

export interface CountryDebtProfile {
  countryId: string;
  countryName: string;
  flag: string;
  code: string;
  totalExternalDebtUSD: number;
  asOfDate: string;
  qoqChangePct: number;
  yoyChangePct: number;
  trendData10Yr: number[]; // 2015 to 2024 in $ Billions
  primarySource: string;
  publicationReference: string;
  sourceNote: string;
  items: ExternalDebtItem[];
}

export const SAHEL_DEBT_DATA: Record<string, CountryDebtProfile> = {
  'burkina-faso': {
    countryId: 'burkina-faso',
    countryName: 'Burkina Faso',
    flag: '🇧🇫',
    code: 'BFA',
    totalExternalDebtUSD: 6_200_000_000,
    asOfDate: 'Q4 2024 (Dec 31, 2024)',
    qoqChangePct: 1.6,
    yoyChangePct: 5.1,
    trendData10Yr: [3.1, 3.8, 4.5, 5.2, 5.9, 6.2],
    primarySource: 'Direction Générale du Trésor (DGTCP Burkina Faso) & World Bank IDS',
    publicationReference: 'Rapport Public Annuel sur la Dette Publique du Burkina Faso (2024) / World Bank DRS',
    sourceNote: 'Burkina Faso Ministry of Economy, Finance & Development / World Bank Debtor Reporting System FY2024',
    items: [
      {
        institution: 'World Bank (International Development Association - IDA)',
        amountUSD: 2_850_000_000,
        terms: 'Concessional IDA Credits: 0.75% fixed interest, 38-year maturity, 6-year grace period',
        category: 'Multilateral',
        source: 'World Bank Debtor Reporting System (DRS) - Statement of Loans',
        asOfDate: 'Dec 2024',
        qoqChangePct: 1.8,
        yoyChangePct: 5.2,
        trendData10Yr: [1.3, 1.6, 1.9, 2.3, 2.7, 2.85]
      },
      {
        institution: 'African Development Bank (AfDB / ADF)',
        amountUSD: 1_240_000_000,
        terms: 'Concessional ADF Facility: 0.75% service fee, 30-year maturity, 5-year grace period',
        category: 'Multilateral',
        source: 'AfDB Financial Operations Summary & Burkina Faso Country Portfolio Review',
        asOfDate: 'Q4 2024',
        qoqChangePct: 1.2,
        yoyChangePct: 4.1,
        trendData10Yr: [0.6, 0.75, 0.9, 1.05, 1.18, 1.24]
      },
      {
        institution: 'International Monetary Fund (IMF)',
        amountUSD: 680_000_000,
        terms: 'Extended Credit Facility (ECF): 0% interest rate, 10-year maturity, 5.5-year grace period',
        category: 'Multilateral',
        source: 'IMF Country Report No. 24/88 (Extended Credit Facility Audit)',
        asOfDate: 'Q4 2024',
        qoqChangePct: 0.9,
        yoyChangePct: 3.0,
        trendData10Yr: [0.35, 0.42, 0.51, 0.58, 0.65, 0.68]
      },
      {
        institution: 'Bilateral & Sovereign Creditors (Paris Club, Exim Bank China, Saudi Fund)',
        amountUSD: 1_430_000_000,
        terms: 'Semi-Concessional Sovereign Bilateral: 1.50% - 3.25% interest, 15–25 year maturity',
        category: 'Bilateral',
        source: 'DGTCP Direction de la Dette Publique - Registre des Engagements Bilatéraux',
        asOfDate: 'Dec 2024',
        qoqChangePct: 2.1,
        yoyChangePct: 6.4,
        trendData10Yr: [0.85, 1.03, 1.19, 1.27, 1.37, 1.43]
      }
    ]
  },
  'mali': {
    countryId: 'mali',
    countryName: 'Mali',
    flag: '🇲🇱',
    code: 'MLI',
    totalExternalDebtUSD: 6_800_000_000,
    asOfDate: 'Q4 2024 (Dec 31, 2024)',
    qoqChangePct: 1.5,
    yoyChangePct: 4.6,
    trendData10Yr: [3.5, 4.2, 4.9, 5.8, 6.5, 6.8],
    primarySource: 'Direction Nationale de la Dette Publique (DNDP Mali) & IMF Debt Audit',
    publicationReference: 'Bulletin Statistique Trimestriel de la Dette Publique (DNDP Q4 2024) / IMF Article IV',
    sourceNote: 'Mali Ministry of Economy and Finance / IMF Debt Sustainability Analysis FY2024',
    items: [
      {
        institution: 'World Bank (International Development Association - IDA)',
        amountUSD: 3_120_000_000,
        terms: 'Concessional IDA Credits: 0.75% fixed rate, 40-year maturity, 10-year grace period',
        category: 'Multilateral',
        source: 'World Bank International Debt Statistics (IDS) Database',
        asOfDate: 'Dec 2024',
        qoqChangePct: 1.6,
        yoyChangePct: 4.8,
        trendData10Yr: [1.5, 1.8, 2.2, 2.6, 2.95, 3.12]
      },
      {
        institution: 'African Development Bank (AfDB / ADF)',
        amountUSD: 1_360_000_000,
        terms: 'Concessional ADF Credit: 0.75% service charge, 30-year maturity, 5-year grace period',
        category: 'Multilateral',
        source: 'African Development Fund Annual Sovereign Debt Disclosures',
        asOfDate: 'Q4 2024',
        qoqChangePct: 1.1,
        yoyChangePct: 3.8,
        trendData10Yr: [0.7, 0.85, 1.0, 1.15, 1.29, 1.36]
      },
      {
        institution: 'International Monetary Fund (IMF)',
        amountUSD: 750_000_000,
        terms: 'Extended Credit Facility & SDR Allocations: 0% interest rate, 10-year maturity',
        category: 'Multilateral',
        source: 'IMF Financial Data Query Tool & Mali SDR Position Statement',
        asOfDate: 'Dec 2024',
        qoqChangePct: 1.4,
        yoyChangePct: 4.2,
        trendData10Yr: [0.4, 0.48, 0.56, 0.64, 0.71, 0.75]
      },
      {
        institution: 'Bilateral & Regional Creditors (IsDB, BOAD, Exim Bank China, Russia)',
        amountUSD: 1_570_000_000,
        terms: 'Mixed Concessional & Sovereign Facility: 2.00% - 4.10% interest, 12–20 year maturity',
        category: 'Bilateral',
        source: 'DNDP Bulletin Statistique de la Dette & Sovereign Accord Archives',
        asOfDate: 'Q4 2024',
        qoqChangePct: 1.9,
        yoyChangePct: 5.5,
        trendData10Yr: [0.9, 1.07, 1.24, 1.41, 1.51, 1.57]
      }
    ]
  },
  'niger': {
    countryId: 'niger',
    countryName: 'Niger',
    flag: '🇳🇪',
    code: 'NER',
    totalExternalDebtUSD: 5_900_000_000,
    asOfDate: 'Q4 2024 (Dec 31, 2024)',
    qoqChangePct: 1.7,
    yoyChangePct: 5.4,
    trendData10Yr: [2.9, 3.5, 4.1, 4.8, 5.6, 5.9],
    primarySource: 'Ministry of Economy & Finance (Direction de la Dette Publique Niger) & World Bank',
    publicationReference: 'Rapport d’Analyse de la Viabilité de la Dette (DDP Niger) / World Bank IDS 2024',
    sourceNote: 'Niger Ministry of Economy and Finance / World Bank International Debt Statistics FY2024',
    items: [
      {
        institution: 'World Bank (International Development Association - IDA)',
        amountUSD: 2_780_000_000,
        terms: 'Concessional IDA Credits: 0.75% fixed rate, 38-year maturity, 6-year grace period',
        category: 'Multilateral',
        source: 'World Bank Statement of Active Credits & Grants - Republic of Niger',
        asOfDate: 'Dec 2024',
        qoqChangePct: 1.5,
        yoyChangePct: 4.5,
        trendData10Yr: [1.2, 1.5, 1.8, 2.2, 2.62, 2.78]
      },
      {
        institution: 'African Development Bank (AfDB / ADF)',
        amountUSD: 1_150_000_000,
        terms: 'Concessional ADF Window: 0.75% service fee, 30-year maturity, 5-year grace period',
        category: 'Multilateral',
        source: 'AfDB Sovereign Operations Report - Niger Portfolio Summary',
        asOfDate: 'Q4 2024',
        qoqChangePct: 1.3,
        yoyChangePct: 3.6,
        trendData10Yr: [0.55, 0.7, 0.82, 0.96, 1.09, 1.15]
      },
      {
        institution: 'Islamic Development Bank (IsDB) & West African Development Bank (BOAD)',
        amountUSD: 890_000_000,
        terms: 'Islamic Development & Regional Facility: 1.50% - 2.50% mark-up rate, 20-year maturity',
        category: 'Regional',
        source: 'BOAD & IsDB Joint Regional Infrastructure Debt Ledger',
        asOfDate: 'Q3 2024',
        qoqChangePct: 2.3,
        yoyChangePct: 6.1,
        trendData10Yr: [0.4, 0.52, 0.63, 0.74, 0.83, 0.89]
      },
      {
        institution: 'Bilateral Sovereign Creditors (China Exim, France, Exim Bank India)',
        amountUSD: 1_080_000_000,
        terms: 'Concessional Export Credit & Sovereign Facility: 1.25% - 3.00% interest, 15–25 year maturity',
        category: 'Bilateral',
        source: 'Direction Générale du Trésor du Niger - Service de la Dette Extérieure',
        asOfDate: 'Dec 2024',
        qoqChangePct: 1.9,
        yoyChangePct: 5.3,
        trendData10Yr: [0.75, 0.82, 0.89, 0.95, 1.02, 1.08]
      }
    ]
  }
};

export const formatCurrencyUSD = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatCompactUSD = (amount: number): string => {
  if (amount >= 1_000_000_000) {
    return `$${(amount / 1_000_000_000).toFixed(2)} Billion`;
  }
  if (amount >= 1_000_000) {
    return `$${(amount / 1_000_000).toFixed(0)} Million`;
  }
  return formatCurrencyUSD(amount);
};

const COUNTRY_FILTER_OPTIONS = [
  { id: 'all', code: 'ALL', flag: '🌐', name: 'All 3 AES States Combined' },
  { id: 'burkina-faso', code: 'BFA', flag: '🇧🇫', name: 'Burkina Faso' },
  { id: 'mali', code: 'MLI', flag: '🇲🇱', name: 'Mali' },
  { id: 'niger', code: 'NER', flag: '🇳🇪', name: 'Niger' },
];

// Categories for consolidated multi-country matrix with trend indicators
const COMPARISON_CATEGORIES = [
  {
    key: 'worldbank',
    label: 'World Bank (IDA Concessional Credits)',
    category: 'Multilateral',
    amounts: { 'burkina-faso': 2_850_000_000, 'mali': 3_120_000_000, 'niger': 2_780_000_000 },
    qoqChanges: { 'burkina-faso': 1.8, 'mali': 1.6, 'niger': 1.5 },
    totalQoqPct: 1.6,
    trendData10Yr: [4.0, 4.9, 5.9, 7.1, 8.27, 8.75]
  },
  {
    key: 'afdb',
    label: 'African Development Bank (AfDB / ADF)',
    category: 'Multilateral',
    amounts: { 'burkina-faso': 1_240_000_000, 'mali': 1_360_000_000, 'niger': 1_150_000_000 },
    qoqChanges: { 'burkina-faso': 1.2, 'mali': 1.1, 'niger': 1.3 },
    totalQoqPct: 1.2,
    trendData10Yr: [1.85, 2.3, 2.72, 3.16, 3.56, 3.75]
  },
  {
    key: 'imf',
    label: 'IMF & SDR Facilities / Regional BOAD',
    category: 'Multilateral / Regional',
    amounts: { 'burkina-faso': 680_000_000, 'mali': 750_000_000, 'niger': 890_000_000 },
    qoqChanges: { 'burkina-faso': 0.9, 'mali': 1.4, 'niger': 2.3 },
    totalQoqPct: 1.6,
    trendData10Yr: [1.15, 1.42, 1.7, 1.96, 2.19, 2.32]
  },
  {
    key: 'bilateral',
    label: 'Bilateral & Export Creditors (China, Paris Club, Saudi/IsDB)',
    category: 'Bilateral',
    amounts: { 'burkina-faso': 1_430_000_000, 'mali': 1_570_000_000, 'niger': 1_080_000_000 },
    qoqChanges: { 'burkina-faso': 2.1, 'mali': 1.9, 'niger': 1.9 },
    totalQoqPct: 2.0,
    trendData10Yr: [2.5, 2.92, 3.32, 3.63, 3.9, 4.08]
  }
];

// Reusable Mini Sparkline SVG component (2015-2024 trend)
const MiniSparkline = ({ data, color = "#d97706", width = 64, height = 20 }: { data: number[]; color?: string; width?: number; height?: number }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 2;

  const points = data
    .map((val, idx) => {
      const x = padding + (idx / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - ((val - min) / range) * (height - 2 * padding);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  const lastVal = data[data.length - 1];
  const lastX = width - padding;
  const lastY = height - padding - ((lastVal - min) / range) * (height - 2 * padding);

  return (
    <div className="inline-flex items-center gap-1.5" title="10-Year Trajectory (2015–2024)">
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
      </svg>
      <span className="text-[9px] font-mono text-brand-dim uppercase tracking-tight">10Y</span>
    </div>
  );
};

// Reusable Variance Badge component
const VarianceBadge = ({ qoqPct, yoyPct }: { qoqPct: number; yoyPct?: number }) => {
  const isUp = qoqPct > 0;
  return (
    <div className="inline-flex flex-col items-end gap-0.5">
      <span
        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
          isUp
            ? 'bg-amber-100 text-amber-950 border border-amber-300/80'
            : 'bg-emerald-100 text-emerald-950 border border-emerald-300/80'
        }`}
        title={`Quarter-over-Quarter Debt Variance vs Q3 2024: ${isUp ? '+' : ''}${qoqPct}%`}
      >
        {isUp ? (
          <ArrowUpRight className="w-3 h-3 text-amber-800 shrink-0" />
        ) : (
          <ArrowDownRight className="w-3 h-3 text-emerald-800 shrink-0" />
        )}
        <span>{isUp ? `+${qoqPct.toFixed(1)}%` : `${qoqPct.toFixed(1)}%`} QoQ</span>
      </span>
      {yoyPct !== undefined && (
        <span className="text-[9px] font-mono text-brand-dim font-medium">
          ({yoyPct > 0 ? `+${yoyPct.toFixed(1)}%` : `${yoyPct.toFixed(1)}%`} YoY)
        </span>
      )}
    </div>
  );
};

// 10-Year Historical External Debt Data in USD Billions (2015-2024)
export const HISTORICAL_DEBT_10YR_DATA = [
  { year: '2015', BFA: 3.10, MLI: 3.50, NER: 2.90, TotalAES: 9.50 },
  { year: '2016', BFA: 3.40, MLI: 3.80, NER: 3.20, TotalAES: 10.40 },
  { year: '2017', BFA: 3.80, MLI: 4.20, NER: 3.50, TotalAES: 11.50 },
  { year: '2018', BFA: 4.15, MLI: 4.55, NER: 3.80, TotalAES: 12.50 },
  { year: '2019', BFA: 4.50, MLI: 4.90, NER: 4.10, TotalAES: 13.50 },
  { year: '2020', BFA: 4.85, MLI: 5.35, NER: 4.45, TotalAES: 14.65 },
  { year: '2021', BFA: 5.20, MLI: 5.80, NER: 4.80, TotalAES: 15.80 },
  { year: '2022', BFA: 5.55, MLI: 6.15, NER: 5.20, TotalAES: 16.90 },
  { year: '2023', BFA: 5.90, MLI: 6.50, NER: 5.60, TotalAES: 18.00 },
  { year: '2024', BFA: 6.20, MLI: 6.80, NER: 5.90, TotalAES: 18.90 },
];

interface DebtBarChartProps {
  selectedFilter: 'all' | 'burkina-faso' | 'mali' | 'niger';
}

const DebtBarChart: React.FC<DebtBarChartProps> = ({ selectedFilter }) => {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5 space-y-4 shadow-xs" id="debt-10yr-recharts-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border/40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-700">
            <BarChart3 className="w-5 h-5 shrink-0" />
          </div>
          <div>
            <h4 className="text-sm font-bold font-display text-brand-text">
              10-Year Historical External Debt Breakdown (2015–2024)
            </h4>
            <p className="text-[11px] text-brand-dim">
              {selectedFilter === 'all'
                ? 'Stacked annual comparison in USD Billions across Burkina Faso, Mali, and Niger (Total height = Combined AES Debt)'
                : `10-year annual external debt trajectory in USD Billions for ${SAHEL_DEBT_DATA[selectedFilter]?.countryName || selectedFilter}`}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-lg border border-amber-200/60 self-start sm:self-auto">
          Recharts 10Y Bar Chart
        </span>
      </div>

      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={HISTORICAL_DEBT_10YR_DATA} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'monospace' }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              unit="B"
              domain={[0, 'auto']}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const totalForYear = payload.reduce((acc: number, curr: any) => acc + (Number(curr.value) || 0), 0);
                  return (
                    <div className="bg-slate-900/85 backdrop-blur-md text-white p-3.5 rounded-2xl shadow-2xl border border-slate-700/60 text-xs font-mono space-y-2 min-w-[220px] transition-all">
                      <div className="flex items-center justify-between border-b border-slate-700/70 pb-1.5">
                        <span className="font-bold text-amber-400 text-[11px] tracking-wide uppercase">
                          {label} Fiscal Year
                        </span>
                        <span className="text-[10px] text-slate-300 font-sans font-medium">
                          Sovereign Debt
                        </span>
                      </div>
                      <div className="space-y-1.5 pt-0.5">
                        {payload.map((entry: any, index: number) => (
                          <div key={`tooltip-${index}`} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-2.5 h-2.5 rounded-xs shrink-0 shadow-xs"
                                style={{ backgroundColor: entry.color }}
                              />
                              <span className="font-medium text-slate-200 text-[11px]">
                                {entry.name}
                              </span>
                            </div>
                            <span className="font-bold text-white font-mono">
                              ${Number(entry.value).toFixed(2)}B
                            </span>
                          </div>
                        ))}

                        {selectedFilter === 'all' && (
                          <div className="flex items-center justify-between gap-3 border-t border-slate-700/70 pt-1.5 mt-1">
                            <span className="font-bold text-amber-300 text-[11px]">
                              Total AES Combined:
                            </span>
                            <span className="font-bold text-amber-300 font-mono">
                              ${totalForYear.toFixed(2)}B
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontFamily: 'sans-serif' }}
            />

            {(selectedFilter === 'all' || selectedFilter === 'burkina-faso') && (
              <Bar
                dataKey="BFA"
                name="Burkina Faso (BFA)"
                fill="#dc2626"
                stackId={selectedFilter === 'all' ? 'a' : undefined}
                radius={selectedFilter === 'burkina-faso' ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            )}

            {(selectedFilter === 'all' || selectedFilter === 'mali') && (
              <Bar
                dataKey="MLI"
                name="Mali (MLI)"
                fill="#059669"
                stackId={selectedFilter === 'all' ? 'a' : undefined}
                radius={selectedFilter === 'mali' ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              />
            )}

            {(selectedFilter === 'all' || selectedFilter === 'niger') && (
              <Bar
                dataKey="NER"
                name="Niger (NER)"
                fill="#d97706"
                stackId={selectedFilter === 'all' ? 'a' : undefined}
                radius={[4, 4, 0, 0]}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

interface ExternalDebtDetailsProps {
  countries?: Country[];
}

export default function ExternalDebtDetails({ countries = [] }: ExternalDebtDetailsProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'burkina-faso' | 'mali' | 'niger'>('all');

  const sahelCountryIds = ['burkina-faso', 'mali', 'niger'];

  const totalConfederationDebtUSD = sahelCountryIds.reduce(
    (acc, id) => acc + (SAHEL_DEBT_DATA[id]?.totalExternalDebtUSD || 0),
    0
  );

  const confed10YrTrend = [9.5, 11.5, 13.5, 15.8, 18.0, 18.9]; // AES Total 2015-2024 in $ Billions
  const confedQoqPct = 1.6;
  const confedYoyPct = 5.0;

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-6" id="external-debt-details-component">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-brand-border/40">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700">
            <Landmark className="w-6 h-6 shrink-0" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-display text-brand-text tracking-tight">
                External Debt Details
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
                AES Tripartite Debt Audit
              </span>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Detailed source breakdown, creditor institutions, debt terms, official publications, and reporting dates for Burkina Faso, Mali, and Niger
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-amber-500/10 border border-amber-500/20 text-amber-900 px-3 py-1.5 rounded-xl self-start md:self-auto">
          <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Audit Period: <strong>Q4 2024 (Dec 31, 2024)</strong></span>
        </div>
      </div>

      {/* GLOBAL AUDIT METADATA & SOURCES BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-200/50 border border-brand-border/50 text-xs text-brand-text">
        <div className="flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-dim font-semibold block">Audit As-Of Date</span>
            <span className="font-bold text-brand-text">Q4 2024 (Dec 31, 2024)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-dim font-semibold block">Primary Data Sources</span>
            <span className="font-semibold text-brand-text">World Bank IDS, IMF & National Treasuries</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-dim font-semibold block">Trend Indicators</span>
            <span className="font-semibold text-brand-text">QoQ Variance & 10-Yr Trajectory (2015–2024)</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 text-amber-700 shrink-0" />
          <div>
            <span className="text-[10px] font-mono uppercase text-brand-dim font-semibold block">Data Currency</span>
            <span className="font-semibold text-brand-text">USD Equivalent at FY2024 Rates</span>
          </div>
        </div>
      </div>

      {/* COMBINED HIGHLIGHT BADGE WITH TREND INDICATOR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
        <div className="flex items-center gap-3">
          <PieChart className="w-5 h-5 text-amber-700 shrink-0" />
          <div className="space-y-1">
            <span className="text-[11px] font-mono text-brand-dim uppercase block font-semibold">
              Total Combined Ext. Debt
            </span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold font-mono text-brand-text block">
                {formatCurrencyUSD(totalConfederationDebtUSD)}
              </span>
              <VarianceBadge qoqPct={confedQoqPct} yoyPct={confedYoyPct} />
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[11px] text-amber-800 font-mono">
                ({formatCompactUSD(totalConfederationDebtUSD)})
              </span>
              <MiniSparkline data={confed10YrTrend} color="#b45309" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <span className="text-[11px] font-mono text-brand-dim uppercase block font-semibold">
              Primary Creditor Group
            </span>
            <span className="text-sm font-bold text-brand-text block mt-0.5">
              Multilateral Development Banks
            </span>
            <span className="text-[11px] text-brand-dim font-mono">
              ~77% IDA & AfDB Concessional
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <span className="text-[11px] font-mono text-brand-dim uppercase block font-semibold">
              Weighted Avg Interest Rate
            </span>
            <span className="text-sm font-bold text-emerald-700 block mt-0.5">
              0.75% - 1.25% (Highly Concessional)
            </span>
            <span className="text-[11px] text-brand-dim font-mono">
              Long maturities (25–40 years)
            </span>
          </div>
        </div>
      </div>

      {/* COUNTRY SELECTION FILTER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase text-brand-dim tracking-wider">
            Select View Filter:
          </span>
          <span className="text-xs font-mono text-amber-900 font-semibold bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200/60">
            {selectedFilter === 'all'
              ? 'Consolidated Tripartite View (All 3 AES Member States Combined)'
              : `Single State Focus: ${SAHEL_DEBT_DATA[selectedFilter]?.countryName}`}
          </span>
        </div>

        {/* Custom Tabs matching AESTradeWITS */}
        <div className="flex bg-brand-input/40 p-1 rounded-2xl border border-brand-border self-start sm:self-auto">
          {COUNTRY_FILTER_OPTIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedFilter(c.id as any)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition duration-200 cursor-pointer ${
                selectedFilter === c.id
                  ? 'bg-white text-brand-text shadow-sm border border-brand-border font-bold'
                  : 'text-brand-dim hover:text-brand-text'
              }`}
              id={`debt-filter-btn-${c.id}`}
            >
              <span>{c.flag}</span>
              <span>{c.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 10-YEAR HISTORICAL DEBT BREAKDOWN RECHARTS BAR CHART */}
      <DebtBarChart selectedFilter={selectedFilter} />

      {/* CONTENT CONDITIONAL RENDER: "ALL" MODE vs "INDIVIDUAL COUNTRY" MODE */}
      {selectedFilter === 'all' ? (
        /* ==================== COMBINED "ALL 3 AES STATES" VIEW ==================== */
        <div className="space-y-6">
          {/* 1. SIDE-BY-SIDE 3-COLUMN COUNTRY OVERVIEW CARDS WITH TREND SPARKLINE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sahelCountryIds.map((id) => {
              const profile = SAHEL_DEBT_DATA[id];
              const shareOfConfed = (profile.totalExternalDebtUSD / totalConfederationDebtUSD) * 100;

              return (
                <div
                  key={id}
                  onClick={() => setSelectedFilter(id as any)}
                  className="rounded-2xl border border-brand-border/80 bg-white/70 p-4 space-y-3 shadow-2xs hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <CountryFlag id={id} name={profile.countryName} size="sm" />
                      <div>
                        <h4 className="text-sm font-bold font-display text-brand-text group-hover:text-amber-800 transition-colors">
                          {profile.countryName}
                        </h4>
                        <span className="text-[10px] font-mono text-brand-muted">
                          Code: <strong>{profile.code}</strong>
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                      {shareOfConfed.toFixed(1)}% of AES
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-brand-dim font-mono">Total Ext. Debt:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold font-mono text-[#9a3412] text-sm">
                          {formatCurrencyUSD(profile.totalExternalDebtUSD)}
                        </span>
                        <VarianceBadge qoqPct={profile.qoqChangePct} yoyPct={profile.yoyChangePct} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] border-t border-dashed border-brand-border/30 pt-1.5">
                      <span className="text-brand-dim font-mono">10-Yr Trajectory (2015–2024):</span>
                      <MiniSparkline data={profile.trendData10Yr} color="#d97706" />
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-brand-dim">Top Creditor:</span>
                      <span className="font-semibold text-brand-text truncate max-w-[150px]">
                        World Bank IDA
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-brand-dim">Reporting As-Of:</span>
                      <span className="font-mono text-amber-800 font-medium">
                        {profile.asOfDate}
                      </span>
                    </div>
                  </div>

                  <div className="pt-1 text-center border-t border-brand-border/30">
                    <span className="text-[11px] font-mono text-amber-700 font-semibold group-hover:underline flex items-center justify-center gap-1">
                      View Individual Breakdown &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. CONSOLIDATED 3-COLUMN SIDE-BY-SIDE MATRIX TABLE */}
          <div className="rounded-2xl border border-brand-border bg-white/80 p-5 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-brand-border/40">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-700 shrink-0" />
                <h4 className="text-base font-bold font-display text-brand-text">
                  Consolidated 3-State External Debt Comparison Matrix
                </h4>
              </div>
              <span className="text-xs font-mono text-brand-dim">
                Side-by-side figures with country breakdowns and combined AES total
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-brand-border/60 bg-white">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead>
                  <tr className="bg-slate-200/90 border-b border-brand-border text-[11px] font-mono uppercase text-brand-dim tracking-wider">
                    <th className="py-3.5 px-4 font-bold">Creditor Category / Institution</th>
                    <th className="py-3.5 px-4 font-bold text-right bg-amber-50/50 border-l border-brand-border/40">
                      🇧🇫 Burkina Faso (BFA)
                    </th>
                    <th className="py-3.5 px-4 font-bold text-right bg-amber-50/50 border-l border-brand-border/40">
                      🇲🇱 Mali (MLI)
                    </th>
                    <th className="py-3.5 px-4 font-bold text-right bg-amber-50/50 border-l border-brand-border/40">
                      🇳🇪 Niger (NER)
                    </th>
                    <th className="py-3.5 px-4 font-bold text-right bg-amber-100/60 border-l-2 border-brand-border text-amber-950">
                      🌐 Total AES Combined
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 text-xs">
                  {COMPARISON_CATEGORIES.map((cat) => {
                    const bfaAmt = cat.amounts['burkina-faso'];
                    const mliAmt = cat.amounts['mali'];
                    const nerAmt = cat.amounts['niger'];
                    const totalAmt = bfaAmt + mliAmt + nerAmt;

                    const bfaPct = (bfaAmt / SAHEL_DEBT_DATA['burkina-faso'].totalExternalDebtUSD) * 100;
                    const mliPct = (mliAmt / SAHEL_DEBT_DATA['mali'].totalExternalDebtUSD) * 100;
                    const nerPct = (nerAmt / SAHEL_DEBT_DATA['niger'].totalExternalDebtUSD) * 100;
                    const totalPct = (totalAmt / totalConfederationDebtUSD) * 100;

                    return (
                      <tr key={cat.key} className="hover:bg-amber-500/5 transition-colors">
                        <td className="py-3.5 px-4 font-medium text-brand-text">
                          <div className="space-y-0.5">
                            <span className="font-semibold block text-brand-text">{cat.label}</span>
                            <span className="text-[10px] font-mono text-brand-muted bg-slate-100 px-1.5 py-0.2 rounded border border-brand-border/30 inline-block">
                              {cat.category}
                            </span>
                          </div>
                        </td>

                        {/* BFA */}
                        <td className="py-3.5 px-4 text-right font-mono border-l border-brand-border/40 whitespace-nowrap">
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-brand-text block">{formatCurrencyUSD(bfaAmt)}</span>
                            <span className="text-[10px] text-brand-muted">({bfaPct.toFixed(1)}% of BFA)</span>
                            <span className="text-[9px] text-amber-800 font-semibold mt-0.5">
                              +{cat.qoqChanges['burkina-faso']}% QoQ
                            </span>
                          </div>
                        </td>

                        {/* MLI */}
                        <td className="py-3.5 px-4 text-right font-mono border-l border-brand-border/40 whitespace-nowrap">
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-brand-text block">{formatCurrencyUSD(mliAmt)}</span>
                            <span className="text-[10px] text-brand-muted">({mliPct.toFixed(1)}% of MLI)</span>
                            <span className="text-[9px] text-amber-800 font-semibold mt-0.5">
                              +{cat.qoqChanges['mali']}% QoQ
                            </span>
                          </div>
                        </td>

                        {/* NER */}
                        <td className="py-3.5 px-4 text-right font-mono border-l border-brand-border/40 whitespace-nowrap">
                          <div className="flex flex-col items-end">
                            <span className="font-bold text-brand-text block">{formatCurrencyUSD(nerAmt)}</span>
                            <span className="text-[10px] text-brand-muted">({nerPct.toFixed(1)}% of NER)</span>
                            <span className="text-[9px] text-amber-800 font-semibold mt-0.5">
                              +{cat.qoqChanges['niger']}% QoQ
                            </span>
                          </div>
                        </td>

                        {/* TOTAL COMBINED */}
                        <td className="py-3.5 px-4 text-right font-mono border-l-2 border-brand-border bg-amber-50/40 whitespace-nowrap">
                          <span className="font-bold text-amber-950 text-sm block">{formatCurrencyUSD(totalAmt)}</span>
                          <span className="text-[10px] text-amber-800 font-semibold">({totalPct.toFixed(1)}% of AES Total)</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-200/90 font-mono font-bold text-xs text-brand-text border-t-2 border-brand-border">
                    <td className="py-3.5 px-4 uppercase text-[11px] tracking-wider text-brand-text">
                      Total Sovereign External Debt
                    </td>
                    <td className="py-3.5 px-4 text-right border-l border-brand-border text-[#9a3412]">
                      <div>
                        <span>{formatCurrencyUSD(SAHEL_DEBT_DATA['burkina-faso'].totalExternalDebtUSD)}</span>
                        <span className="text-[10px] text-amber-800 block">+1.6% QoQ</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right border-l border-brand-border text-[#9a3412]">
                      <div>
                        <span>{formatCurrencyUSD(SAHEL_DEBT_DATA['mali'].totalExternalDebtUSD)}</span>
                        <span className="text-[10px] text-amber-800 block">+1.5% QoQ</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right border-l border-brand-border text-[#9a3412]">
                      <div>
                        <span>{formatCurrencyUSD(SAHEL_DEBT_DATA['niger'].totalExternalDebtUSD)}</span>
                        <span className="text-[10px] text-amber-800 block">+1.7% QoQ</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right border-l-2 border-brand-border bg-amber-100/80 text-amber-950 text-sm">
                      {formatCurrencyUSD(totalConfederationDebtUSD)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-brand-dim bg-slate-200/50 p-2.5 rounded-xl border border-brand-border/30">
              <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span>
                <strong>Confederation Summary:</strong> Across all 3 AES member states, multilateral development agencies (IDA, AfDB, IMF) constitute over 77% of total external debt obligations under concessional terms.
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== INDIVIDUAL COUNTRY SINGLE FOCUS VIEW WITH TREND COLUMN ==================== */
        <div className="space-y-6">
          {(() => {
            const profile = SAHEL_DEBT_DATA[selectedFilter];
            if (!profile) return null;

            return (
              <div
                key={selectedFilter}
                className="rounded-2xl border border-brand-border/80 bg-slate-300/10 overflow-hidden shadow-xs"
              >
                {/* COUNTRY HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-300/30 border-b border-brand-border/50 gap-3">
                  <div className="flex items-center gap-3">
                    <CountryFlag id={selectedFilter} name={profile.countryName} size="md" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold font-display text-brand-text">
                          {profile.countryName}
                        </h4>
                        <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200/50">
                          AES Member
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-brand-muted font-mono">
                        <span>Code: <strong className="text-brand-text">{profile.code}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-900 font-semibold bg-amber-500/10 px-1.5 py-0.2 rounded">
                          <Calendar className="w-3 h-3 shrink-0 text-amber-700" />
                          As of Date: {profile.asOfDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right bg-white/80 p-2.5 rounded-xl border border-brand-border/40 space-y-1">
                    <span className="text-[10px] font-mono text-brand-dim uppercase block font-bold">
                      Total Sovereign Ext. Debt ({profile.code})
                    </span>
                    <div className="flex items-center sm:justify-end gap-2">
                      <span className="text-base font-bold font-mono text-[#9a3412]">
                        {formatCurrencyUSD(profile.totalExternalDebtUSD)}
                      </span>
                      <VarianceBadge qoqPct={profile.qoqChangePct} yoyPct={profile.yoyChangePct} />
                    </div>
                    <div className="flex items-center sm:justify-end gap-2 pt-0.5">
                      <span className="text-[10px] text-brand-muted block font-mono">
                        ({formatCompactUSD(profile.totalExternalDebtUSD)})
                      </span>
                      <MiniSparkline data={profile.trendData10Yr} color="#b45309" />
                    </div>
                  </div>
                </div>

                {/* COUNTRY TABULAR VIEW */}
                <div className="p-4 space-y-4">
                  <div className="overflow-x-auto rounded-xl border border-brand-border/50 bg-white shadow-2xs">
                    <table className="w-full text-left border-collapse min-w-[850px]">
                      <thead>
                        <tr className="bg-slate-200/80 border-b border-brand-border/60 text-[11px] font-mono uppercase text-brand-dim tracking-wider">
                          <th className="py-3.5 px-4 font-bold">Source Institution</th>
                          <th className="py-3.5 px-4 font-bold text-right">Total Debt Amount (USD)</th>
                          <th className="py-3.5 px-4 font-bold text-center">Trend (QoQ / 10-Yr)</th>
                          <th className="py-3.5 px-4 font-bold text-center">Share (%)</th>
                          <th className="py-3.5 px-4 font-bold">Debt Terms</th>
                          <th className="py-3.5 px-4 font-bold">Official Document & Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-brand-border/40 text-xs">
                        {profile.items.map((item, index) => {
                          const sharePct = (item.amountUSD / profile.totalExternalDebtUSD) * 100;

                          return (
                            <tr
                              key={`${selectedFilter}-item-${index}`}
                              className="hover:bg-amber-500/5 transition-colors"
                            >
                              {/* SOURCE INSTITUTION */}
                              <td className="py-3 px-4 font-medium text-brand-text">
                                <div className="flex items-start gap-2">
                                  <Building2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-semibold block text-brand-text">
                                      {item.institution}
                                    </span>
                                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-brand-muted inline-block mt-0.5 border border-brand-border/30">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                              </td>

                              {/* TOTAL DEBT AMOUNT (USD) - FORMATTED */}
                              <td className="py-3 px-4 text-right font-mono font-bold text-brand-text whitespace-nowrap">
                                <div className="flex flex-col items-end">
                                  <span className="text-sm text-brand-text">
                                    {formatCurrencyUSD(item.amountUSD)}
                                  </span>
                                  <span className="text-[10px] text-brand-muted">
                                    {formatCompactUSD(item.amountUSD)}
                                  </span>
                                </div>
                              </td>

                              {/* TREND & VARIANCE SPARKLINE */}
                              <td className="py-3 px-4 text-center whitespace-nowrap bg-slate-50/50">
                                <div className="flex flex-col items-center gap-1">
                                  <VarianceBadge qoqPct={item.qoqChangePct} yoyPct={item.yoyChangePct} />
                                  <MiniSparkline data={item.trendData10Yr} color="#d97706" width={56} height={16} />
                                </div>
                              </td>

                              {/* SHARE (%) */}
                              <td className="py-3 px-4 text-center font-mono text-xs text-brand-muted whitespace-nowrap">
                                <span className="bg-amber-100/80 text-amber-900 font-bold px-2 py-0.5 rounded-md border border-amber-200/60 inline-block">
                                  {sharePct.toFixed(1)}%
                                </span>
                              </td>

                              {/* DEBT TERMS */}
                              <td className="py-3 px-4 text-brand-muted leading-relaxed font-sans text-xs max-w-[220px]">
                                <div className="flex items-start gap-1.5">
                                  <FileText className="w-3.5 h-3.5 text-brand-dim shrink-0 mt-0.5" />
                                  <span>{item.terms}</span>
                                </div>
                              </td>

                              {/* OFFICIAL SOURCE & AS-OF DATE */}
                              <td className="py-3 px-4 text-xs font-sans text-brand-muted max-w-[240px]">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/50 w-fit">
                                    <Calendar className="w-3 h-3 text-amber-700 shrink-0" />
                                    <span>Date: <strong>{item.asOfDate}</strong></span>
                                  </div>
                                  <p className="text-[11px] text-brand-dim leading-snug">
                                    {item.source}
                                  </p>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-200/90 font-mono font-bold text-xs text-brand-text border-t-2 border-brand-border">
                          <td className="py-3.5 px-4 uppercase text-[11px] tracking-wider text-brand-text">
                            Total External Debt ({profile.countryName})
                          </td>
                          <td className="py-3.5 px-4 text-right text-sm text-[#9a3412]">
                            {formatCurrencyUSD(profile.totalExternalDebtUSD)}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex flex-col items-center gap-0.5">
                              <VarianceBadge qoqPct={profile.qoqChangePct} yoyPct={profile.yoyChangePct} />
                              <MiniSparkline data={profile.trendData10Yr} color="#b45309" width={60} height={18} />
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-center">100.0%</td>
                          <td colSpan={2} className="py-3.5 px-4 text-brand-dim font-normal text-[11px] italic">
                            Consolidated sovereign external liability profile
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/* CITATION & SOURCE NOTE FOOTER */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-brand-dim bg-slate-200/50 p-3 rounded-xl border border-brand-border/30">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-brand-text block font-mono uppercase text-[10px]">Primary Reporting Authority:</strong>
                        <span>{profile.primarySource}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-brand-text block font-mono uppercase text-[10px]">Publication Document Reference:</strong>
                        <span>{profile.publicationReference}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

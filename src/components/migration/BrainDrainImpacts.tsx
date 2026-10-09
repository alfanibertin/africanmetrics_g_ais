import React, { useState } from 'react';
import {
  BRAIN_DRAIN_SECTORS,
  COUNTRY_MIGRATION_PROFILES,
  MIGRATION_OVERVIEW,
} from '../../data/migrationData';
import {
  HeartPulse,
  Code2,
  GraduationCap,
  Hammer,
  AlertTriangle,
  Scale,
  DollarSign,
  TrendingDown,
  ShieldAlert,
  Building,
  Info,
  Sliders,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export const BrainDrainImpacts: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>(
    BRAIN_DRAIN_SECTORS[0].sectorName
  );

  // Fiscal Tradeoff Interactive Simulator States
  const [doctorEmigrantCount, setDoctorEmigrantCount] = useState<number>(14000);
  const [trainingCostPerDoctor, setTrainingCostPerDoctor] = useState<number>(180000);
  const [remittanceOffsetShare, setRemittanceOffsetShare] = useState<number>(35); // % of remittances channeled to public health capital

  // Derived calculations for the simulator
  const totalTrainingSubsidyLost = (doctorEmigrantCount * trainingCostPerDoctor) / 1_000_000_000; // in Billions USD
  const estimatedAnnualTaxLost = (doctorEmigrantCount * 28000) / 1_000_000_000; // in Billions USD assuming $28k average domestic professional tax
  const healthSystemMorbidityCost = doctorEmigrantCount * 0.12; // estimated additional preventable morbidity burden factor

  const sectorIcons: Record<string, React.ReactNode> = {
    'Healthcare & Medical Workforce': <HeartPulse className="w-5 h-5 text-rose-600" />,
    'Software Engineering, AI & STEM': <Code2 className="w-5 h-5 text-indigo-600" />,
    'Academic Faculty & Scientific Researchers': <GraduationCap className="w-5 h-5 text-amber-600" />,
    'Civil, Mining & Infrastructure Engineers': <Hammer className="w-5 h-5 text-teal-600" />,
  };

  const bdsiSortedCountries = [...COUNTRY_MIGRATION_PROFILES].sort(
    (a, b) => b.brainDrainSeverityIndex - a.brainDrainSeverityIndex
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION HEADER */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-800 text-[11px] font-mono font-bold uppercase rounded-md">
            Human Capital Vulnerability
          </span>
          <span className="text-xs text-slate-500 font-mono">
            WHO Code of Practice & OECD Migration Datasets
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Brain Drain Impact Analysis: The Cost of Highly Skilled Human Capital Flight
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
          Assessing the structural depletion of healthcare professionals, STEM architects, and academic researchers across Africa, quantifying lost taxpayer training subsidies and institutional health degradation.
        </p>
      </div>

      {/* CORE ALARM: THE HEALTHCARE CRISIS BANNER */}
      <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-rose-500/20 text-rose-400 rounded-2xl border border-rose-500/30">
                <HeartPulse className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                  Critical Vulnerability Spotlight
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  The Medical Workforce Drain & WHO Safeguards Red List
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-mono font-bold">
                37 African States Red-Listed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-mono text-slate-400 block uppercase">
                Physician Density Disparity
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">3.6</span>
                <span className="text-xs text-rose-400 font-mono">per 10k in Africa</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Compared to <strong className="text-white">38.2 per 10k</strong> in Europe and a WHO recommended minimum of <strong className="text-white">44.5 doctors, nurses & midwives</strong> per 10k population.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-mono text-slate-400 block uppercase">
                Reverse Taxpayer Subsidy
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">$4.62B</span>
                <span className="text-xs text-rose-400 font-mono">Annual Global Subsidy</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                African governments subsidize ~$180k to train each physician. When high-income nations recruit them without compensation, it constitutes an inverted foreign aid transfer.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-mono text-slate-400 block uppercase">
                NHS & OECD Dependency
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-white font-mono">148,500+</span>
                <span className="text-xs text-rose-400 font-mono">Doctors & Nurses</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pt-1">
                Over 18,000 Nigerian-trained medical professionals practice in the UK NHS alone; Zimbabwe lost more than 4,000 healthcare staff in a 24-month span.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTORAL TALENT LOSS DEEP DIVE */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-teal-600" />
              Talent Flight by Strategic Sector (Headcount, Subsidies & Impact)
            </h4>
            <p className="text-xs text-slate-500">
              Comparative impact metrics across Healthcare, Software/AI, Academia, and Infrastructure Engineering.
            </p>
          </div>
        </div>

        {/* Sector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BRAIN_DRAIN_SECTORS.map(sec => {
            const isSelected = selectedSector === sec.sectorName;
            return (
              <button
                key={sec.sectorName}
                onClick={() => setSelectedSector(sec.sectorName)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-teal-50/70 border-teal-500/80 shadow-sm ring-1 ring-teal-500/30'
                    : 'bg-slate-50/70 hover:bg-slate-100/70 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  {sectorIcons[sec.sectorName]}
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      sec.economicImpactRating === 'Catastrophic'
                        ? 'bg-rose-100 text-rose-800'
                        : sec.economicImpactRating === 'Severe'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {sec.economicImpactRating}
                  </span>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {sec.sectorName}
                  </h5>
                  <span className="text-[11px] font-mono text-slate-500">
                    {sec.estimatedEmigrantShare}% pool abroad
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Sector Deep-Dive Card */}
        {(() => {
          const cur = BRAIN_DRAIN_SECTORS.find(s => s.sectorName === selectedSector)!;
          return (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                    {sectorIcons[cur.sectorName]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{cur.sectorName}</h4>
                    <span className="text-xs text-slate-500 font-mono">
                      Estimated Annual Loss: {cur.annualTalentLossHeadcount.toLocaleString()} professionals
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-mono text-slate-400 block">
                    Taxpayer Subsidies Lost:
                  </span>
                  <span className="text-base font-bold text-rose-700 font-mono">
                    ${(cur.taxpayerTrainingCostLostUSD / 1000).toFixed(2)}B USD/year
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    Diagnostic Assessment
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/60">
                    {cur.diagnosticBrief}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-teal-700 uppercase tracking-wider block font-bold">
                    Recommended Policy Interventions
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-teal-200/60">
                    {cur.keyMitigationStrategy}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/60 text-xs">
                <span className="text-slate-500 font-mono text-[11px]">Key Destination Markets:</span>
                {cur.criticalDestinations.map(d => (
                  <span
                    key={d}
                    className="text-[11px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          );
        })()}
      </div>

      {/* BRAIN DRAIN SEVERITY INDEX (BDSI) RANKING TABLE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                Brain Drain Severity Index (BDSI) Across African Nations
              </h4>
              <p className="text-xs text-slate-500">
                Composite metric (0-100) factoring tertiary emigration share, health worker vacancy, and fiscal training depletion.
              </p>
            </div>
            <span className="text-[10px] font-mono bg-rose-50 text-rose-700 px-2 py-1 rounded font-bold">
              High Severity: &gt;70
            </span>
          </div>

          <div className="space-y-3">
            {bdsiSortedCountries.slice(0, 8).map(c => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{c.flag}</span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-tight">
                      {c.name}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-400">
                      {c.whoSafeguardStatus}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block">
                      Remittance % GDP:
                    </span>
                    <span className="text-xs font-bold font-mono text-amber-700">
                      {c.remittancesPercentGDP}%
                    </span>
                  </div>

                  <div className="w-24">
                    <div className="flex justify-between text-[11px] font-mono font-bold mb-1">
                      <span className="text-slate-400">BDSI</span>
                      <span
                        className={
                          c.brainDrainSeverityIndex > 80
                            ? 'text-rose-700'
                            : c.brainDrainSeverityIndex > 70
                            ? 'text-amber-700'
                            : 'text-teal-700'
                        }
                      >
                        {c.brainDrainSeverityIndex}/100
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          c.brainDrainSeverityIndex > 80
                            ? 'bg-rose-500'
                            : c.brainDrainSeverityIndex > 70
                            ? 'bg-amber-500'
                            : 'bg-teal-500'
                        }`}
                        style={{ width: `${c.brainDrainSeverityIndex}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE SIMULATOR: FISCAL TRAINING LOSS VS REMITTANCES */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl border border-slate-700 shadow-md space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-teal-500/20 text-teal-400 rounded-xl">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">
                  Fiscal Trade-Off Simulator
                </h4>
                <span className="text-[10px] font-mono text-teal-400">
                  Subsidies vs Remittance Offset
                </span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
              Analytical Model
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Simulate the true fiscal balance when domestic taxpayers fund medical education while recipient economies benefit from ready-to-practice physicians.
          </p>

          {/* Sliders */}
          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Annual Emigrant Physicians:</span>
                <span className="font-bold text-teal-400">
                  {doctorEmigrantCount.toLocaleString()} Doctors
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={25000}
                step={500}
                value={doctorEmigrantCount}
                onChange={e => setDoctorEmigrantCount(Number(e.target.value))}
                className="w-full accent-teal-400 cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-300">Public Training Cost per Doctor:</span>
                <span className="font-bold text-amber-400">
                  ${trainingCostPerDoctor.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min={120000}
                max={250000}
                step={10000}
                value={trainingCostPerDoctor}
                onChange={e => setTrainingCostPerDoctor(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* Computed Results Matrix */}
          <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Total Taxpayer Subsidy Lost:</span>
              <span className="font-mono font-bold text-rose-400 text-sm">
                ${totalTrainingSubsidyLost.toFixed(2)} Billion USD
              </span>
            </div>

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Foregone Domestic Income Tax:</span>
              <span className="font-mono font-bold text-slate-200">
                ${estimatedAnnualTaxLost.toFixed(2)} Billion USD/yr
              </span>
            </div>

            <div className="pt-2 border-t border-slate-700/80 flex justify-between items-center text-xs">
              <span className="text-slate-300 font-semibold">
                Net Institutional Balance:
              </span>
              <span className="font-mono font-bold text-rose-400">
                -${(totalTrainingSubsidyLost + estimatedAnnualTaxLost).toFixed(2)}B Negative
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed italic">
            *Conclusion: Remittances augment private household liquidity for basic consumption, but cannot build or staff hospital wards without dedicated bilateral training restitution compacts.
          </p>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Landmark, Info, Briefcase, ChevronRight, Shield, ShieldAlert, Cpu } from 'lucide-react';
import { Country } from '../types';
import { AESFlagIcon } from '../components/AESFlagIcon';
import { CountryFlag } from '../components/CountryFlag';
import { AESTradeWITS } from '../components/AESTradeWITS';
import SahelDeepSeekAI from '../components/SahelDeepSeekAI';

interface SahelPageProps {
  countries: Country[];
}

interface BudgetProfile {
  revenueFCFA: number;
  revenueUSD: number;
  expenseFCFA: number;
  expenseUSD: number;
  deficitFCFA: number;
  deficitUSD: number;
  deficitPercentGDP: number;
  externalDebtFCFA: number;
  externalDebtUSD: number;
  internalDebtFCFA: number;
  internalDebtUSD: number;
  source: string;
  fiscalYear: string;
}

const aesBudgetProfiles: Record<string, BudgetProfile> = {
  'burkina-faso': {
    revenueFCFA: 3016,
    revenueUSD: 5.03,
    expenseFCFA: 3745,
    expenseUSD: 6.24,
    deficitFCFA: -729,
    deficitUSD: -1.21,
    deficitPercentGDP: -5.1,
    externalDebtFCFA: 3720,
    externalDebtUSD: 6.20,
    internalDebtFCFA: 2280,
    internalDebtUSD: 3.80,
    source: 'Burkina Faso Ministry of Economy, Finance & Development / IMF ECF Profile',
    fiscalYear: 'FY 2024/2025'
  },
  'mali': {
    revenueFCFA: 2342,
    revenueUSD: 3.90,
    expenseFCFA: 2925,
    expenseUSD: 4.88,
    deficitFCFA: -583,
    deficitUSD: -0.97,
    deficitPercentGDP: -4.7,
    externalDebtFCFA: 4080,
    externalDebtUSD: 6.80,
    internalDebtFCFA: 2340,
    internalDebtUSD: 3.90,
    source: 'Mali Ministry of Economy & Finance / IMF Article IV Consultation',
    fiscalYear: 'FY 2024/2025'
  },
  'niger': {
    revenueFCFA: 1850,
    revenueUSD: 3.08,
    expenseFCFA: 2420,
    expenseUSD: 4.03,
    deficitFCFA: -570,
    deficitUSD: -0.95,
    deficitPercentGDP: -5.8,
    externalDebtFCFA: 3540,
    externalDebtUSD: 5.90,
    internalDebtFCFA: 1620,
    internalDebtUSD: 2.70,
    source: 'Niger Ministry of Economy and Finance / World Bank Economic Update',
    fiscalYear: 'FY 2024/2025'
  }
};

export default function SahelPage({ countries }: SahelPageProps) {
  const [sahelTradeCorridor, setSahelTradeCorridor] = useState<'togo' | 'benin' | 'trans-sahara'>('togo');
  const [sahelSecurityBudgetRatio, setSahelSecurityBudgetRatio] = useState<number>(45);

  const aesStates = useMemo(() => {
    return countries.filter(c => ['burkina-faso', 'mali', 'niger'].includes(c.id));
  }, [countries]);

  // Dynamically computed tripartite profile
  const consolidatedProfile = useMemo(() => {
    let totalRevenueUSD = 0;
    let totalRevenueFCFA = 0;
    let totalExpenseUSD = 0;
    let totalExpenseFCFA = 0;
    let totalDeficitUSD = 0;
    let totalDeficitFCFA = 0;
    let totalExternalDebtUSD = 0;
    let totalExternalDebtFCFA = 0;
    let totalInternalDebtUSD = 0;
    let totalInternalDebtFCFA = 0;
    let sumDeficitPercent = 0;

    Object.values(aesBudgetProfiles).forEach((p) => {
      totalRevenueUSD += p.revenueUSD;
      totalRevenueFCFA += p.revenueFCFA;
      totalExpenseUSD += p.expenseUSD;
      totalExpenseFCFA += p.expenseFCFA;
      totalDeficitUSD += p.deficitUSD;
      totalDeficitFCFA += p.deficitFCFA;
      totalExternalDebtUSD += p.externalDebtUSD;
      totalExternalDebtFCFA += p.externalDebtFCFA;
      totalInternalDebtUSD += p.internalDebtUSD;
      totalInternalDebtFCFA += p.internalDebtFCFA;
      sumDeficitPercent += p.deficitPercentGDP;
    });

    const avgDeficitPercent = sumDeficitPercent / 3;

    return {
      revenueUSD: totalRevenueUSD,
      revenueFCFA: totalRevenueFCFA,
      expenseUSD: totalExpenseUSD,
      expenseFCFA: totalExpenseFCFA,
      deficitUSD: totalDeficitUSD,
      deficitFCFA: totalDeficitFCFA,
      deficitPercent: avgDeficitPercent,
      externalDebtUSD: totalExternalDebtUSD,
      externalDebtFCFA: totalExternalDebtFCFA,
      internalDebtUSD: totalInternalDebtUSD,
      internalDebtFCFA: totalInternalDebtFCFA,
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SAHEL OVERVIEW BANNER */}
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

      {/* Dynamic Consolidated Tripartite Alliance statistics computed mathematically from profiles */}
      <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-amber-700 bg-amber-500/5" id="aes-combined-profile-card">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 pb-5 border-b border-brand-border/40">
          <div className="flex items-center gap-4">
            <AESFlagIcon size="md" />
            <div>
              <h3 className="text-base font-bold text-brand-text font-display">Combined AES Confederation Profile</h3>
              <span className="text-[11px] text-amber-800 font-mono font-bold uppercase tracking-wider block mt-0.5">
                Consolidated Tripartite Alliance (Burkina Faso, Mali, Niger)
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-brand-dim bg-slate-300/40 px-2.5 py-1 rounded-md border border-brand-border">
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
                <span className="text-[11px] text-brand-dim font-mono block">GDP (Est Sum):</span>
                <span className="text-base font-bold text-brand-text block mt-0.5">
                  ${aesStates.reduce((acc, c) => acc + c.gdp, 0).toFixed(1)} Billion
                </span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim font-mono block">Total Population:</span>
                <span className="text-base font-bold text-brand-text block mt-0.5">
                  {aesStates.reduce((acc, c) => acc + c.population, 0).toFixed(1)} Million
                </span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim font-mono block">Avg Growth Rate:</span>
                <span className="text-base font-bold text-emerald-700 block mt-0.5">
                  +{(aesStates.reduce((acc, c) => acc + c.growthRate, 0) / (aesStates.length || 1)).toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-brand-dim font-mono block">Avg Unemployment:</span>
                <span className="text-base font-bold text-brand-text block mt-0.5">
                  {(aesStates.reduce((acc, c) => acc + c.unemployment, 0) / (aesStates.length || 1)).toFixed(1)}%
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-[11px] text-brand-dim font-mono block">Avg Debt to GDP:</span>
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

          {/* Right Column: Combined Fiscal Profiles (Numerically computed) */}
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-amber-700 shrink-0" />
              <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider font-mono">Consolidated Fiscal Balance (FY 2024/2025)</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 font-mono text-[11px] bg-slate-300/15 p-4 rounded-2xl border border-brand-border/30">
              <div>
                <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Total Annual Revenue</span>
                <span className="font-bold text-brand-text text-sm block mt-0.5">${consolidatedProfile.revenueUSD.toFixed(2)} Billion</span>
                <span className="text-[11px] text-brand-dim block">{consolidatedProfile.revenueFCFA.toLocaleString()} Billion FCFA</span>
              </div>
              <div>
                <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Total Annual Expense</span>
                <span className="font-bold text-brand-text text-sm block mt-0.5">${consolidatedProfile.expenseUSD.toFixed(2)} Billion</span>
                <span className="text-[11px] text-brand-dim block">{consolidatedProfile.expenseFCFA.toLocaleString()} Billion FCFA</span>
              </div>
              <div className="col-span-2 pt-2 border-t border-brand-border/30 flex justify-between items-center">
                <div>
                  <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Unified Deficit</span>
                  <span className="font-bold text-red-700 text-sm">${consolidatedProfile.deficitUSD.toFixed(2)} Billion</span>
                  <span className="text-[11px] text-brand-dim ml-1.5">({consolidatedProfile.deficitFCFA.toLocaleString()} Billion FCFA)</span>
                </div>
                <div className="text-right">
                  <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Average Deficit % GDP</span>
                  <span className="text-[11px] font-bold text-red-700 bg-red-100/80 px-2 py-0.5 rounded border border-red-200/40 inline-block mt-0.5">
                    {consolidatedProfile.deficitPercent.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="col-span-2 pt-2 border-t border-brand-border/30 grid grid-cols-2 gap-3">
                <div>
                  <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Total External Debt</span>
                  <span className="font-semibold text-brand-text block">${consolidatedProfile.externalDebtUSD.toFixed(2)} Billion</span>
                  <span className="text-[11px] text-brand-dim block">{consolidatedProfile.externalDebtFCFA.toLocaleString()} Billion FCFA</span>
                </div>
                <div>
                  <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Total Internal Debt</span>
                  <span className="font-semibold text-brand-text block">${consolidatedProfile.internalDebtUSD.toFixed(2)} Billion</span>
                  <span className="text-[11px] text-brand-dim block">{consolidatedProfile.internalDebtFCFA.toLocaleString()} Billion FCFA</span>
                </div>
              </div>
            </div>
            <div className="flex items-start gap-1 text-[11px] text-brand-dim leading-normal bg-amber-500/5 p-2 rounded-xl border border-amber-500/10">
              <Info className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
              <span>Indicative figures compiled from publicly available budget documents (FY 2024/2025). Unverified.</span>
            </div>
          </div>
        </div>
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
                    <span className="text-[11px] text-amber-700 font-mono font-bold uppercase tracking-wider block mt-0.5">AES Member State</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-brand-dim bg-slate-300/40 px-2.5 py-0.5 rounded-md border border-brand-border">
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
                    <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-amber-800">
                      Annual fiscal balance (IMF & MoF)
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-slate-300/15 p-2.5 rounded-2xl border border-brand-border/30">
                    <div>
                      <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Annual Revenue</span>
                      <span className="font-bold text-brand-text block">${aesBudgetProfiles[country.id].revenueUSD.toFixed(2)}B</span>
                      <span className="text-[11px] text-brand-dim block">{aesBudgetProfiles[country.id].revenueFCFA}B FCFA</span>
                    </div>
                    <div>
                      <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Annual Expense</span>
                      <span className="font-bold text-brand-text block">${aesBudgetProfiles[country.id].expenseUSD.toFixed(2)}B</span>
                      <span className="text-[11px] text-brand-dim block">{aesBudgetProfiles[country.id].expenseFCFA}B FCFA</span>
                    </div>
                    <div className="col-span-2 pt-1.5 border-t border-brand-border/30 flex justify-between items-center">
                      <div>
                        <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Deficit / Surplus</span>
                        <span className="font-bold text-red-700">${aesBudgetProfiles[country.id].deficitUSD.toFixed(2)}B</span>
                        <span className="text-[11px] text-brand-dim ml-1">({aesBudgetProfiles[country.id].deficitFCFA}B FCFA)</span>
                      </div>
                      <div className="text-right">
                        <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Deficit % GDP</span>
                        <span className="text-[11px] font-bold text-red-700 bg-red-100/80 px-1.5 py-0.5 rounded border border-red-200/40 inline-block mt-0.5">
                          {aesBudgetProfiles[country.id].deficitPercentGDP}%
                        </span>
                      </div>
                    </div>
                    <div className="col-span-2 pt-1.5 border-t border-brand-border/30 grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">External Debt</span>
                        <span className="font-semibold text-brand-text block">${aesBudgetProfiles[country.id].externalDebtUSD.toFixed(2)}B</span>
                        <span className="text-[11px] text-brand-dim block">{aesBudgetProfiles[country.id].externalDebtFCFA}B FCFA</span>
                      </div>
                      <div>
                        <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Internal Debt</span>
                        <span className="font-semibold text-brand-text block">${aesBudgetProfiles[country.id].internalDebtUSD.toFixed(2)}B</span>
                        <span className="text-[11px] text-brand-dim block">{aesBudgetProfiles[country.id].internalDebtFCFA}B FCFA</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-1 text-[11px] text-brand-dim leading-normal bg-amber-500/5 p-2 rounded-xl border border-amber-500/10">
                    <Info className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                    <span>Indicative figures compiled from publicly available budget documents (FY 2024/2025). Unverified.</span>
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

      {/* AES WORLD BANK WITS TRADE STATISTICS */}
      <div className="my-8">
        <AESTradeWITS />
      </div>

      {/* INTERACTIVE TRADE CORRIDOR CONTROLLER & SLIDERS */}
      <div className="glass-panel rounded-3xl p-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-4 space-y-5">
          <div>
            <h3 className="text-base font-bold text-brand-text font-display tracking-tight">Corridor & Budget Simulator</h3>
            <p className="text-xs text-brand-muted mt-0.5">Model strategic logistical variables to pass to the AI synthesis engine</p>
          </div>

          {/* Trade corridor choice */}
          <div className="space-y-2.5">
            <label className="block text-[11px] font-mono font-bold uppercase tracking-widest text-brand-dim">
              Trade Corridor Alignment
            </label>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {(['togo', 'benin', 'trans-sahara'] as const).map((corridor) => (
                <button
                  key={corridor}
                  onClick={() => setSahelTradeCorridor(corridor)}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer ${
                    sahelTradeCorridor === corridor
                      ? 'bg-amber-500/10 border-amber-500/40 text-brand-text font-semibold'
                      : 'bg-brand-input hover:bg-brand-border/40 border-brand-border text-brand-muted'
                  }`}
                >
                  <span className="block font-bold capitalize">
                    {corridor === 'trans-sahara' ? 'Trans-Sahara Highway Alignment' : `Port of ${corridor === 'togo' ? 'Lomé (Togo)' : 'Cotonou (Benin)'}`}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Security slider */}
          <div className="space-y-2.5 pt-2">
            <div className="flex justify-between items-baseline">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-widest text-brand-dim">
                Security Capital Allocation
              </label>
              <span className="text-xs font-mono font-bold text-brand-text bg-slate-300/40 px-2 py-0.5 rounded border border-brand-border">
                {sahelSecurityBudgetRatio}%
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="75"
              step="5"
              value={sahelSecurityBudgetRatio}
              onChange={(e) => setSahelSecurityBudgetRatio(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-300/40 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <p className="text-[11px] text-brand-dim leading-relaxed font-sans">
              Adjusting defense spending parameters creates a budget trade-off on health, education, and infrastructure.
            </p>
          </div>
        </div>

        <div className="md:col-span-8 space-y-6">
          {/* DEEPSEEK AI POLICY PROJECTIONS */}
          <SahelDeepSeekAI
            corridor={sahelTradeCorridor}
            securityRatio={sahelSecurityBudgetRatio}
          />
        </div>
      </div>
    </div>
  );
}

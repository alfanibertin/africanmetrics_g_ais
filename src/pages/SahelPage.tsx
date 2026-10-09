import React, { useState, useMemo } from 'react';
import { Landmark, Info, Briefcase, ChevronRight, Shield, ShieldAlert, Cpu } from 'lucide-react';
import { Country } from '../types';
import { AESFlagIcon } from '../components/AESFlagIcon';
import { CountryFlag } from '../components/CountryFlag';
import { AESTradeWITS } from '../components/AESTradeWITS';
import ExternalDebtDetails from '../components/ExternalDebtDetails';
import { SahelWorldBankIMFDataBoard } from '../components/SahelWorldBankIMFDataBoard';

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
  internalResourcesFCFA?: number;
  externalResourcesFCFA?: number;
  domesticBondIssuanceFCFA?: number;
  publicDebtServiceFCFA?: number;
  isBalanced?: boolean;
  notes?: string;
}

const aesBudgetProfiles: Record<string, BudgetProfile> = {
  'burkina-faso': {
    revenueFCFA: 3431.5,
    revenueUSD: 5.72,
    expenseFCFA: 3918.3,
    expenseUSD: 6.53,
    deficitFCFA: -486.8,
    deficitUSD: -0.81,
    deficitPercentGDP: -2.6,
    externalDebtFCFA: 3720,
    externalDebtUSD: 6.20,
    internalDebtFCFA: 2280,
    internalDebtUSD: 3.80,
    source: "Burkina Faso Ministère de l'Economie, des Finances et de la Prospective (FY 2026)",
    fiscalYear: 'FY 2026',
    notes: 'Official Loi de Finances 2026. Deficit represents approximately 2.6% of GDP.'
  },
  'mali': {
    revenueFCFA: 3057.8,
    revenueUSD: 5.10,
    expenseFCFA: 3578.2,
    expenseUSD: 5.96,
    deficitFCFA: -520.4,
    deficitUSD: -0.87,
    deficitPercentGDP: -2.2,
    externalDebtFCFA: 4080,
    externalDebtUSD: 6.80,
    internalDebtFCFA: 2340,
    internalDebtUSD: 3.90,
    source: "Mali Ministère de l'Economie et des Finances (FY 2026)",
    fiscalYear: 'FY 2026',
    notes: 'Official Loi de Finances 2026. Deficit represents approximately 2.2% of GDP.'
  },
  'niger': {
    revenueFCFA: 2922.22,
    revenueUSD: 4.87,
    expenseFCFA: 2922.22,
    expenseUSD: 4.87,
    deficitFCFA: 0,
    deficitUSD: 0.0,
    deficitPercentGDP: 0.0,
    externalDebtFCFA: 3140.40,
    externalDebtUSD: 5.23,
    internalDebtFCFA: 592.38,
    internalDebtUSD: 0.99,
    internalResourcesFCFA: 1655.84,
    externalResourcesFCFA: 674.00,
    domesticBondIssuanceFCFA: 592.38,
    publicDebtServiceFCFA: 842.65,
    isBalanced: true,
    source: "Ministère de l'Economie et des Finances du Niger, Direction Générale du Budget & Direction de la Dette Publique",
    fiscalYear: 'FY 2026',
    notes: "Budget citoyen 2026. State budget is balanced at 2,922.22B FCFA (Internal: 1,655.84B FCFA, External: 674.00B FCFA, Domestic bond issuance: 592.38B FCFA, Debt service: 842.65B FCFA)."
  }
};

export default function SahelPage({ countries }: SahelPageProps) {
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
              <h4 className="text-xs font-bold text-brand-text uppercase tracking-wider font-mono">Consolidated Fiscal Balance (FY 2026 - Ministry Data)</h4>
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
              <span>Official figures compiled from Ministries of Economy & Finance budgets (FY 2026 Loi de Finances & Budget citoyen 2026).</span>
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
              {aesBudgetProfiles[country.id] && (() => {
                const bp = aesBudgetProfiles[country.id];
                return (
                  <div className="mt-4 pt-4 border-t border-brand-border/60 space-y-2.5">
                    <div className="flex items-center justify-between gap-1.5 mb-1">
                      <div className="flex items-center gap-1.5">
                        <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                        <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-amber-800">
                          Fiscal Balance ({bp.fiscalYear})
                        </span>
                      </div>
                      <span className="text-[10px] font-mono bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded border border-amber-200">
                        Official MoF
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 font-mono text-[11px] bg-slate-300/15 p-2.5 rounded-2xl border border-brand-border/30">
                      <div>
                        <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Annual Revenue</span>
                        <span className="font-bold text-brand-text block">${bp.revenueUSD.toFixed(2)}B</span>
                        <span className="text-[11px] text-brand-dim block">{bp.revenueFCFA.toLocaleString()}B FCFA</span>
                      </div>
                      <div>
                        <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Annual Expense</span>
                        <span className="font-bold text-brand-text block">${bp.expenseUSD.toFixed(2)}B</span>
                        <span className="text-[11px] text-brand-dim block">{bp.expenseFCFA.toLocaleString()}B FCFA</span>
                      </div>

                      <div className="col-span-2 pt-1.5 border-t border-brand-border/30 flex justify-between items-center">
                        <div>
                          <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Deficit / Surplus</span>
                          {bp.isBalanced ? (
                            <span className="font-bold text-emerald-700">Balanced (0.00B FCFA)</span>
                          ) : (
                            <>
                              <span className="font-bold text-red-700">${bp.deficitUSD.toFixed(2)}B</span>
                              <span className="text-[11px] text-brand-dim ml-1">({bp.deficitFCFA}B FCFA)</span>
                            </>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Deficit % GDP</span>
                          <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded border inline-block mt-0.5 ${
                            bp.deficitPercentGDP === 0
                              ? 'text-emerald-800 bg-emerald-100/80 border-emerald-200/50'
                              : 'text-red-700 bg-red-100/80 border-red-200/40'
                          }`}>
                            {bp.deficitPercentGDP === 0 ? '0.0% (Balanced)' : `${bp.deficitPercentGDP}%`}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2 pt-1.5 border-t border-brand-border/30 grid grid-cols-2 gap-2">
                        <div>
                          <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">External Debt</span>
                          <span className="font-semibold text-brand-text block">${bp.externalDebtUSD.toFixed(2)}B</span>
                          <span className="text-[11px] text-brand-dim block">{bp.externalDebtFCFA.toLocaleString()}B FCFA</span>
                        </div>
                        <div>
                          <span className="text-brand-dim block text-[11px] uppercase font-bold tracking-wider">Internal Debt / Issuance</span>
                          <span className="font-semibold text-brand-text block">${bp.internalDebtUSD.toFixed(2)}B</span>
                          <span className="text-[11px] text-brand-dim block">{bp.internalDebtFCFA.toLocaleString()}B FCFA</span>
                        </div>
                      </div>

                      {/* Extra details for Niger */}
                      {country.id === 'niger' && (
                        <div className="col-span-2 pt-2 border-t border-brand-border/30 space-y-1.5 text-[10px] text-brand-muted">
                          <div className="flex justify-between items-center bg-white/60 px-2 py-1 rounded">
                            <span className="font-semibold text-brand-text">Internal Resources:</span>
                            <span className="font-mono text-brand-text font-bold">1,655.84B FCFA</span>
                          </div>
                          <div className="flex justify-between items-center bg-white/60 px-2 py-1 rounded">
                            <span className="font-semibold text-brand-text">External Resources:</span>
                            <span className="font-mono text-brand-text font-bold">674.00B FCFA</span>
                          </div>
                          <div className="flex justify-between items-center bg-white/60 px-2 py-1 rounded">
                            <span className="font-semibold text-brand-text">Domestic Bond Issuance:</span>
                            <span className="font-mono text-brand-text font-bold">592.38B FCFA</span>
                          </div>
                          <div className="flex justify-between items-center bg-white/60 px-2 py-1 rounded">
                            <span className="font-semibold text-brand-text">Public Debt Service:</span>
                            <span className="font-mono text-brand-text font-bold">842.65B FCFA</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start gap-1 text-[10px] text-brand-dim leading-normal bg-amber-500/5 p-2 rounded-xl border border-amber-500/10">
                      <Info className="w-3 h-3 text-amber-700 shrink-0 mt-0.5" />
                      <span><strong>Source:</strong> {bp.source}</span>
                    </div>
                  </div>
                );
              })()}
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

      {/* SAHEL ALLIANCE WORLD BANK & IMF LIVE MACROECONOMIC DATA HUB */}
      <div className="my-8">
        <SahelWorldBankIMFDataBoard />
      </div>

      {/* EXTERNAL DEBT DETAILS TABULAR VIEW */}
      <div className="my-8">
        <ExternalDebtDetails countries={countries} />
      </div>

      {/* AES WORLD BANK WITS TRADE STATISTICS */}
      <div className="my-8">
        <AESTradeWITS />
      </div>
    </div>
  );
}

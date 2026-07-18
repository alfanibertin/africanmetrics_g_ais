import React, { useMemo } from 'react';
import { Country } from '../types';
import { CountryFlag } from '../components/CountryFlag';
import { getCountryISO2 } from '../data';
import AIAnalyzer from '../components/AIAnalyzer';

interface CountryDetailPageProps {
  countries: Country[];
  detailCountryId: string;
  setDetailCountryId: (id: string) => void;
}

export default function CountryDetailPage({
  countries,
  detailCountryId,
  setDetailCountryId,
}: CountryDetailPageProps) {
  const selectedDetailCountry = useMemo(() => {
    return countries.find((c) => c.id === detailCountryId) || countries[0];
  }, [countries, detailCountryId]);

  return (
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
              {[...countries]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((c) => (
                  <option key={c.id} value={c.id} className="bg-slate-300 text-brand-text font-sans">
                    [{getCountryISO2(c.id).toUpperCase()}] {c.name} ({c.region} Africa)
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* TWO COLUMNS PROFILE AND AI ASSISTANT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Granular Stats Profile */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="bg-slate-300/15 border border-brand-border rounded-3xl p-6 space-y-5">
              <div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] uppercase tracking-wider font-mono border font-semibold ${
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
                <div className="flex justify-between text-[11px] font-mono text-brand-dim uppercase">
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
              <span className="text-[11px] font-mono uppercase tracking-wider text-brand-dim block font-bold">Primary Structural Highlight</span>
              <p className="text-xs text-brand-muted leading-relaxed italic">
                "{selectedDetailCountry.highlight}"
              </p>
            </div>
          </div>

          {/* Grounded AI Analyzer workspace */}
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
  );
}

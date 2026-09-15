import React from 'react';
import {
  CountryFertilityRecord,
  AFRICAN_FERTILITY_DATA,
} from '../../data/healthFertilityData';
import {
  Users,
  GraduationCap,
  HeartPulse,
  Briefcase,
  AlertCircle,
  Lightbulb,
  ArrowUpRight,
  TrendingDown,
} from 'lucide-react';

interface DemographicSpotlightProps {
  countryId: string;
}

export const DemographicSpotlight: React.FC<DemographicSpotlightProps> = ({
  countryId,
}) => {
  const country =
    AFRICAN_FERTILITY_DATA.find((c: CountryFertilityRecord) => c.id === countryId) ||
    AFRICAN_FERTILITY_DATA[0];

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-sky-50 text-sky-800 border border-sky-200/60 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3 h-3 text-sky-600" />
              Demographic Dividend & Health Economics
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900">
            Sovereign Spotlight: {country.flag} {country.name} ({country.iso3})
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Structural health economics, dependency ratio impacts, and human capital accumulation based on World Bank indicator SP.DYN.TFRT.IN.
          </p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-[11px] text-slate-400 font-mono block">Current Classification:</span>
          <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60 inline-block mt-0.5">
            {country.stage}
          </span>
        </div>
      </div>

      {/* Grid: Country Specific Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            Latest Fertility Rate
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
            {country.latestRate.toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Births per woman (2024)</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            1990 → 2024 Delta
          </span>
          <div className="text-2xl font-bold font-mono mt-1 flex items-center gap-1 text-emerald-700">
            <TrendingDown className="w-5 h-5" />
            {(country.latestRate - country.rate1990).toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">From {country.rate1990.toFixed(2)} in 1990</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            Sub-Saharan Benchmark Gap
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
            {(country.latestRate - 4.26) > 0 ? `+${(country.latestRate - 4.26).toFixed(2)}` : (country.latestRate - 4.26).toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">vs. Continental Avg (4.26)</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">
            Replacement Margin (2.10)
          </span>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-1">
            +{(country.latestRate - 2.10).toFixed(2)}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">Buffer above zero-growth</span>
        </div>
      </div>

      {/* Structural Pillars of Demographic Economics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200/60">
            <GraduationCap className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Female Secondary Education</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every additional year of female secondary schooling across Sub-Saharan Africa reduces total fertility by an average of 0.26 to 0.38 births, raising age at first marriage and increasing female labor force participation.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-2">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200/60">
            <HeartPulse className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Child Survival & Primary Care</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            The demographic transition requires a sustained drop in infant and under-5 mortality. When parents have confidence that children will survive into adulthood, desired family size shifts toward higher investment per child.
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-slate-200/80 bg-white space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/60">
            <Briefcase className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Working-Age Dependency Transition</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            As fertility falls, the ratio of working-age adults (15–64) relative to dependents expands. This "demographic window" lasts approximately 30 to 45 years, generating higher domestic savings and private capital formation.
          </p>
        </div>
      </div>

      {/* Policy Action Advisory */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
        <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Demographic Surveillance Note for {country.name}:</strong>{' '}
          {country.demographicNotes} To maximize the demographic dividend, fiscal policy should prioritize targeted investments in maternal and child health infrastructure, universal family planning service points, and vocational secondary education.
        </div>
      </div>
    </div>
  );
};

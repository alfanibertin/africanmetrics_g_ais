import React from 'react';
import {
  BRAIN_CIRCULATION_ROADMAP,
  MIGRATION_OVERVIEW,
} from '../../data/migrationData';
import {
  RotateCcw,
  Sparkles,
  Building,
  CheckCircle2,
  TrendingUp,
  Award,
  Rocket,
  ShieldCheck,
  Zap,
  Globe,
  Briefcase,
  FileCheck,
  ArrowRight,
  Landmark,
} from 'lucide-react';

export const ReturnAndCirculation: React.FC = () => {
  const caseStudies = [
    {
      country: 'Ghana',
      flag: '🇬🇭',
      initiative: "'Year of Return' (2019) & 'Beyond the Return' (2020-2030)",
      category: 'Cultural & Economic Repatriation',
      results:
        'Generated over $1.9B in economic impact, attracted 500,000+ diaspora visitors, and granted permanent citizenship/Right of Abode to hundreds of diaspora professionals.',
      linkText: 'Diaspora Affairs Office of the President',
    },
    {
      country: 'Nigeria',
      flag: '🇳🇬',
      initiative: 'NiDCOM & National Diaspora Investment Trust Fund',
      category: 'Capital Mobilization & Tech Returnees',
      results:
        'Established dedicated Diaspora Commission (NiDCOM); over 38% of Nigerian tech startup founders are returnees leveraging international VC networks to build multi-million dollar platforms.',
      linkText: 'NiDCOM Diaspora Policy Framework',
    },
    {
      country: 'Rwanda',
      flag: '🇷🇼',
      initiative: 'Medical Diaspora Fellowship & Skills Transfer Program',
      category: 'Healthcare Brain Circulation',
      results:
        'Overseas Rwandan surgeons and ICU specialists perform 3-6 month clinical rotations at Kigali Teaching Hospital (CHUK), conducting complex procedures and training local medical residents.',
      linkText: 'MINAFFET Diaspora Directorate',
    },
    {
      country: 'Kenya',
      flag: '🇰🇪',
      initiative: 'Sovereign Diaspora Bonds & Mobile Remittance Infrastructure',
      category: 'Financial Deepening & Capital Formation',
      results:
        'Integrated Central Bank infrastructure with M-Pesa to reduce transfer fees; issued multi-million dollar diaspora infrastructure bonds channeling expatriate capital into clean energy.',
      linkText: 'Kenya Diaspora Investment Forum',
    },
    {
      country: 'Morocco',
      flag: '🇲🇦',
      initiative: 'Marocains du Monde High-Tech Repatriation Program',
      category: 'Industrial & Aeronautical Cluster Talent',
      results:
        'Recruited thousands of French-trained Moroccan engineers into Casablanca aeronautics and Tangier automotive manufacturing clusters through 5-year income tax holidays.',
      linkText: 'Fondation Hassan II pour les MRE',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* SECTION HEADER */}
      <div className="pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-800 text-[11px] font-mono font-bold uppercase rounded-md">
            The Solution Paradigm
          </span>
          <span className="text-xs text-slate-500 font-mono">
            IOM Reintegration & African Union MPFA
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 tracking-tight">
          Return Migration, Diaspora Engagement & "Brain Circulation"
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 max-w-3xl leading-relaxed">
          Transitioning from permanent human capital depletion toward circular migration, diaspora capital mobilization, returnee tech entrepreneurship, and institutional knowledge transfers.
        </p>
      </div>

      {/* CORE PARADIGM SHIFT BANNER */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  Paradigm Evolution
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  From "Brain Drain" to "Brain Circulation" & Returnee Dynamism
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/10 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                {MIGRATION_OVERVIEW.returneeTechFoundersShare}% of VC Startups
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Returnee Entrepreneurship
                </span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-2xl font-extrabold text-white font-mono block">
                38.5%
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Over a third of venture-funded African tech startups (including unicorns like Flutterwave and Wave) feature returnee or diaspora-educated co-founders bridging Silicon Valley networks with local market demand.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  IOM Assisted Reintegration
                </span>
                <ShieldCheck className="w-4 h-4 text-teal-400" />
              </div>
              <span className="text-2xl font-extrabold text-white font-mono block">
                47,200+
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Annual African returnees supported through the IOM Assisted Voluntary Return and Reintegration (AVRR) program, receiving micro-enterprise grants, psychological support, and professional certifications.
              </p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Dual Citizenship Modernization
                </span>
                <Landmark className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-2xl font-extrabold text-white font-mono block">
                34 Nations
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Over 34 AU member states have now repealed restrictions against dual nationality, allowing overseas professionals to invest, purchase property, and participate in political processes at home without losing residency abroad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FLAGSHIP RETURN INITIATIVES ACROSS AFRICA */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Exemplary African Diaspora Engagement & Return Models
            </h4>
            <p className="text-xs text-slate-500">
              National case studies showcasing policy innovations in repatriating capital, talent, and civil rights.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {caseStudies.map(cs => (
            <div
              key={cs.country}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{cs.flag}</span>
                    <h5 className="text-sm font-bold text-slate-900">{cs.country}</h5>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                    {cs.category}
                  </span>
                </div>

                <h6 className="text-xs font-bold text-slate-800">{cs.initiative}</h6>
                <p className="text-xs text-slate-600 leading-relaxed">{cs.results}</p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-emerald-700">
                <span className="truncate">{cs.linkText}</span>
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BRAIN CIRCULATION POLICY ROADMAP */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-teal-600" />
              Strategic Policy Blueprint: 5 Pillars for Brain Circulation
            </h4>
            <p className="text-xs text-slate-500">
              Actionable structural interventions endorsed by the African Union Migration Policy Framework and IOM.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {BRAIN_CIRCULATION_ROADMAP.map((item, idx) => (
            <div
              key={item.title}
              className="p-4 rounded-xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                    Pillar {idx + 1}: {item.pillar}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      item.impactScore === 'Transformative'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.impactScore}
                  </span>
                </div>
                <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="text-left md:text-right shrink-0 space-y-1">
                <div className="text-[11px] font-mono">
                  <span className="text-slate-400">Benchmark: </span>
                  <span className="font-bold text-slate-800">{item.bestPracticeCountry}</span>
                </div>
                <span className="text-[10px] text-slate-500 block max-w-xs font-mono">
                  {item.implementationStatus}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

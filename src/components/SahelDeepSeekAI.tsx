import React, { useState } from 'react';
import { AESFlagIcon } from './AESFlagIcon';
import { 
  Sparkles, 
  Shield, 
  Loader2, 
  HelpCircle, 
  BrainCircuit, 
  Cpu, 
  TrendingUp, 
  Anchor, 
  Coins, 
  Flame, 
  ChevronRight, 
  AlertTriangle,
  Landmark
} from 'lucide-react';

interface SahelDeepSeekAIProps {
  corridor: string;
  securityRatio: number;
  aesStates: Array<{
    id: string;
    name: string;
    gdp: number;
    population: number;
    growthRate: number;
    unemployment: number;
    debtToGdp: number;
    highlight: string;
  }>;
}

export default function SahelDeepSeekAI({ corridor, securityRatio, aesStates }: SahelDeepSeekAIProps) {
  const [focus, setFocus] = useState<string>('financial');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [engine, setEngine] = useState<string>('');
  const [notice, setNotice] = useState<string | null>(null);

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setResponse('');
    setNotice(null);
    setEngine('');

    try {
      const res = await fetch('/api/sahel-deepseek-insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          corridor,
          securityRatio,
          focus,
          countries: aesStates
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.analysis);
        setEngine(data.engine || 'DeepSeek AI Engine');
        if (data.notice) {
          setNotice(data.notice);
        }
      } else {
        setResponse(`### **Analysis Engine Error**\n\nFailed to load DeepSeek insights: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setResponse(`### **Sovereign Network Offline**\n\nFailed to establish encrypted pipeline to DeepSeek API node: ${err.message || err}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Safe and beautiful markdown-like HTML formatter to bypass react-markdown dependency complexities in React 19
  const formatMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Headers
      if (line.startsWith('#### ')) {
        return <h5 key={idx} className="text-xs font-bold text-brand-text mt-4 mb-1.5 font-sans uppercase tracking-wider">{line.replace('#### ', '')}</h5>;
      }
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="text-sm font-bold text-amber-800 mt-5 mb-2.5 border-b border-brand-border/60 pb-1.5 flex items-center gap-2 font-display">
            <ChevronRight className="w-4 h-4 text-amber-700 shrink-0" />
            {line.replace('### ', '')}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-base font-bold text-brand-text mt-6 mb-3 font-display">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="text-lg font-bold text-brand-text mt-6 mb-3.5 font-display">{line.replace('# ', '')}</h2>;
      }

      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().replace(/^[\*\-]\s+/, '');
        return (
          <li key={idx} className="text-xs text-brand-muted ml-5 list-disc mb-1.5 leading-relaxed">
            {renderLineWithBold(cleanLine)}
          </li>
        );
      }

      // Normal text lines
      if (line.trim() === '') {
        return <div key={idx} className="h-2.5" />;
      }

      return <p key={idx} className="text-xs text-brand-muted mb-2 leading-relaxed font-sans">{renderLineWithBold(line)}</p>;
    });
  };

  const renderLineWithBold = (line: string) => {
    const parts = line.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="text-brand-text font-bold bg-amber-500/10 px-1 py-0.5 rounded border border-amber-500/10">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-6 border-l-4 border-l-amber-600 space-y-6" id="sahel-deepseek-ai-section">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-brand-border pb-4">
        <div className="flex items-center gap-4">
          <AESFlagIcon size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold font-mono tracking-wider text-amber-700 uppercase bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                Open Source AI Driven Research
              </span>
              <span className="text-[10px] text-emerald-700 font-mono tracking-wider uppercase flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                Cognitive Subsystem Active
              </span>
            </div>
            <h3 className="text-base font-bold text-brand-text font-display mt-1">AES Policy Intelligence Explorer</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Inquiry Controls */}
        <div className="lg:col-span-5 space-y-5">
          <p className="text-xs text-brand-muted leading-relaxed">
            Configure the AI research focus model. The engine will dynamically synthesize geopolitical trade-offs, fiscal limits, and logistics outcomes based on your current transport corridor routing and budget variables.
          </p>

          <div className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-brand-dim mb-2">
                1. Select Analytical Lens
              </label>
              <div className="grid grid-cols-1 gap-2">
                <button
                  onClick={() => setFocus('financial')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer text-xs flex gap-3 ${
                    focus === 'financial'
                      ? 'bg-slate-300/60 border-slate-600 font-bold text-brand-text shadow-xs'
                      : 'bg-brand-input hover:bg-brand-border-muted border-brand-border text-brand-muted'
                  }`}
                >
                  <Landmark className={`w-4 h-4 mt-0.5 shrink-0 ${focus === 'financial' ? 'text-amber-700' : 'text-slate-500'}`} />
                  <div>
                    <span className={`block font-bold ${focus === 'financial' ? 'text-brand-text' : 'text-brand-muted'}`}>Financial & Economic Analysis</span>
                    <span className="text-[10px] text-brand-dim font-normal mt-0.5 block">Examine macro-fiscal health, budget balances, deficit, & external/internal debts.</span>
                  </div>
                </button>

                <button
                  onClick={() => setFocus('tripartite')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer text-xs flex gap-3 ${
                    focus === 'tripartite'
                      ? 'bg-slate-300/60 border-slate-600 font-bold text-brand-text shadow-xs'
                      : 'bg-brand-input hover:bg-brand-border-muted border-brand-border text-brand-muted'
                  }`}
                >
                  <Coins className={`w-4 h-4 mt-0.5 shrink-0 ${focus === 'tripartite' ? 'text-amber-700' : 'text-slate-500'}`} />
                  <div>
                    <span className={`block font-bold ${focus === 'tripartite' ? 'text-brand-text' : 'text-brand-muted'}`}>Monetary Autonomy & Sahel Currency</span>
                    <span className="text-[10px] text-brand-dim font-normal mt-0.5 block">Analyze CFA Franc exit strategies & gold reserve backing.</span>
                  </div>
                </button>

                <button
                  onClick={() => setFocus('logistics')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer text-xs flex gap-3 ${
                    focus === 'logistics'
                      ? 'bg-slate-300/60 border-slate-600 font-bold text-brand-text shadow-xs'
                      : 'bg-brand-input hover:bg-brand-border-muted border-brand-border text-brand-muted'
                  }`}
                >
                  <TrendingUp className={`w-4 h-4 mt-0.5 shrink-0 ${focus === 'logistics' ? 'text-amber-700' : 'text-slate-500'}`} />
                  <div>
                    <span className={`block font-bold ${focus === 'logistics' ? 'text-brand-text' : 'text-brand-muted'}`}>Customs Union & Logistics Corridors</span>
                    <span className="text-[10px] text-brand-dim font-normal mt-0.5 block">Examine customs harmonization and transport corridors.</span>
                  </div>
                </button>

                <button
                  onClick={() => setFocus('budgetary')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer text-xs flex gap-3 ${
                    focus === 'budgetary'
                      ? 'bg-slate-300/60 border-slate-600 font-bold text-brand-text shadow-xs'
                      : 'bg-brand-input hover:bg-brand-border-muted border-brand-border text-brand-muted'
                  }`}
                >
                  <Shield className={`w-4 h-4 mt-0.5 shrink-0 ${focus === 'budgetary' ? 'text-amber-700' : 'text-slate-500'}`} />
                  <div>
                    <span className={`block font-bold ${focus === 'budgetary' ? 'text-brand-text' : 'text-brand-muted'}`}>Strategic Spending Balance (Security vs. Development)</span>
                    <span className="text-[10px] text-brand-dim font-normal mt-0.5 block">Evaluate security overhead vs social & infra capital.</span>
                  </div>
                </button>

                <button
                  onClick={() => setFocus('debt')}
                  className={`p-3 text-left rounded-xl border transition-all cursor-pointer text-xs flex gap-3 ${
                    focus === 'debt'
                      ? 'bg-slate-300/60 border-slate-600 font-bold text-brand-text shadow-xs'
                      : 'bg-brand-input hover:bg-brand-border-muted border-brand-border text-brand-muted'
                  }`}
                >
                  <Cpu className={`w-4 h-4 mt-0.5 shrink-0 ${focus === 'debt' ? 'text-amber-700' : 'text-slate-500'}`} />
                  <div>
                    <span className={`block font-bold ${focus === 'debt' ? 'text-brand-text' : 'text-brand-muted'}`}>Sovereign Debt & Joint Investment</span>
                    <span className="text-[10px] text-brand-dim font-normal mt-0.5 block">Model unified debt notes & Sahel development banks.</span>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={handleGenerateInsights}
              disabled={isLoading}
              className="w-full py-3.5 bg-brand-text hover:bg-brand-muted text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Processing Policy Analysis...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Generate Policy Projections
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: AI Analytical Outputs Display */}
        <div className="lg:col-span-7 bg-slate-300/15 border border-brand-border rounded-2xl p-5 flex flex-col h-[520px] overflow-y-auto relative database-scroll-container">
          {isLoading && (
            <div className="absolute inset-0 bg-slate-200/95 backdrop-blur-md flex flex-col items-center justify-center gap-4 z-10 rounded-2xl p-6">
              <Loader2 className="w-9 h-9 text-amber-700 animate-spin" />
              <div className="text-center space-y-1">
                <p className="text-xs font-mono text-amber-800 font-bold tracking-wider">AI POLICY ANALYSIS PIPELINE SECURED</p>
                <p className="text-[10px] text-brand-dim max-w-sm">
                  Calculating regional equilibrium margins, transit tariff friction, and budgetary reallocation trade-offs...
                </p>
              </div>
            </div>
          )}

          {/* Engine Header / Badge */}
          {engine && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 bg-slate-300/40 border border-brand-border px-3.5 py-2 rounded-xl">
              <div className="flex items-center gap-2 text-[10.5px] font-mono">
                <span className="text-brand-dim">Cognitive Engine:</span>
                <span className="text-amber-800 font-bold">{engine}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] text-brand-dim font-mono">
                <span>Status:</span>
                <span className="text-emerald-700 font-bold uppercase">SECURED</span>
              </div>
            </div>
          )}

          {notice && (
            <div className="mb-4 p-3 bg-amber-500/5 border border-amber-500/25 text-brand-muted text-[11px] rounded-xl flex items-start gap-2.5 shadow-2xs">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="text-amber-800 font-bold block">Interactive Explorer Environment Notice:</span>
                <span className="text-brand-dim block text-[10px]">{notice}</span>
              </div>
            </div>
          )}

          {response ? (
            <div className="space-y-1 flex-1 text-brand-muted" id="deepseek-sahel-response">
              {formatMarkdown(response)}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-brand-dim">
              <HelpCircle className="w-12 h-12 mb-4 stroke-slate-400 stroke-1" />
              <h4 className="text-xs font-bold text-brand-text mb-1.5 font-display">AI Analysis Engine Idle</h4>
              <p className="text-[11px] max-w-[340px] leading-relaxed text-brand-muted">
                Choose an analytical lens on the left and click **Generate Policy Projections** to compute macro-structural outcomes.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2 max-w-sm">
                <span className="text-[9.5px] font-mono bg-slate-300/45 border border-slate-400/30 text-brand-muted px-2 py-1 rounded">
                  Lomé, Cotonou, or Trans-Sahara
                </span>
                <span className="text-[9.5px] font-mono bg-slate-300/45 border border-slate-400/30 text-brand-muted px-2 py-1 rounded">
                  Security Budget Sensitivity
                </span>
                <span className="text-[9.5px] font-mono bg-slate-300/45 border border-slate-400/30 text-brand-muted px-2 py-1 rounded">
                  Sovereign Trade-offs
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

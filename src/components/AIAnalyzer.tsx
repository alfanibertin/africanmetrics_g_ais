import React, { useState } from 'react';
import { Country } from '../types';
import { FileText, Loader2, Sparkles, Send, HelpCircle, ArrowUpRight } from 'lucide-react';

interface AIAnalyzerProps {
  countries: Country[];
  selectedCountryId?: string;
  setSelectedCountryId?: (id: string) => void;
}

export default function AIAnalyzer({
  countries,
  selectedCountryId: externalSelectedId,
  setSelectedCountryId: externalSetSelectedId,
}: AIAnalyzerProps) {
  const [internalSelectedId, setInternalSelectedId] = useState<string>('nigeria');
  const selectedCountryId = externalSelectedId !== undefined ? externalSelectedId : internalSelectedId;
  const setSelectedCountryId = externalSetSelectedId !== undefined ? externalSetSelectedId : setInternalSelectedId;

  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>('');
  const [warning, setWarning] = useState<string | null>(null);
  const [isLive, setIsLive] = useState<boolean>(false);

  const selectedCountry = countries.find(c => c.id === selectedCountryId) || countries[0];

  const handleGenerateReport = async (questionToAsk?: string) => {
    setIsLoading(true);
    setResponse('');
    setWarning(null);
    setIsLive(false);

    try {
      const res = await fetch('/api/analyze-country', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          countryId: selectedCountry.id,
          customQuestion: questionToAsk || null,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResponse(data.analysis);
        setIsLive(!!data.isLive);
        if (data.warning) {
          setWarning(data.warning);
        }
      } else {
        setResponse(`### **Error Analyzing Country**\n\nFailed to load analysis: ${data.error || 'Unknown error'}`);
      }
    } catch (err: any) {
      setResponse(`### **Network Error**\n\nFailed to communicate with economic analysis server: ${err.message || err}`);
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
        return <h5 key={idx} className="text-xs font-bold text-brand-text mt-4 mb-1.5">{line.replace('#### ', '')}</h5>;
      }
      if (line.startsWith('### ')) {
        return <h4 key={idx} className="text-sm font-bold text-[#c2410c] mt-4 mb-2 border-b border-brand-border pb-1 flex items-center gap-2 font-display">{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={idx} className="text-base font-bold text-brand-text mt-5 mb-2.5 font-display">{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={idx} className="text-lg font-bold text-brand-text mt-5 mb-3 font-display">{line.replace('# ', '')}</h2>;
      }

      // Bullet points
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const cleanLine = line.trim().replace(/^[\*\-]\s+/, '');
        return (
          <li key={idx} className="text-xs text-brand-muted ml-4 list-disc mb-1 leading-relaxed">
            {renderLineWithBold(cleanLine)}
          </li>
        );
      }

      // Normal text lines
      if (line.trim() === '') {
        return <div key={idx} className="h-2" />;
      }

      return <p key={idx} className="text-xs text-brand-muted mb-2 leading-relaxed">{renderLineWithBold(line)}</p>;
    });
  };

  const renderLineWithBold = (line: string) => {
    const parts = line.split('**');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="text-brand-text font-semibold">{part}</strong>;
      }
      return part;
    });
  };

  const sampleQuestions = [
    `How can ${selectedCountry?.name} leverage AfCFTA to double its trade surplus?`,
    `What structural reforms are needed to lower ${selectedCountry?.name}'s unemployment?`,
    `How will current global energy/commodity shifts affect ${selectedCountry?.name}'s GDP in 5 years?`
  ];

  return (
    <div className="bg-brand-card border border-brand-border rounded-3xl p-6 flex flex-col h-full shadow-xs" id="gemini-ai-analyzer-panel">
      <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#c2410c]/10 border border-[#c2410c]/20 rounded-xl text-[#c2410c]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-brand-text font-display tracking-tight">Macroeconomic Policy Assistant</h3>
            <p className="text-xs text-brand-muted">Generate AI-powered statistical summaries, policy forecasts & structural insights</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
        {/* Input Configuration Panel */}
        <div className="md:col-span-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-dim mb-1.5 font-mono">Select Economy</label>
              <select
                value={selectedCountryId}
                onChange={(e) => setSelectedCountryId(e.target.value)}
                className="w-full bg-brand-input border border-brand-border text-brand-text text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#c2410c]/40 font-sans cursor-pointer shadow-2xs"
                id="analyzer-country-select"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.id} className="bg-brand-card text-brand-text">
                    {c.name} ({c.region} Africa)
                  </option>
                ))}
              </select>
            </div>

            {/* Micro Indicators Review */}
            <div className="bg-brand-input/40 border border-brand-border rounded-2xl p-4.5 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-dim">Est. GDP:</span>
                <span className="text-brand-text font-bold">{`$${selectedCountry.gdp} Billion`}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-dim">Annual Growth:</span>
                <span className="text-[#15803d] font-bold">+{selectedCountry.growthRate}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-dim">Est. Population:</span>
                <span className="text-brand-text font-bold">{selectedCountry.population} Million</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-dim">Unemployment Rate:</span>
                <span className="text-[#ca8a04] font-bold">{selectedCountry.unemployment}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-brand-dim">Debt to GDP:</span>
                <span className="text-[#9a3412] font-bold">{selectedCountry.debtToGdp}%</span>
              </div>
            </div>

            {/* Custom Question input */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-brand-dim mb-1.5 font-mono">Custom Policy Query</label>
              <div className="relative">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Inquire about AfCFTA, reforms, or fiscal outlook..."
                  className="w-full bg-brand-input border border-brand-border text-brand-text text-xs rounded-xl pl-3 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#c2410c]/40 font-sans shadow-2xs placeholder-brand-dim"
                  id="custom-ai-inquiry"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customQuestion.trim()) {
                      handleGenerateReport(customQuestion);
                      setCustomQuestion('');
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (customQuestion.trim()) {
                      handleGenerateReport(customQuestion);
                      setCustomQuestion('');
                    }
                  }}
                  disabled={!customQuestion.trim() || isLoading}
                  className="absolute right-2.5 top-2 text-brand-dim hover:text-[#c2410c] disabled:opacity-40 transition cursor-pointer"
                  id="submit-ai-inquiry"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <button
              onClick={() => handleGenerateReport()}
              disabled={isLoading}
              className="w-full py-3 bg-[#c2410c] hover:bg-[#a2370a] text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              id="generate-full-report-btn"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Compiling Macroeconomic Projections...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  Generate Macroeconomic Brief
                </>
              )}
            </button>

            {/* Quick Prompts */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider text-brand-dim font-mono flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-brand-dim" /> Recommended Policy Inquiries
              </span>
              <div className="space-y-1">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleGenerateReport(q)}
                    disabled={isLoading}
                    className="w-full text-left bg-brand-input hover:bg-brand-border-muted border border-brand-border p-2 text-[10px] text-brand-muted hover:text-brand-text rounded-lg transition line-clamp-1 font-sans cursor-pointer disabled:opacity-50 flex items-center justify-between gap-1"
                  >
                    <span>{q}</span>
                    <ArrowUpRight className="w-3 h-3 text-brand-dim shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output Report Display Panel */}
        <div className="md:col-span-7 bg-brand-input/30 border border-brand-border rounded-2xl p-5 flex flex-col h-[450px] md:h-[450px] overflow-y-auto relative shadow-2xs database-scroll-container">
          {isLoading && (
            <div className="absolute inset-0 bg-brand-card/90 flex flex-col items-center justify-center gap-3 z-10 rounded-2xl">
              <Loader2 className="w-8 h-8 text-[#c2410c] animate-spin" />
              <p className="text-xs font-mono text-brand-muted">Simulating general equilibrium matrices & AI commentary...</p>
            </div>
          )}

          {/* Prominent Colored Banner above the output */}
          {response && (
            isLive ? (
              <div className="mb-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs rounded-xl p-3 flex items-center gap-2.5 shadow-2xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                <span>LIVE REPORT MODE — Powered by active Gemini 2.5 API.</span>
              </div>
            ) : (
              <div className="mb-4 bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs rounded-xl p-3 flex items-start gap-2.5 shadow-2xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse shrink-0 mt-1" />
                <div>
                  <span className="block">SIMULATED BRIEF MODE</span>
                  <span className="text-[10px] text-brand-dim font-normal block mt-0.5">Illustrative analysis only. Set a GEMINI_API_KEY in secrets to enable live real-time analysis.</span>
                </div>
              </div>
            )
          )}

          {warning && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] rounded-xl flex items-start gap-2 shadow-2xs">
              <span className="text-[#ca8a04] font-bold">⚠️ Notice:</span>
              <span>{warning}</span>
            </div>
          )}

          {response ? (
            <div className="space-y-1 flex-1 text-brand-text" id="ai-response-container">
              {formatMarkdown(response)}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-brand-dim">
              <FileText className="w-10 h-10 mb-3 stroke-brand-border stroke-1" />
              <h4 className="text-xs font-semibold text-brand-muted mb-1 font-display">No Brief Generated</h4>
              <p className="text-[11px] max-w-[280px]">
                Select any African nation on the left and trigger **Generate Macroeconomic Brief** to launch our LLM economic advisor.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { REGIONAL_SCREENSHOT_VALUES, COUNTRIES, getCountryFlag } from '../data';
import { CountryFlag } from './CountryFlag';

interface AfricaMapProps {
  selectedRegion: string | null;
  onSelectRegion: (region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern' | null) => void;
}

export default function AfricaMap({ selectedRegion, onSelectRegion }: AfricaMapProps) {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Stylized coordinates for 5 simplified overlapping SVG regions of Africa representing earth, clay, and flora
  const regions = [
    {
      id: 'Northern',
      name: 'North Africa',
      color: 'fill-[#ca8a04]/10 hover:fill-[#ca8a04]/20 stroke-[#ca8a04]/60',
      activeColor: 'fill-[#ca8a04]/30 stroke-[#ca8a04]',
      dotColor: 'bg-[#ca8a04]',
      tooltipAlign: 'top-10 left-[45%]',
      path: 'M 70 80 L 250 50 L 320 100 L 280 150 L 160 160 L 60 140 Z',
    },
    {
      id: 'Western',
      name: 'West Africa',
      color: 'fill-[#0f766e]/10 hover:fill-[#0f766e]/20 stroke-[#0f766e]/60',
      activeColor: 'fill-[#0f766e]/30 stroke-[#0f766e]',
      dotColor: 'bg-[#0f766e]',
      tooltipAlign: 'top-[160px] left-[15%]',
      path: 'M 40 140 L 160 160 L 170 220 L 100 230 L 40 190 Z',
    },
    {
      id: 'Eastern',
      name: 'East Africa',
      color: 'fill-[#d97706]/10 hover:fill-[#d97706]/20 stroke-[#d97706]/60',
      activeColor: 'fill-[#d97706]/30 stroke-[#d97706]',
      dotColor: 'bg-[#d97706]',
      tooltipAlign: 'top-[180px] left-[65%]',
      path: 'M 250 140 L 330 140 L 350 180 L 300 240 L 260 250 L 230 190 Z',
    },
    {
      id: 'Central',
      name: 'Central Africa',
      color: 'fill-[#15803d]/10 hover:fill-[#15803d]/20 stroke-[#15803d]/60',
      activeColor: 'fill-[#15803d]/30 stroke-[#15803d]',
      dotColor: 'bg-[#15803d]',
      tooltipAlign: 'top-[220px] left-[42%]',
      path: 'M 160 160 L 250 140 L 230 190 L 260 250 L 180 250 L 170 220 Z',
    },
    {
      id: 'Southern',
      name: 'Southern Africa',
      color: 'fill-[#9a3412]/10 hover:fill-[#9a3412]/20 stroke-[#9a3412]/60',
      activeColor: 'fill-[#9a3412]/30 stroke-[#9a3412]',
      dotColor: 'bg-[#9a3412]',
      tooltipAlign: 'bottom-10 left-[50%]',
      path: 'M 180 250 L 260 250 L 240 340 L 200 340 Z M 290 280 L 310 270 L 300 310 Z',
    },
  ];

  return (
    <div className="relative bg-brand-card border border-brand-border rounded-3xl p-6 flex flex-col items-center justify-center min-h-[420px] h-full overflow-hidden shadow-xs" id="africa-map-card">
      <div className="absolute top-6 left-6">
        <h3 className="text-lg font-bold text-brand-text font-display tracking-tight">Interactive Map</h3>
        <p className="text-xs text-brand-muted">Select regions to filter economic micro-indicators</p>
      </div>

      {selectedRegion && (
        <button
          onClick={() => onSelectRegion(null)}
          className="absolute top-6 right-6 px-3 py-1 bg-brand-input hover:bg-brand-border text-xs text-brand-muted hover:text-brand-text rounded-full border border-brand-border transition cursor-pointer"
          id="clear-region-filter"
        >
          Reset Filter
        </button>
      )}

      {/* Stylized SVG Map */}
      <div className="relative w-full max-w-[400px] h-[360px] mt-8">
        <svg viewBox="0 0 380 380" className="w-full h-full">
          <defs>
            <pattern id="map-grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.015)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" className="rounded-2xl" />

          {regions.map((region) => {
            const isActive = selectedRegion === region.id;
            const isHovered = hoveredRegion === region.id;

            return (
              <path
                key={region.id}
                d={region.path}
                className={`transition-all duration-300 stroke-[1.5] cursor-pointer ${
                  isActive ? region.activeColor : region.color
                }`}
                onClick={() => onSelectRegion(isActive ? null : (region.id as any))}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                style={{
                  filter: isHovered || isActive ? 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' : 'none',
                  transformOrigin: 'center',
                }}
              />
            );
          })}
        </svg>

        {/* Dynamic Tooltip Info overlay */}
        {regions.map((region) => {
          const isVisible = hoveredRegion === region.id || selectedRegion === region.id;
          if (!isVisible) return null;

          const stats = REGIONAL_SCREENSHOT_VALUES[region.id as keyof typeof REGIONAL_SCREENSHOT_VALUES];
          const regionCountries = COUNTRIES
            .filter((c) => c.region === region.id)
            .sort((a, b) => b.gdp - a.gdp);

          return (
            <div
              key={region.id}
              className={`absolute ${region.tooltipAlign} pointer-events-auto bg-brand-card/95 backdrop-blur-md border border-brand-border text-brand-text rounded-2xl p-4 shadow-xl transition-all duration-300 z-30 w-72 md:w-80 flex flex-col gap-3 max-h-[300px] overflow-hidden`}
              style={{
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div>
                <p className="text-xs font-bold text-brand-text flex items-center gap-1.5 border-b border-brand-border pb-1.5 mb-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${region.dotColor}`} />
                  {region.name} Overview
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-brand-muted font-mono mb-2">
                  <div className="flex justify-between">
                    <span>Countries:</span>
                    <span className="font-bold text-brand-text">{stats.countriesCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Est. GDP:</span>
                    <span className="font-bold text-brand-text">{`$${stats.gdp}B`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Unemployment:</span>
                    <span className="font-bold text-brand-text">{stats.unemployment}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Debt to GDP:</span>
                    <span className="font-bold text-brand-text">{stats.debtToGdp}%</span>
                  </div>
                </div>
              </div>

              {/* Individual countries list */}
              <div className="border-t border-brand-border pt-2 flex flex-col min-h-0">
                <div className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-500 mb-1 flex justify-between">
                  <span>Sovereign Entity</span>
                  <div className="flex gap-4">
                    <span className="w-16 text-right">GDP</span>
                    <span className="w-14 text-right">Pop.</span>
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[140px] pr-1 database-scroll-container space-y-1.5">
                  {regionCountries.map((country) => (
                    <div key={country.id} className="flex justify-between items-center text-[11px] font-mono hover:bg-slate-300/15 py-0.5 px-1 rounded transition duration-150">
                      <span className="text-brand-text truncate font-semibold pr-2 flex items-center gap-1.5" title={country.name}>
                        <CountryFlag id={country.id} name={country.name} size="sm" />
                        <span className="truncate">{country.name}</span>
                      </span>
                      <div className="flex gap-4 shrink-0 text-brand-muted">
                        <span className="w-16 text-right text-slate-900 font-bold">{`$${country.gdp.toFixed(1)}B`}</span>
                        <span className="w-14 text-right">{country.population.toFixed(1)}M</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-2 text-[11px] text-brand-dim font-mono select-none">
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#ca8a04]" /> Northern</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#0f766e]" /> Western</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#d97706]" /> Eastern</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#15803d]" /> Central</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-[#9a3412]" /> Southern</span>
      </div>
    </div>
  );
}

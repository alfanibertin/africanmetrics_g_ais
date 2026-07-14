import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { REGIONAL_SCREENSHOT_VALUES } from '../data';
import { TrendingUp, Activity, HelpCircle, Calendar } from 'lucide-react';

interface DashboardChartsProps {
  activeTab: 'gdp' | 'debt' | 'unemployment' | 'overview';
  selectedRegion: string | null;
  onSelectRegion: (region: any) => void;
}

// Simulated real-world high-fidelity time series data (2021-2026) for each region and indicator
const HISTORICAL_DATA = {
  gdp: {
    Northern: [540.2, 565.8, 588.0, 601.4, 615.3, 623.8],
    Western: [680.5, 712.0, 738.4, 755.2, 772.8, 789.2],
    Eastern: [380.4, 395.6, 412.0, 425.8, 436.4, 445.6],
    Central: [155.0, 162.4, 169.8, 175.2, 181.6, 187.3],
    Southern: [370.2, 375.8, 381.4, 386.9, 392.5, 398.4],
    All: [425.3, 442.3, 457.9, 468.9, 479.7, 488.9], // average of regions
  },
  debt: {
    Northern: [58.2, 61.5, 63.8, 65.4, 67.2, 68.5],
    Western: [44.5, 46.8, 49.2, 51.5, 52.8, 53.4],
    Eastern: [48.0, 49.8, 51.2, 52.5, 53.4, 54.2],
    Central: [45.2, 47.0, 48.5, 50.2, 51.4, 52.4],
    Southern: [65.4, 68.2, 71.5, 73.4, 74.8, 75.8],
    All: [52.3, 54.7, 56.8, 58.6, 59.9, 60.9], // average of regions
  },
  unemployment: {
    Northern: [14.2, 13.8, 13.2, 12.8, 12.4, 12.1],
    Western: [9.5, 9.2, 8.9, 8.7, 8.5, 8.4],
    Eastern: [7.8, 7.5, 7.2, 7.0, 6.9, 6.8],
    Central: [11.2, 10.8, 10.4, 10.1, 9.9, 9.7],
    Southern: [17.5, 17.0, 16.5, 16.0, 15.6, 15.3],
    All: [12.0, 11.7, 11.2, 10.9, 10.7, 10.5], // average of regions
  }
};

export default function DashboardCharts({
  activeTab,
  selectedRegion,
  onSelectRegion,
}: DashboardChartsProps) {
  // Track hovered states to enable interactive trend line visualization
  const [hoveredRegion, setHoveredRegion] = useState<string>('All');
  const [hoveredYearIdx, setHoveredYearIdx] = useState<number>(5); // default to 2026 (index 5)

  // Keep hoveredRegion synchronized with selectedRegion when mouse leaves
  useEffect(() => {
    setHoveredRegion(selectedRegion || 'All');
  }, [selectedRegion]);

  // Map our data to Recharts compatible format using official regional colors
  const chartData = [
    {
      name: 'Northern',
      displayName: 'Northern',
      gdp: REGIONAL_SCREENSHOT_VALUES.Northern.gdp,
      debt: REGIONAL_SCREENSHOT_VALUES.Northern.debtToGdp,
      unemployment: REGIONAL_SCREENSHOT_VALUES.Northern.unemployment,
      population: REGIONAL_SCREENSHOT_VALUES.Northern.population,
      color: '#ca8a04', // Sahara Ochre Gold
    },
    {
      name: 'Western',
      displayName: 'Western',
      gdp: REGIONAL_SCREENSHOT_VALUES.Western.gdp,
      debt: REGIONAL_SCREENSHOT_VALUES.Western.debtToGdp,
      unemployment: REGIONAL_SCREENSHOT_VALUES.Western.unemployment,
      population: REGIONAL_SCREENSHOT_VALUES.Western.population,
      color: '#0f766e', // Gulf Teal
    },
    {
      name: 'Eastern',
      displayName: 'Eastern',
      gdp: REGIONAL_SCREENSHOT_VALUES.Eastern.gdp,
      debt: REGIONAL_SCREENSHOT_VALUES.Eastern.debtToGdp,
      unemployment: REGIONAL_SCREENSHOT_VALUES.Eastern.unemployment,
      population: REGIONAL_SCREENSHOT_VALUES.Eastern.population,
      color: '#d97706', // Sunrise Amber
    },
    {
      name: 'Central',
      displayName: 'Central',
      gdp: REGIONAL_SCREENSHOT_VALUES.Central.gdp,
      debt: REGIONAL_SCREENSHOT_VALUES.Central.debtToGdp,
      unemployment: REGIONAL_SCREENSHOT_VALUES.Central.unemployment,
      population: REGIONAL_SCREENSHOT_VALUES.Central.population,
      color: '#15803d', // Congo Forest Green
    },
    {
      name: 'Southern',
      displayName: 'Southern',
      gdp: REGIONAL_SCREENSHOT_VALUES.Southern.gdp,
      text: 'Southern',
      debt: REGIONAL_SCREENSHOT_VALUES.Southern.debtToGdp,
      unemployment: REGIONAL_SCREENSHOT_VALUES.Southern.unemployment,
      population: REGIONAL_SCREENSHOT_VALUES.Southern.population,
      color: '#9a3412', // Terracotta Clay
    },
  ];

  // Custom styling for Tooltip in clean editorial light warm sandstone mode
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-brand-card border border-brand-border p-4 rounded-2xl shadow-xl font-sans animate-fade-in z-50">
          <p className="text-xs font-bold text-brand-text flex items-center gap-1.5 mb-2.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
            {data.displayName} Africa
          </p>
          <div className="space-y-1.5 text-[11px] font-mono text-brand-muted">
            <div className="flex justify-between gap-6">
              <span>Est. GDP:</span>
              <span className="font-bold text-brand-text">{`$${data.gdp} Billion`}</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Debt to GDP:</span>
              <span className="font-bold text-[#9a3412]">{data.debt}%</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Unemployment:</span>
              <span className="font-bold text-[#0f766e]">{data.unemployment}%</span>
            </div>
            <div className="flex justify-between gap-6">
              <span>Population:</span>
              <span className="font-bold text-[#ca8a04]">{data.population}M</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const handleBarClick = (data: any) => {
    if (data && data.name) {
      onSelectRegion(selectedRegion === data.name ? null : data.name);
    }
  };

  // Extract properties for active trend tab
  const trendIndicator = activeTab === 'overview' ? 'gdp' : activeTab;
  const indicatorLabel = {
    gdp: 'GDP Growth ($B)',
    debt: 'Debt to GDP (%)',
    unemployment: 'Unemployment (%)',
  }[trendIndicator];

  const indicatorColor = {
    gdp: '#c2410c', // Terracotta Orange
    debt: '#9a3412', // Deep Bronze
    unemployment: '#0f766e', // Savannah Sage/Teal
  }[trendIndicator];

  const activeRegionKey = hoveredRegion === 'All' ? 'All' : hoveredRegion;
  const trendPoints = HISTORICAL_DATA[trendIndicator][activeRegionKey as keyof typeof HISTORICAL_DATA['gdp']] || [];
  const years = [2021, 2022, 2023, 2024, 2025, 2026];

  const currentValue = trendPoints[hoveredYearIdx] ?? 0;
  const currentYear = years[hoveredYearIdx];

  const startVal = trendPoints[0];
  const changePercent = startVal ? ((currentValue - startVal) / startVal) * 100 : 0;

  // Render SVG Sparkline coordinate mapping
  const minVal = Math.min(...trendPoints);
  const maxVal = Math.max(...trendPoints);
  const valRange = maxVal - minVal || 1;
  const paddingRatio = 0.15;
  const yMin = minVal - valRange * paddingRatio;
  const yMax = maxVal + valRange * paddingRatio;
  const yRange = yMax - yMin;

  const svgWidth = 190;
  const svgHeight = 75;

  const svgCoords = trendPoints.map((val, idx) => {
    const x = (idx / (trendPoints.length - 1)) * (svgWidth - 24) + 12;
    const y = svgHeight - ((val - yMin) / yRange) * (svgHeight - 24) - 12;
    return { x, y, val, year: years[idx] };
  });

  const pathD = `M ${svgCoords.map(c => `${c.x} ${c.y}`).join(' L ')}`;

  const handleChartMouseMove = (state: any) => {
    if (state && state.activeLabel) {
      const regionName = state.activeLabel;
      if (regionName && regionName !== hoveredRegion) {
        setHoveredRegion(regionName);
      }
    }
  };

  const handleChartMouseLeave = () => {
    setHoveredRegion(selectedRegion || 'All');
  };

  return (
    <div 
      className="w-full bg-brand-input/25 border border-brand-border rounded-2xl p-4.5 flex flex-col lg:flex-row gap-6 relative" 
      id="charts-visualization-wrapper"
    >
      {/* Primary Comparative Chart Area */}
      <div className="flex-1 h-[255px]">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'gdp' ? (
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }} 
              onClick={handleBarClick}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" vertical={false} />
              <XAxis
                dataKey="displayName"
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
                tickFormatter={(value) => `$${value}B`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.015)' }} />
              <Bar dataKey="gdp" radius={[8, 8, 0, 0]} barSize={32}>
                {chartData.map((entry, index) => {
                  const isSelected = selectedRegion === entry.name;
                  const isHovered = hoveredRegion === entry.name;
                  const hasSelection = selectedRegion !== null;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill="#c2410c" // Terracotta Clay (Primary African theme)
                      opacity={hasSelection ? (isSelected ? 1.0 : 0.4) : (isHovered || hoveredRegion === 'All' ? 1.0 : 0.6)}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          ) : activeTab === 'debt' ? (
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }} 
              onClick={handleBarClick}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" vertical={false} />
              <XAxis
                dataKey="displayName"
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.015)' }} />
              <Bar dataKey="debt" radius={[8, 8, 0, 0]} barSize={32}>
                {chartData.map((entry, index) => {
                  const isSelected = selectedRegion === entry.name;
                  const isHovered = hoveredRegion === entry.name;
                  const hasSelection = selectedRegion !== null;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill="#9a3412" // Deep Bronze Clay
                      opacity={hasSelection ? (isSelected ? 1.0 : 0.4) : (isHovered || hoveredRegion === 'All' ? 1.0 : 0.6)}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          ) : activeTab === 'unemployment' ? (
            <BarChart 
              data={chartData} 
              margin={{ top: 10, right: 10, left: -20, bottom: 5 }} 
              onClick={handleBarClick}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" vertical={false} />
              <XAxis
                dataKey="displayName"
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dx={-5}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.015)' }} />
              <Bar dataKey="unemployment" radius={[8, 8, 0, 0]} barSize={32}>
                {chartData.map((entry, index) => {
                  const isSelected = selectedRegion === entry.name;
                  const isHovered = hoveredRegion === entry.name;
                  const hasSelection = selectedRegion !== null;
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill="#0f766e" // Savannah Sage/Teal Green
                      opacity={hasSelection ? (isSelected ? 1.0 : 0.4) : (isHovered || hoveredRegion === 'All' ? 1.0 : 0.6)}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                    />
                  );
                })}
              </Bar>
            </BarChart>
          ) : (
            <LineChart 
              data={chartData} 
              margin={{ top: 15, right: 20, left: -20, bottom: 5 }}
              onMouseMove={handleChartMouseMove}
              onMouseLeave={handleChartMouseLeave}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.03)" />
              <XAxis
                dataKey="displayName"
                stroke="#8c7e6b"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis stroke="#8c7e6b" fontSize={11} tickLine={false} axisLine={false} dx={-5} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="gdp"
                stroke="#c2410c"
                strokeWidth={3}
                name="GDP ($B)"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="unemployment"
                stroke="#0f766e"
                strokeWidth={3}
                name="Unemployment (%)"
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="debt"
                stroke="#d97706"
                strokeWidth={3}
                name="Debt to GDP (%)"
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Dynamic Interactive Time-Series Trend Panel */}
      <div className="w-full lg:w-[230px] shrink-0 border-t lg:border-t-0 lg:border-l border-brand-border/40 pt-4 lg:pt-0 lg:pl-5.5 flex flex-col justify-between font-sans">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold font-mono tracking-wider text-amber-700 uppercase bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/15">
              Interactive Trend
            </span>
            <div className="flex items-center gap-1 text-[10px] font-mono text-brand-dim">
              <Calendar className="w-3 h-3" />
              <span>{currentYear}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-brand-text block tracking-tight truncate">
              {hoveredRegion === 'All' ? 'All-Africa Average' : `${hoveredRegion} Africa`}
            </span>
            <span className="text-[10px] text-brand-muted font-mono block mt-0.5">
              {indicatorLabel}
            </span>
          </div>

          <div className="bg-brand-card/40 border border-brand-border/60 rounded-xl p-3 flex items-baseline justify-between shadow-2xs">
            <div>
              <span className="text-xl font-bold font-display text-brand-text">
                {trendIndicator === 'gdp' ? `$${currentValue.toFixed(1)}B` : `${currentValue.toFixed(1)}%`}
              </span>
              <span className="text-[9px] text-brand-dim font-mono block mt-0.5">
                Valuation Profile
              </span>
            </div>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-sm ${
              changePercent >= 0 
                ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/15' 
                : 'bg-rose-500/10 text-rose-700 border border-rose-500/15'
            }`}>
              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* High-Fidelity SVG Sparkline Graph */}
        <div className="mt-4">
          <div className="relative flex justify-center bg-white/5 rounded-xl border border-brand-border/30 p-1">
            <svg width={svgWidth} height={svgHeight} className="overflow-visible">
              {/* Soft backdrop grid lines */}
              <line x1="0" y1={svgHeight - 12} x2={svgWidth} y2={svgHeight - 12} stroke="rgba(0,0,0,0.04)" strokeDasharray="2 2" />
              <line x1="0" y1={svgHeight / 2} x2={svgWidth} y2={svgHeight / 2} stroke="rgba(0,0,0,0.04)" strokeDasharray="2 2" />
              
              {/* Elegant Smooth Trend Line */}
              <path
                d={pathD}
                fill="none"
                stroke={indicatorColor}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Interactive Data Points and Invisible Hit Areas */}
              {svgCoords.map((c, idx) => (
                <g key={idx}>
                  {/* Visual Dot */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={hoveredYearIdx === idx ? 5.5 : 3}
                    fill={hoveredYearIdx === idx ? indicatorColor : '#ffffff'}
                    stroke={indicatorColor}
                    strokeWidth={hoveredYearIdx === idx ? 1.5 : 2}
                    className="transition-all duration-200 cursor-pointer"
                  />
                  {/* Invisible broad hitbox for effortless pointer precision */}
                  <circle
                    cx={c.x}
                    cy={c.y}
                    r={15}
                    fill="transparent"
                    onMouseEnter={() => setHoveredYearIdx(idx)}
                    className="cursor-pointer"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Interactive Year Navigation Rails */}
          <div className="flex justify-between text-[9px] font-mono font-bold text-brand-dim mt-2 px-1">
            {years.map((year, idx) => (
              <button
                key={year}
                onMouseEnter={() => setHoveredYearIdx(idx)}
                onClick={() => setHoveredYearIdx(idx)}
                className={`transition-all duration-150 px-1 rounded-sm cursor-pointer ${
                  hoveredYearIdx === idx 
                    ? 'text-brand-text bg-slate-300/60 font-black scale-105' 
                    : 'text-brand-dim hover:text-brand-text'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Globe, Shield, TrendingUp, FileText, Download, RefreshCw } from 'lucide-react';

interface HeaderProps {
  activePage: 'all' | 'sahel' | 'regional' | 'detail';
  setActivePage: (page: 'all' | 'sahel' | 'regional' | 'detail') => void;
  handleExportCSV: () => void;
  handleRefresh: () => void;
  isRefreshing: boolean;
}

export default function Header({
  activePage,
  setActivePage,
  handleExportCSV,
  handleRefresh,
  isRefreshing,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 text-white backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-3.5 gap-4">
          
          {/* BRANDING SECTION */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-800 rounded-xl border border-slate-700 shadow-sm shrink-0">
                <Globe className="w-5 h-5 text-teal-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold font-mono tracking-wider text-teal-400 uppercase bg-teal-500/10 px-2 py-0.5 rounded-md">
                    AEIP
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono tracking-wider uppercase hidden sm:inline">
                    Macroeconomic Surveillance
                  </span>
                </div>
                <h1 className="text-sm font-bold tracking-tight text-white mt-0.5">
                  African Economic Intelligence Platform
                </h1>
              </div>
            </div>
          </div>

          {/* NAVIGATION MENU TABS */}
          <nav className="flex flex-wrap items-center gap-1.5" aria-label="Global navigation">
            <button
              onClick={() => setActivePage('all')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activePage === 'all'
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              All Africa Core Data
            </button>
            <button
              onClick={() => setActivePage('sahel')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activePage === 'sahel'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Sahel Alliance
            </button>
            <button
              onClick={() => setActivePage('regional')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activePage === 'regional'
                  ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              Regional Hub
            </button>
            <button
              onClick={() => setActivePage('detail')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activePage === 'detail'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Detailed Country Profiles
            </button>
          </nav>

          {/* ACTION CONTROLS */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportCSV}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
              title="Export Database to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
              title="Reset Database Baseline"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-slate-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Resetting...' : 'Reset'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

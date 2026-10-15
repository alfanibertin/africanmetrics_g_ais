import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Shield, 
  TrendingUp, 
  FileText, 
  Download, 
  RefreshCw, 
  HeartPulse, 
  Compass, 
  Landmark, 
  Menu, 
  X, 
  Search, 
  ChevronRight
} from 'lucide-react';

export type PageId = 'all' | 'sahel' | 'regional' | 'europe' | 'detail' | 'health' | 'migration';

interface TabItem {
  id: PageId;
  label: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  {
    id: 'all',
    label: 'All Africa Overview',
    category: 'Continental Surveillance',
    description: 'Macroeconomic surveillance engine across 54 sovereign economies: GDP, inflation, and fiscal balances.',
    icon: Globe,
  },
  {
    id: 'sahel',
    label: 'Sahel Alliance',
    category: 'Geopolitics & Confederal Union',
    description: 'Alliance of Sahel States (Burkina Faso, Mali, Niger) FY 2026 citizen budgets and external debt portfolios.',
    icon: Shield,
  },
  {
    id: 'migration',
    label: 'Migration & Brain Drain',
    category: 'Demographics & Human Capital',
    description: 'IOM World Migration Report surveillance: top bilateral corridors, remittance inflows, and skill retention.',
    icon: Compass,
  },
  {
    id: 'health',
    label: 'Health & Demographics',
    category: 'Human Development',
    description: 'Demographic transition, life expectancy trajectories, and per-capita public health expenditures.',
    icon: HeartPulse,
  },
  {
    id: 'regional',
    label: 'China FDI Hub',
    category: 'Strategic Investment',
    description: 'Chinese foreign direct investment stock ($53.8B), infrastructure EPCs, and 2,800+ corporate operators.',
    icon: TrendingUp,
  },
  {
    id: 'europe',
    label: 'Europe FDI Hub',
    category: 'Strategic Investment',
    description: 'European foreign direct investment stock ($268.4B), EU Global Gateway corridors, and multinational footprints.',
    icon: Landmark,
  },
  {
    id: 'detail',
    label: 'Country Profiles',
    category: 'Sovereign Dossiers',
    description: 'Granular single-nation macroeconomic dossier, multi-year indicators, and structural policy diagnostics.',
    icon: FileText,
  },
];

interface HeaderProps {
  activePage: PageId;
  setActivePage: (page: PageId) => void;
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const tabListRef = useRef<HTMLDivElement>(null);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Scroll active tab into view when selected
  useEffect(() => {
    if (tabListRef.current) {
      const activeTabElement = tabListRef.current.querySelector<HTMLElement>(`[data-tab-id="${activePage}"]`);
      if (activeTabElement) {
        activeTabElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activePage]);

  const handleSelectPage = (pageId: PageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setSearchQuery('');
  };

  const filteredTabs = TABS.filter(tab => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      tab.label.toLowerCase().includes(query) ||
      tab.description.toLowerCase().includes(query) ||
      tab.category.toLowerCase().includes(query)
    );
  });

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* TOP UTILITY ROW: BRANDING & GLOBAL ACTIONS */}
          <div className="flex items-center justify-between h-15 border-b border-slate-100">
            
            {/* BRAND WORDMARK & INSTITUTION IDENTITY */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => handleSelectPage('all')}
                className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg py-1 transition group cursor-pointer"
                title="African Economic Intelligence Platform"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-teal-800 transition-colors shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-teal-800 transition-colors">
                      African Economic Intelligence
                    </span>
                    <span className="text-slate-300 hidden md:inline">|</span>
                    <span className="text-xs text-slate-500 hidden md:inline font-normal">
                      Surveillance & Investment Platform
                    </span>
                  </div>
                </div>
              </button>
            </div>

            {/* ACTION CONTROLS & MOBILE TRIGGER */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-teal-500"
                title="Export database to CSV"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50 shadow-xs focus-visible:ring-2 focus-visible:ring-teal-500"
                title="Synchronize and reset baseline data"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
                <span>{isRefreshing ? 'Syncing...' : 'Reset'}</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>

          {/* PAGE TABS ROW: MODERN HIGHLIGHTED TAB BAR (INDUSTRY BEST PRACTICE) */}
          <div className="relative pt-1.5">
            <nav 
              ref={tabListRef}
              role="tablist"
              aria-label="Application Sections"
              className="flex items-center space-x-1.5 sm:space-x-2 overflow-x-auto no-scrollbar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activePage === tab.id;
                return (
                  <button
                    key={tab.id}
                    data-tab-id={tab.id}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectPage(tab.id)}
                    className={`group relative px-3.5 py-2.5 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 flex items-center gap-2 cursor-pointer border-b-2 -mb-[1px] outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-t-lg ${
                      isActive
                        ? 'bg-teal-50/90 border-t border-x border-teal-200/90 border-b-2 border-b-teal-700 text-teal-950 font-semibold shadow-2xs'
                        : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-colors shrink-0 ${
                      isActive 
                        ? 'text-teal-700' 
                        : 'text-slate-400 group-hover:text-slate-600'
                    }`} />
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600 ring-2 ring-teal-200 shrink-0" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

        </div>
      </header>

      {/* FULL MOBILE & TABLET DRAWER MODAL */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end sm:justify-start">
          
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-200"
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <div className="relative z-10 w-full max-h-[85vh] bg-white border-t sm:border-t-0 sm:border-r border-slate-200 rounded-t-2xl sm:rounded-none sm:max-w-md sm:h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-left duration-200">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Application Pages</h2>
                  <p className="text-xs text-slate-500">Navigate macroeconomic intelligence modules</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Input */}
            <div className="p-3 border-b border-slate-100 bg-slate-50 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pages or topics..."
                  className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600 transition"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
              {filteredTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activePage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectPage(tab.id)}
                    className={`w-full p-3 rounded-xl border text-left transition-colors flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'bg-teal-50 border-teal-300 text-teal-950 shadow-xs ring-1 ring-teal-500/20'
                        : 'bg-white border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className={`p-2 rounded-lg shrink-0 ${
                      isActive ? 'bg-teal-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-semibold ${isActive ? 'text-teal-950' : 'text-slate-900'}`}>
                          {tab.label}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full border border-teal-200/80 flex items-center gap-1 shrink-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                        {tab.description}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 self-center ${isActive ? 'text-teal-700 font-bold' : 'text-slate-300'}`} />
                  </button>
                );
              })}

              {filteredTabs.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500">
                  No page found matching "{searchQuery}"
                </div>
              )}
            </div>

            {/* Mobile Actions Footer */}
            <div className="p-3 border-t border-slate-100 bg-slate-50 shrink-0 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    handleExportCSV();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-slate-500" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => {
                    handleRefresh();
                    setMobileMenuOpen(false);
                  }}
                  disabled={isRefreshing}
                  className="w-full py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-teal-600' : ''}`} />
                  <span>{isRefreshing ? 'Syncing...' : 'Reset'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

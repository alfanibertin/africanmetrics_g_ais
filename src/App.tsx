import React, { useState, useMemo } from 'react';
import { COUNTRIES } from './data';
import { Country } from './types';
import { Bulletin } from './components/NewsBulletins';
import Header from './components/layout/Header';
import Toast from './components/layout/Toast';

// Page imports
import OverviewPage from './pages/OverviewPage';
import SahelPage from './pages/SahelPage';
import RegionalPage from './pages/RegionalPage';
import CountryDetailPage from './pages/CountryDetailPage';

export default function App() {
  // Navigation State
  const [activePage, setActivePage] = useState<'all' | 'sahel' | 'regional' | 'detail'>('all');
  
  // Core State
  const [countries, setCountries] = useState<Country[]>(COUNTRIES);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [isLatestDataLive, setIsLatestDataLive] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Selected Country for Detailed tab
  const [detailCountryId, setDetailCountryId] = useState<string>('nigeria');

  const selectedDetailCountry = useMemo(() => {
    return countries.find(c => c.id === detailCountryId) || countries[0];
  }, [countries, detailCountryId]);

  // CSV Exporter
  const handleExportCSV = () => {
    const headers = ['Country Name', 'Region', 'GDP (Billion USD)', 'Population (Million)', 'Unemployment (%)', 'Debt-to-GDP (%)', 'Growth Rate (%)', 'Primary Sector Highlight'];
    const rows = countries.map(c => [
      c.name,
      c.region,
      c.gdp,
      c.population,
      c.unemployment,
      c.debtToGdp,
      c.growthRate,
      c.highlight
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => 
        row.map(val => {
          const str = String(val);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `african_economic_data_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    triggerNotification('Economic database exported successfully in CSV format!');
  };

  // Reset/Refresh Data back to baseline
  const handleRefresh = () => {
    setIsRefreshing(true);
    setCountries(COUNTRIES);
    setBulletins([]);
    setLastUpdated(null); // Return back to null (Baseline dataset static label)
    setIsLatestDataLive(false);

    setTimeout(() => {
      setIsRefreshing(false);
      triggerNotification('Dashboard reset to certified baseline economic data.');
    }, 700);
  };

  // Update Economic Data (Server-side Gemini & World Bank Integration)
  const handleUpdateEconomicData = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch('/api/update-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      
      if (data.success) {
        setLastUpdated(data.lastUpdated);
        setBulletins(data.bulletins);
        setIsLatestDataLive(!!data.isLive);

        setCountries(prevCountries => {
          return prevCountries.map(c => {
            if (data.updatedCountries && data.updatedCountries[c.id]) {
              return {
                ...c,
                gdp: data.updatedCountries[c.id].gdp,
                year: data.updatedCountries[c.id].year,
              };
            }
            return c;
          });
        });
        triggerNotification('Successfully updated indicators and generated economic bulletins with Gemini!');
      } else {
        triggerNotification('World Bank live database service is currently unavailable. No dummy data was fabricated.');
      }
    } catch (e) {
      triggerNotification('Sovereign pipeline offline. Network error updating economic database.');
    } finally {
      setIsUpdating(false);
    }
  };

  const triggerNotification = (message: string) => {
    setShowNotification(message);
    setTimeout(() => {
      setShowNotification(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans transition-colors duration-300">
      {/* Dynamic Floating Toast Notification */}
      <Toast message={showNotification} />

      {/* Global Navigation Header & Menu Bar */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        handleExportCSV={handleExportCSV}
        handleRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />

      {/* Main Responsive Grid Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative z-10">
        
        {/* Dynamic Section Descriptor Block */}
        <div className="pb-6 border-b border-brand-border flex flex-col md:flex-row md:items-center md:justify-between gap-4" id="dashboard-header">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-slate-500/10 border border-slate-500/15 text-[11px] text-slate-700 font-mono rounded-full uppercase tracking-wider font-semibold">
                {activePage === 'all' && 'Surveillance Engine'}
                {activePage === 'sahel' && 'Geopolitical Policy Explorer'}
                {activePage === 'regional' && 'Comparative Analysis'}
                {activePage === 'detail' && 'Surveillance Dossier'}
              </span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-brand-text">
              {activePage === 'all' && 'All Africa Macroeconomic Indicators'}
              {activePage === 'sahel' && 'Sahel Alliance Interactive Explorer (Burkina, Mali, Niger)'}
              {activePage === 'regional' && 'Regional Economic Hub Analysis'}
              {activePage === 'detail' && `Surveillance Dossier: ${selectedDetailCountry.name}`}
            </h2>
            <p className="text-xs text-brand-muted mt-1 max-w-3xl">
              {activePage === 'all' && 'Comprehensive surveillance across 55 African sovereign economies with interactive charting, filters, and smart LLM database updates.'}
              {activePage === 'sahel' && 'Logistical corridor routing simulation, border security allocations, and defense-vs-development spending trade-off analysis.'}
              {activePage === 'regional' && 'Deep-dive into regional economic aggregations. Compare GDP weightings, regional unemployment, and average population metrics.'}
              {activePage === 'detail' && 'AI-powered macroeconomic diagnostic tools, fiscal risk forecasting, and comprehensive structural policy recommendations.'}
            </p>
          </div>
          <div className="text-left md:text-right shrink-0">
            <span className="text-[11px] text-brand-dim font-mono block">
              Data Synchronization Cycle:
            </span>
            <span className="text-xs font-mono font-bold text-brand-text bg-slate-300/30 px-2 py-1 rounded-md border border-slate-300/40 inline-block mt-0.5">
              {lastUpdated || 'Baseline dataset (static)'}
            </span>
          </div>
        </div>

        {/* Dynamic Route Switching */}
        {activePage === 'all' && (
          <OverviewPage
            countries={countries}
            isLatestDataLive={isLatestDataLive}
            bulletins={bulletins}
            isUpdating={isUpdating}
            handleUpdateEconomicData={handleUpdateEconomicData}
          />
        )}

        {activePage === 'sahel' && (
          <SahelPage countries={countries} />
        )}

        {activePage === 'regional' && (
          <RegionalPage countries={countries} />
        )}

        {activePage === 'detail' && (
          <CountryDetailPage
            countries={countries}
            detailCountryId={detailCountryId}
            setDetailCountryId={setDetailCountryId}
          />
        )}

        {/* FOOTER */}
        <footer className="text-center pt-8 border-t border-brand-border" id="app-footer">
          <p className="text-xs text-brand-dim font-sans">
            Economic Statistics Surveillance Platform • Baseline World Bank Indicators
          </p>
        </footer>

      </main>
    </div>
  );
}

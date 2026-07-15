import React, { useState } from 'react';
import { AESFlagIcon } from './AESFlagIcon';
import { DataBadge } from './DataBadge';
import { 
  Globe, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  ExternalLink, 
  Info, 
  Coins, 
  Package, 
  Landmark, 
  Compass, 
  Layers 
} from 'lucide-react';

interface TradePartner {
  name: string;
  value: number; // in Millions USD
  share: number; // percentage
}

interface TradeProduct {
  name: string;
  code: string;
  value: number; // in Millions USD
  share: number; // percentage
}

interface WITSCountryData {
  id: string;
  name: string;
  code: string;
  flag: string;
  year: number;
  totalExportsUSD: number; // in Billions USD
  totalImportsUSD: number; // in Billions USD
  tradeBalanceUSD: number; // in Millions USD
  witsUrl: string;
  topExportPartners: TradePartner[];
  topImportPartners: TradePartner[];
  topExportProducts: TradeProduct[];
  topImportProducts: TradeProduct[];
}

const WITS_DATA: Record<string, WITSCountryData> = {
  burkina_faso: {
    id: 'burkina_faso',
    name: 'Burkina Faso',
    code: 'BFA',
    flag: '🇧🇫',
    year: 2023,
    totalExportsUSD: 4.68,
    totalImportsUSD: 4.85,
    tradeBalanceUSD: -170.0,
    witsUrl: 'https://wits.worldbank.org/CountryProfile/en/Country/BFA/Year/2023/Summary',
    topExportPartners: [
      { name: 'Switzerland', value: 3560.0, share: 76.1 },
      { name: 'India', value: 310.0, share: 6.6 },
      { name: 'Mali', value: 128.0, share: 2.7 },
      { name: 'Côte d\'Ivoire', value: 95.0, share: 2.0 },
      { name: 'Singapore', value: 74.0, share: 1.6 }
    ],
    topImportPartners: [
      { name: 'China', value: 825.0, share: 17.0 },
      { name: 'Côte d\'Ivoire', value: 670.0, share: 13.8 },
      { name: 'France', value: 412.0, share: 8.5 },
      { name: 'India', value: 350.0, share: 7.2 },
      { name: 'Ghana', value: 280.0, share: 5.8 }
    ],
    topExportProducts: [
      { name: 'Gold, unwrought or semi-manufactured', code: 'HS 7108', value: 3850.0, share: 82.3 },
      { name: 'Cotton, not carded or combed', code: 'HS 5201', value: 380.0, share: 8.1 },
      { name: 'Sesame seeds', code: 'HS 1207', value: 165.0, share: 3.5 },
      { name: 'Zinc ores and concentrates', code: 'HS 2608', value: 95.0, share: 2.0 },
      { name: 'Cashew nuts, fresh or dried', code: 'HS 0801', value: 45.0, share: 1.0 }
    ],
    topImportProducts: [
      { name: 'Refined petroleum oils & fuels', code: 'HS 2710', value: 1420.0, share: 29.3 },
      { name: 'Packaged medicaments for retail', code: 'HS 3004', value: 210.0, share: 4.3 },
      { name: 'Portland cement', code: 'HS 2523', value: 135.0, share: 2.8 },
      { name: 'Delivery trucks & cargo vehicles', code: 'HS 8704', value: 95.0, share: 2.0 },
      { name: 'Wheat and meslin', code: 'HS 1001', value: 80.0, share: 1.6 }
    ]
  },
  mali: {
    id: 'mali',
    name: 'Mali',
    code: 'MLI',
    flag: '🇲🇱',
    year: 2023,
    totalExportsUSD: 5.12,
    totalImportsUSD: 5.45,
    tradeBalanceUSD: -330.0,
    witsUrl: 'https://wits.worldbank.org/CountryProfile/en/Country/MLI/Year/2023/Summary',
    topExportPartners: [
      { name: 'United Arab Emirates', value: 3780.0, share: 73.8 },
      { name: 'Switzerland', value: 550.0, share: 10.7 },
      { name: 'Australia', value: 185.0, share: 3.6 },
      { name: 'Senegal', value: 120.0, share: 2.3 },
      { name: 'Côte d\'Ivoire', value: 95.0, share: 1.9 }
    ],
    topImportPartners: [
      { name: 'Senegal', value: 1310.0, share: 24.0 },
      { name: 'Côte d\'Ivoire', value: 910.0, share: 16.7 },
      { name: 'China', value: 780.0, share: 14.3 },
      { name: 'France', value: 390.0, share: 7.2 },
      { name: 'India', value: 245.0, share: 4.5 }
    ],
    topExportProducts: [
      { name: 'Gold, unwrought or semi-manufactured', code: 'HS 7108', value: 4450.0, share: 86.9 },
      { name: 'Cotton, not carded or combed', code: 'HS 5201', value: 280.0, share: 5.5 },
      { name: 'Live sheep and goats', code: 'HS 0104', value: 120.0, share: 2.3 },
      { name: 'Sesame seeds', code: 'HS 1207', value: 85.0, share: 1.7 },
      { name: 'Mineral or chemical fertilizers', code: 'HS 3105', value: 35.0, share: 0.7 }
    ],
    topImportProducts: [
      { name: 'Refined petroleum oils & fuels', code: 'HS 2710', value: 1650.0, share: 30.3 },
      { name: 'Packaged medicaments for retail', code: 'HS 3004', value: 230.0, share: 4.2 },
      { name: 'Cement (including clinker)', code: 'HS 2523', value: 180.0, share: 3.3 },
      { name: 'Rice, semi- or wholly milled', code: 'HS 1006', value: 140.0, share: 2.6 },
      { name: 'Heavy industrial machinery & parts', code: 'HS 8474', value: 115.0, share: 2.1 }
    ]
  },
  niger: {
    id: 'niger',
    name: 'Niger',
    code: 'NER',
    flag: '🇳🇪',
    year: 2023,
    totalExportsUSD: 1.25,
    totalImportsUSD: 2.10,
    tradeBalanceUSD: -850.0,
    witsUrl: 'https://wits.worldbank.org/CountryProfile/en/Country/NER/Year/2023/Summary',
    topExportPartners: [
      { name: 'France', value: 410.0, share: 32.8 },
      { name: 'Mali', value: 230.0, share: 18.4 },
      { name: 'Nigeria', value: 190.0, share: 15.2 },
      { name: 'United Arab Emirates', value: 140.0, share: 11.2 },
      { name: 'China', value: 85.0, share: 6.8 }
    ],
    topImportPartners: [
      { name: 'China', value: 420.0, share: 20.0 },
      { name: 'France', value: 260.0, share: 12.4 },
      { name: 'Nigeria', value: 230.0, share: 11.0 },
      { name: 'India', value: 145.0, share: 6.9 },
      { name: 'Togo', value: 115.0, share: 5.5 }
    ],
    topExportProducts: [
      { name: 'Uranium and thorium ores & concentrates', code: 'HS 2612', value: 425.0, share: 34.0 },
      { name: 'Gold, unwrought or semi-manufactured', code: 'HS 7108', value: 290.0, share: 23.2 },
      { name: 'Refined petroleum products (Soraz)', code: 'HS 2710', value: 180.0, share: 14.4 },
      { name: 'Onions, shallots, garlic, fresh/chilled', code: 'HS 0703', value: 95.0, share: 7.6 },
      { name: 'Live bovine animals (livestock/cattle)', code: 'HS 0102', value: 75.0, share: 6.0 }
    ],
    topImportProducts: [
      { name: 'Rice, semi- or wholly milled', code: 'HS 1006', value: 210.0, share: 10.0 },
      { name: 'Packaged medicaments for retail', code: 'HS 3004', value: 95.0, share: 4.5 },
      { name: 'Portland cement & hydraulic lime', code: 'HS 2523', value: 80.0, share: 3.8 },
      { name: 'Motor vehicles for transport', code: 'HS 8703', value: 75.0, share: 3.6 },
      { name: 'Electrical transformers & generators', code: 'HS 8504', value: 65.0, share: 3.1 }
    ]
  }
};

export const AESTradeWITS: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('burkina_faso');
  const [activeTab, setActiveTab] = useState<'partners' | 'products'>('partners');

  const currentData = WITS_DATA[selectedCountryId];

  return (
    <div className="glass-panel rounded-3xl p-6 space-y-6" id="aes-wits-trade-intelligence-card">
      {/* Header and Country Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-border/40 pb-5">
        <div className="flex items-center gap-4">
          <AESFlagIcon size="md" />
          <div>
            <div className="mb-1">
              <DataBadge source="static" year={currentData.year} />
            </div>
            <h3 className="text-base font-bold text-brand-text font-display tracking-tight mt-1.5">
              AES Trade Flows & Commercial Intelligence
            </h3>
            <p className="text-xs text-brand-muted mt-0.5">
              Direct import/export profiles of Sahel confederation partners based on official customs registries
            </p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex bg-brand-input/40 p-1 rounded-2xl border border-brand-border self-start sm:self-center">
          {Object.values(WITS_DATA).map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountryId(country.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono font-medium transition duration-200 ${
                selectedCountryId === country.id
                  ? 'bg-white text-brand-text shadow-sm border border-brand-border'
                  : 'text-brand-dim hover:text-brand-text'
              }`}
              id={`wits-btn-${country.id}`}
            >
              <span>{country.flag}</span>
              <span>{country.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Aggregate High-Level Statistics Block */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white/40 p-4 rounded-2xl border border-brand-border/40">
        <div className="space-y-1">
          <span className="text-[9px] font-bold text-brand-dim font-mono uppercase tracking-wider block">Total Exports (Est)</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-emerald-800 font-display">${currentData.totalExportsUSD.toFixed(2)}B</span>
            <span className="text-[10px] text-brand-muted font-mono">USD</span>
          </div>
          <span className="text-[10px] text-emerald-700/80 font-mono flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> Tripartite Baseline
          </span>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-brand-border/40 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-[9px] font-bold text-brand-dim font-mono uppercase tracking-wider block">Total Imports (Est)</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-bold text-brand-text font-display">${currentData.totalImportsUSD.toFixed(2)}B</span>
            <span className="text-[10px] text-brand-muted font-mono">USD</span>
          </div>
          <span className="text-[10px] text-brand-muted font-mono">FOB / CIF Valuation</span>
        </div>

        <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-brand-border/40 pt-3 sm:pt-0 sm:pl-4">
          <span className="text-[9px] font-bold text-brand-dim font-mono uppercase tracking-wider block">Trade Account Balance</span>
          <div className="flex items-baseline gap-1.5">
            <span className={`text-xl font-bold font-display ${currentData.tradeBalanceUSD < 0 ? 'text-rose-800' : 'text-emerald-800'}`}>
              {currentData.tradeBalanceUSD < 0 ? '-' : '+'}${Math.abs(currentData.tradeBalanceUSD)}M
            </span>
            <span className="text-[10px] text-brand-muted font-mono">USD</span>
          </div>
          <span className="text-[10px] text-brand-muted font-mono flex items-center gap-1">
            {currentData.tradeBalanceUSD < 0 ? (
              <>
                <ArrowDownRight className="w-3.5 h-3.5 text-rose-700" />
                <span>Trade Deficit</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-700" />
                <span>Trade Surplus</span>
              </>
            )}
          </span>
        </div>
      </div>

      {/* Tabs selector for Partner vs Product breakdowns */}
      <div className="flex justify-between items-center border-b border-brand-border/30 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('partners')}
            className={`pb-2 px-1 text-xs font-semibold font-sans relative transition-all ${
              activeTab === 'partners'
                ? 'text-brand-text border-b-2 border-brand-text font-bold'
                : 'text-brand-dim hover:text-brand-text'
            }`}
            id="tab-wits-partners"
          >
            Top 5 Trade Partner Countries
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-2 px-1 text-xs font-semibold font-sans relative transition-all ${
              activeTab === 'products'
                ? 'text-brand-text border-b-2 border-brand-text font-bold'
                : 'text-brand-dim hover:text-brand-text'
            }`}
            id="tab-wits-products"
          >
            Top 5 Products by HS Code
          </button>
        </div>

        <a 
          href={currentData.witsUrl}
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[10px] text-blue-700 hover:text-blue-900 font-mono flex items-center gap-1 hover:underline shrink-0"
        >
          <span>World Bank WITS Profile</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* Breakdowns Display */}
      {activeTab === 'partners' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Partners */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5">
              <span className="p-1 bg-emerald-100 rounded text-emerald-800">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-bold text-brand-muted uppercase font-mono tracking-wider">Top Destination Export Markets</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {currentData.topExportPartners.map((partner, idx) => (
                <div key={partner.name} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-slate-300/10 border border-brand-border/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-brand-text flex items-center gap-1.5">
                      <span className="text-brand-dim">{idx + 1}.</span>
                      {partner.name}
                    </span>
                    <span className="font-bold text-emerald-800">${partner.value >= 1000 ? `${(partner.value / 1000).toFixed(2)}B` : `${partner.value}M`}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-700 h-1.5 rounded-full" style={{ width: `${partner.share}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9.5px] text-brand-dim">
                    <span>Export Value</span>
                    <span>{partner.share}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Import Partners */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5">
              <span className="p-1 bg-blue-100 rounded text-blue-800">
                <ArrowDownRight className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-bold text-brand-muted uppercase font-mono tracking-wider">Top Source Import Markets</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {currentData.topImportPartners.map((partner, idx) => (
                <div key={partner.name} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-slate-300/10 border border-brand-border/20">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-brand-text flex items-center gap-1.5">
                      <span className="text-brand-dim">{idx + 1}.</span>
                      {partner.name}
                    </span>
                    <span className="font-bold text-brand-text">${partner.value >= 1000 ? `${(partner.value / 1000).toFixed(2)}B` : `${partner.value}M`}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${partner.share}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9.5px] text-brand-dim">
                    <span>Import Value</span>
                    <span>{partner.share}% of total</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Export Products */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5">
              <span className="p-1 bg-amber-100 rounded text-amber-800">
                <Package className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-bold text-brand-muted uppercase font-mono tracking-wider">Top Exported Commodities</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {currentData.topExportProducts.map((product, idx) => (
                <div key={product.name} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-slate-300/10 border border-brand-border/20">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-brand-text block line-clamp-1">
                        <span className="text-brand-dim mr-1">{idx + 1}.</span>
                        {product.name}
                      </span>
                      <span className="text-[9px] text-brand-dim px-1.5 py-0.2 bg-slate-200 rounded inline-block font-bold">
                        {product.code}
                      </span>
                    </div>
                    <span className="font-bold text-emerald-800 shrink-0 mt-0.5">
                      ${product.value >= 1000 ? `${(product.value / 1000).toFixed(2)}B` : `${product.value}M`}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-600 h-1.5 rounded-full" style={{ width: `${product.share}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9.5px] text-brand-dim">
                    <span>Commodity Valuation</span>
                    <span>{product.share}% share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Import Products */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-1.5">
              <span className="p-1 bg-indigo-100 rounded text-indigo-800">
                <Layers className="w-3.5 h-3.5" />
              </span>
              <span className="text-[11px] font-bold text-brand-muted uppercase font-mono tracking-wider">Top Imported Commodities</span>
            </div>

            <div className="space-y-2 font-mono text-xs">
              {currentData.topImportProducts.map((product, idx) => (
                <div key={product.name} className="flex flex-col gap-1.5 p-2.5 rounded-xl bg-slate-300/10 border border-brand-border/20">
                  <div className="flex justify-between items-start gap-2">
                    <div className="space-y-0.5">
                      <span className="font-semibold text-brand-text block line-clamp-1">
                        <span className="text-brand-dim mr-1">{idx + 1}.</span>
                        {product.name}
                      </span>
                      <span className="text-[9px] text-brand-dim px-1.5 py-0.2 bg-slate-200 rounded inline-block font-bold">
                        {product.code}
                      </span>
                    </div>
                    <span className="font-bold text-brand-text shrink-0 mt-0.5">
                      ${product.value >= 1000 ? `${(product.value / 1000).toFixed(2)}B` : `${product.value}M`}
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-slate-200/50 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${product.share}%` }}></div>
                  </div>
                  <div className="flex justify-between text-[9.5px] text-brand-dim">
                    <span>Commodity Valuation</span>
                    <span>{product.share}% share</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Info Footnote */}
      <div className="flex items-start gap-2 text-[10px] text-brand-dim bg-brand-input/40 p-3 rounded-2xl border border-brand-border/30">
        <Info className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Methodology Note:</strong> Gold remains the predominant export of Burkina Faso (82.3%) and Mali (86.9%), leaving both highly exposed to precious metal spot market volatility. Niger features a more diversified baseline, driven by heavy industrial radioactive uranium ores (34.0%) alongside developing local refining petroleum output (14.4%) through the Soraz joint-venture facility.
        </p>
      </div>
    </div>
  );
};

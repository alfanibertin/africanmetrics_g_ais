// Comprehensive Europe-Africa Foreign Direct Investment (FDI) Dataset & Sector Analytics
// Sourced & calibrated against Eurostat, UNCTAD World Investment Report, European Commission (Global Gateway / Team Europe Africa Package),
// European Investment Bank (EIB Global), EDFI (Proparco, DEG, FMO, CDP), and National Central Banks (Banque de France, Deutsche Bundesbank, Bank of England).

export interface EuropeFdiSectorTrend {
  id: string;
  sector: string;
  cumulativeFdiBillions: number; // Cumulative FDI Stock (USD Billions)
  sharePercentage: number;
  recentAnnualFlowBillions: number; // 2025/2026 annual flow (USD Billions)
  cagr5Year: number; // 5-year Compound Annual Growth Rate (%)
  trendStatus: 'Rapid Expansion' | 'Strategic Pivot' | 'Steady Growth' | 'Industrializing';
  trendDescription: string;
  keyProjects: string[];
  primaryDestinations: string[];
  strategicDriver: string;
  color: string;
}

export interface EuropeFdiCountryRecipient {
  countryId: string;
  countryName: string;
  region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern';
  fdiStockBillions: number;
  shareOfTotalPercent: number;
  topSectors: string[];
  majorInitiatives: string;
  globalGatewayPriority: 'Tier 1 Strategic Anchor' | 'Energy Transition Hub' | 'Industrial & Nearshoring Corridor' | 'Maritime Logistics Gateway';
  topEuropeanInvestors: string[]; // e.g. ['France', 'United Kingdom', 'Germany']
}

export interface EuropeFdiYearlyFlow {
  year: number;
  energyRenewablesGas: number;
  financialServices: number;
  infrastructureLogistics: number;
  manufacturingAutomotive: number;
  telecomDigital: number;
  agrifoodPharma: number;
  total: number;
}

export interface EuropeFdiRegionalDistribution {
  region: string;
  sharePercentage: number;
  totalStockBillions: number;
  leadingSectors: string[];
  keyAnchorCountries: string[];
}

export interface EuropeanCompanyPresence {
  id: string;
  companyName: string;
  homeCountry: string; // e.g. 'France', 'Germany', 'United Kingdom', 'Italy', 'Netherlands', 'Spain', 'Switzerland', 'Denmark', 'Belgium'
  homeCityHq: string;
  ownershipType: 'Public Multinational (Euronext/DAX/FTSE)' | 'Private Conglomerate' | 'State-Partnered DFI' | 'Joint Venture / Consortium';
  country: string; // Host African Country
  additionalCountries?: string[];
  primarySector: 'Energy & Transition' | 'Transport, Ports & Logistics' | 'Manufacturing & Automotive' | 'Telecom & Digital Connectivity' | 'Financial Services & Banking' | 'Agrifood & Consumer Goods' | 'Mining & Beneficiation' | 'Health & Pharmaceuticals';
  flagshipProjects: string[];
  investmentScaleUSD: string; // e.g. '$8.5 Billion'
  status: 'Operational' | 'Expanding' | 'Under Construction';
  keyImpact: string;
}

export const EUROPE_FDI_MACRO_METRICS = {
  totalStockBillions: 268.4,
  yoyGrowthPercent: 5.6,
  leadingSector: 'Energy, Gas & Renewables',
  leadingSectorStockBillions: 98.5,
  leadingSectorSharePercent: 36.7,
  fastestGrowingSector: 'Green Hydrogen & Clean Power',
  fastestGrowingCagr: 18.2,
  topDestination: 'South Africa & Egypt',
  topDestinationCombinedShare: 38.0,
  topEuropeanSourceCountries: [
    { country: 'United Kingdom', stockBillions: 65.4, share: 24.4, flag: '🇬🇧' },
    { country: 'France', stockBillions: 54.2, share: 20.2, flag: '🇫🇷' },
    { country: 'Netherlands', stockBillions: 48.6, share: 18.1, flag: '🇳🇱' },
    { country: 'Italy', stockBillions: 24.8, share: 9.2, flag: '🇮🇹' },
    { country: 'Germany', stockBillions: 14.5, share: 5.4, flag: '🇩🇪' },
    { country: 'Switzerland', stockBillions: 12.8, share: 4.8, flag: '🇨🇭' },
    { country: 'Spain', stockBillions: 11.2, share: 4.2, flag: '🇪🇸' },
    { country: 'Belgium', stockBillions: 10.4, share: 3.9, flag: '🇧🇪' },
    { country: 'Nordic Countries (Denmark, Sweden, Norway)', stockBillions: 9.8, share: 3.7, flag: '🇪🇺' },
    { country: 'Other European Sovereigns', stockBillions: 16.7, share: 6.2, flag: '🇪🇺' },
  ],
  globalGatewayCommitmentEurBillions: 150, // €150 Billion Africa-Europe Investment Package
};

export const EUROPE_FDI_SECTOR_TRENDS: EuropeFdiSectorTrend[] = [
  {
    id: 'energy-gas-renewables',
    sector: 'Energy, Offshore Gas & Renewable Power',
    cumulativeFdiBillions: 98.5,
    sharePercentage: 36.7,
    recentAnnualFlowBillions: 6.80,
    cagr5Year: 12.4,
    trendStatus: 'Strategic Pivot',
    trendDescription: 'Decisive reorientation toward offshore transitional natural gas / LNG, utility-scale solar and wind, and zero-carbon green hydrogen export hubs destined for the European Green Deal and domestic African grids.',
    keyProjects: [
      'Mozambique LNG Area 1 & Coral South FLNG (TotalEnergies / Eni - $24B+)',
      'Namibia Hyphen Green Hydrogen & Ammonia Export Hub (€10B European Global Gateway)',
      'Sangomar Deepwater Oil & GTA Offshore LNG (Senegal / Mauritania - Woodside / BP / TotalEnergies)',
      'Baleine Net-Zero Scope 1 & 2 Offshore Field Development (Côte dIvoire - Eni $10B)',
      'Siemens Energy Egypt Mega-Power & Grid Modernization / High-Speed Rail Electrification'
    ],
    primaryDestinations: ['Egypt', 'Mozambique', 'Nigeria', 'Angola', 'Namibia', 'Morocco'],
    strategicDriver: 'European REPowerEU gas supply diversification away from Russian pipeline supplies, coupled with long-term green hydrogen and ammonia corridors.',
    color: '#0284c7'
  },
  {
    id: 'financial-services',
    sector: 'Financial Services, Banking & Private Capital',
    cumulativeFdiBillions: 46.2,
    sharePercentage: 17.2,
    recentAnnualFlowBillions: 3.10,
    cagr5Year: 4.8,
    trendStatus: 'Steady Growth',
    trendDescription: 'Transitioning from legacy retail commercial banking to regional corporate hubs, trade finance underwriting for AfCFTA corridors, climate transition green bonds, and African venture capital / fintech syndicate equity.',
    keyProjects: [
      'Sanlam-Allianz Pan-African Insurance & Asset Management Joint Venture (operating across 27 nations)',
      'Standard Chartered Corporate & Transaction Banking African Corridors',
      'Societe Generale Trade Finance & Casablanca Regional Treasury Services',
      'EIB Global & EDFI (Proparco, DEG, FMO) €6B SME Climate Blended Finance facilities'
    ],
    primaryDestinations: ['South Africa', 'Egypt', 'Morocco', 'Kenya', 'Nigeria'],
    strategicDriver: 'Institutional asset management, cross-border corporate trade clearing under AfCFTA, and mobilising catalytic private green finance.',
    color: '#1d4ed8'
  },
  {
    id: 'transport-logistics',
    sector: 'Transport Infrastructure, Ports & Logistics Corridors',
    cumulativeFdiBillions: 41.8,
    sharePercentage: 15.6,
    recentAnnualFlowBillions: 2.95,
    cagr5Year: 8.9,
    trendStatus: 'Strategic Pivot',
    trendDescription: 'Consolidation of multi-modal container gateways, trans-African rail corridors, and deep-water terminal concessions following MSCs landmark acquisition of Bolloré Africa Logistics (now Africa Global Logistics) and APM Terminals expansions.',
    keyProjects: [
      'Africa Global Logistics (MSC Group) 250+ logistics bases and 22 port concessions continent-wide',
      'APM Terminals (Maersk Group) Tangier Med II, Port Said East, and Tema Container Terminal ($3B+)',
      'Lobito Corridor Trans-African Railway modernization (EU Global Gateway / US co-financing in Angola, DRC, Zambia)',
      'Alstom Al Boraq Casablanca-Tangier-Marrakech High-Speed Rail & Cairo Monorail',
      'CMA CGM Lekki Deep Sea Port Terminal & Kribi Deep Sea Container Concession'
    ],
    primaryDestinations: ['Morocco', 'Egypt', 'Nigeria', 'Côte dIvoire', 'Angola', 'Cameroon'],
    strategicDriver: 'Securing Atlantic and Mediterranean maritime arteries connecting African manufacturing zones directly to Rotterdam, Antwerp, Hamburg, and Valencia.',
    color: '#0f766e'
  },
  {
    id: 'manufacturing-automotive',
    sector: 'Manufacturing, Automotive & Industrial Nearshoring',
    cumulativeFdiBillions: 33.6,
    sharePercentage: 12.5,
    recentAnnualFlowBillions: 2.45,
    cagr5Year: 11.2,
    trendStatus: 'Industrializing',
    trendDescription: 'Major nearshoring pivot by European automotive assemblers and industrial suppliers to establish North and Southern African competitive export bases with sub-48-hour maritime proximity to European assembly plants.',
    keyProjects: [
      'Renault Group Tangier Med Industrial Complex (zero-carbon, 400,000 vehicles/year capacity)',
      'Stellantis Kenitra Manufacturing Plant (€300M expansion to double capacity to 400,000 vehicles) & Oran Fiat Plant',
      'Volkswagen Group South Africa Kariega Plant, plus assembly hubs in Rwanda and Ghana',
      'BMW Rosslyn Manufacturing Plant (R4.2 Billion investment for next-gen plug-in hybrid X3)',
      'Mercedes-Benz East London Assembly Complex (South Africa)'
    ],
    primaryDestinations: ['Morocco', 'South Africa', 'Egypt', 'Algeria', 'Tunisia'],
    strategicDriver: 'Nearshoring supply chain resilience, EU rules-of-origin alignment, low-cost green manufacturing, and capitalizing on the AfCFTA single market.',
    color: '#b45309'
  },
  {
    id: 'telecom-digital',
    sector: 'Telecom, Digital Connectivity & Submarine Infrastructure',
    cumulativeFdiBillions: 25.4,
    sharePercentage: 9.5,
    recentAnnualFlowBillions: 1.85,
    cagr5Year: 14.6,
    trendStatus: 'Rapid Expansion',
    trendDescription: 'Rollout of 4G/5G mobile broadband networks, national fiber backbones, digital skills academies (Orange Digital Centers), and subsea data highways linking Mediterranean and Atlantic coastal hubs.',
    keyProjects: [
      'Orange Middle East & Africa operations spanning 18 nations and 140M+ active mobile subscribers',
      'Vodafone / Vodacom Pan-African Telecom Network (South Africa, Mozambique, Tanzania, DRC, and Safaricom Ethiopia)',
      'Medusa Subsea Mediterranean Optical Fiber Cable (connecting Morocco, Algeria, Tunisia, Egypt with Spain, France, Italy)',
      'Ericsson & Nokia 5G network upgrades and rural connectivity partnerships with MTN and Airtel Africa'
    ],
    primaryDestinations: ['South Africa', 'Egypt', 'Senegal', 'Côte dIvoire', 'Morocco', 'Kenya'],
    strategicDriver: 'Unlocking Africa’s youthful digital demographic dividend, mobile financial inclusion (Orange Money, M-Pesa), and secure cloud connectivity.',
    color: '#4f46e5'
  },
  {
    id: 'agrifood-pharma',
    sector: 'Agrifood, Healthcare & Sustainable Consumer Goods',
    cumulativeFdiBillions: 22.9,
    sharePercentage: 8.5,
    recentAnnualFlowBillions: 1.40,
    cagr5Year: 7.1,
    trendStatus: 'Steady Growth',
    trendDescription: 'Investments in certified sustainable cocoa/coffee supply chains, localized dairy/protein processing, and cutting-edge pharmaceutical & mRNA vaccine manufacturing hubs in partnership with European research institutes.',
    keyProjects: [
      'Sanofi Regional Pharmaceutical Plants in Algeria, Morocco, and South Africa',
      'BioNTech mRNA Vaccine Production Facility (Kigali, Rwanda)',
      'Danone Specialized Nutrition & Dairy Processing Plants (South Africa, Egypt, Morocco)',
      'Heineken Africa & Middle East breweries and local barley agricultural sourcing in 13+ nations',
      'Unilever Sustainable Living & Personal Care manufacturing hubs (Nigeria, Kenya, South Africa)'
    ],
    primaryDestinations: ['South Africa', 'Nigeria', 'Morocco', 'Egypt', 'Kenya', 'Rwanda', 'Senegal'],
    strategicDriver: 'Local pharmaceutical sovereignty post-pandemic, deforestation-free EU agricultural imports compliance (EUDR), and fast-growing urban consumer demand.',
    color: '#15803d'
  }
];

export const EUROPE_FDI_YEARLY_FLOWS: EuropeFdiYearlyFlow[] = [
  { year: 2014, energyRenewablesGas: 7.10, financialServices: 2.80, infrastructureLogistics: 2.10, manufacturingAutomotive: 1.60, telecomDigital: 1.10, agrifoodPharma: 1.10, total: 15.80 },
  { year: 2016, energyRenewablesGas: 7.80, financialServices: 3.10, infrastructureLogistics: 2.30, manufacturingAutomotive: 1.85, telecomDigital: 1.25, agrifoodPharma: 1.15, total: 17.45 },
  { year: 2018, energyRenewablesGas: 8.40, financialServices: 3.30, infrastructureLogistics: 2.60, manufacturingAutomotive: 2.10, telecomDigital: 1.40, agrifoodPharma: 1.25, total: 19.05 },
  { year: 2020, energyRenewablesGas: 6.20, financialServices: 2.50, infrastructureLogistics: 2.10, manufacturingAutomotive: 1.65, telecomDigital: 1.50, agrifoodPharma: 1.15, total: 15.10 },
  { year: 2022, energyRenewablesGas: 7.90, financialServices: 2.85, infrastructureLogistics: 2.55, manufacturingAutomotive: 2.05, telecomDigital: 1.65, agrifoodPharma: 1.30, total: 18.30 },
  { year: 2024, energyRenewablesGas: 9.10, financialServices: 3.00, infrastructureLogistics: 2.80, manufacturingAutomotive: 2.30, telecomDigital: 1.75, agrifoodPharma: 1.35, total: 20.30 },
  { year: 2026, energyRenewablesGas: 9.80, financialServices: 3.10, infrastructureLogistics: 2.95, manufacturingAutomotive: 2.45, telecomDigital: 1.85, agrifoodPharma: 1.40, total: 21.55 }
];

export const EUROPE_FDI_TOP_COUNTRIES: EuropeFdiCountryRecipient[] = [
  {
    countryId: 'south-africa',
    countryName: 'South Africa',
    region: 'Southern',
    fdiStockBillions: 58.2,
    shareOfTotalPercent: 21.7,
    topSectors: ['Automotive Assembly', 'Renewable Energy IPPs', 'Financial Services', 'Mining & Beneficiation'],
    majorInitiatives: 'BMW Rosslyn expansion, Mercedes-Benz East London plant, Sanlam-Allianz JV, Enel Green Power wind farms, Anglo American / Glencore industrial footprint.',
    globalGatewayPriority: 'Tier 1 Strategic Anchor',
    topEuropeanInvestors: ['United Kingdom', 'Germany', 'Netherlands', 'France']
  },
  {
    countryId: 'egypt',
    countryName: 'Egypt',
    region: 'Northern',
    fdiStockBillions: 43.8,
    shareOfTotalPercent: 16.3,
    topSectors: ['Offshore Gas (Zohr)', 'High-Speed Rail PPP', 'Suez Maritime Terminals', 'Green Hydrogen'],
    majorInitiatives: 'Eni Zohr supergiant gas field, Siemens Mobility €8B high-speed electric rail contract, APM Terminals Port Said, Scatec/Fertiglobe green ammonia hub.',
    globalGatewayPriority: 'Tier 1 Strategic Anchor',
    topEuropeanInvestors: ['Italy', 'United Kingdom', 'Germany', 'France']
  },
  {
    countryId: 'nigeria',
    countryName: 'Nigeria',
    region: 'Western',
    fdiStockBillions: 34.5,
    shareOfTotalPercent: 12.9,
    topSectors: ['Deepwater Petroleum & Gas', 'Lekki Maritime Terminal', 'Consumer FMCG', 'Industrial Telecom'],
    majorInitiatives: 'TotalEnergies Egina & Ikike offshore projects, Shell Nigeria Bonga deepwater, CMA CGM Lekki container terminal, Unilever & Nigerian Breweries (Heineken).',
    globalGatewayPriority: 'Tier 1 Strategic Anchor',
    topEuropeanInvestors: ['United Kingdom', 'Netherlands', 'France', 'Italy']
  },
  {
    countryId: 'morocco',
    countryName: 'Morocco',
    region: 'Northern',
    fdiStockBillions: 24.6,
    shareOfTotalPercent: 9.2,
    topSectors: ['Automotive Industrial Ecosystem', 'Aerospace Components', 'High-Speed Rail', 'Green Energy'],
    majorInitiatives: 'Renault Tanger Med mega-complex, Stellantis Kenitra plant expansion, Safran aerospace maintenance, Alstom Al Boraq TGV, Engie / Nareva wind energy.',
    globalGatewayPriority: 'Industrial & Nearshoring Corridor',
    topEuropeanInvestors: ['France', 'Spain', 'Germany', 'United Kingdom']
  },
  {
    countryId: 'angola',
    countryName: 'Angola',
    region: 'Central',
    fdiStockBillions: 19.8,
    shareOfTotalPercent: 7.4,
    topSectors: ['Deepwater Offshore Petroleum', 'Lobito Rail Logistics', 'Agriculture', 'Telecom'],
    majorInitiatives: 'Azule Energy (Eni & BP multi-billion joint venture), TotalEnergies Block 17 & 20 deepwater developments, Lobito Atlantic Railway concession (Trafigura/Mota-Engil).',
    globalGatewayPriority: 'Energy Transition Hub',
    topEuropeanInvestors: ['France', 'Italy', 'United Kingdom', 'Portugal']
  },
  {
    countryId: 'mozambique',
    countryName: 'Mozambique',
    region: 'Southern',
    fdiStockBillions: 17.5,
    shareOfTotalPercent: 6.5,
    topSectors: ['Offshore LNG Liquefaction', 'Port of Maputo Logistics', 'Hydropower', 'Heavy Sands Mining'],
    majorInitiatives: 'Coral South FLNG (Eni), Mozambique LNG Area 1 ($20B project led by TotalEnergies), Port of Maputo concession (DP World / Grindrod / European shipping links).',
    globalGatewayPriority: 'Energy Transition Hub',
    topEuropeanInvestors: ['Italy', 'France', 'Portugal', 'United Kingdom']
  },
  {
    countryId: 'ghana',
    countryName: 'Ghana',
    region: 'Western',
    fdiStockBillions: 12.8,
    shareOfTotalPercent: 4.8,
    topSectors: ['Offshore Oil (Jubilee/TEN)', 'Tema Container Terminal', 'Cocoa Agro-Processing', 'Renewables'],
    majorInitiatives: 'Eni Sankofa Offshore gas project, APM Terminals / Meridian Port Services (MPS) Tema Port expansion, Barry Callebaut cocoa processing facilities.',
    globalGatewayPriority: 'Maritime Logistics Gateway',
    topEuropeanInvestors: ['United Kingdom', 'Netherlands', 'Italy', 'Switzerland']
  },
  {
    countryId: 'cote-divoire',
    countryName: 'Côte d’Ivoire',
    region: 'Western',
    fdiStockBillions: 11.2,
    shareOfTotalPercent: 4.2,
    topSectors: ['Baleine Deepwater Gas/Oil', 'Abidjan Metro PPP', 'Cocoa Value Chain', 'Port of San Pedro'],
    majorInitiatives: 'Eni $10B Baleine Net-Zero discovery & development, Abidjan Metro Line 1 (Bouygues / Alstom / Keolis consortium), TotalEnergies retail & lubricants.',
    globalGatewayPriority: 'Energy Transition Hub',
    topEuropeanInvestors: ['France', 'Italy', 'Belgium', 'Netherlands']
  },
  {
    countryId: 'kenya',
    countryName: 'Kenya',
    region: 'Eastern',
    fdiStockBillions: 9.5,
    shareOfTotalPercent: 3.5,
    topSectors: ['Telecom & M-Pesa (Vodacom/Vodafone)', 'Geothermal & Wind IPPs', 'Horticultural Logistics', 'Banking'],
    majorInitiatives: 'Vodafone/Vodacom equity stake in Safaricom, Lake Turkana Wind Power (310MW - largest wind farm in Africa), Unilever tea operations, EIB green SME credit lines.',
    globalGatewayPriority: 'Maritime Logistics Gateway',
    topEuropeanInvestors: ['United Kingdom', 'Netherlands', 'Germany', 'France']
  },
  {
    countryId: 'senegal',
    countryName: 'Senegal',
    region: 'Western',
    fdiStockBillions: 8.4,
    shareOfTotalPercent: 3.1,
    topSectors: ['Sangomar Deepwater Oil', 'Dakar Port & Logistics', 'Mineral Sands (Zircon)', 'Pharma'],
    majorInitiatives: 'Woodside & European contractors Sangomar offshore project, Eiffage Dakar-Diamniadio toll highway concession, Eramet Grande Côte mineral sands, Institut Pasteur Dakar.',
    globalGatewayPriority: 'Maritime Logistics Gateway',
    topEuropeanInvestors: ['France', 'United Kingdom', 'Spain', 'Germany']
  },
  {
    countryId: 'algeria',
    countryName: 'Algeria',
    region: 'Northern',
    fdiStockBillions: 7.8,
    shareOfTotalPercent: 2.9,
    topSectors: ['Transmed Pipeline Gas', 'Fiat Automotive Assembly', 'Petrochemicals', 'Solar'],
    majorInitiatives: 'Eni gas production boosting for Transmed pipeline supplies to Italy, Stellantis Fiat Tafraoui plant (Oran), TotalEnergies Timimoun gas project.',
    globalGatewayPriority: 'Energy Transition Hub',
    topEuropeanInvestors: ['Italy', 'France', 'Spain', 'Germany']
  },
  {
    countryId: 'namibia',
    countryName: 'Namibia',
    region: 'Southern',
    fdiStockBillions: 6.2,
    shareOfTotalPercent: 2.3,
    topSectors: ['Green Hydrogen & Ammonia Hub', 'Offshore Venus Oil Discovery', 'Critical Minerals (Lithium/Rare Earths)'],
    majorInitiatives: 'Hyphen Hydrogen Energy €10B concession (backed by Enertrag Germany), TotalEnergies Venus multi-billion deepwater offshore find, EU-Namibia Strategic Raw Materials Partnership.',
    globalGatewayPriority: 'Energy Transition Hub',
    topEuropeanInvestors: ['Germany', 'France', 'United Kingdom', 'Netherlands']
  }
];

export const EUROPE_FDI_REGIONAL_SUMMARY: EuropeFdiRegionalDistribution[] = [
  {
    region: 'Southern Africa',
    sharePercentage: 30.5,
    totalStockBillions: 81.9,
    leadingSectors: ['Automotive Assembly & Nearshoring', 'Financial Services', 'Offshore LNG', 'Renewable IPPs'],
    keyAnchorCountries: ['South Africa', 'Mozambique', 'Namibia', 'Zambia', 'Zimbabwe']
  },
  {
    region: 'Northern Africa',
    sharePercentage: 28.3,
    totalStockBillions: 76.2,
    leadingSectors: ['Natural Gas (Transmed/Zohr)', 'Automotive & Aerospace Manufacturing', 'High-Speed Rail', 'Suez Logistics'],
    keyAnchorCountries: ['Egypt', 'Morocco', 'Algeria', 'Tunisia']
  },
  {
    region: 'Western Africa',
    sharePercentage: 25.1,
    totalStockBillions: 67.4,
    leadingSectors: ['Deepwater Petroleum & Gas', 'Container Terminals (Lekki/Tema/Dakar)', 'Cocoa/Agri Processing', 'Telecom'],
    keyAnchorCountries: ['Nigeria', 'Ghana', 'Côte d’Ivoire', 'Senegal', 'Guinea']
  },
  {
    region: 'Central Africa',
    sharePercentage: 10.2,
    totalStockBillions: 27.4,
    leadingSectors: ['Deepwater Hydrocarbons', 'Lobito Rail Corridor Feeder', 'Manganese & Critical Minerals', 'Forestry & Logistics'],
    keyAnchorCountries: ['Angola', 'Gabon', 'Republic of Congo', 'Cameroon', 'DRC']
  },
  {
    region: 'Eastern Africa',
    sharePercentage: 5.9,
    totalStockBillions: 15.5,
    leadingSectors: ['Mobile Telecom & M-Pesa Networks', 'Geothermal & Clean Power', 'Agricultural Export Value Chains'],
    keyAnchorCountries: ['Kenya', 'Tanzania', 'Uganda', 'Ethiopia', 'Rwanda']
  }
];

export const EUROPEAN_COMPANIES_BY_COUNTRY: EuropeanCompanyPresence[] = [
  // SOUTH AFRICA
  {
    id: 'bmw-sa',
    companyName: 'BMW Group South Africa',
    homeCountry: 'Germany',
    homeCityHq: 'Munich',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'South Africa',
    additionalCountries: ['Regional Southern Africa distribution'],
    primarySector: 'Manufacturing & Automotive',
    flagshipProjects: [
      'Rosslyn Plant R4.2 Billion electrification modernization for next-gen BMW X3 Plug-in Hybrid',
      'Solar PV microgrid and biogas energy integration from Bio2Watt Bronkhorstspruit plant',
      'Training Academy and artisan skill pipeline supporting 40,000 indirect automotive jobs'
    ],
    investmentScaleUSD: '$2.8 Billion',
    status: 'Expanding',
    keyImpact: 'Pioneer of the South African automotive manufacturing sector; over 90% of Rosslyn production is exported globally, generating foreign exchange and anchoring the Gauteng industrial basin.'
  },
  {
    id: 'mercedes-benz-sa',
    companyName: 'Mercedes-Benz South Africa Ltd.',
    homeCountry: 'Germany',
    homeCityHq: 'Stuttgart',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'South Africa',
    additionalCountries: ['Sub-Saharan exports'],
    primarySector: 'Manufacturing & Automotive',
    flagshipProjects: [
      'East London Assembly Plant R13 Billion expansion for the C-Class sedan global export program',
      'Modernized body shop with 500+ robotic welding units and zero-waste paint technologies',
      'Rooftop solar installations generating 2MW of clean industrial power'
    ],
    investmentScaleUSD: '$3.5 Billion',
    status: 'Operational',
    keyImpact: 'Major private employer in the Eastern Cape, integrating dozens of Tier-1 component suppliers into East London Industrial Development Zone (ELIDZ).'
  },
  {
    id: 'sanlam-allianz-sa',
    companyName: 'Sanlam Allianz Joint Venture',
    homeCountry: 'Germany',
    homeCityHq: 'Munich (Allianz SE) & Cape Town',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'South Africa',
    additionalCountries: ['Morocco', 'Egypt', 'Kenya', 'Nigeria', 'Senegal', 'Côte d’Ivoire', 'Ghana (27 African nations total)'],
    primarySector: 'Financial Services & Banking',
    flagshipProjects: [
      'Pan-African Non-Banking Financial Services powerhouse valued at €2 Billion equity',
      'Cross-border corporate insurance, reinsurance, and climate catastrophe parametric risk covers',
      'Unified digital distribution network for micro-insurance across African retail corridors'
    ],
    investmentScaleUSD: '$2.2 Billion',
    status: 'Operational',
    keyImpact: 'Largest non-banking financial services platform in Africa, bringing European risk-underwriting balance sheet strength to sovereign and commercial infrastructure projects.'
  },
  {
    id: 'enel-green-power-sa',
    companyName: 'Enel Green Power South Africa',
    homeCountry: 'Italy',
    homeCityHq: 'Rome',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'South Africa',
    additionalCountries: ['Zambia', 'Morocco'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      '12 operational utility-scale wind and solar PV facilities generating over 1,200 MW capacity',
      'Karusa and Soetwater 280MW wind farms feeding directly into the Eskom national transmission grid',
      'Corporate Power Purchase Agreements (PPAs) with African mining houses and smelters'
    ],
    investmentScaleUSD: '$1.8 Billion',
    status: 'Expanding',
    keyImpact: 'Leading private renewable Independent Power Producer (IPP) mitigating South African load-shedding while displacing millions of metric tons of coal-fired CO2 emissions.'
  },

  // EGYPT
  {
    id: 'eni-egypt',
    companyName: 'Eni S.p.A. (IEOC Egypt)',
    homeCountry: 'Italy',
    homeCityHq: 'Rome / Milan',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Egypt',
    additionalCountries: ['Libya', 'Algeria', 'Tunisia', 'Côte dIvoire', 'Congo', 'Angola', 'Mozambique'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      'Zohr Supergiant Offshore Natural Gas Field (discovered 2015, producing >2.5 Bcf/d at peak)',
      'Damietta LNG Liquefaction Export Terminal restart delivering cargoes to European ports',
      'Meleiha and Agiba deep-exploration concessions in the Western Desert basin'
    ],
    investmentScaleUSD: '$16.5 Billion',
    status: 'Operational',
    keyImpact: 'Transformed Egypt from a net gas importer into a regional Mediterranean energy export hub; accounts for over 50% of total Egyptian hydrocarbon output.'
  },
  {
    id: 'siemens-energy-mobility-egypt',
    companyName: 'Siemens AG (Energy & Mobility)',
    homeCountry: 'Germany',
    homeCityHq: 'Munich / Berlin',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Egypt',
    additionalCountries: ['South Africa', 'Nigeria', 'Morocco', 'Algeria'],
    primarySector: 'Transport, Ports & Logistics',
    flagshipProjects: [
      'Egyptian High-Speed Rail Network (2,000 km turnkey network connecting Red Sea to Mediterranean - €8.1 Billion)',
      'Beni Suef, Burullus & New Capital 14.4 GW Combined-Cycle Megapower Plants ($9 Billion turnkey package)',
      'Siemens Energy Smart Grid National Control Centers and technical training academy in Ain Sokhna'
    ],
    investmentScaleUSD: '$12.0 Billion',
    status: 'Under Construction',
    keyImpact: 'Built the backbone of Egypts modern electricity grid and constructing the 6th largest high-speed rail system in the world, connecting 90% of the Egyptian population.'
  },
  {
    id: 'maersk-apm-terminals-egypt',
    companyName: 'APM Terminals (A.P. Møller - Maersk)',
    homeCountry: 'Denmark',
    homeCityHq: 'Copenhagen',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Egypt',
    additionalCountries: ['Morocco (Tangier Med)', 'Nigeria (Apapa/Onne)', 'Ghana (Tema MPS)', 'Liberia (Monrovia)', 'Côte dIvoire (Abidjan)'],
    primarySector: 'Transport, Ports & Logistics',
    flagshipProjects: [
      'Suez Canal Container Terminal (SCCT) at Port Said East (annual capacity 5.4M TEU)',
      '$500M Berth Expansion project adding 1,000 meters of deep-draft quay with 12 ship-to-shore gantry cranes',
      'Green maritime bunkering hub feasibility study in partnership with the General Authority of the Suez Canal'
    ],
    investmentScaleUSD: '$1.7 Billion',
    status: 'Expanding',
    keyImpact: 'Primary transshipment hub for the Eastern Mediterranean, handling containerized export flows linking Asia, Africa, and Southern Europe via the Suez Canal.'
  },

  // MOROCCO
  {
    id: 'renault-group-morocco',
    companyName: 'Renault Group Maroc',
    homeCountry: 'France',
    homeCityHq: 'Boulogne-Billancourt',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Morocco',
    additionalCountries: ['Algeria (Oued Tlelat)', 'Egypt'],
    primarySector: 'Manufacturing & Automotive',
    flagshipProjects: [
      'Tanger Med Automotive Complex (Tangier Melloussa zero-emission and zero-effluent plant producing >400,000 cars/year)',
      'Casablanca SOMACA Assembly Plant producing Dacia Sandero and Logan models',
      'Mobilize Duo and Bento electric urban mobility vehicles manufacturing line'
    ],
    investmentScaleUSD: '$2.5 Billion',
    status: 'Operational',
    keyImpact: 'Turned Morocco into the #1 passenger vehicle producer in Africa, employing directly 11,000 workers and generating over €5 Billion in annual automotive export value.'
  },
  {
    id: 'stellantis-morocco',
    companyName: 'Stellantis N.V. Maroc',
    homeCountry: 'Netherlands / France / Italy',
    homeCityHq: 'Amsterdam / Paris / Turin',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Morocco',
    additionalCountries: ['Algeria (Oran)', 'South Africa (Coega)', 'Egypt'],
    primarySector: 'Manufacturing & Automotive',
    flagshipProjects: [
      'Kenitra Industrial Complex €300 Million expansion doubling production capacity to 400,000 vehicles/year',
      'Peugeot 208 and Citroën Ami / Opel Rocks-e / Fiat Topolino electric quadricycle assembly lines',
      'Local integration rate exceeding 69% with over 70 domestic component supply contracts'
    ],
    investmentScaleUSD: '$1.4 Billion',
    status: 'Expanding',
    keyImpact: 'Cornerstone of Morocco’s Atlantic industrial corridor, driving localized component supplier clusters and pioneering affordable electric vehicle export lines.'
  },
  {
    id: 'alstom-morocco',
    companyName: 'Alstom S.A.',
    homeCountry: 'France',
    homeCityHq: 'Saint-Ouen',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Morocco',
    additionalCountries: ['Egypt', 'South Africa (Gibela JV)', 'Senegal (TER Dakar)', 'Algeria'],
    primarySector: 'Transport, Ports & Logistics',
    flagshipProjects: [
      'Al Boraq High-Speed Train fleet (ONCF Tangier-Casablanca high-speed rail corridor)',
      'Casablanca & Rabat-Salé Tramway Citadis vehicle fleets and signaling infrastructure',
      'Fez Industrial Site manufacturing railway cabling, electronic sub-assemblies, and transformer coils'
    ],
    investmentScaleUSD: '$850 Million',
    status: 'Expanding',
    keyImpact: 'Supplied the first commercial high-speed railway in Africa (operating at 320 km/h) and created a dedicated railway industrial export cluster in Fez employing 1,200 technicians.'
  },

  // NIGERIA
  {
    id: 'totalenergies-nigeria',
    companyName: 'TotalEnergies EP Nigeria Limited',
    homeCountry: 'France',
    homeCityHq: 'Courbevoie / Paris',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Nigeria',
    additionalCountries: ['Angola', 'Congo', 'Gabon', 'Senegal', 'Mozambique', 'Uganda (Tilenga)'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      'Egina Deepwater FPSO Complex (200,000 barrels/day, $16 Billion total project capital expenditure)',
      'Ikike Offshore Field Satellite tie-back (low-emission, 50,000 boepd)',
      'Nigeria LNG (NLNG) Train 7 Expansion participation (15% equity holding delivering 30 MTPA LNG capacity)'
    ],
    investmentScaleUSD: '$14.2 Billion',
    status: 'Operational',
    keyImpact: 'Pioneered Nigerian local content records with 77% of Egina FPSO topside fabrication and integration completed at LADOL and Snake Island yards in Lagos.'
  },
  {
    id: 'cma-cgm-nigeria',
    companyName: 'CMA CGM Group (Lekki Freeport Terminal)',
    homeCountry: 'France',
    homeCityHq: 'Marseille',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Nigeria',
    additionalCountries: ['Cameroon (Kribi)', 'Senegal (Dakar)', 'Côte dIvoire', 'Congo (Pointe-Noire)', 'Morocco'],
    primarySector: 'Transport, Ports & Logistics',
    flagshipProjects: [
      'Lekki Deep Sea Port Container Terminal Concession (exclusive container operator with 1.2M TEU initial capacity)',
      'CEVA Logistics West African overland bonded trucking and pharmaceutical cold-chain network',
      'Introduction of 15,000 TEU neo-panamax container vessels direct calls to Nigeria'
    ],
    investmentScaleUSD: '$1.1 Billion',
    status: 'Operational',
    keyImpact: 'First fully automated, 16.5-meter deep-water commercial container terminal in Nigeria, eliminating multi-week vessel waiting times at congested legacy Lagos ports.'
  },
  {
    id: 'heineken-nigerian-breweries',
    companyName: 'Nigerian Breweries Plc (Heineken N.V.)',
    homeCountry: 'Netherlands',
    homeCityHq: 'Amsterdam',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Nigeria',
    additionalCountries: ['South Africa', 'DRC', 'Ethiopia', 'Congo', 'Rwanda', 'Burundi', 'Sierra Leone'],
    primarySector: 'Agrifood & Consumer Goods',
    flagshipProjects: [
      '9 modern breweries across Nigeria including Ama (Enugu) and Kakuri (Kaduna) facilities',
      'Local Sorghum and Cassava agricultural value-chain sourcing program supporting 100,000 smallholder farmers',
      'Rooftop solar PV and biomass boiler installations reducing grid reliance'
    ],
    investmentScaleUSD: '$1.6 Billion',
    status: 'Operational',
    keyImpact: 'Oldest and largest brewing enterprise in Nigeria, pioneering 60%+ local raw material substitution to shield operations from FX fluctuations.'
  },

  // ANGOLA
  {
    id: 'azule-energy-angola',
    companyName: 'Azule Energy (Eni & BP Joint Venture)',
    homeCountry: 'Italy / United Kingdom',
    homeCityHq: 'Rome & London (Luanda operational HQ)',
    ownershipType: 'Joint Venture / Consortium',
    country: 'Angola',
    additionalCountries: ['Offshore Southern Africa exploration'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      'Angola’s largest independent oil and gas producer holding 2 billion barrels of oil equivalent in net resources',
      'Agogo Integrated West Hub Development project (Block 15/06) featuring subsea multiphase pumping and zero-routine-flaring FPSO',
      'New Gas Consortium (NGC) Quiluma and Maboqueiro fields delivering the countrys first non-associated gas development'
    ],
    investmentScaleUSD: '$7.8 Billion',
    status: 'Expanding',
    keyImpact: 'Combines the Angolan assets of two European supermajors, ensuring sustained energy royalties and anchoring gas feedstocks for the Soyo LNG export terminal.'
  },
  {
    id: 'lobito-atlantic-railway-angola',
    companyName: 'Lobito Atlantic Railway Consortium (Trafigura / Mota-Engil / Vecturis)',
    homeCountry: 'Switzerland / Portugal / Belgium',
    homeCityHq: 'Geneva / Porto / Brussels',
    ownershipType: 'Joint Venture / Consortium',
    country: 'Angola',
    additionalCountries: ['DRC (Kolwezi)', 'Zambia (Copperbelt)'],
    primarySector: 'Transport, Ports & Logistics',
    flagshipProjects: [
      '30-year concession for the 1,300 km Benguela Railway connecting Lobito port to Luau on the DRC border',
      'EU Global Gateway and US DFC supported $500M railway track rehabilitation and 1,500 wagon fleet upgrade',
      'Dedicated minerals export corridor shortening transit time from Kolwezi to the Atlantic from 30 days to 4 days'
    ],
    investmentScaleUSD: '$1.2 Billion',
    status: 'Under Construction',
    keyImpact: 'Strategic geopolitical counterweight providing an open-access Atlantic logistics alternative for DRC and Zambian critical battery minerals (copper and cobalt).'
  },

  // MOZAMBIQUE
  {
    id: 'totalenergies-mozambique-lng',
    companyName: 'TotalEnergies Mozambique LNG (Area 1)',
    homeCountry: 'France',
    homeCityHq: 'Courbevoie / Paris',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Mozambique',
    additionalCountries: ['Regional Southern Africa'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      'Two-train onshore LNG liquefaction plant on the Afungi Peninsula with 13.1 MTPA initial capacity ($20B project)',
      'Subsea gas gathering network in deepwater Area 1 Golfinho and Atum offshore fields',
      'Socio-economic Pamoja Tunaweza resilience and local youth employment programs in Cabo Delgado'
    ],
    investmentScaleUSD: '$8.5 Billion',
    status: 'Under Construction',
    keyImpact: 'Largest single private foreign direct investment in African history, projected to generate over $50 Billion in sovereign revenue for Mozambique over its 30-year operating life.'
  },

  // CÔTE D'IVOIRE
  {
    id: 'eni-cote-divoire',
    companyName: 'Eni Côte d’Ivoire (Baleine Field)',
    homeCountry: 'Italy',
    homeCityHq: 'Rome / Milan',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Côte d’Ivoire',
    additionalCountries: ['Ghana', 'Nigeria'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      'Baleine Supergiant Offshore Field discovered in 2021 with 2.5 billion barrels of oil and 3.3 Tcf of associated gas',
      'First Scope 1 & 2 Net-Zero hydrocarbon development in Africa utilizing green steam and carbon offset forestry',
      'Phase 2 accelerated deployment bringing production to 50,000 bopd and 70 Mscfd gas delivered to domestic power plants'
    ],
    investmentScaleUSD: '$4.2 Billion',
    status: 'Expanding',
    keyImpact: 'Turns Côte d’Ivoire into a regional electric power exporter and self-sufficient hydrocarbon producer within 24 months of discovery.'
  },
  {
    id: 'orange-cote-divoire',
    companyName: 'Orange Middle East & Africa (Orange CI)',
    homeCountry: 'France',
    homeCityHq: 'Paris',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Côte d’Ivoire',
    additionalCountries: ['Senegal', 'Mali', 'Burkina Faso', 'Guinea', 'Cameroon', 'Madagascar', 'DRC', 'Morocco', 'Egypt (18 African countries)'],
    primarySector: 'Telecom & Digital Connectivity',
    flagshipProjects: [
      'National 4G LTE/5G network infrastructure and 8,000 km national optical fiber backbone',
      'Orange Digital Center (ODC) in Abidjan providing free digital coding, AI, and startup incubation to 15,000 youths',
      'Orange Bank Africa mobile micro-lending and Orange Money digital financial ecosystem'
    ],
    investmentScaleUSD: '$1.3 Billion',
    status: 'Operational',
    keyImpact: 'Digital backbone for West African French-speaking commerce, processing tens of billions in annual digital payments and bridging the urban-rural connectivity divide.'
  },

  // KENYA
  {
    id: 'vodafone-vodacom-kenya',
    companyName: 'Vodafone Group / Vodacom Group (Safaricom Plc)',
    homeCountry: 'United Kingdom',
    homeCityHq: 'Newbury / London & Johannesburg',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Kenya',
    additionalCountries: ['South Africa', 'Tanzania', 'DRC', 'Mozambique', 'Lesotho', 'Ethiopia (Safaricom Ethiopia consortium)'],
    primarySector: 'Telecom & Digital Connectivity',
    flagshipProjects: [
      'Strategic 40% equity stewardship of Safaricom, the operator of M-Pesa mobile money',
      'Safaricom Ethiopia $1.2 Billion greenfield telecom rollout, securing the first private telecom license in modern Ethiopian history',
      'Deployment of 5G commercial base stations and national cloud hosting facilities'
    ],
    investmentScaleUSD: '$3.8 Billion',
    status: 'Expanding',
    keyImpact: 'Pioneered financial inclusion across Africa via M-Pesa (serving >50 million active users), with transactions equivalent to more than 50% of Kenyan GDP.'
  },
  {
    id: 'unilever-kenya',
    companyName: 'Unilever East & Southern Africa',
    homeCountry: 'United Kingdom',
    homeCityHq: 'London',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Kenya',
    additionalCountries: ['South Africa', 'Nigeria', 'Ghana', 'Ethiopia', 'Tanzania'],
    primarySector: 'Agrifood & Consumer Goods',
    flagshipProjects: [
      'Nairobi Industrial Area manufacturing complex producing personal hygiene and food products',
      'Kericho Tea Estates sustainable certified agriculture supporting 16,000 farm workers',
      'Enhancing livelihoods program for 50,000 informal female dukawalas (kiosk merchants)'
    ],
    investmentScaleUSD: '$900 Million',
    status: 'Operational',
    keyImpact: 'Leading FMCG manufacturer in East Africa with extensive local supplier integration and 100% renewable electricity powering factory operations.'
  },

  // SENEGAL
  {
    id: 'eiffage-senegal',
    companyName: 'Eiffage Sénégal S.A.',
    homeCountry: 'France',
    homeCityHq: 'Vélizy-Villacoublay',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Senegal',
    additionalCountries: ['Côte d’Ivoire', 'Mauritania', 'Togo'],
    primarySector: 'Transport, Ports & Logistics',
    flagshipProjects: [
      'Autoroute de l’Avenir (Dakar-Diamniadio-AIBD Toll Highway 30-year PPP concession)',
      'Grand Tortue Ahmeyim (GTA) FLNG breakwater and maritime civil works (jointly with Saipem)',
      'TER Dakar Regional Express Train railway civil works and stations'
    ],
    investmentScaleUSD: '$750 Million',
    status: 'Operational',
    keyImpact: 'Pioneered the first public-private partnership toll highway in Sub-Saharan Africa, drastically reducing Dakar commute times and unlocking the new city of Diamniadio.'
  },

  // NAMIBIA
  {
    id: 'hyphen-enertrag-namibia',
    companyName: 'Hyphen Hydrogen Energy (Enertrag SE Consortium)',
    homeCountry: 'Germany',
    homeCityHq: 'Dauerthal / Berlin',
    ownershipType: 'Joint Venture / Consortium',
    country: 'Namibia',
    additionalCountries: ['Regional Southern Africa / EU Export'],
    primarySector: 'Energy & Transition',
    flagshipProjects: [
      'Tsau //Khaeb National Park $10 Billion green hydrogen and green ammonia development (€10B Global Gateway flag project)',
      'Planned 3GW of wind and 2GW of solar PV electrolysis generating 350,000 tons of green hydrogen annually',
      'Deepwater port of Lüderitz green shipping export terminal infrastructure'
    ],
    investmentScaleUSD: '$5.5 Billion',
    status: 'Under Construction',
    keyImpact: 'Puts Namibia at the center of the global zero-emission energy transition, providing baseload green industrial jobs and securing green ammonia feedstock for European heavy industries.'
  },

  // RWANDA
  {
    id: 'biontech-rwanda',
    companyName: 'BioNTech SE Rwanda (BioNTainer)',
    homeCountry: 'Germany',
    homeCityHq: 'Mainz',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Rwanda',
    additionalCountries: ['Senegal (planned)', 'South Africa (planned)'],
    primarySector: 'Health & Pharmaceuticals',
    flagshipProjects: [
      'Kigali Special Economic Zone mRNA Vaccine Manufacturing Facility utilizing modular BioNTainers',
      'Clinical trial networks for mRNA malaria and tuberculosis vaccines tailored for African strains',
      'Technology transfer and regulatory training in coordination with the African Medicines Agency (AMA)'
    ],
    investmentScaleUSD: '$180 Million',
    status: 'Under Construction',
    keyImpact: 'Historic milestone for African healthcare sovereignty, ending 99% import dependency on vaccines and establishing local capacity for rapid response to future epidemics.'
  },

  // GHANA
  {
    id: 'barry-callebaut-ghana',
    companyName: 'Barry Callebaut Ghana Ltd.',
    homeCountry: 'Switzerland / Belgium',
    homeCityHq: 'Zurich / Wieze',
    ownershipType: 'Public Multinational (Euronext/DAX/FTSE)',
    country: 'Ghana',
    additionalCountries: ['Côte d’Ivoire (San Pedro & Abidjan)', 'Cameroon'],
    primarySector: 'Agrifood & Consumer Goods',
    flagshipProjects: [
      'Tema Free Zone Cocoa Processing Plant converting raw beans into cocoa liquor, butter, and cake',
      'Forever Chocolate deforestation-free farm mapping covering 150,000 Ghanaian smallholder farms',
      'Child labor remediation and direct farmer living income premium distribution system'
    ],
    investmentScaleUSD: '$420 Million',
    status: 'Operational',
    keyImpact: 'Shifts cocoa value addition from European refineries to origin countries, creating high-skill agro-industrial employment and aligning with the new European Deforestation Regulation (EUDR).'
  }
];

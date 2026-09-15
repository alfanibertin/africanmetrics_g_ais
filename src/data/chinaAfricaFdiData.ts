// Comprehensive China-Africa Foreign Direct Investment (FDI) Dataset & Sector Analytics
// Sourced & calibrated against Johns Hopkins SAIS-CARI, UNCTAD, MOFCOM, AEI China Global Investment Tracker, and World Bank datasets.

export interface ChinaFdiSectorTrend {
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

export interface ChinaFdiCountryRecipient {
  countryId: string;
  countryName: string;
  region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern';
  fdiStockBillions: number;
  shareOfTotalPercent: number;
  topSectors: string[];
  majorInitiatives: string;
  focacPriority: 'Tier 1 Strategic Hub' | 'Industrialization Hub' | 'Resource-Infrastructure Hub' | 'Maritime Logistics Gateway';
}

export interface ChinaFdiYearlyFlow {
  year: number;
  miningExtraction: number;
  infrastructureTransport: number;
  energyRenewables: number;
  manufacturingIndustrial: number;
  telecomTech: number;
  agricultureOther: number;
  total: number;
}

export interface ChinaFdiRegionalDistribution {
  region: string;
  sharePercentage: number;
  totalStockBillions: number;
  leadingSectors: string[];
  keyAnchorCountries: string[];
}

export interface ChineseCompanyPresence {
  id: string;
  companyName: string;
  chineseName?: string;
  acronym?: string;
  ownershipType: 'State-Owned Enterprise (SOE)' | 'Private Enterprise (POE)' | 'Joint Venture / Mixed';
  headquartersChina: string;
  parentGroup?: string;
  country: string;
  additionalCountries?: string[];
  primarySector: 'Mining & Critical Minerals' | 'Transport & Infrastructure' | 'Energy & Utilities' | 'Manufacturing & Industrial' | 'Telecom & Digital Silk Road' | 'Financial Services' | 'Automotive' | 'Agribusiness';
  flagshipProjects: string[];
  investmentScaleUSD: string; // e.g. '$5.2 Billion'
  status: 'Operational' | 'Expanding' | 'Under Construction';
  keyImpact: string;
}

export const CHINA_FDI_SECTOR_TRENDS: ChinaFdiSectorTrend[] = [
  {
    id: 'mining-metals',
    sector: 'Mining, Metals & Critical Minerals',
    cumulativeFdiBillions: 16.8,
    sharePercentage: 31.2,
    recentAnnualFlowBillions: 1.45,
    cagr5Year: 8.4,
    trendStatus: 'Strategic Pivot',
    trendDescription: 'Shifting from raw ore extraction to in-country battery-grade refining, lithium spodumene processing, and copper-cobalt cathode smelting to meet global EV supply chain demand.',
    keyProjects: [
      'Tenke Fungurume & Kisanfu Cobalt-Copper Expansion (DRC)',
      'Arcadia Lithium Concentrator & Processing Plant (Zimbabwe)',
      'Simandou Iron Ore Blocks 1 & 2 Rail-Port Mining Corridor (Guinea)',
      'Manono & Goulamina Lithium Joint Ventures (Mali / DRC)'
    ],
    primaryDestinations: ['DRC', 'Zambia', 'Guinea', 'Zimbabwe', 'South Africa'],
    strategicDriver: 'Critical energy transition mineral security (Cobalt, Lithium, Copper, Manganese) and localized beneficiation mandates.',
    color: '#ca8a04'
  },
  {
    id: 'infrastructure-transport',
    sector: 'Transport Infrastructure & Logistics Corridors',
    cumulativeFdiBillions: 12.4,
    sharePercentage: 23.0,
    recentAnnualFlowBillions: 0.95,
    cagr5Year: 4.1,
    trendStatus: 'Steady Growth',
    trendDescription: 'Transitioning from sovereign debt-financed EPC contracts to public-private partnerships (PPP), equity concessions, and operational toll concession models.',
    keyProjects: [
      'Lekki Deep Sea Port & Integrated Free Trade Zone (Nigeria)',
      'Standard Gauge Railway (SGR) Mombasa-Nairobi-Naivasha Corridor (Kenya)',
      'Doraleh Multi-Purpose Port & Addis Ababa-Djibouti Railway Concession (Djibouti / Ethiopia)',
      'Lobito Corridor Trans-African Railway Feeder Connections (Angola / DRC)'
    ],
    primaryDestinations: ['Nigeria', 'Kenya', 'Djibouti', 'Angola', 'Egypt'],
    strategicDriver: 'Connecting resource-rich hinterlands to maritime deep-water shipping lanes under the Maritime Silk Road.',
    color: '#0f766e'
  },
  {
    id: 'energy-power',
    sector: 'Energy, Grid & Renewable Power Generation',
    cumulativeFdiBillions: 9.6,
    sharePercentage: 17.8,
    recentAnnualFlowBillions: 0.88,
    cagr5Year: 14.2,
    trendStatus: 'Rapid Expansion',
    trendDescription: 'Aggressive expansion into utility-scale solar PV farms, hydro upgrades, cross-border transmission lines, and green hydrogen hubs following Chinas pledge to end overseas coal financing.',
    keyProjects: [
      'Garissa 55MW Solar PV & Menengai Geothermal Power (Kenya)',
      'Kafue Gorge Lower 750MW Hydroelectric Complex (Zambia)',
      'Kom Ombo 200MW Solar Plant & Benban Solar Park participation (Egypt)',
      'Grand Poubara Hydropower & Solar Offgrid Mini-Grids (Gabon / Senegal)'
    ],
    primaryDestinations: ['Egypt', 'South Africa', 'Zambia', 'Kenya', 'Morocco'],
    strategicDriver: 'Clean energy transition, rural electrification quotas, and supplying industrial export parks.',
    color: '#d97706'
  },
  {
    id: 'manufacturing-industrial',
    sector: 'Manufacturing & Special Economic Zones (SEZs)',
    cumulativeFdiBillions: 7.2,
    sharePercentage: 13.4,
    recentAnnualFlowBillions: 0.62,
    cagr5Year: 11.8,
    trendStatus: 'Industrializing',
    trendDescription: 'Offshoring of Chinese consumer goods, automotive assembly, ceramic tiles, and textile manufacturing to take advantage of African Continental Free Trade Area (AfCFTA) zero-tariff rules.',
    keyProjects: [
      'TEDA Suez Economic & Trade Cooperation Zone (Egypt)',
      'Eastern Industrial Zone Dukem (Ethiopia)',
      'Ogun-Guangdong Free Trade Zone (Nigeria)',
      'BAIC Automotive Assembly & Coega Industrial Hub (South Africa)'
    ],
    primaryDestinations: ['Egypt', 'Ethiopia', 'Nigeria', 'South Africa', 'Algeria'],
    strategicDriver: 'Circumventing global tariff barriers and capturing booming domestic African consumer markets under AfCFTA.',
    color: '#15803d'
  },
  {
    id: 'telecom-digital',
    sector: 'Digital Silk Road, Telecom & Cloud Centers',
    cumulativeFdiBillions: 4.8,
    sharePercentage: 8.9,
    recentAnnualFlowBillions: 0.48,
    cagr5Year: 16.5,
    trendStatus: 'Rapid Expansion',
    trendDescription: 'Deployment of 5G national backbone networks, fiber-optic submarine cables (PEACE / 2Africa), fintech payment gateways, and tier-3 national hyperscale data centers.',
    keyProjects: [
      'Huawei & ZTE 5G Telecom National Grid Infrastructure (Nigeria, Kenya, South Africa)',
      'PEACE (Pakistan & East Africa Connecting Europe) Submarine Cable (Kenya / Djibouti)',
      'National Government Cloud Data Centers (Senegal, Mali, Egypt)',
      'Fintech mobile money ecosystem integrations with Transsion & PalmPay'
    ],
    primaryDestinations: ['South Africa', 'Kenya', 'Nigeria', 'Egypt', 'Senegal'],
    strategicDriver: 'Establishing foundational digital infrastructure and smart city surveillance across urban centers.',
    color: '#4338ca'
  },
  {
    id: 'agriculture-services',
    sector: 'Agriculture, Agro-Processing & Real Estate',
    cumulativeFdiBillions: 3.0,
    sharePercentage: 5.5,
    recentAnnualFlowBillions: 0.22,
    cagr5Year: 6.2,
    trendStatus: 'Steady Growth',
    trendDescription: 'Investment in hybrid rice demonstration centers, cold-chain logistics, cashew/cocoa processing facilities, and commercial office towers.',
    keyProjects: [
      'Green Agriculture West Africa Demonstration Hubs (Nigeria / Ghana)',
      'New Administrative Capital Central Business District (CBD) Skyscraper Hub (Egypt)',
      'Madagascar Hybrid Rice & Cassava Processing Complex',
      'Cashew & Sesame Processing Plants (Tanzania / Cote dIvoire)'
    ],
    primaryDestinations: ['Egypt', 'Nigeria', 'Madagascar', 'Tanzania', 'Cote dIvoire'],
    strategicDriver: 'Food security, agricultural technology transfer, and bilateral agricultural export corridors to China.',
    color: '#9a3412'
  }
];

export const CHINA_FDI_YEARLY_FLOWS: ChinaFdiYearlyFlow[] = [
  { year: 2014, miningExtraction: 1.10, infrastructureTransport: 0.90, energyRenewables: 0.40, manufacturingIndustrial: 0.35, telecomTech: 0.20, agricultureOther: 0.15, total: 3.10 },
  { year: 2016, miningExtraction: 1.25, infrastructureTransport: 1.10, energyRenewables: 0.50, manufacturingIndustrial: 0.40, telecomTech: 0.25, agricultureOther: 0.18, total: 3.68 },
  { year: 2018, miningExtraction: 1.50, infrastructureTransport: 1.30, energyRenewables: 0.65, manufacturingIndustrial: 0.52, telecomTech: 0.32, agricultureOther: 0.20, total: 4.49 },
  { year: 2020, miningExtraction: 1.15, infrastructureTransport: 0.85, energyRenewables: 0.55, manufacturingIndustrial: 0.42, telecomTech: 0.35, agricultureOther: 0.16, total: 3.48 },
  { year: 2022, miningExtraction: 1.30, infrastructureTransport: 0.90, energyRenewables: 0.72, manufacturingIndustrial: 0.55, telecomTech: 0.40, agricultureOther: 0.19, total: 4.06 },
  { year: 2024, miningExtraction: 1.40, infrastructureTransport: 0.92, energyRenewables: 0.82, manufacturingIndustrial: 0.59, telecomTech: 0.45, agricultureOther: 0.21, total: 4.39 },
  { year: 2026, miningExtraction: 1.45, infrastructureTransport: 0.95, energyRenewables: 0.88, manufacturingIndustrial: 0.62, telecomTech: 0.48, agricultureOther: 0.22, total: 4.60 }
];

export const CHINA_FDI_TOP_COUNTRIES: ChinaFdiCountryRecipient[] = [
  {
    countryId: 'drc',
    countryName: 'Democratic Republic of Congo',
    region: 'Central',
    fdiStockBillions: 7.8,
    shareOfTotalPercent: 14.5,
    topSectors: ['Mining & Cobalt/Copper Refining', 'Hydro Infrastructure', 'Road Networks'],
    majorInitiatives: 'Sicomines joint venture, Tenke Fungurume, Kisanfu multi-billion processing complex.',
    focacPriority: 'Resource-Infrastructure Hub'
  },
  {
    countryId: 'south-africa',
    countryName: 'South Africa',
    region: 'Southern',
    fdiStockBillions: 6.9,
    shareOfTotalPercent: 12.8,
    topSectors: ['Automotive Assembly', 'Renewable Energy', 'Banking / ICBC-Standard Bank', '5G Telecom'],
    majorInitiatives: 'BAIC Auto Coega plant, ICBC 20% Standard Bank equity stake, Longyuan De Aar Wind Farm.',
    focacPriority: 'Tier 1 Strategic Hub'
  },
  {
    countryId: 'zambia',
    countryName: 'Zambia',
    region: 'Southern',
    fdiStockBillions: 5.4,
    shareOfTotalPercent: 10.0,
    topSectors: ['Copper Smelting', 'Hydro & Solar Power', 'Industrial Zones', 'Agro-processing'],
    majorInitiatives: 'Chambishi Copper Smelter & Multi-Facility Economic Zone, Kafue Gorge Lower Power Plant.',
    focacPriority: 'Resource-Infrastructure Hub'
  },
  {
    countryId: 'angola',
    countryName: 'Angola',
    region: 'Central',
    fdiStockBillions: 5.1,
    shareOfTotalPercent: 9.5,
    topSectors: ['Oil Refining & Logistics', 'Civil Construction', 'Agriculture', 'Telecom'],
    majorInitiatives: 'Caculo Cabaca Hydropower project, Luanda New International Airport, Benguela railway rehab.',
    focacPriority: 'Resource-Infrastructure Hub'
  },
  {
    countryId: 'nigeria',
    countryName: 'Nigeria',
    region: 'Western',
    fdiStockBillions: 4.8,
    shareOfTotalPercent: 8.9,
    topSectors: ['Deep Sea Ports', 'Free Trade Zones', 'Railways', 'Consumer Goods'],
    majorInitiatives: 'Lekki Deep Sea Port, Lagos-Ibadan Railway, Ogun-Guangdong Free Trade Zone, Abuja Light Rail.',
    focacPriority: 'Industrialization Hub'
  },
  {
    countryId: 'egypt',
    countryName: 'Egypt',
    region: 'Northern',
    fdiStockBillions: 4.5,
    shareOfTotalPercent: 8.4,
    topSectors: ['Suez Canal SEZ', 'Real Estate CBD', 'Renewable Solar', 'Fiberglass Manufacturing'],
    majorInitiatives: 'TEDA Suez Economic Zone (Jushi Glass Fiber), New Capital Central Business District towers.',
    focacPriority: 'Maritime Logistics Gateway'
  },
  {
    countryId: 'kenya',
    countryName: 'Kenya',
    region: 'Eastern',
    fdiStockBillions: 3.6,
    shareOfTotalPercent: 6.7,
    topSectors: ['Standard Gauge Rail', 'Highway Concessions', 'Solar Energy', 'Fintech'],
    majorInitiatives: 'Mombasa-Nairobi Standard Gauge Railway, Nairobi Expressway PPP, Garissa Solar PV Plant.',
    focacPriority: 'Maritime Logistics Gateway'
  },
  {
    countryId: 'ghana',
    countryName: 'Ghana',
    region: 'Western',
    fdiStockBillions: 2.7,
    shareOfTotalPercent: 5.0,
    topSectors: ['Bauxite & Aluminum Refining', 'Ceramic Manufacturing', 'Power Plants', 'Ports'],
    majorInitiatives: 'Sinohydro bauxite-for-infrastructure barter arrangement, Sunon Asogli Power Plant.',
    focacPriority: 'Industrialization Hub'
  },
  {
    countryId: 'guinea',
    countryName: 'Guinea',
    region: 'Western',
    fdiStockBillions: 2.5,
    shareOfTotalPercent: 4.6,
    topSectors: ['Bauxite Mining', 'Simandou Iron Ore', 'Trans-Guinean Railway', 'Dapilon Port'],
    majorInitiatives: 'Winning Consortium Simandou (WCS) iron ore development and 670km rail-port network.',
    focacPriority: 'Resource-Infrastructure Hub'
  },
  {
    countryId: 'ethiopia',
    countryName: 'Ethiopia',
    region: 'Eastern',
    fdiStockBillions: 2.3,
    shareOfTotalPercent: 4.3,
    topSectors: ['Garment & Apparel SEZs', 'Electric Railway', 'Renewable Power', 'Industrial Parks'],
    majorInitiatives: 'Addis Ababa-Djibouti Electric Railway, Hawassa & Eastern Industrial Parks, Huajian Shoe City.',
    focacPriority: 'Industrialization Hub'
  }
];

export const CHINA_FDI_REGIONAL_SUMMARY: ChinaFdiRegionalDistribution[] = [
  {
    region: 'Southern Africa',
    sharePercentage: 28.5,
    totalStockBillions: 15.3,
    leadingSectors: ['Automotive & Manufacturing', 'Copper & Mining', 'Renewable Energy', 'Banking'],
    keyAnchorCountries: ['South Africa', 'Zambia', 'Zimbabwe', 'Mozambique']
  },
  {
    region: 'Central Africa',
    sharePercentage: 26.2,
    totalStockBillions: 14.1,
    leadingSectors: ['Cobalt & Critical Minerals', 'Hydroelectric Infrastructure', 'Petroleum Logistics'],
    keyAnchorCountries: ['DRC', 'Angola', 'Gabon', 'Republic of Congo']
  },
  {
    region: 'Western Africa',
    sharePercentage: 21.0,
    totalStockBillions: 11.3,
    leadingSectors: ['Deep Sea Ports & Free Zones', 'Bauxite & Iron Ore', 'Consumer Manufacturing'],
    keyAnchorCountries: ['Nigeria', 'Ghana', 'Guinea', 'Senegal', 'Cote dIvoire']
  },
  {
    region: 'Northern Africa',
    sharePercentage: 13.8,
    totalStockBillions: 7.4,
    leadingSectors: ['Suez Maritime Corridor', 'Industrial Park Assemblies', 'Solar & Green Hydrogen'],
    keyAnchorCountries: ['Egypt', 'Algeria', 'Morocco']
  },
  {
    region: 'Eastern Africa',
    sharePercentage: 10.5,
    totalStockBillions: 5.7,
    leadingSectors: ['Standard Gauge Railways', 'Digital Silk Road & 5G', 'Textile & Leather SEZs'],
    keyAnchorCountries: ['Kenya', 'Ethiopia', 'Tanzania', 'Djibouti', 'Uganda']
  }
];

export const CHINESE_COMPANIES_BY_COUNTRY: ChineseCompanyPresence[] = [
  // DEMOCRATIC REPUBLIC OF CONGO
  {
    id: 'cmoc-drc',
    companyName: 'CMOC Group Limited (China Molybdenum)',
    chineseName: '洛阳钼业',
    acronym: 'CMOC',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Luoyang, Henan',
    country: 'Democratic Republic of Congo',
    additionalCountries: ['South Africa'],
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Tenke Fungurume Mining (TFM) Copper-Cobalt Mine', 'Kisanfu (KFM) Cobalt-Copper Mine ($1.8B development)'],
    investmentScaleUSD: '$5.5 Billion',
    status: 'Operational',
    keyImpact: 'World’s largest producer of cobalt and top-5 copper producer; established localized cathode refining plants in Lualaba Province.'
  },
  {
    id: 'zijin-drc',
    companyName: 'Zijin Mining Group Co., Ltd.',
    chineseName: '紫金矿业',
    acronym: 'Zijin Mining',
    ownershipType: 'Joint Venture / Mixed',
    headquartersChina: 'Longyan, Fujian',
    country: 'Democratic Republic of Congo',
    additionalCountries: ['Zambia', 'South Africa', 'Ghana', 'Serbia'],
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Kamoa-Kakula Copper Complex (Joint Venture with Ivanhoe Mines)', 'Kolwezi Copper Smelter & Processing Facility'],
    investmentScaleUSD: '$3.2 Billion',
    status: 'Expanding',
    keyImpact: 'Operates one of the highest-grade ultra-large copper deposits globally with zero-carbon hydroelectric power sourcing.'
  },
  {
    id: 'cnmc-drc',
    companyName: 'China Nonferrous Metal Mining Group',
    chineseName: '中国有色矿业集团',
    acronym: 'CNMC',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Democratic Republic of Congo',
    additionalCountries: ['Zambia'],
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Deziwa Copper & Cobalt Joint Venture (with Gécamines)', 'Lualaba Copper Smelter (LCS)'],
    investmentScaleUSD: '$2.1 Billion',
    status: 'Operational',
    keyImpact: 'Direct bilateral partnership with DRC state miner Gécamines covering 80,000 tonnes/year refined copper cathode production.'
  },
  {
    id: 'sicomines-drc',
    companyName: 'Sicomines Consortium (CREC & Sinohydro)',
    chineseName: '华刚矿业 (中铁 / 中电建)',
    acronym: 'Sicomines / CREC-Sinohydro',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Democratic Republic of Congo',
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['Minerals-for-Infrastructure Framework Concession', 'Kolwezi-Likasi-Lubumbashi Road Rehabilitation', 'Busanga 240MW Hydroelectric Dam'],
    investmentScaleUSD: '$6.2 Billion',
    status: 'Operational',
    keyImpact: 'Renegotiated in 2024 with DRC government securing $7B in cumulative infrastructure investments funded via mineral revenues.'
  },
  {
    id: 'huayou-drc',
    companyName: 'Zhejiang Huayou Cobalt Co., Ltd.',
    chineseName: '华友钴业',
    acronym: 'Huayou Cobalt',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Tongxiang, Zhejiang',
    country: 'Democratic Republic of Congo',
    additionalCountries: ['Zimbabwe', 'Morocco'],
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['CDM (Congo Dongfang International Mining) Smelting', 'Lithium & Nickel hydrometallurgical precursors'],
    investmentScaleUSD: '$1.4 Billion',
    status: 'Expanding',
    keyImpact: 'Primary supplier of lithium-ion battery cathode materials for tier-1 global electric vehicle manufacturers.'
  },

  // SOUTH AFRICA
  {
    id: 'baic-sa',
    companyName: 'BAIC Group (Beijing Automotive Industry Corp)',
    chineseName: '北京汽车集团',
    acronym: 'BAIC Motor',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'South Africa',
    primarySector: 'Automotive',
    flagshipProjects: ['Coega Industrial Development Zone Vehicle Assembly Plant (Gqeberha)', 'Export hub for Sub-Saharan Africa SUVs & pickups'],
    investmentScaleUSD: '$820 Million',
    status: 'Operational',
    keyImpact: 'Largest single automotive greenfield FDI investment in South Africa; capacity to assemble 50,000 vehicles annually.'
  },
  {
    id: 'icbc-sa',
    companyName: 'Industrial and Commercial Bank of China',
    chineseName: '中国工商银行',
    acronym: 'ICBC',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'South Africa',
    additionalCountries: ['Across 20 African nations via Standard Bank network'],
    primarySector: 'Financial Services',
    flagshipProjects: ['20.1% Strategic Equity Ownership in Standard Bank Group', 'RMB-ZAR Currency Clearing & Cross-Border Trade Settlement'],
    investmentScaleUSD: '$5.5 Billion',
    status: 'Operational',
    keyImpact: 'Anchor financial bridge facilitating over $100B in bilateral China-Africa trade and sovereign debt restructuring syndications.'
  },
  {
    id: 'longyuan-sa',
    companyName: 'Longyuan Power (China Energy Investment Corp)',
    chineseName: '龙源电力 (国家能源集团)',
    acronym: 'Longyuan SA',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'South Africa',
    primarySector: 'Energy & Utilities',
    flagshipProjects: ['De Aar 244.5MW Wind Power Project Phase I & II (Northern Cape)', 'Local Eskom grid clean power injection'],
    investmentScaleUSD: '$350 Million',
    status: 'Operational',
    keyImpact: 'Generates 760 million kWh of clean electricity annually, stabilizing the national grid and powering 300,000 South African households.'
  },
  {
    id: 'hisense-sa',
    companyName: 'Hisense Group',
    chineseName: '海信集团',
    acronym: 'Hisense',
    ownershipType: 'Joint Venture / Mixed',
    headquartersChina: 'Qingdao, Shandong',
    country: 'South Africa',
    additionalCountries: ['Nigeria', 'Egypt', 'Algeria'],
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Atlantis Industrial Park Consumer Electronics Manufacturing Facility (Western Cape)', 'Refrigeration & Smart TV assembly lines'],
    investmentScaleUSD: '$260 Million',
    status: 'Expanding',
    keyImpact: 'Employs over 1,000 local workers and holds #1 market share in South Africa for television units and domestic refrigeration.'
  },
  {
    id: 'huawei-sa',
    companyName: 'Huawei Technologies Co., Ltd.',
    chineseName: '华为技术有限公司',
    acronym: 'Huawei',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Shenzhen, Guangdong',
    country: 'South Africa',
    additionalCountries: ['Kenya', 'Nigeria', 'Egypt', 'Ghana', 'Senegal', 'Algeria', 'DRC'],
    primarySector: 'Telecom & Digital Silk Road',
    flagshipProjects: ['Sub-Saharan Africa Regional Headquarters (Woodmead, Johannesburg)', 'Vodacom & MTN 5G commercial core grid networks', 'Huawei Cloud Johannesburg Open Region (3 Availability Zones)'],
    investmentScaleUSD: '$1.2 Billion',
    status: 'Expanding',
    keyImpact: 'Underpins over 70% of 4G/5G telecommunications infrastructure and enterprise cloud hosting across the continent.'
  },

  // ZAMBIA
  {
    id: 'cnmc-zambia',
    companyName: 'China Nonferrous Metal Mining Corp (Zambia Operations)',
    chineseName: '中色有色 (赞比亚)',
    acronym: 'CNMC Luanshya / NFCA',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Zambia',
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Chambishi Copper Mine & Non-Ferrous China-Africa (NFCA)', 'Chambishi Copper Smelter (CCS)', 'Lusaka South Multi-Facility Economic Zone (MFEZ)'],
    investmentScaleUSD: '$2.8 Billion',
    status: 'Expanding',
    keyImpact: 'Processes over 250,000 tonnes of blister copper annually and powers the primary industrial manufacturing zone in the Zambian Copperbelt.'
  },
  {
    id: 'sinohydro-powerchina-zambia',
    companyName: 'Power Construction Corporation of China (PowerChina / Sinohydro)',
    chineseName: '中国电力建设集团 (中国水电)',
    acronym: 'PowerChina / Sinohydro',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Zambia',
    additionalCountries: ['Zimbabwe', 'Angola', 'Mali', 'Ghana', 'DRC'],
    primarySector: 'Energy & Utilities',
    flagshipProjects: ['Kafue Gorge Lower 750MW Hydropower Station ($2B complex)', 'Kariba North Bank Extension Power Station (360MW)'],
    investmentScaleUSD: '$2.3 Billion',
    status: 'Operational',
    keyImpact: 'Eliminated national power deficits and turned Zambia into a net clean energy exporter across the Southern African Power Pool (SAPP).'
  },
  {
    id: 'sinoma-zambia',
    companyName: 'Sinoma International Engineering / Mpande Limestone',
    chineseName: '中材国际 / 姆潘德石灰石',
    acronym: 'Sinoma / CBMI',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Zambia',
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Mpande Limestone Industrial Park in Chongwe', '1 Million Tonnes/year Clinker & Cement Line', 'Structural steel and sintered brick production'],
    investmentScaleUSD: '$500 Million',
    status: 'Operational',
    keyImpact: 'Drove down national cement and construction materials prices by 35% across Zambia and southern DRC.'
  },

  // NIGERIA
  {
    id: 'chec-nigeria',
    companyName: 'China Harbour Engineering Company Ltd. (CHEC / CCCC)',
    chineseName: '中国港湾工程有限责任公司',
    acronym: 'CHEC / CCCC',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Nigeria',
    additionalCountries: ['Cameroon', 'Namibia', 'Ivory Coast', 'Egypt'],
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['Lekki Deep Sea Port (Anchor Equity Investor & 45-Year Operator)', 'Keffi-Akwanga-Lafia-Makurdi Expressway Dualization'],
    investmentScaleUSD: '$1.5 Billion',
    status: 'Operational',
    keyImpact: 'Nigeria’s deepest automated container port, transforming Lagos into West Africa’s primary maritime transshipment hub.'
  },
  {
    id: 'ccecc-nigeria',
    companyName: 'China Civil Engineering Construction Corporation (CCECC / CRCC)',
    chineseName: '中国土木工程集团有限公司',
    acronym: 'CCECC',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Nigeria',
    additionalCountries: ['Ethiopia', 'Djibouti', 'Algeria', 'Tanzania', 'Zambia'],
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['Lagos-Ibadan Standard Gauge Railway (156km)', 'Abuja Rail Mass Transit (Light Rail)', 'Lagos Blue Line Metro Electrification', 'Abuja & Port Harcourt International Airport Terminals'],
    investmentScaleUSD: '$3.6 Billion',
    status: 'Operational',
    keyImpact: 'Pioneered Nigeria’s modern standard-gauge passenger and freight rail network, transporting over 4 million urban commuters yearly.'
  },
  {
    id: 'transsion-nigeria',
    companyName: 'Transsion Holdings (Tecno, Infinix, itel)',
    chineseName: '传音控股',
    acronym: 'Transsion',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Shenzhen, Guangdong',
    country: 'Nigeria',
    additionalCountries: ['Kenya', 'Ethiopia', 'Egypt', 'Ghana', 'South Africa'],
    primarySector: 'Telecom & Digital Silk Road',
    flagshipProjects: ['Local device assembly & supply chain distribution', 'PalmPay & Boomplay Fintech and streaming ecosystems'],
    investmentScaleUSD: '$450 Million',
    status: 'Operational',
    keyImpact: 'Controls over 48% of total African smartphone shipments with localized camera technology, dual-SIM capabilities, and vernacular OS suites.'
  },
  {
    id: 'ogun-guangdong-ftz',
    companyName: 'Guangdong Xinguang International Group',
    chineseName: '广东新广国际集团',
    acronym: 'Ogun-Guangdong FTZ',
    ownershipType: 'Joint Venture / Mixed',
    headquartersChina: 'Guangzhou, Guangdong',
    country: 'Nigeria',
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Ogun-Guangdong Free Trade Zone (Igbesa)', 'Goodwill Ceramics, Winghai Glass, & packaging manufacturing plants'],
    investmentScaleUSD: '$680 Million',
    status: 'Expanding',
    keyImpact: 'Houses over 60 active manufacturing enterprises providing 8,000+ local manufacturing jobs and replacing imported tiles and glass.'
  },

  // EGYPT
  {
    id: 'cscec-egypt',
    companyName: 'China State Construction Engineering Corp (CSCEC)',
    chineseName: '中国建筑集团有限公司',
    acronym: 'CSCEC Egypt',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Egypt',
    additionalCountries: ['Algeria', 'Congo', 'Kenya', 'South Africa'],
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['New Administrative Capital Central Business District (CBD) 20 Skyscraper Complex', 'Iconic Tower (393.8m - Africa’s Tallest Building)', 'Alamein New City Downtown Towers'],
    investmentScaleUSD: '$3.8 Billion',
    status: 'Expanding',
    keyImpact: 'Engineered Africa’s tallest architectural skyscraper and premier financial district in Egypt’s new administrative capital.'
  },
  {
    id: 'teda-egypt',
    companyName: 'Tianjin TEDA Investment Holding Co., Ltd.',
    chineseName: '天津泰达投资控股',
    acronym: 'TEDA Suez',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Tianjin',
    country: 'Egypt',
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['China-Egypt TEDA Suez Economic and Trade Cooperation Zone (Ain Sokhna)', 'Industrial clusters for fiberglass, high-voltage transformers, and petroleum equipment'],
    investmentScaleUSD: '$1.7 Billion',
    status: 'Expanding',
    keyImpact: 'Attracted over 140 manufacturing enterprises, generated $2.5B in sales revenues, and positioned Egypt as a major export gateway to Europe.'
  },
  {
    id: 'jushi-egypt',
    companyName: 'China Jushi Co., Ltd.',
    chineseName: '中国巨石股份有限公司',
    acronym: 'Jushi Egypt',
    ownershipType: 'Joint Venture / Mixed',
    headquartersChina: 'Tongxiang, Zhejiang',
    country: 'Egypt',
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Jushi Egypt 360,000-Tonnes Annual Fiberglass Production Base (Suez)', 'Composite materials export hub for automotive and wind turbine blades'],
    investmentScaleUSD: '$920 Million',
    status: 'Operational',
    keyImpact: 'Transformed Egypt into the world’s 3rd largest fiberglass manufacturing nation and top exporter to the European Union market.'
  },

  // ANGOLA
  {
    id: 'cggc-angola',
    companyName: 'China Gezhouba Group Co., Ltd. (CGGC / Energy China)',
    chineseName: '中国葛洲坝集团',
    acronym: 'CGGC',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Wuhan, Hubei',
    country: 'Angola',
    additionalCountries: ['Nigeria', 'Namibia', 'Ethiopia'],
    primarySector: 'Energy & Utilities',
    flagshipProjects: ['Caculo Cabaça 2,172MW Mega Hydroelectric Power Project (Kwanza River)', 'Soyaux High-Voltage Transmission Interconnector'],
    investmentScaleUSD: '$4.5 Billion',
    status: 'Under Construction',
    keyImpact: 'The largest power generation project in Angolan history, engineered to meet over 50% of the country’s total national electricity demand.'
  },
  {
    id: 'crcc-angola',
    companyName: 'China Railway Construction Corporation (CRCC)',
    chineseName: '中国铁建股份有限公司',
    acronym: 'CRCC Angola',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Angola',
    additionalCountries: ['Nigeria', 'Algeria', 'Zambia'],
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['Benguela Railway (CFB) 1,344km Transcontinental Atlantic-to-DRC Rail Line', 'Luanda Ring Highway & Cabinda Port Marine Terminal'],
    investmentScaleUSD: '$2.2 Billion',
    status: 'Operational',
    keyImpact: 'Restored the strategic Lobito Atlantic transport corridor, linking mineral belts in Katanga (DRC) and Zambia directly to Lobito deepwater port.'
  },
  {
    id: 'sinopec-angola',
    companyName: 'China Petroleum & Chemical Corporation (Sinopec)',
    chineseName: '中国石化',
    acronym: 'Sinopec / Sonangol JV',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Angola',
    additionalCountries: ['Nigeria', 'Algeria', 'Gabon'],
    primarySector: 'Energy & Utilities',
    flagshipProjects: ['Sonangol Sinopec International (SSI) Deepwater Block 18 & Block 31 equity stakes', 'Luanda refinery expansion engineering'],
    investmentScaleUSD: '$3.5 Billion',
    status: 'Operational',
    keyImpact: 'Guarantees long-term crude off-take contracts and petroleum supply security to Asian refining complexes.'
  },

  // KENYA
  {
    id: 'crbc-kenya',
    companyName: 'China Road and Bridge Corporation (CRBC / CCCC)',
    chineseName: '中国路桥工程有限责任公司',
    acronym: 'CRBC Kenya',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Kenya',
    additionalCountries: ['Senegal', 'Mozambique', 'Rwanda', 'Uganda', 'Congo'],
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['Mombasa-Nairobi Standard Gauge Railway (SGR - 472km)', 'Nairobi Expressway (27km Public-Private Partnership BOT Tollway)', 'Lamù Deep Sea Port First 3 Berths (LAPSSET Corridor)'],
    investmentScaleUSD: '$4.2 Billion',
    status: 'Operational',
    keyImpact: 'Cut freight transit times between Mombasa port and Nairobi from 24 hours to 8 hours and pioneered East Africa’s first major toll concession.'
  },
  {
    id: 'keda-twyford-kenya',
    companyName: 'Keda Industrial Group / Twyford Ceramics',
    chineseName: '科达制造 / 时代陶瓷',
    acronym: 'Twyford Ceramics',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Foshan, Guangdong',
    country: 'Kenya',
    additionalCountries: ['Ghana', 'Tanzania', 'Senegal', 'Zambia', 'Nigeria'],
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Kajiado Twyford Ceramic Tile & Sanitary Ware Manufacturing Complex', 'Expansion of local raw material clay quarrying lines'],
    investmentScaleUSD: '$310 Million',
    status: 'Expanding',
    keyImpact: 'Supplies over 70% of Kenya’s domestic ceramic tile market and exports finished building materials across East African Community (EAC) members.'
  },

  // GUINEA
  {
    id: 'wcs-guinea',
    companyName: 'Winning Consortium Simandou (WCS / Shandong Weiqiao)',
    chineseName: '赢联盟 (魏桥创业 / 新加坡韦立 / 烟台港)',
    acronym: 'WCS Simandou',
    ownershipType: 'Joint Venture / Mixed',
    headquartersChina: 'Binzhou, Shandong / Yantai',
    country: 'Guinea',
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Simandou High-Grade Iron Ore Blocks 1 & 2 Development', 'Trans-Guinean Railway (670km multi-user heavy-haul line)', 'Port of Moribayah Deepwater Transshipment Terminal'],
    investmentScaleUSD: '$14.0 Billion',
    status: 'Under Construction',
    keyImpact: 'The world’s largest untapped ultra-high-grade iron ore reserve (65%+ Fe), set to revolutionize global steelmaking and Guinea’s sovereign GDP.'
  },
  {
    id: 'chinalco-guinea',
    companyName: 'Aluminum Corporation of China (Chinalco)',
    chineseName: '中国铝业集团有限公司',
    acronym: 'Chinalco',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Guinea',
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Boffa Bauxite Mining Project & Dedicated River Port', 'Simfer Joint Venture with Rio Tinto (Simandou Blocks 3 & 4)'],
    investmentScaleUSD: '$2.5 Billion',
    status: 'Expanding',
    keyImpact: 'Exports over 12 million tonnes of high-grade bauxite annually, feeding alumina smelters across China.'
  },

  // ZIMBABWE
  {
    id: 'tsingshan-zimbabwe',
    companyName: 'Tsingshan Holding Group / Dinson Iron and Steel Company',
    chineseName: '青山控股集团 / 鼎森钢铁',
    acronym: 'Tsingshan / Dinson',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Wenzhou, Zhejiang',
    country: 'Zimbabwe',
    additionalCountries: ['Indonesia (Morowali)'],
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Manhize $1.5 Billion Integrated Iron and Steel Plant (DISCO)', 'Hwange Dinson Colliery Coke Oven Batteries', 'Afrochine Smelting Ferrochrome Plant (Selous)'],
    investmentScaleUSD: '$1.8 Billion',
    status: 'Operational',
    keyImpact: 'Constructed Africa’s largest integrated steel manufacturing complex, capable of producing 1.2 million tonnes of carbon steel annually.'
  },
  {
    id: 'sinomine-zimbabwe',
    companyName: 'Sinomine Resource Group Co., Ltd.',
    chineseName: '中矿资源集团',
    acronym: 'Sinomine',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Beijing',
    country: 'Zimbabwe',
    additionalCountries: ['Zambia'],
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Bikita Lithium Mine Spodumene & Petalite Processing Plants (2 Million Tonnes/year)', 'Cesium and rubidium specialty chemical refining'],
    investmentScaleUSD: '$550 Million',
    status: 'Operational',
    keyImpact: 'Upgraded Africa’s oldest lithium mine into a modern high-capacity spodumene concentrator feeding global EV supply chains.'
  },

  // ETHIOPIA
  {
    id: 'huajian-ethiopia',
    companyName: 'Huajian Group (Huajian International Shoe City)',
    chineseName: '华坚集团',
    acronym: 'Huajian Group',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Dongguan, Guangdong',
    country: 'Ethiopia',
    primarySector: 'Manufacturing & Industrial',
    flagshipProjects: ['Huajian International Light Industry City (Addis Ababa)', 'Eastern Industrial Zone Footwear & Leather Export Lines'],
    investmentScaleUSD: '$220 Million',
    status: 'Operational',
    keyImpact: 'Employs 5,000+ local Ethiopian leather workers producing millions of pairs of shoes exported to European and US retail chains.'
  },

  // ALGERIA
  {
    id: 'cscec-algeria',
    companyName: 'China State Construction Engineering Corp (Algeria Branch)',
    chineseName: '中建阿尔及利亚公司',
    acronym: 'CSCEC Algeria',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Beijing',
    country: 'Algeria',
    primarySector: 'Transport & Infrastructure',
    flagshipProjects: ['Djamaa el Djazaïr (Great Mosque of Algiers - 3rd largest mosque globally with 265m minaret)', 'Algiers Houari Boumediene International Airport West Terminal', 'Tipaza Center for University Studies'],
    investmentScaleUSD: '$2.6 Billion',
    status: 'Operational',
    keyImpact: 'CSCEC’s largest overseas operational branch in North Africa, executing major sovereign urban landmark and transport infrastructure programs.'
  },

  // MALI
  {
    id: 'ganfeng-mali',
    companyName: 'Ganfeng Lithium Group Co., Ltd.',
    chineseName: '赣锋锂业',
    acronym: 'Ganfeng Lithium',
    ownershipType: 'Private Enterprise (POE)',
    headquartersChina: 'Xinyu, Jiangxi',
    country: 'Mali',
    primarySector: 'Mining & Critical Minerals',
    flagshipProjects: ['Goulamina Lithium Spodumene Mine & Processing Facility ($350M development)', 'Bougouni regional logistics corridor'],
    investmentScaleUSD: '$650 Million',
    status: 'Under Construction',
    keyImpact: 'One of the world’s largest hard-rock lithium deposits (spodumene), targeted to produce over 500,000 tonnes of concentrate per year.'
  },

  // GHANA
  {
    id: 'sunon-asogli-ghana',
    companyName: 'Shenzhen Energy Group / Sunon Asogli Power Ghana',
    chineseName: '深圳能源集团 / 深能源加纳',
    acronym: 'Sunon Asogli Power',
    ownershipType: 'State-Owned Enterprise (SOE)',
    headquartersChina: 'Shenzhen, Guangdong',
    country: 'Ghana',
    primarySector: 'Energy & Utilities',
    flagshipProjects: ['Sunon Asogli 560MW Gas-Fired Combined Cycle Power Plant (Tema Industrial Area)', 'Solar PV and grid stabilization projects'],
    investmentScaleUSD: '$750 Million',
    status: 'Operational',
    keyImpact: 'Provides approximately 15% of Ghana’s entire baseload electricity generation capacity and powers major manufacturing hubs.'
  }
];


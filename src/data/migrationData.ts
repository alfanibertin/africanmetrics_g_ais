/**
 * African International Migration, Top Destinations, Brain Drain, and Return Dynamics
 * Grounded in Official Data Sources:
 * - International Organization for Migration (IOM) - World Migration Report (https://worldmigrationreport.iom.int/)
 * - UN DESA Population Division - International Migrant Stock
 * - WHO Global Health Workforce Statistics & WHO Safeguards List
 * - World Bank KNOMAD Migration and Development Briefs (Remittances & Outflows)
 * - African Union (AU) Migration Policy Framework for Africa (MPFA)
 */

export interface MigrationOverviewStats {
  totalAfricanMigrantsStock: number; // in millions
  shareOfGlobalMigrants: number; // percentage
  intraAfricanMigrants: number; // in millions
  intraAfricanShare: number; // percentage
  extraContinentalMigrants: number; // in millions
  extraContinentalShare: number; // percentage
  totalRemittanceInflowsUSD: number; // in billions
  subSaharanRemittancesUSD: number; // in billions
  averageRemittanceCostAfrica: number; // percentage fee (vs 6.2% global)
  doctorsNursesInOECD: number; // headcount
  africanDoctorDensityPer10k: number; // vs Europe 38.2
  brainDrainFiscalLossUSD: number; // in billions per year (public educational training subsidies)
  annualReturneesAssisted: number; // IOM AVRR supported returnees
  returneeTechFoundersShare: number; // percentage of VC-backed tech startups with returnee/diaspora cofounders
}

export const MIGRATION_OVERVIEW: MigrationOverviewStats = {
  totalAfricanMigrantsStock: 40.4,
  shareOfGlobalMigrants: 14.4,
  intraAfricanMigrants: 21.0,
  intraAfricanShare: 52.0,
  extraContinentalMigrants: 19.4,
  extraContinentalShare: 48.0,
  totalRemittanceInflowsUSD: 100.3,
  subSaharanRemittancesUSD: 54.2,
  averageRemittanceCostAfrica: 7.9,
  doctorsNursesInOECD: 148500,
  africanDoctorDensityPer10k: 3.6,
  brainDrainFiscalLossUSD: 4.62,
  annualReturneesAssisted: 47200,
  returneeTechFoundersShare: 38.5,
};

export interface ContinentalBreakdown {
  destinationRegion: string;
  migrantCountMillion: number;
  sharePercent: number;
  primaryDrivers: string;
  topReceivingCountries: string[];
  growthTrend: 'High' | 'Moderate' | 'Rapidly Accelerating';
}

export const CONTINENTAL_DESTINATION_SHARES: ContinentalBreakdown[] = [
  {
    destinationRegion: 'Intra-African (Within Continent)',
    migrantCountMillion: 21.0,
    sharePercent: 52.0,
    primaryDrivers: 'Regional trade, free movement protocols (ECOWAS, EAC, SADC), agricultural labor, humanitarian protection & family ties',
    topReceivingCountries: ["Côte d'Ivoire", 'South Africa', 'Uganda', 'Kenya', 'Sudan', 'Nigeria', 'Ethiopia'],
    growthTrend: 'Moderate',
  },
  {
    destinationRegion: 'Europe',
    migrantCountMillion: 11.2,
    sharePercent: 27.7,
    primaryDrivers: 'Historical linguistic/colonial ties, bilateral labor agreements, higher education, asylum pathways, healthcare staffing demand',
    topReceivingCountries: ['France', 'Italy', 'Spain', 'United Kingdom', 'Germany', 'Belgium'],
    growthTrend: 'Moderate',
  },
  {
    destinationRegion: 'Middle East & GCC',
    migrantCountMillion: 4.8,
    sharePercent: 11.9,
    primaryDrivers: 'Temporary contractual labor, construction, hospitality, domestic service, medical staffing in Gulf healthcare facilities',
    topReceivingCountries: ['Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Oman'],
    growthTrend: 'Rapidly Accelerating',
  },
  {
    destinationRegion: 'North America',
    migrantCountMillion: 3.1,
    sharePercent: 7.7,
    primaryDrivers: 'High-skilled immigration, STEM employment, Diversity Visa lottery, university study-to-residence transitions, family reunification',
    topReceivingCountries: ['United States', 'Canada'],
    growthTrend: 'High',
  },
  {
    destinationRegion: 'Asia-Pacific, Latin America & Other',
    migrantCountMillion: 0.3,
    sharePercent: 0.7,
    primaryDrivers: 'Commercial trading hubs (Guangzhou, Yiwu in China), diplomatic postings, specialized postgraduate research',
    topReceivingCountries: ['China', 'Australia', 'Brazil', 'Japan'],
    growthTrend: 'Moderate',
  },
];

export interface DestinationProfile {
  id: string;
  name: string;
  category: 'Intra-African Hub' | 'Europe' | 'Middle East / GCC' | 'North America';
  flag: string;
  totalAfricanMigrants: number; // in thousands
  topOriginCountries: string[];
  keySectors: string[];
  mobilityChannel: string;
  annualRemittanceOutflowsUSD: number; // in millions
  policyRegime: string;
  brainDrainSeverity: 'Critical' | 'Severe' | 'Moderate' | 'Low';
  description: string;
}

export const TOP_DESTINATIONS: DestinationProfile[] = [
  {
    id: 'cotedivoire',
    name: "Côte d'Ivoire",
    category: 'Intra-African Hub',
    flag: '🇨🇮',
    totalAfricanMigrants: 2560,
    topOriginCountries: ['Burkina Faso', 'Mali', 'Guinea', 'Benin', 'Niger'],
    keySectors: ['Cocoa & Coffee Agriculture', 'Urban Retail & Trade', 'Construction', 'Transportation'],
    mobilityChannel: 'ECOWAS Protocol on Free Movement of Persons (visa-free 90 days, right of establishment)',
    annualRemittanceOutflowsUSD: 1420,
    policyRegime: 'Regional integration leader; open border architecture with West African neighbors',
    brainDrainSeverity: 'Low',
    description: "The primary intra-African destination in West Africa, hosting over 2.5 million immigrants primarily working in agro-pastoral supply chains and vibrant urban commerce under ECOWAS protocols.",
  },
  {
    id: 'southafrica',
    name: 'South Africa',
    category: 'Intra-African Hub',
    flag: '🇿🇦',
    totalAfricanMigrants: 2860,
    topOriginCountries: ['Zimbabwe', 'Mozambique', 'Lesotho', 'Malawi', 'DRC', 'Nigeria'],
    keySectors: ['Mining & Heavy Industry', 'Services & Hospitality', 'Agriculture', 'Finance & Tertiary Academia'],
    mobilityChannel: 'SADC Bilateral Labor Accords, Zimbabwe Exemption Permits (ZEP), Critical Skills Visas',
    annualRemittanceOutflowsUSD: 2180,
    policyRegime: 'Stringent immigration quotas with periodic regularization schemes and specialized scarce-skills pathways',
    brainDrainSeverity: 'Moderate',
    description: "The economic powerhouse of Southern Africa, attracting both skilled professionals from across the continent into corporate and academic sectors, and cross-border labor into mining and agriculture.",
  },
  {
    id: 'uganda',
    name: 'Uganda',
    category: 'Intra-African Hub',
    flag: '🇺🇬',
    totalAfricanMigrants: 1730,
    topOriginCountries: ['South Sudan', 'DRC', 'Burundi', 'Somalia', 'Rwanda'],
    keySectors: ['Smallholder Farming', 'Micro-Enterprise', 'Informal Trade', 'Logistics'],
    mobilityChannel: 'Progressive Open-Door Refugee Model & EAC Common Market Protocol',
    annualRemittanceOutflowsUSD: 520,
    policyRegime: 'Globally praised refugee self-reliance model granting land allotments, freedom of movement, and right to work',
    brainDrainSeverity: 'Low',
    description: "Africa's largest refugee-hosting nation and a key East African hub, granting displaced populations the right to work, access basic public services, and cultivate agricultural plots.",
  },
  {
    id: 'france',
    name: 'France',
    category: 'Europe',
    flag: '🇫🇷',
    totalAfricanMigrants: 3420,
    topOriginCountries: ['Algeria', 'Morocco', 'Tunisia', 'Senegal', 'Mali', "Côte d'Ivoire", 'Cameroon'],
    keySectors: ['Public Healthcare (Hospital Doctors & Geriatric Care)', 'STEM & Engineering', 'Higher Education', 'Construction & Logistics'],
    mobilityChannel: 'Talent Passport (Passeport Talent), Student Visas, Bilateral Accords, Family Reunification',
    annualRemittanceOutflowsUSD: 4950,
    policyRegime: "Selective talent recruitment ('immigration choisie') coupled with historic bilateral framework agreements",
    brainDrainSeverity: 'Critical',
    description: "The largest European destination for African emigrants, with deeply established Maghrebian and Francophone African diasporas. France heavily relies on North and West African physicians and engineers to offset domestic labor shortages.",
  },
  {
    id: 'usa',
    name: 'United States',
    category: 'North America',
    flag: '🇺🇸',
    totalAfricanMigrants: 2280,
    topOriginCountries: ['Nigeria', 'Ethiopia', 'Egypt', 'Ghana', 'Kenya', 'South Africa', 'Somalia'],
    keySectors: ['Physicians, Specialists & Nursing', 'Software Engineering & AI', 'Academia & Higher Ed', 'Finance & Law'],
    mobilityChannel: 'H-1B Specialty Occupation, Diversity Visa (DV Lottery), EB-1/EB-2 Advanced Degree, Student F-1 OPT',
    annualRemittanceOutflowsUSD: 8740,
    policyRegime: 'High-skill screening; African immigrants in the US boast the highest tertiary educational attainment rate of any foreign-born group (over 69% holding college degrees)',
    brainDrainSeverity: 'Critical',
    description: "The primary global destination for high-skilled African talent. Nigerian, Ghanaian, and Kenyan physicians, data scientists, and academics command prominent positions across US hospitals and Silicon Valley tech hubs.",
  },
  {
    id: 'saudiarabia',
    name: 'Saudi Arabia',
    category: 'Middle East / GCC',
    flag: '🇸🇦',
    totalAfricanMigrants: 2120,
    topOriginCountries: ['Egypt', 'Sudan', 'Ethiopia', 'Chad', 'Eritrea', 'Kenya'],
    keySectors: ['Medical & Healthcare', 'Civil Construction & Mega-Projects (Vision 2030)', 'Transport', 'Domestic Service'],
    mobilityChannel: 'Government-to-Government (G2G) Labor Accords, Qiwa Platform, Specialized Professional Visas',
    annualRemittanceOutflowsUSD: 6850,
    policyRegime: 'Transitioning away from traditional Kafala toward labor mobility reforms under Vision 2030 initiatives',
    brainDrainSeverity: 'Severe',
    description: "The foremost Gulf destination, absorbing massive cohorts of Egyptian physicians, engineers, and teachers, alongside East African workers powering massive Vision 2030 infrastructure initiatives.",
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    category: 'Europe',
    flag: '🇬🇧',
    topOriginCountries: ['Nigeria', 'South Africa', 'Zimbabwe', 'Kenya', 'Ghana', 'Somalia'],
    totalAfricanMigrants: 1450,
    keySectors: ['National Health Service (NHS Doctors & Nurses)', 'IT & FinTech', 'Academia', 'Social & Adult Care'],
    mobilityChannel: 'Health and Care Worker Visa, Skilled Worker Visa, High Potential Individual (HPI), Student Graduate Route',
    annualRemittanceOutflowsUSD: 4120,
    policyRegime: 'Post-Brexit points-based system with aggressive NHS fast-track recruitment for overseas healthcare staff',
    brainDrainSeverity: 'Critical',
    description: "A major destination for Anglophone Africa. Over 18,000 Nigerian medical personnel and thousands of Ghanaian and Zimbabwean healthcare staff sustain NHS acute trusts and elderly care infrastructure.",
  },
  {
    id: 'uae',
    name: 'United Arab Emirates',
    category: 'Middle East / GCC',
    flag: '🇦🇪',
    totalAfricanMigrants: 1340,
    topOriginCountries: ['Egypt', 'Sudan', 'Kenya', 'Uganda', 'Nigeria', 'Ethiopia'],
    keySectors: ['Aviation & Logistics', 'Tourism & Hospitality', 'Financial Tech', 'Security & Retail'],
    mobilityChannel: 'Golden Visa, Green Visa, Standard Employer-Sponsored Work Permits',
    annualRemittanceOutflowsUSD: 3950,
    policyRegime: 'Modernized multi-year residency options for talent, entrepreneurs, and skilled corporate professionals',
    brainDrainSeverity: 'Severe',
    description: "The fastest-expanding Gulf hub for young urban African professionals, tech operators, and service personnel, offering tax-free compensation and global connectivity.",
  },
  {
    id: 'italy',
    name: 'Italy',
    category: 'Europe',
    flag: '🇮🇹',
    totalAfricanMigrants: 1280,
    topOriginCountries: ['Morocco', 'Egypt', 'Senegal', 'Tunisia', 'Nigeria', 'Ghana'],
    keySectors: ['Agriculture & Food Processing', 'Light Manufacturing', 'Logistics', 'Domestic Care'],
    mobilityChannel: 'Decreto Flussi Quotas, Seasonal Labor Visas, Humanitarian Regularizations',
    annualRemittanceOutflowsUSD: 2310,
    policyRegime: 'Annual quota decrees balancing agricultural labor deficits with border control accords',
    brainDrainSeverity: 'Moderate',
    description: "Southern Europe's main gateway hosting large North and West African communities vital to Italian agricultural harvest cycles, industrial districts, and elderly care.",
  },
  {
    id: 'spain',
    name: 'Spain',
    category: 'Europe',
    flag: '🇪🇸',
    totalAfricanMigrants: 1190,
    topOriginCountries: ['Morocco', 'Senegal', 'Algeria', 'Mali', 'Nigeria'],
    keySectors: ['Horticulture & Intensive Agriculture', 'Construction', 'Hospitality', 'Logistics'],
    mobilityChannel: 'Circular Migration Bilateral Agreements, Arraigo (social/labor regularization pathways)',
    annualRemittanceOutflowsUSD: 1980,
    policyRegime: 'Circular migration programs (e.g. Huelva berry harvesting agreements with Morocco and Senegal)',
    brainDrainSeverity: 'Moderate',
    description: "A key gateway separated by just 14km across Gibraltar, anchoring seasonal circular migration agreements that supply critical labor for Spanish agro-export regions.",
  },
  {
    id: 'canada',
    name: 'Canada',
    category: 'North America',
    flag: '🇨🇦',
    totalAfricanMigrants: 680,
    topOriginCountries: ['Nigeria', 'Egypt', 'Morocco', 'Cameroon', 'Algeria', 'DRC', 'Ghana'],
    keySectors: ['Healthcare & Nursing', 'Information Technology', 'Civil & Mining Engineering', 'Higher Education'],
    mobilityChannel: 'Express Entry (Comprehensive Ranking System), Provincial Nominee Programs (PNP), Francophone Mobility Program',
    annualRemittanceOutflowsUSD: 1820,
    policyRegime: 'Points-based immigration explicitly incentivizing bilingual French-English talent and tech/healthcare credentials',
    brainDrainSeverity: 'Critical',
    description: "The fastest-growing destination for educated bilingual African families, particularly leveraging Express Entry and Quebec Francophone programs for software developers, nurses, and engineers.",
  },
  {
    id: 'germany',
    name: 'Germany',
    category: 'Europe',
    flag: '🇩🇪',
    totalAfricanMigrants: 820,
    topOriginCountries: ['Eritrea', 'Morocco', 'Somalia', 'Nigeria', 'Ghana', 'Egypt', 'Tunisia'],
    keySectors: ['Engineering & Automotive', 'IT Development', 'Hospital Nursing & Elderly Care', 'Vocational Trades'],
    mobilityChannel: 'Skilled Immigration Act (Fachkräfteeinwanderungsgesetz), Opportunity Card (Chancenkarte), Blue Card',
    annualRemittanceOutflowsUSD: 1640,
    policyRegime: 'Proactive workforce recruitment targeting nursing and tech vacancies across European demographic decline',
    brainDrainSeverity: 'Severe',
    description: "Europe's largest economy has launched targeted recruiting drives for North African engineers and West African nursing specialists through its modernized Skilled Immigration Act.",
  },
];

export interface BilateralCorridor {
  id: string;
  originCountry: string;
  originCode: string;
  destinationCountry: string;
  destinationCode: string;
  migrantStock: number; // in thousands
  flowType: 'Intra-African' | 'Inter-Continental';
  remittanceVolumeUSD: number; // in millions
  primaryDemographics: string;
  strategicNote: string;
}

export const TOP_BILATERAL_CORRIDORS: BilateralCorridor[] = [
  {
    id: 'bfa-civ',
    originCountry: 'Burkina Faso',
    originCode: 'BFA',
    destinationCountry: "Côte d'Ivoire",
    destinationCode: 'CIV',
    migrantStock: 1350,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 410,
    primaryDemographics: 'Rural youth, cocoa plantation workers, urban traders',
    strategicNote: 'The largest bilateral migration corridor on the African continent, anchored in century-old economic complementarity.',
  },
  {
    id: 'ssd-uga',
    originCountry: 'South Sudan',
    originCode: 'SSD',
    destinationCountry: 'Uganda',
    destinationCode: 'UGA',
    migrantStock: 940,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 125,
    primaryDemographics: 'Displaced families, students, small-scale entrepreneurs',
    strategicNote: 'Hosted under Uganda progressive open-door refugee policy with full local integration and land access.',
  },
  {
    id: 'egy-sau',
    originCountry: 'Egypt',
    originCode: 'EGY',
    destinationCountry: 'Saudi Arabia',
    destinationCode: 'SAU',
    migrantStock: 960,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 7200,
    primaryDemographics: 'Medical doctors, civil engineers, accountants, teachers',
    strategicNote: 'Crucial foreign exchange artery generating billions in remittances that support Egypt sovereign reserves.',
  },
  {
    id: 'dza-fra',
    originCountry: 'Algeria',
    originCode: 'DZA',
    destinationCountry: 'France',
    destinationCode: 'FRA',
    migrantStock: 880,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 1950,
    primaryDemographics: 'STEM professionals, university students, medical staff, second-generation families',
    strategicNote: 'Historic migratory corridor governed by the 1968 Franco-Algerian Accord, currently undergoing diplomatic renegotiations.',
  },
  {
    id: 'mar-fra',
    originCountry: 'Morocco',
    originCode: 'MAR',
    destinationCountry: 'France',
    destinationCode: 'FRA',
    migrantStock: 820,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 2450,
    primaryDemographics: 'Engineers, finance executives, business managers, students',
    strategicNote: 'Morocco represents the #1 foreign student population in French elite engineering & business grand écoles.',
  },
  {
    id: 'mar-esp',
    originCountry: 'Morocco',
    originCode: 'MAR',
    destinationCountry: 'Spain',
    destinationCode: 'ESP',
    migrantStock: 780,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 1650,
    primaryDemographics: 'Seasonal agricultural workers, logistics employees, small entrepreneurs',
    strategicNote: 'Sustained by bilateral circular labor migration pacts in the Andalusia agricultural sector.',
  },
  {
    id: 'zwe-zaf',
    originCountry: 'Zimbabwe',
    originCode: 'ZWE',
    destinationCountry: 'South Africa',
    destinationCode: 'ZAF',
    migrantStock: 720,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 890,
    primaryDemographics: 'Teachers, corporate professionals, domestic workers, miners',
    strategicNote: 'Intense human capital circulation; heavily influenced by extensions of the Zimbabwe Exemption Permit (ZEP).',
  },
  {
    id: 'ssd-sdn',
    originCountry: 'South Sudan',
    originCode: 'SSD',
    destinationCountry: 'Sudan',
    destinationCode: 'SDN',
    migrantStock: 680,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 85,
    primaryDemographics: 'Cross-border families, pastoralists, urban service staff',
    strategicNote: 'Complex bidirectional flows disrupted by ongoing conflict and regional instability.',
  },
  {
    id: 'som-ken',
    originCountry: 'Somalia',
    originCode: 'SOM',
    destinationCountry: 'Kenya',
    destinationCode: 'KEN',
    migrantStock: 490,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 210,
    primaryDemographics: 'Traders, pastoralists, Eastleigh commercial district business owners',
    strategicNote: "Dynamic entrepreneurial hub centered in Nairobi Eastleigh ('Little Mogadishu') transforming regional commerce.",
  },
  {
    id: 'egy-are',
    originCountry: 'Egypt',
    originCode: 'EGY',
    destinationCountry: 'United Arab Emirates',
    destinationCode: 'ARE',
    migrantStock: 480,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 2850,
    primaryDemographics: 'Fintech developers, corporate lawyers, medical consultants, architects',
    strategicNote: 'High-income professional corridor benefiting from the UAE Golden Visa and regional financial expansion.',
  },
  {
    id: 'cod-uga',
    originCountry: 'DR Congo',
    originCode: 'COD',
    destinationCountry: 'Uganda',
    destinationCode: 'UGA',
    migrantStock: 460,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 60,
    primaryDemographics: 'Eastern DRC displaced households, cross-border traders, artisans',
    strategicNote: 'Facilitated by DRC admission into the East African Community (EAC) common market bloc.',
  },
  {
    id: 'nga-usa',
    originCountry: 'Nigeria',
    originCode: 'NGA',
    destinationCountry: 'United States',
    destinationCode: 'USA',
    migrantStock: 430,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 3620,
    primaryDemographics: 'Medical doctors, pharmacists, software engineers, academic faculty',
    strategicNote: 'One of the highest earning and most educated diaspora cohorts in the entire United States economy.',
  },
  {
    id: 'mli-civ',
    originCountry: 'Mali',
    originCode: 'MLI',
    destinationCountry: "Côte d'Ivoire",
    destinationCode: 'CIV',
    migrantStock: 440,
    flowType: 'Intra-African',
    remittanceVolumeUSD: 180,
    primaryDemographics: 'Agricultural workers, livestock dealers, informal market merchants',
    strategicNote: 'Historic trade axis connecting the Sahelian interior to Gulf of Guinea maritime ports.',
  },
  {
    id: 'nga-gbr',
    originCountry: 'Nigeria',
    originCode: 'NGA',
    destinationCountry: 'United Kingdom',
    destinationCode: 'GBR',
    migrantStock: 310,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 2150,
    primaryDemographics: 'NHS physicians, senior nurses, university postgraduates, tech leads',
    strategicNote: "Accelerated dramatically by the post-2020 'Japa' movement and UK Health & Care worker fast tracks.",
  },
  {
    id: 'eth-sau',
    originCountry: 'Ethiopia',
    originCode: 'ETH',
    destinationCountry: 'Saudi Arabia',
    destinationCode: 'SAU',
    migrantStock: 290,
    flowType: 'Inter-Continental',
    remittanceVolumeUSD: 820,
    primaryDemographics: 'Service workers, agricultural labor, domestic support',
    strategicNote: 'Key Eastern migration route subject to ongoing bilateral regularization agreements and repatriation drives.',
  },
];

export interface BrainDrainSectorData {
  sectorName: string;
  estimatedEmigrantShare: number; // percentage of domestic pool
  annualTalentLossHeadcount: number;
  criticalDestinations: string[];
  economicImpactRating: 'Catastrophic' | 'Severe' | 'High' | 'Moderate';
  taxpayerTrainingCostLostUSD: number; // in millions
  diagnosticBrief: string;
  keyMitigationStrategy: string;
}

export const BRAIN_DRAIN_SECTORS: BrainDrainSectorData[] = [
  {
    sectorName: 'Healthcare & Medical Workforce',
    estimatedEmigrantShare: 42.5,
    annualTalentLossHeadcount: 14200,
    criticalDestinations: ['United Kingdom (NHS)', 'United States', 'Canada', 'France', 'Saudi Arabia', 'Germany'],
    economicImpactRating: 'Catastrophic',
    taxpayerTrainingCostLostUSD: 2150,
    diagnosticBrief:
      "Africa bears 24% of the global disease burden but retains only 3% of the world's health workforce. 37 African nations are on the WHO Safeguards Red List. Training a single doctor costs African state universities ~$180k, which becomes an uncompensated subsidy when high-income countries recruit them.",
    keyMitigationStrategy:
      'Bilateral health workforce compensation pacts; training levy reimbursements from destination health services; retention allowances; telemedicine dual-practice models.',
  },
  {
    sectorName: 'Software Engineering, AI & STEM',
    estimatedEmigrantShare: 36.8,
    annualTalentLossHeadcount: 18500,
    criticalDestinations: ['United States (Silicon Valley)', 'Germany', 'United Kingdom', 'Canada', 'Netherlands', 'UAE'],
    economicImpactRating: 'Severe',
    taxpayerTrainingCostLostUSD: 1120,
    diagnosticBrief:
      "The Nigerian 'Japa' wave and tech talent flight from Kenya, Egypt, and South Africa have drained senior engineering leads. Local startups report severe shortages of 5+ year staff, with US/EU remote contracts paying 6x to 10x local salaries.",
    keyMitigationStrategy:
      'Remote global work hubs that keep talent resident domestically; equity-friendly startup legislation; tech talent matching co-funding; compute infrastructure subsidies.',
  },
  {
    sectorName: 'Academic Faculty & Scientific Researchers',
    estimatedEmigrantShare: 31.2,
    annualTalentLossHeadcount: 8900,
    criticalDestinations: ['United States', 'France', 'United Kingdom', 'South Africa', 'Canada', 'Belgium'],
    economicImpactRating: 'Severe',
    taxpayerTrainingCostLostUSD: 780,
    diagnosticBrief:
      "Over 40% of STEM professorial chairs in several West and Central African universities remain vacant. African researchers author less than 2% of peer-reviewed scientific publications globally despite constituting 18% of the human population.",
    keyMitigationStrategy:
      'Virtual diaspora professorships; dual-affiliation academic contracts; joint international research grant matching funds; laboratory modernization bonds.',
  },
  {
    sectorName: 'Civil, Mining & Infrastructure Engineers',
    estimatedEmigrantShare: 27.4,
    annualTalentLossHeadcount: 7300,
    criticalDestinations: ['Canada', 'Australia', 'GCC (Saudi Arabia/UAE)', 'United Kingdom', 'France'],
    economicImpactRating: 'High',
    taxpayerTrainingCostLostUSD: 570,
    diagnosticBrief:
      "Critical shortages of domestic project managers, mining engineers, and geologists force African governments and parastatals to hire high-cost foreign EPC contractors, inflating public infrastructure costs by 25-40%.",
    keyMitigationStrategy:
      'Public-private infrastructure project equity participation for national engineers; competitive sovereign procurement preferences; fast-track executive repatriation packages.',
  },
];

export interface CountryMigrationProfile {
  id: string;
  name: string;
  code: string;
  flag: string;
  populationMillion: number;
  emigrantStockThousands: number;
  emigrantPercentPop: number;
  remittancesReceivedUSDMillion: number;
  remittancesPercentGDP: number;
  brainDrainSeverityIndex: number; // 0-100 scale
  whoSafeguardStatus: 'Red-Listed (Critical Shortage)' | 'Monitored' | 'Standard';
  primaryDestinations: string[];
  keyTalentLossAreas: string[];
  topReturnPrograms: string[];
  diasporaEngagementGrade: 'A+' | 'A' | 'B+' | 'B' | 'C+' | 'C' | 'Developing';
  strategicSummary: string;
}

export const COUNTRY_MIGRATION_PROFILES: CountryMigrationProfile[] = [
  {
    id: 'nigeria',
    name: 'Nigeria',
    code: 'NGA',
    flag: '🇳🇬',
    populationMillion: 223.8,
    emigrantStockThousands: 1720,
    emigrantPercentPop: 0.8,
    remittancesReceivedUSDMillion: 20100,
    remittancesPercentGDP: 5.4,
    brainDrainSeverityIndex: 88,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['United States', 'United Kingdom', 'Canada', 'Italy', 'Ghana', 'UAE'],
    keyTalentLossAreas: ['NHS Physicians & Nurses', 'FinTech & Software Engineers', 'University Professors', 'Petroleum Geologists'],
    topReturnPrograms: ['NiDCOM (Diaspora Commission)', 'National Diaspora Policy', 'Diaspora Mortgage Scheme', 'Techstars Lagos Returnee Founders'],
    diasporaEngagementGrade: 'A',
    strategicSummary:
      "Nigeria experiences the widely discussed 'Japa' phenomenon, losing thousands of medical and software professionals annually to the UK, Canada, and US. However, it commands Africa's largest remittance inflow ($20.1B) and has established NiDCOM to mobilize diaspora capital into infrastructure and venture funding.",
  },
  {
    id: 'egypt',
    name: 'Egypt',
    code: 'EGY',
    flag: '🇪🇬',
    populationMillion: 112.7,
    emigrantStockThousands: 3610,
    emigrantPercentPop: 3.2,
    remittancesReceivedUSDMillion: 24200,
    remittancesPercentGDP: 6.2,
    brainDrainSeverityIndex: 74,
    whoSafeguardStatus: 'Monitored',
    primaryDestinations: ['Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'United States', 'Italy', 'Jordan'],
    keyTalentLossAreas: ['Physicians & Surgeons in GCC', 'Civil Engineers', 'Financial Analysts', 'Educators'],
    topReturnPrograms: ['Ministry of Emigration Initiatives', 'Egypt Can (Misr Tastatee) Conferences', 'High-Yield Foreign Currency CDs for Expatriates'],
    diasporaEngagementGrade: 'A+',
    strategicSummary:
      "Africa's largest diaspora remittance recipient ($24.2B), with over 3.6M citizens abroad primarily across the GCC. While medical doctor flight to the Gulf is high, remittances provide vital macro liquidity, and state-backed dollar deposits actively harness expat savings.",
  },
  {
    id: 'ghana',
    name: 'Ghana',
    code: 'GHA',
    flag: '🇬🇭',
    populationMillion: 34.1,
    emigrantStockThousands: 1020,
    emigrantPercentPop: 3.0,
    remittancesReceivedUSDMillion: 4700,
    remittancesPercentGDP: 6.1,
    brainDrainSeverityIndex: 82,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['United States', 'United Kingdom', 'Nigeria', "Côte d'Ivoire", 'Germany', 'Italy'],
    keyTalentLossAreas: ['Midwives & Specialized Nurses', 'Pharmacists', 'Data Engineers', 'Mining Engineers'],
    topReturnPrograms: ['Year of Return (2019) & Beyond the Return (2020-2030)', 'Diaspora Affairs Office (Presidency)', 'Right of Abode Legislation'],
    diasporaEngagementGrade: 'A+',
    strategicSummary:
      "A global pioneer in diaspora engagement, Ghana turned the 2019 'Year of Return' into an economic catalyst, welcoming over 500,000 African diaspora visitors and granting citizenship/residency. However, local hospitals suffer severe nursing vacancies due to UK and US recruitment drives.",
  },
  {
    id: 'kenya',
    name: 'Kenya',
    code: 'KEN',
    flag: '🇰🇪',
    populationMillion: 55.1,
    emigrantStockThousands: 540,
    emigrantPercentPop: 1.0,
    remittancesReceivedUSDMillion: 4300,
    remittancesPercentGDP: 3.8,
    brainDrainSeverityIndex: 68,
    whoSafeguardStatus: 'Monitored',
    primaryDestinations: ['United States', 'United Kingdom', 'Uganda', 'Tanzania', 'Saudi Arabia', 'UAE'],
    keyTalentLossAreas: ['Silicon Savannah Tech Leads', 'Doctors', 'Financial Quant Specialists', 'Aviation Pilots'],
    topReturnPrograms: ['State Department for Diaspora Affairs', 'Kenya Diaspora Bond', 'Central Bank M-Pesa Remittance Integration'],
    diasporaEngagementGrade: 'A',
    strategicSummary:
      "Kenya leverages high mobile-money integration to capture $4.3B in remittances. Returnees have been instrumental in building the 'Silicon Savannah' startup ecosystem in Nairobi, though nursing and domestic labor migration to the Gulf requires stricter bilateral safeguards.",
  },
  {
    id: 'morocco',
    name: 'Morocco',
    code: 'MAR',
    flag: '🇲🇦',
    populationMillion: 37.8,
    emigrantStockThousands: 3240,
    emigrantPercentPop: 8.6,
    remittancesReceivedUSDMillion: 11400,
    remittancesPercentGDP: 7.8,
    brainDrainSeverityIndex: 71,
    whoSafeguardStatus: 'Standard',
    primaryDestinations: ['France', 'Spain', 'Italy', 'Belgium', 'Netherlands', 'Germany'],
    keyTalentLossAreas: ['Aeronautic & Automotive Engineers', 'Software Architects in Paris', 'Hospital Residents'],
    topReturnPrograms: ['Fondation Hassan II pour les MRE', 'Marocains du Monde Strategic Plan', 'Tax Exemption for Repatriated Startups'],
    diasporaEngagementGrade: 'A+',
    strategicSummary:
      "Over 3.2M Moroccans reside in Europe. Remittances ($11.4B) exceed tourism revenues. Through targeted industrial policies in Casablanca and Tangier, Morocco successfully recruits French-educated diaspora engineers back into its aerospace and EV battery clusters.",
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
    code: 'ZWE',
    flag: '🇿🇼',
    populationMillion: 16.3,
    emigrantStockThousands: 1150,
    emigrantPercentPop: 7.1,
    remittancesReceivedUSDMillion: 2100,
    remittancesPercentGDP: 7.2,
    brainDrainSeverityIndex: 94,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['South Africa', 'United Kingdom', 'Botswana', 'Australia', 'New Zealand'],
    keyTalentLossAreas: ['Nurses & Doctors', 'Secondary School Teachers', 'Accountants', 'Civil Engineers'],
    topReturnPrograms: ['Diaspora Directorate', 'National Diaspora Policy Draft', 'Duty-Free Returnee Vehicle Concessions'],
    diasporaEngagementGrade: 'B',
    strategicSummary:
      "Zimbabwe faces one of the world's most acute health brain drains: over 4,000 healthcare staff left for the UK and South Africa in just two years. Remittances remain an indispensable family lifeline, but local health clinics operate at critical staffing deficits.",
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
    code: 'ETH',
    flag: '🇪🇹',
    populationMillion: 126.5,
    emigrantStockThousands: 1080,
    emigrantPercentPop: 0.9,
    remittancesReceivedUSDMillion: 2600,
    remittancesPercentGDP: 1.6,
    brainDrainSeverityIndex: 79,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['United States', 'Saudi Arabia', 'Sudan', 'Israel', 'Kenya', 'Canada'],
    keyTalentLossAreas: ['Public Health Researchers', 'Economists', 'Specialist Surgeons', 'Software Engineers'],
    topReturnPrograms: ['Ethiopian Diaspora Agency (EDA)', 'Ethiopian Diaspora Trust Fund (EDTF)', 'Foreign Currency Expat Accounts'],
    diasporaEngagementGrade: 'B+',
    strategicSummary:
      "Ethiopia hosts an influential US diaspora that funded the EDTF to support healthcare and education projects. However, regional instability and hyperinflation have driven continuous outflows to both North America and dangerous Gulf transit routes.",
  },
  {
    id: 'senegal',
    name: 'Senegal',
    code: 'SEN',
    flag: '🇸🇳',
    populationMillion: 17.7,
    emigrantStockThousands: 710,
    emigrantPercentPop: 4.0,
    remittancesReceivedUSDMillion: 2900,
    remittancesPercentGDP: 9.3,
    brainDrainSeverityIndex: 65,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['France', 'Italy', 'Spain', 'Gambia', 'Mauritania', 'United States'],
    keyTalentLossAreas: ['Agronomists', 'Maritime Specialists', 'Professors', 'Health Workers'],
    topReturnPrograms: ['Direction Générale des Sénégalais de lExtérieur', 'FAISE (Diaspora Investment Support Fund)', '15 Diaspora National Assembly Seats'],
    diasporaEngagementGrade: 'A',
    strategicSummary:
      "Senegal grants direct constitutional representation to its diaspora with 15 dedicated seats in the National Assembly. Remittances account for 9.3% of GDP, fueling residential construction and small businesses across Dakar, Touba, and Saint-Louis.",
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    code: 'RWA',
    flag: '🇷🇼',
    populationMillion: 14.1,
    emigrantStockThousands: 360,
    emigrantPercentPop: 2.6,
    remittancesReceivedUSDMillion: 480,
    remittancesPercentGDP: 3.4,
    brainDrainSeverityIndex: 58,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['Uganda', 'DRC', 'Burundi', 'Belgium', 'Canada', 'United States'],
    keyTalentLossAreas: ['Biotech Specialists', 'ICT Programmers', 'Specialized Clinicians'],
    topReturnPrograms: ['Diaspora General Directorate (MINAFFET)', 'Rwanda Global Diaspora Network', 'Medical Diaspora Return Fellowships'],
    diasporaEngagementGrade: 'A+',
    strategicSummary:
      "Rwanda exemplifies proactive 'brain circulation'. The government sponsors short-term return missions where overseas medical specialists perform advanced surgeries and train local residents at Kigali Teaching Hospital (CHUK).",
  },
  {
    id: 'burkinafaso',
    name: 'Burkina Faso',
    code: 'BFA',
    flag: '🇧🇫',
    populationMillion: 23.2,
    emigrantStockThousands: 1580,
    emigrantPercentPop: 6.8,
    remittancesReceivedUSDMillion: 610,
    remittancesPercentGDP: 2.7,
    brainDrainSeverityIndex: 72,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ["Côte d'Ivoire", 'Mali', 'Ghana', 'Niger', 'France'],
    keyTalentLossAreas: ['Mining Technicians', 'Veterinarians & Agronomists', 'Teachers'],
    topReturnPrograms: ['Conseil Supérieur des Burkinabè de lExtérieur (CSBE)', 'Diaspora Agro-Pastoral Reintegration Fund'],
    diasporaEngagementGrade: 'B',
    strategicSummary:
      "The vast majority of Burkinabè migrants reside in neighboring Côte d'Ivoire (>1.3M), sustaining historical cross-border agro-pastoral and seasonal cocoa harvesting cycles, alongside newer security-driven displacements.",
  },
  {
    id: 'mali',
    name: 'Mali',
    code: 'MLI',
    flag: '🇲🇱',
    populationMillion: 22.5,
    emigrantStockThousands: 1320,
    emigrantPercentPop: 5.9,
    remittancesReceivedUSDMillion: 1150,
    remittancesPercentGDP: 5.4,
    brainDrainSeverityIndex: 76,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ["Côte d'Ivoire", 'France', 'Niger', 'Senegal', 'Gabon', 'Mauritania'],
    keyTalentLossAreas: ['Medical Doctors in Paris Public Hospitals', 'Engineers', 'University Lecturers'],
    topReturnPrograms: ['Ministère des Maliens Établis à lExtérieur', 'Kayes Region Diaspora Local Development Associations'],
    diasporaEngagementGrade: 'B+',
    strategicSummary:
      "Malian hometown associations in France (especially from the Kayes region) have funded hundreds of schools, solar wells, and clinics in rural Mali, demonstrating collective community diaspora solidarity.",
  },
  {
    id: 'niger',
    name: 'Niger',
    code: 'NER',
    flag: '🇳🇪',
    populationMillion: 27.0,
    emigrantStockThousands: 420,
    emigrantPercentPop: 1.6,
    remittancesReceivedUSDMillion: 330,
    remittancesPercentGDP: 1.5,
    brainDrainSeverityIndex: 81,
    whoSafeguardStatus: 'Red-Listed (Critical Shortage)',
    primaryDestinations: ['Nigeria', "Côte d'Ivoire", 'Benin', 'Togo', 'Algeria', 'Libya'],
    keyTalentLossAreas: ['Petroleum & Uranium Engineers', 'Physicians (Severe National Ratio of 0.5 per 10k)', 'Hydrologists'],
    topReturnPrograms: ['Direction Générale de la Diaspora', 'National Strategy for Migration & Reintegration'],
    diasporaEngagementGrade: 'C+',
    strategicSummary:
      "Niger is both a major regional transit hub (Agadez desert crossroads) and source of circular seasonal migration to coastal West Africa. Doctor-to-population density is among the lowest globally at 0.5 physicians per 10,000 residents.",
  },
];

export interface ReturnCirculationPolicy {
  pillar: string;
  title: string;
  description: string;
  bestPracticeCountry: string;
  impactScore: 'High Impact' | 'Transformative' | 'Foundational';
  implementationStatus: string;
}

export const BRAIN_CIRCULATION_ROADMAP: ReturnCirculationPolicy[] = [
  {
    pillar: 'Talent & Skills',
    title: 'Dual Affiliation & Virtual Professorship Frameworks',
    description:
      'Allow diaspora scientists, clinicians, and researchers to hold part-time appointments at African state institutions without forfeiting tenure or licensing abroad. Enables telemedicine, joint grant funding, and intensive masterclasses.',
    bestPracticeCountry: 'Rwanda & Ghana',
    impactScore: 'Transformative',
    implementationStatus: 'Adopted in 8 African nations; gaining rapid traction in university consortia.',
  },
  {
    pillar: 'Finance & Capital',
    title: 'Sovereign Diaspora Bonds & Dedicated Investment Funds',
    description:
      'Issue local-currency or dollar-denominated diaspora bonds specifically ring-fenced for revenue-generating infrastructure (solar mini-grids, port logistics, healthcare complexes) with interest exempted from local capital gains taxes.',
    bestPracticeCountry: 'Kenya & Nigeria',
    impactScore: 'Transformative',
    implementationStatus: 'Kenya CBK Diaspora Bond oversubscribed; Nigeria NDITF capitalization underway.',
  },
  {
    pillar: 'Legal & Citizenship',
    title: 'Universal Dual Citizenship & Diaspora Voting Franchise',
    description:
      "Eliminate archaic citizenship renunciation statutes. Guarantee constitutional voting rights, property ownership equality, and special 'Right of Abode' statuses for global African heritage diasporas.",
    bestPracticeCountry: 'Ghana & Senegal',
    impactScore: 'High Impact',
    implementationStatus: '34 African Union member states now permit dual nationality.',
  },
  {
    pillar: 'Healthcare Ethics',
    title: 'WHO Code Enforcement & Bilateral Training Reimbursements',
    description:
      'Enforce the WHO Global Code of Practice on the International Recruitment of Health Personnel. Require destination governments (UK, US, France, Germany) to fund reciprocal medical school faculty slots and technology transfer to offset recruitments.',
    bestPracticeCountry: 'South Africa & Nigeria',
    impactScore: 'Foundational',
    implementationStatus: 'Drafted in AU-EU migration summits; awaiting formal bilateral enforcement mechanisms.',
  },
  {
    pillar: 'Reintegration & Startup',
    title: 'Returnee Entrepreneurship Incubators & Equipment Duty Waivers',
    description:
      'Provide zero-tariff import clearances for commercial diagnostic equipment, industrial machinery, and tech hardware imported by returning diaspora entrepreneurs, paired with 5-year corporate tax relief.',
    bestPracticeCountry: 'Morocco & Ethiopia',
    impactScore: 'High Impact',
    implementationStatus: 'Standard in Casablanca Finance City & Addis Ababa returnee trade concessions.',
  },
];

export interface RegionalHotspotItem {
  destination: string;
  countryCode: string;
  flag: string;
  category: 'Intra-African Hub' | 'Europe' | 'Middle East / GCC' | 'North America' | 'Other';
  migrantStockThousands: number;
  sharePercent: number;
  primaryDrivers: string;
  dominantOrigins: string[];
  keySectors: string[];
}

export interface RegionalDistributionProfile {
  id: string;
  regionName: string;
  shortName: string;
  subTitle: string;
  totalEmigrantsMillion: number;
  intraAfricanSharePercent: number;
  extraContinentalSharePercent: number;
  annualRemittancesUSD_B: number;
  destinationShares: {
    destinationRegion: string;
    migrantCountMillion: number;
    sharePercent: number;
    fillColor: string;
  }[];
  topHotspots: RegionalHotspotItem[];
  keyPolicyDynamic: string;
  iomCitation: string;
}

export const AFRICAN_REGIONAL_DISTRIBUTION_PROFILES: RegionalDistributionProfile[] = [
  {
    id: 'north-africa',
    regionName: 'North Africa',
    shortName: 'North Africa',
    subTitle: 'Algeria, Egypt, Libya, Morocco, Sudan, Tunisia',
    totalEmigrantsMillion: 9.1,
    intraAfricanSharePercent: 10.9,
    extraContinentalSharePercent: 89.1,
    annualRemittancesUSD_B: 46.1,
    destinationShares: [
      {
        destinationRegion: 'Southern & Western Europe',
        migrantCountMillion: 5.2,
        sharePercent: 57.1,
        fillColor: '#2563eb',
      },
      {
        destinationRegion: 'Middle East & GCC',
        migrantCountMillion: 2.4,
        sharePercent: 26.4,
        fillColor: '#d97706',
      },
      {
        destinationRegion: 'Intra-African Corridors',
        migrantCountMillion: 1.0,
        sharePercent: 10.9,
        fillColor: '#0d9488',
      },
      {
        destinationRegion: 'North America',
        migrantCountMillion: 0.4,
        sharePercent: 4.4,
        fillColor: '#7c3aed',
      },
      {
        destinationRegion: 'Other Regions',
        migrantCountMillion: 0.1,
        sharePercent: 1.2,
        fillColor: '#64748b',
      },
    ],
    topHotspots: [
      {
        destination: 'France',
        countryCode: 'FRA',
        flag: '🇫🇷',
        category: 'Europe',
        migrantStockThousands: 3120,
        sharePercent: 34.3,
        primaryDrivers: 'Historical linguistic ties, bilateral accords, higher education & seasonal agriculture',
        dominantOrigins: ['Algeria', 'Morocco', 'Tunisia'],
        keySectors: ['Engineering & Tech', 'Healthcare', 'Construction', 'Commerce'],
      },
      {
        destination: 'Saudi Arabia',
        countryCode: 'SAU',
        flag: '🇸🇦',
        category: 'Middle East / GCC',
        migrantStockThousands: 1380,
        sharePercent: 15.2,
        primaryDrivers: 'Labor mobility agreements, infrastructure engineering, Arabic educational & religious ties',
        dominantOrigins: ['Egypt', 'Sudan'],
        keySectors: ['Civil Engineering', 'Teaching & Academia', 'Healthcare', 'Skilled Trades'],
      },
      {
        destination: 'Spain',
        countryCode: 'ESP',
        flag: '🇪🇸',
        category: 'Europe',
        migrantStockThousands: 1040,
        sharePercent: 11.4,
        primaryDrivers: 'Geographic proximity (Strait of Gibraltar), circular agro-food labor schemes & residency accords',
        dominantOrigins: ['Morocco', 'Algeria'],
        keySectors: ['Intensive Agriculture', 'Logistics', 'Hospitality', 'Small Business'],
      },
      {
        destination: 'Italy',
        countryCode: 'ITA',
        flag: '🇮🇹',
        category: 'Europe',
        migrantStockThousands: 920,
        sharePercent: 10.1,
        primaryDrivers: 'Mediterranean corridor agreements, industrial fabrication & agricultural processing',
        dominantOrigins: ['Morocco', 'Egypt', 'Tunisia'],
        keySectors: ['Manufacturing & Industrial', 'Agro-processing', 'Caregiving'],
      },
      {
        destination: 'United Arab Emirates',
        countryCode: 'ARE',
        flag: '🇦🇪',
        category: 'Middle East / GCC',
        migrantStockThousands: 640,
        sharePercent: 7.0,
        primaryDrivers: 'Commercial finance, real estate construction, media & corporate management',
        dominantOrigins: ['Egypt', 'Sudan', 'Morocco'],
        keySectors: ['Financial Services', 'Hospitality Management', 'Construction', 'Tech'],
      },
      {
        destination: 'Libya & Egypt (Intra-Regional)',
        countryCode: 'LBY',
        flag: '🇱🇾',
        category: 'Intra-African Hub',
        migrantStockThousands: 610,
        sharePercent: 6.7,
        primaryDrivers: 'Cross-border oil-field labor, agricultural trade & humanitarian refuge',
        dominantOrigins: ['Sudan', 'Chad', 'Egypt'],
        keySectors: ['Oil & Gas Services', 'Pastoral Trade', 'Informal Commerce'],
      },
      {
        destination: 'United States & Canada',
        countryCode: 'USA',
        flag: '🇺🇸',
        category: 'North America',
        migrantStockThousands: 440,
        sharePercent: 4.8,
        primaryDrivers: 'Postgraduate admissions, H-1B specialty occupation visas & Diversity Immigrant Visa lottery',
        dominantOrigins: ['Egypt', 'Morocco'],
        keySectors: ['STEM Academia', 'Medicine & Pharmacy', 'Software Engineering'],
      },
      {
        destination: 'Germany',
        countryCode: 'DEU',
        flag: '🇩🇪',
        category: 'Europe',
        migrantStockThousands: 310,
        sharePercent: 3.4,
        primaryDrivers: 'Skilled Immigration Act (Fachkraefteeinwanderungsgesetz) IT & vocational fast-tracks',
        dominantOrigins: ['Morocco', 'Tunisia', 'Egypt'],
        keySectors: ['Automotive Engineering', 'Hospital Nursing', 'Computer Science'],
      },
    ],
    keyPolicyDynamic:
      'North African migration is predominantly extra-continental (89.1%), shaped by proximity to the Mediterranean basin, longstanding bilateral labor conventions with France, Spain, and Italy, and substantial professional flows into the Gulf Cooperation Council (GCC).',
    iomCitation: 'IOM World Migration Report — North Africa Regional Overview & UN DESA Bilateral Migrant Matrix',
  },
  {
    id: 'sub-saharan',
    regionName: 'Sub-Saharan Africa',
    shortName: 'Sub-Saharan',
    subTitle: 'West, East, Southern, and Central African sovereign states',
    totalEmigrantsMillion: 31.3,
    intraAfricanSharePercent: 64.2,
    extraContinentalSharePercent: 35.8,
    annualRemittancesUSD_B: 54.2,
    destinationShares: [
      {
        destinationRegion: 'Intra-African Regional Corridors',
        migrantCountMillion: 20.1,
        sharePercent: 64.2,
        fillColor: '#0d9488',
      },
      {
        destinationRegion: 'Western & Northern Europe',
        migrantCountMillion: 6.0,
        sharePercent: 19.2,
        fillColor: '#2563eb',
      },
      {
        destinationRegion: 'North America',
        migrantCountMillion: 2.7,
        sharePercent: 8.6,
        fillColor: '#7c3aed',
      },
      {
        destinationRegion: 'Middle East & GCC',
        migrantCountMillion: 2.3,
        sharePercent: 7.3,
        fillColor: '#d97706',
      },
      {
        destinationRegion: 'Other Regions',
        migrantCountMillion: 0.2,
        sharePercent: 0.7,
        fillColor: '#64748b',
      },
    ],
    topHotspots: [
      {
        destination: 'South Africa',
        countryCode: 'ZAF',
        flag: '🇿🇦',
        category: 'Intra-African Hub',
        migrantStockThousands: 2860,
        sharePercent: 9.1,
        primaryDrivers: 'SADC industrial hub, regional mining contracts, financial services & higher education',
        dominantOrigins: ['Zimbabwe', 'Mozambique', 'Lesotho', 'Malawi', 'DRC'],
        keySectors: ['Mining & Metallurgy', 'Retail & Services', 'Higher Education', 'Agriculture'],
      },
      {
        destination: "Côte d'Ivoire",
        countryCode: 'CIV',
        flag: '🇨🇮',
        category: 'Intra-African Hub',
        migrantStockThousands: 2560,
        sharePercent: 8.2,
        primaryDrivers: 'ECOWAS Protocol on Free Movement of Persons, cash-crop agro-pastoral economy & urban trade',
        dominantOrigins: ['Burkina Faso', 'Mali', 'Guinea', 'Benin', 'Niger'],
        keySectors: ['Cocoa & Coffee Farming', 'Urban Commerce', 'Construction', 'Transport'],
      },
      {
        destination: 'Uganda',
        countryCode: 'UGA',
        flag: '🇺🇬',
        category: 'Intra-African Hub',
        migrantStockThousands: 1730,
        sharePercent: 5.5,
        primaryDrivers: 'EAC Common Market mobility, progressive open-door refugee land-allocation model',
        dominantOrigins: ['South Sudan', 'DRC', 'Burundi', 'Rwanda', 'Kenya'],
        keySectors: ['Agriculture & Land Tenure', 'Small Enterprises', 'Cross-border Logistics'],
      },
      {
        destination: 'United States',
        countryCode: 'USA',
        flag: '🇺🇸',
        category: 'North America',
        migrantStockThousands: 1650,
        sharePercent: 5.3,
        primaryDrivers: 'Diversity Visa program, university postgraduates, EB-2 National Interest Waivers & tech hiring',
        dominantOrigins: ['Nigeria', 'Ethiopia', 'Ghana', 'Kenya', 'South Africa'],
        keySectors: ['Healthcare & Nursing', 'Information Technology', 'Higher Academia', 'Finance'],
      },
      {
        destination: 'United Kingdom',
        countryCode: 'GBR',
        flag: '🇬🇧',
        category: 'Europe',
        migrantStockThousands: 1420,
        sharePercent: 4.5,
        primaryDrivers: 'Commonwealth historical links, NHS Health and Care Worker Visa & student graduate routes',
        dominantOrigins: ['Nigeria', 'South Africa', 'Ghana', 'Kenya', 'Zimbabwe'],
        keySectors: ['National Health Service (NHS)', 'Social Care', 'Fintech', 'Legal Services'],
      },
      {
        destination: 'France',
        countryCode: 'FRA',
        flag: '🇫🇷',
        category: 'Europe',
        migrantStockThousands: 1380,
        sharePercent: 4.4,
        primaryDrivers: 'Francophone academic exchange, Talent Passport (Passeport Talent) & family reunification',
        dominantOrigins: ['Senegal', 'Cameroon', 'DRC', 'Mali', "Côte d'Ivoire"],
        keySectors: ['Public Healthcare', 'Construction & Trades', 'Digital Technology', 'Hospitality'],
      },
      {
        destination: 'Saudi Arabia & UAE',
        countryCode: 'SAU',
        flag: '🇸🇦',
        category: 'Middle East / GCC',
        migrantStockThousands: 1220,
        sharePercent: 3.9,
        primaryDrivers: 'Bilateral labor agreements (BLAs) for hospitality, security, domestic work & healthcare staffing',
        dominantOrigins: ['Ethiopia', 'Kenya', 'Uganda', 'Ghana', 'Sudan'],
        keySectors: ['Hospitality & Aviation', 'Security Services', 'Domestic Staffing', 'Care Facilities'],
      },
      {
        destination: 'Kenya & Nigeria (Intra-SSA)',
        countryCode: 'KEN',
        flag: '🇰🇪',
        category: 'Intra-African Hub',
        migrantStockThousands: 1180,
        sharePercent: 3.8,
        primaryDrivers: 'Regional corporate hubs (Nairobi Silicon Savannah, Lagos tech corridor) & financial integration',
        dominantOrigins: ['Somalia', 'South Sudan', 'Uganda', 'Benin', 'Togo'],
        keySectors: ['Tech Startups', 'Logistics & Trade', 'Consulting & Banking', 'Commerce'],
      },
    ],
    keyPolicyDynamic:
      'Sub-Saharan Africa displays the highest rate of intra-continental migration globally (64.2%). Over 20.1 million emigrants remain within Regional Economic Communities (RECs) like ECOWAS, EAC, and SADC, driven by border proximity and trade integration.',
    iomCitation: 'IOM World Migration Report — Sub-Saharan African Mobility & Regional Economic Communities',
  },
  {
    id: 'west-africa',
    regionName: 'West Africa',
    shortName: 'West Africa',
    subTitle: 'ECOWAS Member States (15 sovereign nations)',
    totalEmigrantsMillion: 11.8,
    intraAfricanSharePercent: 76.5,
    extraContinentalSharePercent: 23.5,
    annualRemittancesUSD_B: 29.8,
    destinationShares: [
      {
        destinationRegion: 'ECOWAS & Regional Corridors',
        migrantCountMillion: 9.0,
        sharePercent: 76.5,
        fillColor: '#0d9488',
      },
      {
        destinationRegion: 'Europe (France, Italy, Spain, UK)',
        migrantCountMillion: 1.8,
        sharePercent: 15.3,
        fillColor: '#2563eb',
      },
      {
        destinationRegion: 'North America (US & Canada)',
        migrantCountMillion: 0.9,
        sharePercent: 7.6,
        fillColor: '#7c3aed',
      },
      {
        destinationRegion: 'Middle East & Other',
        migrantCountMillion: 0.1,
        sharePercent: 0.6,
        fillColor: '#d97706',
      },
    ],
    topHotspots: [
      {
        destination: "Côte d'Ivoire",
        countryCode: 'CIV',
        flag: '🇨🇮',
        category: 'Intra-African Hub',
        migrantStockThousands: 2560,
        sharePercent: 21.7,
        primaryDrivers: 'ECOWAS freedom of establishment, agricultural plantations & Abidjan commercial hub',
        dominantOrigins: ['Burkina Faso', 'Mali', 'Guinea', 'Niger', 'Benin'],
        keySectors: ['Cocoa Farming', 'Wholesale Trade', 'Construction', 'Agribusiness'],
      },
      {
        destination: 'Nigeria',
        countryCode: 'NGA',
        flag: '🇳🇬',
        category: 'Intra-African Hub',
        migrantStockThousands: 1310,
        sharePercent: 11.1,
        primaryDrivers: 'West African economic powerhouse, Lagos market ecosystem & regional manufacturing',
        dominantOrigins: ['Benin', 'Ghana', 'Niger', 'Togo', 'Cameroon'],
        keySectors: ['Commercial Trading', 'Artisanal Trades', 'Manufacturing', 'Services'],
      },
      {
        destination: 'France',
        countryCode: 'FRA',
        flag: '🇫🇷',
        category: 'Europe',
        migrantStockThousands: 1050,
        sharePercent: 8.9,
        primaryDrivers: 'Post-colonial educational and familial ties, Talent Passport & bilateral accords',
        dominantOrigins: ['Senegal', "Côte d'Ivoire", 'Mali', 'Guinea'],
        keySectors: ['Healthcare & Nursing', 'Information Technology', 'Logistics', 'Public Services'],
      },
      {
        destination: 'United States',
        countryCode: 'USA',
        flag: '🇺🇸',
        category: 'North America',
        migrantStockThousands: 780,
        sharePercent: 6.6,
        primaryDrivers: 'Tertiary education, STEM profession visas & Diversity Visa allocations',
        dominantOrigins: ['Nigeria', 'Ghana', 'Sierra Leone', 'Liberia'],
        keySectors: ['Medicine & Clinical Research', 'Software Engineering', 'Corporate Finance'],
      },
      {
        destination: 'Ghana',
        countryCode: 'GHA',
        flag: '🇬🇭',
        category: 'Intra-African Hub',
        migrantStockThousands: 480,
        sharePercent: 4.1,
        primaryDrivers: 'Political stability, mining, agricultural seasonal migration & Anglophone commerce',
        dominantOrigins: ['Nigeria', 'Togo', 'Burkina Faso', "Côte d'Ivoire"],
        keySectors: ['Retail Commerce', 'Artisanal Gold Mining', 'Hospitality', 'Education'],
      },
      {
        destination: 'Italy & Spain',
        countryCode: 'ITA',
        flag: '🇮🇹',
        category: 'Europe',
        migrantStockThousands: 770,
        sharePercent: 6.5,
        primaryDrivers: 'Southern European agricultural regularizations, logistics warehouses & maritime trade',
        dominantOrigins: ['Senegal', 'Nigeria', 'Gambia', 'Ghana'],
        keySectors: ['Agricultural Harvesting', 'Warehouse Logistics', 'Transport', 'Hospitality'],
      },
      {
        destination: 'United Kingdom',
        countryCode: 'GBR',
        flag: '🇬🇧',
        category: 'Europe',
        migrantStockThousands: 320,
        sharePercent: 2.7,
        primaryDrivers: 'NHS recruitment drives, university postgraduate programs & family connections',
        dominantOrigins: ['Nigeria', 'Ghana', 'Sierra Leone', 'Gambia'],
        keySectors: ['NHS Nursing & Medicine', 'Social Work', 'Accounting & Financial Tech'],
      },
    ],
    keyPolicyDynamic:
      'The 1979 ECOWAS Protocol on Free Movement of Persons guarantees 90-day visa-free travel and right of residence across all 15 West African states, making West Africa the most integrated migration zone on the continent.',
    iomCitation: 'IOM World Migration Report — ECOWAS Free Movement Protocols & Intra-Regional Labour Mobility',
  },
  {
    id: 'east-africa',
    regionName: 'East Africa & Horn',
    shortName: 'East Africa',
    subTitle: 'EAC and IGAD Member States (Kenya, Uganda, Ethiopia, etc.)',
    totalEmigrantsMillion: 9.6,
    intraAfricanSharePercent: 67.2,
    extraContinentalSharePercent: 32.8,
    annualRemittancesUSD_B: 12.4,
    destinationShares: [
      {
        destinationRegion: 'EAC & Horn Regional Corridors',
        migrantCountMillion: 6.5,
        sharePercent: 67.2,
        fillColor: '#0d9488',
      },
      {
        destinationRegion: 'Middle East & Gulf States',
        migrantCountMillion: 1.8,
        sharePercent: 18.8,
        fillColor: '#d97706',
      },
      {
        destinationRegion: 'North America (US & Canada)',
        migrantCountMillion: 0.8,
        sharePercent: 8.3,
        fillColor: '#7c3aed',
      },
      {
        destinationRegion: 'Europe (UK, Germany, Sweden)',
        migrantCountMillion: 0.5,
        sharePercent: 5.7,
        fillColor: '#2563eb',
      },
    ],
    topHotspots: [
      {
        destination: 'Uganda',
        countryCode: 'UGA',
        flag: '🇺🇬',
        category: 'Intra-African Hub',
        migrantStockThousands: 1730,
        sharePercent: 18.0,
        primaryDrivers: 'Progressive refugee settlement policy with right to work and free plots of farmland',
        dominantOrigins: ['South Sudan', 'DRC', 'Burundi', 'Rwanda', 'Somalia'],
        keySectors: ['Subsistence & Cash Crop Farming', 'Informal Trading', 'Services'],
      },
      {
        destination: 'Saudi Arabia',
        countryCode: 'SAU',
        flag: '🇸🇦',
        category: 'Middle East / GCC',
        migrantStockThousands: 1100,
        sharePercent: 11.5,
        primaryDrivers: 'Eastern Migration Route via Djibouti/Yemen into Gulf labor markets & bilateral agreements',
        dominantOrigins: ['Ethiopia', 'Kenya', 'Uganda', 'Somalia'],
        keySectors: ['Domestic Support', 'Construction', 'Security Services', 'Agriculture'],
      },
      {
        destination: 'Kenya',
        countryCode: 'KEN',
        flag: '🇰🇪',
        category: 'Intra-African Hub',
        migrantStockThousands: 1050,
        sharePercent: 10.9,
        primaryDrivers: 'Nairobi commercial & fintech capital, Eastleigh trade hub, Kakuma & Dadaab refugee complexes',
        dominantOrigins: ['Somalia', 'South Sudan', 'DRC', 'Ethiopia', 'Uganda'],
        keySectors: ['Wholesale & Retail Commerce', 'NGO & Development Operations', 'Fintech'],
      },
      {
        destination: 'Ethiopia',
        countryCode: 'ETH',
        flag: '🇪🇹',
        category: 'Intra-African Hub',
        migrantStockThousands: 980,
        sharePercent: 10.2,
        primaryDrivers: 'African Union diplomatic capital, regional refuge and transport transit link',
        dominantOrigins: ['South Sudan', 'Somalia', 'Eritrea', 'Sudan'],
        keySectors: ['Cross-border Trade', 'Transport Logistics', 'Public Administration'],
      },
      {
        destination: 'United States',
        countryCode: 'USA',
        flag: '🇺🇸',
        category: 'North America',
        migrantStockThousands: 620,
        sharePercent: 6.5,
        primaryDrivers: 'Refugee resettlement programs, academic postgraduates & technology sector recruitment',
        dominantOrigins: ['Ethiopia', 'Kenya', 'Somalia', 'Uganda'],
        keySectors: ['Health Sciences', 'Information Systems', 'Public Transit', 'Academia'],
      },
      {
        destination: 'United Arab Emirates & Qatar',
        countryCode: 'ARE',
        flag: '🇦🇪',
        category: 'Middle East / GCC',
        migrantStockThousands: 580,
        sharePercent: 6.0,
        primaryDrivers: 'Bilateral hospitality and aviation recruitment agreements across East African capitals',
        dominantOrigins: ['Kenya', 'Uganda', 'Ethiopia', 'Rwanda'],
        keySectors: ['Aviation & Airport Staffing', 'Security Contracting', 'Hotel Management'],
      },
      {
        destination: 'United Kingdom',
        countryCode: 'GBR',
        flag: '🇬🇧',
        category: 'Europe',
        migrantStockThousands: 380,
        sharePercent: 4.0,
        primaryDrivers: 'Historic colonial ties, NHS medical staff agreements & higher education',
        dominantOrigins: ['Kenya', 'Uganda', 'Somalia', 'Zimbabwe'],
        keySectors: ['NHS Nursing', 'Accountancy', 'Higher Education Research'],
      },
    ],
    keyPolicyDynamic:
      'The EAC Common Market Protocol promotes free movement of labor, while the "Eastern Route" funneling over 250,000 migrants annually through Djibouti and Yemen to the Arabian Peninsula represents one of the world\'s busiest and most hazardous migration routes.',
    iomCitation: 'IOM Eastern Route Surveillance & EAC Common Market Labour Mobility Audits',
  },
  {
    id: 'southern-africa',
    regionName: 'Southern Africa',
    shortName: 'Southern Africa',
    subTitle: 'SADC Member States (16 nations centered around South Africa)',
    totalEmigrantsMillion: 5.4,
    intraAfricanSharePercent: 68.5,
    extraContinentalSharePercent: 31.5,
    annualRemittancesUSD_B: 6.8,
    destinationShares: [
      {
        destinationRegion: 'SADC Corridors (Primarily South Africa)',
        migrantCountMillion: 3.7,
        sharePercent: 68.5,
        fillColor: '#0d9488',
      },
      {
        destinationRegion: 'United Kingdom',
        migrantCountMillion: 0.6,
        sharePercent: 11.1,
        fillColor: '#2563eb',
      },
      {
        destinationRegion: 'Oceania (Australia & New Zealand)',
        migrantCountMillion: 0.4,
        sharePercent: 7.4,
        fillColor: '#059669',
      },
      {
        destinationRegion: 'North America (US & Canada)',
        migrantCountMillion: 0.4,
        sharePercent: 7.4,
        fillColor: '#7c3aed',
      },
      {
        destinationRegion: 'Other Regions',
        migrantCountMillion: 0.3,
        sharePercent: 5.6,
        fillColor: '#64748b',
      },
    ],
    topHotspots: [
      {
        destination: 'South Africa',
        countryCode: 'ZAF',
        flag: '🇿🇦',
        category: 'Intra-African Hub',
        migrantStockThousands: 2860,
        sharePercent: 53.0,
        primaryDrivers: 'Dominant regional magnet for mining, agricultural concessions, corporate finance & academics',
        dominantOrigins: ['Zimbabwe', 'Mozambique', 'Lesotho', 'Malawi', 'Eswatini'],
        keySectors: ['Mining Extraction', 'Agriculture', 'Urban Retail & Services', 'Universities'],
      },
      {
        destination: 'United Kingdom',
        countryCode: 'GBR',
        flag: '🇬🇧',
        category: 'Europe',
        migrantStockThousands: 540,
        sharePercent: 10.0,
        primaryDrivers: 'Ancestry visas, Youth Mobility Schemes, corporate transfers & medical worker fast-tracks',
        dominantOrigins: ['South Africa', 'Zimbabwe', 'Zambia'],
        keySectors: ['Financial Services', 'Legal & Auditing', 'NHS Healthcare', 'Engineering'],
      },
      {
        destination: 'Australia & New Zealand',
        countryCode: 'AUS',
        flag: '🇦🇺',
        category: 'Other',
        migrantStockThousands: 360,
        sharePercent: 6.7,
        primaryDrivers: 'Points-based skilled migrant streams, mining engineering & medical doctor recruitments',
        dominantOrigins: ['South Africa', 'Zimbabwe'],
        keySectors: ['Mining Geology', 'General Medical Practice', 'Education', 'IT Architecture'],
      },
      {
        destination: 'Mozambique & Botswana (Intra-SADC)',
        countryCode: 'BWA',
        flag: '🇧🇼',
        category: 'Intra-African Hub',
        migrantStockThousands: 320,
        sharePercent: 5.9,
        primaryDrivers: 'Diamond mining, cross-border agro-logistics & Southern African transport corridors',
        dominantOrigins: ['Zimbabwe', 'South Africa', 'Zambia'],
        keySectors: ['Diamond Mining & Sorting', 'Cross-border Haulage', 'Public Infrastructure'],
      },
      {
        destination: 'United States',
        countryCode: 'USA',
        flag: '🇺🇸',
        category: 'North America',
        migrantStockThousands: 220,
        sharePercent: 4.1,
        primaryDrivers: 'Executive business visas (L-1/H-1B), tech venture capital & specialized university researchers',
        dominantOrigins: ['South Africa', 'Zimbabwe'],
        keySectors: ['Software Engineering', 'Biotechnology', 'Investment Banking'],
      },
    ],
    keyPolicyDynamic:
      'Southern African migration is uniquely unipolar: South Africa hosts more than half (53%) of all migrants in the region, operating historical bilateral labor treaties with neighboring states while managing Zimbabwe Exemption Permits (ZEP).',
    iomCitation: 'IOM SADC Migration Dynamics & South African Department of Home Affairs Statistical Bulletins',
  },
  {
    id: 'central-africa',
    regionName: 'Central Africa',
    shortName: 'Central Africa',
    subTitle: 'ECCAS Member States (Cameroon, DRC, Gabon, Chad, Congo, etc.)',
    totalEmigrantsMillion: 4.5,
    intraAfricanSharePercent: 58.0,
    extraContinentalSharePercent: 42.0,
    annualRemittancesUSD_B: 5.2,
    destinationShares: [
      {
        destinationRegion: 'ECCAS Regional Corridors',
        migrantCountMillion: 2.6,
        sharePercent: 58.0,
        fillColor: '#0d9488',
      },
      {
        destinationRegion: 'Europe (France & Belgium)',
        migrantCountMillion: 1.2,
        sharePercent: 26.7,
        fillColor: '#2563eb',
      },
      {
        destinationRegion: 'North America (US & Canada)',
        migrantCountMillion: 0.4,
        sharePercent: 8.9,
        fillColor: '#7c3aed',
      },
      {
        destinationRegion: 'Other Regions',
        migrantCountMillion: 0.3,
        sharePercent: 6.4,
        fillColor: '#64748b',
      },
    ],
    topHotspots: [
      {
        destination: 'France',
        countryCode: 'FRA',
        flag: '🇫🇷',
        category: 'Europe',
        migrantStockThousands: 650,
        sharePercent: 14.4,
        primaryDrivers: 'Francophone academic pipelines, bilateral residence agreements & healthcare recruitment',
        dominantOrigins: ['Cameroon', 'DRC', 'Republic of Congo', 'Gabon'],
        keySectors: ['Public Medicine', 'Higher Education', 'Information Systems', 'Logistics'],
      },
      {
        destination: 'Cameroon',
        countryCode: 'CMR',
        flag: '🇨🇲',
        category: 'Intra-African Hub',
        migrantStockThousands: 520,
        sharePercent: 11.6,
        primaryDrivers: 'Central African logistics gateway (Douala Port), agricultural plantations & tertiary universities',
        dominantOrigins: ['Chad', 'Central African Republic', 'Nigeria', 'Equatorial Guinea'],
        keySectors: ['Port Haulage & Logistics', 'Timber & Rubber Processing', 'Cross-border Trade'],
      },
      {
        destination: 'DRC (Democratic Republic of Congo)',
        countryCode: 'COD',
        flag: '🇨🇩',
        category: 'Intra-African Hub',
        migrantStockThousands: 480,
        sharePercent: 10.7,
        primaryDrivers: 'Mining supply chains (Katanga copperbelt), Kinshasa river commerce & regional refuge',
        dominantOrigins: ['Rwanda', 'Burundi', 'Central African Republic', 'Republic of Congo'],
        keySectors: ['Artisanal & Industrial Mining', 'River Transport', 'Commerce'],
      },
      {
        destination: 'Chad & Republic of Congo',
        countryCode: 'TCD',
        flag: '🇹🇩',
        category: 'Intra-African Hub',
        migrantStockThousands: 450,
        sharePercent: 10.0,
        primaryDrivers: 'Sudanese and CAR humanitarian refugee corridors & Lake Chad basin pastoral links',
        dominantOrigins: ['Sudan', 'Central African Republic', 'Cameroon'],
        keySectors: ['Pastoral Agriculture', 'Aid Logistics', 'Informal Trade'],
      },
      {
        destination: 'Belgium',
        countryCode: 'BEL',
        flag: '🇧🇪',
        category: 'Europe',
        migrantStockThousands: 220,
        sharePercent: 4.9,
        primaryDrivers: 'Historic institutional accords with DRC, Rwanda, Burundi, university scholarships & professional careers',
        dominantOrigins: ['DRC', 'Rwanda', 'Burundi'],
        keySectors: ['Healthcare Services', 'Higher Academia', 'Civil Administration', 'IT'],
      },
      {
        destination: 'Gabon & Equatorial Guinea',
        countryCode: 'GAB',
        flag: '🇬🇦',
        category: 'Intra-African Hub',
        migrantStockThousands: 210,
        sharePercent: 4.7,
        primaryDrivers: 'High per-capita oil wealth, commercial service industries & construction infrastructure',
        dominantOrigins: ['Cameroon', 'Mali', 'Senegal', 'Benin', 'Nigeria'],
        keySectors: ['Offshore Oil & Services', 'Civil Construction', 'Urban Retailing'],
      },
      {
        destination: 'United States & Canada',
        countryCode: 'USA',
        flag: '🇺🇸',
        category: 'North America',
        migrantStockThousands: 190,
        sharePercent: 4.2,
        primaryDrivers: 'Diversity Visa program, bilingual Francophone skilled labor streams to Quebec & tech work',
        dominantOrigins: ['Cameroon', 'DRC'],
        keySectors: ['Engineering', 'Healthcare Nursing', 'Education'],
      },
    ],
    keyPolicyDynamic:
      'Central African migration features significant displacement from protracted conflicts, alongside elite professional migration to France and Belgium, with Gabon and Cameroon serving as regional economic magnets.',
    iomCitation: 'IOM Central Africa Regional Migration Data & CEMAC Free Movement Harmonization Reports',
  },
];

export interface MacroRegionalComparison {
  destinationCategory: string;
  northAfricaMigrantsM: number;
  northAfricaSharePercent: number;
  subSaharanMigrantsM: number;
  subSaharanSharePercent: number;
  contrastInsight: string;
}

export const MACRO_REGIONAL_COMPARISON: MacroRegionalComparison[] = [
  {
    destinationCategory: 'Intra-African (Within Continent)',
    northAfricaMigrantsM: 1.0,
    northAfricaSharePercent: 10.9,
    subSaharanMigrantsM: 20.1,
    subSaharanSharePercent: 64.2,
    contrastInsight:
      'Massive contrast: 64.2% of Sub-Saharan emigrants stay on the continent, vs only 10.9% for North Africa, showing the power of ECOWAS and SADC regional labor freedom.',
  },
  {
    destinationCategory: 'Europe',
    northAfricaMigrantsM: 5.2,
    northAfricaSharePercent: 57.1,
    subSaharanMigrantsM: 6.0,
    subSaharanSharePercent: 19.2,
    contrastInsight:
      'North Africa is deeply oriented toward Southern and Western Europe due to Mediterranean proximity and post-colonial ties; over 57% of North African emigrants reside in Europe.',
  },
  {
    destinationCategory: 'Middle East & GCC',
    northAfricaMigrantsM: 2.4,
    northAfricaSharePercent: 26.4,
    subSaharanMigrantsM: 2.3,
    subSaharanSharePercent: 7.3,
    contrastInsight:
      'Arabic linguistic and cultural alignment drives over a quarter of North African emigrants (mostly Egyptians & Sudanese) to the Gulf, compared to 7.3% for Sub-Saharan Africa.',
  },
  {
    destinationCategory: 'North America',
    northAfricaMigrantsM: 0.4,
    northAfricaSharePercent: 4.4,
    subSaharanMigrantsM: 2.7,
    subSaharanSharePercent: 8.6,
    contrastInsight:
      'Sub-Saharan Africa sends more than double the proportion of emigrants to the US and Canada (8.6% vs 4.4%), driven by English language affinity, Diversity Visas, and high-skilled STEM channels.',
  },
  {
    destinationCategory: 'Other Regions (Asia-Pacific, Latin America)',
    northAfricaMigrantsM: 0.1,
    northAfricaSharePercent: 1.2,
    subSaharanMigrantsM: 0.2,
    subSaharanSharePercent: 0.7,
    contrastInsight:
      'Both regions have minimal stock in Asia-Pacific and Latin America, though commercial hubs like Guangzhou (China) and Australian skilled streams attract thousands.',
  },
];


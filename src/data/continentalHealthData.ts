// Continental and Global Fertility Comparison Data (World Bank WDI & UN World Population Prospects)
// World Bank Indicator: SP.DYN.TFRT.IN
// UN WPP Projections (Medium Variant) for 2030, 2040, 2050, 2075, 2100

export interface ContinentalHistoricalPoint {
  year: number;
  subSaharanAfrica: number;
  allAfrica: number;
  northAfricaMiddleEast: number;
  europeCentralAsia: number;
  europeanUnion: number;
  northAmerica: number;
  latinAmericaCaribbean: number;
  eastAsiaPacific: number;
  southAsia: number;
  world: number;
  replacementRate: number;
}

export interface ContinentalProfile {
  id: string;
  name: string;
  shortCode: string;
  color: string;
  latestFertilityRate: number; // 2024
  rate2000: number;
  rate1990: number;
  netChange1990to2024: number;
  medianAge2024: number;
  population2024Billion: number;
  population2050Billion: number;
  population2100Billion: number;
  fertility2050Forecast: number;
  fertility2100Forecast: number;
  demographicStatus: 'High Youth Demographic' | 'Below Replacement' | 'Severe Aging Contraction' | 'Transitioning Stabilizer';
  strategicInsight: string;
}

export interface ForecastMilestonePoint {
  year: number;
  isHistorical: boolean;
  subSaharanAfrica: number;
  allAfrica: number;
  europe: number;
  northAmerica: number;
  latinAmerica: number;
  eastAsia: number;
  southAsia: number;
  world: number;
  replacementRate: number;
}

export interface PopulationShareMilestone {
  year: number;
  label: string;
  isProjected: boolean;
  africaSharePercent: number;
  africaPopBillion: number;
  asiaSharePercent: number;
  asiaPopBillion: number;
  europeSharePercent: number;
  europePopBillion: number;
  latinAmericaSharePercent: number;
  latinAmericaPopBillion: number;
  northAmericaSharePercent: number;
  northAmericaPopBillion: number;
  worldTotalBillion: number;
  africaWorkingAgeSharePercent: number; // Share of world 15-64
  africaYouthSharePercent: number; // Share of world 15-24
}

// 1. Historical Continental Time-Series (1990 - 2024) based on verified World Bank data
export const CONTINENTAL_HISTORICAL_DATA: ContinentalHistoricalPoint[] = [
  {
    year: 1990,
    subSaharanAfrica: 6.30,
    allAfrica: 6.12,
    northAfricaMiddleEast: 5.42,
    europeCentralAsia: 1.97,
    europeanUnion: 1.64,
    northAmerica: 2.06,
    latinAmericaCaribbean: 3.25,
    eastAsiaPacific: 2.60,
    southAsia: 4.09,
    world: 3.31,
    replacementRate: 2.10,
  },
  {
    year: 1995,
    subSaharanAfrica: 6.02,
    allAfrica: 5.81,
    northAfricaMiddleEast: 4.62,
    europeCentralAsia: 1.68,
    europeanUnion: 1.48,
    northAmerica: 1.99,
    latinAmericaCaribbean: 2.91,
    eastAsiaPacific: 2.15,
    southAsia: 3.68,
    world: 2.98,
    replacementRate: 2.10,
  },
  {
    year: 2000,
    subSaharanAfrica: 5.74,
    allAfrica: 5.51,
    northAfricaMiddleEast: 4.01,
    europeCentralAsia: 1.56,
    europeanUnion: 1.44,
    northAmerica: 2.00,
    latinAmericaCaribbean: 2.61,
    eastAsiaPacific: 1.87,
    southAsia: 3.33,
    world: 2.73,
    replacementRate: 2.10,
  },
  {
    year: 2005,
    subSaharanAfrica: 5.52,
    allAfrica: 5.28,
    northAfricaMiddleEast: 3.52,
    europeCentralAsia: 1.61,
    europeanUnion: 1.51,
    northAmerica: 2.01,
    latinAmericaCaribbean: 2.36,
    eastAsiaPacific: 1.81,
    southAsia: 2.97,
    world: 2.62,
    replacementRate: 2.10,
  },
  {
    year: 2010,
    subSaharanAfrica: 5.32,
    allAfrica: 5.06,
    northAfricaMiddleEast: 3.38,
    europeCentralAsia: 1.69,
    europeanUnion: 1.57,
    northAmerica: 1.93,
    latinAmericaCaribbean: 2.15,
    eastAsiaPacific: 1.78,
    southAsia: 2.62,
    world: 2.57,
    replacementRate: 2.10,
  },
  {
    year: 2015,
    subSaharanAfrica: 4.88,
    allAfrica: 4.64,
    northAfricaMiddleEast: 3.31,
    europeCentralAsia: 1.71,
    europeanUnion: 1.54,
    northAmerica: 1.82,
    latinAmericaCaribbean: 1.99,
    eastAsiaPacific: 1.69,
    southAsia: 2.31,
    world: 2.45,
    replacementRate: 2.10,
  },
  {
    year: 2018,
    subSaharanAfrica: 4.67,
    allAfrica: 4.41,
    northAfricaMiddleEast: 3.20,
    europeCentralAsia: 1.66,
    europeanUnion: 1.52,
    northAmerica: 1.71,
    latinAmericaCaribbean: 1.91,
    eastAsiaPacific: 1.58,
    southAsia: 2.18,
    world: 2.36,
    replacementRate: 2.10,
  },
  {
    year: 2020,
    subSaharanAfrica: 4.53,
    allAfrica: 4.28,
    northAfricaMiddleEast: 3.12,
    europeCentralAsia: 1.67,
    europeanUnion: 1.50,
    northAmerica: 1.62,
    latinAmericaCaribbean: 1.86,
    eastAsiaPacific: 1.50,
    southAsia: 2.06,
    world: 2.28,
    replacementRate: 2.10,
  },
  {
    year: 2021,
    subSaharanAfrica: 4.44,
    allAfrica: 4.19,
    northAfricaMiddleEast: 3.07,
    europeCentralAsia: 1.64,
    europeanUnion: 1.48,
    northAmerica: 1.65,
    latinAmericaCaribbean: 1.83,
    eastAsiaPacific: 1.44,
    southAsia: 2.03,
    world: 2.24,
    replacementRate: 2.10,
  },
  {
    year: 2022,
    subSaharanAfrica: 4.38,
    allAfrica: 4.13,
    northAfricaMiddleEast: 3.03,
    europeCentralAsia: 1.59,
    europeanUnion: 1.42,
    northAmerica: 1.64,
    latinAmericaCaribbean: 1.81,
    eastAsiaPacific: 1.39,
    southAsia: 2.00,
    world: 2.22,
    replacementRate: 2.10,
  },
  {
    year: 2023,
    subSaharanAfrica: 4.31,
    allAfrica: 4.07,
    northAfricaMiddleEast: 3.00,
    europeCentralAsia: 1.56,
    europeanUnion: 1.37,
    northAmerica: 1.61,
    latinAmericaCaribbean: 1.80,
    eastAsiaPacific: 1.36,
    southAsia: 1.99,
    world: 2.20,
    replacementRate: 2.10,
  },
  {
    year: 2024,
    subSaharanAfrica: 4.26,
    allAfrica: 4.01,
    northAfricaMiddleEast: 2.98,
    europeCentralAsia: 1.55,
    europeanUnion: 1.34,
    northAmerica: 1.59,
    latinAmericaCaribbean: 1.79,
    eastAsiaPacific: 1.34,
    southAsia: 1.98,
    world: 2.19,
    replacementRate: 2.10,
  },
];

// 2. Comprehensive Continental Profiles (2024 vs 2050 vs 2100)
export const CONTINENTAL_PROFILES: ContinentalProfile[] = [
  {
    id: 'africa',
    name: 'Africa (Entire Continent)',
    shortCode: 'AFR',
    color: '#059669', // Emerald
    latestFertilityRate: 4.01,
    rate2000: 5.51,
    rate1990: 6.12,
    netChange1990to2024: -2.11,
    medianAge2024: 19.2,
    population2024Billion: 1.46,
    population2050Billion: 2.49,
    population2100Billion: 3.92,
    fertility2050Forecast: 2.65,
    fertility2100Forecast: 1.98,
    demographicStatus: 'High Youth Demographic',
    strategicInsight: 'The sole global continent with fertility well above replacement (2.10). By 2050, Africa will represent over 50% of global net workforce growth and 25.7% of total world population.',
  },
  {
    id: 'sub_saharan_africa',
    name: 'Sub-Saharan Africa',
    shortCode: 'SSF',
    color: '#0d9488', // Teal
    latestFertilityRate: 4.26,
    rate2000: 5.74,
    rate1990: 6.30,
    netChange1990to2024: -2.04,
    medianAge2024: 18.7,
    population2024Billion: 1.21,
    population2050Billion: 2.15,
    population2100Billion: 3.48,
    fertility2050Forecast: 2.81,
    fertility2100Forecast: 1.96,
    demographicStatus: 'High Youth Demographic',
    strategicInsight: 'Core demographic growth engine of the planet. Experiencing an orderly fertility transition from 6.30 in 1990 to 4.26 today, with working-age cohort set to double from 700M to 1.4B by 2050.',
  },
  {
    id: 'europe',
    name: 'Europe (inc. EU)',
    shortCode: 'EUR',
    color: '#3b82f6', // Blue
    latestFertilityRate: 1.55,
    rate2000: 1.56,
    rate1990: 1.97,
    netChange1990to2024: -0.42,
    medianAge2024: 43.1,
    population2024Billion: 0.74,
    population2050Billion: 0.70,
    population2100Billion: 0.59,
    fertility2050Forecast: 1.50,
    fertility2100Forecast: 1.58,
    demographicStatus: 'Severe Aging Contraction',
    strategicInsight: 'Entrenched in ultra-low fertility with the European Union at 1.34 births/woman. Working-age population shrinking by ~1.5M/year; heavily reliant on African and migrant labor to sustain healthcare and pension systems.',
  },
  {
    id: 'east_asia_pacific',
    name: 'East Asia & Pacific',
    shortCode: 'EAS',
    color: '#ef4444', // Red / Rose
    latestFertilityRate: 1.34,
    rate2000: 1.87,
    rate1990: 2.60,
    netChange1990to2024: -1.26,
    medianAge2024: 39.8,
    population2024Billion: 2.37,
    population2050Billion: 2.21,
    population2100Billion: 1.58,
    fertility2050Forecast: 1.28,
    fertility2100Forecast: 1.45,
    demographicStatus: 'Severe Aging Contraction',
    strategicInsight: 'Fastest demographic contraction in human history. China, South Korea (0.72), and Japan face rapid population peaking. China alone is projected to lose over 500 million people by 2100.',
  },
  {
    id: 'north_america',
    name: 'North America (US & CAN)',
    shortCode: 'NAC',
    color: '#8b5cf6', // Purple
    latestFertilityRate: 1.59,
    rate2000: 2.00,
    rate1990: 2.06,
    netChange1990to2024: -0.47,
    medianAge2024: 38.6,
    population2024Billion: 0.38,
    population2050Billion: 0.43,
    population2100Billion: 0.45,
    fertility2050Forecast: 1.65,
    fertility2100Forecast: 1.70,
    demographicStatus: 'Below Replacement',
    strategicInsight: 'Domestic fertility has dropped well below 2.10, but total population growth is sustained primarily through positive net international immigration, with rising African diaspora influx.',
  },
  {
    id: 'latin_america',
    name: 'Latin America & Caribbean',
    shortCode: 'LAC',
    color: '#f59e0b', // Amber
    latestFertilityRate: 1.79,
    rate2000: 2.61,
    rate1990: 3.25,
    netChange1990to2024: -1.46,
    medianAge2024: 32.4,
    population2024Billion: 0.66,
    population2050Billion: 0.74,
    population2100Billion: 0.65,
    fertility2050Forecast: 1.62,
    fertility2100Forecast: 1.65,
    demographicStatus: 'Below Replacement',
    strategicInsight: 'Fell below replacement rate in the late 2010s. The demographic window has peaked and will close by 2040, after which Latin American populations begin absolute contraction.',
  },
  {
    id: 'south_asia',
    name: 'South Asia (IND, PAK, BGD)',
    shortCode: 'SAS',
    color: '#d97706', // Warm Brown / Amber
    latestFertilityRate: 1.98,
    rate2000: 3.33,
    rate1990: 4.09,
    netChange1990to2024: -2.11,
    medianAge2024: 28.5,
    population2024Billion: 1.95,
    population2050Billion: 2.31,
    population2100Billion: 2.14,
    fertility2050Forecast: 1.72,
    fertility2100Forecast: 1.65,
    demographicStatus: 'Below Replacement',
    strategicInsight: 'India and South Asia crossed below the 2.10 threshold in 2022. Population will peak around 2060 at ~2.3B before entering gradual decline.',
  },
];

// 3. Extended Timeline & Projections (1990 -> 2100)
export const EXTENDED_FORECAST_TIMELINE: ForecastMilestonePoint[] = [
  {
    year: 1990,
    isHistorical: true,
    subSaharanAfrica: 6.30,
    allAfrica: 6.12,
    europe: 1.97,
    northAmerica: 2.06,
    latinAmerica: 3.25,
    eastAsia: 2.60,
    southAsia: 4.09,
    world: 3.31,
    replacementRate: 2.10,
  },
  {
    year: 2000,
    isHistorical: true,
    subSaharanAfrica: 5.74,
    allAfrica: 5.51,
    europe: 1.56,
    northAmerica: 2.00,
    latinAmerica: 2.61,
    eastAsia: 1.87,
    southAsia: 3.33,
    world: 2.73,
    replacementRate: 2.10,
  },
  {
    year: 2010,
    isHistorical: true,
    subSaharanAfrica: 5.32,
    allAfrica: 5.06,
    europe: 1.69,
    northAmerica: 1.93,
    latinAmerica: 2.15,
    eastAsia: 1.78,
    southAsia: 2.62,
    world: 2.57,
    replacementRate: 2.10,
  },
  {
    year: 2024,
    isHistorical: true,
    subSaharanAfrica: 4.26,
    allAfrica: 4.01,
    europe: 1.55,
    northAmerica: 1.59,
    latinAmerica: 1.79,
    eastAsia: 1.34,
    southAsia: 1.98,
    world: 2.19,
    replacementRate: 2.10,
  },
  {
    year: 2030,
    isHistorical: false,
    subSaharanAfrica: 3.82,
    allAfrica: 3.58,
    europe: 1.53,
    northAmerica: 1.61,
    latinAmerica: 1.74,
    eastAsia: 1.31,
    southAsia: 1.90,
    world: 2.14,
    replacementRate: 2.10,
  },
  {
    year: 2040,
    isHistorical: false,
    subSaharanAfrica: 3.25,
    allAfrica: 3.05,
    europe: 1.51,
    northAmerica: 1.63,
    latinAmerica: 1.68,
    eastAsia: 1.30,
    southAsia: 1.80,
    world: 2.09,
    replacementRate: 2.10,
  },
  {
    year: 2050,
    isHistorical: false,
    subSaharanAfrica: 2.81,
    allAfrica: 2.65,
    europe: 1.50,
    northAmerica: 1.65,
    latinAmerica: 1.62,
    eastAsia: 1.28,
    southAsia: 1.72,
    world: 2.05,
    replacementRate: 2.10,
  },
  {
    year: 2075,
    isHistorical: false,
    subSaharanAfrica: 2.32,
    allAfrica: 2.21,
    europe: 1.54,
    northAmerica: 1.68,
    latinAmerica: 1.64,
    eastAsia: 1.36,
    southAsia: 1.68,
    world: 1.92,
    replacementRate: 2.10,
  },
  {
    year: 2100,
    isHistorical: false,
    subSaharanAfrica: 1.96,
    allAfrica: 1.98,
    europe: 1.58,
    northAmerica: 1.70,
    latinAmerica: 1.65,
    eastAsia: 1.45,
    southAsia: 1.65,
    world: 1.84,
    replacementRate: 2.10,
  },
];

// 4. Global Population & Youth Demographic Share Projections (1950 - 2100)
export const POPULATION_SHARE_PROJECTIONS: PopulationShareMilestone[] = [
  {
    year: 1950,
    label: '1950 Baseline',
    isProjected: false,
    africaSharePercent: 9.0,
    africaPopBillion: 0.23,
    asiaSharePercent: 55.4,
    asiaPopBillion: 1.40,
    europeSharePercent: 21.7,
    europePopBillion: 0.55,
    latinAmericaSharePercent: 6.6,
    latinAmericaPopBillion: 0.17,
    northAmericaSharePercent: 6.8,
    northAmericaPopBillion: 0.17,
    worldTotalBillion: 2.53,
    africaWorkingAgeSharePercent: 8.5,
    africaYouthSharePercent: 9.2,
  },
  {
    year: 2000,
    label: '2000 Turn of Century',
    isProjected: false,
    africaSharePercent: 13.3,
    africaPopBillion: 0.81,
    asiaSharePercent: 60.5,
    asiaPopBillion: 3.71,
    europeSharePercent: 11.9,
    europePopBillion: 0.73,
    latinAmericaSharePercent: 8.5,
    latinAmericaPopBillion: 0.52,
    northAmericaSharePercent: 5.1,
    northAmericaPopBillion: 0.31,
    worldTotalBillion: 6.14,
    africaWorkingAgeSharePercent: 11.2,
    africaYouthSharePercent: 15.1,
  },
  {
    year: 2024,
    label: '2024 Present Day',
    isProjected: false,
    africaSharePercent: 18.1,
    africaPopBillion: 1.46,
    asiaSharePercent: 59.3,
    asiaPopBillion: 4.78,
    europeSharePercent: 9.2,
    europePopBillion: 0.74,
    latinAmericaSharePercent: 8.2,
    latinAmericaPopBillion: 0.66,
    northAmericaSharePercent: 4.7,
    northAmericaPopBillion: 0.38,
    worldTotalBillion: 8.08,
    africaWorkingAgeSharePercent: 16.4,
    africaYouthSharePercent: 22.8,
  },
  {
    year: 2050,
    label: '2050 UN Projection',
    isProjected: true,
    africaSharePercent: 25.7,
    africaPopBillion: 2.49,
    asiaSharePercent: 54.5,
    asiaPopBillion: 5.29,
    europeSharePercent: 7.2,
    europePopBillion: 0.70,
    latinAmericaSharePercent: 7.6,
    latinAmericaPopBillion: 0.74,
    northAmericaSharePercent: 4.4,
    northAmericaPopBillion: 0.43,
    worldTotalBillion: 9.71,
    africaWorkingAgeSharePercent: 26.2,
    africaYouthSharePercent: 36.4,
  },
  {
    year: 2100,
    label: '2100 Century Horizon',
    isProjected: true,
    africaSharePercent: 38.2,
    africaPopBillion: 3.92,
    asiaSharePercent: 45.9,
    asiaPopBillion: 4.71,
    europeSharePercent: 5.7,
    europePopBillion: 0.59,
    latinAmericaSharePercent: 6.3,
    latinAmericaPopBillion: 0.65,
    northAmericaSharePercent: 4.4,
    northAmericaPopBillion: 0.45,
    worldTotalBillion: 10.28,
    africaWorkingAgeSharePercent: 39.1,
    africaYouthSharePercent: 47.9,
  },
];

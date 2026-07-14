export interface Country {
  id: string;
  name: string;
  region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern';
  gdp: number; // in billions USD
  population: number; // in millions
  unemployment: number; // percentage
  debtToGdp: number; // percentage
  budget: number; // in billions USD
  highlight: string;
  growthRate: number; // percentage
  year?: number;
}

export interface RegionSummary {
  name: string;
  countriesCount: number;
  gdp: number; // in billions USD
  population: number; // in millions
  unemployment: number; // average percentage
  debtToGdp: number; // average percentage
  budget: number; // in billions USD
}

export interface EconomicDataState {
  countries: Country[];
  lastUpdated: string;
  isLatest: boolean;
  totals: {
    gdp: number;
    gdpGrowth: number;
    population: number;
    populationGrowth: number;
    budget: number;
    budgetGrowth: number;
    countriesCount: number;
  };
}

export interface AISpotlightInsight {
  countryId: string;
  analysis: string;
  recommendations: string[];
  outlook: 'Positive' | 'Stable' | 'Caution';
}

import { Country, RegionSummary } from '../types';

export function getRegionalSummaries(countries: Country[]): Record<string, RegionSummary> {
  const regions: ('Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern')[] = [
    'Northern', 'Western', 'Eastern', 'Central', 'Southern'
  ];

  const summaries: Record<string, RegionSummary> = {};

  for (const region of regions) {
    const regionCountries = countries.filter(c => c.region === region);
    const count = regionCountries.length;
    
    const totalGdp = regionCountries.reduce((sum, c) => sum + c.gdp, 0);
    const totalPop = regionCountries.reduce((sum, c) => sum + c.population, 0);
    const totalBudget = regionCountries.reduce((sum, c) => sum + c.budget, 0);
    
    const avgUnemployment = count > 0 
      ? regionCountries.reduce((sum, c) => sum + c.unemployment, 0) / count
      : 0;
    const avgDebt = count > 0 
      ? regionCountries.reduce((sum, c) => sum + c.debtToGdp, 0) / count
      : 0;

    summaries[region] = {
      name: region,
      countriesCount: count,
      gdp: Number(totalGdp.toFixed(1)),
      population: Number(totalPop.toFixed(1)),
      unemployment: Number(avgUnemployment.toFixed(1)),
      debtToGdp: Number(avgDebt.toFixed(1)),
      budget: Number(totalBudget.toFixed(2))
    };
  }

  return summaries;
}

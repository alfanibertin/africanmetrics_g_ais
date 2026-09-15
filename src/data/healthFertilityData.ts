// Official World Bank Indicator: SP.DYN.TFRT.IN
// Source URL: https://data.worldbank.org/indicator/SP.DYN.TFRT.IN
// Description: Fertility rate, total (births per woman)

export interface YearlyFertilityPoint {
  year: number;
  rate: number;
}

export type DemographicStage = 'High Fertility (Pre-Transition)' | 'Early Transition' | 'Advanced Transition' | 'Sub-Replacement';

export interface CountryFertilityRecord {
  id: string;
  iso3: string;
  name: string;
  flag: string;
  region: 'Northern' | 'Western' | 'Eastern' | 'Central' | 'Southern';
  latestRate: number;
  latestYear: number;
  rate2020: number;
  rate2010: number;
  rate2000: number;
  rate1990: number;
  netChange2000toLatest: number;
  stage: DemographicStage;
  demographicNotes: string;
  history: YearlyFertilityPoint[];
}

export interface BenchmarkTimelinePoint {
  year: number;
  subSaharanAfrica: number;
  easternSouthernAfrica: number;
  westernCentralAfrica: number;
  middleEastNorthAfrica: number;
  world: number;
  replacementBenchmark: number;
}

export interface HealthRoadmapModule {
  id: string;
  title: string;
  indicatorCode: string;
  status: 'live' | 'roadmap';
  phase: string;
  description: string;
  sourceUrl: string;
}

export const HEALTH_ROADMAP_MODULES: HealthRoadmapModule[] = [
  {
    id: 'fertility',
    title: 'Total Fertility Rate',
    indicatorCode: 'SP.DYN.TFRT.IN',
    status: 'live',
    phase: 'Phase 1 (Live Active Feed)',
    description: 'Total births per woman measuring reproductive trends, demographic momentum, and labor dependency ratios across 54 African economies.',
    sourceUrl: 'https://data.worldbank.org/indicator/SP.DYN.TFRT.IN'
  },
  {
    id: 'maternal_mortality',
    title: 'Maternal Mortality Ratio',
    indicatorCode: 'SH.STA.MMRT',
    status: 'roadmap',
    phase: 'Phase 2 (Ingestion Pipeline)',
    description: 'Maternal deaths per 100,000 live births evaluating obstetric care accessibility and healthcare system resilience.',
    sourceUrl: 'https://data.worldbank.org/indicator/SH.STA.MMRT'
  },
  {
    id: 'child_mortality',
    title: 'Under-5 Child Mortality Rate',
    indicatorCode: 'SH.DYN.MORT',
    status: 'roadmap',
    phase: 'Phase 2 (Ingestion Pipeline)',
    description: 'Probability per 1,000 live births of dying before reaching age five, reflecting primary care, water hygiene, and immunization coverage.',
    sourceUrl: 'https://data.worldbank.org/indicator/SH.DYN.MORT'
  },
  {
    id: 'life_expectancy',
    title: 'Life Expectancy at Birth',
    indicatorCode: 'SP.DYN.LE00.IN',
    status: 'roadmap',
    phase: 'Phase 3 (Scheduled Next)',
    description: 'Number of years a newborn infant would live assuming prevailing mortality rates remain constant throughout lifespan.',
    sourceUrl: 'https://data.worldbank.org/indicator/SP.DYN.LE00.IN'
  },
  {
    id: 'uhc_coverage',
    title: 'Universal Health Coverage Index',
    indicatorCode: 'SH.UHC.SRVS.CV.ZS',
    status: 'roadmap',
    phase: 'Phase 3 (Scheduled Next)',
    description: 'Coverage of essential health services (including reproductive, maternal, newborn, child health, infectious and NCD services).',
    sourceUrl: 'https://data.worldbank.org/indicator/SH.UHC.SRVS.CV.ZS'
  },
  {
    id: 'health_expenditure',
    title: 'Current Health Expenditure (% GDP)',
    indicatorCode: 'SH.XPD.CHEX.GD.ZS',
    status: 'roadmap',
    phase: 'Phase 4 (Fiscal Tracking)',
    description: 'Level of current health expenditure expressed as a percentage of gross domestic product, tracking Abuja Declaration progress (15% target).',
    sourceUrl: 'https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS'
  }
];

export const AFRICAN_FERTILITY_DATA: CountryFertilityRecord[] = [
  {
    "id": "algeria",
    "iso3": "DZA",
    "name": "Algeria",
    "flag": "\ud83c\udde9\ud83c\uddff",
    "region": "Northern",
    "latestRate": 2.72,
    "latestYear": 2024,
    "rate2020": 2.94,
    "rate2010": 2.88,
    "rate2000": 2.59,
    "rate1990": 4.51,
    "netChange2000toLatest": 0.13,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 4.51
      },
      {
        "year": 1991,
        "rate": 4.37
      },
      {
        "year": 1992,
        "rate": 4.27
      },
      {
        "year": 1993,
        "rate": 4.08
      },
      {
        "year": 1994,
        "rate": 3.91
      },
      {
        "year": 1995,
        "rate": 3.49
      },
      {
        "year": 1996,
        "rate": 3.14
      },
      {
        "year": 1997,
        "rate": 2.89
      },
      {
        "year": 1998,
        "rate": 2.69
      },
      {
        "year": 1999,
        "rate": 2.62
      },
      {
        "year": 2000,
        "rate": 2.59
      },
      {
        "year": 2001,
        "rate": 2.52
      },
      {
        "year": 2002,
        "rate": 2.43
      },
      {
        "year": 2003,
        "rate": 2.45
      },
      {
        "year": 2004,
        "rate": 2.5
      },
      {
        "year": 2005,
        "rate": 2.56
      },
      {
        "year": 2006,
        "rate": 2.63
      },
      {
        "year": 2007,
        "rate": 2.7
      },
      {
        "year": 2008,
        "rate": 2.79
      },
      {
        "year": 2009,
        "rate": 2.83
      },
      {
        "year": 2010,
        "rate": 2.88
      },
      {
        "year": 2011,
        "rate": 2.9
      },
      {
        "year": 2012,
        "rate": 3.0
      },
      {
        "year": 2013,
        "rate": 3.0
      },
      {
        "year": 2014,
        "rate": 3.08
      },
      {
        "year": 2015,
        "rate": 3.09
      },
      {
        "year": 2016,
        "rate": 3.09
      },
      {
        "year": 2017,
        "rate": 3.09
      },
      {
        "year": 2018,
        "rate": 3.02
      },
      {
        "year": 2019,
        "rate": 3.0
      },
      {
        "year": 2020,
        "rate": 2.94
      },
      {
        "year": 2021,
        "rate": 2.87
      },
      {
        "year": 2022,
        "rate": 2.82
      },
      {
        "year": 2023,
        "rate": 2.77
      },
      {
        "year": 2024,
        "rate": 2.72
      }
    ]
  },
  {
    "id": "egypt",
    "iso3": "EGY",
    "name": "Egypt",
    "flag": "\ud83c\uddea\ud83c\uddec",
    "region": "Northern",
    "latestRate": 2.73,
    "latestYear": 2024,
    "rate2020": 2.85,
    "rate2010": 3.3,
    "rate2000": 3.5,
    "rate1990": 4.51,
    "netChange2000toLatest": -0.77,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 4.51
      },
      {
        "year": 1991,
        "rate": 4.32
      },
      {
        "year": 1992,
        "rate": 4.15
      },
      {
        "year": 1993,
        "rate": 3.99
      },
      {
        "year": 1994,
        "rate": 3.87
      },
      {
        "year": 1995,
        "rate": 3.76
      },
      {
        "year": 1996,
        "rate": 3.7
      },
      {
        "year": 1997,
        "rate": 3.68
      },
      {
        "year": 1998,
        "rate": 3.68
      },
      {
        "year": 1999,
        "rate": 3.6
      },
      {
        "year": 2000,
        "rate": 3.5
      },
      {
        "year": 2001,
        "rate": 3.46
      },
      {
        "year": 2002,
        "rate": 3.41
      },
      {
        "year": 2003,
        "rate": 3.35
      },
      {
        "year": 2004,
        "rate": 3.28
      },
      {
        "year": 2005,
        "rate": 3.25
      },
      {
        "year": 2006,
        "rate": 3.22
      },
      {
        "year": 2007,
        "rate": 3.24
      },
      {
        "year": 2008,
        "rate": 3.24
      },
      {
        "year": 2009,
        "rate": 3.26
      },
      {
        "year": 2010,
        "rate": 3.3
      },
      {
        "year": 2011,
        "rate": 3.31
      },
      {
        "year": 2012,
        "rate": 3.4
      },
      {
        "year": 2013,
        "rate": 3.49
      },
      {
        "year": 2014,
        "rate": 3.49
      },
      {
        "year": 2015,
        "rate": 3.5
      },
      {
        "year": 2016,
        "rate": 3.35
      },
      {
        "year": 2017,
        "rate": 3.31
      },
      {
        "year": 2018,
        "rate": 3.02
      },
      {
        "year": 2019,
        "rate": 2.87
      },
      {
        "year": 2020,
        "rate": 2.85
      },
      {
        "year": 2021,
        "rate": 2.75
      },
      {
        "year": 2022,
        "rate": 2.75
      },
      {
        "year": 2023,
        "rate": 2.75
      },
      {
        "year": 2024,
        "rate": 2.73
      }
    ]
  },
  {
    "id": "libya",
    "iso3": "LBY",
    "name": "Libya",
    "flag": "\ud83c\uddf1\ud83c\uddfe",
    "region": "Northern",
    "latestRate": 2.3,
    "latestYear": 2024,
    "rate2020": 2.51,
    "rate2010": 2.6,
    "rate2000": 2.91,
    "rate1990": 4.78,
    "netChange2000toLatest": -0.61,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 4.78
      },
      {
        "year": 1991,
        "rate": 4.46
      },
      {
        "year": 1992,
        "rate": 4.16
      },
      {
        "year": 1993,
        "rate": 3.88
      },
      {
        "year": 1994,
        "rate": 3.65
      },
      {
        "year": 1995,
        "rate": 3.44
      },
      {
        "year": 1996,
        "rate": 3.26
      },
      {
        "year": 1997,
        "rate": 3.13
      },
      {
        "year": 1998,
        "rate": 3.04
      },
      {
        "year": 1999,
        "rate": 2.97
      },
      {
        "year": 2000,
        "rate": 2.91
      },
      {
        "year": 2001,
        "rate": 2.87
      },
      {
        "year": 2002,
        "rate": 2.83
      },
      {
        "year": 2003,
        "rate": 2.8
      },
      {
        "year": 2004,
        "rate": 2.77
      },
      {
        "year": 2005,
        "rate": 2.77
      },
      {
        "year": 2006,
        "rate": 2.7
      },
      {
        "year": 2007,
        "rate": 2.65
      },
      {
        "year": 2008,
        "rate": 2.6
      },
      {
        "year": 2009,
        "rate": 2.56
      },
      {
        "year": 2010,
        "rate": 2.6
      },
      {
        "year": 2011,
        "rate": 2.65
      },
      {
        "year": 2012,
        "rate": 2.68
      },
      {
        "year": 2013,
        "rate": 2.72
      },
      {
        "year": 2014,
        "rate": 2.75
      },
      {
        "year": 2015,
        "rate": 2.71
      },
      {
        "year": 2016,
        "rate": 2.67
      },
      {
        "year": 2017,
        "rate": 2.63
      },
      {
        "year": 2018,
        "rate": 2.58
      },
      {
        "year": 2019,
        "rate": 2.54
      },
      {
        "year": 2020,
        "rate": 2.51
      },
      {
        "year": 2021,
        "rate": 2.46
      },
      {
        "year": 2022,
        "rate": 2.4
      },
      {
        "year": 2023,
        "rate": 2.35
      },
      {
        "year": 2024,
        "rate": 2.3
      }
    ]
  },
  {
    "id": "morocco",
    "iso3": "MAR",
    "name": "Morocco",
    "flag": "\ud83c\uddf2\ud83c\udde6",
    "region": "Northern",
    "latestRate": 2.21,
    "latestYear": 2024,
    "rate2020": 2.32,
    "rate2010": 2.63,
    "rate2000": 2.77,
    "rate1990": 4.06,
    "netChange2000toLatest": -0.56,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 4.06
      },
      {
        "year": 1991,
        "rate": 3.95
      },
      {
        "year": 1992,
        "rate": 3.76
      },
      {
        "year": 1993,
        "rate": 3.55
      },
      {
        "year": 1994,
        "rate": 3.41
      },
      {
        "year": 1995,
        "rate": 3.29
      },
      {
        "year": 1996,
        "rate": 3.23
      },
      {
        "year": 1997,
        "rate": 3.15
      },
      {
        "year": 1998,
        "rate": 3.04
      },
      {
        "year": 1999,
        "rate": 2.88
      },
      {
        "year": 2000,
        "rate": 2.77
      },
      {
        "year": 2001,
        "rate": 2.69
      },
      {
        "year": 2002,
        "rate": 2.62
      },
      {
        "year": 2003,
        "rate": 2.61
      },
      {
        "year": 2004,
        "rate": 2.61
      },
      {
        "year": 2005,
        "rate": 2.61
      },
      {
        "year": 2006,
        "rate": 2.61
      },
      {
        "year": 2007,
        "rate": 2.62
      },
      {
        "year": 2008,
        "rate": 2.61
      },
      {
        "year": 2009,
        "rate": 2.62
      },
      {
        "year": 2010,
        "rate": 2.63
      },
      {
        "year": 2011,
        "rate": 2.6
      },
      {
        "year": 2012,
        "rate": 2.54
      },
      {
        "year": 2013,
        "rate": 2.48
      },
      {
        "year": 2014,
        "rate": 2.42
      },
      {
        "year": 2015,
        "rate": 2.41
      },
      {
        "year": 2016,
        "rate": 2.4
      },
      {
        "year": 2017,
        "rate": 2.38
      },
      {
        "year": 2018,
        "rate": 2.35
      },
      {
        "year": 2019,
        "rate": 2.34
      },
      {
        "year": 2020,
        "rate": 2.32
      },
      {
        "year": 2021,
        "rate": 2.29
      },
      {
        "year": 2022,
        "rate": 2.26
      },
      {
        "year": 2023,
        "rate": 2.23
      },
      {
        "year": 2024,
        "rate": 2.21
      }
    ]
  },
  {
    "id": "sudan",
    "iso3": "SDN",
    "name": "Sudan",
    "flag": "\ud83c\uddf8\ud83c\udde9",
    "region": "Northern",
    "latestRate": 4.26,
    "latestYear": 2024,
    "rate2020": 4.54,
    "rate2010": 5.14,
    "rate2000": 5.6,
    "rate1990": 6.07,
    "netChange2000toLatest": -1.34,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.07
      },
      {
        "year": 1991,
        "rate": 6.05
      },
      {
        "year": 1992,
        "rate": 6.02
      },
      {
        "year": 1993,
        "rate": 5.97
      },
      {
        "year": 1994,
        "rate": 5.91
      },
      {
        "year": 1995,
        "rate": 5.86
      },
      {
        "year": 1996,
        "rate": 5.79
      },
      {
        "year": 1997,
        "rate": 5.72
      },
      {
        "year": 1998,
        "rate": 5.65
      },
      {
        "year": 1999,
        "rate": 5.62
      },
      {
        "year": 2000,
        "rate": 5.6
      },
      {
        "year": 2001,
        "rate": 5.56
      },
      {
        "year": 2002,
        "rate": 5.53
      },
      {
        "year": 2003,
        "rate": 5.49
      },
      {
        "year": 2004,
        "rate": 5.46
      },
      {
        "year": 2005,
        "rate": 5.4
      },
      {
        "year": 2006,
        "rate": 5.33
      },
      {
        "year": 2007,
        "rate": 5.27
      },
      {
        "year": 2008,
        "rate": 5.21
      },
      {
        "year": 2009,
        "rate": 5.17
      },
      {
        "year": 2010,
        "rate": 5.14
      },
      {
        "year": 2011,
        "rate": 5.09
      },
      {
        "year": 2012,
        "rate": 5.03
      },
      {
        "year": 2013,
        "rate": 4.96
      },
      {
        "year": 2014,
        "rate": 4.91
      },
      {
        "year": 2015,
        "rate": 4.9
      },
      {
        "year": 2016,
        "rate": 4.83
      },
      {
        "year": 2017,
        "rate": 4.76
      },
      {
        "year": 2018,
        "rate": 4.68
      },
      {
        "year": 2019,
        "rate": 4.62
      },
      {
        "year": 2020,
        "rate": 4.54
      },
      {
        "year": 2021,
        "rate": 4.46
      },
      {
        "year": 2022,
        "rate": 4.38
      },
      {
        "year": 2023,
        "rate": 4.32
      },
      {
        "year": 2024,
        "rate": 4.26
      }
    ]
  },
  {
    "id": "tunisia",
    "iso3": "TUN",
    "name": "Tunisia",
    "flag": "\ud83c\uddf9\ud83c\uddf3",
    "region": "Northern",
    "latestRate": 1.82,
    "latestYear": 2024,
    "rate2020": 2,
    "rate2010": 2.08,
    "rate2000": 2.02,
    "rate1990": 3.44,
    "netChange2000toLatest": -0.2,
    "stage": "Sub-Replacement",
    "demographicNotes": "Below replacement threshold of 2.1; experiencing population aging and shifting towards healthcare longevity financing.",
    "history": [
      {
        "year": 1990,
        "rate": 3.44
      },
      {
        "year": 1991,
        "rate": 3.31
      },
      {
        "year": 1992,
        "rate": 3.19
      },
      {
        "year": 1993,
        "rate": 3.06
      },
      {
        "year": 1994,
        "rate": 2.87
      },
      {
        "year": 1995,
        "rate": 2.67
      },
      {
        "year": 1996,
        "rate": 2.49
      },
      {
        "year": 1997,
        "rate": 2.34
      },
      {
        "year": 1998,
        "rate": 2.2
      },
      {
        "year": 1999,
        "rate": 2.08
      },
      {
        "year": 2000,
        "rate": 2.02
      },
      {
        "year": 2001,
        "rate": 1.98
      },
      {
        "year": 2002,
        "rate": 1.94
      },
      {
        "year": 2003,
        "rate": 1.96
      },
      {
        "year": 2004,
        "rate": 1.95
      },
      {
        "year": 2005,
        "rate": 1.95
      },
      {
        "year": 2006,
        "rate": 1.95
      },
      {
        "year": 2007,
        "rate": 1.96
      },
      {
        "year": 2008,
        "rate": 1.98
      },
      {
        "year": 2009,
        "rate": 2.0
      },
      {
        "year": 2010,
        "rate": 2.08
      },
      {
        "year": 2011,
        "rate": 2.19
      },
      {
        "year": 2012,
        "rate": 2.28
      },
      {
        "year": 2013,
        "rate": 2.31
      },
      {
        "year": 2014,
        "rate": 2.32
      },
      {
        "year": 2015,
        "rate": 2.31
      },
      {
        "year": 2016,
        "rate": 2.27
      },
      {
        "year": 2017,
        "rate": 2.21
      },
      {
        "year": 2018,
        "rate": 2.13
      },
      {
        "year": 2019,
        "rate": 2.1
      },
      {
        "year": 2020,
        "rate": 2
      },
      {
        "year": 2021,
        "rate": 1.8
      },
      {
        "year": 2022,
        "rate": 1.85
      },
      {
        "year": 2023,
        "rate": 1.83
      },
      {
        "year": 2024,
        "rate": 1.82
      }
    ]
  },
  {
    "id": "mauritania",
    "iso3": "MRT",
    "name": "Mauritania",
    "flag": "\ud83c\uddf2\ud83c\uddf7",
    "region": "Northern",
    "latestRate": 4.62,
    "latestYear": 2024,
    "rate2020": 4.91,
    "rate2010": 5.38,
    "rate2000": 5.46,
    "rate1990": 6.17,
    "netChange2000toLatest": -0.84,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.17
      },
      {
        "year": 1991,
        "rate": 6.16
      },
      {
        "year": 1992,
        "rate": 6.13
      },
      {
        "year": 1993,
        "rate": 6.09
      },
      {
        "year": 1994,
        "rate": 6.06
      },
      {
        "year": 1995,
        "rate": 5.96
      },
      {
        "year": 1996,
        "rate": 5.86
      },
      {
        "year": 1997,
        "rate": 5.74
      },
      {
        "year": 1998,
        "rate": 5.62
      },
      {
        "year": 1999,
        "rate": 5.52
      },
      {
        "year": 2000,
        "rate": 5.46
      },
      {
        "year": 2001,
        "rate": 5.41
      },
      {
        "year": 2002,
        "rate": 5.37
      },
      {
        "year": 2003,
        "rate": 5.36
      },
      {
        "year": 2004,
        "rate": 5.37
      },
      {
        "year": 2005,
        "rate": 5.38
      },
      {
        "year": 2006,
        "rate": 5.4
      },
      {
        "year": 2007,
        "rate": 5.43
      },
      {
        "year": 2008,
        "rate": 5.44
      },
      {
        "year": 2009,
        "rate": 5.41
      },
      {
        "year": 2010,
        "rate": 5.38
      },
      {
        "year": 2011,
        "rate": 5.38
      },
      {
        "year": 2012,
        "rate": 5.35
      },
      {
        "year": 2013,
        "rate": 5.32
      },
      {
        "year": 2014,
        "rate": 5.26
      },
      {
        "year": 2015,
        "rate": 5.21
      },
      {
        "year": 2016,
        "rate": 5.16
      },
      {
        "year": 2017,
        "rate": 5.11
      },
      {
        "year": 2018,
        "rate": 5.04
      },
      {
        "year": 2019,
        "rate": 4.98
      },
      {
        "year": 2020,
        "rate": 4.91
      },
      {
        "year": 2021,
        "rate": 4.85
      },
      {
        "year": 2022,
        "rate": 4.77
      },
      {
        "year": 2023,
        "rate": 4.7
      },
      {
        "year": 2024,
        "rate": 4.62
      }
    ]
  },
  {
    "id": "benin",
    "iso3": "BEN",
    "name": "Benin",
    "flag": "\ud83c\udde7\ud83c\uddef",
    "region": "Western",
    "latestRate": 4.48,
    "latestYear": 2024,
    "rate2020": 4.79,
    "rate2010": 5.45,
    "rate2000": 5.94,
    "rate1990": 6.74,
    "netChange2000toLatest": -1.46,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.74
      },
      {
        "year": 1991,
        "rate": 6.67
      },
      {
        "year": 1992,
        "rate": 6.59
      },
      {
        "year": 1993,
        "rate": 6.51
      },
      {
        "year": 1994,
        "rate": 6.42
      },
      {
        "year": 1995,
        "rate": 6.33
      },
      {
        "year": 1996,
        "rate": 6.28
      },
      {
        "year": 1997,
        "rate": 6.23
      },
      {
        "year": 1998,
        "rate": 6.14
      },
      {
        "year": 1999,
        "rate": 6.03
      },
      {
        "year": 2000,
        "rate": 5.94
      },
      {
        "year": 2001,
        "rate": 5.85
      },
      {
        "year": 2002,
        "rate": 5.79
      },
      {
        "year": 2003,
        "rate": 5.76
      },
      {
        "year": 2004,
        "rate": 5.72
      },
      {
        "year": 2005,
        "rate": 5.69
      },
      {
        "year": 2006,
        "rate": 5.67
      },
      {
        "year": 2007,
        "rate": 5.63
      },
      {
        "year": 2008,
        "rate": 5.55
      },
      {
        "year": 2009,
        "rate": 5.49
      },
      {
        "year": 2010,
        "rate": 5.45
      },
      {
        "year": 2011,
        "rate": 5.44
      },
      {
        "year": 2012,
        "rate": 5.43
      },
      {
        "year": 2013,
        "rate": 5.41
      },
      {
        "year": 2014,
        "rate": 5.37
      },
      {
        "year": 2015,
        "rate": 5.32
      },
      {
        "year": 2016,
        "rate": 5.25
      },
      {
        "year": 2017,
        "rate": 5.16
      },
      {
        "year": 2018,
        "rate": 5.03
      },
      {
        "year": 2019,
        "rate": 4.9
      },
      {
        "year": 2020,
        "rate": 4.79
      },
      {
        "year": 2021,
        "rate": 4.71
      },
      {
        "year": 2022,
        "rate": 4.63
      },
      {
        "year": 2023,
        "rate": 4.56
      },
      {
        "year": 2024,
        "rate": 4.48
      }
    ]
  },
  {
    "id": "burkina-faso",
    "iso3": "BFA",
    "name": "Burkina Faso",
    "flag": "\ud83c\udde7\ud83c\uddeb",
    "region": "Western",
    "latestRate": 4.11,
    "latestYear": 2024,
    "rate2020": 4.44,
    "rate2010": 5.94,
    "rate2000": 6.52,
    "rate1990": 7.01,
    "netChange2000toLatest": -2.41,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 7.01
      },
      {
        "year": 1991,
        "rate": 6.97
      },
      {
        "year": 1992,
        "rate": 6.94
      },
      {
        "year": 1993,
        "rate": 6.89
      },
      {
        "year": 1994,
        "rate": 6.84
      },
      {
        "year": 1995,
        "rate": 6.81
      },
      {
        "year": 1996,
        "rate": 6.78
      },
      {
        "year": 1997,
        "rate": 6.72
      },
      {
        "year": 1998,
        "rate": 6.66
      },
      {
        "year": 1999,
        "rate": 6.59
      },
      {
        "year": 2000,
        "rate": 6.52
      },
      {
        "year": 2001,
        "rate": 6.43
      },
      {
        "year": 2002,
        "rate": 6.34
      },
      {
        "year": 2003,
        "rate": 6.28
      },
      {
        "year": 2004,
        "rate": 6.22
      },
      {
        "year": 2005,
        "rate": 6.18
      },
      {
        "year": 2006,
        "rate": 6.17
      },
      {
        "year": 2007,
        "rate": 6.11
      },
      {
        "year": 2008,
        "rate": 6.05
      },
      {
        "year": 2009,
        "rate": 5.99
      },
      {
        "year": 2010,
        "rate": 5.94
      },
      {
        "year": 2011,
        "rate": 5.87
      },
      {
        "year": 2012,
        "rate": 5.79
      },
      {
        "year": 2013,
        "rate": 5.7
      },
      {
        "year": 2014,
        "rate": 5.59
      },
      {
        "year": 2015,
        "rate": 5.48
      },
      {
        "year": 2016,
        "rate": 5.33
      },
      {
        "year": 2017,
        "rate": 5.17
      },
      {
        "year": 2018,
        "rate": 4.92
      },
      {
        "year": 2019,
        "rate": 4.68
      },
      {
        "year": 2020,
        "rate": 4.44
      },
      {
        "year": 2021,
        "rate": 4.36
      },
      {
        "year": 2022,
        "rate": 4.28
      },
      {
        "year": 2023,
        "rate": 4.19
      },
      {
        "year": 2024,
        "rate": 4.11
      }
    ]
  },
  {
    "id": "cape-verde",
    "iso3": "CPV",
    "name": "Cabo Verde",
    "flag": "\ud83c\udde8\ud83c\uddfb",
    "region": "Western",
    "latestRate": 1.51,
    "latestYear": 2024,
    "rate2020": 1.59,
    "rate2010": 2.33,
    "rate2000": 3.54,
    "rate1990": 5.36,
    "netChange2000toLatest": -2.03,
    "stage": "Sub-Replacement",
    "demographicNotes": "Below replacement threshold of 2.1; experiencing population aging and shifting towards healthcare longevity financing.",
    "history": [
      {
        "year": 1990,
        "rate": 5.36
      },
      {
        "year": 1991,
        "rate": 5.26
      },
      {
        "year": 1992,
        "rate": 5.12
      },
      {
        "year": 1993,
        "rate": 4.95
      },
      {
        "year": 1994,
        "rate": 4.72
      },
      {
        "year": 1995,
        "rate": 4.49
      },
      {
        "year": 1996,
        "rate": 4.26
      },
      {
        "year": 1997,
        "rate": 4.05
      },
      {
        "year": 1998,
        "rate": 3.9
      },
      {
        "year": 1999,
        "rate": 3.73
      },
      {
        "year": 2000,
        "rate": 3.54
      },
      {
        "year": 2001,
        "rate": 3.37
      },
      {
        "year": 2002,
        "rate": 3.19
      },
      {
        "year": 2003,
        "rate": 3.03
      },
      {
        "year": 2004,
        "rate": 2.9
      },
      {
        "year": 2005,
        "rate": 2.73
      },
      {
        "year": 2006,
        "rate": 2.56
      },
      {
        "year": 2007,
        "rate": 2.41
      },
      {
        "year": 2008,
        "rate": 2.3
      },
      {
        "year": 2009,
        "rate": 2.25
      },
      {
        "year": 2010,
        "rate": 2.33
      },
      {
        "year": 2011,
        "rate": 2.33
      },
      {
        "year": 2012,
        "rate": 2.15
      },
      {
        "year": 2013,
        "rate": 2.07
      },
      {
        "year": 2014,
        "rate": 2.03
      },
      {
        "year": 2015,
        "rate": 1.97
      },
      {
        "year": 2016,
        "rate": 1.97
      },
      {
        "year": 2017,
        "rate": 1.93
      },
      {
        "year": 2018,
        "rate": 1.8
      },
      {
        "year": 2019,
        "rate": 1.7
      },
      {
        "year": 2020,
        "rate": 1.59
      },
      {
        "year": 2021,
        "rate": 1.55
      },
      {
        "year": 2022,
        "rate": 1.53
      },
      {
        "year": 2023,
        "rate": 1.52
      },
      {
        "year": 2024,
        "rate": 1.51
      }
    ]
  },
  {
    "id": "ivory-coast",
    "iso3": "CIV",
    "name": "C\u00f4te d'Ivoire",
    "flag": "\ud83c\udde8\ud83c\uddee",
    "region": "Western",
    "latestRate": 4.23,
    "latestYear": 2024,
    "rate2020": 4.46,
    "rate2010": 5.29,
    "rate2000": 5.77,
    "rate1990": 6.72,
    "netChange2000toLatest": -1.54,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.72
      },
      {
        "year": 1991,
        "rate": 6.58
      },
      {
        "year": 1992,
        "rate": 6.43
      },
      {
        "year": 1993,
        "rate": 6.27
      },
      {
        "year": 1994,
        "rate": 6.13
      },
      {
        "year": 1995,
        "rate": 6.04
      },
      {
        "year": 1996,
        "rate": 5.95
      },
      {
        "year": 1997,
        "rate": 5.9
      },
      {
        "year": 1998,
        "rate": 5.85
      },
      {
        "year": 1999,
        "rate": 5.8
      },
      {
        "year": 2000,
        "rate": 5.77
      },
      {
        "year": 2001,
        "rate": 5.7
      },
      {
        "year": 2002,
        "rate": 5.64
      },
      {
        "year": 2003,
        "rate": 5.57
      },
      {
        "year": 2004,
        "rate": 5.53
      },
      {
        "year": 2005,
        "rate": 5.5
      },
      {
        "year": 2006,
        "rate": 5.45
      },
      {
        "year": 2007,
        "rate": 5.4
      },
      {
        "year": 2008,
        "rate": 5.36
      },
      {
        "year": 2009,
        "rate": 5.33
      },
      {
        "year": 2010,
        "rate": 5.29
      },
      {
        "year": 2011,
        "rate": 5.24
      },
      {
        "year": 2012,
        "rate": 5.19
      },
      {
        "year": 2013,
        "rate": 5.13
      },
      {
        "year": 2014,
        "rate": 5.07
      },
      {
        "year": 2015,
        "rate": 4.97
      },
      {
        "year": 2016,
        "rate": 4.87
      },
      {
        "year": 2017,
        "rate": 4.76
      },
      {
        "year": 2018,
        "rate": 4.6
      },
      {
        "year": 2019,
        "rate": 4.52
      },
      {
        "year": 2020,
        "rate": 4.46
      },
      {
        "year": 2021,
        "rate": 4.41
      },
      {
        "year": 2022,
        "rate": 4.35
      },
      {
        "year": 2023,
        "rate": 4.28
      },
      {
        "year": 2024,
        "rate": 4.23
      }
    ]
  },
  {
    "id": "gambia",
    "iso3": "GMB",
    "name": "Gambia",
    "flag": "\ud83c\uddec\ud83c\uddf2",
    "region": "Western",
    "latestRate": 3.91,
    "latestYear": 2024,
    "rate2020": 4.25,
    "rate2010": 5.56,
    "rate2000": 5.72,
    "rate1990": 6.25,
    "netChange2000toLatest": -1.81,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.25
      },
      {
        "year": 1991,
        "rate": 6.19
      },
      {
        "year": 1992,
        "rate": 6.11
      },
      {
        "year": 1993,
        "rate": 6.03
      },
      {
        "year": 1994,
        "rate": 6.04
      },
      {
        "year": 1995,
        "rate": 5.99
      },
      {
        "year": 1996,
        "rate": 5.92
      },
      {
        "year": 1997,
        "rate": 5.85
      },
      {
        "year": 1998,
        "rate": 5.82
      },
      {
        "year": 1999,
        "rate": 5.77
      },
      {
        "year": 2000,
        "rate": 5.72
      },
      {
        "year": 2001,
        "rate": 5.67
      },
      {
        "year": 2002,
        "rate": 5.66
      },
      {
        "year": 2003,
        "rate": 5.66
      },
      {
        "year": 2004,
        "rate": 5.68
      },
      {
        "year": 2005,
        "rate": 5.71
      },
      {
        "year": 2006,
        "rate": 5.74
      },
      {
        "year": 2007,
        "rate": 5.68
      },
      {
        "year": 2008,
        "rate": 5.62
      },
      {
        "year": 2009,
        "rate": 5.57
      },
      {
        "year": 2010,
        "rate": 5.56
      },
      {
        "year": 2011,
        "rate": 5.54
      },
      {
        "year": 2012,
        "rate": 5.52
      },
      {
        "year": 2013,
        "rate": 5.39
      },
      {
        "year": 2014,
        "rate": 5.2
      },
      {
        "year": 2015,
        "rate": 5.0
      },
      {
        "year": 2016,
        "rate": 4.81
      },
      {
        "year": 2017,
        "rate": 4.61
      },
      {
        "year": 2018,
        "rate": 4.42
      },
      {
        "year": 2019,
        "rate": 4.33
      },
      {
        "year": 2020,
        "rate": 4.25
      },
      {
        "year": 2021,
        "rate": 4.17
      },
      {
        "year": 2022,
        "rate": 4.08
      },
      {
        "year": 2023,
        "rate": 4.01
      },
      {
        "year": 2024,
        "rate": 3.91
      }
    ]
  },
  {
    "id": "ghana",
    "iso3": "GHA",
    "name": "Ghana",
    "flag": "\ud83c\uddec\ud83c\udded",
    "region": "Western",
    "latestRate": 3.34,
    "latestYear": 2024,
    "rate2020": 3.54,
    "rate2010": 4.18,
    "rate2000": 4.83,
    "rate1990": 5.74,
    "netChange2000toLatest": -1.49,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 5.74
      },
      {
        "year": 1991,
        "rate": 5.63
      },
      {
        "year": 1992,
        "rate": 5.52
      },
      {
        "year": 1993,
        "rate": 5.41
      },
      {
        "year": 1994,
        "rate": 5.25
      },
      {
        "year": 1995,
        "rate": 5.11
      },
      {
        "year": 1996,
        "rate": 4.96
      },
      {
        "year": 1997,
        "rate": 4.88
      },
      {
        "year": 1998,
        "rate": 4.83
      },
      {
        "year": 1999,
        "rate": 4.82
      },
      {
        "year": 2000,
        "rate": 4.83
      },
      {
        "year": 2001,
        "rate": 4.77
      },
      {
        "year": 2002,
        "rate": 4.69
      },
      {
        "year": 2003,
        "rate": 4.6
      },
      {
        "year": 2004,
        "rate": 4.5
      },
      {
        "year": 2005,
        "rate": 4.5
      },
      {
        "year": 2006,
        "rate": 4.4
      },
      {
        "year": 2007,
        "rate": 4.29
      },
      {
        "year": 2008,
        "rate": 4.22
      },
      {
        "year": 2009,
        "rate": 4.18
      },
      {
        "year": 2010,
        "rate": 4.18
      },
      {
        "year": 2011,
        "rate": 4.18
      },
      {
        "year": 2012,
        "rate": 4.15
      },
      {
        "year": 2013,
        "rate": 4.11
      },
      {
        "year": 2014,
        "rate": 4.03
      },
      {
        "year": 2015,
        "rate": 3.98
      },
      {
        "year": 2016,
        "rate": 3.87
      },
      {
        "year": 2017,
        "rate": 3.71
      },
      {
        "year": 2018,
        "rate": 3.65
      },
      {
        "year": 2019,
        "rate": 3.59
      },
      {
        "year": 2020,
        "rate": 3.54
      },
      {
        "year": 2021,
        "rate": 3.49
      },
      {
        "year": 2022,
        "rate": 3.43
      },
      {
        "year": 2023,
        "rate": 3.4
      },
      {
        "year": 2024,
        "rate": 3.34
      }
    ]
  },
  {
    "id": "guinea",
    "iso3": "GIN",
    "name": "Guinea",
    "flag": "\ud83c\uddec\ud83c\uddf3",
    "region": "Western",
    "latestRate": 4.13,
    "latestYear": 2024,
    "rate2020": 4.49,
    "rate2010": 5.43,
    "rate2000": 5.92,
    "rate1990": 6.51,
    "netChange2000toLatest": -1.79,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.51
      },
      {
        "year": 1991,
        "rate": 6.48
      },
      {
        "year": 1992,
        "rate": 6.45
      },
      {
        "year": 1993,
        "rate": 6.41
      },
      {
        "year": 1994,
        "rate": 6.36
      },
      {
        "year": 1995,
        "rate": 6.29
      },
      {
        "year": 1996,
        "rate": 6.21
      },
      {
        "year": 1997,
        "rate": 6.12
      },
      {
        "year": 1998,
        "rate": 6.05
      },
      {
        "year": 1999,
        "rate": 5.99
      },
      {
        "year": 2000,
        "rate": 5.92
      },
      {
        "year": 2001,
        "rate": 5.83
      },
      {
        "year": 2002,
        "rate": 5.78
      },
      {
        "year": 2003,
        "rate": 5.74
      },
      {
        "year": 2004,
        "rate": 5.73
      },
      {
        "year": 2005,
        "rate": 5.73
      },
      {
        "year": 2006,
        "rate": 5.7
      },
      {
        "year": 2007,
        "rate": 5.66
      },
      {
        "year": 2008,
        "rate": 5.6
      },
      {
        "year": 2009,
        "rate": 5.53
      },
      {
        "year": 2010,
        "rate": 5.43
      },
      {
        "year": 2011,
        "rate": 5.34
      },
      {
        "year": 2012,
        "rate": 5.23
      },
      {
        "year": 2013,
        "rate": 5.15
      },
      {
        "year": 2014,
        "rate": 5.07
      },
      {
        "year": 2015,
        "rate": 5.0
      },
      {
        "year": 2016,
        "rate": 4.92
      },
      {
        "year": 2017,
        "rate": 4.79
      },
      {
        "year": 2018,
        "rate": 4.67
      },
      {
        "year": 2019,
        "rate": 4.58
      },
      {
        "year": 2020,
        "rate": 4.49
      },
      {
        "year": 2021,
        "rate": 4.4
      },
      {
        "year": 2022,
        "rate": 4.3
      },
      {
        "year": 2023,
        "rate": 4.22
      },
      {
        "year": 2024,
        "rate": 4.13
      }
    ]
  },
  {
    "id": "guinea-bissau",
    "iso3": "GNB",
    "name": "Guinea-Bissau",
    "flag": "\ud83c\uddec\ud83c\uddfc",
    "region": "Western",
    "latestRate": 3.76,
    "latestYear": 2024,
    "rate2020": 4.08,
    "rate2010": 5.11,
    "rate2000": 5.79,
    "rate1990": 6.5,
    "netChange2000toLatest": -2.03,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.5
      },
      {
        "year": 1991,
        "rate": 6.47
      },
      {
        "year": 1992,
        "rate": 6.43
      },
      {
        "year": 1993,
        "rate": 6.37
      },
      {
        "year": 1994,
        "rate": 6.3
      },
      {
        "year": 1995,
        "rate": 6.22
      },
      {
        "year": 1996,
        "rate": 6.14
      },
      {
        "year": 1997,
        "rate": 6.06
      },
      {
        "year": 1998,
        "rate": 5.97
      },
      {
        "year": 1999,
        "rate": 5.87
      },
      {
        "year": 2000,
        "rate": 5.79
      },
      {
        "year": 2001,
        "rate": 5.69
      },
      {
        "year": 2002,
        "rate": 5.63
      },
      {
        "year": 2003,
        "rate": 5.58
      },
      {
        "year": 2004,
        "rate": 5.5
      },
      {
        "year": 2005,
        "rate": 5.46
      },
      {
        "year": 2006,
        "rate": 5.41
      },
      {
        "year": 2007,
        "rate": 5.37
      },
      {
        "year": 2008,
        "rate": 5.27
      },
      {
        "year": 2009,
        "rate": 5.18
      },
      {
        "year": 2010,
        "rate": 5.11
      },
      {
        "year": 2011,
        "rate": 5.07
      },
      {
        "year": 2012,
        "rate": 5.0
      },
      {
        "year": 2013,
        "rate": 4.93
      },
      {
        "year": 2014,
        "rate": 4.79
      },
      {
        "year": 2015,
        "rate": 4.66
      },
      {
        "year": 2016,
        "rate": 4.52
      },
      {
        "year": 2017,
        "rate": 4.35
      },
      {
        "year": 2018,
        "rate": 4.24
      },
      {
        "year": 2019,
        "rate": 4.15
      },
      {
        "year": 2020,
        "rate": 4.08
      },
      {
        "year": 2021,
        "rate": 4.0
      },
      {
        "year": 2022,
        "rate": 3.91
      },
      {
        "year": 2023,
        "rate": 3.84
      },
      {
        "year": 2024,
        "rate": 3.76
      }
    ]
  },
  {
    "id": "liberia",
    "iso3": "LBR",
    "name": "Liberia",
    "flag": "\ud83c\uddf1\ud83c\uddf7",
    "region": "Western",
    "latestRate": 3.86,
    "latestYear": 2024,
    "rate2020": 4.17,
    "rate2010": 5.06,
    "rate2000": 5.88,
    "rate1990": 6.37,
    "netChange2000toLatest": -2.02,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.37
      },
      {
        "year": 1991,
        "rate": 6.32
      },
      {
        "year": 1992,
        "rate": 6.28
      },
      {
        "year": 1993,
        "rate": 6.25
      },
      {
        "year": 1994,
        "rate": 6.21
      },
      {
        "year": 1995,
        "rate": 6.17
      },
      {
        "year": 1996,
        "rate": 6.13
      },
      {
        "year": 1997,
        "rate": 6.08
      },
      {
        "year": 1998,
        "rate": 6.02
      },
      {
        "year": 1999,
        "rate": 5.95
      },
      {
        "year": 2000,
        "rate": 5.88
      },
      {
        "year": 2001,
        "rate": 5.77
      },
      {
        "year": 2002,
        "rate": 5.65
      },
      {
        "year": 2003,
        "rate": 5.55
      },
      {
        "year": 2004,
        "rate": 5.51
      },
      {
        "year": 2005,
        "rate": 5.52
      },
      {
        "year": 2006,
        "rate": 5.53
      },
      {
        "year": 2007,
        "rate": 5.46
      },
      {
        "year": 2008,
        "rate": 5.33
      },
      {
        "year": 2009,
        "rate": 5.17
      },
      {
        "year": 2010,
        "rate": 5.06
      },
      {
        "year": 2011,
        "rate": 4.97
      },
      {
        "year": 2012,
        "rate": 4.88
      },
      {
        "year": 2013,
        "rate": 4.75
      },
      {
        "year": 2014,
        "rate": 4.62
      },
      {
        "year": 2015,
        "rate": 4.52
      },
      {
        "year": 2016,
        "rate": 4.46
      },
      {
        "year": 2017,
        "rate": 4.4
      },
      {
        "year": 2018,
        "rate": 4.34
      },
      {
        "year": 2019,
        "rate": 4.26
      },
      {
        "year": 2020,
        "rate": 4.17
      },
      {
        "year": 2021,
        "rate": 4.09
      },
      {
        "year": 2022,
        "rate": 4.02
      },
      {
        "year": 2023,
        "rate": 3.95
      },
      {
        "year": 2024,
        "rate": 3.86
      }
    ]
  },
  {
    "id": "mali",
    "iso3": "MLI",
    "name": "Mali",
    "flag": "\ud83c\uddf2\ud83c\uddf1",
    "region": "Western",
    "latestRate": 5.51,
    "latestYear": 2024,
    "rate2020": 5.85,
    "rate2010": 6.58,
    "rate2000": 6.89,
    "rate1990": 7.31,
    "netChange2000toLatest": -1.38,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 7.31
      },
      {
        "year": 1991,
        "rate": 7.28
      },
      {
        "year": 1992,
        "rate": 7.24
      },
      {
        "year": 1993,
        "rate": 7.18
      },
      {
        "year": 1994,
        "rate": 7.12
      },
      {
        "year": 1995,
        "rate": 7.05
      },
      {
        "year": 1996,
        "rate": 7.01
      },
      {
        "year": 1997,
        "rate": 6.97
      },
      {
        "year": 1998,
        "rate": 6.94
      },
      {
        "year": 1999,
        "rate": 6.91
      },
      {
        "year": 2000,
        "rate": 6.89
      },
      {
        "year": 2001,
        "rate": 6.85
      },
      {
        "year": 2002,
        "rate": 6.82
      },
      {
        "year": 2003,
        "rate": 6.78
      },
      {
        "year": 2004,
        "rate": 6.74
      },
      {
        "year": 2005,
        "rate": 6.71
      },
      {
        "year": 2006,
        "rate": 6.68
      },
      {
        "year": 2007,
        "rate": 6.65
      },
      {
        "year": 2008,
        "rate": 6.62
      },
      {
        "year": 2009,
        "rate": 6.59
      },
      {
        "year": 2010,
        "rate": 6.58
      },
      {
        "year": 2011,
        "rate": 6.54
      },
      {
        "year": 2012,
        "rate": 6.52
      },
      {
        "year": 2013,
        "rate": 6.49
      },
      {
        "year": 2014,
        "rate": 6.44
      },
      {
        "year": 2015,
        "rate": 6.38
      },
      {
        "year": 2016,
        "rate": 6.32
      },
      {
        "year": 2017,
        "rate": 6.25
      },
      {
        "year": 2018,
        "rate": 6.12
      },
      {
        "year": 2019,
        "rate": 5.89
      },
      {
        "year": 2020,
        "rate": 5.85
      },
      {
        "year": 2021,
        "rate": 5.78
      },
      {
        "year": 2022,
        "rate": 5.69
      },
      {
        "year": 2023,
        "rate": 5.61
      },
      {
        "year": 2024,
        "rate": 5.51
      }
    ]
  },
  {
    "id": "niger",
    "iso3": "NER",
    "name": "Niger",
    "flag": "\ud83c\uddf3\ud83c\uddea",
    "region": "Western",
    "latestRate": 5.93,
    "latestYear": 2024,
    "rate2020": 6.37,
    "rate2010": 7.64,
    "rate2000": 7.83,
    "rate1990": 7.81,
    "netChange2000toLatest": -1.9,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 7.81
      },
      {
        "year": 1991,
        "rate": 7.8
      },
      {
        "year": 1992,
        "rate": 7.79
      },
      {
        "year": 1993,
        "rate": 7.79
      },
      {
        "year": 1994,
        "rate": 7.79
      },
      {
        "year": 1995,
        "rate": 7.78
      },
      {
        "year": 1996,
        "rate": 7.78
      },
      {
        "year": 1997,
        "rate": 7.8
      },
      {
        "year": 1998,
        "rate": 7.84
      },
      {
        "year": 1999,
        "rate": 7.84
      },
      {
        "year": 2000,
        "rate": 7.83
      },
      {
        "year": 2001,
        "rate": 7.81
      },
      {
        "year": 2002,
        "rate": 7.8
      },
      {
        "year": 2003,
        "rate": 7.79
      },
      {
        "year": 2004,
        "rate": 7.78
      },
      {
        "year": 2005,
        "rate": 7.77
      },
      {
        "year": 2006,
        "rate": 7.74
      },
      {
        "year": 2007,
        "rate": 7.73
      },
      {
        "year": 2008,
        "rate": 7.7
      },
      {
        "year": 2009,
        "rate": 7.68
      },
      {
        "year": 2010,
        "rate": 7.64
      },
      {
        "year": 2011,
        "rate": 7.59
      },
      {
        "year": 2012,
        "rate": 7.53
      },
      {
        "year": 2013,
        "rate": 7.45
      },
      {
        "year": 2014,
        "rate": 7.34
      },
      {
        "year": 2015,
        "rate": 7.21
      },
      {
        "year": 2016,
        "rate": 7.04
      },
      {
        "year": 2017,
        "rate": 6.87
      },
      {
        "year": 2018,
        "rate": 6.71
      },
      {
        "year": 2019,
        "rate": 6.54
      },
      {
        "year": 2020,
        "rate": 6.37
      },
      {
        "year": 2021,
        "rate": 6.2
      },
      {
        "year": 2022,
        "rate": 6.13
      },
      {
        "year": 2023,
        "rate": 6.06
      },
      {
        "year": 2024,
        "rate": 5.93
      }
    ]
  },
  {
    "id": "nigeria",
    "iso3": "NGA",
    "name": "Nigeria",
    "flag": "\ud83c\uddf3\ud83c\uddec",
    "region": "Western",
    "latestRate": 4.38,
    "latestYear": 2024,
    "rate2020": 4.7,
    "rate2010": 5.95,
    "rate2000": 6.12,
    "rate1990": 6.46,
    "netChange2000toLatest": -1.74,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.46
      },
      {
        "year": 1991,
        "rate": 6.43
      },
      {
        "year": 1992,
        "rate": 6.39
      },
      {
        "year": 1993,
        "rate": 6.35
      },
      {
        "year": 1994,
        "rate": 6.32
      },
      {
        "year": 1995,
        "rate": 6.27
      },
      {
        "year": 1996,
        "rate": 6.22
      },
      {
        "year": 1997,
        "rate": 6.14
      },
      {
        "year": 1998,
        "rate": 6.07
      },
      {
        "year": 1999,
        "rate": 6.08
      },
      {
        "year": 2000,
        "rate": 6.12
      },
      {
        "year": 2001,
        "rate": 6.13
      },
      {
        "year": 2002,
        "rate": 6.12
      },
      {
        "year": 2003,
        "rate": 6.1
      },
      {
        "year": 2004,
        "rate": 6.09
      },
      {
        "year": 2005,
        "rate": 6.06
      },
      {
        "year": 2006,
        "rate": 6.05
      },
      {
        "year": 2007,
        "rate": 6.03
      },
      {
        "year": 2008,
        "rate": 6.02
      },
      {
        "year": 2009,
        "rate": 5.99
      },
      {
        "year": 2010,
        "rate": 5.95
      },
      {
        "year": 2011,
        "rate": 5.89
      },
      {
        "year": 2012,
        "rate": 5.8
      },
      {
        "year": 2013,
        "rate": 5.69
      },
      {
        "year": 2014,
        "rate": 5.62
      },
      {
        "year": 2015,
        "rate": 5.5
      },
      {
        "year": 2016,
        "rate": 5.34
      },
      {
        "year": 2017,
        "rate": 5.18
      },
      {
        "year": 2018,
        "rate": 5.02
      },
      {
        "year": 2019,
        "rate": 4.86
      },
      {
        "year": 2020,
        "rate": 4.7
      },
      {
        "year": 2021,
        "rate": 4.64
      },
      {
        "year": 2022,
        "rate": 4.55
      },
      {
        "year": 2023,
        "rate": 4.48
      },
      {
        "year": 2024,
        "rate": 4.38
      }
    ]
  },
  {
    "id": "senegal",
    "iso3": "SEN",
    "name": "Senegal",
    "flag": "\ud83c\uddf8\ud83c\uddf3",
    "region": "Western",
    "latestRate": 3.77,
    "latestYear": 2024,
    "rate2020": 4.0,
    "rate2010": 5.05,
    "rate2000": 5.5,
    "rate1990": 6.4,
    "netChange2000toLatest": -1.73,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.4
      },
      {
        "year": 1991,
        "rate": 6.27
      },
      {
        "year": 1992,
        "rate": 6.15
      },
      {
        "year": 1993,
        "rate": 6.05
      },
      {
        "year": 1994,
        "rate": 5.92
      },
      {
        "year": 1995,
        "rate": 5.82
      },
      {
        "year": 1996,
        "rate": 5.72
      },
      {
        "year": 1997,
        "rate": 5.64
      },
      {
        "year": 1998,
        "rate": 5.58
      },
      {
        "year": 1999,
        "rate": 5.57
      },
      {
        "year": 2000,
        "rate": 5.5
      },
      {
        "year": 2001,
        "rate": 5.4
      },
      {
        "year": 2002,
        "rate": 5.3
      },
      {
        "year": 2003,
        "rate": 5.25
      },
      {
        "year": 2004,
        "rate": 5.19
      },
      {
        "year": 2005,
        "rate": 5.13
      },
      {
        "year": 2006,
        "rate": 5.06
      },
      {
        "year": 2007,
        "rate": 5.02
      },
      {
        "year": 2008,
        "rate": 5.02
      },
      {
        "year": 2009,
        "rate": 5.03
      },
      {
        "year": 2010,
        "rate": 5.05
      },
      {
        "year": 2011,
        "rate": 5.1
      },
      {
        "year": 2012,
        "rate": 5.13
      },
      {
        "year": 2013,
        "rate": 5.05
      },
      {
        "year": 2014,
        "rate": 4.88
      },
      {
        "year": 2015,
        "rate": 4.75
      },
      {
        "year": 2016,
        "rate": 4.65
      },
      {
        "year": 2017,
        "rate": 4.49
      },
      {
        "year": 2018,
        "rate": 4.29
      },
      {
        "year": 2019,
        "rate": 4.1
      },
      {
        "year": 2020,
        "rate": 4.0
      },
      {
        "year": 2021,
        "rate": 3.94
      },
      {
        "year": 2022,
        "rate": 3.86
      },
      {
        "year": 2023,
        "rate": 3.82
      },
      {
        "year": 2024,
        "rate": 3.77
      }
    ]
  },
  {
    "id": "sierra-leone",
    "iso3": "SLE",
    "name": "Sierra Leone",
    "flag": "\ud83c\uddf8\ud83c\uddf1",
    "region": "Western",
    "latestRate": 3.7,
    "latestYear": 2024,
    "rate2020": 4.08,
    "rate2010": 5.33,
    "rate2000": 6.36,
    "rate1990": 6.57,
    "netChange2000toLatest": -2.66,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.57
      },
      {
        "year": 1991,
        "rate": 6.55
      },
      {
        "year": 1992,
        "rate": 6.55
      },
      {
        "year": 1993,
        "rate": 6.57
      },
      {
        "year": 1994,
        "rate": 6.56
      },
      {
        "year": 1995,
        "rate": 6.55
      },
      {
        "year": 1996,
        "rate": 6.55
      },
      {
        "year": 1997,
        "rate": 6.53
      },
      {
        "year": 1998,
        "rate": 6.5
      },
      {
        "year": 1999,
        "rate": 6.42
      },
      {
        "year": 2000,
        "rate": 6.36
      },
      {
        "year": 2001,
        "rate": 6.3
      },
      {
        "year": 2002,
        "rate": 6.23
      },
      {
        "year": 2003,
        "rate": 6.09
      },
      {
        "year": 2004,
        "rate": 5.92
      },
      {
        "year": 2005,
        "rate": 5.81
      },
      {
        "year": 2006,
        "rate": 5.74
      },
      {
        "year": 2007,
        "rate": 5.64
      },
      {
        "year": 2008,
        "rate": 5.56
      },
      {
        "year": 2009,
        "rate": 5.45
      },
      {
        "year": 2010,
        "rate": 5.33
      },
      {
        "year": 2011,
        "rate": 5.21
      },
      {
        "year": 2012,
        "rate": 5.06
      },
      {
        "year": 2013,
        "rate": 4.87
      },
      {
        "year": 2014,
        "rate": 4.7
      },
      {
        "year": 2015,
        "rate": 4.55
      },
      {
        "year": 2016,
        "rate": 4.47
      },
      {
        "year": 2017,
        "rate": 4.39
      },
      {
        "year": 2018,
        "rate": 4.29
      },
      {
        "year": 2019,
        "rate": 4.19
      },
      {
        "year": 2020,
        "rate": 4.08
      },
      {
        "year": 2021,
        "rate": 3.98
      },
      {
        "year": 2022,
        "rate": 3.88
      },
      {
        "year": 2023,
        "rate": 3.79
      },
      {
        "year": 2024,
        "rate": 3.7
      }
    ]
  },
  {
    "id": "togo",
    "iso3": "TGO",
    "name": "Togo",
    "flag": "\ud83c\uddf9\ud83c\uddec",
    "region": "Western",
    "latestRate": 4.12,
    "latestYear": 2024,
    "rate2020": 4.39,
    "rate2010": 5.09,
    "rate2000": 5.17,
    "rate1990": 6.07,
    "netChange2000toLatest": -1.05,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.07
      },
      {
        "year": 1991,
        "rate": 5.99
      },
      {
        "year": 1992,
        "rate": 5.89
      },
      {
        "year": 1993,
        "rate": 5.78
      },
      {
        "year": 1994,
        "rate": 5.67
      },
      {
        "year": 1995,
        "rate": 5.56
      },
      {
        "year": 1996,
        "rate": 5.46
      },
      {
        "year": 1997,
        "rate": 5.36
      },
      {
        "year": 1998,
        "rate": 5.29
      },
      {
        "year": 1999,
        "rate": 5.23
      },
      {
        "year": 2000,
        "rate": 5.17
      },
      {
        "year": 2001,
        "rate": 5.13
      },
      {
        "year": 2002,
        "rate": 5.09
      },
      {
        "year": 2003,
        "rate": 5.05
      },
      {
        "year": 2004,
        "rate": 4.99
      },
      {
        "year": 2005,
        "rate": 5.04
      },
      {
        "year": 2006,
        "rate": 5.08
      },
      {
        "year": 2007,
        "rate": 5.1
      },
      {
        "year": 2008,
        "rate": 5.1
      },
      {
        "year": 2009,
        "rate": 5.1
      },
      {
        "year": 2010,
        "rate": 5.09
      },
      {
        "year": 2011,
        "rate": 4.98
      },
      {
        "year": 2012,
        "rate": 4.85
      },
      {
        "year": 2013,
        "rate": 4.75
      },
      {
        "year": 2014,
        "rate": 4.7
      },
      {
        "year": 2015,
        "rate": 4.66
      },
      {
        "year": 2016,
        "rate": 4.63
      },
      {
        "year": 2017,
        "rate": 4.58
      },
      {
        "year": 2018,
        "rate": 4.51
      },
      {
        "year": 2019,
        "rate": 4.45
      },
      {
        "year": 2020,
        "rate": 4.39
      },
      {
        "year": 2021,
        "rate": 4.32
      },
      {
        "year": 2022,
        "rate": 4.25
      },
      {
        "year": 2023,
        "rate": 4.19
      },
      {
        "year": 2024,
        "rate": 4.12
      }
    ]
  },
  {
    "id": "burundi",
    "iso3": "BDI",
    "name": "Burundi",
    "flag": "\ud83c\udde7\ud83c\uddee",
    "region": "Eastern",
    "latestRate": 4.79,
    "latestYear": 2024,
    "rate2020": 5.18,
    "rate2010": 6.26,
    "rate2000": 6.87,
    "rate1990": 7.37,
    "netChange2000toLatest": -2.08,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 7.37
      },
      {
        "year": 1991,
        "rate": 7.34
      },
      {
        "year": 1992,
        "rate": 7.3
      },
      {
        "year": 1993,
        "rate": 7.27
      },
      {
        "year": 1994,
        "rate": 7.23
      },
      {
        "year": 1995,
        "rate": 7.18
      },
      {
        "year": 1996,
        "rate": 7.12
      },
      {
        "year": 1997,
        "rate": 7.04
      },
      {
        "year": 1998,
        "rate": 6.96
      },
      {
        "year": 1999,
        "rate": 6.9
      },
      {
        "year": 2000,
        "rate": 6.87
      },
      {
        "year": 2001,
        "rate": 6.85
      },
      {
        "year": 2002,
        "rate": 6.82
      },
      {
        "year": 2003,
        "rate": 6.79
      },
      {
        "year": 2004,
        "rate": 6.75
      },
      {
        "year": 2005,
        "rate": 6.71
      },
      {
        "year": 2006,
        "rate": 6.66
      },
      {
        "year": 2007,
        "rate": 6.59
      },
      {
        "year": 2008,
        "rate": 6.51
      },
      {
        "year": 2009,
        "rate": 6.41
      },
      {
        "year": 2010,
        "rate": 6.26
      },
      {
        "year": 2011,
        "rate": 6.11
      },
      {
        "year": 2012,
        "rate": 5.99
      },
      {
        "year": 2013,
        "rate": 5.89
      },
      {
        "year": 2014,
        "rate": 5.79
      },
      {
        "year": 2015,
        "rate": 5.7
      },
      {
        "year": 2016,
        "rate": 5.59
      },
      {
        "year": 2017,
        "rate": 5.48
      },
      {
        "year": 2018,
        "rate": 5.38
      },
      {
        "year": 2019,
        "rate": 5.27
      },
      {
        "year": 2020,
        "rate": 5.18
      },
      {
        "year": 2021,
        "rate": 5.08
      },
      {
        "year": 2022,
        "rate": 4.98
      },
      {
        "year": 2023,
        "rate": 4.88
      },
      {
        "year": 2024,
        "rate": 4.79
      }
    ]
  },
  {
    "id": "comoros",
    "iso3": "COM",
    "name": "Comoros",
    "flag": "\ud83c\uddf0\ud83c\uddf2",
    "region": "Eastern",
    "latestRate": 3.82,
    "latestYear": 2024,
    "rate2020": 4.07,
    "rate2010": 4.75,
    "rate2000": 5.23,
    "rate1990": 6.5,
    "netChange2000toLatest": -1.41,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.5
      },
      {
        "year": 1991,
        "rate": 6.35
      },
      {
        "year": 1992,
        "rate": 6.19
      },
      {
        "year": 1993,
        "rate": 6.02
      },
      {
        "year": 1994,
        "rate": 5.86
      },
      {
        "year": 1995,
        "rate": 5.73
      },
      {
        "year": 1996,
        "rate": 5.63
      },
      {
        "year": 1997,
        "rate": 5.51
      },
      {
        "year": 1998,
        "rate": 5.39
      },
      {
        "year": 1999,
        "rate": 5.28
      },
      {
        "year": 2000,
        "rate": 5.23
      },
      {
        "year": 2001,
        "rate": 5.2
      },
      {
        "year": 2002,
        "rate": 5.16
      },
      {
        "year": 2003,
        "rate": 5.12
      },
      {
        "year": 2004,
        "rate": 5.07
      },
      {
        "year": 2005,
        "rate": 5.01
      },
      {
        "year": 2006,
        "rate": 4.93
      },
      {
        "year": 2007,
        "rate": 4.86
      },
      {
        "year": 2008,
        "rate": 4.8
      },
      {
        "year": 2009,
        "rate": 4.78
      },
      {
        "year": 2010,
        "rate": 4.75
      },
      {
        "year": 2011,
        "rate": 4.72
      },
      {
        "year": 2012,
        "rate": 4.65
      },
      {
        "year": 2013,
        "rate": 4.57
      },
      {
        "year": 2014,
        "rate": 4.49
      },
      {
        "year": 2015,
        "rate": 4.42
      },
      {
        "year": 2016,
        "rate": 4.35
      },
      {
        "year": 2017,
        "rate": 4.28
      },
      {
        "year": 2018,
        "rate": 4.21
      },
      {
        "year": 2019,
        "rate": 4.14
      },
      {
        "year": 2020,
        "rate": 4.07
      },
      {
        "year": 2021,
        "rate": 4.0
      },
      {
        "year": 2022,
        "rate": 3.94
      },
      {
        "year": 2023,
        "rate": 3.88
      },
      {
        "year": 2024,
        "rate": 3.82
      }
    ]
  },
  {
    "id": "djibouti",
    "iso3": "DJI",
    "name": "Djibouti",
    "flag": "\ud83c\udde9\ud83c\uddef",
    "region": "Eastern",
    "latestRate": 2.62,
    "latestYear": 2024,
    "rate2020": 2.75,
    "rate2010": 3.43,
    "rate2000": 4.6,
    "rate1990": 5.93,
    "netChange2000toLatest": -1.98,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 5.93
      },
      {
        "year": 1991,
        "rate": 5.86
      },
      {
        "year": 1992,
        "rate": 5.75
      },
      {
        "year": 1993,
        "rate": 5.64
      },
      {
        "year": 1994,
        "rate": 5.51
      },
      {
        "year": 1995,
        "rate": 5.33
      },
      {
        "year": 1996,
        "rate": 5.15
      },
      {
        "year": 1997,
        "rate": 4.97
      },
      {
        "year": 1998,
        "rate": 4.79
      },
      {
        "year": 1999,
        "rate": 4.69
      },
      {
        "year": 2000,
        "rate": 4.6
      },
      {
        "year": 2001,
        "rate": 4.52
      },
      {
        "year": 2002,
        "rate": 4.41
      },
      {
        "year": 2003,
        "rate": 4.3
      },
      {
        "year": 2004,
        "rate": 4.16
      },
      {
        "year": 2005,
        "rate": 4.04
      },
      {
        "year": 2006,
        "rate": 3.9
      },
      {
        "year": 2007,
        "rate": 3.76
      },
      {
        "year": 2008,
        "rate": 3.62
      },
      {
        "year": 2009,
        "rate": 3.52
      },
      {
        "year": 2010,
        "rate": 3.43
      },
      {
        "year": 2011,
        "rate": 3.34
      },
      {
        "year": 2012,
        "rate": 3.25
      },
      {
        "year": 2013,
        "rate": 3.19
      },
      {
        "year": 2014,
        "rate": 3.12
      },
      {
        "year": 2015,
        "rate": 3.04
      },
      {
        "year": 2016,
        "rate": 2.97
      },
      {
        "year": 2017,
        "rate": 2.92
      },
      {
        "year": 2018,
        "rate": 2.86
      },
      {
        "year": 2019,
        "rate": 2.8
      },
      {
        "year": 2020,
        "rate": 2.75
      },
      {
        "year": 2021,
        "rate": 2.7
      },
      {
        "year": 2022,
        "rate": 2.65
      },
      {
        "year": 2023,
        "rate": 2.61
      },
      {
        "year": 2024,
        "rate": 2.62
      }
    ]
  },
  {
    "id": "eritrea",
    "iso3": "ERI",
    "name": "Eritrea",
    "flag": "\ud83c\uddea\ud83c\uddf7",
    "region": "Eastern",
    "latestRate": 3.68,
    "latestYear": 2024,
    "rate2020": 3.93,
    "rate2010": 4.57,
    "rate2000": 5.4,
    "rate1990": 6.34,
    "netChange2000toLatest": -1.72,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.34
      },
      {
        "year": 1991,
        "rate": 6.24
      },
      {
        "year": 1992,
        "rate": 6.16
      },
      {
        "year": 1993,
        "rate": 6.07
      },
      {
        "year": 1994,
        "rate": 6.0
      },
      {
        "year": 1995,
        "rate": 5.94
      },
      {
        "year": 1996,
        "rate": 5.84
      },
      {
        "year": 1997,
        "rate": 5.74
      },
      {
        "year": 1998,
        "rate": 5.63
      },
      {
        "year": 1999,
        "rate": 5.52
      },
      {
        "year": 2000,
        "rate": 5.4
      },
      {
        "year": 2001,
        "rate": 5.31
      },
      {
        "year": 2002,
        "rate": 5.23
      },
      {
        "year": 2003,
        "rate": 5.14
      },
      {
        "year": 2004,
        "rate": 5.04
      },
      {
        "year": 2005,
        "rate": 4.93
      },
      {
        "year": 2006,
        "rate": 4.88
      },
      {
        "year": 2007,
        "rate": 4.81
      },
      {
        "year": 2008,
        "rate": 4.74
      },
      {
        "year": 2009,
        "rate": 4.66
      },
      {
        "year": 2010,
        "rate": 4.57
      },
      {
        "year": 2011,
        "rate": 4.49
      },
      {
        "year": 2012,
        "rate": 4.41
      },
      {
        "year": 2013,
        "rate": 4.33
      },
      {
        "year": 2014,
        "rate": 4.27
      },
      {
        "year": 2015,
        "rate": 4.22
      },
      {
        "year": 2016,
        "rate": 4.16
      },
      {
        "year": 2017,
        "rate": 4.11
      },
      {
        "year": 2018,
        "rate": 4.06
      },
      {
        "year": 2019,
        "rate": 4.0
      },
      {
        "year": 2020,
        "rate": 3.93
      },
      {
        "year": 2021,
        "rate": 3.87
      },
      {
        "year": 2022,
        "rate": 3.79
      },
      {
        "year": 2023,
        "rate": 3.71
      },
      {
        "year": 2024,
        "rate": 3.68
      }
    ]
  },
  {
    "id": "ethiopia",
    "iso3": "ETH",
    "name": "Ethiopia",
    "flag": "\ud83c\uddea\ud83c\uddf9",
    "region": "Eastern",
    "latestRate": 3.91,
    "latestYear": 2024,
    "rate2020": 4.27,
    "rate2010": 5.28,
    "rate2000": 6.65,
    "rate1990": 7.2,
    "netChange2000toLatest": -2.74,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 7.2
      },
      {
        "year": 1991,
        "rate": 7.16
      },
      {
        "year": 1992,
        "rate": 7.12
      },
      {
        "year": 1993,
        "rate": 7.09
      },
      {
        "year": 1994,
        "rate": 7.05
      },
      {
        "year": 1995,
        "rate": 7.0
      },
      {
        "year": 1996,
        "rate": 6.93
      },
      {
        "year": 1997,
        "rate": 6.87
      },
      {
        "year": 1998,
        "rate": 6.79
      },
      {
        "year": 1999,
        "rate": 6.72
      },
      {
        "year": 2000,
        "rate": 6.65
      },
      {
        "year": 2001,
        "rate": 6.58
      },
      {
        "year": 2002,
        "rate": 6.5
      },
      {
        "year": 2003,
        "rate": 6.4
      },
      {
        "year": 2004,
        "rate": 6.3
      },
      {
        "year": 2005,
        "rate": 6.19
      },
      {
        "year": 2006,
        "rate": 6.05
      },
      {
        "year": 2007,
        "rate": 5.89
      },
      {
        "year": 2008,
        "rate": 5.7
      },
      {
        "year": 2009,
        "rate": 5.49
      },
      {
        "year": 2010,
        "rate": 5.28
      },
      {
        "year": 2011,
        "rate": 5.08
      },
      {
        "year": 2012,
        "rate": 4.89
      },
      {
        "year": 2013,
        "rate": 4.71
      },
      {
        "year": 2014,
        "rate": 4.61
      },
      {
        "year": 2015,
        "rate": 4.53
      },
      {
        "year": 2016,
        "rate": 4.47
      },
      {
        "year": 2017,
        "rate": 4.4
      },
      {
        "year": 2018,
        "rate": 4.37
      },
      {
        "year": 2019,
        "rate": 4.35
      },
      {
        "year": 2020,
        "rate": 4.27
      },
      {
        "year": 2021,
        "rate": 4.18
      },
      {
        "year": 2022,
        "rate": 4.08
      },
      {
        "year": 2023,
        "rate": 3.99
      },
      {
        "year": 2024,
        "rate": 3.91
      }
    ]
  },
  {
    "id": "kenya",
    "iso3": "KEN",
    "name": "Kenya",
    "flag": "\ud83c\uddf0\ud83c\uddea",
    "region": "Eastern",
    "latestRate": 3.17,
    "latestYear": 2024,
    "rate2020": 3.36,
    "rate2010": 4.45,
    "rate2000": 5.14,
    "rate1990": 6.13,
    "netChange2000toLatest": -1.97,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.13
      },
      {
        "year": 1991,
        "rate": 5.94
      },
      {
        "year": 1992,
        "rate": 5.74
      },
      {
        "year": 1993,
        "rate": 5.57
      },
      {
        "year": 1994,
        "rate": 5.44
      },
      {
        "year": 1995,
        "rate": 5.37
      },
      {
        "year": 1996,
        "rate": 5.31
      },
      {
        "year": 1997,
        "rate": 5.27
      },
      {
        "year": 1998,
        "rate": 5.24
      },
      {
        "year": 1999,
        "rate": 5.18
      },
      {
        "year": 2000,
        "rate": 5.14
      },
      {
        "year": 2001,
        "rate": 5.09
      },
      {
        "year": 2002,
        "rate": 5.03
      },
      {
        "year": 2003,
        "rate": 4.94
      },
      {
        "year": 2004,
        "rate": 4.86
      },
      {
        "year": 2005,
        "rate": 4.8
      },
      {
        "year": 2006,
        "rate": 4.75
      },
      {
        "year": 2007,
        "rate": 4.72
      },
      {
        "year": 2008,
        "rate": 4.66
      },
      {
        "year": 2009,
        "rate": 4.57
      },
      {
        "year": 2010,
        "rate": 4.45
      },
      {
        "year": 2011,
        "rate": 4.28
      },
      {
        "year": 2012,
        "rate": 4.12
      },
      {
        "year": 2013,
        "rate": 3.96
      },
      {
        "year": 2014,
        "rate": 3.84
      },
      {
        "year": 2015,
        "rate": 3.77
      },
      {
        "year": 2016,
        "rate": 3.69
      },
      {
        "year": 2017,
        "rate": 3.61
      },
      {
        "year": 2018,
        "rate": 3.54
      },
      {
        "year": 2019,
        "rate": 3.43
      },
      {
        "year": 2020,
        "rate": 3.36
      },
      {
        "year": 2021,
        "rate": 3.31
      },
      {
        "year": 2022,
        "rate": 3.26
      },
      {
        "year": 2023,
        "rate": 3.21
      },
      {
        "year": 2024,
        "rate": 3.17
      }
    ]
  },
  {
    "id": "madagascar",
    "iso3": "MDG",
    "name": "Madagascar",
    "flag": "\ud83c\uddf2\ud83c\uddec",
    "region": "Eastern",
    "latestRate": 3.91,
    "latestYear": 2024,
    "rate2020": 4.17,
    "rate2010": 4.9,
    "rate2000": 5.67,
    "rate1990": 6.14,
    "netChange2000toLatest": -1.76,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.14
      },
      {
        "year": 1991,
        "rate": 6.12
      },
      {
        "year": 1992,
        "rate": 6.08
      },
      {
        "year": 1993,
        "rate": 6.06
      },
      {
        "year": 1994,
        "rate": 6.04
      },
      {
        "year": 1995,
        "rate": 6.04
      },
      {
        "year": 1996,
        "rate": 6.03
      },
      {
        "year": 1997,
        "rate": 6.02
      },
      {
        "year": 1998,
        "rate": 5.99
      },
      {
        "year": 1999,
        "rate": 5.84
      },
      {
        "year": 2000,
        "rate": 5.67
      },
      {
        "year": 2001,
        "rate": 5.53
      },
      {
        "year": 2002,
        "rate": 5.41
      },
      {
        "year": 2003,
        "rate": 5.33
      },
      {
        "year": 2004,
        "rate": 5.26
      },
      {
        "year": 2005,
        "rate": 5.2
      },
      {
        "year": 2006,
        "rate": 5.13
      },
      {
        "year": 2007,
        "rate": 5.08
      },
      {
        "year": 2008,
        "rate": 5.04
      },
      {
        "year": 2009,
        "rate": 5.0
      },
      {
        "year": 2010,
        "rate": 4.9
      },
      {
        "year": 2011,
        "rate": 4.74
      },
      {
        "year": 2012,
        "rate": 4.61
      },
      {
        "year": 2013,
        "rate": 4.53
      },
      {
        "year": 2014,
        "rate": 4.42
      },
      {
        "year": 2015,
        "rate": 4.33
      },
      {
        "year": 2016,
        "rate": 4.29
      },
      {
        "year": 2017,
        "rate": 4.26
      },
      {
        "year": 2018,
        "rate": 4.25
      },
      {
        "year": 2019,
        "rate": 4.22
      },
      {
        "year": 2020,
        "rate": 4.17
      },
      {
        "year": 2021,
        "rate": 4.1
      },
      {
        "year": 2022,
        "rate": 4.04
      },
      {
        "year": 2023,
        "rate": 3.97
      },
      {
        "year": 2024,
        "rate": 3.91
      }
    ]
  },
  {
    "id": "malawi",
    "iso3": "MWI",
    "name": "Malawi",
    "flag": "\ud83c\uddf2\ud83c\uddfc",
    "region": "Eastern",
    "latestRate": 3.59,
    "latestYear": 2024,
    "rate2020": 3.88,
    "rate2010": 5.26,
    "rate2000": 6.0,
    "rate1990": 6.74,
    "netChange2000toLatest": -2.41,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.74
      },
      {
        "year": 1991,
        "rate": 6.68
      },
      {
        "year": 1992,
        "rate": 6.63
      },
      {
        "year": 1993,
        "rate": 6.57
      },
      {
        "year": 1994,
        "rate": 6.49
      },
      {
        "year": 1995,
        "rate": 6.39
      },
      {
        "year": 1996,
        "rate": 6.29
      },
      {
        "year": 1997,
        "rate": 6.23
      },
      {
        "year": 1998,
        "rate": 6.21
      },
      {
        "year": 1999,
        "rate": 6.12
      },
      {
        "year": 2000,
        "rate": 6.0
      },
      {
        "year": 2001,
        "rate": 5.94
      },
      {
        "year": 2002,
        "rate": 5.9
      },
      {
        "year": 2003,
        "rate": 5.88
      },
      {
        "year": 2004,
        "rate": 5.86
      },
      {
        "year": 2005,
        "rate": 5.85
      },
      {
        "year": 2006,
        "rate": 5.8
      },
      {
        "year": 2007,
        "rate": 5.72
      },
      {
        "year": 2008,
        "rate": 5.61
      },
      {
        "year": 2009,
        "rate": 5.45
      },
      {
        "year": 2010,
        "rate": 5.26
      },
      {
        "year": 2011,
        "rate": 5.08
      },
      {
        "year": 2012,
        "rate": 4.9
      },
      {
        "year": 2013,
        "rate": 4.76
      },
      {
        "year": 2014,
        "rate": 4.57
      },
      {
        "year": 2015,
        "rate": 4.38
      },
      {
        "year": 2016,
        "rate": 4.22
      },
      {
        "year": 2017,
        "rate": 4.11
      },
      {
        "year": 2018,
        "rate": 4.02
      },
      {
        "year": 2019,
        "rate": 3.95
      },
      {
        "year": 2020,
        "rate": 3.88
      },
      {
        "year": 2021,
        "rate": 3.79
      },
      {
        "year": 2022,
        "rate": 3.72
      },
      {
        "year": 2023,
        "rate": 3.65
      },
      {
        "year": 2024,
        "rate": 3.59
      }
    ]
  },
  {
    "id": "mauritius",
    "iso3": "MUS",
    "name": "Mauritius",
    "flag": "\ud83c\uddf2\ud83c\uddfa",
    "region": "Eastern",
    "latestRate": 1.44,
    "latestYear": 2024,
    "rate2020": 1.46,
    "rate2010": 1.57,
    "rate2000": 1.99,
    "rate1990": 2.32,
    "netChange2000toLatest": -0.55,
    "stage": "Sub-Replacement",
    "demographicNotes": "Below replacement threshold of 2.1; experiencing population aging and shifting towards healthcare longevity financing.",
    "history": [
      {
        "year": 1990,
        "rate": 2.32
      },
      {
        "year": 1991,
        "rate": 2.3
      },
      {
        "year": 1992,
        "rate": 2.37
      },
      {
        "year": 1993,
        "rate": 2.21
      },
      {
        "year": 1994,
        "rate": 2.25
      },
      {
        "year": 1995,
        "rate": 2.14
      },
      {
        "year": 1996,
        "rate": 2.12
      },
      {
        "year": 1997,
        "rate": 2.04
      },
      {
        "year": 1998,
        "rate": 1.97
      },
      {
        "year": 1999,
        "rate": 2.05
      },
      {
        "year": 2000,
        "rate": 1.99
      },
      {
        "year": 2001,
        "rate": 1.91
      },
      {
        "year": 2002,
        "rate": 1.94
      },
      {
        "year": 2003,
        "rate": 1.87
      },
      {
        "year": 2004,
        "rate": 1.92
      },
      {
        "year": 2005,
        "rate": 1.88
      },
      {
        "year": 2006,
        "rate": 1.77
      },
      {
        "year": 2007,
        "rate": 1.74
      },
      {
        "year": 2008,
        "rate": 1.67
      },
      {
        "year": 2009,
        "rate": 1.59
      },
      {
        "year": 2010,
        "rate": 1.57
      },
      {
        "year": 2011,
        "rate": 1.55
      },
      {
        "year": 2012,
        "rate": 1.56
      },
      {
        "year": 2013,
        "rate": 1.45
      },
      {
        "year": 2014,
        "rate": 1.44
      },
      {
        "year": 2015,
        "rate": 1.37
      },
      {
        "year": 2016,
        "rate": 1.41
      },
      {
        "year": 2017,
        "rate": 1.46
      },
      {
        "year": 2018,
        "rate": 1.42
      },
      {
        "year": 2019,
        "rate": 1.41
      },
      {
        "year": 2020,
        "rate": 1.46
      },
      {
        "year": 2021,
        "rate": 1.42
      },
      {
        "year": 2022,
        "rate": 1.33
      },
      {
        "year": 2023,
        "rate": 1.4
      },
      {
        "year": 2024,
        "rate": 1.44
      }
    ]
  },
  {
    "id": "mozambique",
    "iso3": "MOZ",
    "name": "Mozambique",
    "flag": "\ud83c\uddf2\ud83c\uddff",
    "region": "Eastern",
    "latestRate": 4.69,
    "latestYear": 2024,
    "rate2020": 4.96,
    "rate2010": 5.66,
    "rate2000": 5.83,
    "rate1990": 6.32,
    "netChange2000toLatest": -1.14,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.32
      },
      {
        "year": 1991,
        "rate": 6.28
      },
      {
        "year": 1992,
        "rate": 6.22
      },
      {
        "year": 1993,
        "rate": 6.15
      },
      {
        "year": 1994,
        "rate": 6.08
      },
      {
        "year": 1995,
        "rate": 6.02
      },
      {
        "year": 1996,
        "rate": 5.97
      },
      {
        "year": 1997,
        "rate": 5.93
      },
      {
        "year": 1998,
        "rate": 5.91
      },
      {
        "year": 1999,
        "rate": 5.88
      },
      {
        "year": 2000,
        "rate": 5.83
      },
      {
        "year": 2001,
        "rate": 5.75
      },
      {
        "year": 2002,
        "rate": 5.67
      },
      {
        "year": 2003,
        "rate": 5.6
      },
      {
        "year": 2004,
        "rate": 5.55
      },
      {
        "year": 2005,
        "rate": 5.5
      },
      {
        "year": 2006,
        "rate": 5.45
      },
      {
        "year": 2007,
        "rate": 5.47
      },
      {
        "year": 2008,
        "rate": 5.6
      },
      {
        "year": 2009,
        "rate": 5.68
      },
      {
        "year": 2010,
        "rate": 5.66
      },
      {
        "year": 2011,
        "rate": 5.6
      },
      {
        "year": 2012,
        "rate": 5.52
      },
      {
        "year": 2013,
        "rate": 5.43
      },
      {
        "year": 2014,
        "rate": 5.3
      },
      {
        "year": 2015,
        "rate": 5.25
      },
      {
        "year": 2016,
        "rate": 5.19
      },
      {
        "year": 2017,
        "rate": 5.13
      },
      {
        "year": 2018,
        "rate": 5.07
      },
      {
        "year": 2019,
        "rate": 5.02
      },
      {
        "year": 2020,
        "rate": 4.96
      },
      {
        "year": 2021,
        "rate": 4.91
      },
      {
        "year": 2022,
        "rate": 4.84
      },
      {
        "year": 2023,
        "rate": 4.76
      },
      {
        "year": 2024,
        "rate": 4.69
      }
    ]
  },
  {
    "id": "rwanda",
    "iso3": "RWA",
    "name": "Rwanda",
    "flag": "\ud83c\uddf7\ud83c\uddfc",
    "region": "Eastern",
    "latestRate": 3.65,
    "latestYear": 2024,
    "rate2020": 3.91,
    "rate2010": 4.52,
    "rate2000": 5.97,
    "rate1990": 6.8,
    "netChange2000toLatest": -2.32,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.8
      },
      {
        "year": 1991,
        "rate": 6.62
      },
      {
        "year": 1992,
        "rate": 6.54
      },
      {
        "year": 1993,
        "rate": 6.48
      },
      {
        "year": 1994,
        "rate": 6.42
      },
      {
        "year": 1995,
        "rate": 6.34
      },
      {
        "year": 1996,
        "rate": 6.29
      },
      {
        "year": 1997,
        "rate": 6.24
      },
      {
        "year": 1998,
        "rate": 6.17
      },
      {
        "year": 1999,
        "rate": 6.06
      },
      {
        "year": 2000,
        "rate": 5.97
      },
      {
        "year": 2001,
        "rate": 5.89
      },
      {
        "year": 2002,
        "rate": 5.82
      },
      {
        "year": 2003,
        "rate": 5.74
      },
      {
        "year": 2004,
        "rate": 5.64
      },
      {
        "year": 2005,
        "rate": 5.5
      },
      {
        "year": 2006,
        "rate": 5.33
      },
      {
        "year": 2007,
        "rate": 5.14
      },
      {
        "year": 2008,
        "rate": 4.92
      },
      {
        "year": 2009,
        "rate": 4.71
      },
      {
        "year": 2010,
        "rate": 4.52
      },
      {
        "year": 2011,
        "rate": 4.33
      },
      {
        "year": 2012,
        "rate": 4.2
      },
      {
        "year": 2013,
        "rate": 4.14
      },
      {
        "year": 2014,
        "rate": 4.12
      },
      {
        "year": 2015,
        "rate": 4.11
      },
      {
        "year": 2016,
        "rate": 4.11
      },
      {
        "year": 2017,
        "rate": 4.08
      },
      {
        "year": 2018,
        "rate": 4.05
      },
      {
        "year": 2019,
        "rate": 3.98
      },
      {
        "year": 2020,
        "rate": 3.91
      },
      {
        "year": 2021,
        "rate": 3.84
      },
      {
        "year": 2022,
        "rate": 3.78
      },
      {
        "year": 2023,
        "rate": 3.7
      },
      {
        "year": 2024,
        "rate": 3.65
      }
    ]
  },
  {
    "id": "seychelles",
    "iso3": "SYC",
    "name": "Seychelles",
    "flag": "\ud83c\uddf8\ud83c\udde8",
    "region": "Eastern",
    "latestRate": 1.85,
    "latestYear": 2024,
    "rate2020": 2.2,
    "rate2010": 2.13,
    "rate2000": 2.08,
    "rate1990": 2.61,
    "netChange2000toLatest": -0.23,
    "stage": "Sub-Replacement",
    "demographicNotes": "Below replacement threshold of 2.1; experiencing population aging and shifting towards healthcare longevity financing.",
    "history": [
      {
        "year": 1990,
        "rate": 2.61
      },
      {
        "year": 1991,
        "rate": 2.69
      },
      {
        "year": 1992,
        "rate": 2.53
      },
      {
        "year": 1993,
        "rate": 2.58
      },
      {
        "year": 1994,
        "rate": 2.6
      },
      {
        "year": 1995,
        "rate": 2.36
      },
      {
        "year": 1996,
        "rate": 2.31
      },
      {
        "year": 1997,
        "rate": 2.1
      },
      {
        "year": 1998,
        "rate": 2.04
      },
      {
        "year": 1999,
        "rate": 2.04
      },
      {
        "year": 2000,
        "rate": 2.08
      },
      {
        "year": 2001,
        "rate": 1.98
      },
      {
        "year": 2002,
        "rate": 2.04
      },
      {
        "year": 2003,
        "rate": 2.06
      },
      {
        "year": 2004,
        "rate": 2.01
      },
      {
        "year": 2005,
        "rate": 2.2
      },
      {
        "year": 2006,
        "rate": 2.11
      },
      {
        "year": 2007,
        "rate": 2.24
      },
      {
        "year": 2008,
        "rate": 2.33
      },
      {
        "year": 2009,
        "rate": 2.38
      },
      {
        "year": 2010,
        "rate": 2.13
      },
      {
        "year": 2011,
        "rate": 2.3
      },
      {
        "year": 2012,
        "rate": 2.32
      },
      {
        "year": 2013,
        "rate": 2.21
      },
      {
        "year": 2014,
        "rate": 2.19
      },
      {
        "year": 2015,
        "rate": 2.26
      },
      {
        "year": 2016,
        "rate": 2.33
      },
      {
        "year": 2017,
        "rate": 2.34
      },
      {
        "year": 2018,
        "rate": 2.34
      },
      {
        "year": 2019,
        "rate": 2.31
      },
      {
        "year": 2020,
        "rate": 2.2
      },
      {
        "year": 2021,
        "rate": 2.38
      },
      {
        "year": 2022,
        "rate": 2.2
      },
      {
        "year": 2023,
        "rate": 2.18
      },
      {
        "year": 2024,
        "rate": 1.85
      }
    ]
  },
  {
    "id": "somalia",
    "iso3": "SOM",
    "name": "Somalia",
    "flag": "\ud83c\uddf8\ud83c\uddf4",
    "region": "Eastern",
    "latestRate": 6.01,
    "latestYear": 2024,
    "rate2020": 6.45,
    "rate2010": 7.32,
    "rate2000": 7.64,
    "rate1990": 7.44,
    "netChange2000toLatest": -1.63,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 7.44
      },
      {
        "year": 1991,
        "rate": 7.47
      },
      {
        "year": 1992,
        "rate": 7.5
      },
      {
        "year": 1993,
        "rate": 7.53
      },
      {
        "year": 1994,
        "rate": 7.54
      },
      {
        "year": 1995,
        "rate": 7.58
      },
      {
        "year": 1996,
        "rate": 7.62
      },
      {
        "year": 1997,
        "rate": 7.66
      },
      {
        "year": 1998,
        "rate": 7.66
      },
      {
        "year": 1999,
        "rate": 7.66
      },
      {
        "year": 2000,
        "rate": 7.64
      },
      {
        "year": 2001,
        "rate": 7.64
      },
      {
        "year": 2002,
        "rate": 7.63
      },
      {
        "year": 2003,
        "rate": 7.6
      },
      {
        "year": 2004,
        "rate": 7.57
      },
      {
        "year": 2005,
        "rate": 7.53
      },
      {
        "year": 2006,
        "rate": 7.49
      },
      {
        "year": 2007,
        "rate": 7.46
      },
      {
        "year": 2008,
        "rate": 7.42
      },
      {
        "year": 2009,
        "rate": 7.38
      },
      {
        "year": 2010,
        "rate": 7.32
      },
      {
        "year": 2011,
        "rate": 7.27
      },
      {
        "year": 2012,
        "rate": 7.21
      },
      {
        "year": 2013,
        "rate": 7.14
      },
      {
        "year": 2014,
        "rate": 7.06
      },
      {
        "year": 2015,
        "rate": 6.97
      },
      {
        "year": 2016,
        "rate": 6.88
      },
      {
        "year": 2017,
        "rate": 6.77
      },
      {
        "year": 2018,
        "rate": 6.66
      },
      {
        "year": 2019,
        "rate": 6.56
      },
      {
        "year": 2020,
        "rate": 6.45
      },
      {
        "year": 2021,
        "rate": 6.35
      },
      {
        "year": 2022,
        "rate": 6.25
      },
      {
        "year": 2023,
        "rate": 6.13
      },
      {
        "year": 2024,
        "rate": 6.01
      }
    ]
  },
  {
    "id": "south-sudan",
    "iso3": "SSD",
    "name": "South Sudan",
    "flag": "\ud83c\uddf8\ud83c\uddf8",
    "region": "Eastern",
    "latestRate": 3.79,
    "latestYear": 2024,
    "rate2020": 4.16,
    "rate2010": 5.32,
    "rate2000": 6.8,
    "rate1990": 7.38,
    "netChange2000toLatest": -3.01,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 7.38
      },
      {
        "year": 1991,
        "rate": 7.38
      },
      {
        "year": 1992,
        "rate": 7.37
      },
      {
        "year": 1993,
        "rate": 7.36
      },
      {
        "year": 1994,
        "rate": 7.35
      },
      {
        "year": 1995,
        "rate": 7.34
      },
      {
        "year": 1996,
        "rate": 7.32
      },
      {
        "year": 1997,
        "rate": 7.2
      },
      {
        "year": 1998,
        "rate": 7.08
      },
      {
        "year": 1999,
        "rate": 6.94
      },
      {
        "year": 2000,
        "rate": 6.8
      },
      {
        "year": 2001,
        "rate": 6.65
      },
      {
        "year": 2002,
        "rate": 6.51
      },
      {
        "year": 2003,
        "rate": 6.35
      },
      {
        "year": 2004,
        "rate": 6.19
      },
      {
        "year": 2005,
        "rate": 6.02
      },
      {
        "year": 2006,
        "rate": 5.85
      },
      {
        "year": 2007,
        "rate": 5.7
      },
      {
        "year": 2008,
        "rate": 5.57
      },
      {
        "year": 2009,
        "rate": 5.45
      },
      {
        "year": 2010,
        "rate": 5.32
      },
      {
        "year": 2011,
        "rate": 5.19
      },
      {
        "year": 2012,
        "rate": 5.06
      },
      {
        "year": 2013,
        "rate": 4.94
      },
      {
        "year": 2014,
        "rate": 4.82
      },
      {
        "year": 2015,
        "rate": 4.7
      },
      {
        "year": 2016,
        "rate": 4.58
      },
      {
        "year": 2017,
        "rate": 4.48
      },
      {
        "year": 2018,
        "rate": 4.37
      },
      {
        "year": 2019,
        "rate": 4.26
      },
      {
        "year": 2020,
        "rate": 4.16
      },
      {
        "year": 2021,
        "rate": 4.05
      },
      {
        "year": 2022,
        "rate": 3.96
      },
      {
        "year": 2023,
        "rate": 3.86
      },
      {
        "year": 2024,
        "rate": 3.79
      }
    ]
  },
  {
    "id": "tanzania",
    "iso3": "TZA",
    "name": "Tanzania",
    "flag": "\ud83c\uddf9\ud83c\uddff",
    "region": "Eastern",
    "latestRate": 4.54,
    "latestYear": 2024,
    "rate2020": 4.8,
    "rate2010": 5.22,
    "rate2000": 5.67,
    "rate1990": 6.2,
    "netChange2000toLatest": -1.13,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.2
      },
      {
        "year": 1991,
        "rate": 6.13
      },
      {
        "year": 1992,
        "rate": 6.08
      },
      {
        "year": 1993,
        "rate": 6.0
      },
      {
        "year": 1994,
        "rate": 5.89
      },
      {
        "year": 1995,
        "rate": 5.82
      },
      {
        "year": 1996,
        "rate": 5.83
      },
      {
        "year": 1997,
        "rate": 5.84
      },
      {
        "year": 1998,
        "rate": 5.81
      },
      {
        "year": 1999,
        "rate": 5.75
      },
      {
        "year": 2000,
        "rate": 5.67
      },
      {
        "year": 2001,
        "rate": 5.62
      },
      {
        "year": 2002,
        "rate": 5.57
      },
      {
        "year": 2003,
        "rate": 5.58
      },
      {
        "year": 2004,
        "rate": 5.6
      },
      {
        "year": 2005,
        "rate": 5.58
      },
      {
        "year": 2006,
        "rate": 5.51
      },
      {
        "year": 2007,
        "rate": 5.4
      },
      {
        "year": 2008,
        "rate": 5.32
      },
      {
        "year": 2009,
        "rate": 5.26
      },
      {
        "year": 2010,
        "rate": 5.22
      },
      {
        "year": 2011,
        "rate": 5.14
      },
      {
        "year": 2012,
        "rate": 5.14
      },
      {
        "year": 2013,
        "rate": 5.16
      },
      {
        "year": 2014,
        "rate": 5.12
      },
      {
        "year": 2015,
        "rate": 5.03
      },
      {
        "year": 2016,
        "rate": 5.01
      },
      {
        "year": 2017,
        "rate": 4.99
      },
      {
        "year": 2018,
        "rate": 4.93
      },
      {
        "year": 2019,
        "rate": 4.87
      },
      {
        "year": 2020,
        "rate": 4.8
      },
      {
        "year": 2021,
        "rate": 4.73
      },
      {
        "year": 2022,
        "rate": 4.67
      },
      {
        "year": 2023,
        "rate": 4.61
      },
      {
        "year": 2024,
        "rate": 4.54
      }
    ]
  },
  {
    "id": "uganda",
    "iso3": "UGA",
    "name": "Uganda",
    "flag": "\ud83c\uddfa\ud83c\uddec",
    "region": "Eastern",
    "latestRate": 4.17,
    "latestYear": 2024,
    "rate2020": 4.62,
    "rate2010": 6.02,
    "rate2000": 6.79,
    "rate1990": 7.01,
    "netChange2000toLatest": -2.62,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 7.01
      },
      {
        "year": 1991,
        "rate": 6.94
      },
      {
        "year": 1992,
        "rate": 6.91
      },
      {
        "year": 1993,
        "rate": 6.89
      },
      {
        "year": 1994,
        "rate": 6.9
      },
      {
        "year": 1995,
        "rate": 6.87
      },
      {
        "year": 1996,
        "rate": 6.83
      },
      {
        "year": 1997,
        "rate": 6.86
      },
      {
        "year": 1998,
        "rate": 6.84
      },
      {
        "year": 1999,
        "rate": 6.83
      },
      {
        "year": 2000,
        "rate": 6.79
      },
      {
        "year": 2001,
        "rate": 6.76
      },
      {
        "year": 2002,
        "rate": 6.74
      },
      {
        "year": 2003,
        "rate": 6.67
      },
      {
        "year": 2004,
        "rate": 6.61
      },
      {
        "year": 2005,
        "rate": 6.53
      },
      {
        "year": 2006,
        "rate": 6.43
      },
      {
        "year": 2007,
        "rate": 6.33
      },
      {
        "year": 2008,
        "rate": 6.2
      },
      {
        "year": 2009,
        "rate": 6.12
      },
      {
        "year": 2010,
        "rate": 6.02
      },
      {
        "year": 2011,
        "rate": 5.88
      },
      {
        "year": 2012,
        "rate": 5.73
      },
      {
        "year": 2013,
        "rate": 5.56
      },
      {
        "year": 2014,
        "rate": 5.41
      },
      {
        "year": 2015,
        "rate": 5.25
      },
      {
        "year": 2016,
        "rate": 5.11
      },
      {
        "year": 2017,
        "rate": 4.99
      },
      {
        "year": 2018,
        "rate": 4.87
      },
      {
        "year": 2019,
        "rate": 4.74
      },
      {
        "year": 2020,
        "rate": 4.62
      },
      {
        "year": 2021,
        "rate": 4.51
      },
      {
        "year": 2022,
        "rate": 4.39
      },
      {
        "year": 2023,
        "rate": 4.28
      },
      {
        "year": 2024,
        "rate": 4.17
      }
    ]
  },
  {
    "id": "zambia",
    "iso3": "ZMB",
    "name": "Zambia",
    "flag": "\ud83c\uddff\ud83c\uddf2",
    "region": "Eastern",
    "latestRate": 4.04,
    "latestYear": 2024,
    "rate2020": 4.32,
    "rate2010": 5.36,
    "rate2000": 5.92,
    "rate1990": 6.57,
    "netChange2000toLatest": -1.88,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.57
      },
      {
        "year": 1991,
        "rate": 6.46
      },
      {
        "year": 1992,
        "rate": 6.35
      },
      {
        "year": 1993,
        "rate": 6.3
      },
      {
        "year": 1994,
        "rate": 6.26
      },
      {
        "year": 1995,
        "rate": 6.23
      },
      {
        "year": 1996,
        "rate": 6.18
      },
      {
        "year": 1997,
        "rate": 6.12
      },
      {
        "year": 1998,
        "rate": 6.07
      },
      {
        "year": 1999,
        "rate": 6.0
      },
      {
        "year": 2000,
        "rate": 5.92
      },
      {
        "year": 2001,
        "rate": 5.85
      },
      {
        "year": 2002,
        "rate": 5.77
      },
      {
        "year": 2003,
        "rate": 5.71
      },
      {
        "year": 2004,
        "rate": 5.7
      },
      {
        "year": 2005,
        "rate": 5.7
      },
      {
        "year": 2006,
        "rate": 5.68
      },
      {
        "year": 2007,
        "rate": 5.61
      },
      {
        "year": 2008,
        "rate": 5.53
      },
      {
        "year": 2009,
        "rate": 5.45
      },
      {
        "year": 2010,
        "rate": 5.36
      },
      {
        "year": 2011,
        "rate": 5.26
      },
      {
        "year": 2012,
        "rate": 5.14
      },
      {
        "year": 2013,
        "rate": 5.01
      },
      {
        "year": 2014,
        "rate": 4.89
      },
      {
        "year": 2015,
        "rate": 4.78
      },
      {
        "year": 2016,
        "rate": 4.67
      },
      {
        "year": 2017,
        "rate": 4.57
      },
      {
        "year": 2018,
        "rate": 4.49
      },
      {
        "year": 2019,
        "rate": 4.42
      },
      {
        "year": 2020,
        "rate": 4.32
      },
      {
        "year": 2021,
        "rate": 4.25
      },
      {
        "year": 2022,
        "rate": 4.17
      },
      {
        "year": 2023,
        "rate": 4.1
      },
      {
        "year": 2024,
        "rate": 4.04
      }
    ]
  },
  {
    "id": "zimbabwe",
    "iso3": "ZWE",
    "name": "Zimbabwe",
    "flag": "\ud83c\uddff\ud83c\uddfc",
    "region": "Eastern",
    "latestRate": 3.67,
    "latestYear": 2024,
    "rate2020": 3.75,
    "rate2010": 4.04,
    "rate2000": 4.01,
    "rate1990": 4.88,
    "netChange2000toLatest": -0.34,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 4.88
      },
      {
        "year": 1991,
        "rate": 4.71
      },
      {
        "year": 1992,
        "rate": 4.57
      },
      {
        "year": 1993,
        "rate": 4.39
      },
      {
        "year": 1994,
        "rate": 4.28
      },
      {
        "year": 1995,
        "rate": 4.15
      },
      {
        "year": 1996,
        "rate": 4.11
      },
      {
        "year": 1997,
        "rate": 4.08
      },
      {
        "year": 1998,
        "rate": 4.07
      },
      {
        "year": 1999,
        "rate": 4.06
      },
      {
        "year": 2000,
        "rate": 4.01
      },
      {
        "year": 2001,
        "rate": 3.98
      },
      {
        "year": 2002,
        "rate": 3.92
      },
      {
        "year": 2003,
        "rate": 3.86
      },
      {
        "year": 2004,
        "rate": 3.78
      },
      {
        "year": 2005,
        "rate": 3.69
      },
      {
        "year": 2006,
        "rate": 3.63
      },
      {
        "year": 2007,
        "rate": 3.68
      },
      {
        "year": 2008,
        "rate": 3.78
      },
      {
        "year": 2009,
        "rate": 3.95
      },
      {
        "year": 2010,
        "rate": 4.04
      },
      {
        "year": 2011,
        "rate": 4.13
      },
      {
        "year": 2012,
        "rate": 4.13
      },
      {
        "year": 2013,
        "rate": 4.11
      },
      {
        "year": 2014,
        "rate": 4.01
      },
      {
        "year": 2015,
        "rate": 3.91
      },
      {
        "year": 2016,
        "rate": 3.83
      },
      {
        "year": 2017,
        "rate": 3.77
      },
      {
        "year": 2018,
        "rate": 3.74
      },
      {
        "year": 2019,
        "rate": 3.75
      },
      {
        "year": 2020,
        "rate": 3.75
      },
      {
        "year": 2021,
        "rate": 3.77
      },
      {
        "year": 2022,
        "rate": 3.77
      },
      {
        "year": 2023,
        "rate": 3.72
      },
      {
        "year": 2024,
        "rate": 3.67
      }
    ]
  },
  {
    "id": "cameroon",
    "iso3": "CMR",
    "name": "Cameroon",
    "flag": "\ud83c\udde8\ud83c\uddf2",
    "region": "Central",
    "latestRate": 4.26,
    "latestYear": 2024,
    "rate2020": 4.56,
    "rate2010": 5.15,
    "rate2000": 5.51,
    "rate1990": 6.36,
    "netChange2000toLatest": -1.25,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 6.36
      },
      {
        "year": 1991,
        "rate": 6.32
      },
      {
        "year": 1992,
        "rate": 6.26
      },
      {
        "year": 1993,
        "rate": 6.16
      },
      {
        "year": 1994,
        "rate": 6.04
      },
      {
        "year": 1995,
        "rate": 5.92
      },
      {
        "year": 1996,
        "rate": 5.79
      },
      {
        "year": 1997,
        "rate": 5.71
      },
      {
        "year": 1998,
        "rate": 5.66
      },
      {
        "year": 1999,
        "rate": 5.6
      },
      {
        "year": 2000,
        "rate": 5.51
      },
      {
        "year": 2001,
        "rate": 5.44
      },
      {
        "year": 2002,
        "rate": 5.43
      },
      {
        "year": 2003,
        "rate": 5.43
      },
      {
        "year": 2004,
        "rate": 5.44
      },
      {
        "year": 2005,
        "rate": 5.42
      },
      {
        "year": 2006,
        "rate": 5.37
      },
      {
        "year": 2007,
        "rate": 5.34
      },
      {
        "year": 2008,
        "rate": 5.29
      },
      {
        "year": 2009,
        "rate": 5.24
      },
      {
        "year": 2010,
        "rate": 5.15
      },
      {
        "year": 2011,
        "rate": 5.05
      },
      {
        "year": 2012,
        "rate": 4.98
      },
      {
        "year": 2013,
        "rate": 4.91
      },
      {
        "year": 2014,
        "rate": 4.84
      },
      {
        "year": 2015,
        "rate": 4.84
      },
      {
        "year": 2016,
        "rate": 4.84
      },
      {
        "year": 2017,
        "rate": 4.8
      },
      {
        "year": 2018,
        "rate": 4.74
      },
      {
        "year": 2019,
        "rate": 4.65
      },
      {
        "year": 2020,
        "rate": 4.56
      },
      {
        "year": 2021,
        "rate": 4.47
      },
      {
        "year": 2022,
        "rate": 4.4
      },
      {
        "year": 2023,
        "rate": 4.32
      },
      {
        "year": 2024,
        "rate": 4.26
      }
    ]
  },
  {
    "id": "central-african-republic",
    "iso3": "CAF",
    "name": "Central African Republic",
    "flag": "\ud83c\udde8\ud83c\uddeb",
    "region": "Central",
    "latestRate": 5.95,
    "latestYear": 2024,
    "rate2020": 6.06,
    "rate2010": 5.96,
    "rate2000": 5.85,
    "rate1990": 6.05,
    "netChange2000toLatest": 0.1,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 6.05
      },
      {
        "year": 1991,
        "rate": 6.03
      },
      {
        "year": 1992,
        "rate": 5.96
      },
      {
        "year": 1993,
        "rate": 5.93
      },
      {
        "year": 1994,
        "rate": 5.92
      },
      {
        "year": 1995,
        "rate": 5.94
      },
      {
        "year": 1996,
        "rate": 5.96
      },
      {
        "year": 1997,
        "rate": 5.92
      },
      {
        "year": 1998,
        "rate": 5.89
      },
      {
        "year": 1999,
        "rate": 5.88
      },
      {
        "year": 2000,
        "rate": 5.85
      },
      {
        "year": 2001,
        "rate": 5.81
      },
      {
        "year": 2002,
        "rate": 5.79
      },
      {
        "year": 2003,
        "rate": 5.8
      },
      {
        "year": 2004,
        "rate": 5.78
      },
      {
        "year": 2005,
        "rate": 5.81
      },
      {
        "year": 2006,
        "rate": 5.84
      },
      {
        "year": 2007,
        "rate": 5.87
      },
      {
        "year": 2008,
        "rate": 5.9
      },
      {
        "year": 2009,
        "rate": 5.94
      },
      {
        "year": 2010,
        "rate": 5.96
      },
      {
        "year": 2011,
        "rate": 6.01
      },
      {
        "year": 2012,
        "rate": 6.05
      },
      {
        "year": 2013,
        "rate": 6.08
      },
      {
        "year": 2014,
        "rate": 6.1
      },
      {
        "year": 2015,
        "rate": 6.13
      },
      {
        "year": 2016,
        "rate": 6.13
      },
      {
        "year": 2017,
        "rate": 6.13
      },
      {
        "year": 2018,
        "rate": 6.11
      },
      {
        "year": 2019,
        "rate": 6.09
      },
      {
        "year": 2020,
        "rate": 6.06
      },
      {
        "year": 2021,
        "rate": 6.05
      },
      {
        "year": 2022,
        "rate": 6.02
      },
      {
        "year": 2023,
        "rate": 6.01
      },
      {
        "year": 2024,
        "rate": 5.95
      }
    ]
  },
  {
    "id": "chad",
    "iso3": "TCD",
    "name": "Chad",
    "flag": "\ud83c\uddf9\ud83c\udde9",
    "region": "Central",
    "latestRate": 6.03,
    "latestYear": 2024,
    "rate2020": 6.35,
    "rate2010": 6.99,
    "rate2000": 7.25,
    "rate1990": 7.22,
    "netChange2000toLatest": -1.22,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 7.22
      },
      {
        "year": 1991,
        "rate": 7.26
      },
      {
        "year": 1992,
        "rate": 7.3
      },
      {
        "year": 1993,
        "rate": 7.34
      },
      {
        "year": 1994,
        "rate": 7.31
      },
      {
        "year": 1995,
        "rate": 7.29
      },
      {
        "year": 1996,
        "rate": 7.29
      },
      {
        "year": 1997,
        "rate": 7.27
      },
      {
        "year": 1998,
        "rate": 7.27
      },
      {
        "year": 1999,
        "rate": 7.26
      },
      {
        "year": 2000,
        "rate": 7.25
      },
      {
        "year": 2001,
        "rate": 7.23
      },
      {
        "year": 2002,
        "rate": 7.2
      },
      {
        "year": 2003,
        "rate": 7.18
      },
      {
        "year": 2004,
        "rate": 7.16
      },
      {
        "year": 2005,
        "rate": 7.13
      },
      {
        "year": 2006,
        "rate": 7.12
      },
      {
        "year": 2007,
        "rate": 7.09
      },
      {
        "year": 2008,
        "rate": 7.06
      },
      {
        "year": 2009,
        "rate": 7.02
      },
      {
        "year": 2010,
        "rate": 6.99
      },
      {
        "year": 2011,
        "rate": 6.95
      },
      {
        "year": 2012,
        "rate": 6.91
      },
      {
        "year": 2013,
        "rate": 6.84
      },
      {
        "year": 2014,
        "rate": 6.78
      },
      {
        "year": 2015,
        "rate": 6.71
      },
      {
        "year": 2016,
        "rate": 6.62
      },
      {
        "year": 2017,
        "rate": 6.54
      },
      {
        "year": 2018,
        "rate": 6.46
      },
      {
        "year": 2019,
        "rate": 6.41
      },
      {
        "year": 2020,
        "rate": 6.35
      },
      {
        "year": 2021,
        "rate": 6.25
      },
      {
        "year": 2022,
        "rate": 6.21
      },
      {
        "year": 2023,
        "rate": 6.12
      },
      {
        "year": 2024,
        "rate": 6.03
      }
    ]
  },
  {
    "id": "congo",
    "iso3": "COG",
    "name": "Congo, Rep.",
    "flag": "\ud83c\udde8\ud83c\uddec",
    "region": "Central",
    "latestRate": 4.11,
    "latestYear": 2024,
    "rate2020": 4.33,
    "rate2010": 4.85,
    "rate2000": 4.72,
    "rate1990": 5.27,
    "netChange2000toLatest": -0.61,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 5.27
      },
      {
        "year": 1991,
        "rate": 5.22
      },
      {
        "year": 1992,
        "rate": 5.18
      },
      {
        "year": 1993,
        "rate": 5.13
      },
      {
        "year": 1994,
        "rate": 5.1
      },
      {
        "year": 1995,
        "rate": 5.07
      },
      {
        "year": 1996,
        "rate": 5.03
      },
      {
        "year": 1997,
        "rate": 5.0
      },
      {
        "year": 1998,
        "rate": 4.91
      },
      {
        "year": 1999,
        "rate": 4.8
      },
      {
        "year": 2000,
        "rate": 4.72
      },
      {
        "year": 2001,
        "rate": 4.67
      },
      {
        "year": 2002,
        "rate": 4.7
      },
      {
        "year": 2003,
        "rate": 4.7
      },
      {
        "year": 2004,
        "rate": 4.69
      },
      {
        "year": 2005,
        "rate": 4.67
      },
      {
        "year": 2006,
        "rate": 4.65
      },
      {
        "year": 2007,
        "rate": 4.65
      },
      {
        "year": 2008,
        "rate": 4.73
      },
      {
        "year": 2009,
        "rate": 4.81
      },
      {
        "year": 2010,
        "rate": 4.85
      },
      {
        "year": 2011,
        "rate": 4.83
      },
      {
        "year": 2012,
        "rate": 4.79
      },
      {
        "year": 2013,
        "rate": 4.73
      },
      {
        "year": 2014,
        "rate": 4.67
      },
      {
        "year": 2015,
        "rate": 4.61
      },
      {
        "year": 2016,
        "rate": 4.55
      },
      {
        "year": 2017,
        "rate": 4.5
      },
      {
        "year": 2018,
        "rate": 4.44
      },
      {
        "year": 2019,
        "rate": 4.38
      },
      {
        "year": 2020,
        "rate": 4.33
      },
      {
        "year": 2021,
        "rate": 4.28
      },
      {
        "year": 2022,
        "rate": 4.21
      },
      {
        "year": 2023,
        "rate": 4.16
      },
      {
        "year": 2024,
        "rate": 4.11
      }
    ]
  },
  {
    "id": "dr-congo",
    "iso3": "COD",
    "name": "DR Congo",
    "flag": "\ud83c\udde8\ud83c\udde9",
    "region": "Central",
    "latestRate": 5.98,
    "latestYear": 2024,
    "rate2020": 6.21,
    "rate2010": 6.59,
    "rate2000": 6.7,
    "rate1990": 6.65,
    "netChange2000toLatest": -0.72,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 6.65
      },
      {
        "year": 1991,
        "rate": 6.64
      },
      {
        "year": 1992,
        "rate": 6.64
      },
      {
        "year": 1993,
        "rate": 6.64
      },
      {
        "year": 1994,
        "rate": 6.64
      },
      {
        "year": 1995,
        "rate": 6.68
      },
      {
        "year": 1996,
        "rate": 6.67
      },
      {
        "year": 1997,
        "rate": 6.69
      },
      {
        "year": 1998,
        "rate": 6.7
      },
      {
        "year": 1999,
        "rate": 6.69
      },
      {
        "year": 2000,
        "rate": 6.7
      },
      {
        "year": 2001,
        "rate": 6.66
      },
      {
        "year": 2002,
        "rate": 6.61
      },
      {
        "year": 2003,
        "rate": 6.55
      },
      {
        "year": 2004,
        "rate": 6.53
      },
      {
        "year": 2005,
        "rate": 6.53
      },
      {
        "year": 2006,
        "rate": 6.55
      },
      {
        "year": 2007,
        "rate": 6.56
      },
      {
        "year": 2008,
        "rate": 6.58
      },
      {
        "year": 2009,
        "rate": 6.59
      },
      {
        "year": 2010,
        "rate": 6.59
      },
      {
        "year": 2011,
        "rate": 6.58
      },
      {
        "year": 2012,
        "rate": 6.56
      },
      {
        "year": 2013,
        "rate": 6.53
      },
      {
        "year": 2014,
        "rate": 6.48
      },
      {
        "year": 2015,
        "rate": 6.44
      },
      {
        "year": 2016,
        "rate": 6.39
      },
      {
        "year": 2017,
        "rate": 6.35
      },
      {
        "year": 2018,
        "rate": 6.3
      },
      {
        "year": 2019,
        "rate": 6.25
      },
      {
        "year": 2020,
        "rate": 6.21
      },
      {
        "year": 2021,
        "rate": 6.16
      },
      {
        "year": 2022,
        "rate": 6.11
      },
      {
        "year": 2023,
        "rate": 6.05
      },
      {
        "year": 2024,
        "rate": 5.98
      }
    ]
  },
  {
    "id": "equatorial-guinea",
    "iso3": "GNQ",
    "name": "Equatorial Guinea",
    "flag": "\ud83c\uddec\ud83c\uddf6",
    "region": "Central",
    "latestRate": 4.12,
    "latestYear": 2024,
    "rate2020": 4.35,
    "rate2010": 5.21,
    "rate2000": 5.83,
    "rate1990": 5.99,
    "netChange2000toLatest": -1.71,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 5.99
      },
      {
        "year": 1991,
        "rate": 5.99
      },
      {
        "year": 1992,
        "rate": 5.98
      },
      {
        "year": 1993,
        "rate": 5.98
      },
      {
        "year": 1994,
        "rate": 5.98
      },
      {
        "year": 1995,
        "rate": 5.97
      },
      {
        "year": 1996,
        "rate": 5.96
      },
      {
        "year": 1997,
        "rate": 5.94
      },
      {
        "year": 1998,
        "rate": 5.91
      },
      {
        "year": 1999,
        "rate": 5.88
      },
      {
        "year": 2000,
        "rate": 5.83
      },
      {
        "year": 2001,
        "rate": 5.79
      },
      {
        "year": 2002,
        "rate": 5.73
      },
      {
        "year": 2003,
        "rate": 5.67
      },
      {
        "year": 2004,
        "rate": 5.62
      },
      {
        "year": 2005,
        "rate": 5.56
      },
      {
        "year": 2006,
        "rate": 5.5
      },
      {
        "year": 2007,
        "rate": 5.43
      },
      {
        "year": 2008,
        "rate": 5.36
      },
      {
        "year": 2009,
        "rate": 5.29
      },
      {
        "year": 2010,
        "rate": 5.21
      },
      {
        "year": 2011,
        "rate": 5.13
      },
      {
        "year": 2012,
        "rate": 5.04
      },
      {
        "year": 2013,
        "rate": 4.95
      },
      {
        "year": 2014,
        "rate": 4.86
      },
      {
        "year": 2015,
        "rate": 4.77
      },
      {
        "year": 2016,
        "rate": 4.69
      },
      {
        "year": 2017,
        "rate": 4.6
      },
      {
        "year": 2018,
        "rate": 4.51
      },
      {
        "year": 2019,
        "rate": 4.43
      },
      {
        "year": 2020,
        "rate": 4.35
      },
      {
        "year": 2021,
        "rate": 4.27
      },
      {
        "year": 2022,
        "rate": 4.17
      },
      {
        "year": 2023,
        "rate": 4.08
      },
      {
        "year": 2024,
        "rate": 4.12
      }
    ]
  },
  {
    "id": "gabon",
    "iso3": "GAB",
    "name": "Gabon",
    "flag": "\ud83c\uddec\ud83c\udde6",
    "region": "Central",
    "latestRate": 3.59,
    "latestYear": 2024,
    "rate2020": 3.83,
    "rate2010": 4.15,
    "rate2000": 4.47,
    "rate1990": 5.46,
    "netChange2000toLatest": -0.88,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 5.46
      },
      {
        "year": 1991,
        "rate": 5.37
      },
      {
        "year": 1992,
        "rate": 5.29
      },
      {
        "year": 1993,
        "rate": 5.19
      },
      {
        "year": 1994,
        "rate": 5.04
      },
      {
        "year": 1995,
        "rate": 4.88
      },
      {
        "year": 1996,
        "rate": 4.74
      },
      {
        "year": 1997,
        "rate": 4.66
      },
      {
        "year": 1998,
        "rate": 4.58
      },
      {
        "year": 1999,
        "rate": 4.5
      },
      {
        "year": 2000,
        "rate": 4.47
      },
      {
        "year": 2001,
        "rate": 4.42
      },
      {
        "year": 2002,
        "rate": 4.36
      },
      {
        "year": 2003,
        "rate": 4.3
      },
      {
        "year": 2004,
        "rate": 4.25
      },
      {
        "year": 2005,
        "rate": 4.21
      },
      {
        "year": 2006,
        "rate": 4.17
      },
      {
        "year": 2007,
        "rate": 4.14
      },
      {
        "year": 2008,
        "rate": 4.12
      },
      {
        "year": 2009,
        "rate": 4.14
      },
      {
        "year": 2010,
        "rate": 4.15
      },
      {
        "year": 2011,
        "rate": 4.15
      },
      {
        "year": 2012,
        "rate": 4.09
      },
      {
        "year": 2013,
        "rate": 4.02
      },
      {
        "year": 2014,
        "rate": 3.95
      },
      {
        "year": 2015,
        "rate": 3.92
      },
      {
        "year": 2016,
        "rate": 3.92
      },
      {
        "year": 2017,
        "rate": 3.91
      },
      {
        "year": 2018,
        "rate": 3.91
      },
      {
        "year": 2019,
        "rate": 3.88
      },
      {
        "year": 2020,
        "rate": 3.83
      },
      {
        "year": 2021,
        "rate": 3.78
      },
      {
        "year": 2022,
        "rate": 3.71
      },
      {
        "year": 2023,
        "rate": 3.65
      },
      {
        "year": 2024,
        "rate": 3.59
      }
    ]
  },
  {
    "id": "sao-tome",
    "iso3": "STP",
    "name": "S\u00e3o Tom\u00e9 and Pr\u00edncipe",
    "flag": "\ud83c\uddf8\ud83c\uddf9",
    "region": "Central",
    "latestRate": 3.6,
    "latestYear": 2024,
    "rate2020": 3.83,
    "rate2010": 4.77,
    "rate2000": 5.16,
    "rate1990": 5.83,
    "netChange2000toLatest": -1.56,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 5.83
      },
      {
        "year": 1991,
        "rate": 5.77
      },
      {
        "year": 1992,
        "rate": 5.7
      },
      {
        "year": 1993,
        "rate": 5.63
      },
      {
        "year": 1994,
        "rate": 5.56
      },
      {
        "year": 1995,
        "rate": 5.55
      },
      {
        "year": 1996,
        "rate": 5.47
      },
      {
        "year": 1997,
        "rate": 5.4
      },
      {
        "year": 1998,
        "rate": 5.3
      },
      {
        "year": 1999,
        "rate": 5.23
      },
      {
        "year": 2000,
        "rate": 5.16
      },
      {
        "year": 2001,
        "rate": 5.1
      },
      {
        "year": 2002,
        "rate": 5.06
      },
      {
        "year": 2003,
        "rate": 5.01
      },
      {
        "year": 2004,
        "rate": 4.96
      },
      {
        "year": 2005,
        "rate": 4.94
      },
      {
        "year": 2006,
        "rate": 4.93
      },
      {
        "year": 2007,
        "rate": 4.96
      },
      {
        "year": 2008,
        "rate": 4.91
      },
      {
        "year": 2009,
        "rate": 4.84
      },
      {
        "year": 2010,
        "rate": 4.77
      },
      {
        "year": 2011,
        "rate": 4.72
      },
      {
        "year": 2012,
        "rate": 4.66
      },
      {
        "year": 2013,
        "rate": 4.58
      },
      {
        "year": 2014,
        "rate": 4.49
      },
      {
        "year": 2015,
        "rate": 4.35
      },
      {
        "year": 2016,
        "rate": 4.2
      },
      {
        "year": 2017,
        "rate": 4.07
      },
      {
        "year": 2018,
        "rate": 3.98
      },
      {
        "year": 2019,
        "rate": 3.9
      },
      {
        "year": 2020,
        "rate": 3.83
      },
      {
        "year": 2021,
        "rate": 3.76
      },
      {
        "year": 2022,
        "rate": 3.69
      },
      {
        "year": 2023,
        "rate": 3.64
      },
      {
        "year": 2024,
        "rate": 3.6
      }
    ]
  },
  {
    "id": "angola",
    "iso3": "AGO",
    "name": "Angola",
    "flag": "\ud83c\udde6\ud83c\uddf4",
    "region": "Southern",
    "latestRate": 5.05,
    "latestYear": 2024,
    "rate2020": 5.37,
    "rate2010": 6.19,
    "rate2000": 6.64,
    "rate1990": 7.27,
    "netChange2000toLatest": -1.59,
    "stage": "High Fertility (Pre-Transition)",
    "demographicNotes": "High youthful dependency ratio; demographic dividend window opening with female education and primary healthcare investments.",
    "history": [
      {
        "year": 1990,
        "rate": 7.27
      },
      {
        "year": 1991,
        "rate": 7.21
      },
      {
        "year": 1992,
        "rate": 7.14
      },
      {
        "year": 1993,
        "rate": 7.07
      },
      {
        "year": 1994,
        "rate": 6.99
      },
      {
        "year": 1995,
        "rate": 6.92
      },
      {
        "year": 1996,
        "rate": 6.85
      },
      {
        "year": 1997,
        "rate": 6.79
      },
      {
        "year": 1998,
        "rate": 6.73
      },
      {
        "year": 1999,
        "rate": 6.68
      },
      {
        "year": 2000,
        "rate": 6.64
      },
      {
        "year": 2001,
        "rate": 6.6
      },
      {
        "year": 2002,
        "rate": 6.57
      },
      {
        "year": 2003,
        "rate": 6.53
      },
      {
        "year": 2004,
        "rate": 6.5
      },
      {
        "year": 2005,
        "rate": 6.46
      },
      {
        "year": 2006,
        "rate": 6.42
      },
      {
        "year": 2007,
        "rate": 6.37
      },
      {
        "year": 2008,
        "rate": 6.32
      },
      {
        "year": 2009,
        "rate": 6.26
      },
      {
        "year": 2010,
        "rate": 6.19
      },
      {
        "year": 2011,
        "rate": 6.12
      },
      {
        "year": 2012,
        "rate": 6.04
      },
      {
        "year": 2013,
        "rate": 5.95
      },
      {
        "year": 2014,
        "rate": 5.86
      },
      {
        "year": 2015,
        "rate": 5.77
      },
      {
        "year": 2016,
        "rate": 5.69
      },
      {
        "year": 2017,
        "rate": 5.6
      },
      {
        "year": 2018,
        "rate": 5.52
      },
      {
        "year": 2019,
        "rate": 5.44
      },
      {
        "year": 2020,
        "rate": 5.37
      },
      {
        "year": 2021,
        "rate": 5.3
      },
      {
        "year": 2022,
        "rate": 5.21
      },
      {
        "year": 2023,
        "rate": 5.12
      },
      {
        "year": 2024,
        "rate": 5.05
      }
    ]
  },
  {
    "id": "botswana",
    "iso3": "BWA",
    "name": "Botswana",
    "flag": "\ud83c\udde7\ud83c\uddfc",
    "region": "Southern",
    "latestRate": 2.7,
    "latestYear": 2024,
    "rate2020": 2.86,
    "rate2010": 3.13,
    "rate2000": 3.29,
    "rate1990": 4.51,
    "netChange2000toLatest": -0.59,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 4.51
      },
      {
        "year": 1991,
        "rate": 4.37
      },
      {
        "year": 1992,
        "rate": 4.25
      },
      {
        "year": 1993,
        "rate": 4.15
      },
      {
        "year": 1994,
        "rate": 4.02
      },
      {
        "year": 1995,
        "rate": 3.79
      },
      {
        "year": 1996,
        "rate": 3.57
      },
      {
        "year": 1997,
        "rate": 3.43
      },
      {
        "year": 1998,
        "rate": 3.36
      },
      {
        "year": 1999,
        "rate": 3.31
      },
      {
        "year": 2000,
        "rate": 3.29
      },
      {
        "year": 2001,
        "rate": 3.25
      },
      {
        "year": 2002,
        "rate": 3.17
      },
      {
        "year": 2003,
        "rate": 3.11
      },
      {
        "year": 2004,
        "rate": 3.06
      },
      {
        "year": 2005,
        "rate": 3.08
      },
      {
        "year": 2006,
        "rate": 3.11
      },
      {
        "year": 2007,
        "rate": 3.13
      },
      {
        "year": 2008,
        "rate": 3.13
      },
      {
        "year": 2009,
        "rate": 3.13
      },
      {
        "year": 2010,
        "rate": 3.13
      },
      {
        "year": 2011,
        "rate": 3.1
      },
      {
        "year": 2012,
        "rate": 3.07
      },
      {
        "year": 2013,
        "rate": 3.04
      },
      {
        "year": 2014,
        "rate": 3.03
      },
      {
        "year": 2015,
        "rate": 3.01
      },
      {
        "year": 2016,
        "rate": 2.99
      },
      {
        "year": 2017,
        "rate": 2.97
      },
      {
        "year": 2018,
        "rate": 2.94
      },
      {
        "year": 2019,
        "rate": 2.91
      },
      {
        "year": 2020,
        "rate": 2.86
      },
      {
        "year": 2021,
        "rate": 2.83
      },
      {
        "year": 2022,
        "rate": 2.79
      },
      {
        "year": 2023,
        "rate": 2.73
      },
      {
        "year": 2024,
        "rate": 2.7
      }
    ]
  },
  {
    "id": "eswatini",
    "iso3": "SWZ",
    "name": "Eswatini",
    "flag": "\ud83c\uddf8\ud83c\uddff",
    "region": "Southern",
    "latestRate": 2.72,
    "latestYear": 2024,
    "rate2020": 2.89,
    "rate2010": 3.38,
    "rate2000": 4.03,
    "rate1990": 5.29,
    "netChange2000toLatest": -1.31,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 5.29
      },
      {
        "year": 1991,
        "rate": 5.13
      },
      {
        "year": 1992,
        "rate": 4.98
      },
      {
        "year": 1993,
        "rate": 4.82
      },
      {
        "year": 1994,
        "rate": 4.66
      },
      {
        "year": 1995,
        "rate": 4.52
      },
      {
        "year": 1996,
        "rate": 4.38
      },
      {
        "year": 1997,
        "rate": 4.24
      },
      {
        "year": 1998,
        "rate": 4.12
      },
      {
        "year": 1999,
        "rate": 4.09
      },
      {
        "year": 2000,
        "rate": 4.03
      },
      {
        "year": 2001,
        "rate": 3.94
      },
      {
        "year": 2002,
        "rate": 3.85
      },
      {
        "year": 2003,
        "rate": 3.8
      },
      {
        "year": 2004,
        "rate": 3.76
      },
      {
        "year": 2005,
        "rate": 3.7
      },
      {
        "year": 2006,
        "rate": 3.63
      },
      {
        "year": 2007,
        "rate": 3.58
      },
      {
        "year": 2008,
        "rate": 3.57
      },
      {
        "year": 2009,
        "rate": 3.5
      },
      {
        "year": 2010,
        "rate": 3.38
      },
      {
        "year": 2011,
        "rate": 3.32
      },
      {
        "year": 2012,
        "rate": 3.27
      },
      {
        "year": 2013,
        "rate": 3.24
      },
      {
        "year": 2014,
        "rate": 3.18
      },
      {
        "year": 2015,
        "rate": 3.12
      },
      {
        "year": 2016,
        "rate": 3.07
      },
      {
        "year": 2017,
        "rate": 3.02
      },
      {
        "year": 2018,
        "rate": 2.97
      },
      {
        "year": 2019,
        "rate": 2.92
      },
      {
        "year": 2020,
        "rate": 2.89
      },
      {
        "year": 2021,
        "rate": 2.84
      },
      {
        "year": 2022,
        "rate": 2.8
      },
      {
        "year": 2023,
        "rate": 2.75
      },
      {
        "year": 2024,
        "rate": 2.72
      }
    ]
  },
  {
    "id": "lesotho",
    "iso3": "LSO",
    "name": "Lesotho",
    "flag": "\ud83c\uddf1\ud83c\uddf8",
    "region": "Southern",
    "latestRate": 2.66,
    "latestYear": 2024,
    "rate2020": 2.85,
    "rate2010": 3.25,
    "rate2000": 3.6,
    "rate1990": 4.81,
    "netChange2000toLatest": -0.94,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 4.81
      },
      {
        "year": 1991,
        "rate": 4.68
      },
      {
        "year": 1992,
        "rate": 4.54
      },
      {
        "year": 1993,
        "rate": 4.37
      },
      {
        "year": 1994,
        "rate": 4.21
      },
      {
        "year": 1995,
        "rate": 4.12
      },
      {
        "year": 1996,
        "rate": 4.06
      },
      {
        "year": 1997,
        "rate": 3.98
      },
      {
        "year": 1998,
        "rate": 3.81
      },
      {
        "year": 1999,
        "rate": 3.67
      },
      {
        "year": 2000,
        "rate": 3.6
      },
      {
        "year": 2001,
        "rate": 3.63
      },
      {
        "year": 2002,
        "rate": 3.68
      },
      {
        "year": 2003,
        "rate": 3.62
      },
      {
        "year": 2004,
        "rate": 3.51
      },
      {
        "year": 2005,
        "rate": 3.43
      },
      {
        "year": 2006,
        "rate": 3.41
      },
      {
        "year": 2007,
        "rate": 3.44
      },
      {
        "year": 2008,
        "rate": 3.39
      },
      {
        "year": 2009,
        "rate": 3.31
      },
      {
        "year": 2010,
        "rate": 3.25
      },
      {
        "year": 2011,
        "rate": 3.34
      },
      {
        "year": 2012,
        "rate": 3.3
      },
      {
        "year": 2013,
        "rate": 3.28
      },
      {
        "year": 2014,
        "rate": 3.24
      },
      {
        "year": 2015,
        "rate": 3.22
      },
      {
        "year": 2016,
        "rate": 3.18
      },
      {
        "year": 2017,
        "rate": 3.1
      },
      {
        "year": 2018,
        "rate": 3.02
      },
      {
        "year": 2019,
        "rate": 2.92
      },
      {
        "year": 2020,
        "rate": 2.85
      },
      {
        "year": 2021,
        "rate": 2.77
      },
      {
        "year": 2022,
        "rate": 2.72
      },
      {
        "year": 2023,
        "rate": 2.69
      },
      {
        "year": 2024,
        "rate": 2.66
      }
    ]
  },
  {
    "id": "namibia",
    "iso3": "NAM",
    "name": "Namibia",
    "flag": "\ud83c\uddf3\ud83c\udde6",
    "region": "Southern",
    "latestRate": 3.21,
    "latestYear": 2024,
    "rate2020": 3.35,
    "rate2010": 3.66,
    "rate2000": 3.99,
    "rate1990": 5.4,
    "netChange2000toLatest": -0.78,
    "stage": "Early Transition",
    "demographicNotes": "Rapidly declining fertility; expanding working-age cohort creating a prime opportunity for demographic dividend acceleration.",
    "history": [
      {
        "year": 1990,
        "rate": 5.4
      },
      {
        "year": 1991,
        "rate": 5.29
      },
      {
        "year": 1992,
        "rate": 5.11
      },
      {
        "year": 1993,
        "rate": 4.91
      },
      {
        "year": 1994,
        "rate": 4.68
      },
      {
        "year": 1995,
        "rate": 4.42
      },
      {
        "year": 1996,
        "rate": 4.2
      },
      {
        "year": 1997,
        "rate": 4.17
      },
      {
        "year": 1998,
        "rate": 4.18
      },
      {
        "year": 1999,
        "rate": 4.14
      },
      {
        "year": 2000,
        "rate": 3.99
      },
      {
        "year": 2001,
        "rate": 3.83
      },
      {
        "year": 2002,
        "rate": 3.69
      },
      {
        "year": 2003,
        "rate": 3.58
      },
      {
        "year": 2004,
        "rate": 3.54
      },
      {
        "year": 2005,
        "rate": 3.57
      },
      {
        "year": 2006,
        "rate": 3.6
      },
      {
        "year": 2007,
        "rate": 3.61
      },
      {
        "year": 2008,
        "rate": 3.62
      },
      {
        "year": 2009,
        "rate": 3.63
      },
      {
        "year": 2010,
        "rate": 3.66
      },
      {
        "year": 2011,
        "rate": 3.66
      },
      {
        "year": 2012,
        "rate": 3.68
      },
      {
        "year": 2013,
        "rate": 3.65
      },
      {
        "year": 2014,
        "rate": 3.63
      },
      {
        "year": 2015,
        "rate": 3.6
      },
      {
        "year": 2016,
        "rate": 3.57
      },
      {
        "year": 2017,
        "rate": 3.51
      },
      {
        "year": 2018,
        "rate": 3.46
      },
      {
        "year": 2019,
        "rate": 3.4
      },
      {
        "year": 2020,
        "rate": 3.35
      },
      {
        "year": 2021,
        "rate": 3.3
      },
      {
        "year": 2022,
        "rate": 3.25
      },
      {
        "year": 2023,
        "rate": 3.21
      },
      {
        "year": 2024,
        "rate": 3.21
      }
    ]
  },
  {
    "id": "south-africa",
    "iso3": "ZAF",
    "name": "South Africa",
    "flag": "\ud83c\uddff\ud83c\udde6",
    "region": "Southern",
    "latestRate": 2.21,
    "latestYear": 2024,
    "rate2020": 2.26,
    "rate2010": 2.44,
    "rate2000": 2.41,
    "rate1990": 3.72,
    "netChange2000toLatest": -0.2,
    "stage": "Advanced Transition",
    "demographicNotes": "Approaching replacement level (2.1); stabilizing age-dependency with higher human capital accumulation per child.",
    "history": [
      {
        "year": 1990,
        "rate": 3.72
      },
      {
        "year": 1991,
        "rate": 3.62
      },
      {
        "year": 1992,
        "rate": 3.48
      },
      {
        "year": 1993,
        "rate": 3.37
      },
      {
        "year": 1994,
        "rate": 3.26
      },
      {
        "year": 1995,
        "rate": 3.17
      },
      {
        "year": 1996,
        "rate": 2.99
      },
      {
        "year": 1997,
        "rate": 2.73
      },
      {
        "year": 1998,
        "rate": 2.63
      },
      {
        "year": 1999,
        "rate": 2.56
      },
      {
        "year": 2000,
        "rate": 2.41
      },
      {
        "year": 2001,
        "rate": 2.37
      },
      {
        "year": 2002,
        "rate": 2.32
      },
      {
        "year": 2003,
        "rate": 2.36
      },
      {
        "year": 2004,
        "rate": 2.44
      },
      {
        "year": 2005,
        "rate": 2.51
      },
      {
        "year": 2006,
        "rate": 2.55
      },
      {
        "year": 2007,
        "rate": 2.54
      },
      {
        "year": 2008,
        "rate": 2.68
      },
      {
        "year": 2009,
        "rate": 2.5
      },
      {
        "year": 2010,
        "rate": 2.44
      },
      {
        "year": 2011,
        "rate": 2.44
      },
      {
        "year": 2012,
        "rate": 2.45
      },
      {
        "year": 2013,
        "rate": 2.43
      },
      {
        "year": 2014,
        "rate": 2.42
      },
      {
        "year": 2015,
        "rate": 2.36
      },
      {
        "year": 2016,
        "rate": 2.26
      },
      {
        "year": 2017,
        "rate": 2.28
      },
      {
        "year": 2018,
        "rate": 2.27
      },
      {
        "year": 2019,
        "rate": 2.26
      },
      {
        "year": 2020,
        "rate": 2.26
      },
      {
        "year": 2021,
        "rate": 2.25
      },
      {
        "year": 2022,
        "rate": 2.23
      },
      {
        "year": 2023,
        "rate": 2.22
      },
      {
        "year": 2024,
        "rate": 2.21
      }
    ]
  }
];

export const REGIONAL_FERTILITY_BENCHMARKS: BenchmarkTimelinePoint[] = [
  {
    "year": 1990,
    "subSaharanAfrica": 6.3,
    "easternSouthernAfrica": 6.16,
    "westernCentralAfrica": 6.52,
    "middleEastNorthAfrica": 5.42,
    "world": 3.31,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1991,
    "subSaharanAfrica": 6.24,
    "easternSouthernAfrica": 6.09,
    "westernCentralAfrica": 6.47,
    "middleEastNorthAfrica": 5.26,
    "world": 3.13,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1992,
    "subSaharanAfrica": 6.18,
    "easternSouthernAfrica": 6.03,
    "westernCentralAfrica": 6.42,
    "middleEastNorthAfrica": 5.09,
    "world": 3.04,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1993,
    "subSaharanAfrica": 6.13,
    "easternSouthernAfrica": 5.97,
    "westernCentralAfrica": 6.36,
    "middleEastNorthAfrica": 4.93,
    "world": 2.97,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1994,
    "subSaharanAfrica": 6.06,
    "easternSouthernAfrica": 5.91,
    "westernCentralAfrica": 6.3,
    "middleEastNorthAfrica": 4.77,
    "world": 2.92,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1995,
    "subSaharanAfrica": 6.0,
    "easternSouthernAfrica": 5.85,
    "westernCentralAfrica": 6.24,
    "middleEastNorthAfrica": 4.6,
    "world": 2.87,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1996,
    "subSaharanAfrica": 5.94,
    "easternSouthernAfrica": 5.78,
    "westernCentralAfrica": 6.17,
    "middleEastNorthAfrica": 4.43,
    "world": 2.82,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1997,
    "subSaharanAfrica": 5.87,
    "easternSouthernAfrica": 5.71,
    "westernCentralAfrica": 6.1,
    "middleEastNorthAfrica": 4.31,
    "world": 2.78,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1998,
    "subSaharanAfrica": 5.81,
    "easternSouthernAfrica": 5.66,
    "westernCentralAfrica": 6.05,
    "middleEastNorthAfrica": 4.2,
    "world": 2.75,
    "replacementBenchmark": 2.1
  },
  {
    "year": 1999,
    "subSaharanAfrica": 5.78,
    "easternSouthernAfrica": 5.61,
    "westernCentralAfrica": 6.03,
    "middleEastNorthAfrica": 4.11,
    "world": 2.72,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2000,
    "subSaharanAfrica": 5.74,
    "easternSouthernAfrica": 5.55,
    "westernCentralAfrica": 6.02,
    "middleEastNorthAfrica": 4.01,
    "world": 2.73,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2001,
    "subSaharanAfrica": 5.7,
    "easternSouthernAfrica": 5.5,
    "westernCentralAfrica": 5.99,
    "middleEastNorthAfrica": 3.9,
    "world": 2.69,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2002,
    "subSaharanAfrica": 5.65,
    "easternSouthernAfrica": 5.45,
    "westernCentralAfrica": 5.96,
    "middleEastNorthAfrica": 3.79,
    "world": 2.66,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2003,
    "subSaharanAfrica": 5.61,
    "easternSouthernAfrica": 5.41,
    "westernCentralAfrica": 5.92,
    "middleEastNorthAfrica": 3.73,
    "world": 2.64,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2004,
    "subSaharanAfrica": 5.59,
    "easternSouthernAfrica": 5.38,
    "westernCentralAfrica": 5.9,
    "middleEastNorthAfrica": 3.63,
    "world": 2.63,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2005,
    "subSaharanAfrica": 5.56,
    "easternSouthernAfrica": 5.35,
    "westernCentralAfrica": 5.87,
    "middleEastNorthAfrica": 3.58,
    "world": 2.61,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2006,
    "subSaharanAfrica": 5.52,
    "easternSouthernAfrica": 5.31,
    "westernCentralAfrica": 5.85,
    "middleEastNorthAfrica": 3.56,
    "world": 2.61,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2007,
    "subSaharanAfrica": 5.48,
    "easternSouthernAfrica": 5.25,
    "westernCentralAfrica": 5.81,
    "middleEastNorthAfrica": 3.55,
    "world": 2.6,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2008,
    "subSaharanAfrica": 5.45,
    "easternSouthernAfrica": 5.22,
    "westernCentralAfrica": 5.79,
    "middleEastNorthAfrica": 3.52,
    "world": 2.6,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2009,
    "subSaharanAfrica": 5.39,
    "easternSouthernAfrica": 5.14,
    "westernCentralAfrica": 5.75,
    "middleEastNorthAfrica": 3.51,
    "world": 2.59,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2010,
    "subSaharanAfrica": 5.32,
    "easternSouthernAfrica": 5.07,
    "westernCentralAfrica": 5.71,
    "middleEastNorthAfrica": 3.5,
    "world": 2.57,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2011,
    "subSaharanAfrica": 5.25,
    "easternSouthernAfrica": 4.98,
    "westernCentralAfrica": 5.67,
    "middleEastNorthAfrica": 3.48,
    "world": 2.55,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2012,
    "subSaharanAfrica": 5.18,
    "easternSouthernAfrica": 4.9,
    "westernCentralAfrica": 5.6,
    "middleEastNorthAfrica": 3.47,
    "world": 2.56,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2013,
    "subSaharanAfrica": 5.1,
    "easternSouthernAfrica": 4.82,
    "westernCentralAfrica": 5.52,
    "middleEastNorthAfrica": 3.45,
    "world": 2.52,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2014,
    "subSaharanAfrica": 5.02,
    "easternSouthernAfrica": 4.75,
    "westernCentralAfrica": 5.44,
    "middleEastNorthAfrica": 3.44,
    "world": 2.52,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2015,
    "subSaharanAfrica": 4.94,
    "easternSouthernAfrica": 4.68,
    "westernCentralAfrica": 5.35,
    "middleEastNorthAfrica": 3.4,
    "world": 2.49,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2016,
    "subSaharanAfrica": 4.86,
    "easternSouthernAfrica": 4.62,
    "westernCentralAfrica": 5.23,
    "middleEastNorthAfrica": 3.34,
    "world": 2.49,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2017,
    "subSaharanAfrica": 4.78,
    "easternSouthernAfrica": 4.57,
    "westernCentralAfrica": 5.1,
    "middleEastNorthAfrica": 3.32,
    "world": 2.46,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2018,
    "subSaharanAfrica": 4.7,
    "easternSouthernAfrica": 4.52,
    "westernCentralAfrica": 4.96,
    "middleEastNorthAfrica": 3.23,
    "world": 2.39,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2019,
    "subSaharanAfrica": 4.61,
    "easternSouthernAfrica": 4.47,
    "westernCentralAfrica": 4.83,
    "middleEastNorthAfrica": 3.16,
    "world": 2.35,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2020,
    "subSaharanAfrica": 4.53,
    "easternSouthernAfrica": 4.41,
    "westernCentralAfrica": 4.71,
    "middleEastNorthAfrica": 3.12,
    "world": 2.28,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2021,
    "subSaharanAfrica": 4.46,
    "easternSouthernAfrica": 4.35,
    "westernCentralAfrica": 4.64,
    "middleEastNorthAfrica": 3.07,
    "world": 2.25,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2022,
    "subSaharanAfrica": 4.4,
    "easternSouthernAfrica": 4.29,
    "westernCentralAfrica": 4.56,
    "middleEastNorthAfrica": 3.03,
    "world": 2.22,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2023,
    "subSaharanAfrica": 4.33,
    "easternSouthernAfrica": 4.22,
    "westernCentralAfrica": 4.5,
    "middleEastNorthAfrica": 3.01,
    "world": 2.2,
    "replacementBenchmark": 2.1
  },
  {
    "year": 2024,
    "subSaharanAfrica": 4.26,
    "easternSouthernAfrica": 4.16,
    "westernCentralAfrica": 4.42,
    "middleEastNorthAfrica": 2.98,
    "world": 2.19,
    "replacementBenchmark": 2.1
  }
];

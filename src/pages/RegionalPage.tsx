import React from 'react';
import { Country } from '../types';
import { ChinaAfricaFdiSection } from '../components/ChinaAfricaFdiSection';

interface RegionalPageProps {
  countries: Country[];
}

export default function RegionalPage({ countries }: RegionalPageProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <ChinaAfricaFdiSection />
    </div>
  );
}

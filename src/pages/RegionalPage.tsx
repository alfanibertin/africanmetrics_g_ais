import React from 'react';
import { Country } from '../types';
import { ChinaAfricaFdiSection } from '../components/ChinaAfricaFdiSection';

interface RegionalPageProps {
  countries: Country[];
  onSwitchToEuropeHub?: () => void;
}

export default function RegionalPage({ countries, onSwitchToEuropeHub }: RegionalPageProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <ChinaAfricaFdiSection onSwitchToEuropeHub={onSwitchToEuropeHub} />
    </div>
  );
}

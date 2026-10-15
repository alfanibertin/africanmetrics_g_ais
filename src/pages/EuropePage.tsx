import React from 'react';
import { Country } from '../types';
import { EuropeAfricaFdiSection } from '../components/EuropeAfricaFdiSection';

interface EuropePageProps {
  countries: Country[];
  onSwitchToChinaHub?: () => void;
}

export default function EuropePage({ countries, onSwitchToChinaHub }: EuropePageProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <EuropeAfricaFdiSection onSwitchToChinaHub={onSwitchToChinaHub} />
    </div>
  );
}

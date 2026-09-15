import React from 'react';
import { Country } from '../types';
import { HealthSection } from '../components/health/HealthSection';

interface HealthPageProps {
  countries?: Country[];
}

export default function HealthPage({ countries }: HealthPageProps) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <HealthSection />
    </div>
  );
}

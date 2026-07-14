import React, { useState } from 'react';
import { getCountryISO2 } from '../data';

interface CountryFlagProps {
  id: string;
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ 
  id, 
  name, 
  className = '', 
  size = 'md' 
}) => {
  const iso = getCountryISO2(id);
  const [hasError, setHasError] = useState(false);

  // Define size classes
  const sizeClasses = {
    sm: 'w-4 h-3 rounded-[2px]',
    md: 'w-5.5 h-4 rounded-[3px]',
    lg: 'w-8 h-5.5 rounded-md'
  };

  const selectedSizeClass = sizeClasses[size];

  if (hasError || iso === 'af') {
    // Elegant passport-style fallback text badge if image fails or ISO is unknown
    return (
      <span 
        className={`inline-flex items-center justify-center font-mono font-bold bg-slate-300 text-brand-dim text-[10px] select-none border border-brand-border/40 shrink-0 ${selectedSizeClass} ${className}`}
        title={name}
      >
        {iso === 'af' ? '🌍' : iso.toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
      alt={`${name} flag`}
      title={name}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={`inline-block object-cover border border-slate-400/30 shadow-xs shrink-0 select-none ${selectedSizeClass} ${className}`}
    />
  );
};

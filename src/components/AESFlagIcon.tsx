import React from 'react';

interface AESFlagIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AESFlagIcon: React.FC<AESFlagIconProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: 'h-6 w-10',
    md: 'h-10 w-16',
    lg: 'h-14 w-24',
  }[size];

  return (
    <svg 
      viewBox="0 0 300 200" 
      className={`${dimensions} ${className} object-cover rounded shadow border border-brand-border/40 shrink-0`}
      aria-label="Official Flag of the Confederation of Sahel States (AES)"
    >
      {/* Green background of the Sahel Confederation */}
      <rect width="300" height="200" fill="#137547" />
      
      <g transform="translate(150, 100)">
        {/* Sun Gradient */}
        <defs>
          <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffd54f" />
            <stop offset="70%" stopColor="#ff8f00" />
            <stop offset="100%" stopColor="#e65100" />
          </radialGradient>
        </defs>
        
        {/* Rising Sun */}
        <circle r="44" fill="url(#sunGrad)" stroke="#137547" strokeWidth="1" />
        
        {/* Red ribbon arch */}
        <path 
          d="M -54,5 A 56,56 0 1,1 54,5" 
          fill="none" 
          stroke="#d32f2f" 
          strokeWidth="11" 
          strokeLinecap="butt"
        />
        
        {/* textPath anchor for Arched text */}
        <path id="textPath" d="M -50,4 A 52,52 0 1,1 50,4" fill="none" />
        <text className="font-sans font-bold uppercase tracking-wider" fontSize="5.2" fill="#ffffff" dy="-1">
          <textPath href="#textPath" startOffset="50%" textAnchor="middle">
            CONFEDERATION DES ETATS DU SAHEL
          </textPath>
        </text>

        {/* Three green stars above the sun (representing Burkina Faso, Mali, Niger) */}
        <g transform="translate(0, -60)">
          {/* Middle star */}
          <polygon points="0,-4.5 1.4,-0.9 5.2,-0.9 2,1.3 3.1,4.9 0,2.7 -3.1,4.9 -2,1.3 -5.2,-0.9 -1.4,-0.9" fill="#ffd54f" />
          {/* Left star */}
          <polygon points="-14,-3.5 -12.6,0.1 -8.8,0.1 -12,2.3 -10.9,5.9 -14,3.7 -17.1,5.9 -16,2.3 -19.2,0.1 -15.4,0.1" fill="#ffd54f" />
          {/* Right star */}
          <polygon points="14,-3.5 15.4,0.1 19.2,0.1 16,2.3 17.1,5.9 14,3.7 10.9,5.9 12,2.3 8.8,0.1 12.6,0.1" fill="#ffd54f" />
        </g>
        
        {/* Baobab Tree Silhouette in the center of the sun */}
        <g transform="translate(0, 10)">
          {/* Baobab Trunk & Roots */}
          <path d="M -4,20 L -3.5,8 C -3.5,2 -6,2 -8,-1 L -5,-1 C -4,1 -2.5,1 -2.5,4 L -2.5,-3 C -2.5,-5 -4,-6 -5,-8 L -3,-8 C -2,-6.5 -1.5,-5.5 -1.5,-3.5 L -1.5,-10 L 1.5,-10 L 1.5,-3.5 C 1.5,-5.5 2,-6.5 3,-8 L 5,-8 C 4,-6 2.5,-5 2.5,-3 L 2.5,4 C 2.5,1 4,1 5,-1 L 8,-1 C 6,2 3.5,2 3.5,8 L 4,20 Z" fill="#221201" />
          {/* Soil/Grass canopy floor */}
          <ellipse cx="0" cy="20" rx="34" ry="4" fill="#221201" />
          {/* Highly stylized West African savanna foliage */}
          <path d="M -24,-3 C -20,-12 -8,-15 0,-12 C 8,-15 20,-12 24,-3 C 27,2 20,8 11,8 C 0,10 -11,10 -22,6 C -26,4 -26,-1 -24,-3 Z" fill="#155d27" opacity="0.95" />
          <path d="M -16,-6 C -13,-14 -4,-16 2,-13 C 8,-16 17,-13 19,-6 C 21,-1 16,4 9,4 C 0,5 -9,5 -16,2 C -19,0 -19,-4 -16,-6 Z" fill="#2e7d32" opacity="0.85" />
          {/* Wildlife elements */}
          <circle cx="-18" cy="-5" r="1" fill="#ffd54f" opacity="0.6" />
          <circle cx="18" cy="-3" r="1.2" fill="#ffd54f" opacity="0.6" />
        </g>

        {/* Text "AES" below the emblem with spacing */}
        <text x="0" y="74" textAnchor="middle" fill="#ffffff" className="font-serif font-bold tracking-widest" fontSize="18">
          AES
        </text>
      </g>
    </svg>
  );
};

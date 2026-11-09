import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showTagline = false,
}) => {
  const isDark = variant === 'dark';
  const textColor = isDark ? 'text-navy-900' : 'text-ivory-100';
  const subColor = isDark ? 'text-charcoal-400' : 'text-ivory-300';

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group select-none ${className}`}>
      {/* Monogram emblem */}
      <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-navy-900 shadow-md group-hover:shadow-glow-mint transition-all duration-300 overflow-hidden border border-navy-800 edge-light">
        {/* Subtle interior glow */}
        <div className="absolute inset-0 bg-gradient-to-tr from-navy-950 via-navy-800 to-navy-700 opacity-90" />
        
        {/* Geometric W mark */}
        <svg
          viewBox="0 0 40 40"
          className="relative w-6 h-6 transform group-hover:scale-105 transition-transform duration-300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stylized sharp W lines */}
          <defs>
            <linearGradient id="wayvia-w" x1="8" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#B6EFE0" />
              <stop offset="1" stopColor="#62C5AC" />
            </linearGradient>
          </defs>
          <path
            d="M8 12L15 28L20 16L25 28L32 12"
            stroke="url(#wayvia-w)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Warm gold accent jewel */}
          <circle cx="20" cy="11" r="4.4" fill="#E9B96D" opacity="0.22" className="group-hover:animate-glow-pulse" />
          <circle cx="20" cy="11" r="2.2" fill="#E9B96D" />
        </svg>
      </div>

      {/* Brand Name & Optional Tagline */}
      <div className="flex flex-col">
        <span
          className={`font-display text-2xl font-extrabold tracking-tight ${textColor} transition-colors leading-none`}
        >
          WAY<span className="text-mint-400">VIA</span>
        </span>
        {showTagline && (
          <span className={`text-[10px] tracking-wider uppercase font-medium mt-1 ${subColor}`}>
            Move beyond ordinary
          </span>
        )}
      </div>
    </Link>
  );
};


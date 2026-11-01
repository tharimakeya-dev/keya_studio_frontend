import React from 'react';
import { Aperture } from 'lucide-react';

export default function Spinner({ size = 'md', label = 'Loading studio data...' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-3">
      <div className="relative flex items-center justify-center">
        <div
          className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin`}
        />
        <Aperture
          className={`${iconSizes[size] || iconSizes.md} text-amber-500 absolute animate-pulse`}
        />
      </div>
      {label && (
        <p className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
          {label}
        </p>
      )}
    </div>
  );
}

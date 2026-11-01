import React from 'react';
import Link from 'next/link';
import { Aperture, Home, Film, Sparkles, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="max-w-xl w-full text-center space-y-8">
        
        {/* Creative Studio 404 Illustration */}
        <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
          {/* Background glowing rings */}
          <div className="absolute inset-0 rounded-full bg-amber-500/10 dark:bg-amber-500/15 blur-2xl animate-pulse" />
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-amber-500/30 dark:border-amber-500/20 animate-[spin_20s_linear_infinite]" />
          
          {/* Central studio spotlight / camera icon */}
          <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col items-center justify-center text-amber-500">
            <Aperture className="w-14 h-14 sm:w-16 sm:h-16 animate-bounce" />
            <div className="flex items-center gap-1.5 mt-1">
              <Film className="w-3.5 h-3.5 text-zinc-400" />
              <span className="text-[10px] font-black tracking-widest text-zinc-500">SCENE 404</span>
            </div>
          </div>

          <Sparkles className="absolute top-2 right-4 w-6 h-6 text-amber-400 animate-pulse" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
            Cut! Take Lost
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
            Studio Not Found
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
            The creative space, sound stage, or page you are looking for has been wrapped, relocated, or doesn&apos;t exist.
          </p>
        </div>

        {/* Action Buttons: Direct "Return to Home" button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>

          <Link
            href="/studios"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Studios</span>
          </Link>
        </div>

      </div>
    </div>
  );
}


'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, Mic, Music, Palette, ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'Photo Studios',
    slug: 'Photo Studio',
    description: 'Daylight lofts, cyclorama infinity walls, and portrait setups with pro strobes.',
    icon: Camera,
    count: '24 Spaces',
    color: 'from-amber-500/20 to-orange-500/20 text-amber-500 border-amber-500/30',
  },
  {
    name: 'Sound Stages',
    slug: 'Film Stage',
    description: 'Acoustically treated cinema stages, green screens, and 3-phase power bays.',
    icon: Film,
    count: '18 Spaces',
    color: 'from-blue-500/20 to-cyan-500/20 text-blue-500 border-blue-500/30',
  },
  {
    name: 'Podcast Rooms',
    slug: 'Podcast Room',
    description: 'Multi-mic broadcast suites with Shure SM7B mics and 4K camera switching.',
    icon: Mic,
    count: '16 Spaces',
    color: 'from-purple-500/20 to-pink-500/20 text-purple-500 border-purple-500/30',
  },
  {
    name: 'Music Suites',
    slug: 'Music Suite',
    description: 'Dolby Atmos mixing rooms, vocal booths, vintage microphones, and synth rigs.',
    icon: Music,
    count: '12 Spaces',
    color: 'from-emerald-500/20 to-teal-500/20 text-emerald-500 border-emerald-500/30',
  },
  {
    name: 'Art Workshops',
    slug: 'Art Workshop',
    description: 'Pottery wheels, industrial sculpture tables, kilns, and natural light studios.',
    icon: Palette,
    count: '15 Spaces',
    color: 'from-rose-500/20 to-red-500/20 text-rose-500 border-rose-500/30',
  },
];

export default function CategoryBrowse() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          Tailored Disciplines
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Browse by Studio Categories
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          Find spaces designed for your exact creative medium—from fashion shoots to immersive sound mixing.
        </p>
      </div>

      {/* Grid of Category Cards (Clicking pre-selects category in /studios) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/studios?category=${encodeURIComponent(cat.slug)}`}
              className="group flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.color} border flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-500 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-semibold text-zinc-500 dark:text-zinc-400 group-hover:text-amber-500 transition-colors">
                <span>{cat.count}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}


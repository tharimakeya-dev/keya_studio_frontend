'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, MapPin, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useWishlist } from '@/context/WishlistContext';

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isFavorited, toggleWishlist } = useWishlist();

  useEffect(() => {
    let active = true;

    async function loadFeaturedStudios() {
      try {
        const data = await apiFetch('/studios/featured');
        if (active && data && data.studios) {
          setStudios(data.studios);
        }
      } catch (err) {
        console.warn('Could not fetch from backend API, using fallback data:', err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadFeaturedStudios();

    return () => {
      active = false;
    };
  }, []);



  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Top Rated & Verified</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
            Featured Creative Studios
          </h2>
          <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
            Inspect dynamic availability, hourly pricing, and pro amenities in the highest-rated production spaces.
          </p>
        </div>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 text-sm font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 group"
        >
          <span>View All Workspaces</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Skeletons while loading */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden animate-pulse flex flex-col h-[420px]"
            >
              <div className="h-56 bg-zinc-200 dark:bg-zinc-800" />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                  <div className="w-full h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                  <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="w-24 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                  <div className="w-28 h-9 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : studios.length === 0 ? (
        /* Empty State */
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800">
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
            No featured studios found at the moment.
          </p>
          <Link
            href="/add-studio"
            className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm"
          >
            List the first studio
          </Link>
        </div>
      ) : (
        /* Studio Grid (Requirement: Equal width & height cards) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => {
            const studioId = studio._id;
            const isFav = isFavorited(studioId);

            return (
              <div
                key={studioId}
                className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
              >
                {/* Image Container with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={studio.imageUrl || studio.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80'}
                    alt={studio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-zinc-900/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                      {studio.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 text-white backdrop-blur-md border border-white/10 text-xs font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{studio.rating || '4.95'}</span>
                  </div>

                  {/* Wishlist Heart Button (Optional Feature) */}
                  <button
                    onClick={() => toggleWishlist(studio)}
                    aria-label="Save to Wishlist"
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-zinc-900/70 hover:bg-zinc-900 text-white backdrop-blur-md transition-all cursor-pointer shadow-sm"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav ? 'fill-red-500 text-red-500' : 'text-white'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-500 transition-colors line-clamp-1">
                      {studio.title}
                    </h3>

                    {/* Overview snippet */}
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {studio.detailedOverview}
                    </p>
                  </div>

                  {/* Footer with Hourly Rate & View Details Button */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-zinc-900 dark:text-zinc-50 font-sans">
                        ${studio.hourlyRate}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 ml-1">
                        / hr
                      </span>
                    </div>

                    <Link
                      href={`/studios/${studioId}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 text-zinc-900 dark:text-zinc-100 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}


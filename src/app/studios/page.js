'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Star,
  ArrowRight,
  Heart,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useWishlist } from '@/context/WishlistContext';
import { toast } from 'sonner';

const categories = [
  'All',
  'Photo Studio',
  'Film Stage',
  'Podcast Room',
  'Music Suite',
  'Art Workshop',
];

function StudiosContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const { isFavorited, toggleWishlist } = useWishlist();

  // Sync category state if URL query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    async function fetchStudios() {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (selectedCategory && selectedCategory !== 'All') {
          queryParams.set('category', selectedCategory);
        }
        if (searchQuery.trim()) {
          queryParams.set('search', searchQuery.trim());
        }
        if (sortBy === 'price-low') {
          queryParams.set('sort', 'price-low');
        } else if (sortBy === 'price-high') {
          queryParams.set('sort', 'price-high');
        } else if (sortBy === 'rating') {
          queryParams.set('sort', 'rating');
        }

        const data = await apiFetch(`/studios?${queryParams.toString()}`);
        if (active && data && data.studios) {
          setStudios(data.studios);
        }
      } catch (err) {
        console.warn('Backend query error:', err.message);
      } finally {
        if (active) setLoading(false);
      }
    }

    const debounce = setTimeout(fetchStudios, 250);
    return () => {
      active = false;
      clearTimeout(debounce);
    };
  }, [selectedCategory, searchQuery, sortBy]);



  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('recommended');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="mb-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Production Spaces & Sound Stages</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Explore Creative Workspaces
        </h1>
        <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Discover vetted cyclorama lofts, cinema sound stages, broadcast podcast lounges, and music recording suites ready for your next production.
        </p>
      </div>

      {/* Filter and Search Bar Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search studios by title, equipment, city..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all shadow-xs"
            />
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 dark:text-zinc-400">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Sort:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 text-sm focus:outline-none focus:border-amber-500 shadow-xs cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category Pills (Requirement: clicking category pre-selects filter) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-zinc-950 shadow-sm shadow-amber-500/20'
                    : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/40'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden animate-pulse flex flex-col h-[430px]"
            >
              <div className="h-56 bg-zinc-200 dark:bg-zinc-800" />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="w-20 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-full h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="w-24 h-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-28 h-9 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : studios.length === 0 ? (
        /* Empty States with Friendly CTA (Specification requirement) */
        <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            No Creative Studios Found
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            We couldn&apos;t find any workspaces matching &quot;{searchQuery || selectedCategory}&quot;. Try broadening your search or resetting filters.
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm shadow-sm hover:bg-amber-600 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              List Your Studio
            </Link>
          </div>
        </div>
      ) : (
        /* Studios Grid with Uniform Card Dimensions */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => {
            const studioId = studio._id;
            const isFav = isFavorited(studioId);

            return (
              <div
                key={studioId}
                className="group flex flex-col rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all duration-300"
              >
                {/* Image Aspect Box */}
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
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-zinc-950/80 text-white backdrop-blur-md border border-white/10 shadow-sm">
                      {studio.category}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 text-white backdrop-blur-md border border-white/10 text-xs font-bold shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{studio.rating || '4.95'}</span>
                  </div>

                  {/* Heart Wishlist Icon (Optional Requirement) */}
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

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{studio.location}</span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-amber-500 transition-colors line-clamp-1">
                      {studio.title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {studio.detailedOverview}
                    </p>
                  </div>

                  {/* Pricing and CTA button */}
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
    </div>
  );
}

export default function StudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
        </div>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}


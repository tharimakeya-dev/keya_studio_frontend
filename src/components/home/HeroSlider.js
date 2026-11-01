'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Building, Video } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Where Cinematic Vision Meets High-Performance Stages",
    subtitle: "Discover, inspect, and book acoustic sound stages, cyclorama daylight lofts, and immersive production suites with zero friction.",
    badge: "World-Class Production Workspaces",
    ctaPrimary: "Explore Studios",
    ctaSecondary: "Host Your Space",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=80",
    tag: "Film Stages & Sound Suites"
  },
  {
    id: 2,
    title: "Pristine Daylight Cyclorama Lofts for Editorial & Fashion",
    subtitle: "High-ceiling loft studios equipped with motorized backdrops, Profoto strobe kits, hair & makeup stations, and client viewing lounges.",
    badge: "Natural Light Photography Spaces",
    ctaPrimary: "Explore Studios",
    ctaSecondary: "Host Your Space",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1920&q=80",
    tag: "Daylight Photo Lofts"
  },
  {
    id: 3,
    title: "Broadcast-Ready Podcast Lounges & Music Suites",
    subtitle: "Calibrated acoustic environments with multi-angle 4K streaming cameras, Shure broadcast mics, and Dolby Atmos monitoring.",
    badge: "Plug & Play Audio Studios",
    ctaPrimary: "Explore Studios",
    ctaSecondary: "Host Your Space",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1920&q=80",
    tag: "Podcast & Music Rooms"
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative w-full h-[600px] sm:h-[680px] lg:h-[740px] overflow-hidden bg-zinc-950 text-white">
      {/* Background Images with Crossfade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
          } transform transition-transform duration-1000`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={idx === 0}
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Multi-layered dark cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl sm:max-w-3xl space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{active.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] font-sans drop-shadow-md">
            {active.title}
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed drop-shadow">
            {active.subtitle}
          </p>

          {/* Primary CTA Buttons (Linking to /studios as requested) */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm sm:text-base shadow-xl shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{active.ctaPrimary}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/studios"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base backdrop-blur-md transition-all cursor-pointer"
            >
              <Building className="w-5 h-5 text-amber-400" />
              <span>{active.ctaSecondary}</span>
            </Link>
          </div>

          {/* Quick Stats / Highlights */}
          <div className="pt-6 border-t border-white/10 flex items-center gap-6 text-xs sm:text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-medium text-zinc-200">100+ Verified Spaces</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-amber-400" />
              <span className="font-medium text-zinc-200">Instant Hourly Booking</span>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/60 hover:bg-amber-500 hover:text-zinc-950 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-zinc-900/60 hover:bg-amber-500 hover:text-zinc-950 border border-white/10 text-white flex items-center justify-center transition-all cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Indicators (Dots) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all rounded-full ${
              idx === currentSlide
                ? 'w-8 h-2 bg-amber-500'
                : 'w-2 h-2 bg-white/40 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </section>
  );
}


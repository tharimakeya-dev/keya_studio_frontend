import React from 'react';
import { Search, Clock, Zap, Sparkles } from 'lucide-react';

const steps = [
  {
    step: "01",
    title: "Discover Spaces",
    description: "Filter top-rated studios by creative discipline, acoustic isolation, cyc wall dimensions, and pro equipment lists.",
    icon: Search,
  },
  {
    step: "02",
    title: "Select Shoot Hours",
    description: "Choose your exact production time slot. Dynamic calendar availability prevents scheduling collisions with other crews.",
    icon: Clock,
  },
  {
    step: "03",
    title: "Book Instantly",
    description: "Reserve your session with transparent hourly pricing, verified security deposits, and immediate host confirmation.",
    icon: Zap,
  },
  {
    step: "04",
    title: "Create & Produce",
    description: "Check in with smart access codes, utilize calibrated gear, and bring your vision to life with complete host backing.",
    icon: Sparkles,
  },
];

export default function HowBookingWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          Streamlined Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          How Booking Works
        </h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          From finding the perfect sound stage to rolling camera—experience a seamless four-step creative booking journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-all shadow-xs"
            >
              {/* Step indicator tag */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-black text-zinc-200 dark:text-zinc-800 font-mono">
                  {item.step}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Connecting line on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 border-t-2 border-dashed border-zinc-300 dark:border-zinc-700 z-10" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}


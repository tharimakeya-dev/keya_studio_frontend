import React from 'react';
import { ShieldCheck, UserCheck, Wrench, Headphones, CheckCircle2 } from 'lucide-react';

const guarantees = [
  {
    title: "Liability Protection",
    badge: "$1,000,000 Guarantee",
    description: "Every shoot booked through StudioSpace is backed by comprehensive liability insurance covering property damage and set accidents.",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles & Studios",
    badge: "100% Identity Check",
    description: "We manually verify every studio host's identity, physical address, and gear list so you never arrive to unexpected surprises.",
    icon: UserCheck,
  },
  {
    title: "Equipment Safety & Calibration",
    badge: "Pre-Tested Gear",
    description: "Rigging points, electrical 3-phase panels, lighting kits, and audio boards undergo regular inspection by verified technicians.",
    icon: Wrench,
  },
  {
    title: "24/7 Creator Support",
    badge: "Live Production Line",
    description: "Real production coordinators are on call 24/7 during your reserved hours to resolve access issues or provide immediate assistance.",
    icon: Headphones,
  },
];

export default function HostGuarantee() {
  return (
    <section id="creator-support" className="py-20 px-4 sm:px-6 lg:px-8 bg-zinc-100/60 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800 scroll-mt-24 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              Platform Assurances
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
              Host Guarantee & Creator Support
            </h2>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400 max-w-xl">
              Produce with peace of mind. Our built-in safeguards protect both creators and venue owners at every turn.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>Guaranteed Production Uptime</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guarantees.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-4 hover:border-emerald-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mt-1">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


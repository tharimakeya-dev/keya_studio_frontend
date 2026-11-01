import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service — Keya Studio',
  description: 'Review the terms of service and host/guest liability policies for Keya Studio.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 hover:text-amber-500 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Terms of Service & Studio Agreement
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Last updated: October 2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            1. Marketplace Booking Principles
          </h2>
          <p>
            Keya Studio connects independent creators, filmmakers, photographers, and audio engineers with verified studio venue hosts. All bookings are reservations for production slots and require mutual compliance with facility guidelines.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            2. Host Protection & Security Deposits
          </h2>
          <p>
            Security deposits held during studio sessions are 100% refundable upon post-shoot inspection confirming equipment, lighting kits, and cyclorama walls are undamaged and vacated on schedule.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            3. Cancellation & Rescheduling
          </h2>
          <p>
            Reservations with &quot;Pending&quot; status can be cancelled at any time by the booking creator directly from their dashboard. Confirmed bookings adhere to the host-specified rescheduling window.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            4. Double-Booking Guarantee
          </h2>
          <p>
            Keya Studio utilizes real-time concurrency control algorithms to prevent overlapping reservations on confirmed studio stages, ensuring your reserved production hours remain guaranteed.
          </p>
        </section>
      </div>
    </div>
  );
}

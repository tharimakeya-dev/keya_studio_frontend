import React from 'react';
import Link from 'next/link';
import { Lock, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — Keya Studio',
  description: 'Understand how Keya Studio protects creator data, bookings, and host identities.',
};

export default function PrivacyPage() {
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
          <Lock className="w-3.5 h-3.5" />
          <span>Data Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Privacy & Security Policy
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Last updated: October 2026</p>
      </div>

      <div className="space-y-6 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            1. Cookie Security & Session Isolation
          </h2>
          <p>
            Keya Studio stores authorization tokens strictly within secure, HTTPOnly cookies. Authentication credentials are never accessible to client-side scripts, protecting your sessions against Cross-Site Scripting (XSS).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            2. Host & Creative Privacy
          </h2>
          <p>
            Private host contact information and studio access codes are only shared with confirmed booking parties for the scheduled production duration.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            3. Media & Uploaded Assets
          </h2>
          <p>
            Photos uploaded to studio listings and creator profiles are delivered over encrypted HTTPS content delivery networks (ImgBB / Cloudflare) and can be removed at any time via your host portal.
          </p>
        </section>
      </div>
    </div>
  );
}

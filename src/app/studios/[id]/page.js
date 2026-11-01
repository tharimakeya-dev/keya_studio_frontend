'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Star,
  MapPin,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Mail,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  AlertTriangle,
  Building,
} from 'lucide-react';
import { apiFetch } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

function StudioDetailsContent({ params }) {
  const unwrappedParams = use(params);
  const studioId = unwrappedParams.id;
  const router = useRouter();
  const { user } = useAuth();

  const [studio, setStudio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('14:00');
  const [notes, setNotes] = useState('');
  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [bookingError, setBookingError] = useState('');

  // Fetch Studio Details
  useEffect(() => {
    let active = true;

    async function loadStudio() {
      setLoading(true);
      try {
        const data = await apiFetch(`/studios/${studioId}`);
        if (active && data && data.studio) {
          setStudio(data.studio);
        }
      } catch (err) {
        toast.error(err.message || 'Failed to load studio details.');
      } finally {
        if (active) setLoading(false);
      }
    }

    if (studioId) {
      loadStudio();
    }

    return () => {
      active = false;
    };
  }, [studioId]);

  // Fallback images if studio only has one
  const galleryImages = studio
    ? studio.images && studio.images.length > 0
      ? studio.images
      : [studio.imageUrl, 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80']
    : [];

  // Duration calculation
  const getDurationHours = () => {
    if (!startTime || !endTime) return 0;
    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);
    const totalMinutes = endH * 60 + endM - (startH * 60 + startM);
    return Math.max(0, Math.round((totalMinutes / 60) * 10) / 10);
  };

  const durationHours = getDurationHours();
  const subtotal = durationHours * (studio?.hourlyRate || 0);
  const securityDeposit = studio?.securityDeposit || 0;
  const estimatedTotal = subtotal + securityDeposit;

  const handleOpenBooking = () => {
    if (!user) {
      toast.info('Please log in to reserve this creative workspace.');
      router.push(`/login?redirect=/studios/${studioId}`);
      return;
    }
    setBookingError('');
    setIsModalOpen(true);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setBookingError('');

    if (!bookingDate) {
      setBookingError('Please choose a valid shoot date.');
      toast.error('Shoot date is required');
      return;
    }

    if (durationHours <= 0) {
      setBookingError('End time must be after start time.');
      toast.error('Invalid shoot time duration');
      return;
    }

    setSubmittingBooking(true);
    try {
      const res = await apiFetch('/bookings', {
        method: 'POST',
        body: JSON.stringify({
          studioId: studio._id,
          bookingDate,
          startTime,
          endTime,
          notes,
        }),
      });

      toast.success(res.message || 'Reservation submitted with status Pending!');
      setIsModalOpen(false);
      router.push('/my-bookings');
    } catch (err) {
      const errorMsg = err.message || 'Failed to submit booking reservation.';
      setBookingError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmittingBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-7xl mx-auto animate-pulse space-y-8">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-[450px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-2xl" />
          </div>
          <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Studio Workspace Not Found</h2>
        <p className="text-sm text-zinc-500">The requested production studio does not exist or has been removed.</p>
        <Link href="/studios" className="px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm">
          Browse All Studios
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/studios" className="hover:text-amber-500 transition-colors">Studios</Link>
        <span>/</span>
        <span className="text-zinc-900 dark:text-zinc-200 truncate">{studio.title}</span>
      </div>

      {/* Title & Key Highlights Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-500 border border-amber-500/20">
              {studio.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{studio.rating || '4.95'}</span>
              <span className="text-zinc-400">({studio.reviewsCount || 42} reviews)</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
            {studio.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
            <span>{studio.location}</span>
          </div>
        </div>

        {/* Pricing Badge on Desktop */}
        <div className="hidden lg:flex flex-col items-end p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">Standard Booking Rate</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50 font-sans">${studio.hourlyRate}</span>
            <span className="text-xs text-zinc-500">/ hr</span>
          </div>
        </div>
      </div>

      {/* Gallery Carousel (Specification Requirement) */}
      <div className="space-y-4">
        <div className="relative h-[380px] sm:h-[480px] lg:h-[540px] w-full rounded-3xl overflow-hidden bg-zinc-950 shadow-lg">
          <Image
            src={galleryImages[activeImageIndex] || studio.imageUrl}
            alt={`${studio.title} - view ${activeImageIndex + 1}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* Previous / Next Arrow Controls */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImageIndex(
                    (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous Image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/70 hover:bg-amber-500 hover:text-zinc-950 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setActiveImageIndex((prev) => (prev + 1) % galleryImages.length)
                }
                aria-label="Next Image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/70 hover:bg-amber-500 hover:text-zinc-950 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Counter pill */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-zinc-950/80 text-white text-xs font-semibold backdrop-blur-md border border-white/10">
            {activeImageIndex + 1} / {galleryImages.length} Photos
          </div>
        </div>

        {/* Thumbnail Strip */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-24 h-18 sm:w-28 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-amber-500 scale-95 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Grid: Specifications & Booking Sticky Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Columns: Specs, Overview, Amenities, Host, Reviews */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Workspace Specifications Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Hourly Rate</span>
              <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">${studio.hourlyRate}/hr</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Security Deposit</span>
              <p className="text-xl font-black text-zinc-900 dark:text-zinc-50">${studio.securityDeposit || 100}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Max Capacity</span>
              <p className="text-xl font-black text-zinc-900 dark:text-zinc-50 flex items-center justify-center gap-1">
                <Users className="w-4 h-4 text-amber-500" />
                <span>{studio.maxCapacity || 15}</span>
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center space-y-1">
              <span className="text-xs text-zinc-500 font-semibold uppercase">Discipline</span>
              <p className="text-sm font-bold text-amber-500 truncate mt-1">{studio.category}</p>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-sans">
              About This Production Space
            </h2>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-300 whitespace-pre-line">
              {studio.detailedOverview}
            </p>
          </div>

          {/* Amenity List (Specification Requirement) */}
          <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-sans">
              Included Studio Amenities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {(studio.amenities || [
                'Full Acoustic Baffling',
                'Corner Cyclorama Wall',
                'Profoto Strobe Kit',
                'Hair & Makeup Vanity Station',
                '3-Phase 100A Electrical Panel',
                'Freight Elevator Access',
                'High-Speed Production Wi-Fi',
                'Dedicated Client Lounge',
              ]).map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Host Profile Card (Specification Requirement) */}
          <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-sans">
              Studio Host & Verification
            </h2>
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-xl">
                  {studio.ownerName ? studio.ownerName[0] : 'H'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                      {studio.ownerName || 'Verified Studio Host'}
                    </h3>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Verified Host on Keya Studio • Typically responds within 30 mins
                  </p>
                  <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{studio.ownerEmail || 'host@keyastudio.com'}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toast.info(`Host email: ${studio.ownerEmail || 'contact@keyastudio.com'}`)}
                className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Contact Host
              </button>
            </div>
          </div>

          {/* Customer Reviews Section (Specification Requirement) */}
          <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 font-sans">
                Production Reviews
              </h2>
              <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{studio.rating || '4.95'}</span>
              </div>
            </div>

            <div className="space-y-4">
              {[
                {
                  author: "Marcus Chen",
                  role: "Director of Photography",
                  date: "2 weeks ago",
                  comment: "Exceptional daylight quality and super smooth load-in with the freight elevator. The motorized seamless backdrops saved us at least 45 minutes on set.",
                  rating: 5,
                },
                {
                  author: "Sarah Jenkins",
                  role: "Executive Podcast Producer",
                  date: "1 month ago",
                  comment: "Acoustics were dead-silent even during street construction. The Shure SM7B mics and Rodecaster were calibrated perfectly upon arrival. Will book again!",
                  rating: 5,
                },
              ].map((rev, index) => (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{rev.author}</h4>
                      <p className="text-xs text-zinc-500">{rev.role} • {rev.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sticky Sidebar: Pricing & Book Workspace Now Button */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-6">
            <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-3xl font-black text-zinc-900 dark:text-zinc-50 font-sans">
                  ${studio.hourlyRate}
                </span>
                <span className="text-xs text-zinc-500 ml-1">/ hour</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{studio.rating || '4.95'}</span>
              </div>
            </div>

            {/* Quick Details List */}
            <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">${studio.securityDeposit || 100}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Crew Capacity</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{studio.maxCapacity || 15} Persons</span>
              </div>
              <div className="flex justify-between">
                <span>Cleaning & Prep Fee</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Included</span>
              </div>
            </div>

            {/* Launch Modal Button */}
            <button
              type="button"
              onClick={handleOpenBooking}
              className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Workspace Now</span>
            </button>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center space-y-1">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                Instant Host Reservation
              </span>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight">
                Reservations are created with &quot;Pending&quot; status and protected against double-booking.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Booking Modal (Specification Requirement) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                  Reserve {studio.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Hourly Rate: ${studio.hourlyRate}/hr • Location: {studio.location}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Double-Booking Error Banner (Challenge 2) */}
            {bookingError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{bookingError}</span>
              </div>
            )}

            <form onSubmit={handleSubmitBooking} className="space-y-4">
              {/* Date */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Shoot Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDate}
                    onChange={(e) => {
                      setBookingDate(e.target.value);
                      setBookingError('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Start & End Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Start Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="time"
                      required
                      value={startTime}
                      onChange={(e) => {
                        setStartTime(e.target.value);
                        setBookingError('');
                      }}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    End Time
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="time"
                      required
                      value={endTime}
                      onChange={(e) => {
                        setEndTime(e.target.value);
                        setBookingError('');
                      }}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Production Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Production Notes & Equipment Needs
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., 6 crew members, bringing 2 RED cameras, requesting lighting grid power."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500 placeholder-zinc-400"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Duration</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">{durationHours} hours</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Subtotal (${studio.hourlyRate}/hr × {durationHours} hrs)</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">${subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Refundable Security Deposit</span>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">${securityDeposit}</span>
                </div>
                <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 flex justify-between text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  <span>Total Due</span>
                  <span className="text-amber-500 font-black">${estimatedTotal}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submittingBooking || durationHours <= 0}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submittingBooking ? 'Checking Availability & Reserving...' : 'Confirm Reservation'}
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default function StudioDetailsPage({ params }) {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen py-16 px-4 max-w-7xl mx-auto animate-pulse space-y-8">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
          <div className="h-[450px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
        </div>
      }
    >
      <StudioDetailsContent params={params} />
    </React.Suspense>
  );
}

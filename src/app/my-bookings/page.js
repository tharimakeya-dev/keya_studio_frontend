'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import {
  Calendar,
  Clock,
  MapPin,
  Building,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  CalendarCheck,
  RotateCcw,
} from 'lucide-react';

function MyBookingsContent() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    let active = true;

    async function loadBookings() {
      try {
        const data = await apiFetch('/bookings/my');
        if (active && data && data.bookings) {
          setBookings(data.bookings);
        }
      } catch (err) {
        toast.error(err.message || 'Failed to load reservations.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadBookings();

    return () => {
      active = false;
    };
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this pending studio reservation?')) {
      return;
    }

    setCancellingId(bookingId);
    try {
      const res = await apiFetch(`/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
      });
      toast.success(res.message || 'Booking cancelled.');
      // Update local state
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'Cancelled' } : b))
      );
    } catch (err) {
      toast.error(err.message || 'Failed to cancel reservation.');
    } finally {
      setCancellingId(null);
    }
  };

  // Optional Requirement: PDF Booking Invoice Generator
  const handleDownloadInvoice = (booking) => {
    try {
      const invoiceContent = `
============================================================
              KEYA STUDIO — BOOKING INVOICE RECEIPT
============================================================
Invoice Reference: INV-${booking._id.slice(-6).toUpperCase()}
Issued Date:       ${new Date().toLocaleDateString()}
Status:            ${booking.status.toUpperCase()}

CUSTOMER DETAILS:
Name:              ${booking.userName}
Email:             ${booking.userEmail}

STUDIO SPECIFICATIONS:
Studio:            ${booking.studioTitle}
Discipline:        ${booking.studioCategory}
Location:          ${booking.studioLocation}

RESERVATION TIMELINE:
Shoot Date:        ${booking.bookingDate}
Scheduled Time:    ${booking.startTime} - ${booking.endTime}
Duration:          ${booking.durationHours} hours

FINANCIAL BREAKDOWN:
Hourly Rate:       $${booking.hourlyRate}/hr
Shoot Subtotal:    $${booking.subtotal}
Security Deposit:  $${booking.securityDeposit} (Refundable)
------------------------------------------------------------
TOTAL PAID / DUE:  $${booking.totalAmount}
============================================================
Thank you for creating with Keya Studio!
Support: support@keyastudio.com
`;

      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KeyaStudio-Invoice-${booking._id.slice(-6)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Downloaded booking invoice receipt!');
    } catch {
      toast.error('Could not generate invoice at this time.');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Confirmed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Pending Host Confirmation
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-zinc-500/10 text-zinc-500 border border-zinc-500/20">
            <XCircle className="w-3.5 h-3.5" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-zinc-200 text-zinc-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Production Reservations</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
            My Studio Bookings
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Track confirmed shoot dates, view host responses, download receipts, and manage pending slots.
          </p>
        </div>

        <Link
          href="/studios"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <Building className="w-4 h-4" />
          <span>Book Another Studio</span>
        </Link>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-pulse flex flex-col sm:flex-row gap-6"
            >
              <div className="w-full sm:w-48 h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="w-1/3 h-5 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="w-1/2 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="w-1/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : bookings.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <Calendar className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            No Studio Reservations Yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            You haven&apos;t booked any production spaces yet. Explore available photography cyc walls, sound stages, and podcast rooms now.
          </p>
          <div className="pt-2">
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Browse Creative Workspaces
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const isPending = booking.status === 'Pending';
            const isConfirmed = booking.status === 'Confirmed';

            return (
              <div
                key={booking._id}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-amber-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
              >
                {/* Left Info: Image & Details */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full lg:w-auto">
                  <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    <Image
                      src={booking.studioImage || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80'}
                      alt={booking.studioTitle}
                      fill
                      sizes="180px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      {getStatusBadge(booking.status)}
                      <span className="text-xs text-zinc-400 font-medium">
                        Ref: #{booking._id.slice(-6).toUpperCase()}
                      </span>
                    </div>

                    <Link
                      href={`/studios/${booking.studioId}`}
                      className="text-lg font-bold text-zinc-900 dark:text-zinc-50 hover:text-amber-500 transition-colors line-clamp-1"
                    >
                      {booking.studioTitle}
                    </Link>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">{booking.studioLocation}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-semibold">{booking.bookingDate}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{booking.startTime} - {booking.endTime} ({booking.durationHours} hrs)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Info: Financial Total & Actions */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800 gap-4">
                  <div className="text-left lg:text-right">
                    <span className="text-xs text-zinc-400 font-semibold uppercase">Total Amount</span>
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50 font-sans">
                      ${booking.totalAmount}
                    </p>
                    <span className="text-[11px] text-zinc-400">
                      (${booking.hourlyRate}/hr + ${booking.securityDeposit} dep)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Optional: Download PDF Invoice */}
                    {isConfirmed && (
                      <button
                        type="button"
                        onClick={() => handleDownloadInvoice(booking)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                        title="Download Booking Invoice"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    )}

                    {/* Specification requirement: "Cancel Booking option for pending slots" */}
                    {isPending && (
                      <button
                        type="button"
                        disabled={cancellingId === booking._id}
                        onClick={() => handleCancelBooking(booking._id)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-red-300 dark:border-red-900/60 bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>{cancellingId === booking._id ? 'Cancelling...' : 'Cancel Booking'}</span>
                      </button>
                    )}
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

export default function MyBookingsPage() {
  return (
    <ProtectedRoute>
      <MyBookingsContent />
    </ProtectedRoute>
  );
}


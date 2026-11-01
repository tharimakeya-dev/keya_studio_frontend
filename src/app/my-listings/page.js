'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { apiFetch } from '@/lib/api';
import { toast } from 'sonner';
import {
  Building2,
  PlusCircle,
  Edit3,
  Trash2,
  MapPin,
  Star,
  DollarSign,
  AlertTriangle,
  X,
  ExternalLink,
} from 'lucide-react';

function MyListingsContent() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Custom Delete Confirmation Modal State (Specification Requirement)
  const [studioToDelete, setStudioToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadMyListings() {
      try {
        const data = await apiFetch('/studios/owner/my-listings');
        if (active && data && data.studios) {
          setStudios(data.studios);
        }
      } catch (err) {
        toast.error(err.message || 'Failed to fetch your studio listings.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMyListings();

    return () => {
      active = false;
    };
  }, []);

  const confirmDelete = async () => {
    if (!studioToDelete) return;

    setDeleting(true);
    try {
      const res = await apiFetch(`/studios/${studioToDelete._id}`, {
        method: 'DELETE',
      });

      // Specification: "Show confirmation modal before deleting the document from MongoDB with a success toast."
      toast.success(res.message || 'Studio listing deleted successfully.');
      setStudios((prev) => prev.filter((s) => s._id !== studioToDelete._id));
      setStudioToDelete(null);
    } catch (err) {
      toast.error(err.message || 'Failed to delete studio listing.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
            <Building2 className="w-3.5 h-3.5" />
            <span>Host Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
            My Studio Listings
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Manage your published production venues, update pricing and equipment, or list new facilities.
          </p>
        </div>

        <Link
          href="/add-studio"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Studio</span>
        </Link>
      </div>

      {/* Content Table / Cards */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 animate-pulse flex flex-col sm:flex-row gap-6"
            >
              <div className="w-full sm:w-44 h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="w-1/3 h-5 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="w-1/2 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="w-1/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : studios.length === 0 ? (
        /* Empty State */
        <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center">
            <Building2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            No Studios Listed Yet
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            You have not added any creative workspaces to Keya Studio yet. Start monetizing your daylight cyc wall, podcast lounge, or audio suite.
          </p>
          <div className="pt-2">
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Your First Studio</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Table / Card View (Specification Requirement) */
        <div className="space-y-4">
          {studios.map((studio) => (
            <div
              key={studio._id}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs hover:border-amber-500/40 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              {/* Studio Thumbnail & Info */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 w-full lg:w-auto">
                <div className="relative w-full sm:w-44 h-32 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                  <Image
                    src={studio.imageUrl || studio.images?.[0] || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80'}
                    alt={studio.title}
                    fill
                    sizes="180px"
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-zinc-900/80 text-white text-[10px] font-bold uppercase backdrop-blur-sm">
                    {studio.category}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="text-lg font-bold text-zinc-900 dark:text-zinc-50 hover:text-amber-500 transition-colors line-clamp-1"
                    >
                      {studio.title}
                    </Link>
                    <Link
                      href={`/studios/${studio._id}`}
                      title="Preview public listing"
                      className="text-zinc-400 hover:text-amber-500"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span className="truncate">{studio.location}</span>
                  </div>

                  <div className="flex items-center gap-4 pt-1 text-xs text-zinc-600 dark:text-zinc-400">
                    <span className="font-bold text-zinc-900 dark:text-zinc-100">
                      ${studio.hourlyRate}/hour
                    </span>
                    <span>•</span>
                    <span>Deposit: ${studio.securityDeposit || 0}</span>
                    <span>•</span>
                    <span>Max {studio.maxCapacity || 10} Persons</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Update and Delete */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-4 sm:pt-0 border-zinc-100 dark:border-zinc-800">
                <Link
                  href={`/studios/edit/${studio._id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>Update</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setStudioToDelete(studio)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 dark:text-red-400 hover:text-white border border-red-500/20 text-xs font-bold transition-all cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Custom Confirmation Modal (Specification Requirement) */}
      {studioToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl space-y-5">
            
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Delete Studio Listing?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Are you sure you want to delete <span className="font-semibold text-zinc-900 dark:text-zinc-100">&quot;{studioToDelete.title}&quot;</span>? This action will permanently remove the workspace from MongoDB and cancel any pending calendar slots.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setStudioToDelete(null)}
                className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={confirmDelete}
                className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete Studio'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function MyListingsPage() {
  return (
    <ProtectedRoute>
      <MyListingsContent />
    </ProtectedRoute>
  );
}


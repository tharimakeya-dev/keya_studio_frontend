'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { uploadImageToImgBB } from '@/lib/uploadImage';
import { toast } from 'sonner';
import {
  Building2,
  DollarSign,
  Shield,
  Users,
  MapPin,
  Image as ImageIcon,
  CheckSquare,
  Square,
  User,
  Mail,
  Edit3,
  Upload,
} from 'lucide-react';

const availableCategories = [
  'Photo Studio',
  'Film Stage',
  'Podcast Room',
  'Music Suite',
  'Art Workshop',
];

const standardAmenities = [
  'Corner Cyclorama Wall',
  'Profoto Lighting Kit',
  'Acoustic Sound Isolation',
  'Green Screen Cyc',
  'Hair & Makeup Vanity Station',
  '3-Phase 100A Electrical Power',
  'Freight Elevator Access',
  'High-Speed Wi-Fi (1Gbps)',
  'Dedicated Client Viewing Lounge',
  'Drive-in Vehicle Loading Bay',
  'Dolby Atmos Monitoring',
  'Electric Ceramic Kiln',
];

function EditStudioContent({ params }) {
  const unwrappedParams = use(params);
  const studioId = unwrappedParams.id;
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Photo Studio',
    hourlyRate: '',
    securityDeposit: '',
    maxCapacity: '',
    location: '',
    imageUrl: '',
    detailedOverview: '',
    ownerName: '',
    ownerEmail: '',
  });

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const toastId = toast.loading('Uploading image to ImgBB cloud...');

    try {
      const hostedUrl = await uploadImageToImgBB(file);
      setFormData((prev) => ({ ...prev, imageUrl: hostedUrl }));
      toast.success('Image uploaded to ImgBB successfully!', { id: toastId });
    } catch (err) {
      toast.error(err.message || 'ImgBB upload failed. You can paste direct image URL.', { id: toastId });
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    let active = true;

    async function loadStudioData() {
      try {
        const data = await apiFetch(`/studios/${studioId}`);
        if (active && data && data.studio) {
          const s = data.studio;
          setFormData({
            title: s.title || '',
            category: s.category || 'Photo Studio',
            hourlyRate: s.hourlyRate || '',
            securityDeposit: s.securityDeposit || '',
            maxCapacity: s.maxCapacity || '',
            location: s.location || '',
            imageUrl: s.imageUrl || '',
            detailedOverview: s.detailedOverview || '',
            ownerName: s.ownerName || user?.name || '',
            ownerEmail: s.ownerEmail || user?.email || '',
          });
          setSelectedAmenities(s.amenities || []);
        }
      } catch (err) {
        toast.error(err.message || 'Failed to load studio details.');
      } finally {
        if (active) setLoading(false);
      }
    }

    if (studioId) {
      loadStudioData();
    }

    return () => {
      active = false;
    };
  }, [studioId, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit || 0),
        maxCapacity: Number(formData.maxCapacity || 10),
        location: formData.location,
        imageUrl: formData.imageUrl,
        amenities: selectedAmenities,
        detailedOverview: formData.detailedOverview,
      };

      const res = await apiFetch(`/studios/${studioId}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      });

      // Specification: "show a success toast before redirecting to /my-listings"
      toast.success(res.message || 'Studio listing updated successfully!');
      router.push('/my-listings');
    } catch (err) {
      toast.error(err.message || 'Failed to update studio.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-4 max-w-4xl mx-auto animate-pulse space-y-6">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
        <div className="h-[500px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-amber-500/20">
          <Edit3 className="w-3.5 h-3.5" />
          <span>Listing Editor</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
          Update Studio Listing
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Modify your studio specifications, pricing, amenities, or descriptions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
        
        {/* Read-Only Host Information (Spec Requirement) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Host Information (Read-Only)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Host Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  readOnly
                  value={formData.ownerName}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-500 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                Host Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  readOnly
                  value={formData.ownerEmail}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-500 text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Studio Specs */}
        <div className="space-y-6">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-50 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            Specifications & Pricing
          </h3>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Studio Title *
            </label>
            <div className="relative">
              <Building2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Hourly Rate ($) *
              </label>
              <div className="relative">
                <DollarSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="number"
                  name="hourlyRate"
                  required
                  min="1"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Security Deposit ($)
              </label>
              <div className="relative">
                <Shield className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="number"
                  name="securityDeposit"
                  min="0"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Max Capacity
              </label>
              <div className="relative">
                <Users className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="number"
                  name="maxCapacity"
                  min="1"
                  value={formData.maxCapacity}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Studio Address / Location *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Studio Primary Visual
            </label>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors cursor-pointer border border-zinc-300 dark:border-zinc-700">
                  <Upload className="w-4 h-4 text-amber-500" />
                  <span>{uploadingImage ? 'Uploading Image...' : 'Upload New Image via ImgBB'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploadingImage}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-zinc-400">or paste direct image URL</span>
              </div>

              <div className="relative">
                <ImageIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-2">
              Amenities List
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {standardAmenities.map((amenity) => {
                const isChecked = selectedAmenities.includes(amenity);
                return (
                  <button
                    type="button"
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'border-amber-500/60 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                        : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/40 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-amber-500 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-400 shrink-0" />
                    )}
                    <span className="truncate">{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Detailed Overview *
            </label>
            <textarea
              name="detailedOverview"
              required
              rows={4}
              value={formData.detailedOverview}
              onChange={handleChange}
              className="w-full p-4 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-zinc-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {submitting ? 'Saving Changes...' : 'Save & Update Studio'}
        </button>

      </form>
    </div>
  );
}

export default function EditStudioPage({ params }) {
  return (
    <ProtectedRoute>
      <React.Suspense
        fallback={
          <div className="min-h-screen py-16 px-4 max-w-4xl mx-auto animate-pulse space-y-6">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3" />
            <div className="h-[500px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl" />
          </div>
        }
      >
        <EditStudioContent params={params} />
      </React.Suspense>
    </ProtectedRoute>
  );
}


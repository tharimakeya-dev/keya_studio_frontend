'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '@/lib/api';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWishlist = useCallback(async () => {
    if (!user) {
      setWishlist([]);
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch('/wishlist');
      if (data && data.wishlist) {
        setWishlist(data.wishlist);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  const isFavorited = (studioId) => {
    return wishlist.some((item) => item.studioId === studioId.toString());
  };

  const toggleWishlist = async (studio) => {
    if (!user) {
      toast.info('Please log in to save studios to your wishlist.');
      return;
    }

    const studioId = studio._id.toString();
    const alreadySaved = isFavorited(studioId);

    if (alreadySaved) {
      try {
        await apiFetch(`/wishlist/${studioId}`, { method: 'DELETE' });
        setWishlist((prev) => prev.filter((item) => item.studioId !== studioId));
        toast.info(`Removed "${studio.title}" from your wishlist.`);
      } catch (err) {
        toast.error(err.message || 'Failed to remove from wishlist.');
      }
    } else {
      try {
        const res = await apiFetch(`/wishlist/${studioId}`, { method: 'POST' });
        setWishlist((prev) => [
          ...prev,
          {
            studioId,
            studioTitle: studio.title,
            studioCategory: studio.category,
            studioLocation: studio.location,
            studioImage: studio.imageUrl || studio.images?.[0] || '',
            hourlyRate: studio.hourlyRate,
            rating: studio.rating,
          },
        ]);
        toast.success(res.message || `Saved "${studio.title}" to wishlist!`);
      } catch (err) {
        toast.error(err.message || 'Failed to save to wishlist.');
      }
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        isFavorited,
        toggleWishlist,
        loadWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

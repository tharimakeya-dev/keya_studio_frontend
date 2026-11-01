'use client';

import React from 'react';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Toaster } from 'sonner';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          {children}
          <Toaster
            richColors
            position="top-right"
            closeButton
            toastOptions={{
              style: {
                borderRadius: '0.75rem',
              },
            }}
          />
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}


'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshSession = useCallback(async () => {
    try {
      const data = await apiFetch('/auth/me');
      if (data && data.success && data.user) {
        setUser(data.user);
        localStorage.setItem('studiospace_user', JSON.stringify(data.user));
      } else {
        setUser(null);
        localStorage.removeItem('studiospace_user');
      }
    } catch {
      setUser(null);
      localStorage.removeItem('studiospace_user');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial verification on mount
  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const data = await apiFetch('/auth/me');
        if (active) {
          if (data && data.success && data.user) {
            setUser(data.user);
            localStorage.setItem('studiospace_user', JSON.stringify(data.user));
          } else {
            setUser(null);
            localStorage.removeItem('studiospace_user');
          }
        }
      } catch {
        if (active) {
          setUser(null);
          localStorage.removeItem('studiospace_user');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  async function login(email, password) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('studiospace_user', JSON.stringify(data.user));
    }
    return data;
  }

  async function register(name, email, photoURL, password) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, photoURL, password }),
    });
    return data;
  }

  async function socialLogin({ name, email, photoURL, provider = 'google' }) {
    const data = await apiFetch('/auth/social-login', {
      method: 'POST',
      body: JSON.stringify({ name, email, photoURL, provider }),
    });

    if (data.success && data.user) {
      setUser(data.user);
      localStorage.setItem('studiospace_user', JSON.stringify(data.user));
    }
    return data;
  }

  async function logout() {
    try {
      await apiFetch('/auth/logout', { method: 'POST' });
    } catch {
      // Continue clearing
    } finally {
      setUser(null);
      localStorage.removeItem('studiospace_user');
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        socialLogin,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

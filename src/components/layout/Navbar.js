'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Aperture,
  Sun,
  Moon,
  Menu,
  X,
  PlusCircle,
  LayoutDashboard,
  CalendarCheck,
  Building2,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { toast } from 'sonner';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu and dropdown on route change
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMobileMenuOpen(false);
      setDropdownOpen(false);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully.');
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore Studios', href: '/studios' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'About Us', href: '/#about-us' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 dark:bg-zinc-950/85 border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with Aperture Spotlight Icon */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all shadow-sm">
              <Aperture className="w-6 h-6 transition-transform group-hover:rotate-45" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 font-sans">
                Keya<span className="text-amber-500">Studio</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 dark:text-zinc-500 -mt-1">
                Creative Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle + Auth State */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Theme Customization Toggle (Challenge 3) */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {mounted && theme === 'light' ? (
                <Moon className="w-5 h-5 text-zinc-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            {/* Unauthenticated State */}
            {!user ? (
              <div className="flex items-center gap-2.5">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-semibold rounded-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 shadow-sm shadow-amber-500/20 transition-all cursor-pointer"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              /* Authenticated State */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 p-1.5 pl-2 pr-3 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50 bg-zinc-50 dark:bg-zinc-900 transition-all cursor-pointer"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 font-bold text-sm">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.name || 'User Avatar'}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <span>{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 max-w-[120px] truncate">
                    {user.name || 'Creator'}
                  </span>
                  <ChevronDown className="w-4 h-4 text-zinc-400" />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800">
                      <p className="text-xs text-zinc-400">Signed in as</p>
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {user.email}
                      </p>
                    </div>

                    <div className="py-1">
                      <Link
                        href="/my-listings"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-amber-500 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-amber-500" />
                        <span>Dashboard</span>
                      </Link>

                      <Link
                        href="/add-studio"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-amber-500 transition-colors"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-500" />
                        <span>Add New Studio</span>
                      </Link>

                      <Link
                        href="/my-listings"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-amber-500 transition-colors"
                      >
                        <Building2 className="w-4 h-4 text-blue-500" />
                        <span>My Studio Listings</span>
                      </Link>

                      <Link
                        href="/my-bookings"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 hover:text-amber-500 transition-colors"
                      >
                        <CalendarCheck className="w-4 h-4 text-purple-500" />
                        <span>My Bookings</span>
                      </Link>
                    </div>

                    <div className="pt-1 border-t border-zinc-100 dark:border-zinc-800">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
            >
              {mounted && theme === 'light' ? (
                <Moon className="w-5 h-5 text-zinc-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-amber-500/10 text-amber-500 font-bold'
                    : 'text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-600 font-bold">
                    {user.photoURL ? (
                      <Image
                        src={user.photoURL}
                        alt={user.name || 'User'}
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <span>{user.name ? user.name[0].toUpperCase() : 'U'}</span>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/my-listings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <LayoutDashboard className="w-4 h-4 text-amber-500" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/add-studio"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-500" />
                  <span>Add New Studio</span>
                </Link>
                <Link
                  href="/my-listings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <Building2 className="w-4 h-4 text-blue-500" />
                  <span>My Studio Listings</span>
                </Link>
                <Link
                  href="/my-bookings"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <CalendarCheck className="w-4 h-4 text-purple-500" />
                  <span>My Bookings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  className="w-full text-center py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="w-full text-center py-2.5 rounded-xl bg-amber-500 text-sm font-semibold text-zinc-950 shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

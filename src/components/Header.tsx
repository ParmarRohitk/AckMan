'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
      } catch (e) {
        console.error('Failed to parse user data');
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');
    setUser(null);
    router.push('/login');
  };

  // Don't show header on auth pages
  if (pathname === '/login' || pathname === '/signup') {
    return null;
  }

  if (loading) {
    return null;
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-[#1a1d29]/95 backdrop-blur-md border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold text-[#FF5757] hover:scale-105 transition-transform"
          >
            AckMan
          </Link>

          {/* Desktop Navigation - Capsule Style */}
          <nav className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-slate-800/40 backdrop-blur-sm rounded-full p-1 border border-slate-700/50">
              {!user && (
                <>
                  <Link
                    href="/about"
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${pathname === '/about'
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                  >
                    About
                  </Link>
                  <Link
                    href="/features"
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${pathname === '/features'
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                  >
                    Features
                  </Link>
                  <Link
                    href="/pricing"
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${pathname === '/pricing'
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="/contact"
                    className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${pathname === '/contact'
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                  >
                    Contact
                  </Link>
                </>
              )}

              {user && (
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 text-sm rounded-full transition-all duration-300 ${pathname === '/dashboard'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </nav>

          {/* Auth Buttons / User Menu - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <div className="flex items-center gap-2 bg-slate-800/40 backdrop-blur-sm rounded-full p-1 border border-slate-700/50">
                {/* Avatar Dropdown */}
                <div className="relative group">
                  <button className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/50 transition-all hover:scale-105">
                    {getInitials(user.firstName, user.lastName)}
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1d29]/95 backdrop-blur-md rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 border border-slate-700/50 overflow-hidden">
                    <div className="p-4 border-b border-slate-700/50 bg-gradient-to-r from-violet-600/10 to-purple-600/10">
                      <p className="text-sm font-semibold text-white">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-slate-800/40 backdrop-blur-sm rounded-full p-1 border border-slate-700/50">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm rounded-full text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 text-sm rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-lg hover:shadow-violet-500/50 transition-all font-medium hover:scale-105"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-300 hover:text-white p-2 rounded-full hover:bg-slate-800/50 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu - Capsule Style */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-800/50 py-4 animate-fadeIn">
            {!user && (
              <nav className="space-y-2 mb-4">
                <Link
                  href="/about"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm rounded-full transition-all ${pathname === '/about'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  About
                </Link>
                <Link
                  href="/features"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm rounded-full transition-all ${pathname === '/features'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm rounded-full transition-all ${pathname === '/pricing'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  Pricing
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm rounded-full transition-all ${pathname === '/contact'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  Contact
                </Link>
              </nav>
            )}

            {user ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-2.5 text-sm rounded-full transition-all ${pathname === '/dashboard'
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                    }`}
                >
                  Dashboard
                </Link>

                <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-violet-600/10 to-purple-600/10 border border-slate-700/50">
                  <p className="text-sm font-semibold text-white">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-slate-400 truncate">{user.email}</p>
                </div>

                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition-all flex items-center gap-2 rounded-full"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm text-center rounded-full text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all border border-slate-700/50"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 text-sm bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-full text-center hover:shadow-lg hover:shadow-violet-500/50 transition-all font-medium"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

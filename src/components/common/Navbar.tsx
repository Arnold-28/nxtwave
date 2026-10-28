import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ArrowRight, BarChart3, Menu, X, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isHome = location.pathname === '/';

  return (
    <header className="bg-canvas border-b border-surface-border sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links - Linear Minimalist Style */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-ink-muted">
          {isHome ? (
            <>
              <a href="#outcomes" className="hover:text-ink transition-colors">
                Outcomes
              </a>
              <a href="#preview" className="hover:text-ink transition-colors">
                AI Pipeline
              </a>
              <a href="#agenda" className="hover:text-ink transition-colors">
                60-Min Agenda
              </a>
              <a href="#audience" className="hover:text-ink transition-colors">
                Audience
              </a>
              <a href="#faqs" className="hover:text-ink transition-colors">
                FAQs
              </a>
            </>
          ) : (
            <Link to="/" className="hover:text-ink transition-colors">
              Workshop Overview
            </Link>
          )}

          <div className="h-4 w-px bg-surface-border" />

          <Link
            to={user ? '/admin/overview' : '/admin/login'}
            className="flex items-center gap-1.5 text-ink-muted hover:text-ink font-medium transition-colors border border-surface-border px-3 py-1.5 rounded-md bg-white hover:border-ink-subtle shadow-subtle text-xs"
          >
            <BarChart3 className="w-3.5 h-3.5 text-brand" />
            <span>Organizer Portal</span>
          </Link>
        </nav>

        {/* Action Button - High Contrast Electric Violet */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/register"
            id="nav-register-btn"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-button transition-all duration-150 border border-brand-dark/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>Register Free Seat</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/80" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-md text-ink-muted hover:text-ink hover:bg-surface-muted focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-surface-border px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1.5 text-xs font-medium text-ink">
            {isHome ? (
              <>
                <a
                  href="#outcomes"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-surface-muted text-ink-muted hover:text-ink"
                >
                  Outcomes
                </a>
                <a
                  href="#preview"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-surface-muted text-ink-muted hover:text-ink"
                >
                  AI Pipeline
                </a>
                <a
                  href="#agenda"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-surface-muted text-ink-muted hover:text-ink"
                >
                  60-Min Agenda
                </a>
                <a
                  href="#faqs"
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-surface-muted text-ink-muted hover:text-ink"
                >
                  FAQs
                </a>
              </>
            ) : (
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-surface-muted"
              >
                Workshop Overview
              </Link>
            )}
            <Link
              to={user ? '/admin/overview' : '/admin/login'}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-surface-muted flex items-center gap-2 text-brand font-semibold"
            >
              <BarChart3 className="w-4 h-4" />
              Organizer Dashboard
            </Link>
          </div>

          <div className="pt-3 border-t border-surface-border">
            <Link
              to="/register"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-brand text-white font-semibold py-2.5 rounded-lg shadow-button text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-lime" />
              <span>Claim Free Seat</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

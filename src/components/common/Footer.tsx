import React from 'react';
import { Logo } from './Logo';
import { ShieldCheck, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-surface-border mt-auto pt-12 pb-8 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-surface-border">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3.5">
            <Logo size="md" />
            <p className="text-xs text-ink-muted max-w-md leading-relaxed">
              GrowthLoop AI powers student viral acquisition for NxtWave's flagship online workshop:
              <strong className="text-ink font-semibold"> "Build Your First AI Project in 60 Minutes"</strong>.
              Designed specifically to turn engineering students into growth ambassadors.
            </p>
            <div className="inline-flex items-center gap-2 bg-canvas text-ink-muted px-2.5 py-1 rounded-md text-[11px] font-mono border border-surface-border">
              <Terminal className="w-3 h-3 text-brand" />
              <span>Simulated Target: 500 Registrations / 7-Day Sprint (₹2,000 Budget)</span>
            </div>
          </div>

          {/* Workshop Quick Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-3 font-mono">
              Workshop
            </h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <Link to="/register" className="hover:text-brand transition-colors">
                  Student Registration
                </Link>
              </li>
              <li>
                <a href="/#outcomes" className="hover:text-brand transition-colors">
                  Learning Outcomes
                </a>
              </li>
              <li>
                <a href="/#preview" className="hover:text-brand transition-colors">
                  Interactive AI Pipeline
                </a>
              </li>
              <li>
                <a href="/#agenda" className="hover:text-brand transition-colors">
                  60-Min Agenda
                </a>
              </li>
              <li>
                <a href="/#faqs" className="hover:text-brand transition-colors">
                  Registration FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Organizer & Compliance */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-ink-muted mb-3 font-mono">
              Growth Engine
            </h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <Link to="/admin/overview" className="hover:text-brand transition-colors">
                  Organizer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/insights" className="hover:text-brand transition-colors">
                  AI Growth Copilot
                </Link>
              </li>
              <li>
                <Link to="/admin/ambassadors" className="hover:text-brand transition-colors">
                  College Ambassador Hub
                </Link>
              </li>
              <li>
                <Link to="/admin/budget" className="hover:text-brand transition-colors">
                  ₹2,000 Budget Tracker
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar & Simulation Notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-ink-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Simulated Campaign Sandbox — Strictly educational model for NxtWave Growth Strategy.</span>
          </div>
          <div className="font-mono text-[10.5px]">
            © 2026 GrowthLoop AI • Engineered for NxtWave
          </div>
        </div>
      </div>
    </footer>
  );
};

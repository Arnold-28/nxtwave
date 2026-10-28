import React, { useState } from 'react';
import {
  Settings,
  Database,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Key,
  ExternalLink,
  Layers,
  Terminal,
  Check
} from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { dataService } from '../../services/dataService';

export const SettingsPage: React.FC = () => {
  const isConfigured = isSupabaseConfigured();
  const [resetting, setResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetDemoData = () => {
    setResetting(true);
    dataService.initializeDemoData(true);
    setTimeout(() => {
      setResetting(false);
      setResetSuccess(true);
      setTimeout(() => setResetSuccess(false), 3000);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* 1. HEADER */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
          System Administration & Storage
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Settings & Database Connectivity
        </h1>
        <p className="text-xs text-ink-muted mt-0.5">
          Verify database connection, inspect Row Level Security status, and manage simulated test datasets.
        </p>
      </div>

      {/* 2. ENVIRONMENT STATUS CARD */}
      <div className="bg-white p-5 rounded-xl border border-surface-border shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-surface-border pb-3">
          <h3 className="text-sm font-bold text-ink flex items-center gap-2">
            <Database className="w-4 h-4 text-brand" />
            <span>Database Backend Status</span>
          </h3>
          {isConfigured ? (
            <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[10.5px] font-mono inline-flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              Supabase Connected
            </span>
          ) : (
            <span className="bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded text-[10.5px] font-mono inline-flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-700" />
              Simulated Local Mode Active
            </span>
          )}
        </div>

        <div className="space-y-3 text-xs leading-relaxed text-ink-muted">
          <p>
            {isConfigured ? (
              <span className="text-emerald-800 font-medium">
                Live Supabase PostgreSQL instance detected. Registrations, referral codes, and security policies are enforced on the live database.
              </span>
            ) : (
              <span>
                Supabase credentials (<code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code>) are not configured in your local environment.
                The application is operating in a <strong>fully functional Local Simulated Demo Mode</strong>.
              </span>
            )}
          </p>

          <div className="p-3.5 bg-canvas rounded-lg border border-surface-border space-y-2">
            <span className="font-bold text-ink block text-[10.5px] uppercase tracking-wider font-mono">
              Enforced Security & Isolation Rules
            </span>
            <div className="space-y-1.5 text-ink-muted text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Simulated demo data is never mixed with live production records.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Student email addresses are protected and never exposed publicly.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>All CSV exports sanitize formula injection vectors (<code>=, +, -, @</code>).</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Self-referral prevention and duplicate email validation are enforced.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SIMULATED DATA CONTROLS */}
      <div className="bg-white p-5 rounded-xl border border-surface-border shadow-card space-y-3.5">
        <div>
          <h3 className="text-sm font-bold text-ink flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-brand" />
            <span>Simulated Dataset Reset</span>
          </h3>
          <p className="text-xs text-ink-muted mt-0.5">
            Reset local simulated registrations, ambassador codes, and targets back to the initial day-4 state.
          </p>
        </div>

        {resetSuccess && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Simulated data has been reset to default state.</span>
          </div>
        )}

        <div>
          <button
            onClick={handleResetDemoData}
            disabled={resetting}
            id="reset-demo-data-btn"
            className="inline-flex items-center gap-2 bg-[#15172B] hover:bg-zinc-800 active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-button disabled:opacity-60"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>{resetting ? 'Resetting Store...' : 'Reset Simulated Dataset'}</span>
          </button>
        </div>
      </div>

      {/* 4. SUPABASE CONFIGURATION INSTRUCTIONS */}
      <div className="bg-white p-5 rounded-xl border border-surface-border shadow-card space-y-3">
        <h3 className="text-sm font-bold text-ink flex items-center gap-2">
          <Key className="w-4 h-4 text-brand" />
          <span>Connecting to Live Supabase</span>
        </h3>
        <p className="text-xs text-ink-muted leading-relaxed">
          To transition from Simulated Demo Mode to a live Supabase database, copy <code>.env.example</code> to <code>.env</code> and run the included SQL migration in your Supabase SQL Editor.
        </p>

        <pre className="p-3.5 bg-[#15172B] text-zinc-300 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-zinc-800">
          <code>{`# .env configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</code>
        </pre>

        <div className="pt-1 flex items-center justify-between text-xs text-ink-muted">
          <span>Migration File: <code className="font-mono text-ink">supabase/migrations/20261028_growthloop_init.sql</code></span>
        </div>
      </div>
    </div>
  );
};

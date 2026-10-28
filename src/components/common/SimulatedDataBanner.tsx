import React, { useState } from 'react';
import { AlertCircle, Database, Info, X } from 'lucide-react';
import { isSupabaseConfigured } from '../../lib/supabase';

export const SimulatedDataBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);
  const isConfigured = isSupabaseConfigured();

  if (isConfigured || dismissed) {
    return null;
  }

  return (
    <div className="bg-amber-50 border-b border-amber-200/80 px-4 py-2 text-xs text-amber-900 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-900 border border-amber-500/30 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex-shrink-0">
            <AlertCircle className="w-3 h-3 text-amber-700" />
            SIMULATED DATA
          </span>
          <span className="truncate text-amber-800">
            Simulated campaign demo mode active. All metrics, colleges, and student signups are realistic simulations. No real messages or marketing outreach are executed.
          </span>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-amber-700 bg-white/70 px-2 py-0.5 rounded border border-amber-200 font-mono">
            <Database className="w-3 h-3" />
            Storage: Local Demo State
          </span>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-700 hover:text-amber-950 p-0.5 rounded focus:outline-none"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import {
  Wallet,
  IndianRupee,
  TrendingDown,
  PieChart as PieIcon,
  Save,
  Check,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { BudgetEntry, CampaignMetrics } from '../../types';

export const BudgetPage: React.FC = () => {
  const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [b, m] = await Promise.all([
        dataService.getBudget(),
        dataService.getMetrics()
      ]);
      setBudgetEntries(b);
      setMetrics(m);
      setLoading(false);
    };
    load();
  }, []);

  const handleUpdate = (id: string, field: 'allocated_amount' | 'spent_amount' | 'notes', val: any) => {
    setBudgetEntries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item))
    );
  };

  const handleSaveBudget = async () => {
    for (const b of budgetEntries) {
      await dataService.updateBudgetEntry(b.id, b.allocated_amount, b.spent_amount, b.notes);
    }
    const updatedMetrics = await dataService.getMetrics();
    setMetrics(updatedMetrics);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const totalAllocated = budgetEntries.reduce((acc, b) => acc + b.allocated_amount, 0);
  const totalSpent = budgetEntries.reduce((acc, b) => acc + b.spent_amount, 0);
  const totalRemaining = Math.max(0, totalAllocated - totalSpent);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
            Capital Management & Efficiency
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            ₹2,000 Campaign Budget Tracker
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Micro-budget allocation control, real-time expenditure logging, and CAC efficiency.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {savedFeedback && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Budget Updated</span>
            </span>
          )}

          <button
            onClick={handleSaveBudget}
            id="save-budget-btn"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-button border border-brand-dark/20"
          >
            <Save className="w-3.5 h-3.5 text-lime" />
            <span>Save Budget Changes</span>
          </button>
        </div>
      </div>

      {/* 2. THREE KEY METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Total Budget Cap */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Total Budget Cap
            </span>
            <span className="text-[10px] font-mono font-bold bg-canvas border border-surface-border px-1.5 py-0.2 rounded">
              FIXED CAP
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono tabular-nums">
            ₹{totalAllocated.toLocaleString()}
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            Approved budget for 500 target
          </span>
        </div>

        {/* Total Spent */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Capital Deployed
            </span>
            <TrendingDown className="w-3.5 h-3.5 text-brand" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-brand font-mono tabular-nums">
            ₹{totalSpent.toLocaleString()}
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            {Math.round((totalSpent / totalAllocated) * 100)}% of total capital utilized
          </span>
        </div>

        {/* Remaining Balance & CAC */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Remaining Balance
            </span>
            <span className="text-[10px] font-mono text-ink font-bold bg-lime px-1.5 py-0.2 rounded">
              AVAILABLE
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
            ₹{totalRemaining.toLocaleString()}
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            Blended CAC: <strong className="text-ink">₹{(totalSpent / Math.max(1, metrics.totalRegistrations)).toFixed(2)}</strong> / student
          </span>
        </div>
      </div>

      {/* 3. BUDGET ALLOCATIONS TABLE */}
      <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-surface-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink">
              Micro-Budget Breakdown (₹2,000 Cap)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Modify allocated sums, record live expenses, and document experimental notes.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-canvas border-b border-surface-border text-ink-muted uppercase font-bold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-3 py-3">Allocated (₹)</th>
                <th className="px-3 py-3">Spent Amount (₹)</th>
                <th className="px-3 py-3">Remaining (₹)</th>
                <th className="px-4 py-3">Notes & Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {budgetEntries.map((b) => {
                const rem = b.allocated_amount - b.spent_amount;
                return (
                  <tr key={b.id} className="hover:bg-canvas/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-ink">
                      {b.category}
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 max-w-[120px]">
                        <span className="text-ink-muted font-mono">₹</span>
                        <input
                          type="number"
                          min={0}
                          max={2000}
                          value={b.allocated_amount}
                          onChange={(e) =>
                            handleUpdate(b.id, 'allocated_amount', Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 bg-canvas border border-surface-border rounded font-mono font-semibold text-ink text-xs focus:outline-none focus:border-brand"
                        />
                      </div>
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 max-w-[120px]">
                        <span className="text-ink-muted font-mono">₹</span>
                        <input
                          type="number"
                          min={0}
                          max={2000}
                          value={b.spent_amount}
                          onChange={(e) =>
                            handleUpdate(b.id, 'spent_amount', Number(e.target.value))
                          }
                          className="w-20 px-2 py-1 bg-canvas border border-surface-border rounded font-mono font-semibold text-ink text-xs focus:outline-none focus:border-brand"
                        />
                      </div>
                    </td>

                    <td className="px-3 py-3 font-mono font-bold">
                      <span className={rem >= 0 ? 'text-emerald-700' : 'text-rose-600'}>
                        ₹{rem.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-4 py-3 max-w-sm">
                      <input
                        type="text"
                        value={b.notes}
                        onChange={(e) => handleUpdate(b.id, 'notes', e.target.value)}
                        className="w-full px-2.5 py-1 bg-canvas border border-surface-border rounded text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

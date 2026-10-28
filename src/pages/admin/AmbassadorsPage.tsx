import React, { useEffect, useState } from 'react';
import {
  Award,
  UserPlus,
  Download,
  Building,
  Target,
  Share2,
  TrendingUp,
  CheckCircle2,
  Plus,
  X,
  ShieldCheck
} from 'lucide-react';
import { dataService, sanitizeForCsv } from '../../services/dataService';
import { Ambassador } from '../../types';
import { TOP_COLLEGES } from '../../data/seedData';

export const AmbassadorsPage: React.FC = () => {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [loading, setLoading] = useState(true);

  // Add Ambassador Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState(TOP_COLLEGES[0]);
  const [targetRegs, setTargetRegs] = useState(35);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await dataService.getAmbassadors();
      setAmbassadors(data.sort((a, b) => b.attributed_registrations - a.attributed_registrations));
      setLoading(false);
    };
    load();
  }, []);

  const handleCreateAmbassador = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    const newAmb = await dataService.addAmbassador({
      name: name.trim(),
      display_name: displayName.trim() || `${name.split(' ')[0]} (${college.split('(')[0].trim()})`,
      email: email.trim(),
      college: college.trim(),
      target_registrations: Number(targetRegs) || 30
    });

    setAmbassadors((prev) => [newAmb, ...prev].sort((a, b) => b.attributed_registrations - a.attributed_registrations));
    setSubmitting(false);
    setIsModalOpen(false);
    setName('');
    setDisplayName('');
    setEmail('');
  };

  const exportAggregatedCSV = () => {
    const headers = [
      'Ambassador ID',
      'Display Name',
      'Assigned College',
      'Referral Code',
      'Target Registrations',
      'Attributed Registrations',
      'Achievement Rate',
      'Status'
    ];

    const rows = ambassadors.map((amb) => [
      sanitizeForCsv(amb.id),
      sanitizeForCsv(amb.display_name),
      sanitizeForCsv(amb.college),
      sanitizeForCsv(amb.ambassador_code),
      sanitizeForCsv(amb.target_registrations),
      sanitizeForCsv(amb.attributed_registrations),
      sanitizeForCsv(`${Math.round((amb.attributed_registrations / amb.target_registrations) * 100)}%`),
      sanitizeForCsv(amb.status)
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `growthloop_ambassador_aggregate_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalAttributed = ambassadors.reduce((acc, a) => acc + a.attributed_registrations, 0);
  const totalTarget = ambassadors.reduce((acc, a) => acc + a.target_registrations, 0);

  return (
    <div className="space-y-6">
      {/* 1. HEADER & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
            Peer Campus Network
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            College Ambassador System
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Manage student campus ambassadors, assign quotas, and monitor leaderboard signups.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={exportAggregatedCSV}
            className="inline-flex items-center gap-2 bg-white border border-surface-border hover:bg-surface-muted text-ink text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-subtle"
          >
            <Download className="w-3.5 h-3.5 text-brand" />
            <span>Export Aggregated CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            id="add-ambassador-btn"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-button border border-brand-dark/20"
          >
            <UserPlus className="w-3.5 h-3.5 text-lime" />
            <span>Add Ambassador</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">Active Ambassadors</span>
          <div className="text-2xl font-extrabold text-ink font-mono tabular-nums">{ambassadors.length}</div>
          <span className="text-[10.5px] text-ink-muted">Top engineering colleges represented</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-brand font-semibold font-mono">Attributed Signups</span>
          <div className="text-2xl font-extrabold text-brand font-mono tabular-nums">{totalAttributed}</div>
          <span className="text-[10.5px] text-ink-muted font-mono">
            {Math.round((totalAttributed / totalTarget) * 100)}% of combined quota ({totalTarget})
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">Average Velocity</span>
          <div className="text-2xl font-extrabold text-ink font-mono tabular-nums">
            {ambassadors.length > 0 ? (totalAttributed / ambassadors.length).toFixed(1) : 0}
          </div>
          <span className="text-[10.5px] text-emerald-700 font-medium">Registrations per ambassador</span>
        </div>
      </div>

      {/* 3. AMBASSADOR LEADERBOARD TABLE */}
      <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-surface-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink">
              Ambassador Leaderboard & College Quotas
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Live ranking based on confirmed student registrations.
            </p>
          </div>
          <span className="text-[10.5px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Privacy Compliant Public Profiles
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-canvas border-b border-surface-border text-ink-muted uppercase font-bold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-3 py-3">Ambassador</th>
                <th className="px-3 py-3">Assigned College</th>
                <th className="px-3 py-3">Referral Code</th>
                <th className="px-3 py-3">Quota Attainment</th>
                <th className="px-4 py-3 text-right">Signups</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {ambassadors.map((amb, index) => {
                const pct = Math.min(100, Math.round((amb.attributed_registrations / amb.target_registrations) * 100));
                return (
                  <tr key={amb.id} className="hover:bg-canvas/50 transition-colors">
                    <td className="px-4 py-3 font-mono">
                      <span
                        className={`w-5 h-5 rounded font-bold flex items-center justify-center text-[10.5px] ${
                          index === 0
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : index === 1
                            ? 'bg-zinc-100 text-zinc-800 border border-zinc-300'
                            : index === 2
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-canvas border border-surface-border text-ink-muted'
                        }`}
                      >
                        {index + 1}
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <span className="font-semibold text-ink block">{amb.display_name}</span>
                      <span className="text-[10px] text-ink-muted font-mono">{amb.email}</span>
                    </td>

                    <td className="px-3 py-3">
                      <span className="font-medium text-ink block max-w-[200px] truncate" title={amb.college}>
                        {amb.college}
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <span className="bg-canvas border border-surface-border px-2 py-0.5 rounded font-mono font-bold text-brand text-[11px]">
                        {amb.ambassador_code}
                      </span>
                    </td>

                    <td className="px-3 py-3 min-w-[160px]">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10.5px]">
                          <span className="font-mono text-ink-muted">
                            {amb.attributed_registrations} / {amb.target_registrations} seats
                          </span>
                          <span className="font-bold text-ink font-mono">{pct}%</span>
                        </div>
                        <div className="w-full bg-surface-muted h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              pct >= 100 ? 'bg-lime-dark' : 'bg-brand'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-extrabold text-ink font-mono">
                        {amb.attributed_registrations}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. ADD AMBASSADOR MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 border border-surface-border shadow-elevated relative space-y-4">
            <div className="flex items-center justify-between border-b border-surface-border pb-3">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-brand" />
                <span>Assign New College Ambassador</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink-muted hover:text-ink p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAmbassador} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-ink mb-1 font-mono text-[10.5px]">
                  Ambassador Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vikram Reddy"
                  className="w-full px-3 py-2 bg-canvas border border-surface-border rounded-lg text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-ink mb-1 font-mono text-[10.5px]">
                  College Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. vikram@college.ac.in"
                  className="w-full px-3 py-2 bg-canvas border border-surface-border rounded-lg text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-ink mb-1 font-mono text-[10.5px]">
                  Assigned Engineering College <span className="text-rose-500">*</span>
                </label>
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-surface-border rounded-lg text-ink text-xs focus:outline-none focus:border-brand"
                >
                  {TOP_COLLEGES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-ink mb-1 font-mono text-[10.5px]">
                  Target Registrations Quota
                </label>
                <input
                  type="number"
                  min={10}
                  max={100}
                  value={targetRegs}
                  onChange={(e) => setTargetRegs(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-canvas border border-surface-border rounded-lg text-ink text-xs focus:outline-none focus:border-brand"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg border border-surface-border text-ink-muted hover:text-ink font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-brand hover:bg-brand-hover text-white font-semibold transition-all shadow-button disabled:opacity-70"
                >
                  {submitting ? 'Creating...' : 'Create & Generate Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

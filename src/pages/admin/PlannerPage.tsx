import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Target,
  Edit2,
  Check,
  TrendingUp,
  AlertCircle,
  Save,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { CampaignTarget, ChannelTarget, ChannelCategory } from '../../types';

export const PlannerPage: React.FC = () => {
  const [dailyTargets, setDailyTargets] = useState<CampaignTarget[]>([]);
  const [channelTargets, setChannelTargets] = useState<ChannelTarget[]>([]);
  const [loading, setLoading] = useState(true);
  const [savedFeedback, setSavedFeedback] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [dt, ct] = await Promise.all([
        dataService.getDailyTargets(),
        dataService.getChannelTargets()
      ]);
      setDailyTargets(dt);
      setChannelTargets(ct);
      setLoading(false);
    };
    load();
  }, []);

  const handleDailyTargetChange = (dayNumber: number, newVal: number) => {
    setDailyTargets((prev) =>
      prev.map((t) => (t.day_number === dayNumber ? { ...t, target_registrations: newVal } : t))
    );
  };

  const handleChannelTargetChange = (channel: ChannelCategory, newVal: number) => {
    setChannelTargets((prev) =>
      prev.map((t) => (t.channel === channel ? { ...t, target_registrations: newVal } : t))
    );
  };

  const handleSavePlanner = async () => {
    // Persist daily targets
    for (const dt of dailyTargets) {
      await dataService.updateDailyTarget(dt.day_number, dt.target_registrations);
    }
    // Persist channel targets
    for (const ct of channelTargets) {
      await dataService.updateChannelTarget(ct.channel, ct.target_registrations);
    }
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const totalDailyPlanned = dailyTargets.reduce((acc, t) => acc + t.target_registrations, 0);
  const totalDailyActual = dailyTargets.reduce((acc, t) => acc + (t.actual_registrations || 0), 0);

  const totalChannelPlanned = channelTargets.reduce((acc, t) => acc + t.target_registrations, 0);

  if (loading) {
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
            Sprint Execution Roadmap
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            7-Day Campaign Planner
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Set, edit, and benchmark daily milestones and channel allocations toward the 500-student goal.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {savedFeedback && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Targets Saved</span>
            </span>
          )}

          <button
            onClick={handleSavePlanner}
            id="save-planner-btn"
            className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-button border border-brand-dark/20"
          >
            <Save className="w-3.5 h-3.5 text-lime" />
            <span>Save Planned Targets</span>
          </button>
        </div>
      </div>

      {/* 2. DAILY MILESTONES TABLE */}
      <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-surface-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand" />
              <span>Daily Registration Trajectory</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Planned target vs actual registered students per day.
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="text-ink-muted">Planned Total: </span>
            <span className="font-mono font-bold text-ink">{totalDailyPlanned} seats</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-canvas border-b border-surface-border text-ink-muted uppercase font-bold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-4 py-3">Day</th>
                <th className="px-3 py-3">Timeline Date</th>
                <th className="px-3 py-3">Planned Target</th>
                <th className="px-3 py-3">Actual Signups</th>
                <th className="px-3 py-3">Pace Variance</th>
                <th className="px-4 py-3">Sprint Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {dailyTargets.map((day) => {
                const actual = day.actual_registrations || 0;
                const variance = actual - day.target_registrations;
                const isPastOrToday = day.day_number <= 4;

                return (
                  <tr key={day.day_number} className="hover:bg-canvas/40 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-ink">
                      Day 0{day.day_number}
                    </td>

                    <td className="px-3 py-3">
                      <span className="font-semibold text-ink">{day.date_label}</span>
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 max-w-[130px]">
                        <input
                          type="number"
                          min={10}
                          max={200}
                          value={day.target_registrations}
                          onChange={(e) =>
                            handleDailyTargetChange(day.day_number, Number(e.target.value))
                          }
                          className="w-16 px-2 py-1 bg-canvas border border-surface-border rounded font-mono font-bold text-ink text-xs focus:outline-none focus:border-brand"
                        />
                        <span className="text-ink-muted text-[10.5px]">seats</span>
                      </div>
                    </td>

                    <td className="px-3 py-3 font-mono font-bold text-ink">
                      {isPastOrToday ? actual : '—'}
                    </td>

                    <td className="px-3 py-3 font-mono text-[10.5px]">
                      {isPastOrToday ? (
                        variance >= 0 ? (
                          <span className="text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            +{variance} Ahead
                          </span>
                        ) : (
                          <span className="text-rose-600 font-semibold bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">
                            {variance} Behind
                          </span>
                        )
                      ) : (
                        <span className="text-ink-faint">Pending</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {day.day_number < 4 ? (
                        <span className="text-[9.5px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-mono uppercase">
                          Completed
                        </span>
                      ) : day.day_number === 4 ? (
                        <span className="text-[9.5px] font-bold bg-brand text-white px-2 py-0.5 rounded font-mono uppercase">
                          Active Today
                        </span>
                      ) : (
                        <span className="text-[9.5px] font-medium bg-canvas border border-surface-border text-ink-muted px-2 py-0.5 rounded font-mono uppercase">
                          Upcoming
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. CHANNEL TARGETS TABLE */}
      <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
        <div className="px-5 py-3.5 border-b border-surface-border flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Target className="w-4 h-4 text-brand" />
              <span>Channel Quotas & Proposed Allocations</span>
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Proposed allocation summing to 500 seats across key student channels.
            </p>
          </div>
          <div className="text-right text-xs">
            <span className="text-ink-muted">Channel Total: </span>
            <span className="font-mono font-bold text-ink">{totalChannelPlanned} / 500</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-canvas border-b border-surface-border text-ink-muted uppercase font-bold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-4 py-3">Channel</th>
                <th className="px-3 py-3">Target Quota</th>
                <th className="px-3 py-3">Observed Actual</th>
                <th className="px-4 py-3">Attainment %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {channelTargets.map((ct) => {
                const actual = ct.actual_registrations || 0;
                const pct = Math.min(100, Math.round((actual / ct.target_registrations) * 100));

                return (
                  <tr key={ct.channel} className="hover:bg-canvas/40 transition-colors">
                    <td className="px-4 py-3 font-semibold text-ink">
                      {ct.channel}
                    </td>

                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5 max-w-[130px]">
                        <input
                          type="number"
                          min={5}
                          max={300}
                          value={ct.target_registrations}
                          onChange={(e) =>
                            handleChannelTargetChange(ct.channel, Number(e.target.value))
                          }
                          className="w-16 px-2 py-1 bg-canvas border border-surface-border rounded font-mono font-bold text-ink text-xs focus:outline-none focus:border-brand"
                        />
                        <span className="text-ink-muted text-[10.5px]">seats</span>
                      </div>
                    </td>

                    <td className="px-3 py-3 font-mono font-bold text-ink">
                      {actual}
                    </td>

                    <td className="px-4 py-3 min-w-[140px]">
                      <div className="space-y-1">
                        <span className="font-mono text-[10.5px] text-ink font-semibold">
                          {pct}%
                        </span>
                        <div className="w-full bg-surface-muted h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-brand h-full rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
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

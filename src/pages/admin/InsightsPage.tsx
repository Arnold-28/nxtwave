import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Target,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Compass,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders
} from 'lucide-react';
import { dataService } from '../../services/dataService';
import { GrowthInsight, CampaignMetrics } from '../../types';

export const InsightsPage: React.FC = () => {
  const [insights, setInsights] = useState<GrowthInsight[]>([]);
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  // Interactive Run-rate simulation state
  const [simDaysRemaining, setSimDaysRemaining] = useState(3);
  const [simTargetRegs, setSimTargetRegs] = useState(500);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [ins, m] = await Promise.all([
        dataService.getGrowthInsights(),
        dataService.getMetrics()
      ]);
      setInsights(ins);
      setMetrics(m);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const remainingSignups = Math.max(0, simTargetRegs - metrics.totalRegistrations);
  const requiredDailyPace = Math.ceil(remainingSignups / Math.max(1, simDaysRemaining));

  const getConfidenceBadge = (level: 'High' | 'Medium' | 'Low') => {
    if (level === 'High') {
      return (
        <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono">
          High Confidence
        </span>
      );
    }
    if (level === 'Medium') {
      return (
        <span className="bg-amber-50 text-amber-800 border border-amber-300 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono">
          Medium Confidence
        </span>
      );
    }
    return (
      <span className="bg-canvas text-ink-muted border border-surface-border font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono">
        Low Confidence
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
              Deterministic Intelligence Engine
            </span>
            <span className="bg-lime text-ink text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
              Action-Oriented
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            AI Growth Copilot
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Rule-based campaign optimization derived from verified database observations, channel velocity, and run-rate math.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-white border border-surface-border text-ink-muted text-xs px-3 py-1.5 rounded-lg shadow-subtle">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Grounded in actual metrics • No hallucinatory claims</span>
        </div>
      </div>

      {/* 2. INTERACTIVE PACE CALCULATOR - LINEAR DARK CONTRAST CARD */}
      <div className="bg-[#15172B] text-white p-5 sm:p-7 rounded-xl border border-zinc-800 shadow-card">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-lime font-mono text-xs uppercase tracking-wider font-semibold">
              <Zap className="w-3.5 h-3.5" />
              <span>Target Trajectory Math</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {metrics.totalRegistrations} of {simTargetRegs} Registrations Secured
            </h3>
            <p className="text-zinc-300 text-xs leading-relaxed">
              To hit the target of <strong>{simTargetRegs} registrations</strong> over the remaining{' '}
              <strong>{simDaysRemaining} days</strong>, the campaign requires an average velocity of{' '}
              <strong className="text-lime font-mono">{requiredDailyPace} registrations / day</strong>.
            </p>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-center">
                <span className="text-[10px] text-zinc-400 block mb-0.5 font-mono uppercase">Remaining Gap</span>
                <span className="text-lg font-bold text-white font-mono">{remainingSignups}</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-lg text-center">
                <span className="text-[10px] text-zinc-400 block mb-0.5 font-mono uppercase">Days Left</span>
                <span className="text-lg font-bold text-white font-mono">{simDaysRemaining}</span>
              </div>
              <div className="bg-brand/20 border border-brand/40 p-2.5 rounded-lg text-center">
                <span className="text-[10px] text-lime block mb-0.5 font-semibold font-mono uppercase">Pace Required</span>
                <span className="text-lg font-bold text-lime font-mono">
                  {requiredDailyPace} / day
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white/5 border border-white/10 p-4 rounded-lg space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-1.5 font-mono text-[10.5px]">
                <Sliders className="w-3.5 h-3.5 text-lime" />
                <span>Simulation Controls</span>
              </span>
              <span className="text-zinc-400 text-[10.5px] font-mono">Real-time adjust</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300 text-[11px]">
                <span>Remaining Campaign Days:</span>
                <span className="font-mono font-bold text-lime">{simDaysRemaining} days</span>
              </div>
              <input
                type="range"
                min={1}
                max={7}
                value={simDaysRemaining}
                onChange={(e) => setSimDaysRemaining(Number(e.target.value))}
                className="w-full accent-[#7357FF] cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-zinc-300 text-[11px]">
                <span>Workshop Target Goal:</span>
                <span className="font-mono font-bold text-lime">{simTargetRegs} seats</span>
              </div>
              <input
                type="range"
                min={200}
                max={1000}
                step={25}
                value={simTargetRegs}
                onChange={(e) => setSimTargetRegs(Number(e.target.value))}
                className="w-full accent-[#7357FF] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. GROUNDED ACTIONABLE RECOMMENDATIONS */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">
            Strategic Growth Recommendations ({insights.length})
          </h2>
          <span className="text-xs text-ink-muted font-mono">
            Evidence-backed decision matrix
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3.5">
          {insights.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl border border-surface-border shadow-subtle space-y-3 transition-colors hover:border-ink-subtle"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-border pb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-brand-light text-brand flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                    <span className="text-[10.5px] text-ink-muted font-mono capitalize">
                      Category: {item.category} optimization
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {item.metric_highlight && (
                    <span className="bg-canvas border border-surface-border text-ink font-mono font-bold px-2 py-0.5 rounded text-[11px]">
                      {item.metric_highlight}
                    </span>
                  )}
                  {getConfidenceBadge(item.confidence_level)}
                </div>
              </div>

              {/* Three-part structure: Observation, Evidence, Suggested Action */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {/* Observation */}
                <div className="bg-canvas p-3 rounded-lg border border-surface-border space-y-1">
                  <span className="font-bold uppercase tracking-wider text-ink-muted block text-[10px] font-mono">
                    1. Observed Telemetry
                  </span>
                  <p className="text-ink text-xs leading-relaxed">
                    {item.observation}
                  </p>
                </div>

                {/* Evidence */}
                <div className="bg-canvas p-3 rounded-lg border border-surface-border space-y-1">
                  <span className="font-bold uppercase tracking-wider text-brand block text-[10px] font-mono">
                    2. Analytical Evidence
                  </span>
                  <p className="text-ink-muted text-xs leading-relaxed">
                    {item.evidence}
                  </p>
                </div>

                {/* Suggested Action (Highlighted with Lime growth styling) */}
                <div className="bg-lime-light p-3 rounded-lg border border-lime/40 space-y-1">
                  <span className="font-bold uppercase tracking-wider text-ink block text-[10px] font-mono">
                    3. Recommended Experiment
                  </span>
                  <p className="text-ink font-medium text-xs leading-relaxed">
                    {item.suggested_action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

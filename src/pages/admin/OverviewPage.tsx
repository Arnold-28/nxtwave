import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Target,
  Clock,
  Eye,
  Share2,
  TrendingUp,
  Award,
  Building,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { dataService } from '../../services/dataService';
import {
  Registration,
  Ambassador,
  CampaignTarget,
  CampaignMetrics,
  ChannelTarget
} from '../../types';

export const OverviewPage: React.FC = () => {
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [dailyTargets, setDailyTargets] = useState<CampaignTarget[]>([]);
  const [channelTargets, setChannelTargets] = useState<ChannelTarget[]>([]);
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [recentRegistrations, setRecentRegistrations] = useState<Registration[]>([]);
  const [collegeBreakdown, setCollegeBreakdown] = useState<{ college: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [m, dt, ct, amb, regs] = await Promise.all([
        dataService.getMetrics(),
        dataService.getDailyTargets(),
        dataService.getChannelTargets(),
        dataService.getAmbassadors(),
        dataService.getRegistrations()
      ]);

      setMetrics(m);
      setDailyTargets(dt);
      setChannelTargets(ct);
      setAmbassadors(amb.sort((a, b) => b.attributed_registrations - a.attributed_registrations));
      setRecentRegistrations(regs.slice(0, 6));

      // Calculate college distribution
      const counts: Record<string, number> = {};
      regs.forEach((r) => {
        counts[r.college] = (counts[r.college] || 0) + 1;
      });
      const sortedColleges = Object.entries(counts)
        .map(([college, count]) => ({ college, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);
      setCollegeBreakdown(sortedColleges);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2.5">
          <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-ink-muted font-mono">Loading campaign telemetry...</p>
        </div>
      </div>
    );
  }

  const progressPercent = Math.min(100, Math.round((metrics.totalRegistrations / metrics.targetRegistrations) * 100));

  return (
    <div className="space-y-6">
      {/* 1. TOP HEADER & TELEMETRY TITLE */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
              Growth Engine Telemetry
            </span>
            <span className="bg-lime text-ink text-[10px] font-bold px-1.5 py-0.2 rounded font-mono uppercase">
              Sprint Day 04
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Campaign Overview
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Real-time viral referral tracking and student registration progress toward 500 seats.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/insights"
            className="inline-flex items-center gap-1.5 bg-brand-light text-brand hover:bg-brand hover:text-white px-3.5 py-2 rounded-lg text-xs font-semibold border border-brand/20 transition-all shadow-subtle"
          >
            <Sparkles className="w-3.5 h-3.5 text-lime" />
            <span>AI Growth Copilot</span>
          </Link>
          <Link
            to="/admin/registrations"
            className="inline-flex items-center gap-1.5 bg-white hover:bg-surface-muted text-ink border border-surface-border px-3.5 py-2 rounded-lg text-xs font-semibold shadow-subtle transition-colors"
          >
            <span>Audit Records</span>
            <ArrowRight className="w-3.5 h-3.5 text-ink-muted" />
          </Link>
        </div>
      </div>

      {/* 2. COMPACT LINEAR-STYLE KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: Total Registrations (Electric Violet Highlight) */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1.5 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Registrations
            </span>
            <Target className="w-3.5 h-3.5 text-brand" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold text-ink font-mono tabular-nums">
              {metrics.totalRegistrations}
            </span>
            <span className="text-xs font-mono text-ink-muted">/ 500</span>
          </div>
          <div className="w-full bg-surface-muted h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-brand h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10.5px]">
            <span className="text-ink-muted">{progressPercent}% target</span>
            <span className="text-brand font-semibold font-mono">{500 - metrics.totalRegistrations} remaining</span>
          </div>
        </div>

        {/* Metric 2: Today's Velocity (Lime Growth Indicator) */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Today's Signups
            </span>
            <Clock className="w-3.5 h-3.5 text-ink-muted" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-ink font-mono tabular-nums">
              {metrics.registrationsToday}
            </span>
            <span className="text-[10px] bg-lime text-ink font-mono font-bold px-1.5 py-0.2 rounded">
              +18% pace
            </span>
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            Target today: 75 seats
          </span>
        </div>

        {/* Metric 3: Landing Visitors */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Landing Visitors
            </span>
            <Eye className="w-3.5 h-3.5 text-ink-muted" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono tabular-nums">
            {metrics.uniqueLandingVisitors}
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            Conv. Rate: <strong className="text-ink">{metrics.overallConversionRate}%</strong>
          </span>
        </div>

        {/* Metric 4: Referral Attributed Signups (Lime Growth K-Factor) */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-brand font-semibold font-mono">
              Referral Signups
            </span>
            <Share2 className="w-3.5 h-3.5 text-brand" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-brand font-mono tabular-nums">
              {metrics.referralAttributedRegistrations}
            </span>
            <span className="text-[10px] bg-lime text-ink font-mono font-bold px-1.5 py-0.2 rounded">
              K={metrics.viralCoefficient}
            </span>
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            {Math.round((metrics.referralAttributedRegistrations / metrics.totalRegistrations) * 100)}% viral share
          </span>
        </div>

        {/* Metric 5: Budget CAC */}
        <div className="bg-white p-4 rounded-xl border border-surface-border shadow-subtle space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-ink-muted font-mono">
              Budget Deployed
            </span>
            <span className="text-[10px] font-mono text-ink-muted bg-canvas border border-surface-border px-1.5 py-0.2 rounded">
              ₹2,000 CAP
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-ink font-mono tabular-nums">
            ₹{metrics.spentBudget}
          </div>
          <span className="text-[10.5px] text-ink-muted block font-mono">
            {metrics.costPerRegistration ? `CAC: ₹${metrics.costPerRegistration}` : 'Organic Driven'}
          </span>
        </div>
      </div>

      {/* 3. ELEGANT CHARTS: DAILY RUN-RATE & CHANNEL ALLOCATION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Daily Target vs Actual Run-Rate */}
        <div className="lg:col-span-8 bg-white p-5 sm:p-6 rounded-xl border border-surface-border shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                <span>7-Day Sprint Trajectory: Target vs Actual</span>
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Daily registration pacing against the 500-seat model.
              </p>
            </div>
            <Link
              to="/admin/planner"
              className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
            >
              <span>Planner</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="h-60 sm:h-64 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dailyTargets}
                margin={{ top: 10, right: 10, left: -24, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F0EFEA" vertical={false} />
                <XAxis dataKey="date_label" stroke="#9EA0AE" fontSize={11} tickLine={false} />
                <YAxis stroke="#9EA0AE" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#15172B',
                    borderRadius: '8px',
                    border: '1px solid #272A3D',
                    color: '#fff',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                <Bar
                  dataKey="target_registrations"
                  name="Planned Target"
                  fill="#E7E5DF"
                  radius={[3, 3, 0, 0]}
                />
                <Bar
                  dataKey="actual_registrations"
                  name="Actual Registrations"
                  fill="#7357FF"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-xl border border-surface-border shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-3">
            <div>
              <h3 className="text-sm font-bold text-ink">
                Acquisition Channels
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">Attributed student signups</p>
            </div>
            <Link
              to="/admin/channels"
              className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1"
            >
              <span>Funnel</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            {channelTargets.map((ch) => {
              const actual = ch.actual_registrations || 0;
              const target = ch.target_registrations;
              const pct = Math.min(100, Math.round((actual / target) * 100));
              const isAhead = actual >= target;

              return (
                <div key={ch.channel} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-ink truncate max-w-[150px]">
                      {ch.channel}
                    </span>
                    <span className="font-mono text-ink-muted text-[11px]">
                      {actual} / {target}{' '}
                      <strong className={isAhead ? 'text-lime-dark' : 'text-brand'}>
                        ({pct}%)
                      </strong>
                    </span>
                  </div>
                  <div className="w-full bg-surface-muted h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isAhead ? 'bg-lime-dark' : 'bg-brand'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. TABLES: COLLEGE LEADERBOARD & AMBASSADORS & RECENT SIGNUPS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Colleges */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-xl border border-surface-border shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Building className="w-4 h-4 text-brand" />
              <span>Campus Registrations</span>
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-ink-muted">Seats</span>
          </div>

          <div className="divide-y divide-surface-border">
            {collegeBreakdown.map((item, idx) => (
              <div key={item.college} className="py-2 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-4 h-4 rounded bg-canvas border border-surface-border text-ink-muted text-[10px] font-mono font-bold flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="font-medium text-ink truncate max-w-[190px]" title={item.college}>
                    {item.college.split('(')[0].trim()}
                  </span>
                </div>
                <span className="font-mono font-bold text-brand ml-2">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Ambassadors */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-xl border border-surface-border shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Award className="w-4 h-4 text-lime-dark" />
              <span>Ambassador Leaderboard</span>
            </h3>
            <Link
              to="/admin/ambassadors"
              className="text-xs font-semibold text-brand hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="divide-y divide-surface-border">
            {ambassadors.slice(0, 5).map((amb, idx) => (
              <div key={amb.id} className="py-2 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-ink block truncate max-w-[160px]">
                    {amb.display_name}
                  </span>
                  <span className="text-[10px] text-ink-muted font-mono">
                    {amb.ambassador_code}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-ink block">
                    {amb.attributed_registrations} seats
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono">
                    {Math.round((amb.attributed_registrations / amb.target_registrations) * 100)}% quota
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registrations Feed */}
        <div className="lg:col-span-4 bg-white p-5 sm:p-6 rounded-xl border border-surface-border shadow-card space-y-3">
          <div className="flex items-center justify-between border-b border-surface-border pb-2.5">
            <h3 className="text-sm font-bold text-ink">
              Recent Registrations
            </h3>
            <Link
              to="/admin/registrations"
              className="text-xs font-semibold text-brand hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-surface-border text-xs">
            {recentRegistrations.map((reg) => (
              <div key={reg.id} className="py-2 flex items-center justify-between">
                <div className="overflow-hidden pr-2">
                  <span className="font-semibold text-ink block truncate">
                    {reg.student_name}
                  </span>
                  <span className="text-[10px] text-ink-muted block truncate">
                    {reg.college.split('(')[0].trim()} • {reg.branch.split('(')[1]?.replace(')', '') || reg.branch}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="inline-block text-[10px] bg-canvas border border-surface-border px-2 py-0.5 rounded font-mono text-ink-muted">
                    {reg.channel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

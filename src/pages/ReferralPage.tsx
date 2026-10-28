import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import {
  Copy,
  Check,
  Share2,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Gift,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { dataService } from '../services/dataService';

export const ReferralPage: React.FC = () => {
  const { referralCode } = useParams<{ referralCode: string }>();
  const location = useLocation();

  // State from registration redirect (if fresh registrant)
  const isNewRegistration = Boolean(location.state?.isNewRegistration);
  const studentNameFromState = location.state?.studentName;

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<{
    code: string;
    student_name: string;
    visits_count: number;
    registrations_count: number;
    conversion_rate: number;
    is_ambassador: boolean;
    college?: string;
  } | null>(null);

  // Trigger celebration confetti on new registration
  useEffect(() => {
    if (isNewRegistration) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
    }
  }, [isNewRegistration]);

  // Fetch referral details & track visit
  useEffect(() => {
    if (!referralCode) return;

    const loadData = async () => {
      setLoading(false);
      // Track referral link visit (deduplicated by session)
      dataService.trackReferralVisit(referralCode);

      const res = await dataService.getReferralDetails(referralCode);
      if (res) {
        setDetails(res);
      } else {
        // Fallback for newly generated code
        setDetails({
          code: referralCode.toUpperCase(),
          student_name: studentNameFromState || 'Student Ambassador',
          visits_count: 1,
          registrations_count: 0,
          conversion_rate: 0,
          is_ambassador: referralCode.startsWith('AMB-')
        });
      }
    };

    loadData();
  }, [referralCode, studentNameFromState]);

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://growthloop.nxtwave.tech';
  const fullReferralUrl = `${originUrl}/register?ref=${referralCode?.toUpperCase()}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullReferralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // WhatsApp prefilled URL-encoded message (never sends automatically!)
  const whatsappShareMessage = `Hey! I just registered for NxtWave's free 60-min workshop: "Build Your First AI Project in 60 Minutes" for final-year engineering students.

You build and deploy a real working AI project to boost your placement resume.

Claim your free seat with my invite link here:
${fullReferralUrl}`;

  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappShareMessage)}`;

  // Milestone Progress (Goal: 3 Peer Signups for Capstone Kit)
  const milestoneTarget = 3;
  const currentAttributed = details?.registrations_count || 0;
  const progressPercent = Math.min(100, Math.round((currentAttributed / milestoneTarget) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* 1. TOP CONFIRMATION BANNER */}
      {isNewRegistration ? (
        <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-ink">
                Seat Confirmed for {studentNameFromState || 'You'}!
              </h2>
              <p className="text-xs text-ink-muted">
                You are registered for <strong>"Build Your First AI Project in 60 Minutes"</strong>. Check your inbox for event details.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 bg-lime text-ink text-[11px] font-bold px-3 py-1 rounded-md shadow-subtle border border-lime-dark/30 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              Ambassador Hub Unlocked
            </span>
          </div>
        </div>
      ) : (
        /* If an incoming friend opened the invite link */
        <div className="bg-white border border-surface-border rounded-xl p-5 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-brand-light text-brand flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand font-mono">
                Exclusive Peer Invitation
              </span>
              <h2 className="text-sm font-bold text-ink">
                You were invited by {details?.student_name || 'a college peer'}!
              </h2>
              <p className="text-xs text-ink-muted">
                Join them in the free 60-minute workshop to build a real AI project for engineering placements.
              </p>
            </div>
          </div>

          <Link
            to={`/register?ref=${referralCode?.toUpperCase()}`}
            id="register-via-referral-cta"
            className="flex-shrink-0 inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-button border border-brand-dark/20 transition-all"
          >
            <span>Register With This Invite</span>
            <ArrowRight className="w-3.5 h-3.5 text-lime" />
          </Link>
        </div>
      )}

      {/* 2. REFERRAL AMBASSADOR ENGINE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Share Center & Unique Link */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-xl border border-surface-border shadow-card space-y-6">
            <div className="border-b border-surface-border pb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
                  Your Personal Growth Engine
                </span>
                <span className="bg-canvas px-2 py-0.5 rounded text-[11px] font-mono text-ink-muted border border-surface-border font-semibold">
                  Code: {referralCode?.toUpperCase()}
                </span>
              </div>
              <h1 className="text-xl font-bold text-ink">
                Share With Your Engineering Network
              </h1>
              <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                Share your personal link on WhatsApp college batches, departmental groups, and LinkedIn. Every student who joins via your link counts toward your rewards.
              </p>
            </div>

            {/* Referral Link Copy Box */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink font-mono">
                Your Unique Referral Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  id="referral-link-input"
                  value={fullReferralUrl}
                  className="flex-1 bg-canvas border border-surface-border px-3.5 py-2 rounded-lg text-xs font-mono text-ink select-all focus:outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  id="copy-referral-link-btn"
                  className="inline-flex items-center gap-1.5 bg-[#15172B] hover:bg-zinc-800 active:scale-[0.98] text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all shadow-button flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-lime" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* WhatsApp Direct Share Button */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1.5 font-mono">
                Fast WhatsApp Batch Share
              </label>
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-share-btn"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold text-xs sm:text-sm py-3 rounded-lg shadow-button transition-all duration-150"
              >
                <MessageCircle className="w-4 h-4 fill-white text-[#25D366]" />
                <span>Share to WhatsApp Batches</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/80" />
              </a>
              <p className="text-[10.5px] text-ink-muted mt-1 text-center">
                Opens a prefilled invite message in WhatsApp. You choose which friends or groups to send to.
              </p>
            </div>

            {/* How It Works List */}
            <div className="pt-2 border-t border-surface-border space-y-2 text-xs text-ink-muted">
              <h4 className="font-semibold text-ink text-xs">How referral attribution works:</h4>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Link clicks are tracked uniquely without duplicate refresh inflation.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Self-referrals are automatically excluded for integrity.</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Signups automatically credit your live ambassador count.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Referral Metrics & Milestone Tracker */}
        <div className="lg:col-span-5 space-y-5">
          {/* Metrics Card */}
          <div className="bg-white p-5 sm:p-6 rounded-xl border border-surface-border shadow-card space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-ink">
                Your Referral Performance
              </h3>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-medium">
                Live Attributed
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-canvas p-3 rounded-lg border border-surface-border">
                <span className="text-[11px] text-ink-muted block mb-0.5">Visits</span>
                <span className="text-lg sm:text-xl font-extrabold text-ink font-mono">
                  {details?.visits_count || 0}
                </span>
              </div>
              <div className="bg-brand-light p-3 rounded-lg border border-brand/20">
                <span className="text-[11px] text-brand block mb-0.5 font-semibold">Signups</span>
                <span className="text-lg sm:text-xl font-extrabold text-brand font-mono">
                  {currentAttributed}
                </span>
              </div>
              <div className="bg-canvas p-3 rounded-lg border border-surface-border">
                <span className="text-[11px] text-ink-muted block mb-0.5">Conv. Rate</span>
                <span className="text-lg sm:text-xl font-extrabold text-ink font-mono">
                  {details?.conversion_rate || 0}%
                </span>
              </div>
            </div>

            {/* Milestone Tracker with Lime Growth Indicator */}
            <div className="pt-2 border-t border-surface-border space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-ink flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand" />
                  <span>Capstone Kit Milestone</span>
                </span>
                <span className="font-mono text-brand font-bold text-xs">
                  {currentAttributed} / {milestoneTarget} referred
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-surface-muted rounded-full overflow-hidden border border-surface-border">
                <div
                  className="h-full bg-brand rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-ink-muted leading-relaxed">
                {currentAttributed >= milestoneTarget ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Milestone Achieved! Your AI Placement Kit has been unlocked.
                  </span>
                ) : (
                  <span>
                    Invite <strong className="text-ink">{milestoneTarget - currentAttributed} more friend{milestoneTarget - currentAttributed > 1 ? 's' : ''}</strong> to unlock the <em>"AI Placement Capstone Starter Kit"</em> and priority mentor Q&A.
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* College Ambassador Banner */}
          <div className="bg-[#15172B] text-white p-5 rounded-xl border border-zinc-800 shadow-card space-y-2.5">
            <div className="flex items-center gap-2 text-lime font-mono text-[10.5px] uppercase tracking-wider font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Campus Leaderboard</span>
            </div>
            <h4 className="text-sm font-bold">
              Representing {details?.college || 'Your Engineering Campus'}
            </h4>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Every peer who joins using your link boosts your college ranking on the central campaign leaderboard.
            </p>
            <div className="pt-1">
              <Link
                to="/#outcomes"
                className="text-xs font-semibold text-lime hover:underline inline-flex items-center gap-1"
              >
                <span>Review workshop agenda & outcomes</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

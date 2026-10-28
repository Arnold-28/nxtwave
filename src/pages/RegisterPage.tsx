import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  GraduationCap,
  Mail,
  User,
  Building,
  CheckCircle2,
  AlertCircle,
  Tag,
  ShieldCheck,
  Calendar,
  Layers,
  Check
} from 'lucide-react';
import { dataService } from '../services/dataService';
import { TOP_COLLEGES, ENGINEERING_BRANCHES } from '../data/seedData';
import { EngineeringBranch } from '../types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Form inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [college, setCollege] = useState('');
  const [branch, setBranch] = useState<EngineeringBranch | ''>('');
  const [graduationYear, setGraduationYear] = useState<number>(2025);
  const [referralCode, setReferralCode] = useState('');

  // Referral info banner
  const [referrerDetails, setReferrerDetails] = useState<{
    name: string;
    college?: string;
    isAmbassador: boolean;
  } | null>(null);

  // Status & Error
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [collegeSuggestions, setCollegeSuggestions] = useState<string[]>([]);
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Initialize referral code from query params
  useEffect(() => {
    const codeParam = searchParams.get('ref') || searchParams.get('r');
    if (codeParam) {
      const code = codeParam.trim().toUpperCase();
      setReferralCode(code);
      checkReferralCode(code);
    }

    // Capture UTM tracking params
    const utmSource = searchParams.get('utm_source');
    if (utmSource) {
      sessionStorage.setItem('gl_utm_source', utmSource);
    }
  }, [searchParams]);

  const checkReferralCode = async (code: string) => {
    if (!code) {
      setReferrerDetails(null);
      return;
    }
    const details = await dataService.getReferralDetails(code);
    if (details) {
      setReferrerDetails({
        name: details.student_name,
        college: details.college,
        isAmbassador: details.is_ambassador
      });
    } else {
      setReferrerDetails(null);
    }
  };

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value.toUpperCase();
    setReferralCode(code);
    if (code.length >= 4) {
      checkReferralCode(code);
    } else {
      setReferrerDetails(null);
    }
  };

  const handleCollegeInput = (val: string) => {
    setCollege(val);
    if (val.trim().length > 1) {
      const matches = TOP_COLLEGES.filter((c) =>
        c.toLowerCase().includes(val.toLowerCase())
      );
      setCollegeSuggestions(matches);
      setShowCollegeDropdown(true);
    } else {
      setCollegeSuggestions([]);
      setShowCollegeDropdown(false);
    }
  };

  const selectCollege = (chosen: string) => {
    setCollege(chosen);
    setShowCollegeDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Client-side validations
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanCollege = college.trim();

    if (!cleanName) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setErrorMessage('Please enter a valid academic or personal email address.');
      return;
    }

    if (!cleanCollege) {
      setErrorMessage('Please enter your college or university name.');
      return;
    }

    if (!branch) {
      setErrorMessage('Please select your engineering branch.');
      return;
    }

    if (!graduationYear) {
      setErrorMessage('Please select your graduation year.');
      return;
    }

    setSubmitting(true);

    try {
      const utm_source = searchParams.get('utm_source') || sessionStorage.getItem('gl_utm_source') || undefined;
      const utm_medium = searchParams.get('utm_medium') || undefined;
      const utm_campaign = searchParams.get('utm_campaign') || undefined;
      const utm_content = searchParams.get('utm_content') || undefined;

      const result = await dataService.registerStudent({
        student_name: cleanName,
        email: cleanEmail,
        college: cleanCollege,
        branch,
        graduation_year: graduationYear,
        referred_by_code: referralCode.trim() || undefined,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content
      });

      if (!result.success || !result.referralCode) {
        setErrorMessage(result.error || 'Registration failed. Please verify your details.');
        setSubmitting(false);
        return;
      }

      // Successful registration: navigate to personal referral dashboard
      navigate(`/r/${result.referralCode}`, {
        state: { isNewRegistration: true, studentName: cleanName }
      });
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'An unexpected connection error occurred.');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Workshop Information & Value Prop */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 bg-lime text-ink text-[11px] font-bold px-2.5 py-1 rounded-md shadow-subtle border border-lime-dark/30 font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-brand" />
              Free Registration • 500 Seats Available
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight">
              Claim Your Free Seat for the 60-Minute Workshop
            </h1>
            <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
              Join fellow final-year engineering students from leading colleges to build a live, deployable AI project from scratch.
            </p>
          </div>

          {/* Workshop Details Card */}
          <div className="bg-white p-5 rounded-xl border border-surface-border shadow-subtle space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-light text-brand flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-ink block">Workshop Date & Time</span>
                <span className="text-ink-muted">Date and time will be announced</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-lime-light border border-lime/40 text-ink flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-ink" />
              </div>
              <div>
                <span className="font-semibold text-ink block">Target Engineering Cohort</span>
                <span className="text-ink-muted">Final-Year Students (All Engineering Branches)</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-muted text-ink flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4 text-ink-muted" />
              </div>
              <div>
                <span className="font-semibold text-ink block">Included Kit</span>
                <span className="text-ink-muted">Complete Starter Repo, Slides & Placement Cheatsheet</span>
              </div>
            </div>
          </div>

          {/* Peer Referral Incentive Callout */}
          <div className="bg-canvas p-4 rounded-xl border border-surface-border text-xs text-ink-muted leading-relaxed">
            <strong className="text-ink font-semibold block mb-1">
              Turn your seat into an Ambassador Hub
            </strong>
            Immediately upon submitting, you will receive a unique referral link. Invite 3 batchmates to unlock the priority AI Capstone Kit.
          </div>
        </div>

        {/* Right Column: Frictionless Registration Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-surface-border shadow-card relative">
            <div className="border-b border-surface-border pb-4 mb-5">
              <h2 className="text-lg font-bold text-ink">
                Student Registration Form
              </h2>
              <p className="text-xs text-ink-muted mt-0.5">
                Please provide accurate details. Your referral link will be generated instantly.
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2.5 text-xs text-rose-800">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Referral Banner (if referred) */}
            {referrerDetails && (
              <div className="mb-5 p-3.5 bg-brand-light border border-brand/30 rounded-lg flex items-center gap-2.5 text-xs text-brand-dark">
                <CheckCircle2 className="w-4 h-4 text-brand flex-shrink-0" />
                <div>
                  <strong>Referred by {referrerDetails.name}</strong>
                  {referrerDetails.college && <span> ({referrerDetails.college})</span>}
                  {referrerDetails.isAmbassador && (
                    <span className="ml-1.5 bg-brand text-white text-[10px] px-1.5 py-0.2 rounded font-mono">
                      CAMPUS AMBASSADOR
                    </span>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    id="student-full-name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    id="student-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul.sharma@college.edu or rahul@gmail.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
                  />
                </div>
                <span className="text-[10.5px] text-ink-muted mt-1 block">
                  We will never share or sell your email address.
                </span>
              </div>

              {/* College Autocomplete */}
              <div className="relative">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                  College / University <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    id="student-college"
                    value={college}
                    onChange={(e) => handleCollegeInput(e.target.value)}
                    onFocus={() => college.length > 1 && setShowCollegeDropdown(true)}
                    placeholder="e.g. IIT Madras or type your college"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
                  />
                </div>

                {/* Suggestions Dropdown */}
                {showCollegeDropdown && collegeSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-surface-border rounded-lg shadow-card z-20 max-h-48 overflow-y-auto">
                    {collegeSuggestions.map((col, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => selectCollege(col)}
                        className="w-full px-3.5 py-2 text-left text-xs text-ink hover:bg-surface-muted transition-colors border-b border-surface-border/50 last:border-b-0"
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Engineering Branch & Graduation Year (Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                    Engineering Branch <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    id="student-branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as EngineeringBranch)}
                    className="w-full px-3 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink focus:outline-none focus:border-brand"
                  >
                    <option value="">Select branch...</option>
                    {ENGINEERING_BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                    Graduation Year <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    id="student-grad-year"
                    value={graduationYear}
                    onChange={(e) => setGraduationYear(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink focus:outline-none focus:border-brand"
                  >
                    <option value={2025}>2025 (Final Year)</option>
                    <option value={2026}>2026 (Pre-Final Year)</option>
                    <option value={2024}>2024 (Recent Graduate)</option>
                  </select>
                </div>
              </div>

              {/* Optional Referral Code */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono flex items-center justify-between">
                  <span>Referral Code (Optional)</span>
                  <span className="text-ink-muted text-[10.5px] normal-case font-normal font-sans">
                    Got an invite code from a peer or ambassador?
                  </span>
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    id="referral-code-input"
                    value={referralCode}
                    onChange={handleReferralChange}
                    placeholder="e.g. RAHUL-IITM or AMB-AARAV"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink font-mono uppercase placeholder:normal-case placeholder:font-sans placeholder:text-ink-faint focus:outline-none focus:border-brand"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  id="submit-registration-btn"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold py-3 rounded-lg shadow-button border border-brand-dark/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Securing Your Workshop Seat...</span>
                    </div>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-lime" />
                      <span>Complete Free Registration</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-1">
                <span className="text-[11px] text-ink-muted inline-flex items-center gap-1 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Free • Verified Certificate of Attendance Provided
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

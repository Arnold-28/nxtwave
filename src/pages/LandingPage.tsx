import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Clock,
  Code2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Share2,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Award,
  Terminal,
  Zap,
  Check
} from 'lucide-react';
import { InteractiveProjectPreview } from '../components/landing/InteractiveProjectPreview';

export const LandingPage: React.FC = () => {
  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: 'Is this workshop completely free?',
      a: 'Yes, 100% free with zero registration fees. The workshop is designed to empower final-year engineering students with hands-on, practical AI engineering capability that elevates placement resumes.'
    },
    {
      q: 'When will the workshop take place?',
      a: 'Date and time will be announced. Once registered, you will receive an immediate confirmation and priority notification as soon as the live broadcast schedule is finalized.'
    },
    {
      q: 'What prior technical experience is required?',
      a: 'Basic programming familiarity in JavaScript, TypeScript, or Python is helpful, but zero prior AI or machine learning experience is required. Everything is taught step-by-step from first principles.'
    },
    {
      q: 'What will I build and take away from the 60 minutes?',
      a: 'You will build and deploy a working, interactive AI application from scratch. You will also receive the complete starter codebase, API setup cheatsheet, and deployment templates for your GitHub profile.'
    },
    {
      q: 'How does the student referral and ambassador program work?',
      a: 'After registering, every student receives a personalized referral link and code. Share it with your college peers or WhatsApp batches—referring 3 friends unlocks the exclusive AI Placement Capstone Kit.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. BOLD TYPOGRAPHIC HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Top Linear Pill Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-lime text-ink text-[11px] font-bold px-2.5 py-1 rounded-md shadow-subtle border border-lime-dark/30 font-mono uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                Free Online Workshop
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-surface-border text-ink-muted text-xs font-medium px-3 py-1 rounded-md shadow-subtle">
                <Clock className="w-3.5 h-3.5 text-brand" />
                60-Minute Duration
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-surface-border text-ink-muted text-xs font-medium px-3 py-1 rounded-md shadow-subtle">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                Date and time will be announced
              </span>
            </div>

            {/* Bold Typographic Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.08]">
              Your first AI project.{' '}
              <span className="text-brand">
                Built in 60 minutes.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Go from AI-curious to building something real. Join a free, beginner-friendly online workshop designed for final-year engineering students.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                id="hero-primary-cta"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-sm font-semibold px-6 py-3 rounded-lg shadow-button transition-all duration-150 border border-brand-dark/20"
              >
                <Sparkles className="w-4 h-4 text-lime" />
                <span>Claim Your Free Workshop Seat</span>
                <ArrowRight className="w-4 h-4 text-white/80" />
              </Link>
              <a
                href="#preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-surface-muted border border-surface-border hover:border-ink-subtle text-ink text-sm font-medium px-5 py-3 rounded-lg shadow-subtle transition-colors"
              >
                <Code2 className="w-4 h-4 text-ink-muted" />
                <span>Explore AI Pipeline</span>
              </a>
            </div>

            {/* Micro Trust Proof */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-muted font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                100% Free / Zero Hidden Fees
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand" />
                GitHub Ready Codebase
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand" />
                Peer Referral Capstone Kit
              </span>
            </div>
          </div>

          {/* Interactive AI Project Architecture Pipeline Component */}
          <div id="preview" className="mt-12 max-w-5xl mx-auto">
            <InteractiveProjectPreview />
          </div>
        </div>
      </section>

      {/* 2. LEARNING OUTCOMES */}
      <section id="outcomes" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
            Practical Skills for Engineering Placements
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            What you'll walk away with
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            Move beyond generic chat prompts. Learn the actual software architecture behind modern AI products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Outcome 1 */}
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-subtle hover:border-ink-subtle transition-colors space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-brand-light text-brand flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-ink">
              Build & Deploy a Real AI Project
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Develop a functional, cloud-deployed AI application from scratch using clean code, standard APIs, and modern web frameworks.
            </p>
            <div className="pt-1 text-xs font-semibold text-brand flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-brand" />
              <span>100% hands-on code execution</span>
            </div>
          </div>

          {/* Outcome 2 */}
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-subtle hover:border-ink-subtle transition-colors space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-lime-light border border-lime/50 text-ink flex items-center justify-center">
              <Layers className="w-5 h-5 text-ink" />
            </div>
            <h3 className="text-base font-bold text-ink">
              Master Practical API & Prompt Patterns
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Understand structured outputs, JSON schema validation, error resilience, and token management required for enterprise applications.
            </p>
            <div className="pt-1 text-xs font-semibold text-ink flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-lime-dark" />
              <span>Production-tested engineering patterns</span>
            </div>
          </div>

          {/* Outcome 3 */}
          <div className="bg-white p-6 rounded-xl border border-surface-border shadow-subtle hover:border-ink-subtle transition-colors space-y-3.5">
            <div className="w-10 h-10 rounded-lg bg-[#15172B] text-white flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-lime" />
            </div>
            <h3 className="text-base font-bold text-ink">
              A Standout GitHub Capstone for Placements
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Add a verifiable, live-deployed project link to your resume and GitHub profile that demonstrates real-world software capability to interviewers.
            </p>
            <div className="pt-1 text-xs font-semibold text-ink flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Resume & interview talking points</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE-STEP AGENDA */}
      <section id="agenda" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-white rounded-2xl border border-surface-border p-6 sm:p-10 shadow-card">
          <div className="text-center max-w-xl mx-auto mb-10 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
              Structured Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Three-Step 60-Minute Learning Agenda
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Every minute is optimized for maximum hands-on learning with zero fluff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-canvas border border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand uppercase tracking-wider font-mono">
                  Step 01
                </span>
                <span className="bg-white px-2 py-0.5 rounded text-[11px] font-mono text-ink-muted border border-surface-border">
                  00:00 - 00:15
                </span>
              </div>
              <h3 className="text-sm font-bold text-ink">
                Foundations & Project Architecture
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Deconstruct how generative models connect with frontend applications. Understand API authentication, structured JSON contracts, and application workflows.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-canvas border border-brand/40 shadow-subtle space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand uppercase tracking-wider font-mono">
                  Step 02 (Core)
                </span>
                <span className="bg-brand text-white px-2 py-0.5 rounded text-[11px] font-mono font-medium">
                  00:15 - 00:45
                </span>
              </div>
              <h3 className="text-sm font-bold text-ink">
                Live Code-Along: The AI Engine & UI
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Write code side-by-side with the mentor. Implement the AI prompt pipeline, streaming responses, and an intuitive user interface to showcase the output.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-canvas border border-surface-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand uppercase tracking-wider font-mono">
                  Step 03
                </span>
                <span className="bg-white px-2 py-0.5 rounded text-[11px] font-mono text-ink-muted border border-surface-border">
                  00:45 - 01:00
                </span>
              </div>
              <h3 className="text-sm font-bold text-ink">
                Deployment & Placement Portfolio
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Ship the project live to the web. Configure GitHub repositories, write an impressive technical README, and align the project with software engineering job descriptions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AUDIENCE & PREREQUISITES */}
      <section id="audience" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="bg-[#15172B] text-white rounded-2xl p-7 sm:p-11 border border-zinc-800 shadow-elevated">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-brand/20 border border-brand/40 text-brand-light text-xs font-semibold px-2.5 py-1 rounded-md font-mono">
                <Users className="w-3.5 h-3.5 text-lime" />
                <span>Target Engineering Cohort</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Designed specifically for final-year engineering students.
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Whether you are in Computer Science, IT, Electronics (ECE), Electrical (EEE), or non-CS engineering branches preparing for technology placement drives, this workshop provides practical project evidence that sets you apart.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                  <span>Graduating Batch of 2025 and 2026</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                  <span>Beginner-friendly with zero AI prerequisites</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                  <span>All branches welcome (CSE, IT, ECE, EEE, Mech)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <Check className="w-4 h-4 text-lime flex-shrink-0 mt-0.5" />
                  <span>Interactive Q&A during live session</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 p-5 rounded-xl space-y-3.5">
              <div className="flex items-center gap-2 text-lime font-mono text-xs uppercase tracking-wider font-semibold">
                <Share2 className="w-4 h-4" />
                <span>Peer GrowthLoop Reward</span>
              </div>
              <h4 className="text-base font-bold text-white">
                Turn your registration into an ambassador network.
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Every student who registers receives a unique personal invite link. Invite 3 batchmates to unlock the <em>"AI Placement Capstone Starter Kit & Prompt Engineering Cheatsheet"</em>.
              </p>
              <div className="pt-2">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center gap-2 bg-lime hover:bg-lime-hover active:scale-[0.98] text-ink font-bold text-xs py-2.5 rounded-lg transition-all shadow-button-lime"
                >
                  <span>Register & Get Invite Link</span>
                  <ArrowRight className="w-4 h-4 text-ink" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS */}
      <section id="faqs" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center mb-8 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-ink-muted">
            Everything you need to know about joining and building.
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border border-surface-border overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-3.5 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="text-xs sm:text-sm font-semibold text-ink">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-brand flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-ink-muted flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-ink-muted leading-relaxed border-t border-surface-border bg-canvas/30">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#15172B] text-white rounded-2xl p-8 sm:p-12 text-center space-y-6 border border-zinc-800 shadow-elevated relative overflow-hidden">
          <div className="space-y-3 max-w-2xl mx-auto relative z-10">
            <span className="inline-block bg-white/10 text-white text-[11px] font-mono px-3 py-1 rounded-md border border-white/15">
              Limited 500-Seat Cohort
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to build your first AI project?
            </h2>
            <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
              Secure your free seat today. Gain hands-on project experience, take home production code, and earn rewards by inviting your peers.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 relative z-10">
            <Link
              to="/register"
              id="bottom-register-cta"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white font-semibold text-sm px-7 py-3 rounded-lg transition-all shadow-button border border-brand-dark/20"
            >
              <Sparkles className="w-4 h-4 text-lime" />
              <span>Claim Free Registration</span>
              <ArrowRight className="w-4 h-4 text-white/80" />
            </Link>
          </div>

          <p className="text-[11px] text-zinc-400 relative z-10 font-mono">
            Online Live Session • Date and time will be announced • 100% Free
          </p>
        </div>
      </section>
    </div>
  );
};

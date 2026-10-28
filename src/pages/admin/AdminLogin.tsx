import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  Sparkles,
  Database
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithPassword, loginAsDemoOrganizer, isDemoMode } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const from = location.state?.from || '/admin/overview';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    const res = await loginWithPassword(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setErrorMessage(res.error || 'Authentication failed.');
    }
  };

  const handleInstantDemoLogin = async () => {
    setLoading(true);
    await loginAsDemoOrganizer();
    setLoading(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-center py-12 sm:px-6 lg:px-8 antialiased">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <div className="flex justify-center">
          <Logo size="lg" to="/" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
            Organizer Admin Portal
          </h2>
          <p className="text-xs text-ink-muted mt-0.5">
            Access campaign analytics, viral referral pipelines, and growth intelligence.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-6 px-5 sm:px-8 rounded-xl border border-surface-border shadow-card space-y-4">
          {/* Mode Badge */}
          <div className="p-2.5 bg-canvas rounded-lg border border-surface-border flex items-center justify-between text-xs">
            <span className="font-semibold text-ink-muted flex items-center gap-1.5 font-mono text-[10.5px]">
              <Database className="w-3.5 h-3.5 text-brand" />
              <span>Environment:</span>
            </span>
            {isDemoMode ? (
              <span className="bg-amber-50 text-amber-900 border border-amber-200 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono">
                Local Demo Mode
              </span>
            ) : (
              <span className="bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold px-2 py-0.5 rounded text-[10px] uppercase font-mono">
                Supabase Live Auth
              </span>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-start gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                Organizer Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  id="admin-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="organizer@nxtwave.tech"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-ink mb-1 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="admin-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-9 py-2.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-ink-faint hover:text-ink absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              id="admin-submit-login"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#15172B] hover:bg-zinc-800 active:scale-[0.98] text-white font-semibold text-xs py-2.5 rounded-lg transition-all shadow-button disabled:opacity-70"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In as Organizer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-lime" />
                </>
              )}
            </button>
          </form>

          {/* 1-Click Instant Demo Login (for simulated mode) */}
          {isDemoMode && (
            <div className="pt-3 border-t border-surface-border space-y-2.5">
              <button
                type="button"
                id="instant-demo-login-btn"
                onClick={handleInstantDemoLogin}
                className="w-full flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white font-semibold text-xs py-2.5 rounded-lg shadow-button border border-brand-dark/20 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-lime" />
                <span>Instant Demo Organizer Sign-In</span>
              </button>
              <p className="text-[10.5px] text-ink-muted text-center font-mono">
                Demo: <code>organizer@nxtwave.tech</code> / <code>nxtwave2026</code>
              </p>
            </div>
          )}

          <div className="pt-1 text-center">
            <Link
              to="/"
              className="text-xs text-brand hover:underline font-medium"
            >
              ← Back to Workshop Public Page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

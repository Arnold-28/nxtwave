import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Users,
  GitBranch,
  Award,
  Sparkles,
  Calendar,
  Wallet,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Database,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Logo } from '../../components/common/Logo';

export const AdminLayout: React.FC = () => {
  const { user, logout, isDemoMode, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected Route Check
  if (!loading && !user) {
    navigate('/admin/login', { replace: true, state: { from: location.pathname } });
    return null;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', to: '/admin/overview', icon: BarChart3 },
    { name: 'Registrations', to: '/admin/registrations', icon: Users },
    { name: 'Channels & Funnel', to: '/admin/channels', icon: GitBranch },
    { name: 'Ambassador Hub', to: '/admin/ambassadors', icon: Award },
    { name: 'AI Growth Copilot', to: '/admin/insights', icon: Sparkles, badge: 'Smart' },
    { name: '7-Day Planner', to: '/admin/planner', icon: Calendar },
    { name: 'Budget Tracker', to: '/admin/budget', icon: Wallet, highlight: '₹2,000' },
    { name: 'Settings & DB', to: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-canvas flex flex-col lg:flex-row text-ink antialiased">
      {/* Mobile Top Header */}
      <div className="lg:hidden bg-white border-b border-surface-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <Logo size="sm" to="/admin/overview" />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-md text-ink-muted hover:bg-surface-muted"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Linear-Inspired Minimal Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-200 fixed lg:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-surface-border flex flex-col justify-between`}
      >
        <div className="p-4 space-y-5">
          {/* Logo & Sprint Header */}
          <div className="space-y-3">
            <Logo size="sm" to="/admin/overview" />
            
            {/* Active Campaign Sprint Micro-Card */}
            <div className="p-2.5 bg-canvas rounded-lg border border-surface-border space-y-1">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-ink-muted font-mono">
                <span>7-Day Sprint</span>
                <span className="text-brand font-semibold">Active</span>
              </div>
              <p className="text-xs font-semibold text-ink truncate">
                AI Project in 60 Mins
              </p>
              <div className="flex items-center justify-between text-[10.5px] font-mono text-ink-muted">
                <span>Goal: 500 seats</span>
                <span className="text-ink font-bold">₹2,000 cap</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Linear Minimal Sidebar Items */}
          <nav className="space-y-0.5">
            <div className="px-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-ink-muted font-mono">
              Campaign Analytics
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-light text-brand font-semibold border-l-2 border-brand'
                        : 'text-ink-muted hover:text-ink hover:bg-surface-muted/70'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9.5px] font-bold bg-lime text-ink px-1.5 py-0.2 rounded font-mono uppercase">
                      {item.badge}
                    </span>
                  )}
                  {item.highlight && (
                    <span className="text-[10px] font-mono text-ink-muted">
                      {item.highlight}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Info & Footer */}
        <div className="p-3 border-t border-surface-border space-y-2.5 bg-surface-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-md bg-[#15172B] text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                {user?.name?.charAt(0) || 'O'}
              </div>
              <div className="overflow-hidden text-left">
                <span className="text-xs font-semibold text-ink block truncate">
                  {user?.name || 'Organizer'}
                </span>
                <span className="text-[10px] text-ink-muted block truncate font-mono">
                  {user?.email || 'organizer@nxtwave.tech'}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="text-ink-muted hover:text-rose-600 p-1.5 rounded-md hover:bg-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-2 border-t border-surface-border flex items-center justify-between text-[10.5px] text-ink-muted">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand inline-flex items-center gap-1 font-medium"
            >
              <span>Public Page</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            {isDemoMode ? (
              <span className="inline-flex items-center gap-1 text-amber-700 font-mono text-[10px] bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                <Database className="w-2.5 h-2.5" />
                Demo
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-700 font-mono text-[10px] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                <ShieldCheck className="w-2.5 h-2.5" />
                Live
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar with Linear styling */}
        <div className="bg-white border-b border-surface-border px-6 py-2.5 hidden lg:flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-ink-muted">Campaign:</span>
            <span className="font-semibold text-ink bg-canvas px-2 py-0.5 rounded border border-surface-border">
              NxtWave 7-Day Sprint • 500 AI Workshop Seats
            </span>
            {isDemoMode && (
              <span className="bg-amber-50 text-amber-900 border border-amber-200 font-semibold px-2 py-0.5 rounded text-[10px] uppercase font-mono">
                Simulated Data Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-3.5 text-xs text-ink-muted">
            <span>
              Simulated Timeline: <strong className="text-ink font-mono">Day 4 of 7</strong>
            </span>
            <div className="h-3 w-px bg-surface-border" />
            <a
              href="/register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline font-semibold inline-flex items-center gap-1"
            >
              <span>Live Registration Form</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Page Content Body */}
        <div className="p-4 sm:p-6 lg:p-7 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

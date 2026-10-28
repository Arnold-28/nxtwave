import React, { useEffect, useState } from 'react';
import {
  Search,
  Download,
  Filter,
  Users,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Tag
} from 'lucide-react';
import { dataService, sanitizeForCsv } from '../../services/dataService';
import { Registration, ChannelCategory } from '../../types';
import { TOP_COLLEGES, ENGINEERING_BRANCHES } from '../../data/seedData';

export const RegistrationsPage: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('all');
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [maskEmails, setMaskEmails] = useState(false);

  // Sorting
  const [sortField, setSortField] = useState<'created_at' | 'student_name' | 'college'>('created_at');
  const [sortAsc, setSortAsc] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await dataService.getRegistrations();
      setRegistrations(data);
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    let result = [...registrations];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.student_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.college.toLowerCase().includes(q) ||
          r.referral_code.toLowerCase().includes(q) ||
          (r.referred_by_code && r.referred_by_code.toLowerCase().includes(q))
      );
    }

    // Channel filter
    if (selectedChannel !== 'all') {
      result = result.filter((r) => r.channel === selectedChannel);
    }

    // College filter
    if (selectedCollege !== 'all') {
      result = result.filter((r) => r.college === selectedCollege);
    }

    // Branch filter
    if (selectedBranch !== 'all') {
      result = result.filter((r) => r.branch === selectedBranch);
    }

    // Sorting
    result.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'created_at') {
        cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else if (sortField === 'student_name') {
        cmp = a.student_name.localeCompare(b.student_name);
      } else if (sortField === 'college') {
        cmp = a.college.localeCompare(b.college);
      }
      return sortAsc ? cmp : -cmp;
    });

    setFilteredRegistrations(result);
    setCurrentPage(1);
  }, [registrations, searchQuery, selectedChannel, selectedCollege, selectedBranch, sortField, sortAsc]);

  // Pagination slice
  const totalPages = Math.ceil(filteredRegistrations.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const currentSlice = filteredRegistrations.slice(startIndex, startIndex + pageSize);

  // CSV Export with formula injection sanitization
  const exportToCSV = () => {
    const headers = [
      'Registration ID',
      'Student Name',
      'Email',
      'College',
      'Branch',
      'Graduation Year',
      'Channel',
      'Personal Referral Code',
      'Referred By Code',
      'Registration Timestamp'
    ];

    const rows = filteredRegistrations.map((r) => [
      sanitizeForCsv(r.id),
      sanitizeForCsv(r.student_name),
      sanitizeForCsv(r.email),
      sanitizeForCsv(r.college),
      sanitizeForCsv(r.branch),
      sanitizeForCsv(r.graduation_year),
      sanitizeForCsv(r.channel),
      sanitizeForCsv(r.referral_code),
      sanitizeForCsv(r.referred_by_code || 'None'),
      sanitizeForCsv(new Date(r.created_at).toLocaleString())
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `growthloop_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maskEmailAddress = (emailStr: string) => {
    if (!maskEmails) return emailStr;
    const [user, domain] = emailStr.split('@');
    if (!domain) return emailStr;
    const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
    return `${maskedUser}@${domain}`;
  };

  return (
    <div className="space-y-5">
      {/* 1. TOP HEADER & EXPORT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand font-mono">
            Database Audit & Records
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Student Registrations
          </h1>
          <p className="text-xs text-ink-muted mt-0.5">
            Search, filter, and audit verified engineering student signups with sanitized CSV export.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMaskEmails(!maskEmails)}
            className="inline-flex items-center gap-1.5 bg-white border border-surface-border hover:bg-surface-muted text-ink-muted text-xs font-medium px-3 py-2 rounded-lg transition-colors shadow-subtle"
            title="Toggle email privacy mask"
          >
            {maskEmails ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{maskEmails ? 'Unmask Emails' : 'Privacy Mask'}</span>
          </button>

          <button
            onClick={exportToCSV}
            id="export-csv-btn"
            className="inline-flex items-center gap-2 bg-[#15172B] hover:bg-zinc-800 active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-button"
          >
            <Download className="w-3.5 h-3.5 text-lime" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* 2. FILTER & SEARCH CONTROLS */}
      <div className="bg-white p-3 rounded-xl border border-surface-border shadow-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
        {/* Search Input with Linear aesthetic */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-ink-faint absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            id="search-registrations-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name, college, email, referral..."
            className="w-full pl-8 pr-3 py-1.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand"
          />
        </div>

        {/* Channel Filter */}
        <div>
          <select
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink focus:outline-none focus:border-brand"
          >
            <option value="all">All Channels</option>
            <option value="College clubs">College clubs</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="Faculty and placement cells">Faculty & placement</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Ambassadors">Ambassadors</option>
            <option value="Paid promotion">Paid promotion</option>
            <option value="Direct">Direct</option>
          </select>
        </div>

        {/* College Filter */}
        <div>
          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink focus:outline-none focus:border-brand truncate"
          >
            <option value="all">All Engineering Colleges</option>
            {TOP_COLLEGES.map((col) => (
              <option key={col} value={col}>
                {col.split('(')[0].trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Branch Filter */}
        <div>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="w-full px-2.5 py-1.5 bg-canvas border border-surface-border rounded-lg text-xs text-ink focus:outline-none focus:border-brand truncate"
          >
            <option value="all">All Engineering Branches</option>
            {ENGINEERING_BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b.split('(')[1]?.replace(')', '') || b}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. REGISTRATIONS DATA TABLE - LINEAR HIGH-DENSITY TABLE */}
      <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
        <div className="px-4 py-3 border-b border-surface-border flex items-center justify-between text-xs">
          <span className="font-semibold text-ink">
            Showing {filteredRegistrations.length} Verified Registrations
          </span>
          <span className="text-[10.5px] text-ink-muted inline-flex items-center gap-1 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Formula Sanitized Export
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="bg-canvas border-b border-surface-border text-ink-muted uppercase font-bold text-[10px] tracking-wider font-mono">
              <tr>
                <th className="px-4 py-3">Student / Contact</th>
                <th className="px-3 py-3">College & Branch</th>
                <th className="px-3 py-3">Grad Year</th>
                <th className="px-3 py-3">Channel</th>
                <th className="px-3 py-3">Referral Attribution</th>
                <th className="px-4 py-3">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {currentSlice.map((reg) => (
                <tr key={reg.id} className="hover:bg-canvas/50 transition-colors">
                  {/* Student Name & Masked Email */}
                  <td className="px-4 py-2.5">
                    <span className="font-semibold text-ink block">
                      {reg.student_name}
                    </span>
                    <span className="text-[10.5px] text-ink-muted font-mono">
                      {maskEmailAddress(reg.email)}
                    </span>
                  </td>

                  {/* College & Branch */}
                  <td className="px-3 py-2.5">
                    <span className="font-medium text-ink block truncate max-w-[200px]" title={reg.college}>
                      {reg.college}
                    </span>
                    <span className="text-[10px] text-ink-muted block truncate max-w-[180px]">
                      {reg.branch}
                    </span>
                  </td>

                  {/* Grad Year */}
                  <td className="px-3 py-2.5 font-mono text-ink">
                    <span className="bg-canvas px-1.5 py-0.5 rounded border border-surface-border text-[11px]">
                      {reg.graduation_year}
                    </span>
                  </td>

                  {/* Acquisition Channel */}
                  <td className="px-3 py-2.5">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10.5px] font-medium bg-canvas border border-surface-border text-ink">
                      {reg.channel}
                    </span>
                  </td>

                  {/* Referral Attribution */}
                  <td className="px-3 py-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[10.5px] font-mono text-brand font-semibold block">
                        {reg.referral_code}
                      </span>
                      {reg.referred_by_code ? (
                        <span className="text-[9.5px] text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded border border-emerald-200 font-mono inline-block">
                          via {reg.referred_by_code}
                        </span>
                      ) : (
                        <span className="text-[9.5px] text-ink-muted font-mono">direct</span>
                      )}
                    </div>
                  </td>

                  {/* Timestamp */}
                  <td className="px-4 py-2.5 font-mono text-ink-muted text-[10.5px] whitespace-nowrap">
                    {new Date(reg.created_at).toLocaleDateString('en-IN', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))}

              {currentSlice.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-8 text-center text-ink-muted">
                    No student registrations found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION CONTROLS */}
        <div className="px-4 py-2.5 border-t border-surface-border flex items-center justify-between text-xs text-ink-muted bg-canvas/30">
          <div>
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, filteredRegistrations.length)} of {filteredRegistrations.length} registrations
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-surface-border hover:bg-white text-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-ink font-semibold text-xs">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-surface-border hover:bg-white text-ink disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

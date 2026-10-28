# GrowthLoop AI 🚀

**GrowthLoop AI** is a referral-powered student acquisition platform engineered for **NxtWave** to reach **500 final-year engineering student registrations in seven days** for its free online workshop:

> **"Build Your First AI Project in 60 Minutes"**  
> *Campaign Budget: ₹2,000*

GrowthLoop AI turns every registered student into an active growth ambassador through unique personal invite links, one-tap WhatsApp sharing, campus-wide leaderboards, actionable AI growth intelligence, and real-time campaign telemetry.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (Custom SaaS palette with `#F8F7F4` canvas, `#15172B` ink, `#7357FF` brand accent, and `#D8F36A` lime)
- **Routing**: React Router v7
- **Icons**: Lucide React
- **Analytics & Visuals**: Recharts + Canvas Confetti
- **Database & Auth**: Supabase PostgreSQL with Row Level Security (RLS) + Local Demo Mode fallback
- **Deployment**: Vercel-ready with SPA URL rewriting (`vercel.json`)

---

## 🌟 Key Product Features

### 1. High-Converting Public Landing Page (`/`)
- Headline: *"Your first AI project. Built in 60 minutes."*
- Supporting copy: *"Go from AI-curious to building something real. Join a free, beginner-friendly online workshop designed for final-year engineering students."*
- Interactive 60-Minute AI Project Sandbox previewing live prompt engineering, token streaming, and working app output.
- 3-step learning agenda (0-15m Foundations, 15-45m Live Code-along, 45-60m Deployment & GitHub Capstone).
- Honest schedule copy: *"Date and time will be announced."* Zero false hype or invented speakers.

### 2. Verified Student Registration (`/register`)
- Collects: Full Name, Email, College (with instant autocomplete), Engineering Branch, Graduation Year, and Optional Referral Code.
- Client-side & server-side validation with email normalization.
- Database-enforced duplicate prevention and self-referral exclusion.
- Automatic personal referral code generation upon submission.

### 3. Viral Referral Engine (`/r/:referralCode`)
- Personalized ambassador hub with 1-click invite link copying.
- Instant WhatsApp share button with prefilled, URL-encoded placement invite message.
- Separate, non-inflated tracking for link visits vs confirmed attributed registrations.
- Milestone Progress Bar (3 referrals = Unlock AI Placement Capstone Starter Kit).
- Campus leaderboard representation.

### 4. Organizer Dashboard (`/admin/*`)
- **Protected Organizer Portal**: Requires authentication via Supabase Auth or Local Demo Organizer session.
- **Overview (`/admin/overview`)**: Total registrations, progress toward 500, daily velocity, landing visits, referral K-factor, and live recent signups.
- **Registrations (`/admin/registrations`)**: Searchable, filterable table with pagination, student email privacy masking, and CSV export with spreadsheet formula injection sanitization (`=, +, -, @` escaping).
- **Channels & Funnel (`/admin/channels`)**: 5-stage funnel visualization (Landing visit → Reg started → Reg completed → Referral shared → Referred registration completed) with UTM tracking.
- **Ambassadors (`/admin/ambassadors`)**: Assign student leads to engineering colleges, set quotas, track attributed signups, and export aggregated performance CSVs.
- **AI Growth Copilot (`/admin/insights`)**: Deterministic, rule-based intelligence panel calculating daily required run-rates, viral velocity, college gaps, and budget CAC efficiency.
- **7-Day Planner (`/admin/planner`)**: Editable daily milestones (40, 55, 65, 75, 85, 90, 90) and channel targets.
- **₹2,000 Budget Tracker (`/admin/budget`)**: Micro-budget tracker for Paid Ads (₹1,000), Ambassador Materials (₹500), and Contingency (₹500) with Cost-Per-Acquisition calculation.
- **Settings & DB (`/admin/settings`)**: Diagnostics, connection status, and 1-click simulated data reset.

---

## 🔒 Security & Data Handling

1. **Row Level Security (RLS)**: Restrictive Supabase policies ensure anonymous users can only submit registrations and view public aggregate counters. Student emails and organizer tables are protected.
2. **Spreadsheet Formula Injection Prevention**: Exported CSV fields are strictly sanitized using `sanitizeForCsv` to neutralize Excel/Sheets macro injections.
3. **Dual Mode Architecture**: If Supabase credentials are absent, GrowthLoop AI runs in a clearly marked **Local Demo Mode** with a persistent simulated dataset of Indian engineering colleges and students. Simulated records are never conflated with live data.

---

## 🚀 Getting Started

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment (Optional for Live Supabase)
\`\`\`bash
cp .env.example .env
\`\`\`
Edit `.env` with your Supabase credentials:
\`\`\`env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

If omitted, the app runs in **Local Demo Mode** with full functionality.

### 3. Run Locally
\`\`\`bash
npm run dev
\`\`\`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`

---

## 🧪 Acceptance Criteria Checklist

- [x] Application compiles cleanly with TypeScript and Vite
- [x] Landing page matches copy and design specifications
- [x] Registration validation enforces unique emails and prevents self-referrals
- [x] Referral engine generates unique links and prefilled WhatsApp messages
- [x] Organizer dashboard requires authentication and provides full telemetry
- [x] CSV exports sanitize dangerous formula prefixes
- [x] AI Growth Copilot produces evidence-backed run-rate calculations
- [x] ₹2,000 campaign budget and 7-day planner are fully editable
- [x] Simulated demo data is explicitly marked and separated

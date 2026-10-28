-- =========================================================================
-- GrowthLoop AI: PostgreSQL Schema & Security Policies (Supabase Compatible)
-- Campaign: NxtWave "Build Your First AI Project in 60 Minutes"
-- Target: 500 Engineering Registrations / 7-Day Sprint / ₹2,000 Budget Cap
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. REGISTRATIONS TABLE
create table if not exists public.registrations (
    id uuid primary key default uuid_generate_v4(),
    student_name text not null,
    email text not null unique,
    college text not null,
    branch text not null,
    graduation_year integer not null,
    referral_code text not null unique,
    referred_by_code text,
    channel text not null default 'Direct',
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexing for fast search and unique queries
create index if not exists idx_registrations_email on public.registrations(lower(email));
create index if not exists idx_registrations_referral_code on public.registrations(upper(referral_code));
create index if not exists idx_registrations_referred_by on public.registrations(upper(referred_by_code));
create index if not exists idx_registrations_college on public.registrations(college);
create index if not exists idx_registrations_channel on public.registrations(channel);

-- 2. REFERRAL CODES TABLE
create table if not exists public.referral_codes (
    id uuid primary key default uuid_generate_v4(),
    code text not null unique,
    student_name text not null,
    registration_id uuid references public.registrations(id) on delete cascade,
    visits_count integer not null default 0,
    registrations_count integer not null default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_referral_codes_code on public.referral_codes(upper(code));

-- 3. REFERRAL EVENTS TABLE (Tracking click vs signup without inflation)
create table if not exists public.referral_events (
    id uuid primary key default uuid_generate_v4(),
    referral_code text not null,
    event_type text not null check (event_type in ('visit', 'registration_started', 'registration_completed')),
    registration_id uuid references public.registrations(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_referral_events_code on public.referral_events(upper(referral_code));

-- 4. CAMPAIGN EVENTS (Telemetry Funnel)
create table if not exists public.campaign_events (
    id uuid primary key default uuid_generate_v4(),
    event_type text not null,
    channel text not null default 'Direct',
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_campaign_events_type on public.campaign_events(event_type);

-- 5. CAMPUS AMBASSADORS TABLE
create table if not exists public.ambassadors (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    display_name text not null,
    email text not null unique,
    college text not null,
    ambassador_code text not null unique,
    target_registrations integer not null default 30,
    attributed_registrations integer not null default 0,
    status text not null default 'active' check (status in ('active', 'pending', 'inactive')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_ambassadors_code on public.ambassadors(upper(ambassador_code));

-- 6. CAMPAIGN TARGETS (7-Day Sprint)
create table if not exists public.campaign_targets (
    id serial primary key,
    day_number integer not null unique,
    date_label text not null,
    target_registrations integer not null,
    actual_registrations integer default 0
);

-- 7. BUDGET ENTRIES (₹2,000 Budget Cap)
create table if not exists public.budget_entries (
    id uuid primary key default uuid_generate_v4(),
    category text not null unique,
    allocated_amount numeric(10,2) not null,
    spent_amount numeric(10,2) not null default 0,
    notes text,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. ORGANIZER PROFILES TABLE
create table if not exists public.organizer_profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    email text not null unique,
    full_name text not null,
    role text not null default 'growth_manager' check (role in ('lead_organizer', 'growth_manager')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

-- Enable RLS on all tables
alter table public.registrations enable row level security;
alter table public.referral_codes enable row level security;
alter table public.referral_events enable row level security;
alter table public.campaign_events enable row level security;
alter table public.ambassadors enable row level security;
alter table public.campaign_targets enable row level security;
alter table public.budget_entries enable row level security;
alter table public.organizer_profiles enable row level security;

-- Function: Check if current user is an authenticated organizer
create or replace function public.is_organizer()
returns boolean as $$
begin
    return exists (
        select 1 from public.organizer_profiles
        where id = auth.uid()
    );
end;
$$ language plpgsql security definer;

-- REGISTRATIONS POLICIES
-- 1. Anonymous visitors can insert registrations (student sign-up flow)
create policy "Allow public student registration"
on public.registrations for insert
with check (true);

-- 2. Only authenticated organizers can view full student registration lists
create policy "Organizers can view all registrations"
on public.registrations for select
using (public.is_organizer());

-- REFERRAL CODES POLICIES
-- 1. Public can read referral code aggregate metadata (visits & signups) by code
create policy "Public can view aggregate referral code status"
on public.referral_codes for select
using (true);

-- 2. Public can insert new referral code upon registration
create policy "Allow insert on registration"
on public.referral_codes for insert
with check (true);

-- 3. Public can update visit counts
create policy "Allow referral visit increments"
on public.referral_codes for update
using (true)
with check (true);

-- AMBASSADORS POLICIES
-- Public can read active ambassadors for leaderboard display
create policy "Public can read active ambassadors"
on public.ambassadors for select
using (status = 'active');

-- Organizers can manage ambassadors
create policy "Organizers manage ambassadors"
on public.ambassadors for all
using (public.is_organizer());

-- CAMPAIGN TARGETS & BUDGET
create policy "Public can read campaign targets"
on public.campaign_targets for select
using (true);

create policy "Organizers manage targets"
on public.campaign_targets for all
using (public.is_organizer());

create policy "Organizers manage budget"
on public.budget_entries for all
using (public.is_organizer());

-- =========================================================================
-- INITIAL SEED DATA FOR PRODUCTION
-- =========================================================================

insert into public.campaign_targets (day_number, date_label, target_registrations)
values 
    (1, 'Day 1 (Launch)', 40),
    (2, 'Day 2', 55),
    (3, 'Day 3', 65),
    (4, 'Day 4', 75),
    (5, 'Day 5', 85),
    (6, 'Day 6', 90),
    (7, 'Day 7 (Workshop Eve)', 90)
on conflict (day_number) do nothing;

insert into public.budget_entries (category, allocated_amount, spent_amount, notes)
values
    ('Paid promotion experiment', 1000.00, 0.00, 'Meta micro-targeted campaign for final year engineering students'),
    ('Ambassador promotional materials', 500.00, 0.00, 'Digital creatives kit, badges, and WhatsApp materials'),
    ('Contingency', 500.00, 0.00, 'Reserved for Day 6-7 boost if run-rate slows down')
on conflict (category) do nothing;

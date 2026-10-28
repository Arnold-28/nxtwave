export type EngineeringBranch =
  | 'Computer Science & Engineering (CSE)'
  | 'Information Technology (IT)'
  | 'Electronics & Communication (ECE)'
  | 'Electrical & Electronics (EEE)'
  | 'Artificial Intelligence & Data Science (AI & DS)'
  | 'Mechanical Engineering'
  | 'Civil Engineering'
  | 'Other Engineering Branch';

export type ChannelCategory =
  | 'College clubs'
  | 'WhatsApp'
  | 'Faculty and placement cells'
  | 'LinkedIn'
  | 'Ambassadors'
  | 'Paid promotion'
  | 'Direct'
  | 'Other';

export interface Registration {
  id: string;
  student_name: string;
  email: string;
  college: string;
  branch: EngineeringBranch | string;
  graduation_year: number;
  referral_code: string;
  referred_by_code?: string | null;
  channel: ChannelCategory;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  created_at: string;
}

export interface ReferralCode {
  id: string;
  code: string;
  student_name: string;
  registration_id: string;
  visits_count: number;
  registrations_count: number;
  created_at: string;
}

export interface ReferralEvent {
  id: string;
  referral_code: string;
  event_type: 'visit' | 'registration_started' | 'registration_completed';
  registration_id?: string;
  created_at: string;
}

export interface CampaignEvent {
  id: string;
  event_type:
    | 'landing_visit'
    | 'registration_started'
    | 'registration_completed'
    | 'referral_shared'
    | 'referred_registration_completed';
  channel: ChannelCategory;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  created_at: string;
}

export interface Ambassador {
  id: string;
  name: string;
  display_name: string;
  email: string;
  college: string;
  ambassador_code: string;
  target_registrations: number;
  attributed_registrations: number;
  status: 'active' | 'pending' | 'inactive';
  created_at: string;
}

export interface CampaignTarget {
  day_number: number;
  date_label: string;
  target_registrations: number;
  actual_registrations?: number;
}

export interface ChannelTarget {
  channel: ChannelCategory;
  target_registrations: number;
  actual_registrations?: number;
}

export interface BudgetEntry {
  id: string;
  category: string;
  allocated_amount: number;
  spent_amount: number;
  notes: string;
  updated_at: string;
}

export interface GrowthInsight {
  id: string;
  title: string;
  category: 'trajectory' | 'channel' | 'referral' | 'college' | 'experiment';
  observation: string;
  evidence: string;
  suggested_action: string;
  confidence_level: 'High' | 'Medium' | 'Low';
  metric_highlight?: string;
}

export interface CampaignMetrics {
  totalRegistrations: number;
  targetRegistrations: number;
  registrationsToday: number;
  uniqueLandingVisitors: number;
  referralAttributedRegistrations: number;
  overallConversionRate: number;
  referralShareRate: number;
  referralConversionRate: number;
  viralCoefficient: number;
  totalBudget: number;
  spentBudget: number;
  costPerRegistration: number | null;
}

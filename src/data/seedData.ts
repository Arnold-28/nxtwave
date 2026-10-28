import {
  Registration,
  Ambassador,
  CampaignTarget,
  ChannelTarget,
  BudgetEntry,
  EngineeringBranch
} from '../types';

export const TOP_COLLEGES = [
  'IIT Madras (Indian Institute of Technology)',
  'NIT Trichy (National Institute of Technology)',
  'BITS Pilani, Hyderabad Campus',
  'JNTU College of Engineering, Hyderabad',
  'Anna University (CEG Campus), Chennai',
  'RV College of Engineering (RVCE), Bangalore',
  'PSG College of Technology, Coimbatore',
  'VIT Vellore (Vellore Institute of Technology)',
  'SRM Institute of Science and Technology, Chennai',
  'Osmania University College of Engineering (OUCE)',
  'Chaitanya Bharathi Institute of Technology (CBIT)',
  'Vasavi College of Engineering, Hyderabad',
  'BMS College of Engineering, Bangalore',
  'Thapar Institute of Engineering & Tech, Patiala'
];

export const ENGINEERING_BRANCHES: EngineeringBranch[] = [
  'Computer Science & Engineering (CSE)',
  'Information Technology (IT)',
  'Electronics & Communication (ECE)',
  'Electrical & Electronics (EEE)',
  'Artificial Intelligence & Data Science (AI & DS)',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other Engineering Branch'
];

export const INITIAL_AMBASSADORS: Ambassador[] = [
  {
    id: 'amb-1',
    name: 'Aarav Sharma',
    display_name: 'Aarav S. (IIT Madras)',
    email: 'aarav.sharma@campus.iitm.ac.in',
    college: 'IIT Madras (Indian Institute of Technology)',
    ambassador_code: 'AMB-AARAV',
    target_registrations: 45,
    attributed_registrations: 38,
    status: 'active',
    created_at: '2026-10-24T09:00:00Z'
  },
  {
    id: 'amb-2',
    name: 'Sneha Reddy',
    display_name: 'Sneha R. (JNTUH)',
    email: 'sneha.reddy@jntuh.ac.in',
    college: 'JNTU College of Engineering, Hyderabad',
    ambassador_code: 'AMB-SNEHA',
    target_registrations: 40,
    attributed_registrations: 34,
    status: 'active',
    created_at: '2026-10-24T09:30:00Z'
  },
  {
    id: 'amb-3',
    name: 'Karthik Raman',
    display_name: 'Karthik R. (NIT Trichy)',
    email: 'karthik.raman@nitt.edu',
    college: 'NIT Trichy (National Institute of Technology)',
    ambassador_code: 'AMB-KARTHIK',
    target_registrations: 35,
    attributed_registrations: 29,
    status: 'active',
    created_at: '2026-10-24T10:00:00Z'
  },
  {
    id: 'amb-4',
    name: 'Ananya Iyer',
    display_name: 'Ananya I. (Anna Univ)',
    email: 'ananya.iyer@annauniv.edu',
    college: 'Anna University (CEG Campus), Chennai',
    ambassador_code: 'AMB-ANANYA',
    target_registrations: 35,
    attributed_registrations: 27,
    status: 'active',
    created_at: '2026-10-24T10:30:00Z'
  },
  {
    id: 'amb-5',
    name: 'Rohan Varma',
    display_name: 'Rohan V. (BITS Hyd)',
    email: 'rohan.varma@hyderabad.bits-pilani.ac.in',
    college: 'BITS Pilani, Hyderabad Campus',
    ambassador_code: 'AMB-ROHAN',
    target_registrations: 30,
    attributed_registrations: 22,
    status: 'active',
    created_at: '2026-10-24T11:00:00Z'
  },
  {
    id: 'amb-6',
    name: 'Priya Nair',
    display_name: 'Priya N. (RVCE)',
    email: 'priya.nair@rvce.edu.in',
    college: 'RV College of Engineering (RVCE), Bangalore',
    ambassador_code: 'AMB-PRIYA',
    target_registrations: 30,
    attributed_registrations: 19,
    status: 'active',
    created_at: '2026-10-24T11:30:00Z'
  }
];

export const INITIAL_DAILY_TARGETS: CampaignTarget[] = [
  { day_number: 1, date_label: 'Day 1 (Launch)', target_registrations: 40, actual_registrations: 44 },
  { day_number: 2, date_label: 'Day 2', target_registrations: 55, actual_registrations: 59 },
  { day_number: 3, date_label: 'Day 3', target_registrations: 65, actual_registrations: 68 },
  { day_number: 4, date_label: 'Day 4 (Today)', target_registrations: 75, actual_registrations: 54 },
  { day_number: 5, date_label: 'Day 5', target_registrations: 85, actual_registrations: 0 },
  { day_number: 6, date_label: 'Day 6', target_registrations: 90, actual_registrations: 0 },
  { day_number: 7, date_label: 'Day 7 (Workshop Eve)', target_registrations: 90, actual_registrations: 0 }
];

export const INITIAL_CHANNEL_TARGETS: ChannelTarget[] = [
  { channel: 'College clubs', target_registrations: 200, actual_registrations: 92 },
  { channel: 'WhatsApp', target_registrations: 150, actual_registrations: 68 },
  { channel: 'Faculty and placement cells', target_registrations: 75, actual_registrations: 34 },
  { channel: 'LinkedIn', target_registrations: 50, actual_registrations: 17 },
  { channel: 'Paid promotion', target_registrations: 25, actual_registrations: 14 }
];

export const INITIAL_BUDGET: BudgetEntry[] = [
  {
    id: 'b-1',
    category: 'Paid promotion experiment',
    allocated_amount: 1000,
    spent_amount: 350,
    notes: 'Meta micro-targeted campaign for final year engineering students (₹350 spent, 14 signups, CAC: ₹25.00)',
    updated_at: '2026-10-27T18:00:00Z'
  },
  {
    id: 'b-2',
    category: 'Ambassador promotional materials',
    allocated_amount: 500,
    spent_amount: 150,
    notes: 'Digital creatives kit, workshop badges, and WhatsApp stickers for student ambassadors',
    updated_at: '2026-10-26T12:00:00Z'
  },
  {
    id: 'b-3',
    category: 'Contingency',
    allocated_amount: 500,
    spent_amount: 0,
    notes: 'Reserved for Day 6-7 final push boost experiment if run-rate slows down',
    updated_at: '2026-10-25T10:00:00Z'
  }
];

export const SEED_REGISTRATIONS: Registration[] = [
  // Day 1
  {
    id: 'reg-001',
    student_name: 'Rahul Sharma',
    email: 'rahul.sharma@campus.iitm.ac.in',
    college: 'IIT Madras (Indian Institute of Technology)',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'RAHUL-IITM',
    referred_by_code: 'AMB-AARAV',
    channel: 'Ambassadors',
    created_at: '2026-10-25T10:14:00Z'
  },
  {
    id: 'reg-002',
    student_name: 'Divya Venkatesh',
    email: 'divya.venkat@nitt.edu',
    college: 'NIT Trichy (National Institute of Technology)',
    branch: 'Information Technology (IT)',
    graduation_year: 2025,
    referral_code: 'DIVYA-NITT',
    referred_by_code: 'AMB-KARTHIK',
    channel: 'College clubs',
    created_at: '2026-10-25T10:45:00Z'
  },
  {
    id: 'reg-003',
    student_name: 'Aditya Teja',
    email: 'aditya.teja@jntuh.ac.in',
    college: 'JNTU College of Engineering, Hyderabad',
    branch: 'Artificial Intelligence & Data Science (AI & DS)',
    graduation_year: 2025,
    referral_code: 'ADITYA-JNTU',
    referred_by_code: 'AMB-SNEHA',
    channel: 'WhatsApp',
    created_at: '2026-10-25T11:20:00Z'
  },
  {
    id: 'reg-004',
    student_name: 'Harini Sundar',
    email: 'harini.sundar@annauniv.edu',
    college: 'Anna University (CEG Campus), Chennai',
    branch: 'Electronics & Communication (ECE)',
    graduation_year: 2025,
    referral_code: 'HARINI-AU',
    referred_by_code: 'AMB-ANANYA',
    channel: 'College clubs',
    created_at: '2026-10-25T11:40:00Z'
  },
  {
    id: 'reg-005',
    student_name: 'Siddharth Rao',
    email: 'siddharth.rao@hyderabad.bits-pilani.ac.in',
    college: 'BITS Pilani, Hyderabad Campus',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'SID-BITS',
    referred_by_code: 'AMB-ROHAN',
    channel: 'WhatsApp',
    created_at: '2026-10-25T12:05:00Z'
  },
  {
    id: 'reg-006',
    student_name: 'Manish Kumar',
    email: 'manish.k@rvce.edu.in',
    college: 'RV College of Engineering (RVCE), Bangalore',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'MANISH-RVCE',
    referred_by_code: 'AMB-PRIYA',
    channel: 'College clubs',
    created_at: '2026-10-25T13:10:00Z'
  },
  {
    id: 'reg-007',
    student_name: 'Kavya Subramanian',
    email: 'kavya.sub@psgtech.ac.in',
    college: 'PSG College of Technology, Coimbatore',
    branch: 'Information Technology (IT)',
    graduation_year: 2025,
    referral_code: 'KAVYA-PSG',
    referred_by_code: 'RAHUL-IITM',
    channel: 'WhatsApp',
    created_at: '2026-10-25T14:30:00Z'
  },
  {
    id: 'reg-008',
    student_name: 'Arjun Das',
    email: 'arjun.das@vit.ac.in',
    college: 'VIT Vellore (Vellore Institute of Technology)',
    branch: 'Artificial Intelligence & Data Science (AI & DS)',
    graduation_year: 2025,
    referral_code: 'ARJUN-VIT',
    referred_by_code: null,
    channel: 'LinkedIn',
    created_at: '2026-10-25T15:15:00Z'
  },
  {
    id: 'reg-009',
    student_name: 'Meera Chidambaram',
    email: 'meera.c@annauniv.edu',
    college: 'Anna University (CEG Campus), Chennai',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'MEERA-AU',
    referred_by_code: 'HARINI-AU',
    channel: 'WhatsApp',
    created_at: '2026-10-25T16:00:00Z'
  },
  {
    id: 'reg-010',
    student_name: 'Nikhil Chandran',
    email: 'nikhil.c@srmist.edu.in',
    college: 'SRM Institute of Science and Technology, Chennai',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'NIKHIL-SRM',
    referred_by_code: null,
    channel: 'Paid promotion',
    utm_source: 'meta',
    utm_medium: 'cpc',
    utm_campaign: 'workshop_final_year',
    created_at: '2026-10-25T17:20:00Z'
  },
  // Day 2
  {
    id: 'reg-011',
    student_name: 'Pooja Hegde',
    email: 'pooja.h@rvce.edu.in',
    college: 'RV College of Engineering (RVCE), Bangalore',
    branch: 'Electronics & Communication (ECE)',
    graduation_year: 2025,
    referral_code: 'POOJA-RVCE',
    referred_by_code: 'MANISH-RVCE',
    channel: 'WhatsApp',
    created_at: '2026-10-26T09:15:00Z'
  },
  {
    id: 'reg-012',
    student_name: 'Gautam Singhal',
    email: 'gautam.s@thapar.edu',
    college: 'Thapar Institute of Engineering & Tech, Patiala',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'GAUTAM-TIET',
    referred_by_code: null,
    channel: 'Faculty and placement cells',
    created_at: '2026-10-26T10:00:00Z'
  },
  {
    id: 'reg-013',
    student_name: 'Shruti Bhatt',
    email: 'shruti.b@hyderabad.bits-pilani.ac.in',
    college: 'BITS Pilani, Hyderabad Campus',
    branch: 'Information Technology (IT)',
    graduation_year: 2025,
    referral_code: 'SHRUTI-BITS',
    referred_by_code: 'SID-BITS',
    channel: 'WhatsApp',
    created_at: '2026-10-26T11:30:00Z'
  },
  {
    id: 'reg-014',
    student_name: 'Varun Krishnan',
    email: 'varun.k@psgtech.ac.in',
    college: 'PSG College of Technology, Coimbatore',
    branch: 'Mechanical Engineering',
    graduation_year: 2025,
    referral_code: 'VARUN-PSG',
    referred_by_code: 'KAVYA-PSG',
    channel: 'College clubs',
    created_at: '2026-10-26T13:45:00Z'
  },
  {
    id: 'reg-015',
    student_name: 'Ankita Sen',
    email: 'ankita.sen@vit.ac.in',
    college: 'VIT Vellore (Vellore Institute of Technology)',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'ANKITA-VIT',
    referred_by_code: 'ARJUN-VIT',
    channel: 'WhatsApp',
    created_at: '2026-10-26T15:20:00Z'
  },
  {
    id: 'reg-016',
    student_name: 'Pranav Kulkarni',
    email: 'pranav.k@bmsce.ac.in',
    college: 'BMS College of Engineering, Bangalore',
    branch: 'Artificial Intelligence & Data Science (AI & DS)',
    graduation_year: 2025,
    referral_code: 'PRANAV-BMS',
    referred_by_code: null,
    channel: 'LinkedIn',
    created_at: '2026-10-26T16:10:00Z'
  },
  {
    id: 'reg-017',
    student_name: 'Swathi Rajesh',
    email: 'swathi.r@ouce.ac.in',
    college: 'Osmania University College of Engineering (OUCE)',
    branch: 'Electronics & Communication (ECE)',
    graduation_year: 2025,
    referral_code: 'SWATHI-OU',
    referred_by_code: null,
    channel: 'Faculty and placement cells',
    created_at: '2026-10-26T17:05:00Z'
  },
  {
    id: 'reg-018',
    student_name: 'Deepak Mohan',
    email: 'deepak.m@campus.iitm.ac.in',
    college: 'IIT Madras (Indian Institute of Technology)',
    branch: 'Electrical & Electronics (EEE)',
    graduation_year: 2025,
    referral_code: 'DEEPAK-IITM',
    referred_by_code: 'RAHUL-IITM',
    channel: 'WhatsApp',
    created_at: '2026-10-26T18:40:00Z'
  },
  // Day 3
  {
    id: 'reg-019',
    student_name: 'Ritu Agarwal',
    email: 'ritu.a@cbit.ac.in',
    college: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'RITU-CBIT',
    referred_by_code: null,
    channel: 'College clubs',
    created_at: '2026-10-27T09:40:00Z'
  },
  {
    id: 'reg-020',
    student_name: 'Tanmay Joshi',
    email: 'tanmay.j@nitt.edu',
    college: 'NIT Trichy (National Institute of Technology)',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'TANMAY-NITT',
    referred_by_code: 'DIVYA-NITT',
    channel: 'WhatsApp',
    created_at: '2026-10-27T10:30:00Z'
  },
  {
    id: 'reg-021',
    student_name: 'Aishwarya Patil',
    email: 'aishwarya.p@vasavi.ac.in',
    college: 'Vasavi College of Engineering, Hyderabad',
    branch: 'Information Technology (IT)',
    graduation_year: 2025,
    referral_code: 'AISH-VASAVI',
    referred_by_code: null,
    channel: 'Paid promotion',
    utm_source: 'meta',
    utm_medium: 'cpc',
    utm_campaign: 'workshop_final_year',
    created_at: '2026-10-27T11:50:00Z'
  },
  {
    id: 'reg-022',
    student_name: 'Karan Mehra',
    email: 'karan.m@jntuh.ac.in',
    college: 'JNTU College of Engineering, Hyderabad',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'KARAN-JNTU',
    referred_by_code: 'ADITYA-JNTU',
    channel: 'WhatsApp',
    created_at: '2026-10-27T12:20:00Z'
  },
  {
    id: 'reg-023',
    student_name: 'Bhavna Chawla',
    email: 'bhavna.c@thapar.edu',
    college: 'Thapar Institute of Engineering & Tech, Patiala',
    branch: 'Electronics & Communication (ECE)',
    graduation_year: 2025,
    referral_code: 'BHAVNA-TIET',
    referred_by_code: 'GAUTAM-TIET',
    channel: 'College clubs',
    created_at: '2026-10-27T14:15:00Z'
  },
  {
    id: 'reg-024',
    student_name: 'Akhil Bandi',
    email: 'akhil.b@cbit.ac.in',
    college: 'Chaitanya Bharathi Institute of Technology (CBIT)',
    branch: 'Artificial Intelligence & Data Science (AI & DS)',
    graduation_year: 2025,
    referral_code: 'AKHIL-CBIT',
    referred_by_code: 'RITU-CBIT',
    channel: 'WhatsApp',
    created_at: '2026-10-27T15:35:00Z'
  },
  // Day 4 (Today)
  {
    id: 'reg-025',
    student_name: 'Tanya Saxena',
    email: 'tanya.s@vit.ac.in',
    college: 'VIT Vellore (Vellore Institute of Technology)',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'TANYA-VIT',
    referred_by_code: 'ANKITA-VIT',
    channel: 'WhatsApp',
    created_at: '2026-10-28T09:10:00Z'
  },
  {
    id: 'reg-026',
    student_name: 'Tarun Madhav',
    email: 'tarun.m@campus.iitm.ac.in',
    college: 'IIT Madras (Indian Institute of Technology)',
    branch: 'Artificial Intelligence & Data Science (AI & DS)',
    graduation_year: 2025,
    referral_code: 'TARUN-IITM',
    referred_by_code: 'DEEPAK-IITM',
    channel: 'College clubs',
    created_at: '2026-10-28T10:15:00Z'
  },
  {
    id: 'reg-027',
    student_name: 'Nandini Krishnan',
    email: 'nandini.k@annauniv.edu',
    college: 'Anna University (CEG Campus), Chennai',
    branch: 'Information Technology (IT)',
    graduation_year: 2025,
    referral_code: 'NANDINI-AU',
    referred_by_code: 'MEERA-AU',
    channel: 'WhatsApp',
    created_at: '2026-10-28T11:45:00Z'
  },
  {
    id: 'reg-028',
    student_name: 'Suresh Pillai',
    email: 'suresh.p@vasavi.ac.in',
    college: 'Vasavi College of Engineering, Hyderabad',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'SURESH-VASAVI',
    referred_by_code: 'AISH-VASAVI',
    channel: 'WhatsApp',
    created_at: '2026-10-28T13:20:00Z'
  },
  {
    id: 'reg-029',
    student_name: 'Vivek Gupta',
    email: 'vivek.g@bmsce.ac.in',
    college: 'BMS College of Engineering, Bangalore',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'VIVEK-BMS',
    referred_by_code: 'PRANAV-BMS',
    channel: 'Faculty and placement cells',
    created_at: '2026-10-28T14:50:00Z'
  },
  {
    id: 'reg-030',
    student_name: 'Rohit Chand',
    email: 'rohit.chand@srmist.edu.in',
    college: 'SRM Institute of Science and Technology, Chennai',
    branch: 'Computer Science & Engineering (CSE)',
    graduation_year: 2025,
    referral_code: 'ROHIT-SRM',
    referred_by_code: 'NIKHIL-SRM',
    channel: 'WhatsApp',
    created_at: '2026-10-28T16:05:00Z'
  }
];

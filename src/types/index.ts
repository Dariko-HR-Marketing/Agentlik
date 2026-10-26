export interface Lead {
  id: string;
  title: string;
  company: string;
  contact_name: string;
  contact_phone: string;
  contact_email: string;
  amount: number;
  currency: 'UZS' | 'USD';
  stage_id: string;
  probability: number;
  created_at: string;
  is_stagnant?: boolean;
}

export interface LeadStage {
  id: string;
  title: string;
  color: string;
  order: number;
}

export interface FinanceOperation {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  currency: 'UZS' | 'USD';
  description: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface Project {
  id: string;
  title: string;
  client: string;
  budget: number;
  currency: 'UZS' | 'USD';
  deadline: string;
  status: 'active' | 'completed' | 'on_hold';
  progress: number;
  tasks_count: number;
  completed_tasks: number;
}

export interface Employee {
  id: string;
  full_name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  salary: number;
  currency: 'UZS' | 'USD';
  kpi: number;
  avatar_url?: string;
  status: 'active' | 'vacation';
}

export interface CompanyHealth {
  score: number;
  sales: number;
  delivery: number;
  finance: number;
  team: number;
  revenue_mtd: number;
  profit_mtd: number;
  active_leads: number;
  active_projects: number;
  overdue_tasks: number;
}

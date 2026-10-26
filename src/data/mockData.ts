import { Lead, LeadStage, FinanceOperation, Project, Employee, CompanyHealth } from '../types';

export const initialStages: LeadStage[] = [
  { id: 'new', title: 'Новые лиды', color: '#3b82f6', order: 1 },
  { id: 'contact', title: 'Первый контакт', color: '#eab308', order: 2 },
  { id: 'negotiation', title: 'Переговоры / КП', color: '#a855f7', order: 3 },
  { id: 'contract', title: 'Договор / Счёт', color: '#f97316', order: 4 },
  { id: 'won', title: 'Успешно реализовано', color: '#22c55e', order: 5 },
];

export const initialLeads: Lead[] = [
  {
    id: 'l-1',
    title: 'Разработка корпоративного портала',
    company: 'Artel Electronics',
    contact_name: 'Сардор Алимов',
    contact_phone: '+998 90 123 45 67',
    contact_email: 'sardor@artel.uz',
    amount: 185000000,
    currency: 'UZS',
    stage_id: 'negotiation',
    probability: 70,
    created_at: '2026-10-20',
  },
  {
    id: 'l-2',
    title: 'HR автоматизация и кадровый учет',
    company: 'Akfa Holding',
    contact_name: 'Жасур Рустамов',
    contact_phone: '+998 97 765 43 21',
    contact_email: 'j.rustamov@akfa.uz',
    amount: 92000000,
    currency: 'UZS',
    stage_id: 'contract',
    probability: 90,
    created_at: '2026-10-18',
  },
  {
    id: 'l-3',
    title: 'Маркетинговая стратегия и таргетинг',
    company: 'EVOS Fast Food',
    contact_name: 'Дильноза Махмудова',
    contact_phone: '+998 93 555 12 34',
    contact_email: 'dilnoza@evos.uz',
    amount: 45000000,
    currency: 'UZS',
    stage_id: 'contact',
    probability: 50,
    created_at: '2026-10-24',
  },
  {
    id: 'l-4',
    title: 'Внедрение CRM & телефонии',
    company: 'Apex Bank',
    contact_name: 'Камиль Исаев',
    contact_phone: '+998 99 900 88 77',
    contact_email: 'kamil@apexbank.uz',
    amount: 240000000,
    currency: 'UZS',
    stage_id: 'won',
    probability: 100,
    created_at: '2026-10-10',
  },
  {
    id: 'l-5',
    title: 'Мобильное приложение для логистики',
    company: 'Orient Logistics',
    contact_name: 'Бобур Шарипов',
    contact_phone: '+998 94 321 00 11',
    contact_email: 'bobur@orient.uz',
    amount: 140000000,
    currency: 'UZS',
    stage_id: 'new',
    probability: 30,
    created_at: '2026-10-25',
  }
];

export const initialOperations: FinanceOperation[] = [
  {
    id: 'f-1',
    type: 'income',
    category: 'Оплата по договору (Apex Bank)',
    amount: 120000000,
    currency: 'UZS',
    description: '1-й транш по внедрению CRM',
    date: '2026-10-25',
    status: 'completed'
  },
  {
    id: 'f-2',
    type: 'expense',
    category: 'Заработная плата сотрудников',
    amount: 78000000,
    currency: 'UZS',
    description: 'Выплата аванса за октябрь',
    date: '2026-10-20',
    status: 'completed'
  },
  {
    id: 'f-3',
    type: 'expense',
    category: 'Аренда офиса и коммунальные',
    amount: 18500000,
    currency: 'UZS',
    description: 'Офис в IT Park, октябрь 2026',
    date: '2026-10-15',
    status: 'completed'
  },
  {
    id: 'f-4',
    type: 'income',
    category: 'Консалтинг и аудит',
    amount: 35000000,
    currency: 'UZS',
    description: 'Digital-аудит бизнес-процессов',
    date: '2026-10-12',
    status: 'completed'
  },
  {
    id: 'f-5',
    type: 'expense',
    category: 'Серверы и облачная инфраструктура',
    amount: 4200000,
    currency: 'UZS',
    description: 'AWS & Cloudflare подписки',
    date: '2026-10-05',
    status: 'completed'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'p-1',
    title: 'Avenir ERP & CRM Внедрение',
    client: 'Apex Bank',
    budget: 240000000,
    currency: 'UZS',
    deadline: '2026-12-15',
    status: 'active',
    progress: 68,
    tasks_count: 34,
    completed_tasks: 23
  },
  {
    id: 'p-2',
    title: 'Корпоративный портал B2B',
    client: 'Artel Electronics',
    budget: 185000000,
    currency: 'UZS',
    deadline: '2026-11-30',
    status: 'active',
    progress: 35,
    tasks_count: 42,
    completed_tasks: 15
  },
  {
    id: 'p-3',
    title: 'Ребрендинг и SMM-кампания',
    client: 'EVOS Fast Food',
    budget: 45000000,
    currency: 'UZS',
    deadline: '2026-11-10',
    status: 'active',
    progress: 85,
    tasks_count: 20,
    completed_tasks: 17
  }
];

export const initialEmployees: Employee[] = [
  {
    id: 'e-1',
    full_name: 'Хикматулло Тураев',
    role: 'CEO & Founder',
    department: 'Руководство',
    email: 'khikmatulloturaev@gmail.com',
    phone: '+998 90 000 00 01',
    salary: 40000000,
    currency: 'UZS',
    kpi: 98,
    status: 'active'
  },
  {
    id: 'e-2',
    full_name: 'Фаррух Каримов',
    role: 'Lead Full-stack Developer',
    department: 'IT & Разработка',
    email: 'farrukh@avenir.uz',
    phone: '+998 90 111 22 33',
    salary: 28000000,
    currency: 'UZS',
    kpi: 94,
    status: 'active'
  },
  {
    id: 'e-3',
    full_name: 'Шахноза Юсупова',
    role: 'HR & Operations Manager',
    department: 'HR & Кадры',
    email: 'shakhnoza@avenir.uz',
    phone: '+998 93 444 55 66',
    salary: 16000000,
    currency: 'UZS',
    kpi: 96,
    status: 'active'
  },
  {
    id: 'e-4',
    full_name: 'Алишер Назаров',
    role: 'Head of Sales / CRM',
    department: 'Продажи',
    email: 'alisher@avenir.uz',
    phone: '+998 97 777 88 99',
    salary: 22000000,
    currency: 'UZS',
    kpi: 92,
    status: 'active'
  }
];

export const companyHealth: CompanyHealth = {
  score: 96.5,
  sales: 94,
  delivery: 98,
  finance: 95,
  team: 99,
  revenue_mtd: 155000000,
  profit_mtd: 54300000,
  active_leads: 12,
  active_projects: 3,
  overdue_tasks: 0
};

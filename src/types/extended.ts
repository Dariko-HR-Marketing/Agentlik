export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

export interface Task {
  id: string;
  title: string;
  project: string;
  assignee: string;
  deadline: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export interface ContentPost {
  id: string;
  title: string;
  channel: 'Instagram' | 'Telegram' | 'YouTube' | 'TikTok';
  publish_date: string;
  status: 'idea' | 'in_progress' | 'approved' | 'published';
  author: string;
}

export interface BrainstormIdea {
  id: string;
  title: string;
  category: string;
  votes: number;
  author: string;
  status: 'new' | 'discussed' | 'approved';
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: string;
  views: number;
  updated_at: string;
}

export interface TimeEntry {
  id: string;
  task: string;
  project: string;
  employee: string;
  duration_minutes: number;
  date: string;
}

export interface Goal {
  year: number;
  revenue_target: number;
  profit_target: number;
  currency: 'UZS' | 'USD';
}

import React, { useState } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Calendar, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  MoreVertical, 
  Search, 
  Filter,
  BarChart2,
  Trash2,
  ArrowRight,
  UserPlus
} from 'lucide-react';
import { Project } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id' | 'progress' | 'tasks_count' | 'completed_tasks'>) => void;
  onDeleteProject: (id: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ 
  projects, 
  onAddProject, 
  onDeleteProject 
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'on_hold'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesFilter = filter === 'all' || p.status === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.client.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !client) return;

    onAddProject({
      title,
      client,
      budget: Number(budget) || 0,
      currency: 'UZS',
      deadline: deadline || '2026-12-31',
      status: 'active'
    });

    setTitle('');
    setClient('');
    setBudget('');
    setDeadline('');
    setShowAddModal(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Проекты</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Всего {projects.length} проектов • {projects.filter(p => p.status === 'active').length} в активной разработке
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-98"
        >
          <Plus className="w-4 h-4" />
          <span>Новый проект</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md transition ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
          >
            Все ({projects.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-md transition ${filter === 'active' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
          >
            Активные ({projects.filter(p => p.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-md transition ${filter === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
          >
            Завершенные
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск по названию или клиенту..."
            className="w-full sm:w-64 h-8 pl-8 pr-3 rounded-lg border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                  {p.client}
                </span>
                <div className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${p.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  <span className="text-[11px] font-semibold text-slate-500">
                    {p.status === 'active' ? 'В работе' : 'Завершен'}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition">
                {p.title}
              </h3>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Прогресс задач</span>
                  <span className="font-bold text-slate-900">{p.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Бюджет</p>
                <p className="font-bold text-slate-900">{(p.budget / 1000000).toFixed(1)}M UZS</p>
              </div>

              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Дедлайн</p>
                <p className="font-bold text-slate-700">{p.deadline}</p>
              </div>

              <button
                onClick={() => setSelectedProject(p)}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 transition"
                title="Подробнее о проекте"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Создать новый проект</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Название проекта
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Внедрение ERP & Автоматизация"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Клиент / Заказчик
                </label>
                <input
                  type="text"
                  required
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Artel Electronics"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Бюджет (UZS)
                  </label>
                  <input
                    type="number"
                    required
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="150000000"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Дедлайн
                  </label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition"
                >
                  Создать проект
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                  {selectedProject.client}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedProject.title}</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 rounded-xl text-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Бюджет</p>
                <p className="text-xs font-bold text-slate-900">{(selectedProject.budget).toLocaleString()} UZS</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Задачи</p>
                <p className="text-xs font-bold text-slate-900">{selectedProject.completed_tasks}/{selectedProject.tasks_count}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Дедлайн</p>
                <p className="text-xs font-bold text-slate-900">{selectedProject.deadline}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  onDeleteProject(selectedProject.id);
                  setSelectedProject(null);
                }}
                className="flex items-center gap-1.5 text-xs text-rose-600 font-bold hover:text-rose-700"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Удалить проект</span>
              </button>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

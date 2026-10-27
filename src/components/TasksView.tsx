import React, { useState } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Calendar, 
  Clock, 
  User, 
  Folder, 
  Tag, 
  Search, 
  Filter, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { Task } from '../types/extended';

interface TasksViewProps {
  tasks: Task[];
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ 
  tasks, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask 
}) => {
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('');
  const [assignee, setAssignee] = useState('Хикматулло');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const filteredTasks = tasks.filter(t => {
    const matchesFilter = filter === 'all' || 
                          (filter === 'done' ? t.status === 'done' : t.status !== 'done');
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || 
                          t.project.toLowerCase().includes(search.toLowerCase()) ||
                          t.assignee.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddTask({
      title,
      project: project || 'Внутренний проект',
      assignee: assignee || 'Хикматулло',
      deadline: deadline || '2026-11-05',
      status: 'todo',
      priority
    });

    setTitle('');
    setProject('');
    setDeadline('');
    setShowAddModal(false);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Задачи и дедлайны</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Всего {tasks.length} задач • {tasks.filter(t => t.status === 'done').length} завершено
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          <span>Добавить задачу</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-md transition ${filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
          >
            Все ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('todo')}
            className={`px-3 py-1 rounded-md transition ${filter === 'todo' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
          >
            В работе ({tasks.filter(t => t.status !== 'done').length})
          </button>
          <button
            onClick={() => setFilter('done')}
            className={`px-3 py-1 rounded-md transition ${filter === 'done' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'}`}
          >
            Завершенные ({tasks.filter(t => t.status === 'done').length})
          </button>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск задачи, проекта или исполнителя..."
            className="w-full sm:w-64 h-8 pl-8 pr-3 rounded-lg border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            Задач не найдено
          </div>
        ) : (
          filteredTasks.map((t) => (
            <div
              key={t.id}
              className="p-4 flex items-center justify-between hover:bg-slate-50 transition group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <button
                  onClick={() => onToggleTask(t.id)}
                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition shrink-0 ${
                    t.status === 'done'
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 hover:border-blue-500'
                  }`}
                >
                  {t.status === 'done' && <CheckSquare className="w-3.5 h-3.5" />}
                </button>

                <div className="min-w-0">
                  <p
                    className={`text-xs font-bold truncate ${
                      t.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {t.title}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium mt-0.5">
                    <span className="text-blue-600 font-semibold">{t.project}</span>
                    <span>•</span>
                    <span>{t.assignee}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      до {t.deadline}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                    t.priority === 'high'
                      ? 'bg-rose-50 text-rose-600 border border-rose-100'
                      : t.priority === 'medium'
                      ? 'bg-amber-50 text-amber-600 border border-amber-100'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t.priority}
                </span>

                <button
                  onClick={() => onDeleteTask(t.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition"
                  title="Удалить задачу"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Добавить новую задачу</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Название задачи
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Составить коммерческое предложение..."
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Проект
                </label>
                <input
                  type="text"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Avenir ERP / Dariko"
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Исполнитель
                  </label>
                  <input
                    type="text"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    placeholder="Имя сотрудника"
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                    Приоритет
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs text-slate-900 outline-none focus:border-blue-500"
                  >
                    <option value="low">Низкий (Low)</option>
                    <option value="medium">Средний (Medium)</option>
                    <option value="high">Высокий (High)</option>
                  </select>
                </div>
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
                  Создать задачу
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

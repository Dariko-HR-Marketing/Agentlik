import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { DashboardOverview } from './components/DashboardOverview';
import { CRMView } from './components/CRMView';
import { FinanceView } from './components/FinanceView';
import { ProjectsView } from './components/ProjectsView';
import { TasksView } from './components/TasksView';
import { PeopleView } from './components/PeopleView';
import { AIView } from './components/AIView';
import { 
  initialStages, 
  initialLeads, 
  initialOperations, 
  initialProjects, 
  initialEmployees 
} from './data/mockData';
import { Lead, FinanceOperation } from './types';
import { Note, Task, ContentPost, BrainstormIdea, KnowledgeDoc } from './types/extended';
import { 
  Plus, 
  CheckCircle2, 
  Trash2, 
  Share2, 
  Calendar as CalendarIcon, 
  Clock, 
  Tag, 
  FolderPlus,
  Play,
  Square,
  ThumbsUp
} from 'lucide-react';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);

  // Goals Modal state
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [hasGoals, setHasGoals] = useState(false);
  const [goalRevenue, setGoalRevenue] = useState(100000);
  const [goalProfit, setGoalProfit] = useState(40000);

  // CRM State
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [stages] = useState(initialStages);

  // Finance State
  const [operations, setOperations] = useState<FinanceOperation[]>(initialOperations);

  // Projects State
  const [projects] = useState(initialProjects);

  // Employees State
  const [employees] = useState(initialEmployees);

  // Notes State
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Стратегия Q4 2026', content: 'Фокус на enterprise клиентах, внедрение AI автоматизации.', date: '2026-10-24' },
    { id: '2', title: 'Встреча с инвесторами', content: 'Подготовить отчет P&L за последние 12 месяцев.', date: '2026-10-26' }
  ]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // My Tasks & Tasks State
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Финализировать КП для Apex Bank', project: 'Apex Bank CRM', assignee: 'Хикматулло', deadline: '2026-10-28', status: 'in_progress', priority: 'high' },
    { id: '2', title: 'Согласовать дизайн систему Dariko', project: 'Dariko ERP', assignee: 'Фаррух', deadline: '2026-10-30', status: 'todo', priority: 'medium' },
    { id: '3', title: 'Провести 1-on-1 с тимлидами', project: 'HR Внутренний', assignee: 'Хикматулло', deadline: '2026-11-02', status: 'todo', priority: 'low' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Content Plan State
  const [contentPosts, setContentPosts] = useState<ContentPost[]>([
    { id: '1', title: 'Кейс: Как мы внедрили ERP в логистическую компанию', channel: 'Telegram', publish_date: '2026-10-29', status: 'approved', author: 'Хикматулло' },
    { id: '2', title: 'Видео-обзор функций Avenir OS', channel: 'Instagram', publish_date: '2026-11-01', status: 'in_progress', author: 'Маркетинг' }
  ]);

  // Brainstorm State
  const [ideas, setIdeas] = useState<BrainstormIdea[]>([
    { id: '1', title: 'Интеграция с локальными платежными системами (Payme/Click)', category: 'Продукт', votes: 14, author: 'Фаррух', status: 'approved' },
    { id: '2', title: 'Телеграм бот для быстрых задач сотрудникам', category: 'HR', votes: 9, author: 'Шахноза', status: 'discussed' }
  ]);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');

  // Knowledge Base State
  const [docs] = useState<KnowledgeDoc[]>([
    { id: '1', title: 'Регламент онбординга новых сотрудников', category: 'HR', views: 124, updated_at: '2026-10-15' },
    { id: '2', title: 'Стандарты написания кода и Git Workflow', category: 'IT', views: 340, updated_at: '2026-10-20' },
    { id: '3', title: 'Скрипты продаж для B2B клиентов', category: 'Sales', views: 215, updated_at: '2026-10-22' }
  ]);

  // Timer / Time Tracking State
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  React.useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else if (!isTimerRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, seconds]);

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!isAuthenticated) {
    return <LoginScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 text-slate-800 font-sans">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={() => setIsAuthenticated(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        <Header onLogout={() => setIsAuthenticated(false)} />
        
        <main className="flex-1 overflow-hidden bg-slate-50/60">
          {/* ОБЗОР (DASHBOARD) */}
          {currentTab === 'dashboard' && (
            <DashboardOverview 
              onNavigate={setCurrentTab} 
              onOpenGoalsModal={() => setShowGoalsModal(true)}
              hasGoals={hasGoals}
              goalRevenue={goalRevenue}
              goalProfit={goalProfit}
            />
          )}

          {/* МОИ ЗАДАЧИ */}
          {currentTab === 'my-tasks' && (
            <div className="p-8 max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Мои задачи</h2>
                  <p className="text-xs text-slate-500">Задачи, назначенные на меня</p>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Новая задача..."
                    className="h-9 px-3 rounded-xl border border-slate-200 text-xs outline-none focus:border-blue-500 w-64 bg-white"
                  />
                  <button
                    onClick={() => {
                      if (newTaskTitle) {
                        setTasks([...tasks, { id: Date.now().toString(), title: newTaskTitle, project: 'Внутренний', assignee: 'Хикматулло', deadline: '2026-10-31', status: 'todo', priority: 'medium' }]);
                        setNewTaskTitle('');
                      }
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition shadow-sm"
                  >
                    Добавить
                  </button>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl divide-y divide-slate-100 shadow-xs">
                {tasks.map(t => (
                  <div key={t.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setTasks(tasks.map(x => x.id === t.id ? { ...x, status: x.status === 'done' ? 'todo' : 'done' } : x))}
                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${t.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}
                      >
                        {t.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <p className={`text-xs font-bold ${t.status === 'done' ? 'line-through text-slate-400' : 'text-slate-900'}`}>{t.title}</p>
                        <span className="text-[10px] text-slate-400 font-medium">{t.project} • до {t.deadline}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      {t.priority.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ЗАМЕТКИ */}
          {currentTab === 'notes' && (
            <div className="p-8 max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Быстрые заметки</h2>
                  <p className="text-xs text-slate-500">Персональные идеи, мысли и черновики</p>
                </div>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-xs">
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Заголовок заметки..."
                  className="w-full text-sm font-bold text-slate-900 outline-none placeholder:text-slate-400"
                />
                <textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Напишите текст заметки..."
                  className="w-full text-xs text-slate-600 outline-none resize-none h-20 placeholder:text-slate-400"
                />
                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      if (newNoteTitle) {
                        setNotes([{ id: Date.now().toString(), title: newNoteTitle, content: newNoteContent, date: new Date().toISOString().split('T')[0] }, ...notes]);
                        setNewNoteTitle('');
                        setNewNoteContent('');
                      }
                    }}
                    className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
                  >
                    Сохранить заметку
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notes.map(n => (
                  <div key={n.id} className="p-5 bg-white border border-slate-200 rounded-2xl space-y-2 shadow-xs">
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                      <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))} className="text-slate-400 hover:text-rose-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-600 whitespace-pre-wrap">{n.content}</p>
                    <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-100">{n.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* БРЕЙНШТОРМ */}
          {currentTab === 'brainstorm' && (
            <div className="p-8 max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Брейншторм</h2>
                  <p className="text-xs text-slate-500">Банк идей команды и голосование за инициативы</p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                  placeholder="Предложите новую идею..."
                  className="flex-1 h-10 px-4 rounded-xl border border-slate-200 text-xs outline-none bg-white"
                />
                <button
                  onClick={() => {
                    if (newIdeaTitle) {
                      setIdeas([{ id: Date.now().toString(), title: newIdeaTitle, category: 'Инициатива', votes: 1, author: 'Khikmatillo', status: 'new' }, ...ideas]);
                      setNewIdeaTitle('');
                    }
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition"
                >
                  Предложить
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ideas.map(i => (
                  <div key={i.id} className="p-5 bg-white border border-slate-200 rounded-2xl flex items-start justify-between shadow-xs">
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">{i.category}</span>
                      <h3 className="text-sm font-bold text-slate-900 mt-2">{i.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">Автор: {i.author}</p>
                    </div>
                    <button
                      onClick={() => setIdeas(ideas.map(x => x.id === i.id ? { ...x, votes: x.votes + 1 } : x))}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-blue-600" />
                      <span>{i.votes}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* БАЗА ЗНАНИЙ */}
          {currentTab === 'knowledge' && (
            <div className="p-8 max-w-5xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">База знаний (Wiki)</h2>
                <p className="text-xs text-slate-500">Внутренние регламенты, инструкции и стандарты агентства</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {docs.map(d => (
                  <div key={d.id} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 transition cursor-pointer shadow-xs">
                    <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">{d.category}</span>
                    <h3 className="text-sm font-bold text-slate-900 mt-3">{d.title}</h3>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-4 pt-3 border-t border-slate-100">
                      <span>{d.views} просмотров</span>
                      <span>{d.updated_at}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* КОНТЕНТ ПЛАН */}
          {currentTab === 'content-plan' && (
            <div className="p-8 max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Контент план</h2>
                  <p className="text-xs text-slate-500">Публикации для социальных сетей агентства</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition">
                  + Добавить публикацию
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">Тема</th>
                      <th className="py-3 px-4">Канал</th>
                      <th className="py-3 px-4">Дата выхода</th>
                      <th className="py-3 px-4">Статус</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {contentPosts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{p.title}</td>
                        <td className="py-3.5 px-4 font-semibold text-blue-600">{p.channel}</td>
                        <td className="py-3.5 px-4 text-slate-500">{p.publish_date}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ТРУДОЗАТРАТЫ (TIME TRACKING) */}
          {currentTab === 'time-tracking' && (
            <div className="p-8 max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Учет трудозатрат</h2>
                <p className="text-xs text-slate-500">Таймер рабочего времени и учет часов по проектам</p>
              </div>

              {/* Live Timer Widget */}
              <div className="p-8 bg-white border border-slate-200 rounded-2xl flex flex-col items-center justify-center space-y-4 shadow-xs">
                <div className="text-5xl font-mono font-black text-slate-900 tracking-tight">
                  {formatTimer(seconds)}
                </div>
                <div className="flex items-center gap-3">
                  {!isTimerRunning ? (
                    <button
                      onClick={() => setIsTimerRunning(true)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-sm"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Запустить таймер</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsTimerRunning(false)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition shadow-sm"
                    >
                      <Square className="w-4 h-4 fill-white" />
                      <span>Остановить</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ПРОЕКТЫ */}
          {currentTab === 'projects' && (
            <ProjectsView 
              projects={projects} 
              onAddProject={(p) => setProjects([{ ...p, id: `p-${Date.now()}`, progress: 0, tasks_count: 0, completed_tasks: 0 }, ...projects])}
              onDeleteProject={(id) => setProjects(projects.filter(p => p.id !== id))}
            />
          )}

          {/* ЗАДАЧИ */}
          {currentTab === 'tasks' && (
            <TasksView 
              tasks={tasks}
              onAddTask={(t) => setTasks([{ ...t, id: Date.now().toString() }, ...tasks])}
              onToggleTask={(id) => setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t))}
              onDeleteTask={(id) => setTasks(tasks.filter(t => t.id !== id))}
            />
          )}

          {/* CRM */}
          {currentTab === 'crm' && (
            <CRMView 
              leads={leads} 
              stages={stages} 
              onAddLead={(l) => setLeads([{ ...l, id: Date.now().toString(), created_at: new Date().toISOString().split('T')[0] }, ...leads])} 
              onMoveLead={(lid, sid) => setLeads(leads.map(l => l.id === lid ? { ...l, stage_id: sid } : l))} 
            />
          )}

          {/* ФИНАНСЫ */}
          {currentTab === 'finance' && (
            <FinanceView 
              operations={operations} 
              onAddOperation={(op) => setOperations([{ ...op, id: Date.now().toString(), date: new Date().toISOString().split('T')[0], status: 'completed' }, ...operations])} 
            />
          )}

          {/* КОМАНДА */}
          {currentTab === 'team' && <PeopleView employees={employees} />}

          {/* AI АССИСТЕНТ */}
          {currentTab === 'ai' && <AIView />}

          {/* КАЛЕНДАРЬ */}
          {currentTab === 'calendar' && (
            <div className="p-8 max-w-5xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Календарь встреч и событий</h2>
              <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl text-slate-400 text-xs">
                События на сегодня отсутствуют. Все запланированные созвоны синхронизированы.
              </div>
            </div>
          )}

          {/* НАСТРОЙКИ */}
          {currentTab === 'settings' && (
            <div className="p-8 max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">Настройки</h2>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Название агентства</label>
                  <input type="text" defaultValue="Dariko" className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Основная валюта</label>
                  <select className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs">
                    <option>USD ($)</option>
                    <option>UZS (сум)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Set Goals Modal */}
      {showGoalsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Задать цели на 2026 год</h3>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Целевая выручка ($)</label>
              <input
                type="number"
                value={goalRevenue}
                onChange={(e) => setGoalRevenue(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Целевая чистая прибыль ($)</label>
              <input
                type="number"
                value={goalProfit}
                onChange={(e) => setGoalProfit(Number(e.target.value))}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 text-xs outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowGoalsModal(false)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  setHasGoals(true);
                  setShowGoalsModal(false);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-xs"
              >
                Сохранить цели
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

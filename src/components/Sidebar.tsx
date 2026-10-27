import React from 'react';
import { 
  LayoutGrid, 
  CheckSquare, 
  FileEdit, 
  Lightbulb, 
  BookOpen, 
  FolderGit2, 
  ListTodo, 
  Share2, 
  Clock, 
  Calendar, 
  Users2, 
  Wallet, 
  UserCheck, 
  Bot, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  setCurrentTab, 
  collapsed, 
  setCollapsed, 
  onLogout 
}) => {
  const sections = [
    {
      group: 'РАБОТА',
      items: [
        { id: 'dashboard', label: 'Обзор', icon: LayoutGrid },
        { id: 'my-tasks', label: 'Мои задачи', icon: CheckSquare },
        { id: 'notes', label: 'Заметки', icon: FileEdit },
        { id: 'brainstorm', label: 'Брейншторм', icon: Lightbulb },
        { id: 'knowledge', label: 'База знаний', icon: BookOpen },
        { id: 'projects', label: 'Проекты', icon: FolderGit2 },
        { id: 'tasks', label: 'Задачи', icon: ListTodo },
        { id: 'content-plan', label: 'Контент план', icon: Share2 },
        { id: 'time-tracking', label: 'Трудозатраты', icon: Clock },
        { id: 'calendar', label: 'Календарь', icon: Calendar },
        { id: 'crm', label: 'CRM', icon: Users2 },
      ]
    },
    {
      group: 'АНАЛИТИКА',
      items: [
        { id: 'finance', label: 'Финансы', icon: Wallet },
        { id: 'team', label: 'Команда', icon: UserCheck },
        { id: 'ai', label: 'AI ассистент', icon: Bot },
      ]
    },
    {
      group: 'СЕРВИСЫ',
      items: [
        { id: 'settings', label: 'Настройки', icon: Settings },
      ]
    }
  ];

  return (
    <aside 
      className={`${
        collapsed ? 'w-16' : 'w-60'
      } bg-white border-r border-slate-200 flex flex-col shrink-0 select-none transition-all duration-300 z-30`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-100 gap-3">
        <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-black text-lg shrink-0 shadow-sm">
          D
        </div>
        {!collapsed && (
          <div className="flex flex-col truncate">
            <span className="font-bold text-slate-900 text-xs leading-none">Dariko</span>
            <span className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Операционная система</span>
          </div>
        )}
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {sections.map((sec, idx) => (
          <div key={idx}>
            {!collapsed && (
              <p className="px-3 mb-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {sec.group}
              </p>
            )}
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentTab(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* User info at bottom */}
      <div className="p-2 border-t border-slate-100">
        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-rose-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
            KT
          </div>
          {!collapsed && (
            <div className="flex-1 truncate">
              <p className="text-xs font-bold text-slate-900 truncate">Khikmatillo Turaev</p>
              <p className="text-[10px] text-slate-400 font-medium">CEO</p>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-1 w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 rounded-xl transition"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 mx-auto" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Свернуть</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

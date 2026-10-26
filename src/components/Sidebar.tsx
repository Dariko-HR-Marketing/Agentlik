import React from 'react';
import { 
  LayoutDashboard, 
  Users2, 
  Wallet, 
  FolderKanban, 
  UserCheck, 
  CalendarDays, 
  Bot, 
  Settings, 
  LogOut,
  Building2,
  ChevronRight,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { id: 'analytics', label: 'Аналитика', icon: TrendingUp },
    { id: 'crm', label: 'CRM & Воронка', icon: Users2 },
    { id: 'finance', label: 'Финансы & P&L', icon: Wallet },
    { id: 'projects', label: 'Проекты & Задачи', icon: FolderKanban },
    { id: 'people', label: 'Команда & HR', icon: UserCheck },
    { id: 'calendar', label: 'Календарь', icon: CalendarDays },
    { id: 'ai', label: 'AI Ассистент & Риски', icon: Bot, badge: 'AI' },
    { id: 'settings', label: 'Настройки', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0d1117] border-r border-[#30363d] flex flex-col shrink-0 select-none">
      {/* Brand Logo Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-[#30363d]">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-black text-lg">
          A
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-base leading-tight tracking-tight">Avenir OS</span>
          <span className="text-[11px] text-slate-400 font-medium">Agentlik Enterprise</span>
        </div>
      </div>

      {/* Organization Switcher pill */}
      <div className="px-3 py-3">
        <div className="bg-[#161b22] hover:bg-[#21262d] transition border border-[#30363d] rounded-xl p-2.5 flex items-center justify-between cursor-pointer group">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-white truncate">Dariko Agency</p>
              <p className="text-[10px] text-emerald-400">Ташкент • Pro Plan</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase text-slate-500">
          Основное меню
        </p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161b22]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / User Profile & Logout */}
      <div className="p-3 border-t border-[#30363d] bg-[#161b22]/50">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#161b22] transition">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 text-white font-bold flex items-center justify-center text-xs shadow">
              ХТ
            </div>
            <div className="truncate">
              <p className="text-xs font-medium text-white truncate">Хикматулло Т.</p>
              <span className="text-[10px] text-slate-400">CEO / Владелец</span>
            </div>
          </div>
          <button 
            onClick={onLogout}
            title="Выйти из системы"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

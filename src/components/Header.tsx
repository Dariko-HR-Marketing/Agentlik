import React from 'react';
import { 
  GitBranch, 
  Search, 
  Bell, 
  SlidersHorizontal, 
  HelpCircle, 
  PanelLeftClose, 
  LogOut 
} from 'lucide-react';

interface HeaderProps {
  onLogout: () => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onLogout, onOpenSearch }) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 text-slate-400">
        {/* Breadcrumb or view indicator */}
      </div>

      <div className="flex items-center gap-2">
        <button 
          title="Связи и зависимости"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
        >
          <GitBranch className="w-4 h-4" />
        </button>

        <button 
          title="Поиск"
          onClick={onOpenSearch}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
        >
          <Search className="w-4 h-4" />
        </button>

        <button 
          title="Уведомления"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition relative"
        >
          <Bell className="w-4 h-4" />
        </button>

        <button 
          title="Панель и виджеты"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-200 mx-1" />

        <button 
          onClick={onLogout}
          title="Выйти"
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

import React from 'react';
import { Search, Bell, Moon, Sun, Plus, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  title: string;
  onOpenNewModal?: () => void;
  newModalLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({ title, onOpenNewModal, newModalLabel }) => {
  return (
    <header className="h-16 border-b border-[#30363d] bg-[#0d1117] px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-bold text-white tracking-tight">{title}</h1>
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Система активна (Online)</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search Bar */}
        <div className="relative hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Быстрый поиск (Ctrl + K)..."
            className="w-64 h-9 pl-9 pr-3 rounded-xl bg-[#161b22] border border-[#30363d] text-xs text-white placeholder-slate-500 outline-none focus:border-blue-500 transition"
          />
        </div>

        {/* Action Button */}
        {onOpenNewModal && newModalLabel && (
          <button
            onClick={onOpenNewModal}
            className="flex items-center gap-2 h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/25 transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{newModalLabel}</span>
          </button>
        )}

        {/* Notification Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-[#161b22] border border-[#30363d] flex items-center justify-center text-slate-400 hover:text-white transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#0d1117]" />
        </button>
      </div>
    </header>
  );
};

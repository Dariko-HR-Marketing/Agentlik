import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Wallet, 
  CheckCircle2, 
  ArrowUpRight, 
  Activity, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { CompanyHealth } from '../types';

interface DashboardViewProps {
  health: CompanyHealth;
  onNavigate: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ health, onNavigate }) => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Top Banner: Health Score & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Health Score Card */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Индекс здоровья бизнеса</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Отлично
            </span>
          </div>

          <div className="my-4 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold text-white tracking-tight">{health.score}%</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +2.4%
            </span>
          </div>

          {/* 4 Dimension Bars */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-[#30363d]/60">
            <div>
              <p className="text-[10px] text-slate-400">Sales</p>
              <p className="text-xs font-bold text-white">{health.sales}%</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Delivery</p>
              <p className="text-xs font-bold text-white">{health.delivery}%</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Finance</p>
              <p className="text-xs font-bold text-white">{health.finance}%</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400">Team</p>
              <p className="text-xs font-bold text-white">{health.team}%</p>
            </div>
          </div>
        </div>

        {/* MTD Revenue */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Выручка (MTD)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white">{(health.revenue_mtd).toLocaleString('uz-UZ')} UZS</p>
            <p className="text-xs text-slate-400 mt-0.5">Чистая прибыль: <span className="text-emerald-400 font-semibold">{health.profit_mtd.toLocaleString()} UZS</span></p>
          </div>
          <button 
            onClick={() => onNavigate('finance')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
          >
            Детализация P&L →
          </button>
        </div>

        {/* Active Deals / Leads */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Активная воронка CRM</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white">{health.active_leads} лидов</p>
            <p className="text-xs text-slate-400 mt-0.5">Взвешенная сумма: <span className="text-white font-semibold">662 000 000 UZS</span></p>
          </div>
          <button 
            onClick={() => onNavigate('crm')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
          >
            Открыть воронку →
          </button>
        </div>

        {/* Projects / Deadlines */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex flex-col justify-between shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Проекты в работе</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3">
            <p className="text-2xl font-bold text-white">{health.active_projects} активных</p>
            <p className="text-xs text-slate-400 mt-0.5">Просроченные задачи: <span className="text-emerald-400 font-semibold">{health.overdue_tasks} (Все по плану)</span></p>
          </div>
          <button 
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
          >
            Доска проектов →
          </button>
        </div>
      </div>

      {/* 12-Month Revenue & Cashflow Trend */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Динамика выручки и расходов (2026)</h2>
            <p className="text-xs text-slate-400">Фактические финансовые потоки компании по месяцам</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-slate-300">Выручка</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-slate-600" />
              <span className="text-slate-300">Расходы</span>
            </div>
          </div>
        </div>

        {/* Bar chart representation */}
        <div className="h-56 flex items-end gap-3 pt-6 border-b border-[#30363d]/60 pb-2">
          {[
            { m: 'Май', rev: 90, exp: 50 },
            { m: 'Июн', rev: 110, exp: 60 },
            { m: 'Июл', rev: 130, exp: 70 },
            { m: 'Авг', rev: 140, exp: 75 },
            { m: 'Сен', rev: 150, exp: 80 },
            { m: 'Окт', rev: 155, exp: 78 },
          ].map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="w-full flex items-end justify-center gap-1.5 h-full">
                <div 
                  style={{ height: `${(item.rev / 180) * 100}%` }}
                  className="w-1/2 bg-blue-500 rounded-t-lg group-hover:bg-blue-400 transition"
                  title={`Выручка: ${item.rev} млн`}
                />
                <div 
                  style={{ height: `${(item.exp / 180) * 100}%` }}
                  className="w-1/2 bg-slate-600 rounded-t-lg group-hover:bg-slate-500 transition"
                  title={`Расходы: ${item.exp} млн`}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-medium">{item.m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Risk Alert Banner */}
      <div className="rounded-2xl border border-purple-500/20 bg-purple-950/20 p-5 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
          <Activity className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            AI Ассистент: Анализ операционных рисков
            <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/20 text-purple-300">
              Риски не обнаружены
            </span>
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Все текущие дедлайны соблюдаются, финансовый разрыв в ближайшие 60 дней отсутствует. Конверсия из первого контакта в сделку выросла на 4.2%.
          </p>
        </div>
        <button 
          onClick={() => onNavigate('ai')}
          className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 text-xs font-semibold border border-purple-500/30 transition shrink-0"
        >
          Подробнее
        </button>
      </div>
    </div>
  );
};

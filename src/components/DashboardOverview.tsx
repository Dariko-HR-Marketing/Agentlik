import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  HelpCircle, 
  Target, 
  TrendingUp, 
  ArrowRight,
  Plus
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
  onOpenGoalsModal: () => void;
  hasGoals: boolean;
  goalRevenue?: number;
  goalProfit?: number;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ 
  onNavigate, 
  onOpenGoalsModal,
  hasGoals,
  goalRevenue = 0,
  goalProfit = 0
}) => {
  const [periodTab, setPeriodTab] = useState<'month' | 'quarter' | 'year'>('month');
  const [trendTab, setTrendTab] = useState<'revenue' | 'profit'>('revenue');

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
      {/* Title & Date switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Обзор</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Как дела у компании: деньги, продажи и проекты • 1 окт — 27 окт
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Period selector */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
            <button
              onClick={() => setPeriodTab('month')}
              className={`px-3 py-1 rounded-md transition ${periodTab === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              Месяц
            </button>
            <button
              onClick={() => setPeriodTab('quarter')}
              className={`px-3 py-1 rounded-md transition ${periodTab === 'quarter' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              Квартал
            </button>
            <button
              onClick={() => setPeriodTab('year')}
              className={`px-3 py-1 rounded-md transition ${periodTab === 'year' ? 'bg-white text-slate-900 shadow-sm' : 'hover:text-slate-900'}`}
            >
              Год
            </button>
          </div>

          {/* Month selector */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-lg">
            <button className="text-slate-400 hover:text-slate-700"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <span>Октябрь 2026</span>
            <button className="text-slate-400 hover:text-slate-700"><ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
        </div>
      </div>

      {/* 3 Top Executive Cards (Exact 1:1 match) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Зарабатываем? */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <span>Зарабатываем?</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
            <p className="text-2xl font-bold text-slate-900">—</p>
            <p className="text-xs text-slate-400 mt-1">денег за период не было</p>
          </div>

          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-600 font-medium">прибыль <strong className="text-slate-900">$0</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-slate-600 font-medium">расходы <strong className="text-slate-900">$0</strong></span>
            </div>
          </div>
        </div>

        {/* Card 2: Продажи идут? */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <span>Продажи идут?</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
            <p className="text-2xl font-bold text-slate-900">0</p>
            <p className="text-xs text-slate-400 mt-1">воронка пустая — новых лидов нет</p>
          </div>

          <div className="flex items-center gap-4 pt-4 mt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-slate-600 font-medium">в работе <strong className="text-slate-900">0</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-slate-600 font-medium">выиграно <strong className="text-slate-900">0</strong></span>
            </div>
          </div>
        </div>

        {/* Card 3: Проекты в порядке? */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <span>Проекты в порядке?</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-400 cursor-pointer" />
            </div>
            <p className="text-2xl font-bold text-slate-900">—</p>
            <p className="text-xs text-slate-400 mt-1">активных проектов</p>
          </div>

          <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-slate-600 font-medium">в норме <strong className="text-slate-900">0</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-slate-600 font-medium">внимание <strong className="text-slate-900">0</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-slate-600 font-medium">риск <strong className="text-slate-900">0</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Financial Metric Boxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>Выручка</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">—</p>
          <span className="text-[10px] text-slate-400">сравнивать не с чем</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>Прибыль</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">—</p>
          <span className="text-[10px] text-slate-400">выручки нет</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>Нам должны</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">—</p>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider">Остаток по выставленным счетам</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
            <span>В воронке</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-1">—</p>
          <span className="text-[10px] text-slate-400">0 активных клиентов • 0 проектов</span>
        </div>
      </div>

      {/* Goals Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Target className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {hasGoals 
              ? `Цель на 2026 год: Выручка $${goalRevenue.toLocaleString()}, Прибыль $${goalProfit.toLocaleString()}`
              : 'Цели на 2026 не заданы. Задайте план по выручке и прибыли — здесь появится прогресс к цели.'}
          </span>
        </div>
        <button
          onClick={onOpenGoalsModal}
          className="px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold transition shadow-2xs"
        >
          Задать цели
        </button>
      </div>

      {/* Dynamic Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Динамика 12 мес */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[260px] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Динамика 12 мес</h3>
              <p className="text-xs text-slate-400 mt-0.5">Выручка за год $0 • в среднем $0 в месяц</p>
            </div>
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs font-semibold text-slate-600">
              <button
                onClick={() => setTrendTab('revenue')}
                className={`px-2.5 py-1 rounded-md text-[11px] ${trendTab === 'revenue' ? 'bg-white text-slate-900 shadow-2xs' : ''}`}
              >
                Выручка
              </button>
              <button
                onClick={() => setTrendTab('profit')}
                className={`px-2.5 py-1 rounded-md text-[11px] ${trendTab === 'profit' ? 'bg-white text-slate-900 shadow-2xs' : ''}`}
              >
                Прибыль
              </button>
            </div>
          </div>

          <div className="my-auto py-12 text-center text-xs text-slate-400 font-medium">
            Денег за год не было
          </div>
        </div>

        {/* Структура выручки */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 min-h-[260px] flex flex-col justify-between">
          <h3 className="text-sm font-bold text-slate-900">Структура выручки</h3>
          <div className="my-auto py-12 text-center text-xs text-slate-400 font-medium">
            Поступлений за период нет
          </div>
        </div>
      </div>

      {/* Воронка CRM Bottom Widget */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Воронка CRM</h3>
            <p className="text-xs text-slate-400">Открытых лидов нет</p>
          </div>
          <button 
            onClick={() => onNavigate('crm')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
          >
            <span>В CRM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="py-8 text-center text-xs text-slate-400">
          Воронка пустая
        </div>
      </div>
    </div>
  );
};

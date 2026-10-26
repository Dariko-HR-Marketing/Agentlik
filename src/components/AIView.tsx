import React from 'react';
import { Bot, Sparkles, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AIView: React.FC = () => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span>AI Ассистент & Risk Detection</span>
          </h2>
          <p className="text-xs text-slate-400">Автоматический мониторинг финансовых разрывов, рисков дедлайнов и воронки</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Мониторинг рисков кассового разрыва</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Безопасно
            </span>
          </div>
          <p className="text-xs text-slate-300">
            На основе запланированных расходов и ожидаемых поступлений (по вероятности лидов), подушка безопасности достаточна на <span className="text-white font-bold">4.8 месяцев</span> вперед.
          </p>
          <div className="p-3.5 rounded-xl bg-[#21262d] border border-[#30363d] flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs text-slate-300">Дебиторская задолженность в пределах нормы (&lt; 5% от выручки).</span>
          </div>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Прогноз выполнения дедлайнов</h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
              Высокая точность
            </span>
          </div>
          <p className="text-xs text-slate-300">
            Скорость закрытия задач по проекту <span className="text-white font-semibold">«Apex Bank»</span> составляет 1.8 задач в день. Проект завершится на 4 дня раньше расчетного срока.
          </p>
          <div className="p-3.5 rounded-xl bg-[#21262d] border border-[#30363d] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="text-xs text-slate-300">Узкие места (bottlenecks) в разработке не зафиксированы.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

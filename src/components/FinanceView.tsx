import React, { useState } from 'react';
import { Plus, ArrowDownLeft, ArrowUpRight, TrendingUp, DollarSign } from 'lucide-react';
import { FinanceOperation } from '../types';

interface FinanceViewProps {
  operations: FinanceOperation[];
  onAddOperation: (op: Omit<FinanceOperation, 'id' | 'date' | 'status'>) => void;
}

export const FinanceView: React.FC<FinanceViewProps> = ({ operations, onAddOperation }) => {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const totalIncome = operations
    .filter((o) => o.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = operations
    .filter((o) => o.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) return;

    onAddOperation({
      type,
      category,
      amount: Number(amount) || 0,
      currency: 'UZS',
      description
    });

    setCategory('');
    setAmount('');
    setDescription('');
    setShowModal(false);
  };

  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Finance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Всего доходов</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-emerald-400 mt-2">
            +{totalIncome.toLocaleString()} UZS
          </p>
          <span className="text-[11px] text-slate-400">Поступления за текущий период</span>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Всего расходов</span>
            <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-400 mt-2">
            -{totalExpense.toLocaleString()} UZS
          </p>
          <span className="text-[11px] text-slate-400">Зарплаты, аренда, сервисы</span>
        </div>

        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Чистая прибыль (P&L)</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mt-2">
            {netProfit.toLocaleString()} UZS
          </p>
          <span className="text-[11px] text-emerald-400 font-semibold">Рентабельность: 38.5%</span>
        </div>
      </div>

      {/* Operations Table */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#30363d] flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Журнал финансовых операций</h3>
            <p className="text-xs text-slate-400">Все доходы и расходы в режиме реального времени</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить операцию</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0d1117]/50 text-slate-400 uppercase tracking-wider border-b border-[#30363d]">
              <tr>
                <th className="py-3 px-4">Тип</th>
                <th className="py-3 px-4">Категория / Назначение</th>
                <th className="py-3 px-4">Описание</th>
                <th className="py-3 px-4">Дата</th>
                <th className="py-3 px-4 text-right">Сумма</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363d]/60">
              {operations.map((op) => (
                <tr key={op.id} className="hover:bg-[#21262d]/50 transition">
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        op.type === 'income'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {op.type === 'income' ? 'Доход' : 'Расход'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">{op.category}</td>
                  <td className="py-3.5 px-4 text-slate-400">{op.description}</td>
                  <td className="py-3.5 px-4 text-slate-400">{op.date}</td>
                  <td
                    className={`py-3.5 px-4 text-right font-bold text-sm ${
                      op.type === 'income' ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {op.type === 'income' ? '+' : '-'}
                    {op.amount.toLocaleString()} UZS
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Operation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#161b22] border border-[#30363d] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Добавить финансовую операцию</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setType('income')}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    type === 'income'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#21262d] text-slate-400 hover:text-white'
                  }`}
                >
                  + Доход
                </button>
                <button
                  type="button"
                  onClick={() => setType('expense')}
                  className={`py-2 rounded-xl text-xs font-bold transition ${
                    type === 'expense'
                      ? 'bg-red-600 text-white'
                      : 'bg-[#21262d] text-slate-400 hover:text-white'
                  }`}
                >
                  - Расход
                </button>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Оплата от клиента / Офис"
                  className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Сумма (UZS)
                </label>
                <input
                  type="number"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="10000000"
                  className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Описание / Комментарий
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Дополнительные детали"
                  className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

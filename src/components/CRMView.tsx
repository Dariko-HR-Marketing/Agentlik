import React, { useState } from 'react';
import { Plus, Phone, Mail, Building, MoreVertical, DollarSign } from 'lucide-react';
import { Lead, LeadStage } from '../types';

interface CRMViewProps {
  leads: Lead[];
  stages: LeadStage[];
  onAddLead: (lead: Omit<Lead, 'id' | 'created_at'>) => void;
  onMoveLead: (leadId: string, newStageId: string) => void;
}

export const CRMView: React.FC<CRMViewProps> = ({ leads, stages, onAddLead, onMoveLead }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [stageId, setStageId] = useState(stages[0]?.id || 'new');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    onAddLead({
      title,
      company,
      contact_name: contactName,
      contact_phone: contactPhone,
      contact_email: '',
      amount: Number(amount) || 0,
      currency: 'UZS',
      stage_id: stageId,
      probability: 50
    });

    setTitle('');
    setCompany('');
    setContactName('');
    setContactPhone('');
    setAmount('');
    setShowAddModal(false);
  };

  return (
    <div className="p-6 h-[calc(100vh-4rem)] flex flex-col">
      {/* Top Bar inside CRM */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <h2 className="text-base font-bold text-white">Воронка продаж (Канбан)</h2>
          <p className="text-xs text-slate-400">Управление сделками, клиентами и этапами переговоров</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Новый лид</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => {
          const stageLeads = leads.filter((l) => l.stage_id === stage.id);
          const totalAmount = stageLeads.reduce((acc, curr) => acc + curr.amount, 0);

          return (
            <div
              key={stage.id}
              className="w-80 shrink-0 bg-[#161b22] border border-[#30363d] rounded-2xl flex flex-col"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-[#30363d] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="text-xs font-bold text-white">{stage.title}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-[#21262d] text-[10px] text-slate-300 font-semibold">
                    {stageLeads.length}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-400">
                  {(totalAmount / 1000000).toFixed(0)}M UZS
                </span>
              </div>

              {/* Lead Cards List */}
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-3.5 rounded-xl bg-[#21262d] hover:bg-[#282e37] border border-[#30363d] transition shadow-sm space-y-2 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-white group-hover:text-blue-400 transition leading-snug">
                        {lead.title}
                      </h4>
                      <button className="text-slate-500 hover:text-slate-300">
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Building className="w-3.5 h-3.5" />
                      <span>{lead.company}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#30363d]/60">
                      <span className="text-xs font-bold text-emerald-400">
                        {lead.amount.toLocaleString()} UZS
                      </span>
                      <span className="text-[10px] text-slate-400">{lead.created_at}</span>
                    </div>

                    {/* Quick stage switchers for demo */}
                    <div className="pt-1 flex items-center gap-1">
                      {stages.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => onMoveLead(lead.id, s.id)}
                          title={`Переместить в: ${s.title}`}
                          className={`w-2.5 h-2.5 rounded-full transition ${
                            s.id === lead.stage_id ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: s.color }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-[#161b22] border border-[#30363d] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-4">Создать новую сделку / лид</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Название сделки
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Внедрение CRM системы"
                  className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                  Компания / Клиент
                </label>
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Korzinka / Anglesey Food"
                  className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Сумма (UZS)
                  </label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="50000000"
                    className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Этап воронки
                  </label>
                  <select
                    value={stageId}
                    onChange={(e) => setStageId(e.target.value)}
                    className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                  >
                    {stages.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Контактное лицо
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Рустам Каримов"
                    className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-slate-400 mb-1">
                    Телефон
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+998 90 000 00 00"
                    className="w-full h-10 rounded-xl bg-[#0d1117] border border-[#30363d] px-3 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                >
                  Добавить сделку
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

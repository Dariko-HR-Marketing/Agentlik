import React from 'react';
import { UserCheck, Mail, Phone, Plus, Award } from 'lucide-react';
import { Employee } from '../types';

interface PeopleViewProps {
  employees: Employee[];
}

export const PeopleView: React.FC<PeopleViewProps> = ({ employees }) => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Команда и HR</h2>
          <p className="text-xs text-slate-400">Штат сотрудников, KPI показатели и структура агентства</p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition">
          <Plus className="w-4 h-4" />
          <span>Добавить сотрудника</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 hover:border-slate-500 transition shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow">
                  {emp.full_name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">{emp.full_name}</h3>
                  <span className="text-[11px] text-blue-400 font-medium">{emp.role}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-400 mt-3 pt-3 border-t border-[#30363d]/60">
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{emp.email}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0" />
                  <span>{emp.phone}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 mt-4 border-t border-[#30363d]/60 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{emp.department}</span>
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <Award className="w-3.5 h-3.5" />
                <span>KPI: {emp.kpi}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

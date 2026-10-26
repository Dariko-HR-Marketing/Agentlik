import React from 'react';
import { FolderKanban, CheckSquare, Clock, Plus, Users, Calendar } from 'lucide-react';
import { Project } from '../types';

interface ProjectsViewProps {
  projects: Project[];
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ projects }) => {
  return (
    <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white">Проекты и Задачи</h2>
          <p className="text-xs text-slate-400">Контроль выполнения, дедлайны и загруженность команды</p>
        </div>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition">
          <Plus className="w-4 h-4" />
          <span>Новый проект</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 hover:border-blue-500/50 transition shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                  {proj.client}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {(proj.budget / 1000000).toFixed(0)}M UZS
                </span>
              </div>

              <h3 className="text-sm font-bold text-white leading-tight mb-2">{proj.title}</h3>

              {/* Progress bar */}
              <div className="space-y-1 mt-4">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Прогресс</span>
                  <span className="font-bold text-white">{proj.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#21262d] overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#30363d]/60 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                <span>{proj.completed_tasks}/{proj.tasks_count} задач</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>до {proj.deadline}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

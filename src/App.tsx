import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { DashboardView } from './components/DashboardView';
import { CRMView } from './components/CRMView';
import { FinanceView } from './components/FinanceView';
import { ProjectsView } from './components/ProjectsView';
import { PeopleView } from './components/PeopleView';
import { AIView } from './components/AIView';
import { 
  initialStages, 
  initialLeads, 
  initialOperations, 
  initialProjects, 
  initialEmployees, 
  companyHealth 
} from './data/mockData';
import { Lead, FinanceOperation } from './types';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState('dashboard');
  
  // App state
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [stages] = useState(initialStages);
  const [operations, setOperations] = useState<FinanceOperation[]>(initialOperations);
  const [projects] = useState(initialProjects);
  const [employees] = useState(initialEmployees);

  if (!isAuthenticated) {
    return <LoginScreen onSuccess={() => setIsAuthenticated(true)} />;
  }

  const handleAddLead = (newLeadData: Omit<Lead, 'id' | 'created_at'>) => {
    const newLead: Lead = {
      ...newLeadData,
      id: `l-${Date.now()}`,
      created_at: new Date().toISOString().split('T')[0]
    };
    setLeads([newLead, ...leads]);
  };

  const handleMoveLead = (leadId: string, newStageId: string) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, stage_id: newStageId } : l));
  };

  const handleAddOperation = (opData: Omit<FinanceOperation, 'id' | 'date' | 'status'>) => {
    const newOp: FinanceOperation = {
      ...opData,
      id: `f-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setOperations([newOp, ...operations]);
  };

  const getTitle = () => {
    switch (currentTab) {
      case 'dashboard': return 'Общий дашборд компании';
      case 'analytics': return 'Сквозная аналитика и P&L';
      case 'crm': return 'CRM & Воронка лидов';
      case 'finance': return 'Финансы, Касса & P&L';
      case 'projects': return 'Проекты, Задачи и Дедлайны';
      case 'people': return 'Команда, Сотрудники и KPI';
      case 'calendar': return 'Корпоративный календарь';
      case 'ai': return 'AI Мониторинг & Детектор рисков';
      case 'settings': return 'Настройки организации';
      default: return 'Avenir OS';
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0d1117] text-slate-100">
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onLogout={() => setIsAuthenticated(false)} 
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#0a0e14]">
        <Header title={getTitle()} />
        
        <main className="flex-1 overflow-hidden">
          {currentTab === 'dashboard' && (
            <DashboardView health={companyHealth} onNavigate={setCurrentTab} />
          )}
          {currentTab === 'analytics' && (
            <DashboardView health={companyHealth} onNavigate={setCurrentTab} />
          )}
          {currentTab === 'crm' && (
            <CRMView 
              leads={leads} 
              stages={stages} 
              onAddLead={handleAddLead} 
              onMoveLead={handleMoveLead} 
            />
          )}
          {currentTab === 'finance' && (
            <FinanceView 
              operations={operations} 
              onAddOperation={handleAddOperation} 
            />
          )}
          {currentTab === 'projects' && (
            <ProjectsView projects={projects} />
          )}
          {currentTab === 'people' && (
            <PeopleView employees={employees} />
          )}
          {currentTab === 'ai' && (
            <AIView />
          )}
          {currentTab === 'calendar' && (
            <div className="p-6 text-center text-slate-400">
              <h3 className="text-lg font-bold text-white mb-2">Календарь встреч и дедлайнов</h3>
              <p className="text-xs">Все предстоящие созвоны синхронизированы с Google Calendar.</p>
            </div>
          )}
          {currentTab === 'settings' && (
            <div className="p-6 max-w-2xl space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Настройки агентства</h3>
              <div className="p-4 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
                <p className="text-xs text-slate-300 font-semibold">Название организации: Dariko Agency</p>
                <p className="text-xs text-slate-300 font-semibold">Тарифный план: Enterprise Cloud (Бессрочный)</p>
                <p className="text-xs text-slate-300 font-semibold">Основная валюта учета: UZS (Узбекский сум)</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;

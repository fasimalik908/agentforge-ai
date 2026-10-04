import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { NewAgentModal } from './components/NewAgentModal';
import { ToastProvider, useToast } from './components/Toast';
import { OverviewScreen } from './screens/OverviewScreen';
import { AgentsScreen } from './screens/AgentsScreen';
import { KnowledgeBaseScreen } from './screens/KnowledgeBaseScreen';
import { PlaygroundScreen } from './screens/PlaygroundScreen';
import { WorkflowsScreen } from './screens/WorkflowsScreen';
import { McpServersScreen } from './screens/McpServersScreen';
import { IntegrationsScreen } from './screens/IntegrationsScreen';
import { RunsLogsScreen } from './screens/RunsLogsScreen';
import { ModelsScreen } from './screens/ModelsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { INITIAL_AGENTS } from './data/mockData';
import { NavScreen, Agent } from './types';

function DashboardContent() {
  const { addToast } = useToast();
  const [currentScreen, setCurrentScreen] = useState<NavScreen>('overview');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNewAgentModalOpen, setIsNewAgentModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [playgroundAgentId, setPlaygroundAgentId] = useState<string>('agent_support');
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);

  // Global Keyboard shortcuts: numbers 1-0 for direct screen jumping when not typing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.metaKey || e.ctrlKey || e.altKey) return;

      const keyScreenMap: Record<string, NavScreen> = {
        '1': 'overview',
        '2': 'agents',
        '3': 'knowledge',
        '4': 'playground',
        '5': 'workflows',
        '6': 'mcp',
        '7': 'integrations',
        '8': 'runs',
        '9': 'models',
        '0': 'settings'
      };

      if (keyScreenMap[e.key]) {
        e.preventDefault();
        setCurrentScreen(keyScreenMap[e.key]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSaveNewAgent = (newAgent: Agent) => {
    setAgents([newAgent, ...agents]);
    setCurrentScreen('agents');
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    setAgents(prev => prev.map(a => a.id === updatedAgent.id ? updatedAgent : a));
  };

  const handleDuplicateAgent = (clonedAgent: Agent) => {
    setAgents(prev => [clonedAgent, ...prev]);
  };

  const handleSelectAgentForPlayground = (agentId: string) => {
    setPlaygroundAgentId(agentId);
    setCurrentScreen('playground');
  };

  return (
    <div className="flex h-screen bg-[#F5F6F8] text-[#101828] overflow-hidden select-none font-sans">
      {/* Dark Ink Left Sidebar */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onNewAgentClick={() => setIsNewAgentModalOpen(true)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <Header
          currentScreen={currentScreen}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onNewAgentClick={() => setIsNewAgentModalOpen(true)}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        {/* Dynamic Screen Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 bg-[#F5F6F8]">
          <div className="max-w-[1440px] mx-auto">
            {currentScreen === 'overview' && (
              <OverviewScreen 
                onNavigate={(screen) => setCurrentScreen(screen)} 
              />
            )}
            {currentScreen === 'agents' && (
              <AgentsScreen 
                agents={agents} 
                onNavigate={(screen) => setCurrentScreen(screen)}
                onOpenNewAgentModal={() => setIsNewAgentModalOpen(true)} 
                onSelectAgentForPlayground={handleSelectAgentForPlayground}
                onUpdateAgent={handleUpdateAgent}
                onDuplicateAgent={handleDuplicateAgent}
              />
            )}
            {currentScreen === 'knowledge' && (
              <KnowledgeBaseScreen />
            )}
            {currentScreen === 'playground' && (
              <PlaygroundScreen initialAgentId={playgroundAgentId} />
            )}
            {currentScreen === 'workflows' && (
              <WorkflowsScreen />
            )}
            {currentScreen === 'mcp' && (
              <McpServersScreen />
            )}
            {currentScreen === 'integrations' && (
              <IntegrationsScreen />
            )}
            {currentScreen === 'runs' && (
              <RunsLogsScreen />
            )}
            {currentScreen === 'models' && (
              <ModelsScreen />
            )}
            {currentScreen === 'settings' && (
              <SettingsScreen />
            )}
          </div>
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(screen) => setCurrentScreen(screen)}
        onNewAgent={() => setIsNewAgentModalOpen(true)}
      />

      {/* New Agent Modal */}
      <NewAgentModal
        isOpen={isNewAgentModalOpen}
        onClose={() => setIsNewAgentModalOpen(false)}
        onSaveAgent={handleSaveNewAgent}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <DashboardContent />
    </ToastProvider>
  );
}

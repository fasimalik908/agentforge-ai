import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  Bot, 
  BookOpen, 
  Terminal, 
  GitBranch, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles, 
  Settings,
  Plus
} from 'lucide-react';
import { NavScreen } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: NavScreen) => void;
  onNewAgent: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onNewAgent
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    { id: 'new_agent', label: 'Create new agent', icon: Plus, action: () => { onClose(); onNewAgent(); } },
    { id: 'screen_overview', label: 'Go to Overview', icon: Activity, action: () => { onClose(); onNavigate('overview'); } },
    { id: 'screen_agents', label: 'View all agents', icon: Bot, action: () => { onClose(); onNavigate('agents'); } },
    { id: 'screen_playground', label: 'Open Playground', icon: Terminal, action: () => { onClose(); onNavigate('playground'); } },
    { id: 'screen_knowledge', label: 'Knowledge base', icon: BookOpen, action: () => { onClose(); onNavigate('knowledge'); } },
    { id: 'screen_workflows', label: 'Workflows', icon: GitBranch, action: () => { onClose(); onNavigate('workflows'); } },
    { id: 'screen_mcp', label: 'MCP servers', icon: Cpu, action: () => { onClose(); onNavigate('mcp'); } },
    { id: 'screen_integrations', label: 'Integrations', icon: Layers, action: () => { onClose(); onNavigate('integrations'); } },
    { id: 'screen_runs', label: 'Runs & logs', icon: Activity, action: () => { onClose(); onNavigate('runs'); } },
    { id: 'screen_models', label: 'Models registry', icon: Sparkles, action: () => { onClose(); onNavigate('models'); } },
    { id: 'screen_settings', label: 'Settings', icon: Settings, action: () => { onClose(); onNavigate('settings'); } },
  ];

  const filteredActions = quickActions.filter(a => 
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
      <div 
        className="w-full max-w-lg bg-white border border-[#E4E7EC] rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center px-4 py-3 border-b border-[#E4E7EC]">
          <Search className="w-4 h-4 text-[#98A2B3] mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button 
            onClick={onClose} 
            className="text-[#667085] hover:text-[#101828] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-1.5">
          {filteredActions.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#667085]">
              No results for "{query}".
            </div>
          ) : (
            filteredActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-[6px] text-xs text-[#344054] hover:text-[#101828] hover:bg-[#F5F6F8] transition-colors text-left group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#3B5BFF]" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <span className="text-[10px] text-[#98A2B3]">Jump</span>
                </button>
              );
            })
          )}
        </div>

        <div className="px-4 py-2 bg-[#F9FAFB] border-t border-[#E4E7EC] flex items-center justify-between text-[11px] text-[#667085]">
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  BookOpen, 
  Terminal, 
  GitBranch, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles, 
  Settings,
  ChevronRight,
  ShieldCheck,
  Zap,
  X
} from 'lucide-react';
import { NavScreen } from '../types';

interface SidebarProps {
  currentScreen: NavScreen;
  onNavigate: (screen: NavScreen) => void;
  onNewAgentClick: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const NAV_ITEMS: { id: NavScreen; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'agents', label: 'Agents', icon: Bot, badge: '12' },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'playground', label: 'Playground', icon: Terminal },
  { id: 'workflows', label: 'Workflows', icon: GitBranch },
  { id: 'mcp', label: 'MCP Servers', icon: Cpu, badge: '5' },
  { id: 'integrations', label: 'Integrations', icon: Layers },
  { id: 'runs', label: 'Runs & Logs', icon: Activity },
  { id: 'models', label: 'Models', icon: Sparkles, badge: '7' },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentScreen, 
  onNavigate,
  isMobileOpen,
  onMobileClose
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-60 bg-[#0F1424] border-r border-[#1E2640] flex flex-col shrink-0 h-screen select-none transition-transform duration-200 ease-in-out ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Brand Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-[#1E2640]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[8px] bg-[#3B5BFF] flex items-center justify-center shadow-sm">
              <Zap className="w-3.5 h-3.5 text-white fill-white" />
            </div>
            <div>
              <div className="font-semibold text-xs tracking-tight text-white flex items-center gap-1.5">
                AgentForge AI
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <div className="hidden lg:flex items-center" title="SOC2 Type II Verified">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400 hover:text-white transition-colors" />
            </div>
            {/* Close button on mobile */}
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Workspace Indicator */}
        <div className="px-3 py-2 mx-3 mt-3 mb-1 bg-[#171E33] rounded-[8px] border border-[#232C4A] flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-1.5 h-1.5 rounded-full bg-[#12B76A] shrink-0" />
            <span className="text-xs font-medium text-slate-200 truncate">Apex Logistics HQ</span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">Production</span>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          <div className="px-2 pb-1.5 pt-1 text-[11px] font-medium text-slate-400">
            Platform
          </div>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onMobileClose?.();
                }}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-[8px] text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#1C233B] text-white shadow-xs'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#151C30]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#3B5BFF]' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded tabular-nums ${
                      isActive
                        ? 'bg-[#3B5BFF]/20 text-[#738AFF]'
                        : 'bg-[#1B2238] text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Pro Plan Usage Card */}
        <div className="p-3 m-3 bg-[#171E33] rounded-[10px] border border-[#232C4A]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-white">Pro plan</span>
            <span className="text-[11px] text-[#738AFF] font-medium tabular-nums">68%</span>
          </div>

          <div className="w-full bg-[#0F1424] h-1.5 rounded-full overflow-hidden mb-2">
            <div
              className="bg-[#3B5BFF] h-full rounded-full"
              style={{ width: '68%' }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span>Tokens</span>
            <span className="text-slate-300 tabular-nums">682k / 1.0M</span>
          </div>

          <button 
            onClick={() => {
              onNavigate('settings');
              onMobileClose?.();
            }} 
            className="w-full py-1 px-2 bg-[#202945] hover:bg-[#283355] text-slate-200 hover:text-white rounded-[8px] text-[11px] font-medium transition-colors text-center"
          >
            Manage plan
          </button>
        </div>
      </aside>
    </>
  );
};

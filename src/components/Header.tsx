import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Plus, 
  Check, 
  ExternalLink,
  User,
  LogOut,
  Sliders,
  ShieldAlert,
  Menu
} from 'lucide-react';
import { NavScreen } from '../types';
import { useToast } from './Toast';

interface HeaderProps {
  currentScreen: NavScreen;
  onOpenCommandPalette: () => void;
  onNewAgentClick: () => void;
  onNavigate: (screen: NavScreen) => void;
  onMobileMenuToggle?: () => void;
}

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Product Manual v3.pdf indexed',
    desc: '3,420 chunks added to Qdrant vector store with 98% precision.',
    time: '18m ago',
    unread: true
  },
  {
    id: 2,
    title: 'Discrepancy in INV-9042',
    desc: 'Invoice Triage flagged $420 tax mismatch on SAP PO.',
    time: '45m ago',
    unread: true
  },
  {
    id: 3,
    title: 'Security isolation test passed',
    desc: 'vLLM on-premise container passed zero-egress audit suite.',
    time: 'Yesterday',
    unread: false
  }
];

export const Header: React.FC<HeaderProps> = ({ 
  currentScreen, 
  onOpenCommandPalette, 
  onNewAgentClick,
  onNavigate,
  onMobileMenuToggle
}) => {
  const { addToast } = useToast();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    addToast('Notifications cleared', 'All alerts marked as read.', 'info');
  };

  const screenTitles: Record<NavScreen, string> = {
    overview: 'Overview',
    agents: 'Agents',
    knowledge: 'Knowledge base',
    playground: 'Playground',
    workflows: 'Workflows',
    mcp: 'MCP servers',
    integrations: 'Integrations',
    runs: 'Runs & logs',
    models: 'Models',
    settings: 'Settings'
  };

  const title = screenTitles[currentScreen] || 'Overview';

  return (
    <header className="h-14 bg-white border-b border-[#E4E7EC] px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
      {/* Title only - NO subtitles */}
      <div className="flex items-center gap-3">
        {/* Hamburger Menu on Mobile */}
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden p-1.5 text-[#667085] hover:text-[#101828] bg-[#F5F6F8] border border-[#E4E7EC] rounded-[8px] transition-colors"
          title="Open Navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="text-sm font-semibold text-[#101828] tracking-tight">{title}</h1>
          <div className="flex items-center gap-1.5 text-xs text-[#667085] pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
            <span className="text-[11px] font-medium text-[#667085]">Live</span>
          </div>
        </div>
      </div>

      {/* Center/Right Controls */}
      <div className="flex items-center gap-2.5">
        {/* Search Bar / Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F6F8] hover:bg-[#EEF0F3] text-[#667085] hover:text-[#101828] border border-[#E4E7EC] rounded-[8px] text-xs transition-all w-44 md:w-56 justify-between"
          title="Search (⌘K)"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 text-[#98A2B3]" />
            <span className="truncate">Search (⌘K)...</span>
          </div>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-white text-[#667085] rounded border border-[#E4E7EC]">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 text-[#667085] hover:text-[#101828] bg-white hover:bg-[#F5F6F8] border border-[#E4E7EC] rounded-[8px] transition-colors relative"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#3B5BFF]" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E4E7EC] rounded-[10px] shadow-lg py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#E4E7EC]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#101828]">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] tabular-nums font-medium px-1.5 py-0.2 bg-[#3B5BFF]/10 text-[#3B5BFF] rounded">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-[11px] text-[#3B5BFF] hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#E4E7EC] max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div 
                    key={n.id} 
                    className={`px-3.5 py-2.5 hover:bg-[#F5F6F8] transition-colors cursor-pointer ${
                      n.unread ? 'bg-[#F9FAFB]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-medium text-[#101828]">{n.title}</span>
                      <span className="text-[10px] text-[#667085]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#667085] line-clamp-2 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="px-3.5 pt-2 border-t border-[#E4E7EC] text-center">
                <button
                  onClick={() => {
                    setNotificationsOpen(false);
                    onNavigate('runs');
                  }}
                  className="text-[11px] text-[#667085] hover:text-[#101828] flex items-center justify-center gap-1 w-full py-1"
                >
                  View full execution logs <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* New Agent Primary Button */}
        <button
          onClick={onNewAgentClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B5BFF] hover:bg-[#2E49E6] active:bg-[#2039C8] text-white rounded-[8px] text-xs font-medium transition-all shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New agent</span>
        </button>

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 bg-white hover:bg-[#F5F6F8] border border-[#E4E7EC] rounded-[8px] transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#E0E7FF] text-[#3B5BFF] flex items-center justify-center font-semibold text-[10px]">
              SM
            </div>
            <div className="text-left hidden 2xl:block">
              <div className="text-xs font-medium text-[#101828] leading-tight">Sarah Mitchell</div>
              <div className="text-[10px] text-[#667085]">Operations Lead</div>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4E7EC] rounded-[10px] shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-[#E4E7EC]">
                <div className="text-xs font-semibold text-[#101828]">Sarah Mitchell</div>
                <div className="text-[11px] text-[#667085] truncate">sarah.mitchell@apexlogistics.com</div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-[#344054] hover:text-[#101828] hover:bg-[#F5F6F8] flex items-center gap-2"
                >
                  <User className="w-3.5 h-3.5 text-[#667085]" />
                  Account profile
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-[#344054] hover:text-[#101828] hover:bg-[#F5F6F8] flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#667085]" />
                  Preferences
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-[#344054] hover:text-[#101828] hover:bg-[#F5F6F8] flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5 text-[#667085]" />
                  Security
                </button>
              </div>

              <div className="pt-1 border-t border-[#E4E7EC]">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    addToast('Signed out', 'Session terminated.', 'info');
                  }}
                  className="w-full px-3 py-1.5 text-left text-xs text-[#F04438] hover:bg-[#FEE4E2]/40 flex items-center gap-2"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

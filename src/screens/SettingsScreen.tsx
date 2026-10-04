import React, { useState } from 'react';
import { 
  Building2, 
  Key, 
  Users, 
  ShieldCheck, 
  CreditCard, 
  Check, 
  Copy, 
  Plus, 
  Trash2, 
  Download, 
  CheckCircle2, 
  Lock,
  X
} from 'lucide-react';
import { API_KEYS, TEAM_MEMBERS } from '../data/mockData';
import { ApiKeyItem, TeamMember } from '../types';
import { useToast } from '../components/Toast';

export const SettingsScreen: React.FC = () => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState<'general' | 'keys' | 'team' | 'security' | 'billing'>('general');
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(API_KEYS);
  const [team, setTeam] = useState<TeamMember[]>(TEAM_MEMBERS);
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Security Toggles
  const [dataStaysOnServer, setDataStaysOnServer] = useState(true);
  const [retentionDays, setRetentionDays] = useState('30');

  // General Form
  const [orgName, setOrgName] = useState('Apex Logistics Inc.');
  const [workspaceSlug, setWorkspaceSlug] = useState('apex-logistics-hq');
  const [defaultRegion, setDefaultRegion] = useState('us-east-virginia');

  // New Key Modal
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKeyId(id);
    setTimeout(() => setCopiedKeyId(null), 2000);
    addToast('Copied to clipboard', text, 'info');
  };

  const handleCreateKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    const newKey: ApiKeyItem = {
      id: `key_${Date.now()}`,
      name: newKeyName.trim(),
      prefix: `af_live_${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
      created: 'Just now',
      lastUsed: 'Never',
      environment: 'Production'
    };

    setApiKeys([newKey, ...apiKeys]);
    setIsKeyModalOpen(false);
    setNewKeyName('');
    addToast('API key generated', newKey.name, 'success');
  };

  const handleDeleteKey = (id: string, name: string) => {
    setApiKeys(prev => prev.filter(k => k.id !== id));
    addToast('API key revoked', name, 'warning');
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Preferences saved', undefined, 'success');
  };

  // Distinct avatar background colors for a real human feel
  const avatarColors: Record<string, string> = {
    'SM': 'bg-[#E0EAFF] text-[#3538CD]',
    'AC': 'bg-[#ECFDF3] text-[#027A48]',
    'ER': 'bg-[#FDF2FA] text-[#C11574]',
    'MB': 'bg-[#FFFAEB] text-[#B54708]'
  };

  return (
    <div className="space-y-5">
      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E4E7EC] pb-2 overflow-x-auto">
        {[
          { id: 'general', label: 'General', icon: Building2 },
          { id: 'keys', label: 'API keys', icon: Key },
          { id: 'team', label: 'Team', icon: Users },
          { id: 'security', label: 'Security', icon: ShieldCheck },
          { id: 'billing', label: 'Billing', icon: CreditCard }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[8px] text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-[#3B5BFF] shadow-xs border border-[#E4E7EC]'
                  : 'text-[#667085] hover:text-[#101828] hover:bg-white/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GENERAL */}
      {activeTab === 'general' && (
        <div className="max-w-xl bg-white p-5 rounded-[10px] border border-[#E4E7EC] space-y-5 card-shadow">
          <h3 className="text-sm font-semibold text-[#101828]">Workspace profile</h3>

          <form onSubmit={handleSaveGeneral} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-[#344054] mb-1">
                Organization name
              </label>
              <input
                type="text"
                className="w-full px-3 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-medium text-[#344054] mb-1">
                Workspace slug
              </label>
              <div className="flex items-center">
                <span className="px-2.5 py-1.5 bg-[#F2F4F7] border border-r-0 border-[#E4E7EC] rounded-l-[8px] text-xs font-mono text-[#667085]">
                  agentforge.ai/ws/
                </span>
                <input
                  type="text"
                  className="w-full px-3 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-r-[8px] text-xs font-mono text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                  value={workspaceSlug}
                  onChange={(e) => setWorkspaceSlug(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-[#344054] mb-1">
                  Residency region
                </label>
                <select
                  value={defaultRegion}
                  onChange={(e) => setDefaultRegion(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                >
                  <option value="us-east-virginia">US-East (Virginia)</option>
                  <option value="eu-frankfurt">EU-Central (Frankfurt)</option>
                  <option value="ap-singapore">Asia-Pacific (Singapore)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#344054] mb-1">
                  Timezone
                </label>
                <select
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                >
                  <option>UTC-05:00 Eastern Time</option>
                  <option>UTC+00:00 UTC</option>
                  <option>UTC+01:00 Central European</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#3B5BFF] hover:bg-[#2E49E6] rounded-[8px] shadow-xs transition-all"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 2: API KEYS */}
      {activeTab === 'keys' && (
        <div className="bg-white p-5 rounded-[10px] border border-[#E4E7EC] space-y-4 card-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#101828]">Workspace API keys</h3>

            <button
              onClick={() => setIsKeyModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B5BFF] hover:bg-[#2E49E6] text-white rounded-[8px] text-xs font-medium transition-all shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New key</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAECF0] text-[#667085]">
                  <th className="pb-2.5 font-medium">Name</th>
                  <th className="pb-2.5 font-medium">Token preview</th>
                  <th className="pb-2.5 font-medium">Environment</th>
                  <th className="pb-2.5 font-medium">Created</th>
                  <th className="pb-2.5 font-medium">Last used</th>
                  <th className="pb-2.5 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                {apiKeys.map((key) => (
                  <tr key={key.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-2.5 font-medium text-[#101828]">{key.name}</td>
                    <td className="py-2.5 font-mono text-[#344054]">
                      <span className="bg-[#F2F4F7] px-2 py-0.5 rounded-[4px]">
                        {key.prefix}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.2 rounded text-[10px] bg-[#F2F4F7] text-[#344054]">
                        {key.environment}
                      </span>
                    </td>
                    <td className="py-2.5 text-[#667085]">{key.created}</td>
                    <td className="py-2.5 text-[#667085]">{key.lastUsed}</td>
                    <td className="py-2.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopy(key.id, key.prefix)}
                          className="p-1 text-[#667085] hover:text-[#101828]"
                          title="Copy"
                        >
                          {copiedKeyId === key.id ? (
                            <Check className="w-3.5 h-3.5 text-[#12B76A]" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteKey(key.id, key.name)}
                          className="p-1 text-[#667085] hover:text-[#F04438]"
                          title="Revoke"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: TEAM - Real Human Names and Distinct Avatars */}
      {activeTab === 'team' && (
        <div className="bg-white p-5 rounded-[10px] border border-[#E4E7EC] space-y-4 card-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#101828]">Team members</h3>

            <button 
              onClick={() => addToast('Invite sent', undefined, 'success')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#F9FAFB] border border-[#E4E7EC] text-[#344054] rounded-[8px] text-xs font-medium transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Invite</span>
            </button>
          </div>

          <div className="divide-y divide-[#F2F4F7]">
            {team.map((member) => (
              <div key={member.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Distinct Avatar Color */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-[10px] ${avatarColors[member.avatar] || 'bg-[#F2F4F7] text-[#344054]'}`}>
                    {member.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-medium text-[#101828] flex items-center gap-2">
                      {member.name}
                      {member.role === 'Owner' && (
                        <span className="text-[10px] px-1.5 py-0.2 bg-[#EEF2FF] text-[#3538CD] rounded font-medium">
                          Owner
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#667085]">{member.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="text-[#344054]">{member.role}</span>
                  <span className={`w-1.5 h-1.5 rounded-full ${member.twoFactorEnabled ? 'bg-[#12B76A]' : 'bg-[#F79009]'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SECURITY */}
      {activeTab === 'security' && (
        <div className="max-w-xl bg-white p-5 rounded-[10px] border border-[#E4E7EC] space-y-4 card-shadow">
          <h3 className="text-sm font-semibold text-[#101828]">Data isolation</h3>

          {/* Toggle: Data Stays on Your Server */}
          <div className="p-3.5 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0] flex items-center justify-between gap-4">
            <div>
              <div className="text-xs font-medium text-[#101828]">
                Data stays on your server
              </div>
              <p className="text-[11px] text-[#667085] mt-0.5">
                Routes all prompt payloads through on-premise hardware only.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setDataStaysOnServer(!dataStaysOnServer);
                addToast('Policy updated', undefined, 'info');
              }}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                dataStaysOnServer ? 'bg-[#3B5BFF]' : 'bg-[#D0D5DD]'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                  dataStaysOnServer ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#344054] mb-1.5">
              Retention period
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['30', '60', '90'].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setRetentionDays(days);
                    addToast(`Set to ${days} days`, undefined, 'info');
                  }}
                  className={`py-1.5 px-3 rounded-[8px] border text-xs font-medium transition-all ${
                    retentionDays === days
                      ? 'bg-[#EEF2FF] border-[#3B5BFF] text-[#3B5BFF]'
                      : 'bg-white border-[#E4E7EC] text-[#667085] hover:text-[#101828]'
                  }`}
                >
                  {days} days
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BILLING */}
      {activeTab === 'billing' && (
        <div className="max-w-xl bg-white p-5 rounded-[10px] border border-[#E4E7EC] space-y-4 card-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-[#101828]">Pro plan</h3>
              <p className="text-xs text-[#667085]">$499 / month · Renews Nov 01</p>
            </div>
            <span className="px-2 py-0.5 bg-[#ECFDF3] text-[#027A48] rounded-[6px] text-[11px] font-medium">
              Active
            </span>
          </div>

          {/* Usage Meter */}
          <div className="p-3.5 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0] space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#667085]">Monthly tokens</span>
              <span className="text-[#101828] font-medium tabular-nums">682k / 1.0M (68%)</span>
            </div>
            <div className="w-full bg-[#E4E7EC] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#3B5BFF] h-full rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-[#344054]">Visa ending in 4092</span>
            <button className="text-[#3B5BFF] hover:underline font-medium">
              Update payment
            </button>
          </div>
        </div>
      )}

      {/* Create Key Modal */}
      {isKeyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-sm bg-white border border-[#E4E7EC] rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E7EC]">
              <h3 className="text-sm font-semibold text-[#101828]">Generate API key</h3>
              <button onClick={() => setIsKeyModalOpen(false)} className="text-[#667085] hover:text-[#101828]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateKey} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block text-[#667085] mb-1">Key name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ingest Gateway"
                  className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsKeyModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#344054] bg-white border border-[#E4E7EC] rounded-[8px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#3B5BFF] hover:bg-[#2E49E6] rounded-[8px]"
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

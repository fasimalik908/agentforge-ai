import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { INTEGRATIONS_LIST } from '../data/mockData';
import { Integration } from '../types';
import { useToast } from '../components/Toast';
import { 
  GmailLogo, 
  SlackLogo, 
  HubSpotLogo, 
  NotionLogo, 
  GoogleDriveLogo, 
  PostgreSQLLogo, 
  WhatsAppLogo, 
  StripeLogo, 
  N8nLogo, 
  AirtableLogo 
} from '../components/BrandLogos';

export const IntegrationsScreen: React.FC = () => {
  const { addToast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>(INTEGRATIONS_LIST);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('all');

  const getIntegrationLogo = (iconType: string) => {
    switch (iconType) {
      case 'Gmail': return <GmailLogo className="w-5 h-5" />;
      case 'Slack': return <SlackLogo className="w-5 h-5" />;
      case 'HubSpot': return <HubSpotLogo className="w-5 h-5" />;
      case 'Notion': return <NotionLogo className="w-5 h-5" />;
      case 'GoogleDrive': return <GoogleDriveLogo className="w-5 h-5" />;
      case 'PostgreSQL': return <PostgreSQLLogo className="w-5 h-5" />;
      case 'WhatsApp': return <WhatsAppLogo className="w-5 h-5" />;
      case 'Stripe': return <StripeLogo className="w-5 h-5" />;
      case 'n8n': return <N8nLogo className="w-5 h-5" />;
      case 'Airtable': return <AirtableLogo className="w-5 h-5" />;
      default: return <SlackLogo className="w-5 h-5" />;
    }
  };

  const filteredIntegrations = integrations.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'all' || item.category === category;
    return matchesSearch && matchesCat;
  });

  const toggleConnection = (id: string, name: string, isCurrentlyConnected: boolean) => {
    setIntegrations(prev => prev.map(int => {
      if (int.id === id) {
        return {
          ...int,
          connected: !int.connected,
          lastSync: !int.connected ? 'Just now' : undefined
        };
      }
      return int;
    }));

    if (isCurrentlyConnected) {
      addToast('Disconnected', name, 'warning');
    } else {
      addToast('Connected', name, 'success');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search integrations..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#3B5BFF]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hidden md:flex items-center gap-1 p-0.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs">
            {['all', 'communication', 'crm', 'storage', 'developer', 'payments'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 rounded-[6px] capitalize transition-colors ${
                  category === cat
                    ? 'bg-[#F2F4F7] text-[#101828] font-medium'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs text-[#667085]">
          {integrations.filter(i => i.connected).length} of {integrations.length} connected
        </span>
      </div>

      {/* Integrations Grid - Authentic Logos, Short Status Chips, No Paragraphs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {filteredIntegrations.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow flex items-center justify-between gap-3 hover:border-[#D0D5DD] transition-all"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-[8px] bg-[#F5F6F8] flex items-center justify-center shrink-0 border border-[#E4E7EC]">
                {getIntegrationLogo(item.iconType)}
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-[#101828] truncate">{item.name}</h3>
                <span className="text-[10px] text-[#667085] block truncate">
                  {item.connected ? (item.lastSync || 'Active') : 'Disconnected'}
                </span>
              </div>
            </div>

            <button
              onClick={() => toggleConnection(item.id, item.name, item.connected)}
              className={`px-2 py-1 rounded-[6px] text-[11px] font-medium transition-colors shrink-0 ${
                item.connected
                  ? 'bg-[#ECFDF3] text-[#027A48] hover:bg-[#D1FADF]'
                  : 'bg-[#F2F4F7] text-[#344054] hover:bg-[#E4E7EC]'
              }`}
            >
              {item.connected ? 'Active' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

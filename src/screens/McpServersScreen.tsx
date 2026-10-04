import React, { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Lock, 
  RotateCw 
} from 'lucide-react';
import { MCP_SERVERS } from '../data/mockData';
import { McpServer } from '../types';
import { useToast } from '../components/Toast';
import { 
  HubSpotLogo, 
  PostgreSQLLogo, 
  GoogleDriveLogo, 
  SlackLogo, 
  NotionLogo 
} from '../components/BrandLogos';

export const McpServersScreen: React.FC = () => {
  const { addToast } = useToast();
  const [servers, setServers] = useState<McpServer[]>(MCP_SERVERS);
  const [expandedServerId, setExpandedServerId] = useState<string | null>('mcp_hubspot');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [pingingId, setPingingId] = useState<string | null>(null);

  const [newName, setNewName] = useState('');
  const [newEndpoint, setNewEndpoint] = useState('');

  const getServerLogo = (id: string) => {
    if (id.includes('hubspot')) return <HubSpotLogo className="w-5 h-5" />;
    if (id.includes('postgres')) return <PostgreSQLLogo className="w-5 h-5" />;
    if (id.includes('gdrive')) return <GoogleDriveLogo className="w-5 h-5" />;
    if (id.includes('slack')) return <SlackLogo className="w-5 h-5" />;
    return <NotionLogo className="w-5 h-5" />;
  };

  const handlePing = (server: McpServer, e: React.MouseEvent) => {
    e.stopPropagation();
    setPingingId(server.id);
    setTimeout(() => {
      setPingingId(null);
      addToast('Ping successful', `${server.latency} roundtrip`, 'success');
    }, 500);
  };

  const handleAddServer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newMcp: McpServer = {
      id: `mcp_${Date.now()}`,
      name: newName.trim(),
      clientType: 'MCP Daemon',
      status: 'connected',
      transport: 'SSE',
      permission: 'Read-only',
      isSecure: true,
      securityMethod: 'mTLS Handshake',
      latency: '12ms',
      endpoint: newEndpoint || 'mcp://service.internal/sse',
      tools: [
        { name: 'query_records', description: 'Query records with parameters', parameters: '{ filter: string }' }
      ]
    };

    setServers([newMcp, ...servers]);
    setIsConnectModalOpen(false);
    setNewName('');
    setNewEndpoint('');
    addToast('Server connected', newMcp.name, 'success');
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-[#101828]">Model context protocol servers</h2>

        <button
          onClick={() => setIsConnectModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B5BFF] hover:bg-[#2E49E6] text-white rounded-[8px] text-xs font-medium transition-all shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Connect server</span>
        </button>
      </div>

      {/* MCP Servers List - Short status chips, no paragraphs */}
      <div className="space-y-3">
        {servers.map((server) => {
          const isExpanded = expandedServerId === server.id;
          const isPinging = pingingId === server.id;

          return (
            <div
              key={server.id}
              className="bg-white rounded-[10px] border border-[#E4E7EC] card-shadow transition-all overflow-hidden"
            >
              {/* Server Main Row */}
              <div 
                className="p-4 flex items-center justify-between gap-4 cursor-pointer"
                onClick={() => setExpandedServerId(isExpanded ? null : server.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[8px] bg-[#F5F6F8] flex items-center justify-center shrink-0 border border-[#E4E7EC]">
                    {getServerLogo(server.id)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-xs font-semibold text-[#101828]">{server.name}</h3>
                      
                      {/* Short Status Chips */}
                      <span className={`px-1.5 py-0.2 rounded text-[10px] font-medium ${
                        server.permission === 'Read-only'
                          ? 'bg-[#F2F4F7] text-[#344054]'
                          : 'bg-[#FFFAEB] text-[#B54708]'
                      }`}>
                        {server.permission}
                      </span>

                      {server.isSecure && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#ECFDF3] text-[#027A48]">
                          <Lock className="w-2.5 h-2.5" />
                          Secure
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#667085] flex items-center gap-2">
                      <span>{server.transport}</span>
                      <span>·</span>
                      <span className="tabular-nums">{server.latency}</span>
                    </div>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => handlePing(server, e)}
                    disabled={isPinging}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#344054] hover:text-[#101828] bg-white hover:bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] transition-colors"
                  >
                    <RotateCw className={`w-3 h-3 ${isPinging ? 'animate-spin text-[#3B5BFF]' : 'text-[#667085]'}`} />
                    <span>Ping</span>
                  </button>

                  <div className="text-right">
                    <span className="text-xs font-medium text-[#12B76A] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                      Connected
                    </span>
                    <span className="text-[11px] text-[#667085] font-mono">
                      {server.tools.length} tools
                    </span>
                  </div>

                  <button className="p-1 text-[#667085] hover:text-[#101828]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Collapsible Tools Catalog */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#F2F4F7] bg-[#F9FAFB]">
                  <div className="pt-2 pb-2 text-[11px] font-medium text-[#667085]">
                    Exposed tool catalog ({server.tools.length})
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {server.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="p-2.5 bg-white rounded-[8px] border border-[#E4E7EC] text-xs space-y-1"
                      >
                        <code className="font-mono font-medium text-[#3B5BFF] text-[11px]">
                          {tool.name}()
                        </code>
                        <div className="text-[10px] font-mono text-[#667085] truncate">
                          {tool.parameters}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Connect MCP Server Modal */}
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-md bg-white border border-[#E4E7EC] rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E7EC]">
              <h3 className="text-sm font-semibold text-[#101828]">Connect MCP server</h3>
              <button 
                onClick={() => setIsConnectModalOpen(false)}
                className="text-[#667085] hover:text-[#101828] p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddServer} className="p-5 space-y-3 text-xs">
              <div>
                <label className="block text-[#667085] mb-1">Server name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jira MCP"
                  className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[#667085] mb-1">Endpoint URI</label>
                <input
                  type="text"
                  placeholder="mcp://jira.internal/sse"
                  className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs font-mono text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                  value={newEndpoint}
                  onChange={(e) => setNewEndpoint(e.target.value)}
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConnectModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-[#344054] bg-white border border-[#E4E7EC] rounded-[8px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#3B5BFF] hover:bg-[#2E49E6] rounded-[8px]"
                >
                  Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

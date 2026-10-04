import React, { useState } from 'react';
import { 
  Search, 
  Terminal, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  X,
  Plus,
  Copy,
  AlertTriangle
} from 'lucide-react';
import { Agent, NavScreen } from '../types';
import { useToast } from '../components/Toast';
import { 
  OpenAILogo, 
  ClaudeLogo, 
  GeminiLogo, 
  MetaLogo, 
  QwenLogo, 
  DeepSeekLogo 
} from '../components/BrandLogos';

interface AgentsScreenProps {
  agents: Agent[];
  onNavigate: (screen: NavScreen) => void;
  onOpenNewAgentModal: () => void;
  onSelectAgentForPlayground?: (agentId: string) => void;
  onUpdateAgent?: (updatedAgent: Agent) => void;
  onDuplicateAgent?: (agent: Agent) => void;
}

export const AgentsScreen: React.FC<AgentsScreenProps> = ({
  agents,
  onNavigate,
  onOpenNewAgentModal,
  onSelectAgentForPlayground,
  onUpdateAgent,
  onDuplicateAgent
}) => {
  const { addToast } = useToast();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cloud' | 'private'>('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.description.toLowerCase().includes(search.toLowerCase()) ||
      agent.model.toLowerCase().includes(search.toLowerCase());
    
    if (filterType === 'cloud') return matchesSearch && !agent.isPrivate;
    if (filterType === 'private') return matchesSearch && agent.isPrivate;
    return matchesSearch;
  });

  const toggleAgentStatus = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = agent.status === 'active' ? 'paused' : 'active';
    const updated = { ...agent, status: newStatus as any };
    onUpdateAgent?.(updated);
    addToast(
      newStatus === 'active' ? `${agent.name} resumed` : `${agent.name} paused`,
      undefined,
      newStatus === 'active' ? 'success' : 'warning'
    );
  };

  const handleDuplicate = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    const cloned: Agent = {
      ...agent,
      id: `agent_${Date.now()}`,
      name: `${agent.name} (Copy)`,
      queriesCount: 0,
      lastRun: 'Never'
    };
    onDuplicateAgent?.(cloned);
    addToast('Agent duplicated', `Created "${cloned.name}".`, 'success');
  };

  const handleTestInPlayground = (agentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectAgentForPlayground?.(agentId);
    onNavigate('playground');
  };

  const getModelTile = (modelName: string) => {
    if (modelName.includes('GPT')) {
      return {
        icon: <OpenAILogo className="w-4 h-4 text-[#10A37F]" />,
        bg: 'bg-[#10A37F]/10'
      };
    }
    if (modelName.includes('Claude')) {
      return {
        icon: <ClaudeLogo className="w-4 h-4 text-[#D97706]" />,
        bg: 'bg-[#D97706]/10'
      };
    }
    if (modelName.includes('Gemini')) {
      return {
        icon: <GeminiLogo className="w-4 h-4 text-[#3B5BFF]" />,
        bg: 'bg-[#3B5BFF]/10'
      };
    }
    if (modelName.includes('Llama')) {
      return {
        icon: <MetaLogo className="w-4 h-4 text-[#0668E1]" />,
        bg: 'bg-[#0668E1]/10'
      };
    }
    if (modelName.includes('Qwen')) {
      return {
        icon: <QwenLogo className="w-4 h-4 text-[#7C3AED]" />,
        bg: 'bg-[#7C3AED]/10'
      };
    }
    return {
      icon: <DeepSeekLogo className="w-4 h-4 text-[#0EA5E9]" />,
      bg: 'bg-[#0EA5E9]/10'
    };
  };

  return (
    <div className="space-y-5">
      {/* Search and Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#3B5BFF]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Segmented Filter */}
          <div className="flex items-center gap-1 p-0.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-[6px] transition-colors ${
                filterType === 'all'
                  ? 'bg-[#F2F4F7] text-[#101828] font-medium'
                  : 'text-[#667085] hover:text-[#101828]'
              }`}
            >
              All ({agents.length})
            </button>
            <button
              onClick={() => setFilterType('cloud')}
              className={`px-3 py-1 rounded-[6px] transition-colors ${
                filterType === 'cloud'
                  ? 'bg-[#F2F4F7] text-[#101828] font-medium'
                  : 'text-[#667085] hover:text-[#101828]'
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => setFilterType('private')}
              className={`px-3 py-1 rounded-[6px] transition-colors ${
                filterType === 'private'
                  ? 'bg-[#F2F4F7] text-[#101828] font-medium'
                  : 'text-[#667085] hover:text-[#101828]'
              }`}
            >
              Private
            </button>
          </div>
        </div>

        <button
          onClick={onOpenNewAgentModal}
          className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#3B5BFF] hover:bg-[#2E49E6] text-white rounded-[8px] text-xs font-medium transition-all shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New agent</span>
        </button>
      </div>

      {/* Agents Grid - Authentic Real Logos, Usage Bars, Clean Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAgents.map((agent) => {
          const modelTile = getModelTile(agent.model);
          const maxQueries = 25000;
          const usagePercent = Math.min(100, Math.round((agent.queriesCount / maxQueries) * 100));

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className="p-5 bg-white hover:border-[#D0D5DD] rounded-[10px] border border-[#E4E7EC] card-shadow transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    {/* Distinct Colored Tile with Real Model Logo */}
                    <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center ${modelTile.bg} shrink-0`}>
                      {modelTile.icon}
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[#101828] group-hover:text-[#3B5BFF] transition-colors">
                        {agent.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                        <span>{agent.model}</span>
                        {agent.isPrivate && (
                          <span className="text-[10px] px-1 py-0.2 bg-[#F2F4F7] text-[#344054] rounded font-medium">
                            Private
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      agent.status === 'active' ? 'bg-[#12B76A]' : 'bg-[#F79009]'
                    }`} />
                    <span className="text-[11px] text-[#667085] capitalize">
                      {agent.status}
                    </span>
                  </div>
                </div>

                {/* Short 1-line description only */}
                <p className="text-xs text-[#667085] line-clamp-1 mb-4">
                  {agent.description}
                </p>

                {/* Mini usage bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-[11px] text-[#667085] mb-1">
                    <span>Usage</span>
                    <span className="text-[#344054] tabular-nums">{agent.queriesCount.toLocaleString()} queries</span>
                  </div>
                  <div className="w-full bg-[#F2F4F7] h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        agent.status === 'standby' ? 'bg-[#F79009]' : 'bg-[#3B5BFF]'
                      }`}
                      style={{ width: `${Math.max(8, usagePercent)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Meta & Actions */}
              <div className="pt-3 border-t border-[#F2F4F7] flex items-center justify-between text-xs">
                <span className="text-[#667085] text-[11px]">
                  {agent.lastRun}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handleDuplicate(agent, e)}
                    className="p-1 text-[#667085] hover:text-[#101828] rounded hover:bg-[#F5F6F8] transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => handleTestInPlayground(agent.id, e)}
                    className="flex items-center gap-1 text-xs text-[#3B5BFF] hover:underline font-medium"
                  >
                    Test <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="w-full max-w-lg bg-white border border-[#E4E7EC] rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E7EC]">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-[8px] bg-[#F2F4F7] flex items-center justify-center">
                  {getModelTile(selectedAgent.model).icon}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#101828] flex items-center gap-2">
                    {selectedAgent.name}
                  </h3>
                  <span className="text-xs text-[#667085]">{selectedAgent.model}</span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="text-[#667085] hover:text-[#101828] p-1 rounded-[6px]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto text-xs">
              <div>
                <span className="font-medium text-[#101828] block mb-1">Description</span>
                <p className="text-[#667085] leading-relaxed bg-[#F9FAFB] p-2.5 rounded-[8px] border border-[#EAECF0]">
                  {selectedAgent.description}
                </p>
              </div>

              <div>
                <span className="font-medium text-[#101828] block mb-1">System prompt</span>
                <div className="text-[#344054] font-mono bg-[#F9FAFB] p-2.5 rounded-[8px] border border-[#EAECF0] leading-relaxed whitespace-pre-wrap">
                  {selectedAgent.systemPrompt}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-2 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0]">
                  <div className="text-[10px] text-[#667085] mb-0.5">Uptime</div>
                  <div className="font-semibold text-[#101828] tabular-nums">{selectedAgent.uptime}</div>
                </div>
                <div className="p-2 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0]">
                  <div className="text-[10px] text-[#667085] mb-0.5">Avg latency</div>
                  <div className="font-semibold text-[#101828] tabular-nums">{selectedAgent.avgLatency}</div>
                </div>
                <div className="p-2 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0]">
                  <div className="text-[10px] text-[#667085] mb-0.5">Temperature</div>
                  <div className="font-semibold text-[#3B5BFF] tabular-nums">{selectedAgent.temperature}</div>
                </div>
              </div>

              <div>
                <span className="font-medium text-[#101828] block mb-1.5">Tools</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedAgent.tools.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-0.5 rounded-[6px] text-xs font-mono bg-[#F2F4F7] text-[#344054]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-[#F9FAFB] border-t border-[#E4E7EC] flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedAgent(null)}
                className="px-3 py-1.5 text-xs text-[#344054] hover:text-[#101828] bg-white border border-[#E4E7EC] rounded-[8px]"
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  const agentId = selectedAgent.id;
                  setSelectedAgent(null);
                  handleTestInPlayground(agentId, e);
                }}
                className="px-3 py-1.5 text-xs font-medium text-white bg-[#3B5BFF] hover:bg-[#2E49E6] rounded-[8px] shadow-xs"
              >
                Test in playground
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

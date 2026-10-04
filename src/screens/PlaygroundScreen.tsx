import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  RotateCcw, 
  FileText, 
  ExternalLink, 
  Check, 
  Copy, 
  Download, 
  Trash2,
  Lock,
  Sliders
} from 'lucide-react';
import { INITIAL_AGENTS, PLAYGROUND_PRESET_SOURCES } from '../data/mockData';
import { CitationSource } from '../types';
import { useToast } from '../components/Toast';
import { OpenAILogo, ClaudeLogo, GeminiLogo, MetaLogo } from '../components/BrandLogos';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: CitationSource[];
  tokens?: number;
  latency?: string;
}

export const PlaygroundScreen: React.FC<{ initialAgentId?: string }> = ({ initialAgentId }) => {
  const { addToast } = useToast();
  const [selectedAgentId, setSelectedAgentId] = useState<string>(initialAgentId || 'agent_support');
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [temperature, setTemperature] = useState(0.2);
  const [activeCitationId, setActiveCitationId] = useState<number | null>(1);
  const [activeSources, setActiveSources] = useState<CitationSource[]>(PLAYGROUND_PRESET_SOURCES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentAgent = INITIAL_AGENTS.find(a => a.id === selectedAgentId) || INITIAL_AGENTS[0];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg_1',
      role: 'user',
      content: 'What is your refund policy for annual plans?',
      timestamp: '08:12 AM'
    },
    {
      id: 'msg_2',
      role: 'assistant',
      content: `For annual subscriptions, full refunds are eligible within the first 30 days of initial purchase or auto-renewal [1]. If a cancellation is requested after this 30-day window, a prorated account credit is applied towards alternative enterprise tiers or add-on token packs [2]. Approved refunds are processed back to the original billing instrument within 3 to 5 business days [1].`,
      timestamp: '08:12 AM',
      sources: PLAYGROUND_PRESET_SOURCES,
      tokens: 384,
      latency: '1.12s'
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleAgentChange = (agentId: string) => {
    setSelectedAgentId(agentId);
    const agent = INITIAL_AGENTS.find(a => a.id === agentId);
    if (agent) {
      setSelectedModel(agent.model.replace(' (Private)', ''));
      setTemperature(agent.temperature);
      addToast(`Switched to ${agent.name}`, undefined, 'info');
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      let responseText = '';
      let newSources: CitationSource[] = [];

      if (text.toLowerCase().includes('equipment') || text.toLowerCase().includes('remote') || text.toLowerCase().includes('stipend')) {
        responseText = `Full-time distributed employees receive a recurring quarterly technology allowance of $650 [1]. Core collaboration presence is expected between 10:00 AM and 3:00 PM EST [2]. Expense claims are submitted via the employee portal [1].`;
        newSources = [
          {
            id: 1,
            docName: 'Employee Handbook 2026.pdf',
            page: 12,
            section: 'Section 4.1 — Remote Work & Equipment Stipend',
            excerpt: 'All full-time distributed employees receive a recurring quarterly technology allowance of $650 to maintain home workstations...',
            confidence: 98
          },
          {
            id: 2,
            docName: 'Employee Handbook 2026.pdf',
            page: 13,
            section: 'Section 4.2 — Core Collaboration Hours',
            excerpt: 'Distributed teams are required to align synchronous presence between 10:00 AM and 3:00 PM EST...',
            confidence: 94
          }
        ];
      } else {
        responseText = `According to verified enterprise policy, annual contracts are subject to standard 30-day guarantee terms [1]. Extended cancellations receive account credit applicable toward alternative compute clusters [2]. Processing completes within 3 to 5 business days [1].`;
        newSources = PLAYGROUND_PRESET_SOURCES;
      }

      const assistantMsg: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'assistant',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: newSources,
        tokens: 340,
        latency: '0.94s'
      };

      setMessages(prev => [...prev, assistantMsg]);
      setActiveSources(newSources);
      setActiveCitationId(1);
      setIsTyping(false);
    }, 900);
  };

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    addToast('Copied to clipboard', undefined, 'info');
  };

  const renderFormattedAnswer = (text: string) => {
    const parts = text.split(/(\[1\]|\[2\])/g);
    return parts.map((part, i) => {
      if (part === '[1]') {
        return (
          <button
            key={i}
            onClick={() => setActiveCitationId(1)}
            className={`inline-flex items-center px-1.5 py-0.2 mx-1 rounded-[4px] text-xs font-medium tabular-nums transition-all ${
              activeCitationId === 1
                ? 'bg-[#3B5BFF] text-white'
                : 'bg-[#EEF2FF] text-[#3B5BFF] hover:bg-[#E0EAFF]'
            }`}
          >
            [1]
          </button>
        );
      }
      if (part === '[2]') {
        return (
          <button
            key={i}
            onClick={() => setActiveCitationId(2)}
            className={`inline-flex items-center px-1.5 py-0.2 mx-1 rounded-[4px] text-xs font-medium tabular-nums transition-all ${
              activeCitationId === 2
                ? 'bg-[#3B5BFF] text-white'
                : 'bg-[#EEF2FF] text-[#3B5BFF] hover:bg-[#E0EAFF]'
            }`}
          >
            [2]
          </button>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="h-[calc(100vh-7.5rem)] flex flex-col lg:flex-row gap-5">
      {/* Left/Center: Large Chat Interface (majority of space) */}
      <div className="flex-1 flex flex-col bg-white rounded-[10px] border border-[#E4E7EC] overflow-hidden card-shadow">
        {/* Top Control Bar */}
        <div className="px-5 py-3 border-b border-[#E4E7EC] flex flex-wrap items-center justify-between gap-3 bg-[#FDFDFE]">
          <div className="flex items-center gap-3">
            {/* Agent Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#101828]">Agent:</span>
              <select
                value={selectedAgentId}
                onChange={(e) => handleAgentChange(e.target.value)}
                className="bg-white border border-[#E4E7EC] rounded-[8px] px-2.5 py-1 text-xs text-[#101828] font-medium focus:outline-none focus:border-[#3B5BFF]"
              >
                {INITIAL_AGENTS.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-4 w-px bg-[#E4E7EC]" />

            {/* Model Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#667085]">Model:</span>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="bg-white border border-[#E4E7EC] rounded-[8px] px-2 py-1 text-xs text-[#344054] focus:outline-none focus:border-[#3B5BFF]"
              >
                <option value="GPT-4o">GPT-4o</option>
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                <option value="Llama 3.3 70B">Llama 3.3 70B</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-[#F5F6F8] rounded-[8px]">
              <span className="text-[11px] text-[#667085]">Temp</span>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-14 accent-[#3B5BFF] cursor-pointer"
              />
              <span className="text-[11px] text-[#344054] tabular-nums">{temperature}</span>
            </div>

            <button
              onClick={() => {
                setMessages([]);
                addToast('Conversation cleared', undefined, 'info');
              }}
              className="p-1.5 text-[#667085] hover:text-[#101828] hover:bg-[#F5F6F8] rounded-[6px]"
              title="Clear"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={msg.id}>
              {msg.role === 'user' ? (
                <div className="flex items-start justify-end gap-2.5">
                  <div className="max-w-xl bg-[#F5F6F8] text-[#101828] rounded-[10px] px-4 py-2.5 text-xs leading-relaxed border border-[#E4E7EC]">
                    {msg.content}
                    <div className="text-[10px] text-[#98A2B3] text-right mt-1 tabular-nums">{msg.timestamp}</div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#E0E7FF] text-[#3B5BFF] flex items-center justify-center text-[10px] font-semibold shrink-0">
                    SM
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-[6px] bg-[#EEF2FF] text-[#3B5BFF] flex items-center justify-center shrink-0">
                    <OpenAILogo className="w-3.5 h-3.5" />
                  </div>

                  <div className="max-w-2xl bg-white border border-[#E4E7EC] rounded-[10px] p-4 text-xs leading-relaxed card-shadow space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[#667085] pb-1.5 border-b border-[#F2F4F7]">
                      <span className="font-medium text-[#101828]">{currentAgent.name}</span>
                      <span className="text-[10px] text-[#667085] tabular-nums">{msg.latency}</span>
                    </div>

                    <div className="text-[#344054] leading-relaxed">
                      {renderFormattedAnswer(msg.content)}
                    </div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pt-2 flex items-center justify-between border-t border-[#F2F4F7]">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-[#667085]">Sources:</span>
                          {msg.sources.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => {
                                setActiveSources(msg.sources || []);
                                setActiveCitationId(s.id);
                              }}
                              className={`text-[11px] px-2 py-0.5 rounded-[4px] tabular-nums transition-colors ${
                                activeCitationId === s.id
                                  ? 'bg-[#3B5BFF] text-white font-medium'
                                  : 'bg-[#F2F4F7] text-[#344054] hover:bg-[#E4E7EC]'
                              }`}
                            >
                              [{s.id}] {s.docName}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => handleCopyMessage(msg.content, index)}
                          className="flex items-center gap-1 text-[11px] text-[#667085] hover:text-[#101828]"
                        >
                          {copiedIndex === index ? <Check className="w-3 h-3 text-[#12B76A]" /> : <Copy className="w-3 h-3" />}
                          <span>{copiedIndex === index ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#667085] pl-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BFF] animate-ping" />
              <span>Retrieving grounding vectors...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3.5 bg-white border-t border-[#E4E7EC]">
          <div className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] px-3 py-2 focus-within:border-[#3B5BFF] focus-within:bg-white transition-colors">
            <input
              type="text"
              placeholder="Ask a question or test document retrieval..."
              className="flex-1 bg-transparent text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isTyping}
              className="p-1.5 bg-[#3B5BFF] hover:bg-[#2E49E6] active:bg-[#2039C8] disabled:opacity-40 text-white rounded-[6px] transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Bug fix: Clean text, NO raw latex */}
          <div className="mt-1.5 flex items-center justify-between text-[11px] text-[#667085] px-1">
            <span>RAG collection: agentforge_primary_knowledge (14,820 chunks)</span>
            <span>Similarity threshold 0.92</span>
          </div>
        </form>
      </div>

      {/* Right Side Panel: Retrieved Sources as Mini Document Previews */}
      <div className="w-full lg:w-72 bg-white rounded-[10px] border border-[#E4E7EC] p-4 flex flex-col justify-between shrink-0 card-shadow">
        <div>
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#E4E7EC]">
            <h3 className="text-xs font-semibold text-[#101828]">Retrieved sources</h3>
            <span className="text-[10px] text-[#667085] tabular-nums">
              {activeSources.length} verified
            </span>
          </div>

          {/* Mini Document Previews (Page thumbnail with matching line highlighted) */}
          <div className="space-y-3">
            {activeSources.map((source) => {
              const isSelected = activeCitationId === source.id;

              return (
                <div
                  key={source.id}
                  onClick={() => setActiveCitationId(source.id)}
                  className={`p-3 rounded-[8px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F9FAFB] border-[#3B5BFF]'
                      : 'bg-white border-[#E4E7EC] hover:border-[#D0D5DD]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[#101828] flex items-center gap-1.5 truncate">
                      <span className="text-[#3B5BFF] font-medium tabular-nums">[{source.id}]</span>
                      <span className="truncate">{source.docName}</span>
                    </span>
                    <span className="text-[10px] font-medium text-[#12B76A] tabular-nums">
                      {source.confidence}%
                    </span>
                  </div>

                  <div className="text-[10px] text-[#667085] mb-2 tabular-nums">
                    Page {source.page}
                  </div>

                  {/* Document Page Thumbnail Simulation with Highlighted Line */}
                  <div className="p-2 bg-white border border-[#E4E7EC] rounded-[6px] space-y-1">
                    <div className="h-1 bg-[#F2F4F7] rounded-full w-full" />
                    <div className="h-1 bg-[#F2F4F7] rounded-full w-4/5" />
                    {/* Highlighted matching sentence */}
                    <div className="bg-[#FFF4ED] border-l-2 border-[#FF6B35] pl-1 py-0.5">
                      <p className="text-[10px] text-[#101828] leading-tight line-clamp-3">
                        {source.excerpt}
                      </p>
                    </div>
                    <div className="h-1 bg-[#F2F4F7] rounded-full w-3/4" />
                    <div className="h-1 bg-[#F2F4F7] rounded-full w-2/3" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-3 border-t border-[#E4E7EC] text-[11px] text-[#667085] flex items-center justify-between">
          <span>Qdrant cosine retrieval</span>
          <span className="text-[#12B76A] font-medium">Grounding active</span>
        </div>
      </div>
    </div>
  );
};

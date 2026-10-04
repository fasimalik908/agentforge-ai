import React, { useState } from 'react';
import { X, Bot, ShieldCheck, Check } from 'lucide-react';
import { Agent } from '../types';
import { useToast } from './Toast';

interface NewAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAgent: (newAgent: Agent) => void;
}

export const NewAgentModal: React.FC<NewAgentModalProps> = ({
  isOpen,
  onClose,
  onSaveAgent
}) => {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [model, setModel] = useState('GPT-4o');
  const [isPrivate, setIsPrivate] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a specialized enterprise AI agent. Follow operational SOPs rigorously and provide exact document citations.'
  );
  const [temperature, setTemperature] = useState(0.2);
  const [selectedTools, setSelectedTools] = useState<string[]>(['Qdrant RAG', 'Slack Alerts']);

  if (!isOpen) return null;

  const availableTools = [
    { id: 'Qdrant RAG', label: 'Qdrant RAG', desc: 'Ground answers in uploaded enterprise docs' },
    { id: 'HubSpot CRM', label: 'HubSpot CRM', desc: 'Read and update contacts and deals' },
    { id: 'PostgreSQL Query', label: 'PostgreSQL read replica', desc: 'Query operational tables with safety bounds' },
    { id: 'Slack Alerts', label: 'Slack incident notifier', desc: 'Post alerts to targeted channels' }
  ];

  const presets = [
    {
      name: 'Customer support',
      desc: 'Tier-1 customer ticket resolution with citations.',
      model: 'GPT-4o',
      private: false,
      tools: ['Qdrant RAG', 'Slack Alerts']
    },
    {
      name: 'Internal policy',
      desc: 'On-premise advisor for benefits and conduct.',
      model: 'Llama 3.3 70B',
      private: true,
      tools: ['Qdrant RAG', 'PostgreSQL Query']
    },
    {
      name: 'Invoice reconciler',
      desc: 'Parses vendor invoices against ERP purchase orders.',
      model: 'DeepSeek V3',
      private: false,
      tools: ['PostgreSQL Query', 'Slack Alerts']
    }
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    setName(preset.name);
    setDescription(preset.desc);
    setModel(preset.model);
    setIsPrivate(preset.private);
    setSelectedTools(preset.tools);
    addToast('Preset applied', preset.name, 'info');
  };

  const toggleTool = (toolId: string) => {
    if (selectedTools.includes(toolId)) {
      setSelectedTools(selectedTools.filter(t => t !== toolId));
    } else {
      setSelectedTools([...selectedTools, toolId]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const agent: Agent = {
      id: `agent_${Date.now()}`,
      name: name.trim(),
      description: description.trim() || 'Custom automated business process agent.',
      model: isPrivate ? `${model} (Private)` : model,
      modelType: isPrivate ? 'private' : 'cloud',
      status: 'active',
      uptime: '100.0%',
      queriesCount: 0,
      avgLatency: isPrivate ? '0.84s' : '1.18s',
      lastRun: 'Just now',
      isPrivate,
      systemPrompt,
      tools: selectedTools,
      temperature
    };

    onSaveAgent(agent);
    addToast('Agent created', agent.name, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="w-full max-w-xl bg-white border border-[#E4E7EC] rounded-[10px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E4E7EC]">
          <h2 className="text-sm font-semibold text-[#101828]">New agent</h2>
          <button 
            onClick={onClose} 
            className="text-[#667085] hover:text-[#101828] p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="px-5 py-2 bg-[#F9FAFB] border-b border-[#E4E7EC] flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-[#667085] shrink-0 text-[11px]">Templates:</span>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(preset)}
              className="px-2 py-0.5 bg-white hover:bg-[#F2F4F7] text-[#344054] rounded-[6px] border border-[#E4E7EC] text-[11px] whitespace-nowrap transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-5 space-y-3.5 max-h-[70vh] overflow-y-auto text-xs">
          {/* Name & Private Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#344054] font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Audit Agent"
                className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[#344054] font-medium mb-1">
                Deployment
              </label>
              <div 
                onClick={() => setIsPrivate(!isPrivate)}
                className={`p-1.5 rounded-[8px] border cursor-pointer flex items-center justify-between transition-colors ${
                  isPrivate
                    ? 'bg-[#EEF2FF] border-[#3B5BFF] text-[#3B5BFF]'
                    : 'bg-[#F9FAFB] border-[#E4E7EC] text-[#667085]'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">Private (On-premise)</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center ${
                  isPrivate ? 'bg-[#3B5BFF] border-[#3B5BFF] text-white' : 'border-[#D0D5DD]'
                }`}>
                  {isPrivate && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#344054] font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              placeholder="Short description of task"
              className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Model Selection & Temperature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#344054] font-medium mb-1">
                Model
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-2 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
              >
                <option value="GPT-4o">GPT-4o</option>
                <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                <option value="Llama 3.3 70B">Llama 3.3 70B</option>
                <option value="Qwen 2.5 32B">Qwen 2.5 32B</option>
                <option value="DeepSeek V3">DeepSeek V3</option>
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[#344054] font-medium">Temperature</label>
                <span className="font-mono text-[#3B5BFF]">{temperature}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-[#3B5BFF] cursor-pointer"
              />
            </div>
          </div>

          {/* System Prompt */}
          <div>
            <label className="block text-[#344054] font-medium mb-1">
              Instructions
            </label>
            <textarea
              rows={2}
              className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] font-mono focus:outline-none focus:border-[#3B5BFF] resize-none"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
            />
          </div>

          {/* Tools */}
          <div>
            <label className="block text-[#344054] font-medium mb-1.5">
              Connected tools
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availableTools.map((tool) => {
                const isSelected = selectedTools.includes(tool.id);
                return (
                  <div
                    key={tool.id}
                    onClick={() => toggleTool(tool.id)}
                    className={`p-2 rounded-[8px] border cursor-pointer flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-[#EEF2FF] border-[#3B5BFF] text-[#101828]'
                        : 'bg-[#F9FAFB] border-[#E4E7EC] text-[#667085]'
                    }`}
                  >
                    <span className="text-xs font-medium truncate">{tool.label}</span>
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-[#3B5BFF] border-[#3B5BFF] text-white' : 'border-[#D0D5DD]'
                    }`}>
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-[#344054] hover:text-[#101828] bg-white border border-[#E4E7EC] rounded-[8px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!name.trim()}
              className="px-3.5 py-1.5 text-xs font-medium text-white bg-[#3B5BFF] hover:bg-[#2E49E6] disabled:opacity-50 rounded-[8px] shadow-xs"
            >
              Deploy agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

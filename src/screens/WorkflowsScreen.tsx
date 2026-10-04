import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  GitFork, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  Save, 
  ZoomIn, 
  ZoomOut,
  ChevronRight
} from 'lucide-react';
import { WORKFLOW_NODES } from '../data/mockData';
import { WorkflowNode } from '../types';
import { useToast } from '../components/Toast';
import { 
  GmailLogo, 
  SlackLogo, 
  OpenAILogo, 
  GeminiLogo, 
  ClaudeLogo, 
  MetaLogo, 
  HubSpotLogo 
} from '../components/BrandLogos';

export const WorkflowsScreen: React.FC = () => {
  const { addToast } = useToast();
  const [nodes, setNodes] = useState<WorkflowNode[]>(WORKFLOW_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node_triage');
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];
  const [editName, setEditName] = useState(selectedNode.name);
  const [editDescription, setEditDescription] = useState(selectedNode.description);
  const [editModel, setEditModel] = useState(selectedNode.model || 'GPT-4o mini');

  React.useEffect(() => {
    setEditName(selectedNode.name);
    setEditDescription(selectedNode.description);
    setEditModel(selectedNode.model || 'GPT-4o mini');
  }, [selectedNodeId, selectedNode]);

  const handleSaveNode = (e: React.FormEvent) => {
    e.preventDefault();
    setNodes(prev => prev.map(n => {
      if (n.id === selectedNodeId) {
        return {
          ...n,
          name: editName,
          description: editDescription,
          model: n.type === 'agent' ? editModel : undefined
        };
      }
      return n;
    }));
    addToast('Node saved', editName, 'success');
  };

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setActiveStepIndex(0);

    const steps = [
      'node_trigger',
      'node_triage',
      'node_condition',
      'node_research',
      'node_writer',
      'node_reviewer',
      'node_reply'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setActiveStepIndex(current);
        setSelectedNodeId(steps[current]);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setActiveStepIndex(-1);
        addToast('Workflow completed', 'Dispatched reply in 4.2s.', 'success');
      }
    }, 750);
  };

  const getNodeLogo = (iconType: string) => {
    switch (iconType) {
      case 'Gmail': return <GmailLogo className="w-4 h-4" />;
      case 'Slack': return <SlackLogo className="w-4 h-4" />;
      case 'HubSpot': return <HubSpotLogo className="w-4 h-4" />;
      case 'OpenAI': return <OpenAILogo className="w-4 h-4 text-[#10A37F]" />;
      case 'Claude': return <ClaudeLogo className="w-4 h-4 text-[#D97706]" />;
      case 'Gemini': return <GeminiLogo className="w-4 h-4 text-[#3B5BFF]" />;
      case 'Meta': return <MetaLogo className="w-4 h-4 text-[#0668E1]" />;
      case 'Branch': return <GitFork className="w-4 h-4 text-[#F79009]" />;
      default: return <GmailLogo className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-[calc(100vh-7.5rem)] flex flex-col space-y-4">
      {/* Top Workflow Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-[10px] border border-[#E4E7EC] card-shadow">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[8px] bg-[#EEF2FF] text-[#3B5BFF] flex items-center justify-center">
            <GmailLogo className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#101828]">Support email autopilot</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#3B5BFF] hover:bg-[#2E49E6] disabled:opacity-50 text-white rounded-[8px] text-xs font-medium transition-all shadow-xs"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? `Step ${activeStepIndex + 1}/7` : 'Run test'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas and Settings Panel */}
      <div className="flex-1 flex flex-col lg:flex-row gap-5 overflow-hidden">
        {/* Visual Node Canvas - Light clean grid */}
        <div className="flex-1 bg-white rounded-[10px] border border-[#E4E7EC] p-6 relative overflow-auto card-shadow flex flex-col justify-center min-h-[440px]">
          {/* Subtle Light Grid Background */}
          <div 
            className="absolute inset-0 opacity-40 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#D0D5DD 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* SVG Connector Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            {/* Trigger -> Triage */}
            <path
              d="M 180 140 L 240 140"
              stroke={isRunning && activeStepIndex >= 1 ? '#3B5BFF' : '#E4E7EC'}
              strokeWidth={isRunning && activeStepIndex >= 1 ? '2.5' : '1.5'}
              fill="none"
            />
            {/* Triage -> Condition */}
            <path
              d="M 380 140 L 440 140"
              stroke={isRunning && activeStepIndex >= 2 ? '#3B5BFF' : '#E4E7EC'}
              strokeWidth={isRunning && activeStepIndex >= 2 ? '2.5' : '1.5'}
              fill="none"
            />
            {/* Condition -> Research */}
            <path
              d="M 580 140 L 640 140"
              stroke={isRunning && activeStepIndex >= 3 ? '#3B5BFF' : '#E4E7EC'}
              strokeWidth={isRunning && activeStepIndex >= 3 ? '2.5' : '1.5'}
              fill="none"
            />
            {/* Condition -> Escalate to Slack */}
            <path
              d="M 510 190 C 510 230, 510 245, 510 265"
              stroke="#F79009"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              fill="none"
            />
            {/* Research -> Writer */}
            <path
              d="M 780 140 L 840 140"
              stroke={isRunning && activeStepIndex >= 4 ? '#3B5BFF' : '#E4E7EC'}
              strokeWidth={isRunning && activeStepIndex >= 4 ? '2.5' : '1.5'}
              fill="none"
            />
            {/* Writer -> Reviewer */}
            <path
              d="M 980 140 L 1040 140"
              stroke={isRunning && activeStepIndex >= 5 ? '#3B5BFF' : '#E4E7EC'}
              strokeWidth={isRunning && activeStepIndex >= 5 ? '2.5' : '1.5'}
              fill="none"
            />
            {/* Reviewer -> Send Reply */}
            <path
              d="M 1180 140 L 1240 140"
              stroke={isRunning && activeStepIndex >= 6 ? '#3B5BFF' : '#E4E7EC'}
              strokeWidth={isRunning && activeStepIndex >= 6 ? '2.5' : '1.5'}
              fill="none"
            />
          </svg>

          {/* Interactive Nodes Layer */}
          <div className="relative z-10 flex items-center gap-6 min-w-[1360px] py-8 px-4">
            {nodes.filter(n => n.id !== 'node_slack_alert').map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              const isActiveInRun = activeStepIndex === index;

              return (
                <div key={node.id} className="relative flex flex-col items-center">
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-38 p-3.5 rounded-[10px] border transition-all cursor-pointer bg-white ${
                      isSelected
                        ? 'border-[#3B5BFF] ring-2 ring-[#3B5BFF]/15 shadow-sm'
                        : 'border-[#E4E7EC] hover:border-[#D0D5DD] shadow-xs'
                    } ${isActiveInRun ? 'ring-2 ring-[#12B76A] bg-[#ECFDF3]/40' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-6 h-6 rounded-[6px] bg-[#F5F6F8] flex items-center justify-center">
                        {getNodeLogo(node.icon)}
                      </div>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        isActiveInRun ? 'bg-[#12B76A] animate-ping' : 'bg-[#12B76A]'
                      }`} />
                    </div>

                    <div className="text-xs font-semibold text-[#101828] truncate mb-0.5">
                      {node.name}
                    </div>
                    <div className="text-[11px] text-[#667085] truncate mb-1">
                      {node.role}
                    </div>

                    {node.model && (
                      <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#F2F4F7] text-[#344054]">
                        {node.model}
                      </span>
                    )}
                  </div>

                  {/* Condition node child branch */}
                  {node.id === 'node_condition' && (
                    <div className="absolute top-28 flex flex-col items-center">
                      <span className="text-[10px] font-medium text-[#B54708] bg-[#FFFAEB] px-1.5 py-0.2 rounded border border-[#FEDF89] mb-3">
                        Priority = High
                      </span>
                      <div
                        onClick={() => setSelectedNodeId('node_slack_alert')}
                        className={`w-38 p-3.5 rounded-[10px] border transition-all cursor-pointer bg-white ${
                          selectedNodeId === 'node_slack_alert'
                            ? 'border-[#F79009] ring-2 ring-[#F79009]/20'
                            : 'border-[#E4E7EC] hover:border-[#D0D5DD]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="w-6 h-6 rounded-[6px] bg-[#F5F6F8] flex items-center justify-center">
                            <SlackLogo className="w-4 h-4" />
                          </div>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                        </div>
                        <div className="text-xs font-semibold text-[#101828]">Escalate to Slack</div>
                        <div className="text-[11px] text-[#667085]">#ops-urgent</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel: Selected Node Inspector */}
        <div className="w-full lg:w-72 bg-white rounded-[10px] border border-[#E4E7EC] p-4 flex flex-col justify-between shrink-0 card-shadow">
          <form onSubmit={handleSaveNode} className="space-y-3.5 text-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E7EC]">
              <h3 className="font-semibold text-[#101828]">Node settings</h3>
              <span className="text-[10px] font-mono text-[#667085] bg-[#F2F4F7] px-1.5 py-0.5 rounded">
                {selectedNode.type}
              </span>
            </div>

            <div>
              <label className="text-[11px] text-[#667085] block mb-1">Title</label>
              <input
                type="text"
                className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[11px] text-[#667085] block mb-1">Description</label>
              <textarea
                rows={2}
                className="w-full px-2.5 py-1.5 bg-[#F9FAFB] border border-[#E4E7EC] rounded-[8px] text-xs text-[#344054] focus:outline-none focus:border-[#3B5BFF] resize-none"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            </div>

            {selectedNode.type === 'agent' && (
              <div>
                <label className="text-[11px] text-[#667085] block mb-1">Model</label>
                <select
                  value={editModel}
                  onChange={(e) => setEditModel(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] focus:outline-none focus:border-[#3B5BFF]"
                >
                  <option value="GPT-4o mini">GPT-4o mini</option>
                  <option value="GPT-4o">GPT-4o</option>
                  <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                  <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                  <option value="Llama 3.3 (Private)">Llama 3.3 (Private)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-1.5 bg-[#F2F4F7] hover:bg-[#E4E7EC] text-[#101828] rounded-[8px] text-xs font-medium transition-colors"
            >
              Save settings
            </button>
          </form>

          <div className="pt-3 border-t border-[#E4E7EC] text-[11px] text-[#667085] flex items-center justify-between">
            <span>SLA timeout: 10s</span>
            <span>Retry: 3x</span>
          </div>
        </div>
      </div>
    </div>
  );
};

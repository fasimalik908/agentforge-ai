import React, { useState } from 'react';
import { 
  Search, 
  RotateCcw, 
  Copy, 
  Check, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { RUN_LOGS } from '../data/mockData';
import { RunLog } from '../types';
import { useToast } from '../components/Toast';

export const RunsLogsScreen: React.FC = () => {
  const { addToast } = useToast();
  const [runs, setRuns] = useState<RunLog[]>(RUN_LOGS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all');
  const [selectedRun, setSelectedRun] = useState<RunLog | null>(RUN_LOGS[0]);
  const [copied, setCopied] = useState(false);

  const filteredRuns = runs.filter(run => {
    const matchesSearch = run.id.toLowerCase().includes(search.toLowerCase()) ||
      run.agentName.toLowerCase().includes(search.toLowerCase()) ||
      run.trigger.toLowerCase().includes(search.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && run.status === statusFilter;
  });

  const handleCopyTrace = () => {
    if (!selectedRun) return;
    navigator.clipboard.writeText(JSON.stringify(selectedRun, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast('Trace JSON copied', undefined, 'info');
  };

  return (
    <div className="space-y-4">
      {/* Controls & Metrics Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#98A2B3] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search run ID or agent..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs text-[#101828] placeholder-[#98A2B3] focus:outline-none focus:border-[#3B5BFF]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-1 p-0.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs">
            {(['all', 'success', 'failed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-[6px] capitalize transition-colors ${
                  statusFilter === st
                    ? 'bg-[#F2F4F7] text-[#101828] font-medium'
                    : 'text-[#667085] hover:text-[#101828]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#667085]">
          <span>Average latency: <strong className="text-[#101828] tabular-nums">1.38s</strong></span>
          <span>·</span>
          <span>Average tokens: <strong className="text-[#101828] tabular-nums">2,140</strong></span>
        </div>
      </div>

      {/* Main Split: Table on Left, Slide-over Trace Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Table of Runs */}
        <div className="lg:col-span-7 bg-white rounded-[10px] border border-[#E4E7EC] p-4 overflow-hidden card-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAECF0] text-[#667085]">
                  <th className="pb-2.5 font-medium">Run ID</th>
                  <th className="pb-2.5 font-medium">Agent</th>
                  <th className="pb-2.5 font-medium">Trigger</th>
                  <th className="pb-2.5 font-medium">Duration</th>
                  <th className="pb-2.5 font-medium">Tokens</th>
                  <th className="pb-2.5 font-medium">Cost</th>
                  <th className="pb-2.5 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                {filteredRuns.map((run) => {
                  const isSelected = selectedRun?.id === run.id;

                  return (
                    <tr
                      key={run.id}
                      onClick={() => setSelectedRun(run)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#F5F6F8]' 
                          : 'hover:bg-[#F9FAFB]'
                      }`}
                    >
                      <td className="py-2.5 font-mono text-[#3B5BFF] font-medium">
                        {run.id}
                      </td>
                      <td className="py-2.5 font-medium text-[#101828]">
                        {run.agentName}
                      </td>
                      <td className="py-2.5 text-[#667085]">
                        {run.trigger}
                      </td>
                      <td className="py-2.5 text-[#344054] tabular-nums">
                        {run.duration}
                      </td>
                      <td className="py-2.5 text-[#667085] tabular-nums">
                        {run.tokensUsed.toLocaleString()}
                      </td>
                      <td className="py-2.5 text-[#667085] tabular-nums">
                        {run.cost}
                      </td>
                      <td className="py-2.5 text-right">
                        {run.status === 'success' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#027A48]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#12B76A]" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#B42318]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F04438]" />
                            Failed
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Trace Drawer */}
        <div className="lg:col-span-5 bg-white rounded-[10px] border border-[#E4E7EC] p-4 flex flex-col justify-between card-shadow">
          {selectedRun ? (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between pb-2.5 border-b border-[#E4E7EC]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold text-[#101828]">
                    {selectedRun.id}
                  </span>
                  <span className="text-[11px] text-[#667085]">
                    {selectedRun.agentName}
                  </span>
                </div>

                <button
                  onClick={handleCopyTrace}
                  className="flex items-center gap-1 text-[11px] text-[#667085] hover:text-[#101828] px-2 py-1 rounded bg-[#F5F6F8]"
                >
                  {copied ? <Check className="w-3 h-3 text-[#12B76A]" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copied' : 'JSON'}</span>
                </button>
              </div>

              {/* Summary Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#F9FAFB] p-2 rounded-[8px] border border-[#EAECF0]">
                  <span className="text-[10px] text-[#667085] block">Latency</span>
                  <span className="font-semibold text-[#101828] tabular-nums">
                    {selectedRun.duration}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] p-2 rounded-[8px] border border-[#EAECF0]">
                  <span className="text-[10px] text-[#667085] block">Tokens</span>
                  <span className="font-semibold text-[#101828] tabular-nums">
                    {selectedRun.tokensUsed.toLocaleString()}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] p-2 rounded-[8px] border border-[#EAECF0]">
                  <span className="text-[10px] text-[#667085] block">Cost</span>
                  <span className="font-semibold text-[#12B76A] tabular-nums">
                    {selectedRun.cost}
                  </span>
                </div>
              </div>

              {/* Chronological Step-by-Step Trace */}
              <div>
                <span className="text-xs font-semibold text-[#101828] block mb-2">
                  Execution timeline
                </span>

                <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                  {selectedRun.trace.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-[#101828] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3B5BFF]" />
                          {step.step}
                        </span>
                        <span className="text-[#667085] text-[11px] tabular-nums">
                          {step.duration}
                        </span>
                      </div>

                      <p className="text-[11px] text-[#667085] leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-xs text-[#667085]">
              Select a run to inspect its execution trace.
            </div>
          )}

          <div className="pt-3 border-t border-[#E4E7EC] text-[11px] text-[#667085]">
            Verified audit log
          </div>
        </div>
      </div>
    </div>
  );
};

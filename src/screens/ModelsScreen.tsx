import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  CartesianGrid 
} from 'recharts';
import { CONNECTED_MODELS } from '../data/mockData';
import { ModelInfo } from '../types';
import { 
  OpenAILogo, 
  ClaudeLogo, 
  GeminiLogo, 
  MetaLogo, 
  QwenLogo, 
  DeepSeekLogo, 
  MistralLogo 
} from '../components/BrandLogos';

export const ModelsScreen: React.FC = () => {
  const [models, setModels] = useState<ModelInfo[]>(CONNECTED_MODELS);
  const [filterType, setFilterType] = useState<'all' | 'cloud' | 'private'>('all');

  const filteredModels = models.filter(m => {
    if (filterType === 'cloud') return !m.isPrivate;
    if (filterType === 'private') return m.isPrivate;
    return true;
  });

  const chartData = models.map(m => ({
    name: m.name.split(' ')[0],
    queries: m.monthlyQueries,
    isPrivate: m.isPrivate
  }));

  const getModelLogo = (name: string) => {
    if (name.includes('GPT')) return <OpenAILogo className="w-4 h-4 text-[#10A37F]" />;
    if (name.includes('Claude')) return <ClaudeLogo className="w-4 h-4 text-[#D97706]" />;
    if (name.includes('Gemini')) return <GeminiLogo className="w-4 h-4 text-[#3B5BFF]" />;
    if (name.includes('Llama')) return <MetaLogo className="w-4 h-4 text-[#0668E1]" />;
    if (name.includes('Qwen')) return <QwenLogo className="w-4 h-4 text-[#7C3AED]" />;
    if (name.includes('DeepSeek')) return <DeepSeekLogo className="w-4 h-4 text-[#0EA5E9]" />;
    return <MistralLogo className="w-4 h-4 text-[#F79009]" />;
  };

  return (
    <div className="space-y-5">
      {/* Usage by Model Bar Chart - Light, clean, thin grid */}
      <div className="p-5 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#101828]">Monthly queries by model</h2>
          <span className="text-xs text-[#667085] tabular-nums">
            47,912 total
          </span>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid stroke="#F2F4F7" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#98A2B3" 
                fontSize={11} 
                tickLine={false} 
                axisLine={{ stroke: '#E4E7EC' }}
              />
              <YAxis 
                stroke="#98A2B3" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-[#101828] text-white p-2 rounded-[6px] text-xs shadow-md">
                        <div className="font-medium text-slate-300">{label}</div>
                        <div className="text-white font-semibold tabular-nums">
                          {Number(payload[0].value).toLocaleString()} queries
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="queries" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.isPrivate ? '#12B76A' : '#3B5BFF'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center gap-6 pt-3 border-t border-[#F2F4F7] text-xs text-[#667085]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#3B5BFF]" />
            <span>Cloud APIs</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-[#12B76A]" />
            <span>Private / On-premise</span>
          </div>
        </div>
      </div>

      {/* Model Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-0.5 bg-white border border-[#E4E7EC] rounded-[8px] text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1 rounded-[6px] transition-colors ${
              filterType === 'all'
                ? 'bg-[#F2F4F7] text-[#101828] font-medium'
                : 'text-[#667085] hover:text-[#101828]'
            }`}
          >
            All ({models.length})
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

      {/* Connected Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="p-5 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow flex flex-col justify-between hover:border-[#D0D5DD] transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[8px] bg-[#F5F6F8] flex items-center justify-center shrink-0 border border-[#E4E7EC]">
                    {getModelLogo(model.name)}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#101828]">
                      {model.name}
                    </h3>
                    <span className="text-[11px] text-[#667085]">{model.provider}</span>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                  model.isPrivate
                    ? 'bg-[#ECFDF3] text-[#027A48]'
                    : 'bg-[#F2F4F7] text-[#344054]'
                }`}>
                  {model.isPrivate ? 'Private' : 'Cloud'}
                </span>
              </div>

              <p className="text-xs text-[#667085] line-clamp-1 mb-3">
                {model.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#F2F4F7] text-xs">
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-[#F9FAFB] p-1.5 rounded-[6px] border border-[#EAECF0]">
                  <span className="text-[10px] text-[#667085] block">Latency</span>
                  <span className="font-semibold text-[#101828] tabular-nums">
                    {model.latencyTTFT}
                  </span>
                </div>
                <div className="bg-[#F9FAFB] p-1.5 rounded-[6px] border border-[#EAECF0]">
                  <span className="text-[10px] text-[#667085] block">Context</span>
                  <span className="font-semibold text-[#101828] tabular-nums">
                    {model.contextWindow}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-[#667085]">Cost / 1M:</span>
                <span className="font-medium text-[#101828] tabular-nums">{model.costPer1MTokens}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ExternalLink
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid
} from 'recharts';
import { 
  OVERVIEW_STATS, 
  QUERIES_30_DAYS, 
  QUERIES_BY_AGENT, 
  RECENT_ACTIVITY, 
  INITIAL_AGENTS 
} from '../data/mockData';
import { NavScreen, Agent } from '../types';

interface OverviewScreenProps {
  onNavigate: (screen: NavScreen) => void;
  onSelectAgent?: (agent: Agent) => void;
}

export const OverviewScreen: React.FC<OverviewScreenProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-5">
      {/* 4 Stat Cards with Sparklines - Clean, No subtitle clutter */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {OVERVIEW_STATS.map((stat) => (
          <div
            key={stat.id}
            className="p-4 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow"
          >
            <div className="flex items-center justify-between text-[#667085] mb-1.5">
              <span className="text-xs font-medium text-[#667085]">{stat.title}</span>
              <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-[4px] text-[11px] font-medium tabular-nums ${
                stat.isPositive ? 'bg-[#ECFDF3] text-[#027A48]' : 'bg-[#FEF3F2] text-[#B42318]'
              }`}>
                {stat.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </span>
            </div>

            <div className="flex items-end justify-between">
              <div className="text-2xl font-semibold text-[#101828] tabular-nums tracking-tight">
                {stat.value}
              </div>

              {/* Sparkline (Taller ~32px, 1.5px stroke, dot on last point) */}
              {stat.sparkline && (
                <div className="w-20 h-8 pb-0.5">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stat.sparkline.map((v, i) => ({ i, v }))}>
                      <Line 
                        type="monotone" 
                        dataKey="v" 
                        stroke="#3B5BFF" 
                        strokeWidth={1.5} 
                        dot={(props: any) => {
                          if (props.index === stat.sparkline.length - 1) {
                            return (
                              <circle 
                                key={`dot-${props.index}`} 
                                cx={props.cx} 
                                cy={props.cy} 
                                r={2.5} 
                                fill="#3B5BFF" 
                                stroke="#FFFFFF" 
                                strokeWidth={1.5} 
                              />
                            );
                          }
                          return <React.Fragment key={`dot-${props.index}`} />;
                        }}
                        isAnimationActive={false} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section: 30-Day Line Chart + Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Line Chart: Queries per Day - Light, clean, thin line, no gradient washes */}
        <div className="lg:col-span-2 p-5 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[#101828]">Daily queries</h2>
            <div className="flex items-center gap-1.5 text-xs text-[#667085]">
              <span>Past 30 days</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={QUERIES_30_DAYS} margin={{ top: 10, right: 10, left: -10, bottom: 22 }}>
                <CartesianGrid stroke="#F2F4F7" strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  stroke="#98A2B3" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={{ stroke: '#E4E7EC' }}
                  interval={4}
                  dy={6}
                />
                <YAxis 
                  stroke="#98A2B3" 
                  fontSize={11} 
                  tickLine={false}
                  axisLine={false}
                  domain={[600, 3400]}
                  dx={-4}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-[#101828] text-white p-2 rounded-[6px] shadow-md text-xs">
                          <div className="font-medium text-slate-300 mb-0.5">{label}</div>
                          <div className="text-white font-semibold tabular-nums">
                            {Number(payload[0].value).toLocaleString()} queries
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="queries" 
                  stroke="#3B5BFF" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#3B5BFF', strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart: Queries by Agent - Total in center, 2px gap, all 6 in legend */}
        <div className="p-5 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-[#101828]">Queries by agent</h2>
            </div>

            <div className="h-44 w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={QUERIES_BY_AGENT}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={68}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {QUERIES_BY_AGENT.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0];
                        const pct = ((Number(data.value) / 47912) * 100).toFixed(1);
                        return (
                          <div className="bg-[#101828] text-white p-2 rounded-[6px] text-xs shadow-md">
                            <div className="font-medium">{data.name}</div>
                            <div className="text-slate-200 tabular-nums">
                              {Number(data.value).toLocaleString()} queries ({pct}%)
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Total queries in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-lg font-bold text-[#101828] tabular-nums tracking-tight">47,912</span>
                <span className="text-[10px] text-[#667085]">queries</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 pt-2.5 border-t border-[#F2F4F7]">
            {QUERIES_BY_AGENT.map((item) => {
              const pct = ((item.value / 47912) * 100).toFixed(1);
              return (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[#344054] truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[#101828] tabular-nums font-medium">{item.value.toLocaleString()}</span>
                    <span className="text-[#667085] tabular-nums w-10 text-right">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity & Agent Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Activity List */}
        <div className="p-5 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#101828]">Recent activity</h2>
            <button 
              onClick={() => onNavigate('runs')}
              className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 font-medium"
            >
              All logs <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {RECENT_ACTIVITY.map((act) => (
              <div key={act.id} className="p-2.5 bg-[#F9FAFB] rounded-[8px] border border-[#EAECF0] hover:border-[#D0D5DD] transition-colors">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <span className="text-xs font-medium text-[#101828] leading-snug">{act.title}</span>
                  <span className="text-[10px] text-[#667085] shrink-0 tabular-nums">{act.timestamp}</span>
                </div>
                <p className="text-[11px] text-[#667085] line-clamp-1">{act.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Health Table */}
        <div className="lg:col-span-2 p-5 bg-white rounded-[10px] border border-[#E4E7EC] card-shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[#101828]">Agent health</h2>
            <button
              onClick={() => onNavigate('agents')}
              className="text-xs text-[#3B5BFF] hover:underline flex items-center gap-1 font-medium"
            >
              Manage fleet <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EAECF0] text-[#667085]">
                  <th className="pb-2.5 font-medium">Agent</th>
                  <th className="pb-2.5 font-medium">Status</th>
                  <th className="pb-2.5 font-medium">Model</th>
                  <th className="pb-2.5 font-medium">Uptime</th>
                  <th className="pb-2.5 font-medium text-right">Queries</th>
                  <th className="pb-2.5 font-medium text-right">Avg latency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F2F4F7]">
                {INITIAL_AGENTS.map((agent) => (
                  <tr key={agent.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-2.5 font-medium text-[#101828]">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          agent.status === 'active' ? 'bg-[#12B76A]' : 'bg-[#F79009]'
                        }`} />
                        <span className="truncate">{agent.name}</span>
                        {agent.isPrivate && (
                          <span className="text-[10px] px-1.5 py-0.2 bg-[#F2F4F7] text-[#344054] rounded font-medium">
                            Private
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-2.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.2 rounded-full text-[10px] font-medium ${
                        agent.status === 'active'
                          ? 'bg-[#ECFDF3] text-[#027A48]'
                          : 'bg-[#FFFAEB] text-[#B54708]'
                      }`}>
                        {agent.status === 'active' ? 'Healthy' : 'Standby'}
                      </span>
                    </td>
                    <td className="py-2.5 text-[#667085]">
                      {agent.model.replace(' (Private)', '')}
                    </td>
                    <td className="py-2.5 text-[#344054] tabular-nums">
                      {agent.uptime}
                    </td>
                    <td className="py-2.5 text-right text-[#344054] tabular-nums">
                      {agent.queriesCount.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right text-[#667085] tabular-nums">
                      {agent.avgLatency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

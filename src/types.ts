export type NavScreen = 
  | 'overview'
  | 'agents'
  | 'knowledge'
  | 'playground'
  | 'workflows'
  | 'mcp'
  | 'integrations'
  | 'runs'
  | 'models'
  | 'settings';

export interface StatCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  sparkline?: number[];
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  model: string;
  modelType: 'cloud' | 'private';
  status: 'active' | 'paused' | 'standby';
  uptime: string;
  queriesCount: number;
  avgLatency: string;
  lastRun: string;
  isPrivate?: boolean;
  systemPrompt: string;
  tools: string[];
  temperature: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  size: string;
  pages: number;
  chunks: number;
  status: 'indexed' | 'processing' | 'failed';
  progress?: number;
  lastUpdated: string;
  type: 'pdf' | 'docx' | 'md' | 'txt';
  previewChunks?: {
    id: string;
    chunkIndex: number;
    text: string;
    tokens: number;
    similarityScore: number;
  }[];
}

export interface VectorStoreInfo {
  provider: string;
  collection: string;
  totalChunks: number;
  embeddingModel: string;
  dimensions: number;
  distanceMetric: string;
  lastSync: string;
  mrrScore: number;
  top3Precision: number;
  avgLatencyMs: number;
}

export interface CitationSource {
  id: number;
  docName: string;
  page: number;
  section: string;
  excerpt: string;
  confidence: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  citations?: CitationSource[];
}

export interface WorkflowNode {
  id: string;
  name: string;
  role: string;
  type: 'trigger' | 'agent' | 'condition' | 'action';
  model?: string;
  description: string;
  icon: string;
  status: 'idle' | 'running' | 'completed' | 'failed';
  x: number;
  y: number;
  tools?: string[];
  outputSchema?: string;
  temperature?: number;
  branchTrue?: string;
  branchFalse?: string;
}

export interface McpServer {
  id: string;
  name: string;
  clientType: string;
  status: 'connected' | 'syncing' | 'error';
  transport: 'SSE' | 'stdio' | 'Streamable HTTP';
  permission: 'Read-only' | 'Read-write';
  isSecure: boolean;
  securityMethod: string;
  latency: string;
  endpoint: string;
  tools: {
    name: string;
    description: string;
    parameters: string;
  }[];
}

export interface Integration {
  id: string;
  name: string;
  category: 'crm' | 'communication' | 'storage' | 'developer' | 'payments';
  description: string;
  connected: boolean;
  lastSync?: string;
  iconType: string;
  authType: string;
}

export interface RunLog {
  id: string;
  agentName: string;
  trigger: 'API Request' | 'Scheduled Cron' | 'Webhook' | 'Playground' | 'Workflow';
  duration: string;
  tokensUsed: number;
  cost: string;
  status: 'success' | 'failed' | 'running';
  timestamp: string;
  trace: {
    step: string;
    type: 'guardrail' | 'retrieval' | 'tool_call' | 'llm_call' | 'output';
    duration: string;
    tokens?: number;
    details: string;
    payload?: any;
  }[];
}

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  deployment: 'Cloud API' | 'Private • On-Premise';
  isPrivate: boolean;
  latencyTTFT: string;
  costPer1MTokens: string;
  contextWindow: string;
  status: 'Active' | 'Standby';
  description: string;
  monthlyQueries: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'AI Engineer' | 'Compliance Director' | 'DevOps Lead' | 'Viewer';
  avatar: string;
  status: 'Active' | 'Invited';
  twoFactorEnabled: boolean;
}

export interface ApiKeyItem {
  id: string;
  name: string;
  prefix: string;
  created: string;
  lastUsed: string;
  environment: 'Production' | 'Staging' | 'Development';
}

import { 
  Agent, 
  DocumentItem, 
  VectorStoreInfo, 
  CitationSource, 
  WorkflowNode, 
  McpServer, 
  Integration, 
  RunLog, 
  ModelInfo, 
  TeamMember, 
  ApiKeyItem 
} from '../types';

export const OVERVIEW_STATS = [
  {
    id: 'active_agents',
    title: 'Active agents',
    value: '12',
    change: '+2',
    isPositive: true,
    sparkline: [7, 9, 8, 10, 8, 11, 9, 10, 11, 10, 12]
  },
  {
    id: 'queries_month',
    title: 'Queries this month',
    value: '47,912',
    change: '+18.4%',
    isPositive: true,
    sparkline: [31200, 36400, 33100, 41200, 38900, 44800, 42100, 48200, 45100, 47912]
  },
  {
    id: 'response_time',
    title: 'Average response time',
    value: '1.38s',
    change: '-0.16s',
    isPositive: true,
    sparkline: [1.84, 1.62, 1.76, 1.51, 1.68, 1.44, 1.55, 1.35, 1.42, 1.38]
  },
  {
    id: 'answer_accuracy',
    title: 'Answer accuracy',
    value: '96.4%',
    change: '+1.2%',
    isPositive: true,
    sparkline: [92.8, 94.6, 93.4, 95.8, 94.2, 96.1, 95.0, 96.8, 95.9, 96.4]
  }
];

// Realistic daily queries with clear weekend drops, natural weekday noise, two spikes, and gentle upward trend
export const QUERIES_30_DAYS = [
  { date: 'Sep 05', queries: 1480, cost: 3.98 },
  { date: 'Sep 06', queries: 820, cost: 2.15 },  // Weekend drop
  { date: 'Sep 07', queries: 740, cost: 1.95 },  // Weekend drop
  { date: 'Sep 08', queries: 1650, cost: 4.42 },
  { date: 'Sep 09', queries: 1820, cost: 4.88 },
  { date: 'Sep 10', queries: 1940, cost: 5.21 },
  { date: 'Sep 11', queries: 1790, cost: 4.80 },
  { date: 'Sep 12', queries: 1880, cost: 5.05 },
  { date: 'Sep 13', queries: 910, cost: 2.44 },  // Weekend drop
  { date: 'Sep 14', queries: 860, cost: 2.30 },  // Weekend drop
  { date: 'Sep 15', queries: 2120, cost: 5.72 },
  { date: 'Sep 16', queries: 2240, cost: 6.02 },
  { date: 'Sep 17', queries: 2940, cost: 7.90 }, // Launch spike
  { date: 'Sep 18', queries: 2460, cost: 6.60 },
  { date: 'Sep 19', queries: 2190, cost: 5.89 },
  { date: 'Sep 20', queries: 980, cost: 2.62 },  // Weekend drop
  { date: 'Sep 21', queries: 940, cost: 2.51 },  // Weekend drop
  { date: 'Sep 22', queries: 2280, cost: 6.14 },
  { date: 'Sep 23', queries: 2340, cost: 6.29 },
  { date: 'Sep 24', queries: 2410, cost: 6.48 },
  { date: 'Sep 25', queries: 2520, cost: 6.78 },
  { date: 'Sep 26', queries: 2380, cost: 6.39 },
  { date: 'Sep 27', queries: 1020, cost: 2.74 }, // Weekend drop
  { date: 'Sep 28', queries: 990, cost: 2.65 },  // Weekend drop
  { date: 'Sep 29', queries: 2490, cost: 6.70 },
  { date: 'Sep 30', queries: 2640, cost: 7.10 },
  { date: 'Oct 01', queries: 3180, cost: 8.55 }, // End of quarter batch sync spike
  { date: 'Oct 02', queries: 2590, cost: 6.96 },
  { date: 'Oct 03', queries: 2680, cost: 7.22 },
  { date: 'Oct 04', queries: 1120, cost: 3.01 }  // Weekend drop
];

export const QUERIES_BY_AGENT = [
  { name: 'Support Assistant', value: 20120, color: '#3B5BFF' },
  { name: 'Contract Reviewer', value: 11430, color: '#6366F1' },
  { name: 'Sales Research', value: 7680, color: '#0EA5E9' },
  { name: 'Invoice Triage', value: 4790, color: '#F79009' },
  { name: 'HR Policy Bot', value: 2410, color: '#12B76A' },
  { name: 'Report Generator', value: 1482, color: '#EC4899' }
];

export const RECENT_ACTIVITY = [
  {
    id: 'act_1',
    title: 'Support Agent resolved ticket #4821',
    description: 'Auto-drafted refund terms with citation from Refund Policy.pdf',
    timestamp: '2m ago',
    type: 'success',
    agent: 'Support Assistant'
  },
  {
    id: 'act_2',
    title: 'Knowledge Base re-indexed: Product Manual v3.pdf',
    description: 'Generated 3,420 vector chunks via text-embedding-3-large',
    timestamp: '18m ago',
    type: 'info',
    agent: 'Knowledge Base'
  },
  {
    id: 'act_3',
    title: 'Invoice Triage flagged discrepancy in INV-9042',
    description: 'Tax mismatch of $420.00 between vendor PDF and PO #8812',
    timestamp: '45m ago',
    type: 'warning',
    agent: 'Invoice Triage Agent'
  },
  {
    id: 'act_4',
    title: 'HR Policy Bot answered parental leave inquiry',
    description: 'Resolved confidential staff query on-premise without external routing',
    timestamp: '2h ago',
    type: 'success',
    agent: 'HR Policy Bot'
  },
  {
    id: 'act_5',
    title: 'Security audit passed for Qwen private cluster',
    description: 'Zero data leakage verified in isolated vLLM sandbox test',
    timestamp: 'Yesterday',
    type: 'success',
    agent: 'Audit Daemon'
  }
];

export const INITIAL_AGENTS: Agent[] = [
  {
    id: 'agent_support',
    name: 'Support Assistant',
    description: 'Resolves tier-1 customer inquiries with exact knowledge base citations.',
    model: 'GPT-4o',
    modelType: 'cloud',
    status: 'active',
    uptime: '99.98%',
    queriesCount: 20120,
    avgLatency: '1.12s',
    lastRun: '2m ago',
    systemPrompt: 'You are the official AgentForge Tier-1 & Tier-2 Support Assistant. Always anchor responses strictly to verified documents. Always provide bracketed citations [1], [2] when referencing policies, timelines, or pricing.',
    tools: ['Zendesk API', 'Refund Calculator', 'Qdrant RAG'],
    temperature: 0.2
  },
  {
    id: 'agent_contract',
    name: 'Contract Reviewer',
    description: 'Scans enterprise MSAs, liability caps, and termination thresholds.',
    model: 'Claude 3.5 Sonnet',
    modelType: 'cloud',
    status: 'active',
    uptime: '99.95%',
    queriesCount: 11430,
    avgLatency: '1.58s',
    lastRun: '14m ago',
    systemPrompt: 'You are an enterprise legal intelligence assistant. Analyze legal instruments for liability caps, GDPR data processing addenda, and termination clauses.',
    tools: ['DocuSign Parser', 'Google Drive Reader', 'Legal Clause Classifier'],
    temperature: 0.1
  },
  {
    id: 'agent_sales',
    name: 'Sales Research Agent',
    description: 'Enriches inbound leads with 10-K filings, headcount, and tech stacks.',
    model: 'Gemini 1.5 Pro',
    modelType: 'cloud',
    status: 'active',
    uptime: '99.91%',
    queriesCount: 7680,
    avgLatency: '1.26s',
    lastRun: '32m ago',
    systemPrompt: 'You are a B2B sales intelligence agent. Gather verifiable company revenue, headcount, software architecture, and current pain points to prep AE discovery calls.',
    tools: ['HubSpot CRM', 'Clearbit Signals', 'Web Fetcher'],
    temperature: 0.3
  },
  {
    id: 'agent_hr',
    name: 'HR Policy Bot',
    description: 'Private on-premise assistant for employee benefits, leave, and conduct.',
    model: 'Llama 3.3 70B (Private)',
    modelType: 'private',
    status: 'active',
    uptime: '100.0%',
    queriesCount: 2410,
    avgLatency: '0.84s',
    lastRun: '2h ago',
    isPrivate: true,
    systemPrompt: 'You are the internal HR Compliance Bot running entirely on private hardware. Employee data never leaves corporate boundaries. Reference Employee Handbook 2026 accurately.',
    tools: ['Workday RAG', 'Calendar Booker', 'Internal Wiki Fetcher'],
    temperature: 0.2
  },
  {
    id: 'agent_report',
    name: 'Report Generator',
    description: 'Compiles weekly infrastructure costs, margin analytics, and KPIs.',
    model: 'Qwen 2.5 32B',
    modelType: 'private',
    status: 'standby', // Warning state for human feel
    uptime: '98.40%',
    queriesCount: 1482,
    avgLatency: '2.14s',
    lastRun: 'Yesterday',
    isPrivate: true,
    systemPrompt: 'Compile dense multi-metric executive briefings with tables, trend analysis, and variance breakdowns for CFO and VP Operations review.',
    tools: ['PostgreSQL Connector', 'Stripe Metrics API', 'PDF Compiler'],
    temperature: 0.2
  },
  {
    id: 'agent_invoice',
    name: 'Invoice Triage Agent',
    description: 'Extracts invoice line items and matches against ERP purchase orders.',
    model: 'DeepSeek V3',
    modelType: 'cloud',
    status: 'active',
    uptime: '99.94%',
    queriesCount: 4790,
    avgLatency: '1.38s',
    lastRun: '45m ago',
    systemPrompt: 'Extract invoice numbers, vendor tax IDs, unit costs, and remit dates. Flag any variance >0.5% against signed purchase commitments.',
    tools: ['SAP NetWeaver', 'OCR OCRNet', 'Stripe Invoicing'],
    temperature: 0.1
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc_1',
    name: 'Employee Handbook 2026.pdf',
    size: '14.2 MB',
    pages: 84,
    chunks: 1240,
    status: 'indexed',
    lastUpdated: 'Yesterday',
    type: 'pdf',
    previewChunks: [
      {
        id: 'chk_101',
        chunkIndex: 12,
        text: 'Section 4.1: Remote Work & Equipment Stipend. All full-time distributed employees receive a recurring quarterly technology allowance of $650...',
        tokens: 184,
        similarityScore: 0.94
      }
    ]
  },
  {
    id: 'doc_2',
    name: 'Product Manual v3.pdf',
    size: '32.8 MB',
    pages: 210,
    chunks: 3420,
    status: 'indexed',
    lastUpdated: '18m ago',
    type: 'pdf',
    previewChunks: [
      {
        id: 'chk_201',
        chunkIndex: 45,
        text: 'Chapter 3: MCP Agent Architecture. Model Context Protocol enables bi-directional tool invocation over secure SSE and stdio IPC channels with sandboxed capability boundaries...',
        tokens: 240,
        similarityScore: 0.98
      }
    ]
  },
  {
    id: 'doc_3',
    name: 'Pricing & Plans.docx',
    size: '1.8 MB',
    pages: 14,
    chunks: 218,
    status: 'indexed',
    lastUpdated: 'Sep 28',
    type: 'docx',
    previewChunks: [
      {
        id: 'chk_301',
        chunkIndex: 8,
        text: 'Section 5.1: Mid-term Cancellations & Credits. Post 30-day cancellation requests qualify for prorated account credits applicable toward custom model compute, storage expansion, or subsequent billing cycles...',
        tokens: 176,
        similarityScore: 0.91
      }
    ]
  },
  {
    id: 'doc_4',
    name: 'Refund Policy.pdf',
    size: '4.5 MB',
    pages: 22,
    chunks: 412,
    status: 'indexed',
    lastUpdated: 'Oct 01',
    type: 'pdf',
    previewChunks: [
      {
        id: 'chk_401',
        chunkIndex: 4,
        text: 'Section 3.2: Annual Subscription Guarantees. Annual enterprise and team subscriptions are subject to a 30-calendar-day unconditional refund window from invoice issuance. Processing takes 3-5 business days back to the original billing instrument...',
        tokens: 210,
        similarityScore: 0.96
      }
    ]
  },
  {
    id: 'doc_5',
    name: 'Customer FAQ.md',
    size: '620 KB',
    pages: 8,
    chunks: 146,
    status: 'processing',
    progress: 72,
    lastUpdated: 'Just now',
    type: 'md'
  },
  {
    id: 'doc_6',
    name: 'Sales Playbook.pdf',
    size: '18.6 MB',
    pages: 116,
    chunks: 1890,
    status: 'indexed',
    lastUpdated: 'Sep 22',
    type: 'pdf'
  },
  {
    id: 'doc_7',
    name: 'Vendor Master Agreements 2025.pdf',
    size: '8.4 MB',
    pages: 44,
    chunks: 0,
    status: 'failed',
    lastUpdated: 'Sep 19',
    type: 'pdf'
  }
];

export const VECTOR_STORE_INFO: VectorStoreInfo = {
  provider: 'Qdrant Enterprise',
  collection: 'agentforge_primary_knowledge',
  totalChunks: 14820,
  embeddingModel: 'text-embedding-3-large',
  dimensions: 1536,
  distanceMetric: 'Cosine Similarity',
  lastSync: 'Today at 07:45 AM',
  mrrScore: 94.8,
  top3Precision: 98.2,
  avgLatencyMs: 42
};

export const PLAYGROUND_PRESET_SOURCES: CitationSource[] = [
  {
    id: 1,
    docName: 'Refund Policy.pdf',
    page: 4,
    section: 'Section 3.2 — Annual Subscription Guarantees',
    excerpt: 'Annual enterprise and team subscriptions are subject to a 30-calendar-day unconditional refund window from invoice issuance. Within this period, a 100% refund is processed back to the original billing instrument within 3 to 5 business days without penalties.',
    confidence: 96
  },
  {
    id: 2,
    docName: 'Pricing & Plans.docx',
    page: 8,
    section: 'Section 5.1 — Mid-term Cancellations & Credits',
    excerpt: 'For cancellation requests initiated beyond the initial 30-day guarantee period, clients are eligible for a prorated account credit based on remaining unutilized months. These credits may be applied toward token expansion packs, private model compute nodes, or future contract terms.',
    confidence: 91
  }
];

export const WORKFLOW_NODES: WorkflowNode[] = [
  {
    id: 'node_trigger',
    name: 'New Support Email',
    role: 'Gmail Webhook',
    type: 'trigger',
    description: 'Triggers on incoming email to support@apexlogistics.com.',
    icon: 'Gmail',
    status: 'completed',
    x: 40,
    y: 180,
    outputSchema: 'EmailObject { sender, subject, body }'
  },
  {
    id: 'node_triage',
    name: 'Triage Agent',
    role: 'Classification',
    type: 'agent',
    model: 'GPT-4o mini',
    description: 'Classifies urgency and intent.',
    icon: 'OpenAI',
    status: 'completed',
    x: 270,
    y: 180,
    tools: ['Sentiment Analyzer'],
    temperature: 0.1
  },
  {
    id: 'node_condition',
    name: 'Priority = High?',
    role: 'Router',
    type: 'condition',
    description: 'Checks if urgency score >= 80 or ARR >= $100k.',
    icon: 'Branch',
    status: 'completed',
    x: 500,
    y: 180,
    branchTrue: 'node_slack_alert',
    branchFalse: 'node_research'
  },
  {
    id: 'node_slack_alert',
    name: 'Escalate to Slack',
    role: 'Slack Alert',
    type: 'action',
    description: 'Dispatches emergency message to #ops-urgent.',
    icon: 'Slack',
    status: 'completed',
    x: 500,
    y: 350,
    tools: ['Slack Bot']
  },
  {
    id: 'node_research',
    name: 'Research Agent',
    role: 'RAG Retrieval',
    type: 'agent',
    model: 'Gemini 1.5 Pro',
    description: 'Queries Qdrant vectors and HubSpot.',
    icon: 'Gemini',
    status: 'running',
    x: 730,
    y: 180,
    tools: ['Qdrant Vector RAG', 'HubSpot API'],
    temperature: 0.2
  },
  {
    id: 'node_writer',
    name: 'Writer Agent',
    role: 'Synthesis',
    type: 'agent',
    model: 'Claude 3.5 Sonnet',
    description: 'Composes structured customer response.',
    icon: 'Claude',
    status: 'idle',
    x: 960,
    y: 180,
    temperature: 0.3
  },
  {
    id: 'node_reviewer',
    name: 'Reviewer Agent',
    role: 'Compliance',
    type: 'agent',
    model: 'Llama 3.3 (Private)',
    description: 'Checks SLA guarantees and tone.',
    icon: 'Meta',
    status: 'idle',
    x: 1190,
    y: 180,
    temperature: 0.1
  },
  {
    id: 'node_reply',
    name: 'Send Reply (Gmail)',
    role: 'Dispatch',
    type: 'action',
    description: 'Sends approved reply via Google Workspace API.',
    icon: 'Gmail',
    status: 'idle',
    x: 1420,
    y: 180,
    tools: ['Gmail Send API']
  }
];

export const MCP_SERVERS: McpServer[] = [
  {
    id: 'mcp_hubspot',
    name: 'CRM Connector (HubSpot)',
    clientType: 'HubSpot v3 API Wrapper',
    status: 'connected',
    transport: 'SSE',
    permission: 'Read-write',
    isSecure: true,
    securityMethod: 'mTLS + Ephemeral Token Handshake',
    latency: '14ms',
    endpoint: 'mcp://hubspot.internal.agentforge.io/sse',
    tools: [
      { name: 'search_contacts', description: 'Search HubSpot contacts by email, domain, or company identifier.', parameters: '{ query: string, limit?: number }' },
      { name: 'update_deal_stage', description: 'Update current stage and ARR deal size for designated lead.', parameters: '{ dealId: string, stage: string, notes?: string }' },
      { name: 'get_company_activity', description: 'Fetch chronological timeline of sales calls and emails for an account.', parameters: '{ companyId: string, daysBack: number }' },
      { name: 'create_ticket', description: 'Open new customer success support ticket tied to account owner.', parameters: '{ subject: string, body: string, priority: "LOW"|"HIGH" }' }
    ]
  },
  {
    id: 'mcp_postgres',
    name: 'Database Server (PostgreSQL)',
    clientType: 'Postgres pgwire read gateway',
    status: 'connected',
    transport: 'stdio',
    permission: 'Read-only',
    isSecure: true,
    securityMethod: 'Process Sandbox Isolation + Read-Only Connection Pool',
    latency: '8ms',
    endpoint: 'stdio:///opt/agentforge/mcp-postgres-driver',
    tools: [
      { name: 'run_query_readonly', description: 'Execute parameterized read-only SQL queries on operational database.', parameters: '{ sql: string, timeoutMs?: number }' },
      { name: 'explain_query', description: 'Inspect PostgreSQL query execution plan without running mutations.', parameters: '{ sql: string }' },
      { name: 'list_tables', description: 'Inspect available tables and schemas in production read replica.', parameters: '{ schema?: string }' },
      { name: 'describe_schema', description: 'Get column definitions, foreign keys, and indexes for a table.', parameters: '{ tableName: string }' }
    ]
  },
  {
    id: 'mcp_gdrive',
    name: 'Google Drive Server',
    clientType: 'Google Workspace Enterprise MCP',
    status: 'connected',
    transport: 'SSE',
    permission: 'Read-only',
    isSecure: true,
    securityMethod: 'Scoped Service Account with Granular Domain Delegation',
    latency: '22ms',
    endpoint: 'mcp://gdrive.internal.agentforge.io/sse',
    tools: [
      { name: 'read_file', description: 'Fetch and parse text or binary content from a specific Google Drive doc/sheet.', parameters: '{ fileId: string, mimeType?: string }' },
      { name: 'search_drive_docs', description: 'Full-text search indexed files within approved shared drives.', parameters: '{ query: string, folderId?: string }' },
      { name: 'list_permissions', description: 'Verify ACL permissions and external sharing status of a document.', parameters: '{ fileId: string }' },
      { name: 'export_pdf', description: 'Convert Google Doc/Sheet into signed PDF stream for processing.', parameters: '{ fileId: string }' }
    ]
  },
  {
    id: 'mcp_slack',
    name: 'Slack Server',
    clientType: 'Slack Bolt MCP Daemon',
    status: 'connected',
    transport: 'Streamable HTTP',
    permission: 'Read-write',
    isSecure: true,
    securityMethod: 'Enterprise Grid Bot Token + Channel Whitelist',
    latency: '18ms',
    endpoint: 'https://mcp-slack.gateway.corp.internal/v1',
    tools: [
      { name: 'post_message', description: 'Send rich block-kit formatted messages to targeted channel.', parameters: '{ channel: string, text: string, blocks?: any[] }' },
      { name: 'create_channel', description: 'Spin up dedicated incident or customer escalation channel.', parameters: '{ name: string, isPrivate: boolean }' },
      { name: 'read_thread_replies', description: 'Ingest conversational context from a support ticket thread.', parameters: '{ channel: string, threadTs: string }' },
      { name: 'upload_file', description: 'Upload generated PDF report or summary directly into thread.', parameters: '{ channel: string, filename: string, content: string }' }
    ]
  },
  {
    id: 'mcp_internal_docs',
    name: 'Internal Docs Server',
    clientType: 'Confluence & GitBook Bridge',
    status: 'connected',
    transport: 'SSE',
    permission: 'Read-only',
    isSecure: true,
    securityMethod: 'SSO Gateway with Bearer Token Pass-Through',
    latency: '15ms',
    endpoint: 'mcp://docs-sync.corp.internal/sse',
    tools: [
      { name: 'fetch_confluence_page', description: 'Retrieve markdown content and revision history for a space page.', parameters: '{ spaceKey: string, title: string }' },
      { name: 'query_doc_chunk', description: 'Query vectorized internal engineering RFCs and specs.', parameters: '{ query: string, topK?: number }' },
      { name: 'list_spaces', description: 'Enumerate authorized documentation spaces and repositories.', parameters: '{}' }
    ]
  }
];

export const INTEGRATIONS_LIST: Integration[] = [
  {
    id: 'int_gmail',
    name: 'Gmail',
    category: 'communication',
    description: 'Ingest customer tickets and send verified responses.',
    connected: true,
    lastSync: '1m ago',
    iconType: 'Gmail',
    authType: 'OAuth 2.0'
  },
  {
    id: 'int_slack',
    name: 'Slack',
    category: 'communication',
    description: 'Post real-time escalations and broadcast briefings.',
    connected: true,
    lastSync: 'Real-time',
    iconType: 'Slack',
    authType: 'Bot Token'
  },
  {
    id: 'int_hubspot',
    name: 'HubSpot',
    category: 'crm',
    description: 'Sync deals, enrich leads, and read ticket histories.',
    connected: true,
    lastSync: '5m ago',
    iconType: 'HubSpot',
    authType: 'Private App'
  },
  {
    id: 'int_notion',
    name: 'Notion',
    category: 'storage',
    description: 'Index company SOPs and roadmaps into Qdrant.',
    connected: true,
    lastSync: '12m ago',
    iconType: 'Notion',
    authType: 'Integration Token'
  },
  {
    id: 'int_gdrive',
    name: 'Google Drive',
    category: 'storage',
    description: 'Continuously index PDF manuals and spreadsheets.',
    connected: true,
    lastSync: '18m ago',
    iconType: 'GoogleDrive',
    authType: 'Service Account'
  },
  {
    id: 'int_postgres',
    name: 'PostgreSQL',
    category: 'developer',
    description: 'Query operational tables with read-only bounds.',
    connected: true,
    lastSync: 'Connected',
    iconType: 'PostgreSQL',
    authType: 'Connection String'
  },
  {
    id: 'int_whatsapp',
    name: 'WhatsApp',
    category: 'communication',
    description: 'Deploy customer support agents to WhatsApp.',
    connected: false,
    iconType: 'WhatsApp',
    authType: 'Meta Cloud API'
  },
  {
    id: 'int_stripe',
    name: 'Stripe',
    category: 'payments',
    description: 'Automate invoice verification and payment dunning.',
    connected: true,
    lastSync: 'Webhook live',
    iconType: 'Stripe',
    authType: 'Restricted Key'
  },
  {
    id: 'int_n8n',
    name: 'n8n',
    category: 'developer',
    description: 'Trigger low-code multi-step data pipelines.',
    connected: false,
    iconType: 'n8n',
    authType: 'Webhook Secret'
  },
  {
    id: 'int_rest_api',
    name: 'REST API',
    category: 'developer',
    description: 'Execute arbitrary internal HTTP/HTTPS calls.',
    connected: true,
    lastSync: 'Active',
    iconType: 'REST',
    authType: 'Bearer Auth'
  },
  {
    id: 'int_webhooks',
    name: 'Webhooks',
    category: 'developer',
    description: 'Listen to third-party webhook payloads in real time.',
    connected: true,
    lastSync: '42 endpoints',
    iconType: 'Webhooks',
    authType: 'HMAC Signature'
  },
  {
    id: 'int_airtable',
    name: 'Airtable',
    category: 'storage',
    description: 'Sync product catalogs and vendor rosters.',
    connected: false,
    iconType: 'Airtable',
    authType: 'Access Token'
  }
];

export const RUN_LOGS: RunLog[] = [
  {
    id: 'run_9402a7',
    agentName: 'Support Assistant',
    trigger: 'Webhook',
    duration: '1.18s',
    tokensUsed: 1420,
    cost: '$0.0035',
    status: 'success',
    timestamp: '2m ago',
    trace: [
      {
        step: '01. Input validation & safety guardrails',
        type: 'guardrail',
        duration: '18ms',
        details: 'Passed prompt injection filter and PII masking checks.'
      },
      {
        step: '02. Vector knowledge retrieval',
        type: 'retrieval',
        duration: '42ms',
        details: 'Retrieved 2 chunks from Refund Policy.pdf with 96% match.'
      },
      {
        step: '03. MCP tool call: Zendesk Check',
        type: 'tool_call',
        duration: '140ms',
        details: 'Checked ticket #4821 state: OPEN_PENDING_CLIENT.'
      },
      {
        step: '04. LLM inference: GPT-4o',
        type: 'llm_call',
        duration: '960ms',
        tokens: 1420,
        details: 'Generated complete response with citations [1], [2].'
      },
      {
        step: '05. Fact verification check',
        type: 'output',
        duration: '20ms',
        details: 'Verified statements against grounding chunks.'
      }
    ]
  },
  {
    id: 'run_9402a8',
    agentName: 'Invoice Triage Agent',
    trigger: 'Scheduled Cron',
    duration: '2.74s',
    tokensUsed: 3180,
    cost: '$0.0078',
    status: 'success',
    timestamp: '45m ago',
    trace: [
      {
        step: '01. OCR payload ingestion',
        type: 'guardrail',
        duration: '35ms',
        details: 'Parsed multi-page PDF invoice "INV-9042_AcmeCorp.pdf".'
      },
      {
        step: '02. Database cross-check',
        type: 'tool_call',
        duration: '85ms',
        details: 'Executed read query against purchase_orders table for PO-8812.'
      },
      {
        step: '03. Discrepancy evaluation: DeepSeek V3',
        type: 'llm_call',
        duration: '2580ms',
        tokens: 3180,
        details: 'Flagged $420.00 freight tax line item discrepancy.'
      },
      {
        step: '04. Alert notification: Slack',
        type: 'tool_call',
        duration: '40ms',
        details: 'Dispatched warning message to #finance-approvals.'
      }
    ]
  },
  {
    id: 'run_9402a9',
    agentName: 'HR Policy Bot',
    trigger: 'Playground',
    duration: '0.84s',
    tokensUsed: 890,
    cost: '$0.0000',
    status: 'success',
    timestamp: '2h ago',
    trace: [
      {
        step: '01. Private network verification',
        type: 'guardrail',
        duration: '12ms',
        details: 'Verified request origin from corporate IP 10.24.0.18.'
      },
      {
        step: '02. Internal RAG fetch',
        type: 'retrieval',
        duration: '28ms',
        details: 'Retrieved 2 chunks from Employee Handbook 2026.pdf.'
      },
      {
        step: '03. Local inference: Llama 3.3 70B',
        type: 'llm_call',
        duration: '800ms',
        tokens: 890,
        details: 'Processed on local GPU node. Zero cloud egress.'
      }
    ]
  },
  {
    id: 'run_9402b0',
    agentName: 'Contract Reviewer',
    trigger: 'API Request',
    duration: '3.38s',
    tokensUsed: 4950,
    cost: '$0.0142',
    status: 'success',
    timestamp: '4h ago',
    trace: [
      {
        step: '01. MSA document parsing',
        type: 'retrieval',
        duration: '110ms',
        details: 'Parsed 38-page Master Services Agreement PDF.'
      },
      {
        step: '02. Clause synthesis: Claude 3.5 Sonnet',
        type: 'llm_call',
        duration: '3180ms',
        tokens: 4950,
        details: 'Identified uncapped liability clause in Section 14.3.'
      }
    ]
  },
  {
    id: 'run_9402b2',
    agentName: 'Report Generator',
    trigger: 'Scheduled Cron',
    duration: '4.12s',
    tokensUsed: 5800,
    cost: '$0.0000',
    status: 'failed',
    timestamp: 'Yesterday',
    trace: [
      {
        step: '01. PostgreSQL analytical extract',
        type: 'tool_call',
        duration: '210ms',
        details: 'Executed revenue query on warehouse replica.'
      },
      {
        step: '02. vLLM local inference: Qwen 2.5 32B',
        type: 'llm_call',
        duration: '3820ms',
        tokens: 5800,
        details: 'vLLM worker timed out after 3.8s waiting for CUDA memory buffer.'
      },
      {
        step: '03. Failover standby dispatch',
        type: 'guardrail',
        duration: '90ms',
        details: 'Automatic failover job queued for worker node 2.'
      }
    ]
  }
];

export const CONNECTED_MODELS: ModelInfo[] = [
  {
    id: 'mod_gpt4o',
    name: 'GPT-4o',
    provider: 'OpenAI Cloud',
    deployment: 'Cloud API',
    isPrivate: false,
    latencyTTFT: '290ms',
    costPer1MTokens: '$2.50 / $10.00',
    contextWindow: '128k',
    status: 'Active',
    description: 'High-speed multimodal reasoning model for conversational workflows.',
    monthlyQueries: 20120
  },
  {
    id: 'mod_claude35',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic Cloud',
    deployment: 'Cloud API',
    isPrivate: false,
    latencyTTFT: '340ms',
    costPer1MTokens: '$3.00 / $15.00',
    contextWindow: '200k',
    status: 'Active',
    description: 'State-of-the-art coding and contract analysis engine.',
    monthlyQueries: 11430
  },
  {
    id: 'mod_gemini15',
    name: 'Gemini 1.5 Pro',
    provider: 'Google Cloud',
    deployment: 'Cloud API',
    isPrivate: false,
    latencyTTFT: '380ms',
    costPer1MTokens: '$1.25 / $5.00',
    contextWindow: '2,000k',
    status: 'Active',
    description: 'Massive context window for long-document understanding.',
    monthlyQueries: 7680
  },
  {
    id: 'mod_llama33',
    name: 'Llama 3.3 70B (Ollama, private)',
    provider: 'Meta / On-Premise',
    deployment: 'Private • On-Premise',
    isPrivate: true,
    latencyTTFT: '160ms',
    costPer1MTokens: '$0.00 (Self-hosted)',
    contextWindow: '128k',
    status: 'Active',
    description: 'Isolated on-premise execution for strict confidential policies.',
    monthlyQueries: 2410
  },
  {
    id: 'mod_qwen25',
    name: 'Qwen 2.5 32B (vLLM, private)',
    provider: 'Alibaba / vLLM',
    deployment: 'Private • On-Premise',
    isPrivate: true,
    latencyTTFT: '190ms',
    costPer1MTokens: '$0.00 (Self-hosted)',
    contextWindow: '64k',
    status: 'Active',
    description: 'Optimized on private GPU instances for tabular analytics.',
    monthlyQueries: 1482
  },
  {
    id: 'mod_deepseek',
    name: 'DeepSeek V3',
    provider: 'DeepSeek Cloud API',
    deployment: 'Cloud API',
    isPrivate: false,
    latencyTTFT: '310ms',
    costPer1MTokens: '$0.27 / $1.10',
    contextWindow: '64k',
    status: 'Active',
    description: 'Cost-effective reasoning engine for invoice line items.',
    monthlyQueries: 4790
  },
  {
    id: 'mod_mistral',
    name: 'Mistral Large 2 (vLLM, private)',
    provider: 'Mistral / vLLM',
    deployment: 'Private • On-Premise',
    isPrivate: true,
    latencyTTFT: '220ms',
    costPer1MTokens: '$0.00 (Self-hosted)',
    contextWindow: '128k',
    status: 'Standby',
    description: 'Sovereign deployment node with multilingual reasoning.',
    monthlyQueries: 0
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'usr_1',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@apexlogistics.com',
    role: 'Owner',
    avatar: 'SM',
    status: 'Active',
    twoFactorEnabled: true
  },
  {
    id: 'usr_2',
    name: 'Alex Chen',
    email: 'alex.chen@apexlogistics.com',
    role: 'AI Engineer',
    avatar: 'AC',
    status: 'Active',
    twoFactorEnabled: true
  },
  {
    id: 'usr_3',
    name: 'Elena Rostova',
    email: 'elena.rostova@apexlogistics.com',
    role: 'Compliance Director',
    avatar: 'ER',
    status: 'Active',
    twoFactorEnabled: true
  },
  {
    id: 'usr_4',
    name: 'Marcus Brody',
    email: 'marcus.brody@apexlogistics.com',
    role: 'DevOps Lead',
    avatar: 'MB',
    status: 'Active',
    twoFactorEnabled: false
  }
];

export const API_KEYS: ApiKeyItem[] = [
  {
    id: 'key_1',
    name: 'Production Ingest Agent Gateway',
    prefix: 'af_live_84f9...93b1',
    created: 'Aug 14, 2026',
    lastUsed: '2m ago',
    environment: 'Production'
  },
  {
    id: 'key_2',
    name: 'Zendesk Webhook Dispatcher',
    prefix: 'af_live_41a2...770e',
    created: 'Sep 02, 2026',
    lastUsed: '18m ago',
    environment: 'Production'
  },
  {
    id: 'key_3',
    name: 'Staging Integration Suite',
    prefix: 'af_test_12c0...448a',
    created: 'Sep 29, 2026',
    lastUsed: '2h ago',
    environment: 'Staging'
  }
];

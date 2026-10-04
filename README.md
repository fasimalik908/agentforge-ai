# AgentForge AI

A dashboard for building, testing and monitoring custom AI agents. It shows how a business team can manage agents that answer from their own documents, run multi-agent workflows and connect to tools through MCP servers.

> This is a front-end demo with sample data. It shows the product experience I build for clients.

## Screenshots

| Overview | Playground |
|---|---|
| ![Overview](docs/overview.png) | ![Playground](docs/playground.png) |

| Workflows | Knowledge base |
|---|---|
| ![Workflows](docs/workflows.png) | ![Knowledge base](docs/knowledge-base.png) |

## What's inside

- **Overview:** query volume, response time, answer accuracy and usage by agent
- **Agents:** the fleet of agents, each with its model and status
- **Knowledge base:** documents, indexing status and the vector store behind RAG answers
- **Playground:** chat with an agent and inspect the sources behind every answer
- **Workflows:** multi-agent flows with conditional branches
- **MCP servers:** the tools and data your agents can reach, with permissions
- **Integrations:** connected apps and APIs
- **Runs and logs:** step-by-step traces with tokens and cost
- **Models:** cloud and private models side by side

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS, Recharts, Lucide icons, Motion

## Run locally

```bash
git clone https://github.com/fasimalik908/agentforge-ai.git
cd agentforge-ai
npm install
npm run dev
```

The app opens at `http://localhost:3000`.

If the app needs environment variables, copy `.env.example` to `.env` and fill in the values. Never commit your `.env` file.

## Need an AI agent built for your business?

I build custom AI agents: RAG agents that answer from your documents, multi-agent workflows, MCP servers, and private agents on open-source models. Every agent is tested on your own data and delivered with full source code, setup notes and a walkthrough.

Find me on Fiverr and Upwork, or message me before ordering and I will tell you what your project needs.

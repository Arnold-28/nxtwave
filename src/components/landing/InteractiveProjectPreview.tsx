import React, { useState } from 'react';
import { Play, Sparkles, Terminal, CheckCircle2, Code2, Cpu, ArrowRight, Zap, GitBranch, Layers, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProjectTemplate {
  id: string;
  name: string;
  category: string;
  stageBadge: string;
  architectureNodes: {
    title: string;
    tech: string;
    status: string;
  }[];
  promptContract: {
    system: string;
    userQuery: string;
    schemaType: string;
  };
  codeSnippet: string;
  telemetry: {
    latency: string;
    tokensPerSec: string;
    costPerCall: string;
    status: string;
  };
  outputPreview: {
    title: string;
    primaryMetric: string;
    badgeText: string;
    details: string[];
    suggestedAction: string;
  };
}

const TEMPLATES: ProjectTemplate[] = [
  {
    id: 'resume-analyzer',
    name: 'AI Resume & JD Analyzer',
    category: 'Placement Prep',
    stageBadge: 'Full Stack AI',
    architectureNodes: [
      { title: '1. Ingestion', tech: 'PDF / Text Parser', status: 'Ready' },
      { title: '2. Reasoning', tech: 'Gemini 1.5 Flash', status: 'Streaming' },
      { title: '3. Schema', tech: 'Zod Validation', status: 'Enforced' },
      { title: '4. Delivery', tech: 'React Live Diff', status: 'Active' },
    ],
    promptContract: {
      system: 'You are an elite Tech Hiring Screener. Evaluate candidate skills against software engineering job descriptions.',
      userQuery: 'Candidate: Final-Year CSE | Target Role: SDE-1 Backend (FastAPI, Redis, Docker)',
      schemaType: 'Strict JSON { score: number, matches: string[], gaps: string[] }'
    },
    codeSnippet: `// Step 2: Stream reasoning tokens with structured JSON contract
const response = await ai.models.generateContent({
  model: 'gemini-1.5-flash',
  contents: [{ role: 'user', parts: [{ text: promptText }] }],
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0.2
  }
});

const evaluation = JSON.parse(response.text);
renderPlacementCard(evaluation);`,
    telemetry: {
      latency: '248 ms',
      tokensPerSec: '512 tps',
      costPerCall: '₹0.004',
      status: '200 OK'
    },
    outputPreview: {
      title: 'Match Score: 88% — High Placement Readiness',
      primaryMetric: '12 / 14 Required Engineering Competencies Verified',
      badgeText: 'Tier-1 SDE Shortlist Ready',
      details: [
        'Validated: Python, FastAPI, Async Architecture, Vector Indexing',
        'Demonstrated: 2 Live GitHub Capstone Repositories with CI/CD',
        'Recommendation: Add containerized multi-stage Dockerfile demo'
      ],
      suggestedAction: 'Deployable directly to student portfolio in 60 minutes.'
    }
  },
  {
    id: 'interview-copilot',
    name: 'DSA Technical Interview Bot',
    category: 'Placement Prep',
    stageBadge: 'Streaming Agent',
    architectureNodes: [
      { title: '1. Problem AST', tech: 'LeetCode Parser', status: 'Ready' },
      { title: '2. Socratic Model', tech: 'Streaming Inference', status: 'Low Latency' },
      { title: '3. AST Check', tech: 'Complexity Verifier', status: 'O(1) Pass' },
      { title: '4. Voice UI', tech: 'Realtime Audio Hook', status: 'Ready' },
    ],
    promptContract: {
      system: 'Act as a Principal Staff Engineer conducting technical interview. Provide subtle progressive hints without revealing code.',
      userQuery: 'Problem: LRU Cache Implementation with O(1) Get and Put operations.',
      schemaType: 'SSE Stream: token-by-token reasoning graph'
    },
    codeSnippet: `// Step 2: Real-time Socratic hint engine
const stream = await ai.models.generateContentStream({
  model: 'gemini-1.5-flash',
  contents: [{ role: 'user', parts: [{ text: userSolutionCode }] }]
});

for await (const chunk of stream) {
  process.stdout.write(chunk.text);
  updateLiveInterviewUI(chunk.text);
}`,
    telemetry: {
      latency: '190 ms',
      tokensPerSec: '620 tps',
      costPerCall: '₹0.002',
      status: 'Stream Active'
    },
    outputPreview: {
      title: 'Optimal Approach Verified: O(1) Time Complexity',
      primaryMetric: 'Data Structure: Hash Map + Doubly Linked List',
      badgeText: 'Optimal Solution',
      details: [
        'Identified: Hash map provides O(1) key-to-node lookup',
        'Identified: Doubly Linked List ensures O(1) node relocation',
        'Mentor Tip: Explain dummy head/tail pointers to impress interviewers'
      ],
      suggestedAction: 'Working interactive interview simulator built live.'
    }
  },
  {
    id: 'repo-docs-agent',
    name: 'GitHub Portfolio AI Agent',
    category: 'Student Capstone',
    stageBadge: 'Agentic Workflow',
    architectureNodes: [
      { title: '1. Tree Fetch', tech: 'GitHub Octokit API', status: 'Ready' },
      { title: '2. Code Scan', tech: 'Recursive Summarizer', status: 'Parsed' },
      { title: '3. Diagram Gen', tech: 'Mermaid AST Engine', status: 'Rendered' },
      { title: '4. Deploy', tech: '1-Click Vercel / Git', status: 'Live' },
    ],
    promptContract: {
      system: 'Parse React + Node codebase directory. Generate clean architecture documentation and interactive portfolio README.',
      userQuery: 'Repository: /student/growthloop-ai (Vite, TypeScript, Tailwind, Supabase)',
      schemaType: 'Markdown AST + Mermaid Architecture Diagrams'
    },
    codeSnippet: `// Step 2: Multi-step file analysis loop
const fileTree = await fetchRepoTree(repoUrl);
const docs = await generateArchitectureDocs(fileTree);
const deployment = await triggerVercelDeploy({
  repo: repoUrl,
  framework: 'vite'
});`,
    telemetry: {
      latency: '310 ms',
      tokensPerSec: '440 tps',
      costPerCall: '₹0.005',
      status: '200 OK'
    },
    outputPreview: {
      title: 'README.md & Architecture Diagram Generated',
      primaryMetric: 'Parsed 18 Source Modules • 100% Type Coverage',
      badgeText: 'Placement Ready Repo',
      details: [
        'Generated interactive Mermaid architecture diagram',
        'Documented API contracts, environment variables, and test instructions',
        'Pre-configured GitHub Actions CI workflow included'
      ],
      suggestedAction: 'Push to your personal GitHub profile to stand out in placement interviews.'
    }
  }
];

export const InteractiveProjectPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TEMPLATES[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(true);

  const current = TEMPLATES.find((t) => t.id === activeTab) || TEMPLATES[0];

  const handleSimulateRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 450);
  };

  return (
    <div className="bg-white rounded-xl border border-surface-border shadow-card overflow-hidden">
      {/* 1. Linear Header Bar */}
      <div className="bg-[#15172B] px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block" />
          </div>
          <span className="text-xs font-mono text-zinc-300">
            workshop-architecture-pipeline.ts
          </span>
          <span className="hidden sm:inline-flex items-center text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
            60-Min Workshop Target
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-[#7357FF]/20 text-white text-[11px] font-mono px-2 py-0.5 rounded border border-[#7357FF]/30">
            <Cpu className="w-3 h-3 text-lime" />
            <span>Interactive AI Sandbox</span>
          </span>
        </div>
      </div>

      {/* 2. Project Tabs */}
      <div className="flex border-b border-surface-border bg-surface-muted/50 overflow-x-auto text-xs font-medium">
        {TEMPLATES.map((tpl) => (
          <button
            key={tpl.id}
            onClick={() => {
              setActiveTab(tpl.id);
              setHasRun(true);
            }}
            className={`px-4 py-3 whitespace-nowrap transition-colors flex items-center gap-2 border-b-2 text-xs ${
              activeTab === tpl.id
                ? 'border-brand text-brand bg-white font-semibold'
                : 'border-transparent text-ink-muted hover:text-ink'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{tpl.name}</span>
            <span className="text-[10px] bg-canvas border border-surface-border text-ink-muted px-1.5 py-0.2 rounded font-mono">
              {tpl.stageBadge}
            </span>
          </button>
        ))}
      </div>

      {/* 3. Original Linear-Style Node Graph Pipeline Bar */}
      <div className="p-3.5 bg-canvas border-b border-surface-border">
        <div className="flex items-center justify-between text-[11px] text-ink-muted mb-2 font-mono">
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            <GitBranch className="w-3.5 h-3.5 text-brand" />
            <span>End-to-End Pipeline Execution Graph</span>
          </span>
          <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.2 rounded">
            Target Latency: &lt; 300ms
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {current.architectureNodes.map((node, i) => (
            <div
              key={i}
              className="p-2.5 bg-white border border-surface-border rounded-lg shadow-subtle space-y-1 relative"
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold text-ink uppercase tracking-wider">
                  {node.title}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-lime-dark" />
              </div>
              <p className="text-xs font-mono text-brand truncate font-medium">
                {node.tech}
              </p>
              <span className="text-[9.5px] text-ink-muted block font-mono">
                Status: {node.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Code & Live App Playground */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-surface-border">
        {/* Left: Prompt Contract & Code Terminal */}
        <div className="lg:col-span-7 p-4 sm:p-5 bg-white space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-muted font-mono flex items-center gap-1.5">
                <span>01. Input Prompt & Structured Contract</span>
              </label>
              <span className="text-[10px] text-brand font-mono font-medium">
                JSON Schema Enforced
              </span>
            </div>
            <div className="p-3 bg-canvas rounded-lg border border-surface-border text-xs text-ink-muted font-mono leading-relaxed space-y-1">
              <div className="text-ink">
                <span className="text-ink-muted font-semibold">User: </span>
                {current.promptContract.userQuery}
              </div>
              <div className="text-[11px] text-ink-muted pt-1 border-t border-surface-border/60">
                <span className="font-semibold text-brand">Schema: </span>
                {current.promptContract.schemaType}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-ink-muted font-mono flex items-center gap-1.5">
                <span>02. Node.js Production Implementation</span>
              </label>
              <span className="text-[10px] text-zinc-500 font-mono">
                Taught Step-by-Step
              </span>
            </div>
            <pre className="p-3.5 bg-[#15172B] text-zinc-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed border border-zinc-800">
              <code>{current.codeSnippet}</code>
            </pre>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <button
              onClick={handleSimulateRun}
              disabled={isRunning}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover active:scale-[0.98] text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-button disabled:opacity-70"
            >
              <Play className={`w-3.5 h-3.5 text-lime fill-lime ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Streaming Reasoning Tokens...' : 'Test AI Pipeline Execution'}</span>
            </button>

            <div className="flex items-center gap-3 text-[11px] font-mono text-ink-muted">
              <span>Latency: <strong className="text-ink">{current.telemetry.latency}</strong></span>
              <span>Speed: <strong className="text-ink">{current.telemetry.tokensPerSec}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Live Working Output Preview */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-canvas flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-brand" />
                <span>Working Project Output</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                <CheckCircle2 className="w-3 h-3" />
                {current.telemetry.status}
              </span>
            </div>

            {hasRun ? (
              <div className="bg-white rounded-lg p-4 border border-surface-border shadow-subtle space-y-3">
                <div className="border-b border-surface-border pb-2.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-brand uppercase tracking-wider font-mono">
                      Live Output Preview
                    </span>
                    <span className="bg-lime text-ink text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                      {current.outputPreview.badgeText}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-ink">
                    {current.outputPreview.title}
                  </h4>
                </div>

                <div className="p-2.5 bg-lime-light border border-lime/40 rounded-md text-xs text-ink font-semibold">
                  {current.outputPreview.primaryMetric}
                </div>

                <div className="space-y-1.5 pt-1 text-xs text-ink-muted">
                  {current.outputPreview.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 bg-surface-muted rounded-md text-[11px] text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">Impact on Placements: </strong>
                  {current.outputPreview.suggestedAction}
                </div>
              </div>
            ) : (
              <div className="h-44 flex flex-col items-center justify-center border border-dashed border-surface-border rounded-lg text-center p-4">
                <Terminal className="w-8 h-8 text-ink-faint mb-2" />
                <p className="text-xs text-ink-muted">Click "Test AI Pipeline Execution" to run inference.</p>
              </div>
            )}
          </div>

          <div className="pt-4 mt-4 border-t border-surface-border">
            <Link
              to="/register"
              className="w-full flex items-center justify-center gap-2 bg-[#15172B] hover:bg-zinc-800 text-white text-xs font-semibold py-2.5 rounded-lg shadow-button transition-all"
            >
              <span>Build this project in 60 minutes</span>
              <ArrowRight className="w-3.5 h-3.5 text-lime" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

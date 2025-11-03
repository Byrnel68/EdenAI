import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer, Legend, CartesianGrid, LineChart, Line } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Rocket, BarChart3, Boxes, Code2, ShieldCheck, Globe, Cpu, ExternalLink, Users, Info } from "lucide-react";

/**
 * Eden AI — Interactive One-Pager Poster (Sourced)
 * All figures shown come directly from the linked sources below. No extrapolation or interpolation.
 * Color scheme adapted to Eden AI article aesthetic (emerald/teal accents on white, subtle gray text).
 */

// --- Market data (sourced, discrete points only) ---
// Precedence Research: 2024 = 49.03, 2025 = 64.41, 2034 = 750.63 (AI API market)
// Grand View Research: 2030 = 246.87 (AI API market)
const marketData = [
  { year: 2024, market: 49.03, src: "Precedence Research" },
  { year: 2025, market: 64.41, src: "Precedence Research" },
  { year: 2030, market: 246.87, src: "Grand View Research" },
  { year: 2034, market: 750.63, src: "Precedence Research" },
];

// Provider dataset + insights (flip-back content)
const providers = [
  {
    name: "OpenAI",
    site: "https://openai.com/",
    insights: [
      "Unified API for text, vision, and audio capabilities.",
      "Strong enterprise adoption; rich tooling & docs.",
      "Great for chat, summarization, and automation workloads.",
    ],
  },
  {
    name: "Google Cloud AI",
    site: "https://cloud.google.com/vertex-ai",
    insights: [
      "Vertex AI unifies 200+ foundation models, incl. Gemini.",
      "Model Garden + enterprise governance & IAM controls.",
      "Best fit when you already run on Google Cloud.",
    ],
  },
  {
    name: "Hugging Face",
    site: "https://huggingface.co/",
    insights: [
      "Single interface to tens of thousands of open models.",
      "Inference Endpoints and Providers for managed serving.",
      "Great for avoiding lock-in & customizing models.",
    ],
  },
  {
    name: "Stability AI",
    site: "https://stability.ai/",
    insights: [
      "SDXL & related models for high-quality image generation.",
      "Optimized variants (e.g., Turbo) for latency-sensitive use.",
      "Ideal for creative, design, and marketing pipelines.",
    ],
  },
  {
    name: "Anthropic",
    site: "https://www.anthropic.com/",
    insights: [
      "Claude models focus on safe, steerable outputs.",
      "Strong enterprise features; long context windows.",
      "Useful in regulated or compliance-heavy workflows.",
    ],
  },
  {
    name: "Eden AI",
    site: "https://www.edenai.co/",
    insights: [
      "One token to access many providers via a unified API.",
      "Live benchmarking on price, latency, and quality.",
      "Reduces vendor lock-in; simplifies billing & auth.",
    ],
  },
]; 

// Logo images for provider cards
const logos: Record<string, string> = {
  "OpenAI": "/images/openai.png",
  "Google Cloud AI": "/images/googleCloud.png",
  "Hugging Face": "/images/huggingface-color.png",
  "Stability AI": "/images/Stability.png",
  "Anthropic": "/images/anthropic.png",
  "Eden AI": "/images/eden.png",
};

const Frame = ({ icon: Icon, title, children }: any) => (
  <Card className="rounded-2xl shadow-sm border border-emerald-100 bg-white text-slate-900">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2 text-xl">
        <Icon className="w-5 h-5 text-emerald-600" /> {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const TeamBadge = ({ name }: { name: string }) => (
  <Badge variant="outline" className="text-sm py-1 px-2 mr-2 mb-2 rounded-xl border-emerald-200 text-emerald-700">{name}</Badge>
);

export default function Component() {
  const [edgeMode, setEdgeMode] = useState(true);
  const [activePoint, setActivePoint] = useState<null | {year:number;market:number;src:string}>(null);
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const chartData = useMemo(() => marketData.map(d => ({
    name: d.year.toString(),
    Market: d.market,
    src: d.src,
    year: d.year,
  })), []);

  const toggleFlip = (name: string) => setFlipped((f) => ({ ...f, [name]: !f[name] }));

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      {/* Hero */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/85 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-semibold tracking-tight">Eden AI — AI API Integrator</h1>
            <Badge className="ml-2 bg-emerald-600 text-white">Interactive Poster</Badge>
          </div>
          {/* Dark mode toggle removed */}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        {/* NEW: One-Page Write-Up (interactive paragraphs) */}
        <section className="grid gap-3">
          <Card className="rounded-2xl border-emerald-100">
            <CardHeader className="pb-1">
              <CardTitle className="text-base text-slate-900">One‑Page Write‑Up (Interactive)</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="context">
                  <AccordionTrigger className="text-sm">1) Organization / Industry Context</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed text-slate-700">
                      Our project focuses on <strong>AI API Integrators</strong>—platforms that unify and simplify access to AI APIs across providers (text, vision, speech). This context matters now because AI model options are exploding while pricing, latency, and quality vary widely. Enterprises want the benefits of AI without vendor lock‑in, and SMEs want fast adoption without deep ML expertise. Integrators meet both needs by normalizing access, metrics, and billing.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="focus">
                  <AccordionTrigger className="text-sm">2) Digital / AI Focus</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed text-slate-700">
                      This is an <strong>AI‑enabled digital transformation</strong> project. We provide a single integration layer to experiment with NLP, translation, computer vision and more—without one‑by‑one setup. Intelligent orchestration benchmarks multiple providers and chooses the best option per call, enabling continuous adoption of new capabilities in weeks, not months.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="strategy">
                  <AccordionTrigger className="text-sm">3) Strategic Aim</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed text-slate-700">
                      <strong>External:</strong> help businesses counter AI‑enabled competitors by rapidly embedding generative AI, automation, and analytics via a unified interface with no vendor lock‑in. <strong>Internal:</strong> reduce developer friction and time‑to‑market by simplifying auth, billing, and monitoring, while enabling governance and performance visibility.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="goal">
                  <AccordionTrigger className="text-sm">4) Project Goal (1 sentence)</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm leading-relaxed text-slate-700">
                      “We aim to enable rapid, cost‑effective digital innovation and new AI‑driven business models by integrating diverse AI APIs into a single, scalable platform that automates model selection and performance benchmarking.”
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Intro */}
        <section className="grid gap-6">
          <Frame icon={ShieldCheck} title="From the write‑up → Action plan">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-sm font-medium mb-1">Architecture & Orchestration</div>
                <ul className="text-sm list-disc pl-5 space-y-1 text-slate-700">
                  <li>Unify auth & billing across providers; isolate secrets.</li>
                  <li>Routing policy: <em>best-price</em> vs <em>best-quality</em> vs <em>lowest-latency</em>.</li>
                  <li>Edge option for PII/latency-sensitive workloads.</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">KPIs</div>
                <ul className="text-sm list-disc pl-5 space-y-1 text-slate-700">
                  <li>Cost per 1k tokens / image / minute.</li>
                  <li>P95 latency by provider & task.</li>
                  <li>Quality scores from benchmarking runs.</li>
                </ul>
              </div>
              <div>
                <div className="text-sm font-medium mb-1">Governance</div>
                <ul className="text-sm list-disc pl-5 space-y-1 text-slate-700">
                  <li>Provider allowlist; fallback & deprecation plan.</li>
                  <li>Audit logs for prompts, outputs, and routing decisions.</li>
                  <li>Compliance: data residency, redaction, retention windows.</li>
                </ul>
              </div>
            </div>
          </Frame>
        </section>

        {/* Storyboard / Frames */}
        <section className="grid md:grid-cols-2 gap-6">
          <Frame icon={BarChart3} title="Market growth & trends (sourced)">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  onMouseMove={(state:any) => {
                    const p = state?.activePayload?.[0]?.payload;
                    if (p) setActivePoint({ year: p.year, market: p.Market, src: p.src });
                  }}
                  onMouseLeave={() => setActivePoint(null)}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#475569" />
                  <YAxis unit="B" stroke="#475569" />
                  <RTooltip formatter={(value: any) => `$${value}B`} labelFormatter={(label) => `Year ${label}`} />
                  <Legend />
                  <Line type="monotone" dataKey="Market" dot={{ r: 4 }} activeDot={{ r: 6 }} stroke="#10b981" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* Explanation below chart */}
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 text-sm flex items-start gap-2">
              <Info className="w-4 h-4 mt-0.5 text-emerald-700" />
              <div>
                <p className="font-medium text-emerald-800">What this shows</p>
                <p className="text-slate-700">
                  Each dot is a figure reported by the cited source for that specific year. There is <strong>no interpolation</strong> between years. Hover the chart to see the exact value and which source it came from.
                </p>
                {activePoint && (
                  <p className="mt-2 text-xs text-slate-600">
                    Hovering: <strong>{activePoint.year}</strong> — <strong>${activePoint.market}B</strong> ({activePoint.src})
                  </p>
                )}
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.precedenceresearch.com/ai-api-market" target="_blank" rel="noreferrer">Precedence Research<ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.grandviewresearch.com/industry-analysis/ai-api-market-report" target="_blank" rel="noreferrer">Grand View Research<ExternalLink className="w-3 h-3" /></a>
            </div>
          </Frame>

          <Frame icon={Boxes} title="Plug & Play integration">
            <div className="grid grid-cols-2 gap-3">
              {providers.map(p => (
                <motion.div key={p.name} whileHover={{ scale: 1.01 }}>
                  <div className="relative" style={{ perspective: 1000 }}>
                    <div
                      className="border rounded-xl transition-shadow border-emerald-100"
                      onClick={() => toggleFlip(p.name)}
                    >
                      <motion.div
                        animate={{ rotateY: flipped[p.name] ? 180 : 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ transformStyle: "preserve-3d" }}
                        className="relative h-44"
                      >
                        {/* Front */}
                        <div
                          className="absolute inset-0 p-3 flex flex-col justify-between"
                          style={{ backfaceVisibility: "hidden" }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-slate-900 truncate pr-2">{p.name}</span>
                            <Badge className="bg-emerald-600 text-white">Provider</Badge>
                          </div>
                          <div className="flex-1 flex items-center justify-center">
                            <img src={logos[p.name]} alt={`${p.name} logo`} className="max-h-12 w-auto object-contain" loading="lazy" decoding="async" referrerPolicy="no-referrer" draggable={false} onError={(e)=>{(e.currentTarget as HTMLImageElement).src='https://via.placeholder.com/80?text=Logo';}} />
                          </div>
                          <a href={p.site} target="_blank" rel="noreferrer" className="text-xs underline underline-offset-4 text-emerald-700">Visit site</a>
                        </div>

                        {/* Back */}
                        <div
                          className="absolute inset-0 p-3"
                          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                        >
                          <div className="text-sm font-medium mb-1 text-slate-900 truncate">{p.name} — Integration Insights</div>
                          <ul className="text-xs list-disc pl-4 space-y-1 text-slate-700 max-h-28 overflow-auto">
                            {p.insights.map((i, idx) => (
                              <li key={idx} className="pr-2">{i}</li>
                            ))}
                          </ul>
                          <p className="text-[11px] text-slate-500 mt-2">Click again to flip back</p>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Frame>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Frame icon={Rocket} title="New business models in action">
            <ul className="text-sm list-disc pl-5 space-y-2">
              <li>Usage-based, tiered plans; vertical bundles (healthcare, education) with compliance presets.</li>
              <li>AI performance marketplace: benchmark → route → monetize.</li>
              <li>No vendor lock-in: swap providers as pricing/quality/latency shift.</li>
              <li className="flex items-center gap-2">Edge routing <Switch checked={edgeMode} onCheckedChange={setEdgeMode} /> <span className="text-xs text-slate-600">{edgeMode ? "On (lower latency, less data egress)" : "Off"}</span></li>
            </ul>
          </Frame>

          <Frame icon={Users} title="Project team & goal">
            <p className="text-sm">“Enable rapid, cost-effective digital innovation by integrating diverse AI APIs into a single, smart platform.”</p>
            <div className="mt-3">
              {"James McNamee, Laurie Byrne, Fiachra Tobin, Micheal Buckley, Ash Tirou, Natalia Sulatska".split(", ").map(n => <TeamBadge key={n} name={n} />)}
            </div>
            <div className="mt-4 text-xs text-slate-600">
              Built as an interactive one-pager poster for demo/print.
            </div>
          </Frame>
        </section>

        {/* Sources */}
        <section className="grid gap-2">
          <Card className="rounded-2xl border-emerald-100">
            <CardHeader className="pb-1">
              <CardTitle className="text-base text-slate-900">Source Links (no extrapolation)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm flex flex-wrap gap-3">
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.precedenceresearch.com/ai-api-market" target="_blank" rel="noreferrer">Precedence Research — AI API Market 2024–2034 <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.grandviewresearch.com/industry-analysis/ai-api-market-report" target="_blank" rel="noreferrer">Grand View Research — AI API Market to 2030 <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.edenai.co/post/open-source-ai-apis-aggregator-by-eden-ai" target="_blank" rel="noreferrer">Eden AI — Open Source Aggregator <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://api4.ai/blog/ai-apis-what-they-are-and-why-they-matter-to-business" target="_blank" rel="noreferrer">API4.AI — What are AI APIs (2025) <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.sngular.com/insights/358/turn-your-apis-into-a-growth-engine-in-2025" target="_blank" rel="noreferrer">Sngular — APIs as a growth engine (2025) <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.toolmage.com/en/tool/eden-ai/" target="_blank" rel="noreferrer">Toolmage — Eden AI overview <ExternalLink className="w-3 h-3" /></a>

              {/* Provider-specific references */}
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://platform.openai.com/docs/models" target="_blank" rel="noreferrer">OpenAI — API & Models <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://cloud.google.com/vertex-ai" target="_blank" rel="noreferrer">Google — Vertex AI <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://huggingface.co/docs/inference-providers/en/index" target="_blank" rel="noreferrer">Hugging Face — Inference Providers <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://platform.stability.ai/docs/api-reference" target="_blank" rel="noreferrer">Stability AI — REST API <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.anthropic.com/" target="_blank" rel="noreferrer">Anthropic — Claude <ExternalLink className="w-3 h-3" /></a>
              <a className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700" href="https://www.edenai.co/" target="_blank" rel="noreferrer">Eden AI — Unified API <ExternalLink className="w-3 h-3" /></a>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Eden AI — Interactive Poster. Built for demonstration purposes.
      </footer>
    </div>
  );
}

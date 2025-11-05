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
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }
    }}
    className="relative group"
  >
    {/* Interactive background glow */}
    <motion.div
      className="absolute -inset-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{
        backgroundSize: "200% 100%",
      }}
    />
    <Card className="rounded-2xl shadow-sm border border-emerald-100 bg-white text-slate-900 relative overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:border-emerald-300">
    <CardHeader className="pb-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="inline-block"
        >
      <CardTitle className="flex items-center gap-2 text-xl">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Icon className="w-5 h-5 text-emerald-600" />
            </motion.div>
            {title}
      </CardTitle>
        </motion.div>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
  </motion.div>
);

const TeamBadge = ({ name }: { name: string }) => (
  <Badge 
    variant="outline" 
    className="text-sm py-1 px-2 mr-2 mb-2 rounded-xl border-emerald-200 text-emerald-700 transition-all duration-300 hover:bg-emerald-50 hover:border-emerald-400"
  >
    {name}
  </Badge>
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
      <motion.header 
        className="sticky top-0 z-20 backdrop-blur bg-white/85 border-b"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
            <Cpu className="w-6 h-6 text-emerald-600" />
            </motion.div>
            <h1 className="text-2xl font-semibold tracking-tight">Eden AI — AI API Integrator</h1>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge className="ml-2 bg-emerald-600 text-white cursor-pointer">Interactive Poster</Badge>
            </motion.div>
          </motion.div>
          {/* Dark mode toggle removed */}
        </div>
      </motion.header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid gap-6">
        {/* NEW: One-Page Write-Up (interactive paragraphs) */}
        <motion.section 
          className="grid gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
            />
            <Card className="rounded-2xl border-emerald-100 transition-all duration-300 group-hover:shadow-lg group-hover:border-emerald-300">
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
          </motion.div>
        </motion.section>

        {/* Intro */}
        <section className="grid gap-6">
          <Frame icon={ShieldCheck} title="From the write‑up → Action plan">
            <motion.div 
              className="relative overflow-hidden rounded-xl"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.1
                  }
                }
              }}
            >
              {/* Morphing liquid background effect */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                animate={{
                  background: [
                    "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%)",
                    "radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Animated border highlight with morphing effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)",
                  backgroundSize: "200% 100%",
                }}
                initial={{ backgroundPosition: "-200% 0" }}
                whileInView={{ 
                  backgroundPosition: ["-200% 0", "200% 0"],
                  transition: { 
                    duration: 2,
                    ease: "easeInOut"
                  }
                }}
                viewport={{ once: true }}
              />
              
              {/* Floating particles effect on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-60"
                    initial={{
                      x: Math.random() * 100 + "%",
                      y: Math.random() * 100 + "%",
                      scale: 0,
                    }}
                    whileHover={{
                      scale: [0, 1.5, 0],
                      y: [0, -30, -60],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeOut"
                      }
                    }}
                  />
                ))}
              </div>
              
              <div className="relative text-sm leading-relaxed text-slate-700 space-y-4 p-1 group">
                <motion.div
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: -50,
                      rotateX: -15,
                      filter: "blur(10px)",
                      scale: 0.9
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      rotateX: 0,
                      filter: "blur(0px)",
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  className="transform-gpu cursor-pointer relative group/item"
                  whileHover={{ 
                    scale: 1.03,
                    x: 15,
                    transition: { 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  {/* Liquid morphing highlight bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-400 rounded-full opacity-0 group-hover/item:opacity-100"
                    initial={{ scaleY: 0 }}
                    whileHover={{ 
                      scaleY: 1,
                      transition: { 
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                    style={{ transformOrigin: "top" }}
                  />
                  {/* Glowing shadow effect on hover */}
                  <motion.div
                    className="absolute -inset-2 bg-emerald-500/20 rounded-xl opacity-0 blur-xl group-hover/item:opacity-100 -z-10"
                    transition={{ duration: 0.3 }}
                  />
                  <p className="relative z-10 block pl-4 group-hover/item:pl-6 transition-all duration-300 group-hover/item:text-emerald-900">
                    Eden AI's integrator handles the authentication and billing with each AI provider, and its credentials are specific to each provider. It implements dynamic routing policies that prioritize pricing, quality, or latency on a per-organization basis. Edge deployment is available for latency-sensitive workloads or workloads where data must remain on premises for privacy reasons.
                  </p>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: -50,
                      rotateX: -15,
                      filter: "blur(10px)",
                      scale: 0.9
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      rotateX: 0,
                      filter: "blur(0px)",
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  className="transform-gpu cursor-pointer relative group/item"
                  whileHover={{ 
                    scale: 1.03,
                    x: 15,
                    transition: { 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-400 rounded-full opacity-0 group-hover/item:opacity-100"
                    initial={{ scaleY: 0 }}
                    whileHover={{ 
                      scaleY: 1,
                      transition: { 
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                    style={{ transformOrigin: "top" }}
                  />
                  <motion.div
                    className="absolute -inset-2 bg-emerald-500/20 rounded-xl opacity-0 blur-xl group-hover/item:opacity-100 -z-10"
                    transition={{ duration: 0.3 }}
                  />
                  <p className="relative z-10 block pl-4 group-hover/item:pl-6 transition-all duration-300 group-hover/item:text-emerald-900">
                    Performance in the three dimensions of cost, response speed, and output quality is calculated in units of cost per 1000 tokens (for text) or image/minute (for vision and speech tasks). Latency is measured at the 95th percentile (P95) to assess responsiveness under load and output quality is measured by benchmarking all API providers continuously to choose the best-performing models.
                  </p>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { 
                      opacity: 0, 
                      x: -50,
                      rotateX: -15,
                      filter: "blur(10px)",
                      scale: 0.9
                    },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      rotateX: 0,
                      filter: "blur(0px)",
                      scale: 1,
                      transition: {
                        duration: 0.8,
                        ease: [0.34, 1.56, 0.64, 1],
                        type: "spring",
                        stiffness: 100
                      }
                    }
                  }}
                  className="transform-gpu cursor-pointer relative group/item"
                  whileHover={{ 
                    scale: 1.03,
                    x: 15,
                    transition: { 
                      duration: 0.4,
                      type: "spring",
                      stiffness: 300
                    }
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-400 rounded-full opacity-0 group-hover/item:opacity-100"
                    initial={{ scaleY: 0 }}
                    whileHover={{ 
                      scaleY: 1,
                      transition: { 
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1]
                      }
                    }}
                    style={{ transformOrigin: "top" }}
                  />
                  <motion.div
                    className="absolute -inset-2 bg-emerald-500/20 rounded-xl opacity-0 blur-xl group-hover/item:opacity-100 -z-10"
                    transition={{ duration: 0.3 }}
                  />
                  <p className="relative z-10 block pl-4 group-hover/item:pl-6 transition-all duration-300 group-hover/item:text-emerald-900">
                    Developer capabilities include provider allowlists and deprecation policies, fallback logic, and full audit logging that allows end users to see every API call made, including prompts, responses, and routing logic. Governance policies also enforce regulatory compliance with laws such as GDPR and local data residency laws, while automatically redacting input and output data and allowing end users to set retention periods.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </Frame>
        </section>

        {/* Storyboard / Frames */}
        <section className="grid md:grid-cols-2 gap-6">
          <Frame icon={BarChart3} title="Market growth & trends (sourced)">
            <motion.div 
              className="h-56 relative group/chart"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-lg opacity-0 group-hover/chart:opacity-100 transition-opacity duration-500"
              />
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
                  <Line type="monotone" dataKey="Market" dot={{ r: 4 }} activeDot={{ r: 8 }} stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
            {/* Explanation below chart */}
            <motion.div 
              className="mt-3 p-3 rounded-xl bg-emerald-50 text-sm flex items-start gap-2 relative group/info"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.02, backgroundColor: "rgba(16, 185, 129, 0.15)" }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
              <Info className="w-4 h-4 mt-0.5 text-emerald-700" />
              </motion.div>
              <div>
                <p className="font-medium text-emerald-800">What this shows</p>
                <p className="text-slate-700">
                  Each dot is a figure reported by the cited source for that specific year. There is <strong>no interpolation</strong> between years. Hover the chart to see the exact value and which source it came from.
                </p>
                {activePoint && (
                  <motion.p 
                    className="mt-2 text-xs text-slate-600"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Hovering: <strong>{activePoint.year}</strong> — <strong>${activePoint.market}B</strong> ({activePoint.src})
                  </motion.p>
                )}
              </div>
            </motion.div>
            <motion.div 
              className="mt-3 flex flex-wrap gap-2 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              {[
                { href: "https://www.precedenceresearch.com/ai-api-market", text: "Precedence Research" },
                { href: "https://www.grandviewresearch.com/industry-analysis/ai-api-market-report", text: "Grand View Research" }
              ].map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700 relative group/link"
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {link.text}
                  <motion.span
                    whileHover={{ rotate: 45, scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </Frame>

          <Frame icon={Boxes} title="Plug & Play integration">
            <div className="grid grid-cols-2 gap-3">
              {providers.map((p, index) => (
                <motion.div 
                  key={p.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group/card"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 rounded-xl opacity-0 group-hover/card:opacity-100 blur-md transition-opacity duration-500 -z-10"
                  />
                  <div className="relative" style={{ perspective: 1000 }}>
                    <motion.div
                      className="border rounded-xl transition-all duration-300 border-emerald-100 cursor-pointer group-hover/card:border-emerald-400 group-hover/card:shadow-lg"
                      onClick={() => toggleFlip(p.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        animate={{ rotateY: flipped[p.name] ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
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
                            <motion.img 
                              src={logos[p.name]} 
                              alt={`${p.name} logo`} 
                              className="max-h-12 w-auto object-contain" 
                              loading="lazy" 
                              decoding="async" 
                              referrerPolicy="no-referrer" 
                              draggable={false}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 300 }}
                              onError={(e)=>{(e.currentTarget as HTMLImageElement).src='https://via.placeholder.com/80?text=Logo';}} 
                            />
                          </div>
                          <motion.a 
                            href={p.site} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-xs underline underline-offset-4 text-emerald-700 inline-flex items-center gap-1"
                            whileHover={{ scale: 1.1, x: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            Visit site
                            <motion.span
                              whileHover={{ rotate: 45 }}
                              transition={{ type: "spring", stiffness: 400 }}
                            >
                              <ExternalLink className="w-3 h-3" />
                            </motion.span>
                          </motion.a>
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
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Frame>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <Frame icon={Rocket} title="New business models in action">
            <motion.ul 
              className="text-sm list-disc pl-5 space-y-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 }
                }
              }}
            >
              {[
                "Usage-based, tiered plans; vertical bundles (healthcare, education) with compliance presets.",
                "AI performance marketplace: benchmark → route → monetize.",
                "No vendor lock-in: swap providers as pricing/quality/latency shift."
              ].map((text, i) => (
                <motion.li
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="group/item relative cursor-pointer"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-full opacity-0 group-hover/item:opacity-100"
                    initial={{ scaleY: 0 }}
                    whileHover={{ scaleY: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ transformOrigin: "top" }}
                  />
                  <span className="relative block pl-3 group-hover/item:text-emerald-900 transition-colors">{text}</span>
                </motion.li>
              ))}
              <motion.li 
                className="flex items-center gap-2 mt-4"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.05 }}
              >
                Edge routing 
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Switch checked={edgeMode} onCheckedChange={setEdgeMode} />
                </motion.div>
                <motion.span 
                  className="text-xs text-slate-600"
                  animate={{ color: edgeMode ? "#065f46" : "#64748b" }}
                  transition={{ duration: 0.3 }}
                >
                  {edgeMode ? "On (lower latency, less data egress)" : "Off"}
                </motion.span>
              </motion.li>
            </motion.ul>
          </Frame>

          <Frame icon={Users} title="Project team & goal">
            <motion.p 
              className="text-sm relative group/quote"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.span
                className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400 rounded-full opacity-0 group-hover/quote:opacity-100"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative block pl-4 italic">"Enable rapid, cost-effective digital innovation by integrating diverse AI APIs into a single, smart platform."</span>
            </motion.p>
            <motion.div 
              className="mt-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 }
                }
              }}
            >
              {"James McNamee, Laurie Byrne, Fiachra Tobin, Micheal Buckley, Ashwine Tirouvaroul, Natalia Sulatska".split(", ").map((n, i) => (
                <motion.div
                  key={n}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="inline-block"
                >
                  <TeamBadge name={n} />
                </motion.div>
              ))}
            </motion.div>
            <motion.div 
              className="mt-4 text-xs text-slate-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              Built as an interactive one-pager poster for demo/print.
            </motion.div>
          </Frame>
        </section>

        {/* Sources */}
        <motion.section 
          className="grid gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.03 }
            }
          }}
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            className="relative group"
          >
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
            />
            <Card className="rounded-2xl border-emerald-100 transition-all duration-300 group-hover:shadow-lg group-hover:border-emerald-300">
            <CardHeader className="pb-1">
                <CardTitle className="text-base text-slate-900">Source Links</CardTitle>
            </CardHeader>
            <CardContent className="text-sm flex flex-wrap gap-3">
                {[
                  { href: "https://www.precedenceresearch.com/ai-api-market", text: "Precedence Research — AI API Market 2024–2034" },
                  { href: "https://www.grandviewresearch.com/industry-analysis/ai-api-market-report", text: "Grand View Research — AI API Market to 2030" },
                  { href: "https://www.edenai.co/post/open-source-ai-apis-aggregator-by-eden-ai", text: "Eden AI — Open Source Aggregator" },
                  { href: "https://api4.ai/blog/ai-apis-what-they-are-and-why-they-matter-to-business", text: "API4.AI — What are AI APIs (2025)" },
                  { href: "https://www.sngular.com/insights/358/turn-your-apis-into-a-growth-engine-in-2025", text: "Sngular — APIs as a growth engine (2025)" },
                  { href: "https://www.toolmage.com/en/tool/eden-ai/", text: "Toolmage — Eden AI overview" },
                  { href: "https://platform.openai.com/docs/models", text: "OpenAI — API & Models" },
                  { href: "https://cloud.google.com/vertex-ai", text: "Google — Vertex AI" },
                  { href: "https://huggingface.co/docs/inference-providers/en/index", text: "Hugging Face — Inference Providers" },
                  { href: "https://platform.stability.ai/docs/api-reference", text: "Stability AI — REST API" },
                  { href: "https://www.anthropic.com/", text: "Anthropic — Claude" },
                  { href: "https://www.edenai.co/", text: "Eden AI — Unified API" }
                ].map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 underline underline-offset-4 text-emerald-700 relative group/link"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    whileHover={{ scale: 1.05, x: 5, color: "#065f46" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {link.text}
                    <motion.span
                      whileHover={{ rotate: 45, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </motion.span>
                  </motion.a>
                ))}
            </CardContent>
          </Card>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center text-xs text-slate-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <motion.p
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400 }}
          className="inline-block"
        >
        © {new Date().getFullYear()} Eden AI — Interactive Poster. Built for demonstration purposes.
        </motion.p>
      </motion.footer>
    </div>
  );
}

"use client"
import Link from "next/link"
import { Eye, ShieldAlert, BarChart3, Network, Bot, Zap, ArrowRight, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <header className="relative z-10 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center"><Eye className="w-5 h-5 text-black" /></div>
            <div>
              <span className="font-bold tracking-tight">VOXENTRA</span>
              <span className="ml-2 text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">SIH26152 • NTRO</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="https://github.com/abdulraufhkbk-creator/Voxentra" target="_blank"><Button variant="ghost" size="sm"><Github className="w-4 h-4" /> GitHub</Button></Link>
            <Link href="/login"><Button size="sm">Enter Console <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs mb-6">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Demo Mode • No API keys required
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
              See beyond<br /><span className="text-zinc-500">the feed.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
              NTRO-grade social media analytics. Detect coordinated bot campaigns, track misinformation, analyze sentiment shifts, and map influence networks — in real time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard"><Button size="lg" className="gap-2">Launch Dashboard <ArrowRight className="w-4 h-4" /></Button></Link>
              <Link href="/login"><Button variant="outline" size="lg">Analyst Login</Button></Link>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl">
              {[
                { k: "50K+", v: "Posts Analyzed / Day (Demo)" },
                { k: "22%", v: "Avg Bot Detection Rate" },
                { k: "<2s", v: "Threat Scoring Latency" },
                { k: "4", v: "Platforms Monitored" },
              ].map(i => (
                <Card key={i.k} className="bg-zinc-900/50 border-zinc-800"><CardContent className="p-4"><p className="text-2xl font-bold">{i.k}</p><p className="text-xs text-zinc-500 mt-1">{i.v}</p></CardContent></Card>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-900">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldAlert, title: "Threat Intel", desc: "Heuristic scoring for sensitive keywords, toxicity, virality, and coordination signals. Critical/High/Med/Low levels." },
              { icon: Bot, title: "Bot & Coordinated Behavior", desc: "Username patterns, engagement anomalies, posting bursts, content entropy to flag inauthentic accounts." },
              { icon: BarChart3, title: "Sentiment & Trends", desc: "Real-time sentiment time series, hashtag clustering, keyword extraction, viral tracking." },
              { icon: Network, title: "Network Mapping", desc: "Influence graph: influencers, amplifiers, bot clusters, organic communities. Link analysis." },
              { icon: Eye, title: "OSINT Ready", desc: "Built for NTRO workflows: investigations, case management, evidence tagging, report export." },
              { icon: Zap, title: "Browser Extension", desc: "Manifest V3 extension for on-page analysis while browsing Twitter, Reddit, Telegram." },
            ].map(f => (
              <Card key={f.title} className="bg-zinc-900/30 border-zinc-800 hover:border-zinc-700 transition-colors">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center mb-4"><f.icon className="w-5 h-5" /></div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">
          <Card className="bg-white text-black border-white">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold tracking-tight">Built for SIH26152 • NTRO</h3>
                <p className="text-sm text-zinc-600 mt-2 max-w-xl">Team VoxSentinel1. Problem Statement: Social Media Analytics. This production build uses Demo Mode by default — no live social API credentials required for evaluation. Switch to live mode by configuring .env.</p>
                <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                  <span className="px-2 py-1 rounded bg-black text-white">Next.js 15</span>
                  <span className="px-2 py-1 rounded bg-black text-white">Prisma + SQLite/Postgres</span>
                  <span className="px-2 py-1 rounded bg-black text-white">Recharts</span>
                  <span className="px-2 py-1 rounded bg-black text-white">JWT Auth</span>
                  <span className="px-2 py-1 rounded bg-black text-white">MV3 Extension</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Link href="/dashboard"><Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">Open Console</Button></Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-900 py-8">
        <div className="max-w-7xl mx-auto px-6 flex justify-between text-xs text-zinc-600">
          <span>© 2025 Voxentra • VoxSentinel1 • SIH26152</span>
          <span>NTRO • Demo Mode • No real social media access claimed</span>
        </div>
      </footer>
    </div>
  )
}

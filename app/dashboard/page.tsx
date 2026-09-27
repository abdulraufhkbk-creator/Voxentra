"use client"
import { useEffect, useState } from "react"
import { StatCard } from "@/components/dashboard/StatCard"
import { SentimentChart } from "@/components/dashboard/SentimentChart"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, Bot, Activity, TrendingUp, Users, Eye } from "lucide-react"
import { generateMockFeed, generateSentimentTimeSeries, generateTrendData, generateThreatAlerts } from "@/lib/analytics/mockGenerator"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null)
  const [sentiment, setSentiment] = useState<any[]>([])
  const [trends, setTrends] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/analytics/overview')
        if (res.ok) {
          const data = await res.json()
          setStats(data.stats)
          setSentiment(data.sentimentSeries)
          setTrends(data.trends)
          setAlerts(data.alerts)
        } else {
          throw new Error('fallback')
        }
      } catch {
        // fallback to mock generator
        setSentiment(generateSentimentTimeSeries(7))
        setTrends(generateTrendData())
        setAlerts(generateThreatAlerts())
        setStats({
          totalPosts: 12483,
          botPercent: 22.4,
          threatHigh: 147,
          activeInvestigations: 8,
          sentiment: { positive: 42, negative: 28, neutral: 22, mixed: 8 },
          platforms: { twitter: 45, reddit: 25, telegram: 20, instagram: 10 }
        })
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="p-12 text-zinc-500">Loading NTRO console...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Operational Overview</h1>
        <p className="text-sm text-zinc-500">Real-time social media intelligence • Demo Mode • Last sync: now</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Posts (24h)" value={stats.totalPosts?.toLocaleString() || "12,483"} change="+12% vs yesterday" trend="up" icon={Activity} />
        <StatCard title="Bot Activity" value={`${stats.botPercent || 22.4}%`} change="+3.2% spike detected" trend="down" icon={Bot} />
        <StatCard title="High Threats" value={String(stats.threatHigh || 147)} change="12 critical, 35 high" trend="down" icon={ShieldAlert} />
        <StatCard title="Active Investigations" value={String(stats.activeInvestigations || 8)} change="2 escalated" trend="neutral" icon={Eye} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SentimentChart data={sentiment} />
        </div>
        <Card>
          <CardHeader><CardTitle className="text-sm uppercase tracking-widest text-zinc-400">Threat Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((a: any) => (
              <div key={a.id} className="p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-sm font-medium leading-tight">{a.title}</p>
                  <Badge className={
                    a.severity === 'critical' ? 'bg-red-600' : a.severity === 'high' ? 'bg-orange-500' : a.severity === 'medium' ? 'bg-yellow-500 text-black' : 'bg-zinc-700'
                  }>{a.severity}</Badge>
                </div>
                <p className="text-xs text-zinc-500 mt-1">{a.description}</p>
                <p className="text-[10px] text-zinc-600 mt-2">{a.time || a.createdAt}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm uppercase tracking-widest text-zinc-400">Top Trending Keywords</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trends} layout="vertical">
                  <XAxis type="number" stroke="#52525b" fontSize={11} />
                  <YAxis dataKey="name" type="category" width={120} stroke="#a1a1aa" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#18181b', border: '1px solid #27272a' }} />
                  <Bar dataKey="value" fill="#fff" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm uppercase tracking-widest text-zinc-400">Platform Distribution & Sentiment</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xs text-zinc-500 mb-2">PLATFORMS</p>
              <div className="space-y-2">
                {Object.entries(stats.platforms || { twitter:45, reddit:25, telegram:20, instagram:10 }).map(([k,v]: any) => (
                  <div key={k} className="flex items-center gap-3">
                    <span className="text-xs w-20 capitalize">{k}</span>
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden"><div className="h-full bg-white" style={{ width: `${v}%` }} /></div>
                    <span className="text-xs text-zinc-400 w-8">{v}%</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-4 border-t border-zinc-800">
              <p className="text-xs text-zinc-500 mb-2">SENTIMENT BREAKDOWN</p>
              <div className="grid grid-cols-4 gap-2">
                {Object.entries(stats.sentiment || {}).map(([k,v]: any) => (
                  <div key={k} className="bg-zinc-900 p-3 rounded-lg text-center">
                    <p className="text-[10px] uppercase text-zinc-500">{k}</p>
                    <p className="text-lg font-bold mt-1">{v}%</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

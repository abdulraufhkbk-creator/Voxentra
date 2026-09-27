"use client"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { generateMockFeed, generateThreatAlerts } from "@/lib/analytics/mockGenerator"
import { threatColor } from "@/lib/utils"
import { ShieldAlert, AlertTriangle, Eye, ExternalLink } from "lucide-react"

export default function ThreatsPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [alerts, setAlerts] = useState<any[]>([])

  useEffect(() => {
    setPosts(generateMockFeed(60).filter(p=> ['high','critical'].includes(p.threatLevel)).sort((a,b)=> (b.toxicity - a.toxicity)))
    setAlerts(generateThreatAlerts())
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><ShieldAlert className="w-6 h-6 text-red-500" /> Threat Intelligence</h1>
          <p className="text-sm text-zinc-500">High & critical threats • Auto-scored via heuristics • Demo Mode</p>
        </div>
        <Badge variant="destructive" className="animate-pulse">LIVE MONITORING</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {posts.map(p=> (
            <Card key={p.id} className="border-l-2" style={{ borderLeftColor: p.threatLevel==='critical' ? '#dc2626' : '#f97316' }}>
              <CardContent className="p-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2"><Badge className={threatColor(p.threatLevel)}>{p.threatLevel.toUpperCase()}</Badge><span className="text-xs text-zinc-500">{p.platform} • {new Date(p.timestamp).toLocaleTimeString()}</span></div>
                  <span className="text-xs text-zinc-500">Toxicity {Math.round(p.toxicity*100)}% • Bot {Math.round(p.botScore*100)}%</span>
                </div>
                <p className="mt-2 text-sm">{p.content}</p>
                <div className="mt-3 flex gap-2 flex-wrap"><span className="text-xs text-zinc-500">@{p.author}</span>{p.hashtags.map((h:string)=> <span key={h} className="text-xs bg-zinc-800 px-2 py-0.5 rounded-full">{h}</span>)}</div>
                <div className="mt-3 flex gap-2"><Button size="sm" variant="outline" className="h-7 text-xs"><Eye className="w-3 h-3" /> Investigate</Button><Button size="sm" variant="ghost" className="h-7 text-xs"><ExternalLink className="w-3 h-3" /> View Source</Button></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle className="text-xs uppercase tracking-widest">Active Alerts</CardTitle></CardHeader><CardContent className="space-y-2">{alerts.map(a=> <div key={a.id} className="p-3 rounded bg-zinc-900 border border-zinc-800"><p className="text-sm font-medium flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-500" />{a.title}</p><p className="text-xs text-zinc-500 mt-1">{a.description}</p></div>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-xs uppercase tracking-widest">Threat Scoring Logic (Demo)</CardTitle></CardHeader><CardContent className="text-xs text-zinc-400 space-y-2">
            <p>• Sensitive keywords (national security, border, defense, election) +15</p>
            <p>• Toxicity &gt;0.6 +20</p>
            <p>• Bot score &gt;0.7 +25</p>
            <p>• Virality &gt;2000 +20</p>
            <p>• Coordination signals +20</p>
            <p className="pt-2 text-zinc-500">Real prod would use ML models + NTRO intel feeds.</p>
          </CardContent></Card>
        </div>
      </div>
    </div>
  )
}

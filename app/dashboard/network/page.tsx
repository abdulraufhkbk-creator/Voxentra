"use client"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateNetworkData } from "@/lib/analytics/mockGenerator"

export default function NetworkPage() {
  const [data, setData] = useState<any>({ nodes: [], links: [] })

  useEffect(() => { setData(generateNetworkData()) }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Influence Network</h1>
      <p className="text-sm text-zinc-500">Mapping amplifiers, bot clusters, and organic communities. Demo visualization using mock graph.</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-xs uppercase tracking-widest text-zinc-400">Network Graph (SVG Demo)</CardTitle></CardHeader>
          <CardContent>
            <div className="relative bg-zinc-950 rounded-lg border border-zinc-800 h-[500px] overflow-hidden p-4">
              <svg width="100%" height="100%" viewBox="0 0 600 400" className="bg-zinc-950">
                {data.links?.map((l:any,i:number)=> {
                  const s = data.nodes.find((n:any)=> n.id===l.source)
                  const t = data.nodes.find((n:any)=> n.id===l.target)
                  if (!s||!t) return null
                  const x1 = (parseInt(s.id.split('_')[1])* 23) % 550 + 25
                  const y1 = (parseInt(s.id.split('_')[1])* 37) % 350 + 25
                  const x2 = (parseInt(t.id.split('_')[1])* 23 + 50) % 550 + 25
                  const y2 = (parseInt(t.id.split('_')[1])* 53) % 350 + 25
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#27272a" strokeWidth={l.value/3} opacity={0.6} />
                })}
                {data.nodes?.map((n:any,i:number)=> {
                  const x = (i* 23) % 550 + 25
                  const y = (i* 37) % 350 + 25
                  const color = n.group==='influencer' ? '#fff' : n.group==='bot_cluster' ? '#ef4444' : n.group==='amplifier' ? '#f59e0b' : '#71717a'
                  return <g key={n.id}><circle cx={x} cy={y} r={n.size/2+3} fill={color} opacity={0.9} /><text x={x} y={y+25} fontSize="8" fill="#a1a1aa" textAnchor="middle">{n.label}</text></g>
                })}
              </svg>
              <div className="absolute bottom-3 left-3 flex gap-2 text-[10px]">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-white rounded-full" /> Influencer</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-amber-500 rounded-full" /> Amplifier</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full" /> Bot Cluster</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-zinc-500 rounded-full" /> Organic</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-4">
          <Card><CardHeader><CardTitle className="text-xs uppercase">Top Influencers</CardTitle></CardHeader><CardContent className="space-y-2">{data.nodes?.filter((n:any)=> n.group==='influencer').map((n:any)=> <div key={n.id} className="flex justify-between text-sm p-2 bg-zinc-900 rounded"><span>{n.label}</span><Badge variant="outline">{n.threat}</Badge></div>)}</CardContent></Card>
          <Card><CardHeader><CardTitle className="text-xs uppercase">Bot Clusters Detected</CardTitle></CardHeader><CardContent className="space-y-2">{data.nodes?.filter((n:any)=> n.group==='bot_cluster').slice(0,6).map((n:any)=> <div key={n.id} className="text-xs p-2 bg-red-950/20 border border-red-900/30 rounded"><p>{n.label} • size {n.size}</p><p className="text-zinc-500">Coordination likely • 78% same content hash</p></div>)}</CardContent></Card>
          <Card><CardContent className="p-4 text-xs text-zinc-500">Production implementation would use D3.js or Sigma.js with real-time graph DB (Neo4j) and community detection (Louvain). Demo shows structure.</CardContent></Card>
        </div>
      </div>
    </div>
  )
}

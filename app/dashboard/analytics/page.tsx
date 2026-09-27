"use client"
import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { generateMockFeed } from "@/lib/analytics/mockGenerator"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, LineChart, Line } from "recharts"

export default function AnalyticsPage() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/analytics/feed').then(r=>r.json()).then(d=> setPosts(d.posts || generateMockFeed(40))).catch(()=> setPosts(generateMockFeed(40)))
  }, [])

  const sentimentPie = [
    { name: 'positive', value: posts.filter(p=>p.sentiment==='positive').length },
    { name: 'negative', value: posts.filter(p=>p.sentiment==='negative').length },
    { name: 'neutral', value: posts.filter(p=>p.sentiment==='neutral').length },
    { name: 'mixed', value: posts.filter(p=>p.sentiment==='mixed').length },
  ]
  const COLORS: any = { positive: '#10b981', negative: '#ef4444', neutral: '#71717a', mixed: '#f59e0b' }

  const platformData = ['twitter','reddit','telegram','instagram'].map(p=> ({ name: p, count: posts.filter(x=>x.platform===p).length }))

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics Deep Dive</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-xs uppercase tracking-widest text-zinc-400">Sentiment Distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[240px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={sentimentPie} dataKey="value" nameKey="name" outerRadius={80} label>{sentimentPie.map((e,i)=><Cell key={i} fill={COLORS[e.name] || '#fff'} />)}</Pie><Tooltip contentStyle={{ background:'#18181b', border:'1px solid #27272a'}}/></PieChart></ResponsiveContainer></div>
            <div className="flex flex-wrap gap-2 mt-2">{sentimentPie.map(s=> <Badge key={s.name} variant="outline" className="capitalize">{s.name}: {s.value}</Badge>)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-xs uppercase tracking-widest text-zinc-400">Platform Volume</CardTitle></CardHeader>
          <CardContent><div className="h-[240px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={platformData}><XAxis dataKey="name" stroke="#52525b" fontSize={11}/><YAxis stroke="#52525b" fontSize={11}/><Tooltip contentStyle={{ background:'#18181b', border:'1px solid #27272a'}}/><Bar dataKey="count" fill="#fff" radius={[4,4,0,0]} /></BarChart></ResponsiveContainer></div></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-xs uppercase tracking-widest text-zinc-400">Toxicity vs Bot Score</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[240px] overflow-auto pr-2">
              {posts.slice(0,12).map(p=> (
                <div key={p.id} className="flex items-center gap-3 text-xs">
                  <span className="w-20 truncate">{p.author}</span>
                  <div className="flex-1 flex gap-1">
                    <div className="h-2 bg-red-900 rounded flex-1 overflow-hidden"><div className="h-full bg-red-500" style={{ width: `${(p.toxicity*100)}%` }} /></div>
                    <div className="h-2 bg-zinc-800 rounded flex-1 overflow-hidden"><div className="h-full bg-amber-500" style={{ width: `${(p.botScore*100)}%` }} /></div>
                  </div>
                  <span className="w-8 text-zinc-500">{Math.round(p.toxicity*100)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-xs uppercase tracking-widest text-zinc-400">Detailed Metrics</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full text-xs">
              <thead className="text-zinc-500 border-b border-zinc-800"><tr><th className="text-left py-2">Author</th><th>Platform</th><th>Sentiment</th><th>Threat</th><th>Bot%</th><th>Engagement</th></tr></thead>
              <tbody>{posts.slice(0,20).map(p=> <tr key={p.id} className="border-b border-zinc-900"><td className="py-2">{p.author}</td><td>{p.platform}</td><td>{p.sentiment}</td><td>{p.threatLevel}</td><td>{Math.round(p.botScore*100)}%</td><td>{p.likes+p.shares}</td></tr>)}</tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

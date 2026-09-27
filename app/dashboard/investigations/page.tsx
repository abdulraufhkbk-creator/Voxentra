"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileSearch, Plus } from "lucide-react"

const mockCases = [
  { id: "INV-001", title: "Coordinated Bot Campaign - #NationalSecurity", status: "open", priority: "critical", posts: 247, created: "2h ago" },
  { id: "INV-002", title: "Misinformation Video - Border Incident 2019 Reuse", status: "in_progress", priority: "high", posts: 52, created: "5h ago" },
  { id: "INV-003", title: "Foreign Influence Operation - Election Narrative", status: "escalated", priority: "critical", posts: 189, created: "1d ago" },
]

export default function InvestigationsPage() {
  const [cases, setCases] = useState(mockCases)
  const [showNew, setShowNew] = useState(false)
  const [newTitle, setNewTitle] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><FileSearch className="w-6 h-6" /> Investigations</h1>
          <p className="text-sm text-zinc-500">Case management for NTRO analysts • Demo data</p>
        </div>
        <Button onClick={()=> setShowNew(!showNew)}><Plus className="w-4 h-4" /> New Case</Button>
      </div>

      {showNew && (
        <Card><CardContent className="p-4 flex gap-2"><input value={newTitle} onChange={e=> setNewTitle(e.target.value)} placeholder="Case title e.g. Bot spike on #Election2025" className="flex-1 h-9 px-3 rounded bg-zinc-900 border border-zinc-800 text-sm" /><Button onClick={()=> { if(newTitle){ setCases([{ id:`INV-${Math.floor(Math.random()*1000)}`, title:newTitle, status:"open", priority:"medium", posts:0, created:"now" }, ...cases]); setNewTitle(""); setShowNew(false)} }}>Create</Button></CardContent></Card>
      )}

      <div className="grid gap-3">
        {cases.map(c=> (
          <Card key={c.id} className="hover:border-zinc-700">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2"><span className="text-xs font-mono text-zinc-500">{c.id}</span><Badge className={c.priority==='critical'?'bg-red-600': c.priority==='high'?'bg-orange-500':'bg-zinc-700'}>{c.priority}</Badge><Badge variant="outline">{c.status}</Badge></div>
                <p className="font-medium mt-1">{c.title}</p>
                <p className="text-xs text-zinc-500 mt-1">{c.posts} linked posts • Created {c.created}</p>
              </div>
              <Button variant="outline" size="sm">Open</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-dashed"><CardContent className="p-6 text-center text-sm text-zinc-500">Production would link to Prisma Investigation model, allow tagging posts, adding notes, assigning analysts, exporting PDF reports.</CardContent></Card>
    </div>
  )
}

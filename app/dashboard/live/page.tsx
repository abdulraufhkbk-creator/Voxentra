"use client"
import { useEffect, useState } from "react"
import { FeedList } from "@/components/dashboard/FeedList"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateMockFeed } from "@/lib/analytics/mockGenerator"
import { Pause, Play, Filter } from "lucide-react"

export default function LiveFeedPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [isLive, setIsLive] = useState(true)
  const [filter, setFilter] = useState<string>("all")

  useEffect(() => {
    setPosts(generateMockFeed(30))
    if (!isLive) return
    const id = setInterval(() => {
      setPosts(prev => [generateMockFeed(1)[0], ...prev].slice(0, 100))
    }, 3000)
    return () => clearInterval(id)
  }, [isLive])

  const filtered = posts.filter(p=> {
    if (filter==="all") return true
    if (filter==="bots") return p.isBot
    if (filter==="threats") return ['high','critical'].includes(p.threatLevel)
    if (filter==="twitter") return p.platform==='twitter'
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Live Feed</h1>
          <p className="text-sm text-zinc-500">Real-time ingestion simulation • {isLive ? "Live" : "Paused"} • {posts.length} posts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={()=> setIsLive(!isLive)}>{isLive ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Resume</>}</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-3 flex gap-2 flex-wrap">
          {[
            { id: "all", label: "All" },
            { id: "threats", label: "High Threats" },
            { id: "bots", label: "Bots Only" },
            { id: "twitter", label: "Twitter" },
          ].map(f=> (
            <button key={f.id} onClick={()=> setFilter(f.id)} className={`px-3 py-1 rounded-full text-xs border ${filter===f.id ? 'bg-white text-black border-white' : 'border-zinc-800 text-zinc-400 hover:text-white'}`}>{f.label}</button>
          ))}
          <span className="ml-auto text-xs text-zinc-600 flex items-center gap-1"><Filter className="w-3 h-3" /> Demo filtering</span>
        </CardContent>
      </Card>

      <FeedList posts={filtered} />
    </div>
  )
}

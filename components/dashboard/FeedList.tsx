"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { threatColor, sentimentColor, formatNumber } from "@/lib/utils"
import { Bot, MapPin, Heart, Repeat2, MessageCircle } from "lucide-react"

export function FeedList({ posts }: { posts: any[] }) {
  return (
    <div className="space-y-3">
      {posts.map((p) => (
        <Card key={p.id} className="hover:border-zinc-700 transition-colors">
          <CardContent className="p-4">
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono text-zinc-500">{p.platform}</span>
                  <span className="text-sm font-medium">@{p.author}</span>
                  {p.isBot && <Badge variant="destructive" className="gap-1 text-[10px]"><Bot className="w-3 h-3" /> BOT {Math.round(p.botScore*100)}%</Badge>}
                  <Badge className={threatColor(p.threatLevel)}>{p.threatLevel}</Badge>
                  <span className={`text-xs ${sentimentColor(p.sentiment)}`}>{p.sentiment} ({p.sentimentScore?.toFixed(2)})</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-200">{p.content}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.hashtags?.map((h: string) => <span key={h} className="text-[11px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400">{h}</span>)}
                </div>
                <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {formatNumber(p.likes)}</span>
                  <span className="flex items-center gap-1"><Repeat2 className="w-3 h-3" /> {formatNumber(p.shares)}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {formatNumber(p.comments)}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {p.location}</span>
                  <span>{new Date(p.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right hidden md:block">
                <p className="text-[10px] text-zinc-500">TOXICITY</p>
                <div className="w-16 h-1.5 bg-zinc-800 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${Math.round((p.toxicity||0)*100)}%` }} />
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">{Math.round((p.toxicity||0)*100)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

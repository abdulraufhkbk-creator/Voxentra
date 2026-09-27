"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-2xl font-bold">Settings & Configuration</h1>

      <Card>
        <CardHeader><CardTitle className="text-sm uppercase tracking-widest">Demo Mode</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between items-center p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-lg">
            <div><p className="font-medium">Demo Mode Active</p><p className="text-xs text-zinc-500">Using mock data generator, no real API calls</p></div>
            <Badge className="bg-emerald-600">ON</Badge>
          </div>
          <p className="text-zinc-400">To enable live mode:</p>
          <pre className="bg-zinc-900 p-3 rounded text-xs overflow-auto">DEMO_MODE=false
TWITTER_BEARER_TOKEN=your_token
REDDIT_CLIENT_ID=...
NEWS_API_KEY=...
DATABASE_URL=postgresql://...</pre>
          <p className="text-xs text-zinc-500">Live mode would replace mockGenerator with real API clients in /lib/analytics. Never claim live access unless configured.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm uppercase tracking-widest">System Info</CardTitle></CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
          <div><p className="text-zinc-500 text-xs">VERSION</p><p>1.0.0-production</p></div>
          <div><p className="text-zinc-500 text-xs">BUILD</p><p>Next.js 15 • Prisma 5 • SQLite/Postgres</p></div>
          <div><p className="text-zinc-500 text-xs">TEAM</p><p>VoxSentinel1 • SIH26152 • NTRO</p></div>
          <div><p className="text-zinc-500 text-xs">SECURITY</p><p>JWT • bcrypt • Restricted classification</p></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-sm uppercase tracking-widest">Browser Extension</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-2">
          <p>Extension located at /extension folder.</p>
          <p className="text-zinc-500">Manifest V3 • Content script analyzes visible posts on Twitter/Reddit • Popup shows threat score • Background syncs with Voxentra API.</p>
          <p className="text-xs">Load unpacked in chrome://extensions for testing.</p>
        </CardContent>
      </Card>
    </div>
  )
}

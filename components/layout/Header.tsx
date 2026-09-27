"use client"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Shield, Clock } from "lucide-react"

export function Header() {
  const [time, setTime] = useState<string>("")
  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })), 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <header className="h-14 border-b border-zinc-800 bg-black/30 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="gap-1.5"><Shield className="w-3 h-3" /> NTRO CLASSIFICATION: RESTRICTED</Badge>
        <span className="text-xs text-zinc-500 hidden md:flex items-center gap-1"><Clock className="w-3 h-3" /> IST {time}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-xs font-medium">Analyst Session</p>
          <p className="text-[10px] text-zinc-500">VoxSentinel1 • SIH26152</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold">VS</div>
      </div>
    </header>
  )
}

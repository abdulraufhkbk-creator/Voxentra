import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export function StatCard({ title, value, change, icon: Icon, trend }: { title: string, value: string, change?: string, icon: LucideIcon, trend?: 'up'|'down'|'neutral' }) {
  return (
    <Card className="bg-zinc-900/60 border-zinc-800">
      <CardContent className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[11px] tracking-widest text-zinc-500 uppercase">{title}</p>
            <p className="text-2xl font-bold mt-2 tracking-tight">{value}</p>
            {change && <p className={cn("text-xs mt-1 flex items-center gap-1", trend==='up'?'text-emerald-400': trend==='down'?'text-red-400':'text-zinc-400')}>{change}</p>}
          </div>
          <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
            <Icon className="w-5 h-5 text-zinc-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

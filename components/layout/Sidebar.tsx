"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  BarChart3, 
  ShieldAlert, 
  Network, 
  FileSearch, 
  Settings, 
  Eye,
  Activity,
  LogOut
} from "lucide-react"

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/threats", label: "Threat Intel", icon: ShieldAlert },
  { href: "/dashboard/network", label: "Network Graph", icon: Network },
  { href: "/dashboard/investigations", label: "Investigations", icon: FileSearch },
  { href: "/dashboard/live", label: "Live Feed", icon: Activity },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-64 border-r border-zinc-800 bg-black/50 backdrop-blur-xl flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <Eye className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight">VOXENTRA</h1>
            <p className="text-[10px] text-zinc-500 tracking-[0.2em]">NTRO • SIH26152</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {nav.map(item => {
          const active = pathname === item.href
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
              active ? "bg-white text-black font-medium" : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            )}>
              <item.icon className="w-4 h-4" />
              {item.label}
              {item.href === '/dashboard/threats' && <span className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium">Demo Mode Active</span>
          </div>
          <p className="text-[11px] text-zinc-500">Mock data • No real API keys required. Ready for NTRO evaluation.</p>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.href='/login'}} className="mt-3 flex items-center gap-2 text-xs text-zinc-500 hover:text-white w-full px-2 py-1">
          <LogOut className="w-3 h-3" /> Sign out
        </button>
      </div>
    </aside>
  )
}

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants: Record<string, string> = {
    default: "bg-white text-black",
    secondary: "bg-zinc-800 text-zinc-100",
    destructive: "bg-red-600 text-white",
    outline: "border border-zinc-700 text-zinc-300",
  }
  return <div className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors", variants[variant], className)} {...props} />
}

export { Badge }

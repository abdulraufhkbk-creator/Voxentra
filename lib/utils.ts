import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1000000) return (n/1000000).toFixed(1)+'M'
  if (n >= 1000) return (n/1000).toFixed(1)+'K'
  return n.toString()
}

export function threatColor(level: string) {
  switch(level) {
    case 'critical': return 'bg-red-600 text-white'
    case 'high': return 'bg-orange-500 text-white'
    case 'medium': return 'bg-yellow-500 text-black'
    case 'low': return 'bg-green-500 text-white'
    default: return 'bg-gray-500 text-white'
  }
}

export function sentimentColor(sentiment: string) {
  switch(sentiment) {
    case 'positive': return 'text-emerald-400'
    case 'negative': return 'text-red-400'
    case 'neutral': return 'text-zinc-400'
    case 'mixed': return 'text-amber-400'
    default: return 'text-zinc-400'
  }
}

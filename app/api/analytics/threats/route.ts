import { NextResponse } from 'next/server'
import { generateMockFeed, generateThreatAlerts } from '@/lib/analytics/mockGenerator'

export async function GET() {
  const feed = generateMockFeed(100)
  const threats = feed.filter(p=> ['high','critical'].includes(p.threatLevel)).sort((a,b)=> b.toxicity - a.toxicity)
  return NextResponse.json({ mode: 'demo', threats, alerts: generateThreatAlerts(), count: threats.length })
}

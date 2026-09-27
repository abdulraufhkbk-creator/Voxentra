import { NextResponse } from 'next/server'
import { generateMockFeed, generateSentimentTimeSeries, generateTrendData, generateThreatAlerts } from '@/lib/analytics/mockGenerator'

export async function GET() {
  const isDemo = process.env.DEMO_MODE !== 'false'

  if (isDemo) {
    const feed = generateMockFeed(100)
    const highThreats = feed.filter(p=> ['high','critical'].includes(p.threatLevel)).length
    const botPercent = (feed.filter(p=> p.isBot).length / feed.length * 100).toFixed(1)
    
    return NextResponse.json({
      mode: 'demo',
      stats: {
        totalPosts: feed.length * 124, // scaled
        botPercent: parseFloat(botPercent),
        threatHigh: highThreats * 3,
        activeInvestigations: 8,
        sentiment: {
          positive: Math.round(feed.filter(p=> p.sentiment==='positive').length / feed.length * 100),
          negative: Math.round(feed.filter(p=> p.sentiment==='negative').length / feed.length * 100),
          neutral: Math.round(feed.filter(p=> p.sentiment==='neutral').length / feed.length * 100),
          mixed: Math.round(feed.filter(p=> p.sentiment==='mixed').length / feed.length * 100),
        },
        platforms: {
          twitter: Math.round(feed.filter(p=> p.platform==='twitter').length / feed.length * 100),
          reddit: Math.round(feed.filter(p=> p.platform==='reddit').length / feed.length * 100),
          telegram: Math.round(feed.filter(p=> p.platform==='telegram').length / feed.length * 100),
          instagram: Math.round(feed.filter(p=> p.platform==='instagram').length / feed.length * 100),
        }
      },
      sentimentSeries: generateSentimentTimeSeries(7),
      trends: generateTrendData(),
      alerts: generateThreatAlerts(),
      notice: 'Demo Mode: mock data. No live social media access.'
    })
  }

  // TODO: Live mode would query DB and real APIs
  return NextResponse.json({ error: 'Live mode not configured. Set DEMO_MODE=true or configure API keys.' }, { status: 501 })
}

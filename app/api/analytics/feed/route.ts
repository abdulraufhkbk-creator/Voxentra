import { NextRequest, NextResponse } from 'next/server'
import { generateMockFeed } from '@/lib/analytics/mockGenerator'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const count = parseInt(searchParams.get('count') || '50')
  const platform = searchParams.get('platform')
  const threat = searchParams.get('threat')

  const isDemo = process.env.DEMO_MODE !== 'false'

  if (isDemo) {
    let feed = generateMockFeed(count)
    if (platform) feed = feed.filter(p=> p.platform===platform)
    if (threat) feed = feed.filter(p=> p.threatLevel===threat)
    return NextResponse.json({ mode: 'demo', posts: feed, count: feed.length })
  }

  // Live mode: query DB
  try {
    const where: any = {}
    if (platform) where.platform = platform
    if (threat) where.threatLevel = threat

    const posts = await prisma.socialPost.findMany({ where, orderBy: { timestamp: 'desc' }, take: count })
    return NextResponse.json({ mode: 'live', posts, count: posts.length })
  } catch (e) {
    console.error(e)
    // fallback to demo
    return NextResponse.json({ mode: 'demo_fallback', posts: generateMockFeed(count), count })
  }
}

export async function POST(req: NextRequest) {
  // For extension or ingestion
  try {
    const body = await req.json()
    // In demo, just echo with analysis
    const { analyzeSentiment } = await import('@/lib/analytics/sentiment')
    const { calculateThreatLevel } = await import('@/lib/analytics/threat')
    const { detectBot } = await import('@/lib/analytics/botDetection')

    const sentiment = analyzeSentiment(body.content || '')
    const threat = calculateThreatLevel({ content: body.content || '', toxicity: sentiment.toxicity, botScore: 0.2, likes: body.likes || 0, shares: body.shares || 0 })
    const bot = detectBot({ author: body.author || 'unknown', content: body.content || '', likes: body.likes || 0, shares: body.shares || 0, timestamp: new Date().toISOString() })

    return NextResponse.json({ sentiment, threat, bot, received: body })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}

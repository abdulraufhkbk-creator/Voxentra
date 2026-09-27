import { NextResponse } from 'next/server'

export async function GET() {
  const demoMode = process.env.DEMO_MODE !== 'false'
  const hasTwitter = !!process.env.TWITTER_BEARER_TOKEN
  const hasReddit = !!process.env.REDDIT_CLIENT_ID
  const hasNews = !!process.env.NEWS_API_KEY
  const dbUrl = process.env.DATABASE_URL || 'not set'
  const dbType = dbUrl.startsWith('postgresql') ? 'postgres' : dbUrl.startsWith('file:') ? 'sqlite' : 'unknown'

  return NextResponse.json({
    version: '1.0.0-production',
    team: 'VoxSentinel1',
    problem: 'SIH26152 - Social Media Analytics',
    org: 'NTRO',
    mode: demoMode ? 'demo' : 'live',
    integrations: {
      twitter: hasTwitter ? 'configured' : 'not_configured (demo)',
      reddit: hasReddit ? 'configured' : 'not_configured (demo)',
      newsapi: hasNews ? 'configured' : 'not_configured (demo)',
    },
    database: {
      type: dbType,
      url_masked: dbUrl.replace(/:.*@/, ':****@'),
    },
    features: {
      sentiment_analysis: demoMode ? 'rule_based_demo' : 'ml_model',
      threat_intel: 'heuristic_demo',
      bot_detection: 'heuristic_demo',
      network_graph: 'svg_demo',
      extension: 'mv3_ready',
    },
    disclaimer: demoMode ? 'Demo Mode active: No real social media API calls. Mock data only.' : 'Live mode: Real APIs will be used if configured.',
    timestamp: new Date().toISOString(),
  })
}

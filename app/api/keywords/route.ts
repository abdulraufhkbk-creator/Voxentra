import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const keywords = await prisma.keywordTrack.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => [])
    if (keywords.length === 0) {
      // demo fallback
      return NextResponse.json({
        mode: 'demo',
        keywords: [
          { id: '1', keyword: 'national security', category: 'security', isActive: true },
          { id: '2', keyword: 'election', category: 'political', isActive: true },
          { id: '3', keyword: 'misinformation', category: 'threat', isActive: true },
          { id: '4', keyword: 'cyber attack', category: 'security', isActive: true },
        ]
      })
    }
    return NextResponse.json({ mode: 'live', keywords })
  } catch {
    return NextResponse.json({ mode: 'demo_fallback', keywords: [] })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { keyword, category } = await req.json()
    if (!keyword) return NextResponse.json({ error: 'Keyword required' }, { status: 400 })
    try {
      const created = await prisma.keywordTrack.create({ data: { keyword, category: category || 'general' } })
      return NextResponse.json({ keyword: created, mode: 'live' })
    } catch {
      return NextResponse.json({ keyword: { id: Date.now().toString(), keyword, category: category || 'general', isActive: true }, mode: 'demo' })
    }
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getTokenFromRequest, verifyJWT } from '@/lib/auth'

const mockInvestigations = [
  { id: "INV-001", title: "Coordinated Bot Campaign - #NationalSecurity", status: "open", priority: "critical", posts: 247, createdAt: new Date().toISOString(), description: "300% bot spike detected" },
  { id: "INV-002", title: "Misinformation Video - Border Incident 2019 Reuse", status: "in_progress", priority: "high", posts: 52, createdAt: new Date().toISOString(), description: "Out-of-context video viral" },
]

export async function GET(req: NextRequest) {
  const token = getTokenFromRequest(req)
  if (token) {
    const payload = await verifyJWT(token)
    if (!payload) {
      // still allow demo read
    }
  }

  try {
    const investigations = await prisma.investigation.findMany({ orderBy: { createdAt: 'desc' } }).catch(() => mockInvestigations)
    if (Array.isArray(investigations) && investigations.length === 0) {
      return NextResponse.json({ investigations: mockInvestigations, mode: 'demo' })
    }
    return NextResponse.json({ investigations, mode: investigations === mockInvestigations ? 'demo' : 'live' })
  } catch {
    return NextResponse.json({ investigations: mockInvestigations, mode: 'demo_fallback' })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, priority } = body
    if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 })

    const token = getTokenFromRequest(req)
    let userId = 'demo_analyst'
    if (token) {
      const payload = await verifyJWT(token)
      if (payload?.id) userId = payload.id as string
    }

    try {
      const inv = await prisma.investigation.create({
        data: {
          title,
          description: description || '',
          priority: priority || 'medium',
          status: 'open',
          createdBy: userId,
          tags: JSON.stringify([]),
          posts: JSON.stringify([]),
        }
      })
      return NextResponse.json({ investigation: inv, mode: 'live' })
    } catch {
      // mock fallback
      const mock = { id: `INV-${Date.now()}`, title, description, priority: priority || 'medium', status: 'open', createdBy: userId, createdAt: new Date().toISOString() }
      return NextResponse.json({ investigation: mock, mode: 'demo' })
    }
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }
}

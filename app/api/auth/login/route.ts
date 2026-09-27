import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword, signJWT } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

    let user = await prisma.user.findUnique({ where: { email } })
    
    // Auto-create demo users if not exist (for easy evaluation)
    if (!user && (email === 'analyst@voxentra.local' || email === 'admin@voxentra.ntro')) {
      const bcrypt = await import('bcryptjs')
      const hashed = await bcrypt.hash('Voxentra@2025', 10)
      user = await prisma.user.create({
        data: { email, name: email.includes('admin') ? 'NTRO Admin' : 'Demo Analyst', password: hashed, role: email.includes('admin') ? 'admin' : 'analyst' }
      })
    }

    if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const valid = await verifyPassword(password, user.password)
    if (!valid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })

    const token = await signJWT({ id: user.id, email: user.email, role: user.role, name: user.name })

    const res = NextResponse.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } })
    res.cookies.set('voxentra_token', token, { httpOnly: false, path: '/', maxAge: 60*60*24*7 })
    return res
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

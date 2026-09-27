import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple JWT check without jose in middleware (edge-compatible)
// We just check existence of token cookie; full verification happens in API routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('voxentra_token')?.value || request.headers.get('authorization')?.replace('Bearer ', '')
    
    // Allow if token exists (detailed verification in page/API)
    // For Demo Mode, we allow even without token but redirect to login if no token and not in demo auto-login
    if (!token) {
      // Check if it's an API request
      if (pathname.startsWith('/api')) {
        return NextResponse.next()
      }
      // For pages, allow client-side redirect (so we don't block static generation)
      // But we can set a header
      const response = NextResponse.next()
      response.headers.set('x-voxentra-auth', 'missing')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

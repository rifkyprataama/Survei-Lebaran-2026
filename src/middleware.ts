import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Cek apakah user mau masuk ke halaman admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Cek apakah ada cookie login
    const isLoggedIn = request.cookies.get('admin_session')
    
    // Jika tidak ada cookie, tendang ke halaman login
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}

// Tentukan halaman mana saja yang kena aturan ini
export const config = {
  matcher: '/admin/:path*',
}
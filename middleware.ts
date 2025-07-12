import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/dashboard/:path*', '/projects/:path*', '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|error|404|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
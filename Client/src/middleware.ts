import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check for the accessToken cookie
  const accessToken = request.cookies.get('accessToken');

  if (!accessToken) {
    // Not authenticated, redirect to SignIn
    return NextResponse.redirect(new URL('/SignIn', request.url));
  }

  // Authenticated, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/hero', '/newTicket'],
}

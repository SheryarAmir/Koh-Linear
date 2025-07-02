import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Define protected routes (actual paths)
  const protectedPaths = ['/dashboard', '/newTicket', '/(feed)/dashboard', '/(feed)/newTicket'];
  const { pathname } = request.nextUrl;

  // Check if the current path is protected
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
  console.log('Middleware triggered for:', pathname, '| Protected:', isProtected);

  // If protected, check for auth cookie
  if (isProtected) {
    const accessToken = request.cookies.get('accessToken');
    console.log('Access Token:', accessToken);
    
    if (!accessToken) {
      const loginUrl = new URL('/SignIn', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow request to proceed
  return NextResponse.next();
}

// Specify the paths the middleware should run on (actual paths)
export const config = {
  matcher: [
    '/dashboard',
    '/newTicket',
    '/(feed)/dashboard',
    '/(feed)/newTicket',
  ],
};

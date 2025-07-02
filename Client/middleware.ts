import { NextRequest, NextResponse } from 'next/server';

// List of protected routes
const protectedRoutes = ['/hero', '/newtickets'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the current path is protected
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Check for the accessToken cookie
    const accessToken = request.cookies.get('accessToken');
    if (!accessToken) {
      // Redirect to SignIn if not authenticated
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = '/SignIn';
      return NextResponse.redirect(signInUrl);
    }
  }

  // Allow the request if authenticated or not a protected route
  return NextResponse.next();
}

// Specify the matcher for the middleware
export const config = {
  matcher: ['/heron/:path*', '/newtickets/:path*'],
}; 
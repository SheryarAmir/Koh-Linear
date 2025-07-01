
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { jwtDecode } from "jwt-decode";

// // Temporarily simplified for debugging
// const publicPaths = ['/login', '/', '/destinations', '/packages', '/contact'];

// // Add /profile to protected paths
// const protectedPaths = ['/feed', '/profile', '/dashboard', '/admin'];

// interface DecodedToken {
//   exp: number;
//   role: string;
//   sub: string;
// }

// function verifyToken(token: string) {
//   try {
//     const decoded = jwtDecode<DecodedToken>(token);
//     const currentTime = Date.now() / 1000;
//     return decoded.exp > currentTime;
//   } catch {
//     return false;
//   }
// }
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   // Skip middleware for API routes and static files
//   if (pathname.startsWith('/api') || 
//       pathname.startsWith('/_next') || 
//       pathname.includes('favicon.ico')) {
//     return NextResponse.next();
//   }
//   // Allow public paths
//   const isPublicPath = publicPaths.some(path => path === pathname);
//   if (isPublicPath) {
//     return NextResponse.next();
//   }
//   const token = request.cookies.get("accessToken")?.value;
//   // Debug logging for protected paths
//   if (protectedPaths.some(path => pathname.startsWith(path))) {
//     console.log('MIDDLEWARE: token:', token, 'verifyToken:', verifyToken(token || ''));
//     if (!token || !verifyToken(token)) {
//       const signinUrl = new URL('/SignIn', request.url);
//       return NextResponse.redirect(signinUrl);
//     }
//     // Optionally: check for valid roles here if needed
//     return NextResponse.next();
//   }
//   // Admin routes: Only admins can access /dashboard and /admin
//   if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
//     if (!token) {
//       const signinUrl = new URL('/SignIn', request.url);
//       return NextResponse.redirect(signinUrl);
//     }
//     try {
//       const decoded = jwtDecode<DecodedToken>(token);
//       if (decoded.role !== 'admin' || !verifyToken(token)) {
//         // Non-admins or invalid tokens are redirected to /feed with error=notfound
//         return NextResponse.redirect(new URL('/feed?error=notfound', request.url));
//       }
//     } catch {
//       const signinUrl = new URL('/SignIn', request.url);
//       return NextResponse.redirect(signinUrl);
//     }
//   }
//   // Feed and Profile routes: Only non-admins can access /feed and /profile
//   if (pathname.startsWith('/feed') || pathname.startsWith('/profile')) {
//     if (!token) {
//       const signinUrl = new URL('/SignIn', request.url);
//       return NextResponse.redirect(signinUrl);
//     }
//     try {
//       const decoded = jwtDecode<DecodedToken>(token);
//       if (decoded.role === 'admin' || !verifyToken(token)) {
//         // Admins or invalid tokens are redirected to /dashboard with error=notfound
//         return NextResponse.redirect(new URL('/dashboard?error=notfound', request.url));
//       }
//     } catch {
//       const signinUrl = new URL('/SignIn', request.url);
//       return NextResponse.redirect(signinUrl);
//     }
//   }
//   // SignIn route: redirect based on role
//   if (pathname === '/SignIn') {
//     if (token && verifyToken(token)) {
//       try {
//         const decoded = jwtDecode<DecodedToken>(token);
//         if (decoded.role === 'admin') {
//           return NextResponse.redirect(new URL('/dashboard', request.url));
//         } else {
//           return NextResponse.redirect(new URL('/feed', request.url));
//         }
//       } catch {
//         return NextResponse.next();
//       }
//     }
//     return NextResponse.next();
//   }
//   return NextResponse.next();
// }
// export const config = {
//   matcher: [
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };
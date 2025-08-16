import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isLoggedIn = !!req.nextauth.token;

    // If user is logged in and trying to access login/signup, redirect to chat
    if (isLoggedIn && (pathname === '/login' || pathname === '/signup')) {
      const newSessionId = crypto.randomUUID();
      return NextResponse.redirect(new URL(`/chat?sessionId=${newSessionId}`, req.url));
    }

    // Redirect root to appropriate page based on auth status
    if (pathname === '/') {
      if (isLoggedIn) {
        const newSessionId = crypto.randomUUID();
        return NextResponse.redirect(new URL(`/chat?sessionId=${newSessionId}`, req.url));
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Redirect /chat without sessionId to new session (only if logged in)
    if (pathname === '/chat' && !req.nextUrl.searchParams.get('sessionId')) {
      if (isLoggedIn) {
        const newSessionId = crypto.randomUUID();
        return NextResponse.redirect(new URL(`/chat?sessionId=${newSessionId}`, req.url));
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Remove /explore routes if they exist
    if (pathname.startsWith('/explore')) {
      if (isLoggedIn) {
        const newSessionId = crypto.randomUUID();
        return NextResponse.redirect(new URL(`/chat?sessionId=${newSessionId}`, req.url));
      } else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Allow access to public routes
        const publicRoutes = ['/login', '/signup', '/pricing'];
        const isPublicRoute = publicRoutes.includes(pathname);
        
        // Allow API routes
        if (pathname.startsWith('/api/')) {
          return true;
        }
        
        // Allow public routes without authentication
        if (isPublicRoute) {
          return true;
        }
        
        // Require authentication for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};

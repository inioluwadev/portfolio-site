import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { getSettings } from '@/lib/data';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  requestHeaders.set('x-next-pathname', pathname);

  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: {
                headers: requestHeaders,
              },
            });
            response.cookies.set({ name, value, ...options });
          } catch (error) {
            // Can be ignored if middleware is refreshing sessions
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            request.cookies.set({ name, value: '', ...options });
            response = NextResponse.next({
              request: {
                headers: requestHeaders,
              },
            });
            response.cookies.set({ name, value: '', ...options });
          } catch (error) {
             // Can be ignored if middleware is refreshing sessions
          }
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const settings = await getSettings();

  const isAdminPath = pathname.startsWith('/admin') || pathname === '/login';
  const isMaintenancePath = pathname === '/maintenance';
  const isComingSoonPath = pathname === '/coming-soon';

  // If user is an admin, let them through to any page.
  if (user && user.role === 'authenticated') {
    return response;
  }

  // Handle Maintenance Mode
  if (settings?.site_mode === 'maintenance' && !isMaintenancePath && !isAdminPath) {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }
  
  // Handle Coming Soon Mode
  if (settings?.site_mode === 'coming_soon' && !isComingSoonPath && !isAdminPath) {
    return NextResponse.redirect(new URL('/coming-soon', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};

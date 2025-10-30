import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createSupabaseServerRouteHandler } from "@/lib/supabase";
import { getSubdomainFromHost, getTenantUrl } from "./lib/helpers/tenant";

// Exclude static assets, images, and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/ (API routes)
     * - public/ (public folder)
     * - .png, .jpg, .jpeg, .gif, .webp, .ico, .svg (image files)
     */
    "/((?!_next/static|_next/image|favicon.ico|api/|public/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};

// Public routes that don't require authentication
const PUBLIC_ROUTES = ["/login", "/signup", "/", "/forgot-password"];

// Protected routes that require authentication and valid subdomain
const PROTECTED_ROUTES = [
  "/dashboard",
  "/cases",
  "/contacts",
  "/documents",
  "/settings",
  "/profile",
];

function getUserAccountSlug(user: any): string | null {
  return user?.app_metadata?.accountSlug || null;
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

export async function proxy(req: NextRequest) {
  const host = req.headers.get("host");
  const subdomain = getSubdomainFromHost(host);
  const pathname = req.nextUrl.pathname;

  // Initialize Supabase for auth checks
  const supabase = await createSupabaseServerRouteHandler();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  function redirectOrRewrite(target: string) {
    if (target.startsWith("/")) {
      const url = req.nextUrl.clone();
      url.pathname = target;
      return NextResponse.rewrite(url);
    }
    return NextResponse.redirect(target);
  }

  // Cache the user's account slug for this request (now synchronous from metadata)
  let cachedUserAccountSlug: string | null | undefined = undefined;
  function getCachedUserAccountSlug() {
    if (cachedUserAccountSlug !== undefined) return cachedUserAccountSlug;
    cachedUserAccountSlug = authUser ? getUserAccountSlug(authUser) : null;
    return cachedUserAccountSlug;
  }

  // ============================================================================
  // ROOT DOMAIN HANDLING (nshito.com without subdomain)
  // ============================================================================
  if (!subdomain && host && !host.includes("localhost")) {
    // If authenticated, redirect to their subdomain
    if (authUser) {
      const accountSlug = getCachedUserAccountSlug();
      if (accountSlug) {
        return redirectOrRewrite(getTenantUrl(accountSlug, "/dashboard"));
      }
    }
    // If not authenticated, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ============================================================================
  // PUBLIC ROUTES - No authentication needed
  // ============================================================================
  if (isPublicRoute(pathname)) {
    // If user is already logged in, redirect to their dashboard
    if (authUser) {
      const accountSlug = getCachedUserAccountSlug();
      if (accountSlug) {
        return redirectOrRewrite(getTenantUrl(accountSlug, "/dashboard"));
      }
    }
    return NextResponse.next();
  }

  // ============================================================================
  // PROTECTED ROUTES - Authentication required
  // ============================================================================
  if (isProtectedRoute(pathname)) {
    // User must be authenticated
    if (!authUser) {
      console.warn(
        "[middleware] Unauthenticated user trying to access protected route:",
        pathname,
      );
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If subdomain exists, validate and rewrite
    if (subdomain && !pathname.startsWith("/tenant/")) {
      const userAccountSlug = getCachedUserAccountSlug();

      // Validate that the subdomain matches the user's account
      if (userAccountSlug !== subdomain) {
        console.warn(
          "[middleware] Subdomain mismatch - user account:",
          userAccountSlug,
          "requested subdomain:",
          subdomain,
        );
        // Redirect/rewrite to user's correct tenant
        return redirectOrRewrite(getTenantUrl(userAccountSlug || "", pathname));
      }

      // Valid subdomain, rewrite to tenant path
      const url = req.nextUrl.clone();
      url.pathname = `/tenant/${subdomain}${pathname}`;
      return NextResponse.rewrite(url);
    }

    // No subdomain provided for protected route
    if (!subdomain) {
      const userAccountSlug = getCachedUserAccountSlug();
      if (userAccountSlug) {
        // In dev, getTenantUrl returns a path; in prod it's a full domain URL
        const target = getTenantUrl(userAccountSlug, pathname);
        if (target.startsWith("/")) {
          const url = req.nextUrl.clone();
          url.pathname = target;
          return NextResponse.rewrite(url);
        }
        return NextResponse.redirect(target);
      } else {
        console.error("[middleware] User has no associated account");
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  }

  // ============================================================================
  // TENANT ROUTES - Already rewritten by subdomain logic
  // ============================================================================
  if (pathname.startsWith("/tenant/")) {
    // User must be authenticated
    if (!authUser) {
      console.warn(
        "[middleware] Unauthenticated user trying to access tenant route:",
        pathname,
      );
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Extract tenant slug from path
    const tenantMatch = pathname.match(/^\/tenant\/([^/]+)/);
    if (tenantMatch) {
      const requestedSlug = tenantMatch[1];
      const userAccountSlug = getCachedUserAccountSlug();

      // Verify user has access to this tenant
      if (userAccountSlug !== requestedSlug) {
        console.warn(
          "[middleware] Tenant access denied - user account:",
          userAccountSlug,
          "requested tenant:",
          requestedSlug,
        );
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    return NextResponse.next();
  }

  // ============================================================================
  // OTHER ROUTES - Allow through if authenticated, redirect to login if not
  // ============================================================================
  if (!authUser) {
    console.info("[middleware] Unauthenticated user accessing:", pathname);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

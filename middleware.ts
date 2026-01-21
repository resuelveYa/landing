import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Check if there's a redirect_url in the query params
  const url = new URL(req.url);
  const redirectUrl = url.searchParams.get('redirect_url');

  // If user is signed in and there's a redirect_url, redirect to it
  const { userId } = await auth();
  if (userId && redirectUrl) {
    // Only allow redirects to our own domains for security
    const allowedDomains = ['resuelveya.cl', 'localhost'];
    try {
      const redirectUrlObj = new URL(redirectUrl);
      if (allowedDomains.includes(redirectUrlObj.hostname)) {
        return Response.redirect(redirectUrl);
      }
    } catch (e) {
      // Invalid URL, ignore
    }
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
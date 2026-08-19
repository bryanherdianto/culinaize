import { clerkMiddleware } from '@clerk/nextjs/server';

// No route matcher is registered, so every route stays publicly reachable —
// this mirrors the previous Supabase behaviour, where /chat rendered for
// anonymous visitors and only message sending was gated.
//
// To hard-gate /chat instead, swap in:
//   const isProtected = createRouteMatcher(['/chat(.*)']);
//   export default clerkMiddleware(async (auth, req) => {
//     if (isProtected(req)) await auth.protect();
//   });
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

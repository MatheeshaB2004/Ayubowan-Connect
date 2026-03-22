import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth(.*)",
  "/marketplace(.*)",
  "/events(.*)",
  "/faq(.*)",
  "/privacy(.*)",
  "/terms(.*)",
  "/cookies(.*)",
  "/complaints(.*)",
  "/api(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Keep FAQ visible to guests, travellers, and vendors.
  if (pathname === "/faq" || pathname.startsWith("/faq/")) {
    return;
  }

  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};

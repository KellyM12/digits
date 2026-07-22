import { NextRequest, NextResponse } from "next/server";

// Standard Next.js Named export requirement for custom proxy routers
export async function proxy(request: NextRequest) {
  // Pass normal traffic straight through without loading Prisma database modules
  return NextResponse.next();
}

// Strict matching rules to prevent the file from breaking page-level actions
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
import { NextRequest, NextResponse } from "next/server";

// 1. You MUST explicitly name the function 'proxy' and export it 👈 THE FIX
export async function proxy(request: NextRequest) {
  
  // Your template's proxy or authentication logic goes here.
  // For now, this safely allows requests to proceed through the application:
  return NextResponse.next();
}

// 2. Keep your matching paths rule intact at the bottom
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
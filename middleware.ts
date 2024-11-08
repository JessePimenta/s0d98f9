import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
 
export function middleware(request: NextRequest) {
  // Disable middleware during static export
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}
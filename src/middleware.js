import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('__session')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};

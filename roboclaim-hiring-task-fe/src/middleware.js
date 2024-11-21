import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuthenticated = request.cookies.get('access_token')?.value;
  if (isAuthenticated) {
    if (request.nextUrl.pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/portal', request.url))
    }
    return NextResponse.next()
  } else {
    if (request.nextUrl.pathname.startsWith('/portal')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    } else {
      return NextResponse.next()
    }
  }
}
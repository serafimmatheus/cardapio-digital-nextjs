import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const cookies = request.cookies.get('@token:coffee')
  const pathName = request.nextUrl.pathname

  if (pathName === '' || pathName === '/') {
    return NextResponse.next()
  }

  if (pathName === '/autenticacao/login' && cookies?.value) {
    return NextResponse.redirect(new URL('/app', request.url))
  }

  if (pathName === '/app' && !cookies?.value) {
    return NextResponse.redirect(new URL('/autenticacao/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth } from './lib/auth/auth';

export async function middleware(request: NextRequest) {
    const session = await auth();
    if (!session || ['USR'].includes(session.usuario.permissao))
        return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: [
    '/usuarios/:path*'
  ],
}
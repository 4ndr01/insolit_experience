import { NextResponse } from 'next/server';

export function middleware(request) {
    const origin = request.headers.get('origin');
    const response = NextResponse.next();

    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}

// (Optionnel) Limiter le middleware à certaines routes
export const config = {
    matcher: '/api/:path*',
};

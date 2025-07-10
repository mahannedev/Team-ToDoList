import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request:NextRequest){
    const token = request.cookies.get('sb-access-token')?.value;

    const protectedPaths = ['/dashboard','/projects'];
    const isProtected = protectedPaths.some((path)=> request.nextUrl.pathname.startsWith(path));

    if(isProtected && !token){
        const loginUrl = new URL('/login',request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*','/projects/:path*'],
};
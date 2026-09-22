import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { betterFetch } from "@better-fetch/fetch";

type Session = {
    session: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        ipAddress?: string | null | undefined;
        userAgent?: string | null | undefined;
    };
    user: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
        emailVerified: boolean;
        image?: string | null | undefined;
    };
};

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    
    try {
        const { data: session } = await betterFetch<Session>(
            "/api/auth/get-session",
            {
                baseURL: request.nextUrl.origin,
                headers: {
                    cookie: request.headers.get("cookie") || "",
                },
            },
        );

        // Define routes that require authentication
        const isProtectedRoute = pathname.startsWith("/dashboard") || 
                                 pathname.startsWith("/profile") || 
                                 pathname.startsWith("/account") || 
                                 pathname.startsWith("/checkout");

        // Define auth routes (only accessible if NOT authenticated)
        const isAuthRoute = pathname.startsWith("/sign-in") || 
                            pathname.startsWith("/sign-up") || 
                            pathname.startsWith("/forgot-password") || 
                            pathname.startsWith("/reset-password");

        if (!session && isProtectedRoute) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
        
        if (session && isAuthRoute) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } catch (error) {
        // Fallback in case of API error (e.g., during build time)
        console.error("Proxy session check error:", error);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

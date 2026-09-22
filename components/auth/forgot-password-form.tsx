"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess(false);

        try {
            await (authClient as any).forgetPassword({
                email,
                redirectTo: "/reset-password",
            }, {
                onSuccess: () => {
                    setSuccess(true);
                    setIsLoading(false);
                },
                onError: (ctx: any) => {
                    setError(ctx.error.message || "Something went wrong.");
                    setIsLoading(false);
                }
            });
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Forgot password</CardTitle>
                <CardDescription>
                    Enter your email address and we will send you a reset link.
                </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm font-medium text-red-500 bg-red-50 dark:bg-red-950/50 rounded-md">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="p-3 text-sm font-medium text-green-600 bg-green-50 dark:bg-green-950/50 rounded-md">
                            If an account with that email exists, we sent a password reset link to it. Check your terminal if running locally!
                        </div>
                    )}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                    <Button type="submit" className="w-full" disabled={isLoading || success}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send reset link
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                        Remember your password?{" "}
                        <Link href="/sign-in" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}

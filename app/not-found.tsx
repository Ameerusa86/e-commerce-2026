"use client";

import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-muted/30 p-4">
      
      {/* App Logo */}
      <Image
        src="/images/logo.svg"
        width={64}
        height={64}
        alt={`${APP_NAME} logo`}
        priority={true}
        className="mb-8"
      />

      {/* Error Message Card */}
      <Card className="w-full max-w-md text-center shadow-lg border-muted">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-4 rounded-full mb-4">
            <AlertCircle className="w-10 h-10 text-destructive" />
          </div>
          <CardTitle className="text-4xl font-extrabold mb-2">404</CardTitle>
          <CardDescription className="text-lg font-medium">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-8">
            Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>

          <Link 
            href="/" 
            className={buttonVariants({ size: "lg", className: "w-full" })}
          >
            Back to Home
          </Link>
        </CardContent>
      </Card>

    </div>
  );
}

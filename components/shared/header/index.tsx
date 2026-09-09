// components/shared/header/index.tsx
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between gap-4 py-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={48}
              width={48}
              priority={true}
            />
            <span className="hidden text-2xl font-bold text-foreground lg:block">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/cart" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted">
            <ShoppingCart className="h-4 w-4" />
            <span>Cart</span>
          </Link>

          <Button variant="ghost" className="gap-2">
            <User className="h-4 w-4" />
            <span>Sign In</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

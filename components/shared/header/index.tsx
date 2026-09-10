// components/shared/header/index.tsx
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

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
        <Menu />
      </div>
    </header>
  );
};

export default Header;

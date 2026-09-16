// components/shared/header/index.tsx
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";

const Header = () => {
  return (
    <header className="w-full border-b border-border bg-background shadow-sm sticky top-0 z-40">
      <div className="w-full bg-primary text-primary-foreground text-sm py-1.5 hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-4">
          <div className="flex gap-4">
            <span>Corporate Support: +1 (800) 555-0198</span>
            <span className="opacity-75">|</span>
            <span>B2B Sales Available</span>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="hover:underline">Track Order</Link>
            <Link href="#" className="hover:underline">Help Center</Link>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-between gap-4 py-4 px-4">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt={`${APP_NAME} logo`}
              height={40}
              width={40}
              priority={true}
            />
            <span className="hidden text-2xl font-extrabold tracking-tight text-foreground lg:block">
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

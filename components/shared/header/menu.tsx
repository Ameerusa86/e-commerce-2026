import ModeToggle from "./mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { ShoppingCart, User, EllipsisVertical } from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* Desktop */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
          <ShoppingCart /> Cart
        </Link>
        <Link href="/sign-in" className={buttonVariants()}>
          <User /> Sign In
        </Link>
      </nav>

      {/* Mobile */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
              <ShoppingCart /> Cart
            </Link>
            <Link href="/sign-in" className={buttonVariants()}>
              <User /> Sign In
            </Link>
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
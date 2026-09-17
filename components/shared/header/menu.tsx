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
import UserButton from "./user-button";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      {/* Desktop */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
          <ShoppingCart /> Cart
        </Link>
        <UserButton />
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
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
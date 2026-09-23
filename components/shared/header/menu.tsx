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
import { getMyCart } from "@/lib/actions/cart.actions";
import { Badge } from "@/components/ui/badge";

const Menu = async () => {
  const cart = await getMyCart();

  const cartItemsCount = cart ? cart.items.reduce((a, c) => a + c.qty, 0) : 0;

  return (
    <div className="flex justify-end gap-3">
      {/* Desktop */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
          <div className="relative flex items-center">
            <ShoppingCart className="mr-1" />
            Cart
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-3 px-1.5 py-0.5 text-xs font-bold leading-none rounded-full">
                {cartItemsCount}
              </Badge>
            )}
          </div>
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
              <div className="relative flex items-center">
                <ShoppingCart className="mr-1" />
                Cart
                {cartItemsCount > 0 && (
                  <Badge className="ml-2 px-1.5 py-0.5 text-xs font-bold leading-none rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
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
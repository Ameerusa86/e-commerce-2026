# Responsive Sheet Menu

Welcome back! In this lesson, we will implement a responsive navigation menu for our e-commerce platform. As our application grows, it's crucial to provide a seamless navigation experience across all devices. 

We will create a responsive layout where navigation links are displayed horizontally on desktop screens and tucked away inside a sleek, sliding "sheet" (or drawer) on mobile devices. To accomplish this, we'll be using the **Sheet** component from **ShadCN UI**.

Let's get started!

## 1. Setting Up the Sheet Component

If you haven't already added the Sheet component, you can install it using the ShadCN CLI. This will add the necessary accessible primitives to your project.

```bash
npx shadcn@latest add sheet
```

This command sets up the `Sheet`, `SheetContent`, `SheetTrigger`, and other related sub-components in your `components/ui` directory.

## 2. Creating the Menu Component

Next, we will update our `Menu` component to handle both the desktop and mobile views. We will use Tailwind CSS classes to show and hide different elements based on the screen size (`md:` breakpoint).

Open or create `components/shared/header/menu.tsx` and replace its contents with the following code:

```tsx
import ModeToggle from "./mode-toggle";
import { buttonVariants } from "@/components/ui/button";
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
      {/* Desktop Navigation */}
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        
          <Link href="/cart" className={buttonVariants({ variant: "ghost" })}>
            <ShoppingCart /> Cart
          </Link>
        
        
          <Link href="/sign-in" className={buttonVariants()}>
            <User /> Sign In
          </Link>
        
      </nav>

      {/* Mobile Navigation */}
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
```

### What's happening here?
- **Desktop Nav (`hidden md:flex`)**: This section is hidden on small screens and displayed as a flex container on medium screens and above.
- **Mobile Nav (`md:hidden`)**: This section is visible on small screens and hidden on medium screens and above.
- **Sheet Component**: We wrap our mobile trigger (an `EllipsisVertical` icon from `lucide-react`) with `SheetTrigger`. When clicked, it opens the `SheetContent` which contains our mobile menu links stacked vertically.

## 3. Integrating the Menu into the Header

Now that our `Menu` component is ready, we need to integrate it into our main `Header` component, replacing any hardcoded navigation buttons.

Open `components/shared/header/index.tsx` and update it:

```tsx
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
        
        {/* Render our new responsive Menu component */}
        <Menu />
        
      </div>
    </header>
  );
};

export default Header;
```

## Summary

Fantastic! You've successfully implemented a responsive navigation menu. Your application will now dynamically adapt to desktop and mobile devices, providing a cleaner and more accessible interface for your users.

In the next lessons, we'll continue building out the core pages of our e-commerce platform. Happy coding!

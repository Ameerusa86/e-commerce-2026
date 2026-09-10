# Theme Mode Toggle

Welcome back! In this lesson, we will implement a dynamic theme mode toggle for our application. We'll add a dropdown menu that allows users to seamlessly switch between **Dark**, **Light**, and **System** themes. 

To achieve this, we will leverage **Next Themes** for theme management and **ShadCN UI** for our accessible dropdown component. We will also tackle a common React hydration issue along the way.

Let's dive in!

## 1. Installing Dependencies

First, we need to install the packages that will power our theme switching and UI dropdown.

```bash
# Install next-themes for theme management
npm install next-themes

# Add the Dropdown Menu component from ShadCN UI
npx shadcn@latest add dropdown-menu
```
*(Note: If prompted about peer dependencies during the ShadCN installation, select the "legacy peer dependencies" option.)*

## 2. Setting up the Theme Provider

In order for the theme to apply globally across our application, we need to wrap our application's component tree in a `ThemeProvider` provided by `next-themes`.

We will add this to our main layout file. We also need to add the `suppressHydrationWarning` attribute to our `<html>` tag to prevent Next.js from throwing warnings when the server-rendered HTML mismatches the client-rendered theme.

Update `app/layout.tsx`:

```tsx
import { ThemeProvider } from "next-themes";
// ... other imports

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning is required to prevent mismatch errors between server and client
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Provider Props Explained:
- `attribute="class"`: Modifies the HTML class to toggle themes.
- `defaultTheme="light"`: Sets the initial theme.
- `enableSystem`: Allows the app to listen to the user's OS system preferences.
- `disableTransitionOnChange`: Prevents CSS transition flickering when switching themes.

## 3. Creating the Mode Toggle Component

Now we need the actual UI component that users will interact with. We will create a `ModeToggle` component that utilizes the ShadCN UI dropdown.

Create a new file at `components/shared/header/mode-toggle.tsx`:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon, SunMoon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on the client to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === "system" ? (
            <SunMoon />
          ) : theme === "dark" ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuCheckboxItem
          checked={theme === "system"}
          onClick={() => setTheme("system")}
        >
          System
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={theme === "dark"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </DropdownMenuCheckboxItem>
        
        <DropdownMenuCheckboxItem
          checked={theme === "light"}
          onClick={() => setTheme("light")}
        >
          Light
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Solving Hydration Errors
Notice the use of `mounted` state in this component? `next-themes` relies on the `window` object to manage the theme. Since the server does not have access to the `window` object, Next.js will throw a hydration mismatch error if we try to render the theme-dependent icons on the server. By returning `null` until the component has mounted on the client (`useEffect`), we safely suppress this error.

## 4. Integrating the Mode Toggle into the Header

With our component ready, let's inject it into our application's header. We will also make a quick stylistic adjustment to the sign-in button.

Update `components/shared/header/index.tsx`:

```tsx
import ModeToggle from "./mode-toggle";
// ... other imports

export default function Header() {
  return (
    <header>
      {/* Existing Header Content */}
      
      <div className="flex items-center gap-4">
        {/* Place the Mode Toggle right above the Cart button */}
        <ModeToggle />
        
        {/* Cart Button */}
        {/* ... */}
        
        {/* 
          Sign In Button 
          Note: We removed the `variant="ghost"` prop to give it a solid dark background.
        */}
        <Button>Sign In</Button>
      </div>
    </header>
  );
}
```

## Summary

Excellent work! You now have a fully functional, hydration-safe theme toggle that lets users switch between light, dark, and system preferences. In the next lesson, we will focus on building out custom loading and not-found pages.

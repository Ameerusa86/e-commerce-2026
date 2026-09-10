# Loading & Not Found Pages

Welcome to the next lesson! In modern web applications, the user experience during page transitions and error states is just as important as the primary content. 

Next.js provides an elegant, convention-based way to handle both **loading states** and **404 Not Found** scenarios by simply creating files with reserved names in our `app` directory.

In this lesson, we will build a global loading spinner to give users visual feedback during transitions, and a custom 404 error page to handle missing routes. Let's get to work!

---

## 1. Creating the Global Loading State

Whenever data is being fetched or a page is transitioning, Next.js can automatically show a loading UI if we provide a `loading.tsx` file. 

Create a new file at `app/loading.tsx` and add the following code:

```tsx
import Image from "next/image";
import loader from "@/assets/loader.gif"; // Ensure you have this asset in your project

export default function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Image 
        src={loader} 
        height={150} 
        width={150} 
        alt="Loading..." 
      />
    </div>
  );
}
```

### Why use a GIF instead of a CSS Spinner?
We are using a `loader.gif` here because it looks consistent across both **light** and **dark** modes. If we used an external spinner package (like `react-spinners`), we would have to add extra logic to read the active theme and swap colors accordingly. The GIF approach is clean and simple.

---

## 2. Testing the Loader (Optional Trick)

Because our app is running locally and is extremely fast, you might not even see the loader when you refresh the page. 

If you want to test the loading UI to ensure it looks correct, you can add a temporary delay to your home page (`app/page.tsx`):

```tsx
// Temporary delay function for testing
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function HomePage() {
  // Wait for 2 seconds to trigger the loading.tsx UI
  await delay(2000); 

  return (
    <div>
      {/* Home Page Content */}
    </div>
  );
}
```
*Note: Once you've verified the loading spinner looks good, be sure to remove the `delay` function and the `async/await` syntax so your home page returns to its normal speed.*

---

## 3. Creating a Custom Not Found (404) Page

When a user navigates to a route that doesn't exist (e.g., `/non-existent-page`), Next.js displays a very basic, generic default 404 page. We want to brand this page to match our application and make it look professional.

We can customize this by creating a `not-found.tsx` file in the `app` directory. We will use Shadcn UI's **Card** component to create a clean, modern error message.

Create `app/not-found.tsx`:

```tsx
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
```

### Key Takeaways for `not-found.tsx`:
- **ShadCN UI `<Card>` Integration**: We encapsulate the error state inside a nicely padded Card component to match the visual language of the rest of our app.
- **Lucide React Icons**: We use the `AlertCircle` icon to instantly communicate that something went wrong.
- **`buttonVariants` helper**: We apply Shadcn button styling directly to a standard Next.js `<Link>` component for client-side routing, keeping our bundle small and semantic.
- **Tailwind Utility Classes**: We utilize ShadCN's pre-configured `text-destructive` class to automatically apply the correct red error color in both light and dark modes.

---

## Summary

Fantastic job! By simply placing `loading.tsx` and `not-found.tsx` files inside the Next.js `app` directory, you've drastically improved the perceived performance and error handling of the application. Next.js automatically intercepts routing states to render these exactly when needed.

You now have a highly professional error and loading UI setup that matches the rest of your e-commerce platform.

# Displaying Product Data with Shadcn Cards

Welcome back! Now that our layout and responsive navigation are in place, it's time to render actual product data on our homepage. 

In this lesson, we will cover how we retrieve sample data and display it dynamically by creating a `ProductCard` using **Shadcn UI's Card component**.

## 1. Preparing the Data

To start, we need some data. We've set up a sample dataset at `sample-data/sample-data/db/sample-data.ts`. This file exports an array of product objects, which contain all the necessary details like the product's name, price, brand, rating, and image URLs.

## 2. Feeding Data to the Home Page

In Next.js, pages are Server Components by default. This allows us to read our data—or even fetch it from a database—directly within the component before sending the UI to the client.

Here is how our home page (`app/(root)/page.tsx`) consumes this data:

```tsx
import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/sample-data/sample-data/db/sample-data";

export const metadata = {
  title: "Home",
};

const HomePage = () => {
  // We pass the products array from our sampleData to the ProductList component
  return (<ProductList data={sampleData.products} />);
};

export default HomePage;
```

## 3. The ProductList Component

The `ProductList` component is responsible for accepting the array of data and iterating over it.

```tsx
import { Product } from '@/types';
import ProductCard from './product-card';

const ProductList = ({data, title}: {data: Product[]; title?: string}) => {
    return (
        <section className="container mx-auto py-12 px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-10">
                {title || "Featured Products"}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {/* We map over our data array to render a ProductCard for each item */}
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;
```

## 4. Creating the ProductCard using Shadcn UI

To ensure our product cards are accessible, beautifully styled, and consistent with the rest of our application, we've implemented the `ProductCard` component using the **Card** component from Shadcn UI.

Make sure you've installed the Card component if you haven't already:
```bash
npx shadcn@latest add card
```

Let's break down `components/shared/product/product-card.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="group relative flex flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            {/* Product Image Section */}
            <Link href={`/product/${product.slug}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image 
                        src={product.banner || product.images[0]} 
                        alt={product.name} 
                        width={500} 
                        height={625} 
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" 
                    />
                    {product.isFeatured && (
                        <span className="absolute top-3 left-3 bg-background/80 backdrop-blur-md text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm text-foreground">
                            Featured
                        </span>
                    )}
                </div>
            </Link>
            
            {/* Product Details Section inside CardContent */}
            <CardContent className="flex flex-col flex-1 p-5">
                <div className="text-xs font-medium text-muted-foreground mb-1 tracking-wider uppercase">
                    {product.brand}
                </div>
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between">
                    {product.stock > 0 ? (
                        <p className="text-xl font-extrabold">
                            ${product.price.toFixed(2)}
                        </p>
                    ) : (
                        <p className="text-xl font-extrabold text-destructive">
                            Out of Stock
                        </p>
                    )}
                    <div className="flex items-center text-sm font-medium text-amber-500">
                        <span className="mr-1">★</span> {product.rating}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;
```

### Key Takeaways:
1. **Shadcn `<Card>`**: By wrapping our product content in a `<Card>`, we automatically inherit consistent border radiuses, backgrounds, and shadows from our Shadcn theme.
2. **`<CardContent>` Padding**: We place the text details inside `<CardContent>`, which manages its own spacing and padding systematically.
3. **Optimized Next.js Images**: We use `<Image>` to ensure our high-res product photos are properly sized and optimized.
4. **Interactive Hover States**: We use Tailwind's `group`, `hover:-translate-y-1`, and `group-hover:scale-105` to create an interactive "lift" effect when the user hovers over the card.
5. **Conditional Rendering**: We check the `product.stock` value. If it is greater than zero, we render the price. If it is zero or less, we render "Out of Stock" using the `text-destructive` class to clearly alert the user with a red color.

## Summary

You've successfully wired up dynamic data to your home page using beautifully encapsulated UI components. 

By splitting the logic out into `ProductList` (handling the iteration/grid) and `ProductCard` (handling the UI of a single item via Shadcn's Card), our codebase remains clean and maintainable.



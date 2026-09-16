import ProductList from "@/components/shared/product/product-list";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Home",
};

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <section className="bg-slate-100 dark:bg-slate-900 py-16 md:py-24 rounded-lg mt-4 px-6 md:px-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Premium Products for Modern Business
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Equip your company with the best tools, electronics, and accessories. 
          Discover top-tier reliability and performance today.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg" className="px-8">
            <Link href="#products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </section>

      {/* Product List */}
      <div id="products">
        <ProductList data={latestProducts} title="Featured Products" />
      </div>
    </div>
  );
};

export default HomePage;

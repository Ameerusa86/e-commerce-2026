import { notFound } from "next/navigation"
import ProductImages from "@/components/shared/product/product-images"
import ProductPrice from "@/components/shared/product/product-price"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getProductBySlug } from "@/lib/actions/product.actions"
import { getMyCart } from "@/lib/actions/cart.actions"
import AddToCart from "@/components/shared/product/add-to-cart"

const ProductDetailsPage = async({ params }: { params: Promise<{slug:string}> })=>{
    const resolvedParams = await params
    const product = await getProductBySlug(resolvedParams.slug)
    const cart = await getMyCart()

    if (!product) {
        notFound()
    }
    return (
        <section>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-16">
        
        {/* Left Column: Images */}
        <div className="col-span-1">
          <ProductImages images={product.images} />
        </div>

        {/* Right Column: Product Details */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {product.brand} / {product.category}
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold">{product.name}</h1>
            <div className="flex gap-2 items-center">
              <span className="text-amber-500 font-bold">★ {product.rating}</span>
              <span className="text-muted-foreground">({product.numReviews} reviews)</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ProductPrice value={Number(product.price)} className="text-3xl font-bold text-green-600 dark:text-green-500" />
            <Badge variant={product.stock > 0 ? "default" : "destructive"}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Card */}
          <div className="mt-4 flex flex-col gap-4 p-6 border rounded-xl bg-slate-50 dark:bg-slate-900 shadow-sm">
             <div className="flex justify-between items-center text-lg">
                <span className="font-semibold">Status</span>
                <span className={product.stock > 0 ? "text-green-600 font-bold" : "text-destructive font-bold"}>
                  {product.stock > 0 ? "In Stock" : "Unavailable"}
                </span>
             </div>
             
             {product.stock > 0 && (
               <div className="w-full mt-2">
                 <AddToCart 
                   cart={cart}
                   item={{
                     productId: product.id,
                     name: product.name,
                     slug: product.slug,
                     price: String(product.price),
                     qty: 1,
                     image: product.images[0]
                   }} 
                 />
               </div>
             )}
          </div>

        </div>
      </div>
    </section>
    )
}

export default ProductDetailsPage
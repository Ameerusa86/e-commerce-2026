import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "./product-price";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="flex flex-col overflow-hidden w-full transition-all duration-300 hover:shadow-lg hover:border-primary/50 group">
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
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-sm shadow-sm uppercase tracking-wide">
                            Featured
                        </span>
                    )}
                </div>
            </Link>
            
            <CardContent className="flex flex-col flex-1 p-5">
                <div className="text-xs font-semibold text-muted-foreground mb-1 tracking-wider uppercase">
                    {product.brand}
                </div>
                <Link href={`/product/${product.slug}`}>
                    <h3 className="text-lg font-bold leading-tight mb-2 line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                    {product.stock > 0 ? (
                        <ProductPrice value={product.price} />
                    ) : (
                        <p className="text-xl font-bold text-destructive">
                            Out of Stock
                        </p>
                    )}
                    <div className="flex items-center text-sm font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                        <span className="mr-1 text-amber-500">★</span> {product.rating}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductCard;

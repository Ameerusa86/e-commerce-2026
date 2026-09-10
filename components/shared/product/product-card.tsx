import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import ProductPrice from "./product-price";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <Card className="group relative flex flex-col overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
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
                        <ProductPrice value={product.price} />
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

import { Product } from '@/types';
import ProductCard from './product-card';

const ProductList = ({data, title}: {data: Product[]; title?: string}) => {
    return (
        <section className="container mx-auto py-12 px-4 md:px-6">
            <div className="flex justify-between items-end mb-10">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {title || "Featured Products"}
                </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;

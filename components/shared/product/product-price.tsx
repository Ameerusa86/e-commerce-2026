import { cn } from '@/lib/utils';

const ProductPrice = ({value, className}: {value: number | string, className?: string}) => {
   // Ensure 2 decimal palces
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    const stringValue = numericValue.toFixed(2);

    // Split into integer and decimal parts
    const [integerPart, decimalPart] = stringValue.split('.')
        
    return (
        <span className={cn("text-2xl font-bold", className)}>
           
            <span className="text-sm align-super">$</span>
            <span className="">{integerPart}</span>
            <span className="text-sm align-super">{decimalPart}</span>
        </span>
    )
}

export default ProductPrice
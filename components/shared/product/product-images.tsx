"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Image
        src={images[current]}
        alt="Product Image"
        width={1000}
        height={1000}
        className="min-h-[300px] w-full object-cover object-center rounded-lg border"
      />
      
      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              "border-2 cursor-pointer hover:border-primary rounded-md overflow-hidden transition-colors",
              current === index ? "border-primary" : "border-transparent"
            )}
          >
            <Image
              src={image}
              alt="thumbnail"
              width={100}
              height={100}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
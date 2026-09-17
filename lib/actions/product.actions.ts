"use server";

import { db } from "@/src/prisma/db";
import { convertToPlainObject } from "@/lib/utils";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";
import { Product } from "@/types";

// Get latest products
export async function getLatestProducts(): Promise<Product[]> {
  const data = await db.orm.public.Product
    .orderBy((p) => p.createdAt.desc())
    .limit(LATEST_PRODUCTS_LIMIT)
    .all();

  return convertToPlainObject(data) as unknown as Product[];
}

// Get single product by slug
export async function getProductBySlug (slug: string){
  const data = await db.orm.public.Product.where({slug}).first();

  return data ? convertToPlainObject(data) as unknown as Product : null;
}
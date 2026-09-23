import * as z from "zod";
import { formatNumberWithDecimal } from "./utils";

const currency = /^\d+(\.\d{2})?$/;

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters"),
  category: z.string().min(3, "Category must be at least 3 characters"),
  brand: z.string().min(3, "Brand must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable().optional(),
  price: z.string().refine(
    (value) => currency.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  ),
});

// Schema for cart items
export const cartItemSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  qty: z.number().int().nonnegative("Quantity must be a positive number"),
  image: z.string().min(1, "Image is required"),
  price: z.string().refine(
    (value) => currency.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  ),
});

// Schema for inserting carts
export const insertCartSchema = z.object({
  items: z.array(cartItemSchema),
  itemsPrice: z.string().refine(
    (value) => currency.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  ),
  totalPrice: z.string().refine(
    (value) => currency.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  ),
  shippingPrice: z.string().refine(
    (value) => currency.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  ),
  taxPrice: z.string().refine(
    (value) => currency.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  ),
  sessionCartId: z.string().min(1, "Session cart id is required"),
  userId: z.string().optional().nullable(),
});

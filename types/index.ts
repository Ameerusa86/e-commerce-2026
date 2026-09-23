import * as z from "zod";
import { insertProductSchema, insertCartSchema, cartItemSchema } from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  rating: string;
  numReviews: number;
  createdAt: Date;
};

export type CartItem = z.infer<typeof cartItemSchema>;
export type Cart = z.infer<typeof insertCartSchema> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

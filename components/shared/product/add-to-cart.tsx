"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Minus, Loader } from "lucide-react";
import { CartItem, Cart } from "@/types";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { useTransition } from "react";

export default function AddToCart({ cart, item }: { cart: Cart | null; item: CartItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (res.success) {
        router.refresh();
      } else {
        console.error(res.message);
      }
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      if (res.success) {
        router.refresh();
      } else {
        console.error(res.message);
      }
    });
  };

  const existItem = cart?.items
    ? (cart.items as CartItem[]).find((x) => x.productId === item.productId)
    : undefined;

  return existItem ? (
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" onClick={handleRemoveFromCart} disabled={isPending}>
        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />}
      </Button>
      <span className="px-2 font-bold">{existItem.qty}</span>
      <Button type="button" variant="outline" onClick={handleAddToCart} disabled={isPending}>
        {isPending ? <Loader className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      </Button>
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart} disabled={isPending}>
      {isPending ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
      Add to cart
    </Button>
  );
}

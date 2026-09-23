import { db } from "../src/prisma/db";
import { calcPrice } from "../lib/utils";
import { CartItem } from "../types";

async function run() {
  try {
    const cart = await db.orm.public.Cart.first();
    if (!cart) {
      console.log("No cart");
      return;
    }

    const items = cart.items as CartItem[];
    if (items.length === 0) {
      console.log("No items");
      return;
    }

    const productId = items[0].productId;
    const existItem = items.find((x) => x.productId === productId);

    if (!existItem) {
      console.log("Item not found");
      return;
    }

    if (existItem.qty === 1) {
      cart.items = items.filter((x) => x.productId !== productId);
    } else {
      existItem.qty -= 1;
    }

    console.log("Updating DB with items:", cart.items);

    await db.orm.public.Cart.where({ id: cart.id }).update({
      items: cart.items,
      ...calcPrice(cart.items as CartItem[]),
      updatedAt: new Date().toISOString() as any,
    });

    console.log("Update success!");
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await db.close();
  }
}

run();

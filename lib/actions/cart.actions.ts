"use server";

import { cookies } from "next/headers";
import { SESSION_CART_ID } from "../constants";
import { CartItem, Cart } from "@/types";
import { db } from "@/src/prisma/db";
import { convertToPlainObject, calcPrice } from "../utils";

export async function getMyCart() {
  const cookieStore = await cookies();
  const sessionCartId = cookieStore.get(SESSION_CART_ID)?.value;

  if (!sessionCartId) return null;

  const cart = await db.orm.public.Cart.where({ sessionCartId }).first();

  return cart ? convertToPlainObject(cart) as unknown as Cart : null;
}

export async function addItemToCart(data: CartItem) {
  try {
    const cookieStore = await cookies();
    let sessionCartId = cookieStore.get(SESSION_CART_ID)?.value;

    if (!sessionCartId) {
      sessionCartId = crypto.randomUUID();
      // Set the cookie to expire in 30 days
      cookieStore.set(SESSION_CART_ID, sessionCartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    const cart = await getMyCart();
    const item = { ...data };

    if (cart) {
      // Cart exists, check if item exists
      const existItem = (cart.items as CartItem[]).find(
        (x) => x.productId === item.productId
      );

      if (existItem) {
        // Increase quantity
        existItem.qty += 1;
      } else {
        // Push new item
        cart.items.push(item);
      }

      // Update cart
      await db.orm.public.Cart.where({ id: cart.id }).update({
        items: cart.items,
        ...calcPrice(cart.items as CartItem[]),
        updatedAt: new Date(),
      });
      
      return {
        success: true,
        message: existItem ? "Item quantity updated" : "Item added to cart",
      };
    } else {
      // Cart does not exist, create a new one
      await db.orm.public.Cart.create({
        sessionCartId,
        items: [item],
        ...calcPrice([item]),
        updatedAt: new Date(),
      });
      return {
        success: true,
        message: "Item added to cart",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Failed to add item to cart",
    };
  }
}

export async function removeItemFromCart(productId: string) {
  try {
    const cookieStore = await cookies();
    const sessionCartId = cookieStore.get(SESSION_CART_ID)?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    const existItem = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );

    if (!existItem) throw new Error("Item not found in cart");

    // Check if we need to decrement or completely remove
    if (existItem.qty === 1) {
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== productId
      );
    } else {
      existItem.qty -= 1;
    }

    // Update cart
    await db.orm.public.Cart.where({ id: cart.id }).update({
      items: cart.items,
      ...calcPrice(cart.items as CartItem[]),
      updatedAt: new Date(),
    });

    return {
      success: true,
      message: `${existItem.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to remove item from cart",
    };
  }
}

export { cn } from "cn";

// Convert Prisma object into a regular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}

// Format currency
export const formatCurrency = (amount: number | string | null) => {
  if (typeof amount === "number") {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
      minimumFractionDigits: 2,
    }).format(amount);
  } else if (typeof amount === "string") {
    return new Intl.NumberFormat("en-US", {
      currency: "USD",
      style: "currency",
      minimumFractionDigits: 2,
    }).format(Number(amount));
  }
  return "NaN";
};

// Round number to 2 decimal places
export function round2(value: number | string) {
  if (typeof value === "number") {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  } else if (typeof value === "string") {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Value is not a number or string");
  }
}

// Calculate cart prices
export function calcPrice(items: { price: string; qty: number }[]) {
  const itemsPrice = round2(
    items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
  );
  // Shipping: free if itemsPrice > 100, else $10
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  // Tax: 15%
  const taxPrice = round2(0.15 * itemsPrice);
  // Total
  const totalPrice = round2(itemsPrice + taxPrice + shippingPrice);

  return {
    itemsPrice: formatNumberWithDecimal(itemsPrice),
    shippingPrice: formatNumberWithDecimal(shippingPrice),
    taxPrice: formatNumberWithDecimal(taxPrice),
    totalPrice: formatNumberWithDecimal(totalPrice),
  };
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartProduct } from "../_types/Product/ProductsItemProps.d";
import { NextResponse } from "next/server";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function middleware(request: Request) {
  // Store current request url in a custom header, which you can read later
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  return NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });
}

export function formatPrice(price: number, discountPercentage?: number) {
  if (!discountPercentage || discountPercentage <= 0)
    return Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 2,
    }).format(price);

  const discount = price * (discountPercentage / 100);
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(price - discount);
}

export function getOrderInfo(products: CartProduct[]) {
  const subTotal = products.reduce((acc, product) => {
    let price = Number(product.price);
    product.quantity > 1 && (price *= product.quantity);

    return acc + price;
  }, 0);

  const delivery =
    products.length > 0 ? Number(products[0].restaurant.deliveryFee) : 0;

  const discount = products.reduce((acc, product) => {
    let price = Number(product.price);
    product.quantity > 1 && (price *= product.quantity);
    price = price * (Number(product.discountPercentage) / 100);
    return acc + price;
  }, 0);

  const total = subTotal - discount + delivery;

  const quantity = products.length;

  return {
    subTotal,
    delivery,
    discount,
    total,
    quantity,
  };
}

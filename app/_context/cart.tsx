"use client";

import { createContext, ReactNode, useState } from "react";
import {
  CartProduct,
  ProductsItemProps,
} from "../_types/Product/ProductsItemProps";

interface ICartContext {
  products: ProductsItemProps[];
  addProductToCart: (product: ProductsItemProps, quality: number) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: ProductsItemProps, quantity: number) => {
    const isProductInCart = products.some((p) => p.id === product.id);

    if (isProductInCart) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + quantity,
            };
          }
          return p;
        }),
      );
    } else {
      setProducts((prev) => [...prev, { ...product, quantity }]);
    }
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

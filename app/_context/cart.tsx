"use client";

import { createContext, ReactNode, useState } from "react";
import {
  CartProduct,
  ProductsItemProps,
} from "../_types/Product/ProductsItemProps";

interface ICartContext {
  products: CartProduct[];
  addProductToCart: (product: ProductsItemProps, quality: number) => void;
  changeProductQuantity: (productId: string, quantity: number) => void;
  deleteItemCart: (productId: string) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  changeProductQuantity: () => {},
  deleteItemCart: () => {},
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

  const changeProductQuantity = (productId: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            quantity,
          };
        }
        return p;
      }),
    );
  };

  const deleteItemCart = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        changeProductQuantity,
        deleteItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

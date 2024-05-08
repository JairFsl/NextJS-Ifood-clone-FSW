"use client";

import { createContext, ReactNode, useState } from "react";
import { ProductsItemProps } from "../_types/ProductsItemProps.interface";

interface CartProduct extends ProductsItemProps {
  quantity: number;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart: (product: ProductsItemProps) => void;
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);

  const addProductToCart = (product: ProductsItemProps) => {
    setProducts((prev) => [...prev, { ...product, quantity: 0 }]);
  };

  return (
    <CartContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CartContext.Provider>
  );
};

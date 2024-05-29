"use client";

import { createContext, ReactNode, useState } from "react";
import {
  CartProduct,
  ProductsItemProps,
} from "../_types/Product/ProductsItemProps.d";
import { getOrderInfo } from "../_lib/utils";

interface IAddProductToCart {
  product: ProductsItemProps;
  quantity: number;
  emptyCart?: boolean;
}

interface ICartContext {
  products: CartProduct[];
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: IAddProductToCart) => void;
  changeProductQuantity: (productId: string, quantity: number) => void;
  RemoveProductFromCart: (productId: string) => void;
  RemoveAllProductsFromCart: () => void;
  orderInfo: {
    subTotal: number;
    total: number;
    delivery: number;
    discount: number;
    quantity: number;
  };
}

export const CartContext = createContext<ICartContext>({
  products: [],
  addProductToCart: () => {},
  changeProductQuantity: () => {},
  RemoveProductFromCart: () => {},
  RemoveAllProductsFromCart: () => {},
  orderInfo: {
    subTotal: 0,
    total: 0,
    delivery: 0,
    discount: 0,
    quantity: 0,
  },
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<CartProduct[]>([]);
  const orderInfo = getOrderInfo(products);

  const addProductToCart = ({
    product,
    quantity,
    emptyCart,
  }: IAddProductToCart) => {
    emptyCart && setProducts([]);

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

  const RemoveProductFromCart = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const RemoveAllProductsFromCart = () => {
    setProducts([]);
  };

  return (
    <CartContext.Provider
      value={{
        orderInfo,
        products,
        addProductToCart,
        changeProductQuantity,
        RemoveProductFromCart,
        RemoveAllProductsFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import { Restaurant, Product } from "@prisma/client";

export interface ProductsItemProps extends Product {
  restaurant: Restaurant;
}

export interface CartProduct extends ProductsItemProps {
  quantity: number;
}

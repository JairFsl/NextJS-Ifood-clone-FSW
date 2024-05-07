import { Restaurant, Product } from "@prisma/client";

export interface ProductsItemProps extends Product {
  restaurant: Restaurant;
}

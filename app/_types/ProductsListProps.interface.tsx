import { Restaurant, Product } from "@prisma/client";

export interface ProductsListProps extends Product {
  restaurant: Restaurant;
}

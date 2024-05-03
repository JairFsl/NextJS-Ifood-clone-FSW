import { Restaurant } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface ProductsListProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: Decimal;
  discountPercentage: number;
  restaurantId: string;
  restaurant: Restaurant;
}

import { Decimal } from "@prisma/client/runtime/library";

interface Restaurant {
  name: string;
}

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

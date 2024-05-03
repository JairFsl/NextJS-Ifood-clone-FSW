import { Category } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface RestaurantItemProps {
  id: string;
  name: string;
  imageUrl: string;
  deliveryFee: Decimal;
  deliveryTimeMinutes: number;
  categories: Category[];
}

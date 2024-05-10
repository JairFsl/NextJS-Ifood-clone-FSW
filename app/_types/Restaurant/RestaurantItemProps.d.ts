import { Category, Restaurant } from "@prisma/client";

export interface RestaurantItemProps extends Restaurant {
  categories: Array<Category>;
}

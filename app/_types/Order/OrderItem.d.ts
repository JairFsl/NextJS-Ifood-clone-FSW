import {
  Order,
  OrderProduct,
  OrderStatus,
  Prisma,
  Restaurant,
} from "@prisma/client";
import { ProductsItemProps } from "../Product/ProductsItemProps";
import { RestaurantItemProps } from "../Restaurant/RestaurantItemProps";

export type OrderItemProps = Prisma.OrderGetPayload<{
  include: {
    restaurant: true;
    products: {
      include: {
        product: {
          include: {
            restaurant: true;
          };
        };
      };
    };
  };
}>;

export interface IOrderItem {
  order: OrderItemProps;
}

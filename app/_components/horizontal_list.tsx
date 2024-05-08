import { Suspense } from "react";
import ProductItem from "./product_item";
import RestaurantItem from "./restaurant_item";
import { RestaurantItemProps } from "../_types/Restaurant/RestaurantItemProps";
import { ProductsItemProps } from "../_types/Product/ProductsItemProps";
import { db } from "../_lib/prisma";

interface ListProps {
  restaurant?: boolean;
  product?: boolean;
  data?: ProductsItemProps[] | RestaurantItemProps[];
}

const renderProduct = (product: ProductsItemProps) => {
  return (
    <ProductItem
      product={JSON.parse(JSON.stringify(product))}
      key={product.id}
    />
  );
};

const renderRestaurant = (restaurant: RestaurantItemProps) => {
  return (
    <Suspense fallback={<span>teste...</span>} key={restaurant.id}>
      <RestaurantItem restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </Suspense>
  );
};

const HorizontalList = async ({
  restaurant = false,
  product = !restaurant,
  data = [],
}: ListProps): Promise<JSX.Element> => {
  const getList = async () => {
    if (data.length > 0) return data;
    else {
      if (product) {
        return await db.product.findMany({
          where: {
            discountPercentage: {
              gt: 0,
            },
          },
          take: 10,
          include: {
            restaurant: true,
          },
        });
      } else if (restaurant) {
        return await db.restaurant.findMany({
          take: 10,
          where: {
            deliveryFee: {
              lte: 5,
            },
          },

          include: {
            categories: true,
          },
        });
      } else {
        return [];
      }
    }
  };

  let itemList = await getList();

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {itemList.map((item) =>
        product
          ? renderProduct(item as ProductsItemProps)
          : renderRestaurant(item as RestaurantItemProps),
      )}
    </div>
  );
};

export default HorizontalList;

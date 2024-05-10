import RestaurantItem from "@/app/_components/restaurant_item";
import { db } from "@/app/_lib/prisma";
import ListPage from "@/app/_components/vertical_list";
import { RestaurantItemProps } from "@/app/_types/Restaurant/RestaurantItemProps.d";

const renderItem = (restaurant: RestaurantItemProps) => {
  return (
    <RestaurantItem
      key={restaurant.id}
      restaurant={JSON.parse(JSON.stringify(restaurant))}
      className="min-w-full max-w-full"
    />
  );
};

const RecommendedRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({
    where: {
      deliveryFee: {
        lte: 5,
      },
    },

    include: {
      categories: true,
    },
  });

  return (
    <ListPage
      title="Restaurantes Recomendados"
      data={JSON.parse(JSON.stringify(restaurants))}
      renderItem={renderItem}
      className="flex flex-col"
    />
  );
};

export default RecommendedRestaurants;

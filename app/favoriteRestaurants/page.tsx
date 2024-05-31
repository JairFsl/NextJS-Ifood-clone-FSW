"use server";

import { redirect } from "next/navigation";
import RestaurantItem from "../_components/restaurant_item";
import ListPage from "../_components/vertical_list";
import { authOptions } from "../_lib/auth";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { RestaurantItemProps } from "../_types/Restaurant/RestaurantItemProps";

const renderRestaurant = (restaurant: RestaurantItemProps) => {
  console.log(restaurant, "restaurant");
  return (
    <RestaurantItem
      key={restaurant.id}
      restaurant={JSON.parse(JSON.stringify(restaurant))}
      className="min-w-full max-w-full"
    />
  );
};

const FavoriteRestaurantsPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/");
  }
  const favoriteRestaurants = await db.user.findMany({});

  return (
    <ListPage
      title="Restaurantes Favoritos"
      data={JSON.parse(JSON.stringify([]))}
      renderItem={renderRestaurant}
      className="flex flex-col"
    />
  );
};

export default FavoriteRestaurantsPage;

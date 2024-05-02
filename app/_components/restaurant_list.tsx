import Image from "next/image";
import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant_item";

const RestaurantList = async () => {
  const restaurants = await db.restaurant.findMany({
    take: 10,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      deliveryFee: true,
      deliveryTimeMinutes: true,
    },

    where: {
      deliveryFee: {
        equals: 0,
      },
    },
  });

  return (
    <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;

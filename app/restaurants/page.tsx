"use client";

import { RestaurantItemProps } from "@/app/_types/Restaurant/RestaurantItemProps.d";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ListPage from "../_components/vertical_list";
import RestaurantItem from "../_components/restaurant_item";
import SearchForRestaurants from "./_actions/search";

const renderItem = (restaurant: RestaurantItemProps) => {
  return (
    <RestaurantItem
      key={restaurant.id}
      restaurant={restaurant}
      className="min-w-full max-w-full"
    />
  );
};

const RestaurantsPage = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<RestaurantItemProps[]>([]);

  const searchFor = searchParams.get("search");
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const response = await SearchForRestaurants(searchFor);
      setRestaurants(response);
    };

    fetchRestaurants();
  }, [searchFor]);

  return (
    <ListPage
      title="Restaurantes Encontrados"
      data={restaurants}
      renderItem={renderItem}
      className="flex flex-col"
    />
  );
};

export default RestaurantsPage;

"use server";

import { db } from "@/app/_lib/prisma";

const SearchForRestaurants = async (searchParams: string) => {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: searchParams,
        mode: "insensitive",
      },
    },
    include: {
      categories: true,
    },
  });

  return JSON.parse(JSON.stringify(restaurants));
};

export default SearchForRestaurants;

"use server";

import { revalidatePath } from "next/cache";
import { db } from "../_lib/prisma";

interface IToggleFavoriteRestaurant {
  userId: string;
  restaurantId: string;
  callbackPath?: string;
}

export const toggleFavoriteRestaurant = async ({
  userId,
  restaurantId,
  callbackPath,
}: IToggleFavoriteRestaurant) => {
  const isFavorite = await db.favoriteRestaurants.findFirst({
    where: {
      userId,
      restaurantId,
    },
  });

  if (isFavorite) {
    await db.favoriteRestaurants.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });

    revalidatePath(callbackPath || "/");
    return;
  }

  await db.favoriteRestaurants.create({
    data: {
      userId,
      restaurantId,
    },
  });

  revalidatePath(callbackPath || "/");
};

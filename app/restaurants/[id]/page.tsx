import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant_image";
import RestaurantDetails from "./_components/restaurant_details";

interface RestaurantsPageProps {
  params: {
    id: string;
  };
}

const RestaurantsPage = async ({ params: { id } }: RestaurantsPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });

  if (!restaurant) return notFound();

  return (
    <div>
      {/* IMAGE */}
      <RestaurantImage restaurant={JSON.parse(JSON.stringify(restaurant))} />

      <RestaurantDetails restaurant={JSON.parse(JSON.stringify(restaurant))} />
    </div>
  );
};

export default RestaurantsPage;

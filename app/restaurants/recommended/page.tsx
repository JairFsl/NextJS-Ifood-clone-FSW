import { db } from "@/app/_lib/prisma";
import ListPage from "@/app/_page/list_page";

const RecommendedProducts = async () => {
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
    />
  );
};

export default RecommendedProducts;

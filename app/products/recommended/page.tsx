import { db } from "@/app/_lib/prisma";
import ListPage from "@/app/_components/vertical_list";
import ProductItem from "@/app/_components/product_item";
import { ProductsItemProps } from "@/app/_types/Product/ProductsItemProps.d";

const renderItem = (restaurant: ProductsItemProps) => {
  return (
    <ProductItem
      key={restaurant.id}
      product={JSON.parse(JSON.stringify(restaurant))}
      className="min-w-full max-w-full"
    />
  );
};

const RecommendedProducts = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        include: {
          categories: true,
        },
      },
    },
  });

  return (
    <ListPage
      title="Ofertas Recomendadas"
      data={JSON.parse(JSON.stringify(products))}
      renderItem={renderItem}
    />
  );
};

export default RecommendedProducts;

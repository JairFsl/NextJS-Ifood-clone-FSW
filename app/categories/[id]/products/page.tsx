import ProductItem from "@/app/_components/product_item";
import ListPage from "@/app/_components/vertical_list";
import { db } from "@/app/_lib/prisma";
import { ProductsItemProps } from "@/app/_types/Product/ProductsItemProps.d";
import { notFound } from "next/navigation";

interface CategoriesPageProps {
  params: {
    id: string;
  };
}

const renderItem = (product: ProductsItemProps) => {
  return (
    <ProductItem
      key={product.id}
      product={JSON.parse(JSON.stringify(product))}
      className="min-w-full max-w-full"
    />
  );
};

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
  const category = await db.category.findUnique({
    where: {
      id,
    },
    include: {
      Product: {
        distinct: ["id"],
        include: {
          restaurant: true,
        },
      },
    },
  });

  if (!category) return notFound();

  return (
    <ListPage
      title={category.name}
      data={JSON.parse(JSON.stringify(category.Product))}
      renderItem={renderItem}
    />
  );
};

export default CategoriesPage;

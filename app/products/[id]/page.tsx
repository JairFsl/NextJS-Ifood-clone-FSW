import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product_image";
import BottomButton from "@/app/_components/bottom_button";
import HorizontalList from "@/app/_components/horizontal_list";
import ProductItem from "@/app/_components/product_item";
import { ProductsListProps } from "@/app/_types/ProductsListProps.interface";
import ProductDetails from "./_components/product_details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const renderProduct = (product: ProductsListProps) => {
  return <ProductItem product={product} />;
};

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) return notFound();

  const handleAddCart = (id: string): void => {
    console.log("Add to cart");
  };

  const drinks = await db.product.findMany({
    take: 10,
    where: {
      category: {
        name: "Sucos",
      },
      AND: {
        restaurant: {
          id: product.restaurant.id,
        },
      },
      NOT: {
        id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <>
      <div className="pb-20">
        {/* IMAGE */}
        <ProductImage product={product} />

        {/* INFO */}
        <ProductDetails product={product} />

        {/* MORE */}
        {drinks.length > 0 && (
          <div className="py-6">
            <h2 className="px-5 pb-3 text-lg font-semibold">Sucos</h2>
            <HorizontalList data={drinks} renderItem={renderProduct} />
          </div>
        )}
      </div>

      <div className="fixed bottom-0 z-30 w-full rotate-180 transform rounded-b-3xl bg-white px-5 py-5 shadow-md">
        <div className="rotate-180">
          <BottomButton text="Adicionar à Sacola" />
        </div>
      </div>
    </>
  );
};

export default ProductPage;

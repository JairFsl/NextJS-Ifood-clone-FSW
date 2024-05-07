import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product_image";
import BottomButton from "@/app/_components/bottom_button";
import HorizontalList from "@/app/_components/horizontal_list";
import ProductDetails from "./_components/product_details";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
      category: true,
    },
  });

  if (!product) return notFound();

  let otherProducts;
  // CHECK IF THE PRODUCT IS A DRINK
  if (product.category.name === "Sucos") {
    // TAKE OTHER PRODUCTS
    otherProducts = await db.product.findMany({
      take: 10,
      where: {
        restaurantId: product.restaurant.id,
        NOT: {
          id,
          AND: {
            NOT: {
              category: {
                name: "Sucos",
              },
            },
          },
        },
      },

      include: {
        restaurant: true,
      },
    });
  } else {
    // TAKE ALL DRINKS BUT THE CURRENT PRODUCT
    otherProducts = await db.product.findMany({
      take: 10,
      where: {
        category: {
          name: "Sucos",
        },
      },
      include: {
        restaurant: true,
      },
    });
  }

  return (
    <>
      <div className="pb-20">
        {/* IMAGE */}
        <ProductImage product={JSON.parse(JSON.stringify(product))} />

        {/* INFO */}
        <ProductDetails product={JSON.parse(JSON.stringify(product))} />

        {/* MORE */}
        {otherProducts.length > 0 && (
          <div className="py-6">
            <h2 className="px-5 pb-3 text-lg font-semibold">
              {product.category.name === "Sucos"
                ? `Mais de ${product.restaurant.name}`
                : "Sucos"}
            </h2>
            <HorizontalList product data={otherProducts} />
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

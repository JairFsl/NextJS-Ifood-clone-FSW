import Image from "next/image";
import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product_image";
import { formatPrice } from "@/app/_lib/utils";
import { AlarmClockIcon, ArrowDownIcon, BikeIcon } from "lucide-react";
import ProductCount from "./_components/product_count";
import BottomButton from "@/app/_components/bottom_button";
import { Card } from "@/app/_components/ui/card";
import HorizontalList from "@/app/_components/horizontal_list";
import ProductItem from "@/app/_components/product_item";
import { ProductsListProps } from "@/app/_types/ProductsListProps.interface";

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
      restaurant: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          deliveryFee: true,
          deliveryTimeMinutes: true,
        },
      },
    },
  });

  if (!product) return notFound();

  const drinks = await db.product.findMany({
    take: 5,
    where: {
      category: {
        name: "Sucos",
      },
      AND: {
        restaurant: {
          id: product.restaurant.id,
        },
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });

  return (
    <>
      <div className="pb-20">
        {/* IMAGE */}
        <ProductImage product={product} />

        {/* INFO */}
        <div className="relative z-20 mt-[-20px] rounded-t-3xl bg-white">
          {/* RESTAURANT */}
          <div className="flex items-center gap-2 p-5">
            <div className="relative h-6 w-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                quality={100}
                className="rounded-full object-cover shadow-sm"
              />
            </div>
            <span className="text-sm">{product.restaurant.name}</span>
          </div>

          {/* PRODCUT NAME */}
          <div className="px-5 pb-3 text-2xl font-bold">{product.name}</div>

          {/* PRICE + QUANTITY*/}
          <div className="flex flex-row items-center justify-between px-5">
            {/* PRODUCT PRICE */}
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-4 text-2xl font-bold">
                {formatPrice(Number(product.price), product.discountPercentage)}
                {product.discountPercentage > 0 && (
                  <div className="flex items-center gap-0.5 rounded-full bg-primary px-2 text-sm text-white">
                    <ArrowDownIcon size={14} />
                    {product.discountPercentage}%
                  </div>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <span className="text-sm text-muted-foreground">
                  De: {formatPrice(Number(product.price))}
                </span>
              )}
            </div>

            {/* PRODUCT QUANTITY */}
            <ProductCount />
          </div>

          {/* DELIVERY */}
          <Card className="mx-5 my-7 flex flex-row items-center justify-around rounded-md border border-solid border-gray-200 px-5 py-7 shadow-md">
            {/* DELIVERY FEE */}
            <div className="flex-col">
              <div className="flex items-center gap-2">
                Entrega
                <BikeIcon size={16} className="text-primary" />
              </div>
              <div className="text-center font-bold">
                {Number(product.restaurant.deliveryFee) > 0 ? (
                  <p>R${Number(product.restaurant.deliveryFee)},00</p>
                ) : (
                  "Grátis"
                )}
              </div>
            </div>

            {/* DELIVERY TIME */}
            <div className="flex-col">
              <div className="flex items-center gap-2">
                Entrega
                <AlarmClockIcon size={16} className="text-primary" />
              </div>
              <div className="text-center font-bold">
                {product.restaurant.deliveryTimeMinutes} min
              </div>
            </div>
          </Card>

          {/* DESCRIPTION */}
          <div className="px-5 py-2">
            <h2 className="pb-2 text-lg font-semibold">Sobre</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* MORE */}
          {drinks.length > 0 && (
            <div className="py-6">
              <h2 className="px-5 pb-3 text-lg font-semibold">Sucos</h2>
              <HorizontalList data={drinks} renderItem={renderProduct} />
            </div>
          )}
        </div>
      </div>

      <BottomButton text="Adicionar à Sacola" />
    </>
  );
};

export default ProductPage;

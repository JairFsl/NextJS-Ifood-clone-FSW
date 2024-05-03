import Image from "next/image";
import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product_image";
import { formatPrice } from "@/app/_lib/utils";
import { AlarmClockIcon, ArrowDownIcon, BikeIcon } from "lucide-react";
import ProductCount from "./_components/product_count";
import BottomButton from "@/app/_components/bottom_button";
import { Card } from "@/app/_components/ui/card";

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
      restaurant: {
        select: {
          name: true,
          imageUrl: true,
          deliveryFee: true,
          deliveryTimeMinutes: true,
        },
      },
    },
  });

  if (!product) return notFound();

  return (
    <>
      <div className="pb-20">
        {/* IMAGEM */}
        <ProductImage product={product} />

        {/* INFO */}
        <div className="p-5">
          {/* RESTAURANT */}
          <div className="flex items-center gap-2">
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

          {/* PRODUTO */}
          <div className="py-3 text-2xl font-bold">{product.name}</div>

          {/* PREÇO + QUANTIDADE*/}
          <div className="flex flex-row items-center justify-between">
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

            <ProductCount />
          </div>

          {/* ENTREGA */}
          <Card className="mt-7 flex flex-row items-center justify-around rounded-md border border-solid border-gray-200 py-7 shadow-md">
            {/* CUSTO */}
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

            {/* TEMPO */}
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

          {/* DESCRIÇÃO */}
          <div>
            <h2 className="pb-3 pt-7 text-lg font-semibold">Sobre</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
        </div>
      </div>

      <BottomButton text="Adicionar à Sacola" />
    </>
  );
};

export default ProductPage;

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { formatPrice } from "../_lib/utils";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="w-[150px] min-w-[150px] space-y-2">
      {/* IMAGEM */}
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-sm"
        />

        {/* DESCONTO */}
        <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-xl bg-primary px-2 text-white">
          <ArrowDownIcon size={14} />
          {product.discountPercentage}%
        </div>
      </div>

      {/* INFO */}
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {formatPrice(Number(product.price), product.discountPercentage)}
          </span>
          <span className="text-xs text-muted-foreground line-through">
            {formatPrice(Number(product.price))}
          </span>
        </div>

        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;

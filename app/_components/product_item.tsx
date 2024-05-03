"use client";

import Image from "next/image";
import { formatPrice } from "../_lib/utils";
import { ArrowDownIcon } from "lucide-react";
import React from "react";
import { ProductsListProps } from "../_types/ProductsListProps.interface";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ItemProps {
  product: ProductsListProps;
}

const ProductItem: React.FC<ItemProps> = ({ product }: ItemProps) => {
  const router = useRouter();
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`} key={product.id}>
      <div className="w-[150px] min-w-[150px] space-y-2 rounded-b-lg rounded-t-2xl bg-background px-1 py-1">
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
    </Link>
  );
};

export default ProductItem;

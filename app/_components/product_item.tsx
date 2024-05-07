"use client";

import Image from "next/image";
import { cn, formatPrice } from "../_lib/utils";
import { ArrowDownIcon } from "lucide-react";
import React from "react";
import { ProductsItemProps } from "../_types/ProductsItemProps.interface";
import Link from "next/link";

interface ItemProps {
  showRestaurant?: boolean;
  product: ProductsItemProps;

  className?: string;
}

const ProductItem: React.FC<ItemProps> = ({
  showRestaurant = true,
  product,
  className,
}: ItemProps) => {
  return (
    <Link
      className={(cn("w-[180px] min-w-[180px]"), className)}
      href={`/products/${product.id}`}
      key={product.id}
    >
      <div className="w-full space-y-2 rounded-lg p-1 hover:bg-slate-200">
        {/* IMAGEM */}
        <div className="relative aspect-square h-[150px] w-full">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            quality={100}
            sizes="100%"
            className="rounded-lg object-cover shadow-sm"
          />

          {/* DESCONTO */}
          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-xl bg-primary px-2 text-white">
              <ArrowDownIcon size={14} />
              {product.discountPercentage}%
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <h2 className="truncate text-sm">{product.name}</h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {formatPrice(Number(product.price), product.discountPercentage)}
            </span>

            {product.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(Number(product.price))}
              </span>
            )}
          </div>

          {showRestaurant && (
            <span className="block text-xs text-muted-foreground">
              {product.restaurant.name}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;

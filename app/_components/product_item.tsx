"use client";

import Image from "next/image";
import { formatPrice } from "../_lib/utils";
import { ArrowDownIcon } from "lucide-react";
import React from "react";
import { ProductsListProps } from "../_types/ProductsListProps.interface";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductItem: React.FC<ProductsListProps> = (item) => {
  const router = useRouter();
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${item.id}`}>
      <div
        className="w-[150px] min-w-[150px] space-y-2 rounded-lg bg-background px-1 py-1"
        onClick={() => router.push(`/products/${item.id}`)}
      >
        {/* IMAGEM */}
        <div className="relative h-[150px] w-full">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="rounded-lg object-cover shadow-sm"
          />

          {/* DESCONTO */}
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-xl bg-primary px-2 text-white">
            <ArrowDownIcon size={14} />
            {item.discountPercentage}%
          </div>
        </div>

        {/* INFO */}
        <div>
          <h2 className="truncate text-sm">{item.name}</h2>
          <div className="flex items-center gap-2">
            <span className="font-semibold">
              {formatPrice(Number(item.price), item.discountPercentage)}
            </span>
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(Number(item.price))}
            </span>
          </div>

          <span className="block text-xs text-muted-foreground">
            {item.restaurant.name}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;

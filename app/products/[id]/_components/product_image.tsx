"use client";

import { Button } from "@/app/_components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "imageUrl" | "name">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        sizes="100%"
        quality={100}
        className="object-cover"
      />

      <Button
        onClick={() => router.back()}
        size={"icon"}
        className="absolute left-4 top-4 rounded-full bg-white text-foreground shadow-sm hover:text-white"
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;

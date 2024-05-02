import { Product } from "@prisma/client";
import Image from "next/image";

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <div className="h-[150px] min-w-[150px] space-y-2">
      {/* IMAGEM */}
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-sm"
        />
      </div>
      {/* INFO */}
      <div>
        <h2>{product.name}</h2>
      </div>
    </div>
  );
};

export default ProductItem;

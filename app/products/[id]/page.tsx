import Image from "next/image";
import { db } from "../../_lib/prisma";
import { notFound } from "next/navigation";

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
  });

  if (!product) return notFound();

  return (
    <div>
      <h1>Product {product.name}</h1>
      <Image
        src={product.imageUrl}
        alt={product?.name}
        width={150}
        height={150}
      />
    </div>
  );
};

export default ProductPage;

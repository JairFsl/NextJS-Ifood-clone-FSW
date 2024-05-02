import { db } from "../_lib/prisma";
import ProductItem from "./product_item";

const ProductList = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },

    take: 10,
  });

  return (
    <div className="[&:: -webkit-scrollbar]:hidden flex gap-4 overflow-x-scroll px-5">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

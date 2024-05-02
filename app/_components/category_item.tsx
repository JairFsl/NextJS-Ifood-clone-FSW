import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <div className="flex items-center gap-5 rounded-full px-5 py-3 shadow-md">
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />

      <span className="text-center text-sm font-semibold">{category.name}</span>
    </div>
  );
};

export default CategoryItem;

import { Category } from "@prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Badge
      variant="outline"
      className="flex items-center gap-5 border-none bg-background px-5 py-2"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        height={30}
        width={30}
      />
      <span className="text-center text-sm font-semibold">{category.name}</span>
    </Badge>
  );
};

export default CategoryItem;

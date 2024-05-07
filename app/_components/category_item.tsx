"use client";

import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link href={`/categories/${category.id}/products`}>
      <Button
        variant={"outline"}
        className="h-10 w-full min-w-full justify-start gap-4 border px-7 shadow-md"
      >
        <Image
          src={category.imageUrl}
          alt={category.name}
          width={25}
          height={25}
          quality={100}
        />
        <span className="text-left text-sm font-semibold">{category.name}</span>
      </Button>
    </Link>
  );
};

export default CategoryItem;

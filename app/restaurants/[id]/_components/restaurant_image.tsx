"use client";

import { Button } from "@/app/_components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Restaurant;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />

      <div className="absolute top-4 flex w-full flex-row items-center justify-between px-4">
        <Button
          onClick={() => router.back()}
          size={"icon"}
          className="rounded-full bg-white text-foreground shadow-sm hover:text-white"
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size={"icon"}
          className="rounded-full bg-muted-foreground text-black"
        >
          <HeartIcon fill="#fff" strokeWidth={0} />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantImage;

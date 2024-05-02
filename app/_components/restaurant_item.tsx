import { Prisma, Restaurant } from "@prisma/client";
import Image from "next/image";

interface RestaurantItemProps {
  restaurant: Prisma.RestaurantGetPayload<{
    select: {
      id: true;
      name: true;
      imageUrl: true;
      deliveryFee: true;
      deliveryTimeMinutes: true;
    };
  }>;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div className="w-[266px] min-w-[266px] space-y-2">
      {/* IMAGEM */}
      <div className="relative h-[150px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-sm"
        />
      </div>

      {/* INFO */}
      <div>
        <h2 className="font-semibold">{restaurant.name}</h2>
        <div className="flex items-center gap-2">
          <span className="font-semibold">Entrega Grátis</span>
          <span className="text-xs text-muted-foreground">
            {restaurant.deliveryTimeMinutes} min
          </span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;

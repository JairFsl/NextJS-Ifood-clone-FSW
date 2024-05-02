import { AlarmClockIcon, BikeIcon, HeartIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { RestaurantItemProps } from "../_types/RestaurantItemProps.interface";

const RestaurantItem: React.FC<RestaurantItemProps> = (restaurant) => {
  return (
    <div className="w-[266px] min-w-[266px] space-y-2 rounded-lg bg-background px-1 py-1">
      {/* IMAGEM */}
      <div className="relative h-[150px] w-full">
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="rounded-lg object-cover shadow-sm"
        />

        {/* AVALIAÇÃO */}
        <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-xl bg-white px-2 text-black">
          <StarIcon size={20} fill="#ffd900" strokeWidth={0} />
          {`5.0`}
        </div>

        <Button
          size={"icon"}
          className="absolute right-2 top-2 flex h-7 w-7 items-center rounded-full bg-muted-foreground text-black"
        >
          <HeartIcon size={18} fill="#fff" strokeWidth={0} />
        </Button>
      </div>

      {/* INFO */}
      <div className="gap-2">
        <h2 className="truncate font-semibold">{restaurant.name}</h2>
        <div className="items- flex items-center gap-6">
          <div className="flex gap-1">
            <BikeIcon size={16} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Entrega Grátis
            </span>
          </div>
          <div className="flex gap-1">
            <AlarmClockIcon size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">
              {restaurant.deliveryTimeMinutes} min
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantItem;

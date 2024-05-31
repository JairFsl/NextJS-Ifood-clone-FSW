import { AlarmClockIcon, BikeIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { RestaurantItemProps } from "../_types/Restaurant/RestaurantItemProps.d";
import Link from "next/link";
import { cn } from "../_lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import LikeButton from "./like_button";

interface ItemProps {
  restaurant: RestaurantItemProps;
  className?: string;
}

// eslint-disable-next-line @next/next/no-async-client-component
const RestaurantItem: React.FC<ItemProps> = async ({
  restaurant,
  className,
}: ItemProps) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/api/auth/signin");
  }

  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      key={restaurant.id}
      className={cn("min-w-[266px] max-w-[266px]", className)}
    >
      <div className="w-full space-y-3 rounded-lg p-1 hover:bg-slate-200">
        {/* IMAGEM */}
        <div className="relative h-[150px] w-full">
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            sizes="100%"
            quality={100}
            className="rounded-lg object-cover shadow-sm"
          />

          {/* AVALIAÇÃO */}
          <div className="absolute left-2 top-2 flex items-center gap-0.5 rounded-xl bg-white px-2 text-black">
            <StarIcon size={20} fill="#ffd900" strokeWidth={0} />
            5.0
          </div>

          {/* LIKE */}
          <LikeButton userId={session.user.id} restaurantId={restaurant.id} />
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-2">
          {/* RESTAURANT NAME */}
          <h2 className="truncate font-semibold">{restaurant.name}</h2>

          {/* RESTAURANT DELIVERY INFO */}
          <div className="flex items-center gap-9">
            {/* DELIVERY FEE */}
            <div className="flex min-w-28 gap-1">
              <BikeIcon size={16} className="text-primary" />
              <span className="text-sm text-muted-foreground">
                {Number(restaurant.deliveryFee) > 0
                  ? `R$${restaurant.deliveryFee},00`
                  : `Entrega Grátis`}
              </span>
            </div>

            {/* DELIVERY TIME */}
            <div className="flex gap-1">
              <AlarmClockIcon size={16} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantItem;

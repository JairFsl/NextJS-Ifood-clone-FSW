import HorizontalList from "@/app/_components/horizontal_list";
import { Badge } from "@/app/_components/ui/badge";
import { Card } from "@/app/_components/ui/card";
import { db } from "@/app/_lib/prisma";
import { RestaurantItemProps } from "@/app/_types/Restaurant/RestaurantItemProps";
import { AlarmClockIcon, BikeIcon, StarIcon } from "lucide-react";
import Image from "next/image";

interface RestaurantDetailsProps {
  restaurant: RestaurantItemProps;
}

const RestaurantDetails = async ({ restaurant }: RestaurantDetailsProps) => {
  const mostSearched = await db.product.findMany({
    take: 10,
    where: {
      category: {
        name: {
          in: [...restaurant.categories.map((category) => category.name)],
        },
      },
      AND: {
        restaurantId: restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  const productsByCategory = await db.product.findMany({
    take: 10,
    where: {
      category: {
        name: restaurant.categories[0].name,
      },
      AND: {
        restaurantId: restaurant.id,
      },
    },
    include: {
      restaurant: true,
    },
  });

  return (
    <div className="relative z-20 mt-[-20px] rounded-t-3xl bg-white">
      {/* RESTAURANT */}
      <div className="flex flex-row items-center justify-between p-5">
        <div className="flex flex-row items-center gap-2">
          <div className="relative h-10 w-10">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              sizes="100%"
              quality={100}
              className="rounded-full object-cover shadow-sm"
            />
          </div>
          {/* PRODCUT NAME */}
          <span className="text-center text-2xl font-bold">
            {restaurant.name}
          </span>
        </div>

        <Badge variant={"outline"} className="gap-2 bg-foreground text-white">
          <StarIcon size={20} fill="#ffd900" strokeWidth={0} />
          5.0
        </Badge>
      </div>

      <Card className="mx-5 flex flex-row items-center justify-around rounded-3xl border border-solid border-gray-200 py-5 shadow-md">
        {/* DELIVERY FEE */}
        <div className="flex-col">
          <div className="flex items-center gap-2">
            Entrega
            <BikeIcon size={16} className="text-primary" />
          </div>
          <div className="text-center font-bold">
            {Number(restaurant.deliveryFee) > 0 ? (
              <p>R${Number(restaurant.deliveryFee)},00</p>
            ) : (
              "Grátis"
            )}
          </div>
        </div>

        {/* DELIVERY TIME */}
        <div className="flex-col">
          <div className="flex items-center gap-2">
            Entrega
            <AlarmClockIcon size={16} className="text-primary" />
          </div>
          <div className="text-center font-bold">
            {restaurant.deliveryTimeMinutes} min
          </div>
        </div>
      </Card>

      {/* CATEGORY */}
      <div className="flex w-full flex-row items-center justify-between gap-2 p-5">
        {restaurant.categories.map((category) => (
          <Badge
            variant={"outline"}
            key={category.id}
            className="flex w-full justify-center rounded-sm border-none bg-gray-200 p-1 text-muted-foreground"
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* MOST SEARCHED */}
      {mostSearched.length > 0 && (
        <div className="py-6">
          <h2 className="mx-5 pb-3 text-lg font-semibold">Mais Pedidos</h2>
          <HorizontalList
            product
            data={JSON.parse(JSON.stringify(mostSearched))}
          />
        </div>
      )}

      {/* LIST BY CATEGORY */}
      {productsByCategory.length > 0 && (
        <div className="py-6">
          <h2 className="mx-5 pb-3 text-lg font-semibold">
            {restaurant.categories[0].name}
          </h2>
          <HorizontalList
            product
            data={JSON.parse(JSON.stringify(productsByCategory))}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantDetails;

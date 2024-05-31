"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { toggleFavoriteRestaurant } from "../_actions/restaurant";

interface ILikeButton {
  userId: string;
  restaurantId: string;
}

const LikeButton = ({ userId, restaurantId }: ILikeButton) => {
  const pathName = usePathname();

  return (
    <>
      <Button
        onClick={() =>
          toggleFavoriteRestaurant({
            userId,
            restaurantId,
            callbackPath: pathName,
          })
        }
        size={"icon"}
        className="absolute right-2 top-2 flex h-7 w-7 items-center rounded-full bg-muted-foreground text-black"
      >
        <HeartIcon size={18} fill="#fff" strokeWidth={0} />
      </Button>
    </>
  );
};

export default LikeButton;

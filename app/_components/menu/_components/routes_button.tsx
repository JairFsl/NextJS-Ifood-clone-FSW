"use client";

import { HeartIcon, HomeIcon, ReceiptTextIcon } from "lucide-react";
import { Button } from "../../ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

const RoutesButton = () => {
  const pathName = usePathname();

  const routes = {
    home: () => {
      return pathName === "/"
        ? {
            className:
              "flex w-full scale-100 items-center justify-start gap-4 rounded-full transition-transform hover:scale-105 hover:transform hover:transition-transform",
          }
        : {
            className:
              "flex w-full scale-100 items-center justify-start gap-4 rounded-full transition-transform hover:scale-105 hover:transform hover:transition-transform border-none",
          };
    },

    orders: () => {
      return pathName === "/orders"
        ? {
            className:
              "flex w-full scale-100 items-center justify-start gap-4 rounded-full transition-transform hover:scale-105 hover:transform hover:transition-transform",
          }
        : {
            className:
              "flex w-full scale-100 items-center justify-start gap-4 rounded-full transition-transform hover:scale-105 hover:transform hover:transition-transform border-none",
          };
    },

    favorites: () => {
      return pathName === "/favoriteRestaurants"
        ? {
            className:
              "flex w-full scale-100 items-center justify-start gap-4 rounded-full transition-transform hover:scale-105 hover:transform hover:transition-transform",
          }
        : {
            className:
              "flex w-full scale-100 items-center justify-start gap-4 rounded-full transition-transform hover:scale-105 hover:transform hover:transition-transform border-none",
          };
    },
  };

  return (
    <>
      <div className="border border-solid"></div>
      <div className="my-5 flex flex-col gap-4 p-3">
        <Button
          variant={pathName === "/" ? "default" : "outline"}
          className={routes.home().className}
          asChild
        >
          <Link href={"/"}>
            <HomeIcon />
            <span>Home</span>
          </Link>
        </Button>

        <Button
          variant={pathName === "/orders" ? "default" : "outline"}
          className={routes.orders().className}
          asChild
        >
          <Link href={"/orders"}>
            <ReceiptTextIcon />
            <span>Meus Pedidos</span>
          </Link>
        </Button>

        <Button
          variant={pathName === "/favoriteRestaurants" ? "default" : "outline"}
          className={routes.favorites().className}
          asChild
        >
          <Link href={"/favoriteRestaurants"}>
            <HeartIcon />
            <span>Restaurantes Favoritos</span>
          </Link>
        </Button>
      </div>
    </>
  );
};

export default RoutesButton;

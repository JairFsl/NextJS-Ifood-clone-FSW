import {
  CupSodaIcon,
  FishIcon,
  GrapeIcon,
  HeartIcon,
  HomeIcon,
  IceCreamConeIcon,
  LogInIcon,
  PizzaIcon,
  ReceiptTextIcon,
  SandwichIcon,
  UtensilsIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuPage = () => {
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
      return pathName.includes("/orders")
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
      return pathName.includes("/favorites")
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
      <h1 className="text-xl font-semibold">Menu</h1>
      <div className="mt-4 flex h-full flex-col">
        {/* PROFILE / LOGIN */}
        <Link
          href="/login"
          className="hover: my-5 rounded-full px-3 duration-300 ease-in-out hover:scale-105 hover:transform hover:transition-transform"
        >
          <div className="flex flex-row items-center justify-between p-1">
            <span className="font-semibold">Olá, Faça seu Login!</span>
            <Button size={"icon"} className="h-9 w-9">
              <LogInIcon />
            </Button>
          </div>
        </Link>

        <div className="border border-solid"></div>

        {/* MENU */}
        <div className="my-5 flex flex-col gap-4 p-3">
          <Button
            variant={pathName === "/" ? "default" : "outline"}
            className={routes.home().className}
          >
            <HomeIcon />
            <span>Home</span>
          </Button>

          <Button
            variant={pathName.includes("/orders") ? "default" : "outline"}
            className={routes.orders().className}
          >
            <ReceiptTextIcon />
            <span>Meus Pedidos</span>
          </Button>

          <Button
            variant={pathName.includes("/favorites") ? "default" : "outline"}
            className={routes.favorites().className}
          >
            <HeartIcon />
            <span>Restaurantes Favoritos</span>
          </Button>
        </div>

        <div className="mt-2 border border-solid"></div>

        {/* CATEGORIES */}
        <div className="my-2 flex flex-col gap-3 px-3 py-5">
          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <UtensilsIcon />
              Pratos
            </Button>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <SandwichIcon />
              Lanches
            </Button>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <PizzaIcon />
              Pizza
            </Button>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <FishIcon />
              Japonesa
            </Button>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <IceCreamConeIcon />
              Sobremesas
            </Button>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <GrapeIcon />
              Sucos
            </Button>
          </div>

          <div>
            <Button
              variant={"outline"}
              className="flex w-full scale-100 items-center justify-start gap-4 rounded-full border-none transition-transform hover:scale-105 hover:transform hover:transition-transform"
            >
              <CupSodaIcon />
              Refrigerantes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;

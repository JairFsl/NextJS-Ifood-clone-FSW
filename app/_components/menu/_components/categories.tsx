"use client";

import {
  CupSodaIcon,
  FishIcon,
  GrapeIcon,
  IceCreamConeIcon,
  PizzaIcon,
  SandwichIcon,
  UtensilsIcon,
} from "lucide-react";
import { Button } from "../../ui/button";

const Categories = () => {
  return (
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
  );
};

export default Categories;

"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";

const ProductCount = () => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () =>
    setQuantity((prevState) => {
      if (prevState === 99) return prevState;
      return prevState + 1;
    });
  const handleDecrement = () =>
    setQuantity((prevState) => {
      if (prevState === 1) return prevState;
      return prevState - 1;
    });

  return (
    <div className="flex items-center gap-3 text-center">
      <Button
        variant={"outline"}
        size={"icon"}
        className="border-gray-200 text-foreground"
        onClick={handleDecrement}
      >
        <ChevronLeftIcon size={16} />
      </Button>
      <div className="w-4 text-center text-sm text-muted-foreground">
        {quantity}
      </div>

      <Button size={"icon"} onClick={handleIncrement}>
        <ChevronRightIcon size={16} />
      </Button>
    </div>
  );
};

export default ProductCount;

"use client";

import Image from "next/image";
import { CartProduct } from "../_types/Product/ProductsItemProps";
import { formatPrice } from "../_lib/utils";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, Trash2Icon } from "lucide-react";
import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";

interface CartItemProps {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: CartItemProps) => {
  const [quantity, setQuantity] = useState<number>(cartProduct.quantity);
  const { changeProductQuantity, RemoveProductFromCart } =
    useContext(CartContext);

  const handleIncrement = () => {
    setQuantity((prevState) => {
      if (prevState === 99) return prevState;
      return prevState + 1;
    });

    changeProductQuantity(cartProduct.id, quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) return prevState;
      return prevState - 1;
    });

    changeProductQuantity(cartProduct.id, quantity - 1);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex h-24 w-full items-center gap-4">
        {/* IMAGE */}
        <div className="relative aspect-square h-[77px] w-[77px] rounded-md">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            sizes="100%"
            quality={100}
            className="rounded-lg object-cover"
          />
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col py-1">
          <h2 className="truncate text-sm">{cartProduct.name}</h2>
          <div className="flex items-center gap-1">
            <span className="font-semibold">
              {formatPrice(
                Number(cartProduct.price),
                cartProduct.discountPercentage,
              )}
            </span>

            {cartProduct.discountPercentage > 0 && (
              <span className="text-end text-xs text-muted-foreground line-through">
                {formatPrice(Number(cartProduct.price))}
              </span>
            )}
          </div>

          {/* PRODUCT QUANTITY */}
          <div className="flex h-9 items-center gap-3 text-center">
            <Button
              variant={"outline"}
              size={"icon"}
              className="h-8 w-8 border-gray-200 text-foreground"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              <ChevronLeftIcon />
            </Button>
            <div className="w-4 text-center text-sm text-muted-foreground">
              {quantity}
            </div>

            <Button
              size={"icon"}
              className="h-8 w-8"
              onClick={handleIncrement}
              disabled={quantity === 99}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      {/* DELETE */}
      <Button
        variant={"outline"}
        size={"icon"}
        className="h-8 w-8 border-gray-200 text-foreground"
        onClick={() => RemoveProductFromCart(cartProduct.id)}
      >
        <Trash2Icon size={18} />
      </Button>
    </div>
  );
};

export default CartItem;

"use client";

import BottomButton from "@/app/_components/bottom_button";
import Cart from "@/app/_components/cart";
import HorizontalList from "@/app/_components/horizontal_list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { formatPrice } from "@/app/_lib/utils";
import {
  CartProduct,
  ProductsItemProps,
} from "@/app/_types/Product/ProductsItemProps";
import { Category } from "@prisma/client";
import {
  AlarmClockIcon,
  ArrowDownIcon,
  BikeIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: ProductsItemProps;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { products, addProductToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [openSheet, setOpenSheet] = useState<boolean>(false);

  console.log(products);

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

  const handleAddProduct = () => {
    console.log("Adding product to cart", product);
    addProductToCart(product, quantity);
    setOpenSheet(true);
  };

  return (
    <>
      <div className="relative z-20 mt-[-20px] rounded-t-3xl bg-white">
        {/* RESTAURANT */}
        <div className="flex items-center gap-2 p-5">
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              quality={100}
              className="rounded-full object-cover shadow-sm"
            />
          </div>
          <span className="text-sm">{product.restaurant.name}</span>
        </div>

        {/* PRODCUT NAME */}
        <div className="px-5 pb-3 text-2xl font-bold">{product.name}</div>

        {/* PRICE + QUANTITY*/}
        <div className="flex flex-row items-center justify-between px-5">
          {/* PRODUCT PRICE */}
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-4 text-2xl font-bold">
              {formatPrice(Number(product.price), product.discountPercentage)}
              {product.discountPercentage > 0 && (
                <div className="flex items-center gap-0.5 rounded-full bg-primary px-2 text-sm text-white">
                  <ArrowDownIcon size={14} />
                  {product.discountPercentage}%
                </div>
              )}
            </div>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground">
                De: {formatPrice(Number(product.price))}
              </span>
            )}
          </div>

          {/* PRODUCT QUANTITY */}
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
        </div>

        {/* DELIVERY */}
        <Card className="mx-5 my-7 flex flex-row items-center justify-around rounded-md border border-solid border-gray-200 px-5 py-7 shadow-md">
          {/* DELIVERY FEE */}
          <div className="flex-col">
            <div className="flex items-center gap-2">
              Entrega
              <BikeIcon size={16} className="text-primary" />
            </div>
            <div className="text-center font-bold">
              {Number(product.restaurant.deliveryFee) > 0 ? (
                <p>R${Number(product.restaurant.deliveryFee)},00</p>
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
              {product.restaurant.deliveryTimeMinutes} min
            </div>
          </div>
        </Card>

        {/* DESCRIPTION */}
        <div className="px-5 py-2">
          <h2 className="pb-2 text-lg font-semibold">Sobre</h2>
          <p className="text-muted-foreground">{product.description}</p>
        </div>
      </div>

      <div className="fixed bottom-0 z-30 w-full rotate-180 transform rounded-b-3xl bg-white px-5 py-5 shadow-md">
        <div className="rotate-180">
          <BottomButton
            text="Adicionar ao carrinho"
            onClick={handleAddProduct}
          />
        </div>
      </div>

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent className="pr-2.5">
          <h1 className="text-2xl font-semibold">Sacola</h1>
          <Cart />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProductDetails;

"use client";

import BottomButton from "@/app/_components/bottom_button";
import Cart from "@/app/_components/cart";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import { CartContext } from "@/app/_context/cart";
import { formatPrice } from "@/app/_lib/utils";
import { ProductsItemProps } from "@/app/_types/Product/ProductsItemProps.d";
import {
  AlarmClockIcon,
  ArrowDownIcon,
  BikeIcon,
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";

interface ProductDetailsProps {
  product: ProductsItemProps;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const { products, addProductToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState<number>(1);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

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

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductToCart({ product, quantity, emptyCart });
    setOpenCart(true);
  };

  const handleAddProduct = () => {
    const hasItemFromDifferentRestaurant = products.some(
      (cartProduct) => cartProduct.restaurantId !== product.restaurantId,
    );

    if (hasItemFromDifferentRestaurant) return setOpenAlertDialog(true);

    addToCart({
      emptyCart: false,
    });
  };

  return (
    <>
      <div className="relative z-20 mt-[-20px] rounded-t-3xl bg-white">
        {/* RESTAURANT */}
        <Button
          asChild
          variant={"link"}
          className="gap-2 p-5 text-sm font-normal text-black"
        >
          <Link href={`/restaurants/${product.restaurantId}`}>
            <div className="relative h-6 w-6">
              <Image
                src={product.restaurant.imageUrl}
                alt={product.restaurant.name}
                fill
                sizes="100%"
                quality={100}
                className="rounded-full object-cover shadow-sm"
              />
            </div>
            <span>{product.restaurant.name}</span>
          </Link>
        </Button>

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

      <div className="fixed bottom-0 z-30 w-full rotate-180 transform rounded-b-3xl bg-white p-5 shadow-md">
        <div className="rotate-180">
          <BottomButton
            text="Adicionar ao carrinho"
            onClick={handleAddProduct}
          />
        </div>
      </div>

      <Cart isOpen={openCart} setOpen={setOpenCart} />

      <AlertDialog open={openAlertDialog} onOpenChange={setOpenAlertDialog}>
        <AlertDialogContent className="flex h-80 w-[90%] flex-col items-center justify-center rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Esta ação removerá os itens atuais da sua sacola!
            </AlertDialogTitle>
            <AlertDialogDescription>
              Este item pertence a outro Restaurante. Deseja mesmo limpar sua
              sacola e adicionar este item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-5 w-full">
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              Limpar e Adicionar Produto
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={openDialog}>
        <DialogContent className="flex h-80 w-3/4 flex-col items-center justify-center rounded-2xl">
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2Icon
              size={72}
              className="rounded-full bg-primary text-white"
            />

            <h2 className="mt-3 text-center text-xl font-bold">
              Pedido realizado com sucesso!
            </h2>
            <div className="w-full rounded-md">
              <BottomButton
                className="text-md w-full bg-gray-300 font-semibold text-black hover:text-white"
                text="Confirmar"
                onClick={() => setOpenDialog(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;

"use client";

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
import { Dialog, DialogContent } from "@/app/_components/ui/dialog";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { CartContext } from "@/app/_context/cart";
import { cn } from "@/app/_lib/utils";
import { IOrderItem } from "@/app/_types/Order/OrderItem";
import { CheckCircle2Icon, ChevronRightIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import BottomButton from "@/app/_components/bottom_button";
import Cart from "@/app/_components/cart";

const OrderItem = ({ order }: IOrderItem) => {
  const { addProductToCart, products } = useContext(CartContext);

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);

  const statusInfo = () => {
    switch (order.status) {
      case "CONFIRMED":
        return {
          text: "Confirmado",
          textColor: "text-white",
          statusColor: "bg-[#4CAF50]",
        };
      case "CANCELED":
        return {
          text: "Cancelado",
          textColor: "text-white",
          statusColor: "bg-[#F44336]",
        };
      case "PREPARING":
        return {
          text: "Preparando",
          textColor: "text-white",
          statusColor: "bg-[#FFEB3B]",
        };
      case "DELIVERING":
        return {
          text: "Em transporte",
          textColor: "text-white",
          statusColor: "bg-[#2196F3]",
        };
      case "FINISHED":
        return {
          text: "Finalizado",
          textColor: "text-white",
          statusColor: "bg-[#9E9E9E]",
        };
      default:
        return {
          text: "Finalizado",
          textColor: "text-white",
          statusColor: "bg-[#EEEEEE]",
        };
    }
  };

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    order.products.forEach((product) => {
      addProductToCart({
        product: product.product,
        quantity: product.quantity,
        emptyCart,
      });
    });

    setOpenCart(true);
  };

  const handleAddToCart = () => {
    const hasItemFromDifferentRestaurant = products.some(
      (cartProduct) =>
        cartProduct.restaurantId !== order.products[0].product.restaurantId,
    );

    if (hasItemFromDifferentRestaurant) return setOpenAlertDialog(true);

    addToCart({
      emptyCart: false,
    });
  };

  return (
    <>
      <Card>
        <CardContent className="p-5">
          {/* STATUS */}
          <div
            className={cn(
              "mb-1 w-32 rounded-full px-1 text-center",
              statusInfo().statusColor,
            )}
          >
            <span
              className={cn("text-sm font-semibold", statusInfo().textColor)}
            >
              {statusInfo().text}
            </span>
          </div>

          {/* RESTAURANT */}
          <div className="flex h-10 flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={order.restaurant.imageUrl} />
                <AvatarFallback>RE</AvatarFallback>
              </Avatar>
              <span className="font-semibold">{order.restaurant.name}</span>
            </div>
            <ChevronRightIcon />
          </div>

          <div className="my-3 border border-solid"></div>

          {/* PRODUCTS */}
          <div className="flex flex-col items-center justify-center">
            {order.products.map((product) => (
              <div
                key={product.id}
                className="flex w-full flex-row items-center gap-2"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-white">
                  {product.quantity}
                </div>
                <span className="font-semibold text-muted-foreground">
                  {product.product.name}
                </span>
              </div>
            ))}
          </div>

          <div className="my-3 border border-solid"></div>

          {/* PRICE */}
          <div className="flex flex-row items-center justify-between">
            <span className="font-semibold">R$ {Number(order.totalPrice)}</span>
            <Button variant={"ghost"} onClick={handleAddToCart}>
              <span className="font-semibold text-primary">
                Adicionar à Sacola
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

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

export default OrderItem;

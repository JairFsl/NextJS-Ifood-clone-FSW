"use client";

import { useContext, useState } from "react";
import { CartContext } from "../_context/cart";
import { formatPrice } from "../_lib/utils";
import BottomButton from "./bottom_button";
import { Sheet, SheetContent } from "./ui/sheet";
import Cart from "./cart";
import { Dialog, DialogContent } from "./ui/dialog";
import { CheckCircle2Icon } from "lucide-react";

interface ICartBannerProps {
  restaurantId: string;
}

const CartBanner = ({ restaurantId }: ICartBannerProps) => {
  const { products, orderInfo } = useContext(CartContext);

  const [openCart, setOpenCart] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const restaurantHasProductsOnCart = products.some(
    (CartProduct) => CartProduct.restaurantId === restaurantId,
  );

  if (!restaurantHasProductsOnCart) return null;

  return (
    <>
      <div className="fixed bottom-0 z-30 w-full bg-white p-5">
        <div className="flex items-center justify-between">
          {/* VALUE */}
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium text-muted-foreground">
              Total sem entrega
            </span>
            <div>
              <span className="font-semibold">
                {formatPrice(orderInfo.total - orderInfo.delivery)}{" "}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                / {orderInfo.quantity}{" "}
                {orderInfo.quantity > 1 ? "itens" : "item"}
              </span>
            </div>
          </div>

          {/* BUTTON */}
          <div>
            <BottomButton text="Ver Sacola" onClick={() => setOpenCart(true)} />
          </div>
        </div>
      </div>

      <Sheet open={openCart} onOpenChange={setOpenCart}>
        <SheetContent>
          <Cart dialog={setOpenDialog} cart={setOpenCart} />
        </SheetContent>
      </Sheet>

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

export default CartBanner;

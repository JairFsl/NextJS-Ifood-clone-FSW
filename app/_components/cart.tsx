import { useContext, Dispatch, SetStateAction, useState } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart_item";
import BottomButton from "./bottom_button";
import { formatPrice } from "../_lib/utils";
import { Card } from "./ui/card";
import { Dialog, DialogContent } from "./ui/dialog";
import { CheckCircle2Icon } from "lucide-react";
import { Sheet, SheetContent } from "./ui/sheet";

interface CartProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Cart = ({ isOpen, setOpen }: CartProps) => {
  const { products, orderInfo, RemoveAllProductsFromCart } =
    useContext(CartContext);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent>
        <h1 className="text-2xl font-semibold">Sacola</h1>
        <div className="mt-4 flex h-full flex-col justify-between -space-y-7">
          <div className="mb-6 h-full flex-auto overflow-y-scroll [&::-webkit-scrollbar]:hidden">
            {products.map((product) => (
              <CartItem
                cartProduct={JSON.parse(JSON.stringify(product))}
                key={product.id}
              />
            ))}
          </div>

          <div className="z-30 w-full pb-5">
            <Card className="px-5">
              {/* SUBTOTAL */}
              <div className="flex flex-row justify-between border-b py-2">
                <span className="self-center text-center">Subtotal</span>
                <span>{formatPrice(orderInfo.subTotal)}</span>
              </div>

              {/* DELIVERY */}
              <div className="flex flex-row justify-between border-b py-2">
                <span className="self-center text-center">Entrega</span>
                <span
                  className={
                    products.length > 0
                      ? orderInfo.delivery > 0
                        ? ""
                        : "self-center text-center text-sm text-primary"
                      : ""
                  }
                >
                  {products.length > 0
                    ? orderInfo.delivery > 0
                      ? formatPrice(orderInfo.delivery)
                      : "GRÁTIS"
                    : "R$ 0,00"}
                </span>
              </div>

              {/* DISCOUNT */}
              <div className="flex flex-row justify-between border-b py-2">
                <span className="self-center text-center">Descontos</span>
                <span>
                  {orderInfo.discount > 0
                    ? `- ${formatPrice(orderInfo.discount)}`
                    : formatPrice(orderInfo.discount)}
                </span>
              </div>

              {/* TOTAL */}
              <div className="flex flex-row justify-between py-2">
                <span className="self-center text-center font-bold">Total</span>
                <span className="font-bold">
                  {formatPrice(orderInfo.total)}
                </span>
              </div>
            </Card>

            <div className="my-7 flex w-full">
              <BottomButton
                disabled={products.length === 0}
                text="Finalizar Pedido"
                onClick={() => {
                  RemoveAllProductsFromCart();
                  setOpenDialog(true);
                }}
              />
            </div>
          </div>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                  onClick={() => {
                    setOpen(false);
                    setOpenDialog(false);
                  }}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;

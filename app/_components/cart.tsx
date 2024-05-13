import { useContext, Dispatch, SetStateAction } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart_item";
import BottomButton from "./bottom_button";
import { formatPrice } from "../_lib/utils";
import { Card } from "./ui/card";

interface CartControlProps {
  dialog: Dispatch<SetStateAction<boolean>>;
  cart: Dispatch<SetStateAction<boolean>>;
}

const Cart = ({ dialog, cart }: CartControlProps) => {
  const { products, orderInfo, RemoveAllProductsFromCart } =
    useContext(CartContext);

  return (
    <>
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
              <span className="font-bold">{formatPrice(orderInfo.total)}</span>
            </div>
          </Card>

          <div className="my-7 flex w-full">
            <BottomButton
              disabled={products.length === 0}
              text="Finalizar Pedido"
              onClick={() => {
                console.log("KARAI", dialog);
                RemoveAllProductsFromCart();
                dialog(true);
                cart(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart_item";
import BottomButton from "./bottom_button";
import { formatPrice, getOrderInfo } from "../_lib/utils";

const Cart = () => {
  const { products, RemoveAllProductsFromCart } = useContext(CartContext);
  const { subTotal, delivery, discount, total } = getOrderInfo(products);

  return (
    <>
      <h1 className="text-2xl font-semibold">Sacola</h1>
      <div className="mt-4 flex h-full flex-col justify-between -space-y-7">
        <div className="mb-5 h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden">
          {products.map((product) => (
            <CartItem
              cartProduct={JSON.parse(JSON.stringify(product))}
              key={product.id}
            />
          ))}
        </div>

        <div className="bottom-0 z-30 w-full bg-transparent pb-5">
          <div className="rounded-md border bg-white px-5 py-3">
            <div className="flex flex-row justify-between border-b py-2">
              <span className="self-center text-center">Subtotal</span>
              <span>{formatPrice(subTotal)}</span>
            </div>

            <div className="flex flex-row justify-between border-b py-2">
              <span className="self-center text-center">Entrega</span>
              <span
                className={
                  delivery > 0
                    ? ""
                    : "self-center text-center text-sm text-primary"
                }
              >
                {delivery > 0 ? formatPrice(delivery) : "GRÁTIS"}
              </span>
            </div>

            <div className="flex flex-row justify-between border-b py-2">
              <span className="self-center text-center">Descontos</span>
              <span>
                {discount > 0
                  ? `-${formatPrice(discount)}`
                  : formatPrice(discount)}
              </span>
            </div>

            <div className="flex flex-row justify-between py-2">
              <span className="self-center text-center font-bold">Total</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="my-7 flex w-full">
            <BottomButton
              text="Finalizar Pedido"
              onClick={RemoveAllProductsFromCart}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

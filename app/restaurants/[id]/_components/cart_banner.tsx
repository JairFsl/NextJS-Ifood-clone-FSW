"use client";

import { useContext, useState } from "react";
import { CartContext } from "../../../_context/cart";
import { formatPrice } from "../../../_lib/utils";
import BottomButton from "../../../_components/bottom_button";
import Cart from "../../../_components/cart";

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
      <Cart isOpen={openCart} setOpen={setOpenCart} />
    </>
  );
};

export default CartBanner;

import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart_item";

const Cart = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="mt-4 space-y-7">
      {products.map((product) => (
        <CartItem
          cartProduct={JSON.parse(JSON.stringify(product))}
          key={product.id}
        />
      ))}
    </div>
  );
};

export default Cart;

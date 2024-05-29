import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import ListPage from "../_components/vertical_list";
import { OrderItemProps } from "../_types/Order/OrderItem";
import OrderItem from "./_components/order_item";
import { useEffect } from "react";

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return redirect("/");
  }
  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: {
            include: {
              restaurant: true,
            },
          },
        },
      },
    },
  });

  const renderItem = (order: OrderItemProps) => {
    return (
      <OrderItem order={JSON.parse(JSON.stringify(order))} key={order.id} />
    );
  };

  return (
    <ListPage
      title="Meus Pedidos"
      data={orders}
      renderItem={renderItem}
      className="flex flex-col"
    />
  );
};

export default OrdersPage;

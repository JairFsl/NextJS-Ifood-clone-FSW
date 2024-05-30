import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import ListPage from "../_components/vertical_list";
import { OrderItemProps } from "../_types/Order/OrderItem";
import OrderItem from "./_components/order_item";
import { Suspense } from "react";
import Header from "../_components/header";

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
    <Suspense
      fallback={
        <>
          <Header />
          <div className="mt-7 px-5">
            <h1 className="text-xl font-bold">Meus Pedidos</h1>
            <div className="mt-4 flex min-w-full flex-col gap-x-3 gap-y-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  className={
                    "flex w-full flex-col gap-4 rounded-lg bg-neutral-200 p-3"
                  }
                  key={index}
                >
                  <div className="w-full animate-pulse space-y-2 rounded-lg p-1">
                    <div className="flex flex-col gap-2">
                      <div className="h-5 w-32 rounded-md bg-neutral-400/50"></div>
                      <div className="flex flex-row items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-neutral-400/50"></div>
                        <div className="h-5 w-2/6 rounded-md bg-neutral-400/50"></div>
                      </div>

                      <div className="my-2 border border-solid border-neutral-400/50"></div>

                      <div className="flex flex-row items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-neutral-400/50"></div>
                        <div className="h-5 w-2/4 rounded-md bg-neutral-400/50"></div>
                      </div>

                      <div className="my-2 border border-solid border-neutral-400/50"></div>

                      <div className="flex flex-row justify-between">
                        <div className="h-5 w-2/12 rounded-md bg-neutral-400/50"></div>
                        <div className="flex h-5 w-2/5 items-center justify-center rounded-md bg-neutral-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      }
    >
      <ListPage
        title="Meus Pedidos"
        data={orders}
        renderItem={renderItem}
        className="flex flex-col"
      />
    </Suspense>
  );
};

export default OrdersPage;

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import Header from "../_components/header";

const MyOrdersPage = async () => {
  const session = await getServerSession();
  console.log(session);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <Header />
    </>
  );
};

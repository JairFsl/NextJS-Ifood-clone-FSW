import { Suspense } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import RoutesButton from "./_components/routes_button";
import Categories from "./_components/categories";
import { useSession } from "next-auth/react";
import LogInButton from "./_components/login_button";
import LogOutButton from "./_components/logout_button";

const MenuPage = () => {
  const { data } = useSession();

  console.log(data);

  return (
    <>
      <h1 className="text-xl font-semibold">Menu</h1>
      <div className="mt-4 flex h-full flex-col">
        {/* PROFILE / LOGIN */}
        {data?.user ? (
          <>
            <div className="my-5 flex justify-between">
              <div className="flex items-center gap-3 p-1">
                <Avatar>
                  <AvatarImage src={data?.user?.image as string | undefined} />
                  <AvatarFallback>
                    {data?.user?.name?.split(" ")[0][0]}
                    {data?.user?.name?.split(" ")[1][0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{data?.user?.name}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data?.user?.email}
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <LogInButton />
        )}

        {/* MENU */}
        {data?.user && <RoutesButton />}

        <div className="mt-2 border border-solid"></div>

        {/* CATEGORIES */}
        <Categories />

        {data?.user && <LogOutButton />}
      </div>
    </>
  );
};

export default MenuPage;

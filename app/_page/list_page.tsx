import { HeartOffIcon } from "lucide-react";
import { RestaurantItemProps } from "../_types/RestaurantItemProps.interface";
import Header from "../_components/header";
import RestaurantItem from "../_components/restaurant_item";

interface ListPageProps {
  // props
  title?: string;
  data?: RestaurantItemProps[];
}

const ListPage = ({
  title = "Restaurantes Favoritos",
  data = [],
}: ListPageProps) => {
  return (
    <>
      <Header />
      <div className="mt-7 px-5">
        <h1 className="mb-3 text-xl font-bold">{title}</h1>
        <div className="flex items-center justify-center">
          {/* Listinha */}
          {data.length > 0 ? (
            <div className="flex w-full flex-col gap-5">
              {data.map((item) => (
                <RestaurantItem key={item.id} restaurant={item} />
              ))}
            </div>
          ) : (
            <div className="absolute bottom-1/2 flex flex-col items-center gap-4 opacity-30">
              <HeartOffIcon size={64} />
              <span className="text-center font-bold">
                Você ainda não tem {title}...
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ListPage;

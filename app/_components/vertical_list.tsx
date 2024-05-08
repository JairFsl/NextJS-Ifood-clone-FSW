import Header from "./header";
import { cn } from "../_lib/utils";

interface ListPageProps {
  // props
  title?: string;
  data?: any[];
  renderItem?: (item: any) => JSX.Element;

  className?: string;
}

const ListPage = ({
  title = "Restaurantes Favoritos",
  data = [],
  renderItem,
  className,
}: ListPageProps) => {
  return (
    <>
      <Header />
      <div className="mt-7 px-5">
        <h1 className="text-xl font-bold">{title}</h1>
        <div
          className={cn(
            "mt-4 grid min-w-full grid-cols-2 gap-x-3 gap-y-4",
            className,
          )}
        >
          {data.map((item) => renderItem && renderItem(item))}
        </div>
      </div>
    </>
  );
};

export default ListPage;

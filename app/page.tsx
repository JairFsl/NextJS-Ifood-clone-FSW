import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Banner from "./_components/banner";
import CategoryList from "./_components/category_list";
import Header from "./_components/header";
import Search from "./_components/search";
import { db } from "./_lib/prisma";
import ProductItem from "./_components/product_item";
import HorizontalList from "./_components/horizontal_list";
import { ProductsListProps } from "./_types/ProductsListProps.interface";
import { RestaurantItemProps } from "./_types/RestaurantItemProps.interface";
import RestaurantItem from "./_components/restaurant_item";

export default async function Home() {
  const [products, restaurants] = await Promise.all([
    db.product.findMany({
      where: {
        discountPercentage: {
          gt: 0,
        },
      },
      take: 10,
      include: {
        restaurant: true,
      },
    }),
    db.restaurant.findMany({
      take: 10,
      select: {
        id: true,
        name: true,
        imageUrl: true,
        deliveryFee: true,
        deliveryTimeMinutes: true,
      },

      where: {
        deliveryFee: {
          lte: 5,
        },
      },
    }),
  ]);

  const renderProduct = (product: ProductsListProps) => {
    return <ProductItem product={product} />;
  };

  const renderRestaurant = (restaurant: RestaurantItemProps) => {
    return <RestaurantItem restaurant={restaurant} />;
  };

  return (
    <>
      {/* CABEÇALHO */}
      <Header />

      {/* CAMPO DE PESQUISA */}
      <div className="px-5 pt-6">
        <Search />
      </div>

      {/* lISTA DE CATEGORIAS */}
      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      {/* BANNER PROMOCIONAL */}
      <div className="px-5 pt-6">
        <Banner
          url="/homePage/Banner@3.png"
          alt="até 30% de desconto em Pizzas"
        />
      </div>

      {/* OFERTAS PROMOCIONAIS */}
      <div className="space-y-1 pt-6">
        {/* TÍTULO E BOTÃO DE VER TODOS */}
        <div className="flex items-center justify-between px-5">
          <h2 className="text-lg font-semibold">Ofertas recomendadas</h2>
          <Button variant="link" className="px-0 text-primary">
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        {/* LISTA DE PRODUTOS EM OFERTA */}
        <HorizontalList<ProductsListProps>
          data={products}
          renderItem={renderProduct}
        />
      </div>

      {/* BANNER PROMOCIONAL */}
      <div className="px-5 pt-6">
        <Banner
          url="/homePage/Banner2@3.png"
          alt="a partir de R$17,90 em Lanches"
        />
      </div>

      {/* RESTAURANTES RECOMENDADOS */}
      <div className="space-y-1 py-6">
        {/* TÍTULO E BOTÃO DE VER TODOS */}
        <div className="flex items-center justify-between px-5">
          <h2 className="text-lg font-semibold">Restaurantes recomendados</h2>
          <Button variant="link" className="px-0 text-primary">
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
        </div>

        {/* LISTA DE RESTAURANTES RECOMENDADOS */}
        <HorizontalList<RestaurantItemProps>
          data={restaurants}
          renderItem={renderRestaurant}
        />
      </div>
    </>
  );
}

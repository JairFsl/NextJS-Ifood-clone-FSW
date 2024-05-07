import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Banner from "./_components/banner";
import CategoryList from "./_components/category_list";
import Header from "./_components/header";
import Search from "./_components/search";
import HorizontalList from "./_components/horizontal_list";
import Link from "next/link";

import { Suspense } from "react";

export default async function Home() {
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
        <Suspense
          fallback={
            <div className="flex flex-row justify-center gap-2">
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-.3s]"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-.5s]"></div>
            </div>
          }
        >
          <CategoryList />
        </Suspense>
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
          {/* <Link href={"/restaurants/recommended"}> */}
          <Button variant="link" className="px-0 text-primary">
            Ver todos
            <ChevronRightIcon size={16} />
          </Button>
          {/* </Link> */}
        </div>

        {/* LISTA DE PRODUTOS EM OFERTA */}
        <Suspense
          fallback={
            <div className="flex flex-row justify-center gap-2">
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-.3s]"></div>
              <div className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-.5s]"></div>
            </div>
          }
        >
          <HorizontalList product={true} />
        </Suspense>
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
          <Link href={"/restaurants/recommended"}>
            <Button variant="link" className="px-0 text-primary">
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>

        {/* LISTA DE RESTAURANTES RECOMENDADOS */}
        <HorizontalList restaurant={true} />
      </div>
    </>
  );
}

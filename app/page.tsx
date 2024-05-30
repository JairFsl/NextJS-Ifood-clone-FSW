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
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  className="w-full animate-pulse space-y-2 rounded-lg"
                  key={index}
                >
                  <div className="h-10 w-full rounded-md bg-neutral-400/50"></div>
                </div>
              ))}
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
          <Button variant="link" className="px-0 text-primary" asChild>
            <Link href={"/products/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        {/* LISTA DE PRODUTOS EM OFERTA */}
        <Suspense
          fallback={
            <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className={
                    "flex w-[180px] min-w-[160px] flex-col gap-4 rounded-xl bg-neutral-200 p-2"
                  }
                >
                  <div className="w-full animate-pulse space-y-2 rounded-lg p-1">
                    <div className="h-28 w-full rounded-md bg-neutral-400/50"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-2/3 rounded-md bg-neutral-400/50"></div>
                      <div className="flex flex-row gap-2">
                        <div className="h-4 w-2/5 rounded-md bg-neutral-400/50"></div>
                        <div className="h-4 w-2/5 rounded-md bg-neutral-400/50"></div>
                      </div>
                      <div className="h-4 w-2/4 rounded-md bg-neutral-400/50"></div>
                    </div>
                  </div>
                </div>
              ))}
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
          <Button variant="link" className="flex px-0 text-primary" asChild>
            <Link href={"/restaurants/recommended"}>
              Ver todos
              <ChevronRightIcon size={16} />
            </Link>
          </Button>
        </div>

        {/* LISTA DE RESTAURANTES RECOMENDADOS */}
        <Suspense
          fallback={
            <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
              {Array.from({ length: 3 }, (_, index) => (
                <div
                  key={index}
                  className={
                    "flex min-w-[266px] max-w-[266px] flex-col gap-4 rounded-xl bg-neutral-200 p-2"
                  }
                >
                  <div className="w-full animate-pulse space-y-2 rounded-lg">
                    <div className="h-28 w-full rounded-md bg-neutral-400/50"></div>
                    <div className="flex flex-col gap-2">
                      <div className="h-4 w-2/3 rounded-md bg-neutral-400/50"></div>
                      <div className="flex flex-row gap-4">
                        <div className="h-4 w-1/2 rounded-md bg-neutral-400/50"></div>
                        <div className="h-4 w-2/5 rounded-md bg-neutral-400/50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <HorizontalList restaurant={true} />
        </Suspense>
      </div>
    </>
  );
}

import { ChevronRightIcon } from "lucide-react";
import { Button } from "./_components/ui/button";
import Banner from "./_components/banner";
import CategoryList from "./_components/category_list";
import Header from "./_components/header";
import ProductList from "./_components/product_list";
import Search from "./_components/search";

export default function Home() {
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
        <Banner url="/homePage/Banner@3.png" alt="até 30% de desconto" />
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
        <ProductList />
      </div>
    </>
  );
}

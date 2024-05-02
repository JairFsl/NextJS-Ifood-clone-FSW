import Banner from "./_components/banner";
import CategoryList from "./_components/category_list";
import Header from "./_components/header";
import ProductList from "./_components/product_list";
import Search from "./_components/search";

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Banner url="/homePage/Banner@3.png" alt="até 30% de desconto" />
      </div>

      <div className="pt-6">
        <ProductList />
      </div>
    </>
  );
}

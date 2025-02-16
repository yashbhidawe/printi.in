import React, { useContext } from "react";
import Layout from "../../components/layout/Layout.jsx";
import Hero from "../../components/heroSection/HeroSection.jsx";
import Filter from "../../components/filter/Filter.jsx";
import Carousel from "../../components/carousel/Caraousel.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import MyContext from "../../context/data/MyContext.jsx";
import {
  Benefits,
  FeaturedCategories,
  FeaturedCollection,
} from "../../components/additional/Additional.jsx";

function Home() {
  const { searchKey, filterType, product } = useContext(MyContext);

  // Apply filters to products
  const filteredProducts = product
    .filter((obj) => obj.title.toLowerCase().includes(searchKey.toLowerCase()))
    .filter((obj) =>
      obj.category.toLowerCase().includes(filterType.toLowerCase())
    );

  return (
    <Layout>
      <Hero />
      <FeaturedCategories />
      <FeaturedCollection />
      <Benefits />
      <Filter />
      <section className="text-gray-600 body-font bg-bgLight">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-textDark">
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-primaryLight rounded"></div>
          </div>
          <div className="container mx-auto md:px-4 px-2 py-8">
            <div className="grid grid-cols-1 md:gap-8 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Home;

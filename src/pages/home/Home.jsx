import React, { useContext } from "react";

import Layout from "../../components/layout/Layout.jsx";
import Hero from "../../components/heroSection/HeroSection.jsx";
import Filter from "../../components/filter/Filter.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
function Home() {
  return (
    <Layout>
      <Hero />

      <Filter />
      <ProductCard />
    </Layout>
  );
}

export default Home;

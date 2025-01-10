import React, { useContext } from "react";

import Layout from "../../components/layout/Layout";
import Hero from "../../components/heroSection/HeroSection";
import Filter from "../../components/filter/Filter";
import ProductCard from "../../components/productCard/ProductCard";
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

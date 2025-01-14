import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MyContext from "../../context/data/MyContext.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import Layout from "../../components/layout/Layout.jsx";

function Category() {
  const { category } = useParams();
  const { product, mode } = useContext(MyContext);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    // Filter products by category
    const filteredProducts = product.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
    setCategoryProducts(filteredProducts);
  }, [category, product]);

  return (
    <Layout>
      <div
        className={`category-page p-4 md:p-8 ${
          mode === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-3xl font-bold mb-6 capitalize text-center">
          {category} Products
        </h2>
        <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryProducts.length > 0 ? (
            categoryProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Category;

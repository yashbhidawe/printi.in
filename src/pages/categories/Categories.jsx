import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../context/data/MyContext.jsx";
import Layout from "../../components/layout/Layout.jsx";

export default function Categories() {
  const navigate = useNavigate();
  const { product } = useContext(MyContext);

  const categories = [...new Set(product.map((item) => item.category))].map(
    (category) => ({
      name: category,
      image: product.find((p) => p.category === category)?.imageUrl,
      productCount: product.filter((p) => p.category === category).length,
    })
  );

  return (
    <Layout>
      {" "}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              All Categories
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of printing categories. From business
              essentials to marketing materials, find exactly what you need.
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6 rounded-full" />
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                onClick={() => navigate(`/category/${category.name}`)}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md aspect-square mb-4">
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="text-white text-sm">
                        {category.productCount} Products
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-gray-800 font-medium text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No categories found.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

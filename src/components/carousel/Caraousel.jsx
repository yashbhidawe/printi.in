import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext.jsx";
import { useNavigate } from "react-router-dom";

function Carousel() {
  const { product, mode } = useContext(MyContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories from products
    const uniqueCategories = [...new Set(product.map((item) => item.category))];
    setCategories(uniqueCategories);
  }, [product]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="carousel-container py-8">
      <h2 className="text-2xl font-semibold text-textDark text-center mb-6">
        Categories
      </h2>
      <div className="flex gap-4 overflow-x-scroll no-scrollbar">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`carousel-item flex-shrink-0 cursor-pointer px-6 py-4 text-center rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 ${
              mode === "dark"
                ? "bg-primaryLight text-textLight"
                : "bg-primary text-white"
            }`}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

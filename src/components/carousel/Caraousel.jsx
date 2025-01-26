import React, { useState, useContext, useEffect } from "react";
import MyContext from "../../context/data/MyContext.jsx";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Carousel = () => {
  const { product, mode } = useContext(MyContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(product.map((item) => item.category)),
    ].map((category) => {
      const item = product.find((p) => p.category === category);
      return {
        category,
        imageUrl: item.imageUrl,
      };
    });
    setCategories(uniqueCategories);
  }, [product]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % categories.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [categories.length]);

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div
      className={`min-h-[90vh] w-full ${
        mode === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Hero Text Section */}
      <div className="container mx-auto px-4 pt-12 pb-6 text-center">
        <h1
          className={`text-4xl md:text-5xl font-bold mb-4 ${
            mode === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Explore Our Collections
        </h1>
        <p
          className={`text-lg md:text-xl max-w-2xl mx-auto ${
            mode === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Discover our carefully curated categories designed for your lifestyle
        </p>
      </div>

      {/* Cards Container */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide">
          {categories.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(item.category)}
              className={`relative flex-none w-72 h-96 rounded-xl overflow-hidden cursor-pointer 
                transform transition-all duration-500 hover:scale-105 ${
                  index === activeIndex
                    ? "ring-2 ring-primary ring-offset-4"
                    : ""
                }`}
            >
              {/* Card Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Card Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {item.category}
                </h3>

                <div className="flex items-center space-x-2 text-white/90">
                  <span className="text-sm">View Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: index === activeIndex ? "100%" : "0%",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "bg-gray-400 hover:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;

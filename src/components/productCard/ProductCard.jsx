import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { ShoppingCart, Eye } from "lucide-react";

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const context = useContext(MyContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const { category, title, price, imageUrl, id } = product;

  // Calculate fake original price (30% higher than actual price)
  const fakeOriginalPrice = Math.ceil(price * 1.3);
  const saveAmount = fakeOriginalPrice - price;
  const discountPercentage = Math.round(
    ((fakeOriginalPrice - price) / fakeOriginalPrice) * 100
  );

  const handleImageLoad = () => setIsLoading(false);

  const addCart = async (e, product) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    try {
      dispatch(addToCart(product));
      toast.success("Added to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  const navigateToProductInfo = () => {
    window.location.href = `/productinfo/${id}`;
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Image Container */}
      <div
        className="relative overflow-hidden cursor-pointer"
        onClick={navigateToProductInfo}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bgLight">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        <img
          className={`w-full h-64 object-cover transition-opacity duration-300
            ${isLoading ? "opacity-0" : "opacity-100"}`}
          src={imageUrl}
          alt={title}
          onLoad={handleImageLoad}
        />

        {/* Discount Badge */}
        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
          Save {discountPercentage}%
        </div>

        {/* Subtle Overlay with Quick View */}
      </div>

      {/* Content */}
      <div className="p-4 border-t border-bgSecondary">
        {/* Category */}
        <span className="text-xs text-primary/70 font-medium uppercase tracking-wide">
          {category}
        </span>

        {/* Title */}
        <h2
          onClick={navigateToProductInfo}
          className="mt-2 text-base font-medium text-textDark hover:text-primary 
            transition-colors duration-200 cursor-pointer line-clamp-2"
        >
          {title}
        </h2>

        {/* Price and Add to Cart */}
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium text-primary">
                ₹{price.toLocaleString("en-IN")}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{fakeOriginalPrice.toLocaleString("en-IN")}
              </span>
            </div>
            <span className="text-xs text-green-600">
              Save ₹{saveAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={(e) => addCart(e, product)}
            disabled={isAddingToCart}
            className={`flex items-center gap-2 px-4 py-2 text-sm
              ${
                isAddingToCart
                  ? "text-primary/50 cursor-not-allowed"
                  : "text-primary hover:text-primaryLight"
              }
              transition-colors duration-200`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

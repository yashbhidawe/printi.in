import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { ShoppingCart, Info } from "lucide-react";

function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const context = useContext(MyContext);
  const { searchKey } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const { category, title, price, imageUrl, id } = product;

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const addCart = async (product) => {
    setIsAddingToCart(true);
    try {
      dispatch(addToCart(product));
      toast.success("Added to cart", {
        position: "bottom-right",
        autoClose: 2000,
      });
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
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
      {/* Image Container */}
      <div className="relative aspect-w-3 aspect-h-2 w-full overflow-hidden bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          className={`w-full h-48 object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          src={imageUrl}
          alt={title}
          onLoad={handleImageLoad}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

        {/* Quick view button */}
        <button
          onClick={navigateToProductInfo}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="View product details"
        >
          <Info className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
            {category}
          </span>
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-200">
          {title}
        </h2>

        <div className="flex items-center justify-between mb-4">
          <p className="text-primary text-xl font-bold">
            ₹{price.toLocaleString("en-IN")}
          </p>
        </div>

        <button
          type="button"
          className={`w-full flex items-center justify-center gap-2 bg-primary hover:bg-primaryLight text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 disabled:opacity-70 disabled:cursor-not-allowed`}
          onClick={() => addCart(product)}
          disabled={isAddingToCart}
        >
          {isAddingToCart ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

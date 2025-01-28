import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { ShoppingCart, Info, Eye } from "lucide-react";

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

  const addCart = async (e, product) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
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
    <div
      onClick={navigateToProductInfo}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl cursor-pointer 
                overflow-hidden transition-all duration-300 ease-in-out flex flex-col h-full 
                border border-transparent hover:border-accent"
    >
      {/* Image Container */}
      <div className="relative aspect-w-4 aspect-h-3 w-full overflow-hidden bg-bgLight">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        <img
          className={`w-full h-52 object-cover transition-all duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          } group-hover:scale-110 transform`}
          src={imageUrl}
          alt={title}
          onLoad={handleImageLoad}
        />

        {/* Overlay with Quick Actions */}
        <div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                      transition-all duration-300 flex items-center justify-center opacity-0 
                      group-hover:opacity-100"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToProductInfo();
            }}
            className="mx-2 p-3 bg-white rounded-full shadow-lg transform translate-y-4 
                     group-hover:translate-y-0 transition-all duration-300 hover:bg-accent 
                     hover:text-white"
            aria-label="Quick view"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Category Tag */}
        <div className="mb-3">
          <span className="inline-block px-2.5 py-1 text-xs font-medium bg-bgLight text-primary rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-base sm:text-lg font-semibold text-textDark mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
          {title}
        </h2>

        {/* Price and Add to Cart */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-primary text-lg sm:text-xl font-bold">
              ₹{price.toLocaleString("en-IN")}
            </p>
          </div>

          <button
            type="button"
            onClick={(e) => addCart(e, product)}
            className={`w-full flex items-center justify-center gap-2 
                      ${
                        isAddingToCart
                          ? "bg-primaryLight"
                          : "bg-primary hover:bg-primaryLight"
                      } 
                      text-textLight font-medium py-2.5 px-4 rounded-lg 
                      transition-all duration-300 focus:outline-none 
                      focus:ring-2 focus:ring-primary focus:ring-offset-2
                      disabled:opacity-70 disabled:cursor-not-allowed`}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
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

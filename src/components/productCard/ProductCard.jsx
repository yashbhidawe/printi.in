import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx"; // Ensure exact case match

function ProductCard({ product }) {
  // Receive product as a prop
  const context = useContext(MyContext);
  const { searchKey, setSearchKey } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const { category, title, price, imageUrl, id } = product; // Destructure product prop
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
      <div className="flex justify-center overflow-hidden">
        <img
          className="w-full h-48 object-cover"
          src={imageUrl}
          alt={title}
          onClick={() => (window.location.href = `/productinfo/${id}`)}
        />
      </div>
      <div className="p-6">
        <h2 className="text-xs font-medium text-gray-500 uppercase tracki-wide mb-1">
          {category}
        </h2>
        <h1 className="text-base font-semibold text-gray-800 mb-2">{title}</h1>
        <p className="text-primary text-lg font-semibold mb-4">₹{price}</p>
        <button
          type="button"
          className="w-full bg-primary hover:bg-primaryLight text-white font-semibold py-2 px-2 md:py-2 md:px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-primaryLight"
          onClick={() => addCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

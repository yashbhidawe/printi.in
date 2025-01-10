import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx"; // Ensure exact case match
function ProductCard() {
  const context = useContext(MyContext);
  const {
    product,
    searchKey,
    setSearchKey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
  } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);
  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("added to cart");
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, cartItems);
  return (
    <section className="text-gray-600 body-font bg-bgLight">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-textDark">
            Our Latest Collection
          </h1>
          <div className="h-1 w-20 bg-primaryLight rounded"></div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto md:px-4 px-2 py-8">
          <div className="grid grid-cols-1  md:gap-8 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {product
              .filter((obj) => obj.title.toLowerCase().includes(searchKey))
              .filter((obj) => obj.category.toLowerCase().includes(filterType))
              .map((item, index) => {
                const { category, title, price, imageUrl, id } = item;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    <div className="flex justify-center overflow-hidden">
                      <img
                        className="w-full h-48 object-cover"
                        src={imageUrl}
                        alt={title}
                        onClick={() =>
                          (window.location.href = `/productinfo/${id}`)
                        }
                      />
                    </div>
                    <div className="p-6">
                      <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        {category}
                      </h2>
                      <h1 className="text-base font-semibold text-gray-800 mb-2">
                        {title}
                      </h1>
                      <p className="text-primary text-lg font-semibold mb-4">
                        ₹{price}
                      </p>
                      <button
                        type="button"
                        className="w-full bg-primary hover:bg-primaryLight text-white font-semibold py-2 px-2 md:py-2 md:px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-primaryLight"
                        onClick={() => addCart(item)}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCard;

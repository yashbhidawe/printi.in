import React, { useContext, useEffect } from "react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/data/myContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";

function AllProducts() {
  const context = useContext(myContext);
  const {
    product,
    searchKey,
    filterType,
    filterPrice,
    setSearchKey,
    setFilterType,
    setFilterPrice,
  } = context;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = product
    .filter((obj) => obj.title.toLowerCase().includes(searchKey.toLowerCase()))
    .filter((obj) =>
      obj.category.toLowerCase().includes(filterType.toLowerCase())
    )
    .filter((obj) => obj.price.toString().includes(filterPrice.toString()));

  return (
    <Layout>
      <Filter />
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 md:py-16 mx-auto">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-pink-600 rounded"></div>
          </div>

          <div className="flex flex-wrap -m-4">
            {filteredProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform transform hover:scale-105 cursor-pointer p-4 md:w-1/4"
                onClick={() =>
                  (window.location.href = `/productinfo/${item.id}`)
                }
              >
                <div className="flex justify-center overflow-hidden">
                  <img
                    className="w-full h-48 object-cover"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                    {item.category}
                  </h2>
                  <h1 className="text-base font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h1>
                  <p className="text-primary text-lg font-semibold mb-4">
                    ₹{item.price}
                  </p>
                  <button
                    type="button"
                    className="w-full bg-primary hover:bg-primaryLight text-white font-semibold py-2 px-2 md:py-2 md:px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-primaryLight"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents parent click event
                      addCart(item);
                    }}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ToastContainer />
      </section>
    </Layout>
  );
}

export default AllProducts;

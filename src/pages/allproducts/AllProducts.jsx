import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { ShoppingCart, Eye, ArrowUpRight } from "lucide-react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout.jsx";

function AllProducts() {
  const context = useContext(MyContext);
  const { product, searchKey, filterType, filterPrice } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const addCart = (e, product) => {
    e.stopPropagation();
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
      <div className="bg-white min-h-screen">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Discover Our Collection
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl">
              Explore our curated selection of premium products designed for
              your lifestyle.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Filter />
          </div>
        </div>

        {/* Products Grid */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-lg overflow-hidden"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] overflow-hidden bg-gray-100 rounded-lg">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={item.imageUrl}
                    alt={item.title}
                  />

                  {/* Quick Action Buttons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <button
                      onClick={(e) => addCart(e, item)}
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/productinfo/${item.id}`)
                      }
                      className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Category Tag */}
                  <span className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-black/60 text-white rounded-full">
                    {item.category}
                  </span>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-1">
                    {item.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-gray-900">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() =>
                        (window.location.href = `/productinfo/${item.id}`)
                      }
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          closeOnClick
          theme="dark"
        />
      </div>
    </Layout>
  );
}

export default AllProducts;

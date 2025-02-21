import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { ShoppingCart, Eye, ArrowUpRight } from "lucide-react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";

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
              <ProductCard key={index} product={item} />
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

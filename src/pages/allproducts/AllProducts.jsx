import React, { useContext, useEffect } from "react";
import Filter from "../../components/filter/Filter";
import Layout from "../../components/layout/Layout.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { ShoppingCart } from "lucide-react";

function AllProducts() {
  const context = useContext(MyContext);
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

  const addCart = (e, product) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Added to cart", {
      position: "bottom-right",
      autoClose: 2000,
    });
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
      <section className="bg-bgLight min-h-screen">
        <div className="container px-4 py-8 md:py-12 mx-auto">
          {/* Header */}
          <div className="max-w-2xl mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Latest Collection
            </h1>
            <div className="h-1 w-20 bg-accent rounded"></div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => (
              <div
                key={index}
                className="group flex flex-col bg-white rounded-xl shadow-sm hover:shadow-lg 
                          border border-transparent hover:border-accent
                          transition-all duration-300 overflow-hidden h-full"
                onClick={() =>
                  (window.location.href = `/productinfo/${item.id}`)
                }
              >
                {/* Image Container - Fixed Height */}
                <div className="relative aspect-w-4 aspect-h-3 w-full overflow-hidden bg-bgSecondary">
                  <img
                    className="w-full h-48 object-cover transition-transform duration-300 
                             group-hover:scale-110"
                    src={item.imageUrl}
                    alt={item.title}
                  />
                  <div
                    className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 
                                transition-opacity duration-300"
                  />
                </div>

                {/* Content Container - Flex Column with Fixed Height */}
                <div className="flex flex-col flex-grow p-4">
                  {/* Category */}
                  <div className="mb-2">
                    <span
                      className="inline-block px-2.5 py-1 text-xs font-medium 
                                   bg-bgLight text-primary rounded-full"
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Title - Fixed Height with Ellipsis */}
                  <h1 className="text-textDark font-semibold mb-2 line-clamp-2 min-h-[48px]">
                    {item.title}
                  </h1>

                  {/* Price and Button Container - Push to Bottom */}
                  <div className="mt-auto">
                    <p className="text-primary text-xl font-bold mb-3">
                      ₹{item.price.toLocaleString("en-IN")}
                    </p>
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-2 
                                bg-primary hover:bg-primaryLight text-white 
                                font-medium py-2.5 px-4 rounded-lg transition-colors 
                                duration-300 focus:outline-none focus:ring-2 
                                focus:ring-primary focus:ring-offset-2"
                      onClick={(e) => addCart(e, item)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add To Cart
                    </button>
                  </div>
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

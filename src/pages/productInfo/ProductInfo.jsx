import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice.jsx";
import {
  Heart,
  Share2,
  ShoppingCart,
  Star,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";

function ProductInfo() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const getProductData = async () => {
    try {
      setLoading(true);
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      setProduct(productTemp.data());
    } catch (error) {
      toast.error("Error loading product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [params.id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = async () => {
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: product?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-semibold">Product not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-primary hover:text-primaryLight"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-12 bg-bgLight">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Navigation */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </button>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Image Section */}
              <div className="relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className={`w-full h-auto rounded-lg shadow-lg transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < 4
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-gray-600">4.0 (12 reviews)</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primaryLight text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
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

                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      isLiked
                        ? "bg-red-50 border-red-200 text-red-500"
                        : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-4 rounded-lg border border-gray-200 text-gray-600 hover:border-primary hover:text-primary transition-all duration-200"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Additional Info */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Questions about this product?</span>
                    </div>
                    <button className="text-primary hover:text-primaryLight font-medium">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout.jsx";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
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
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Get user from localStorage
  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const currentUser = getUserFromLocalStorage();

  // Fetch product data and recommended products
  const getProductData = async () => {
    try {
      setLoading(true);
      setIsLoadingRecommended(true);
      const productTemp = await getDoc(doc(fireDB, "products", params.id));
      if (!productTemp.exists()) {
        throw new Error("Product not found");
      }
      const productData = productTemp.data();
      setProduct(productData);

      // Fetch recommended products
      const recommendedQuery = query(
        collection(fireDB, "products"),
        where("category", "==", productData.category),
        where("id", "!=", params.id)
      );
      const recommendedSnapshot = await getDocs(recommendedQuery);
      const recommendedData = recommendedSnapshot.docs.map((doc) => doc.data());
      setRecommendedProducts(recommendedData);
    } catch (error) {
      toast.error("Error loading product");
      console.error(error);
    } finally {
      setLoading(false);
      setIsLoadingRecommended(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [params.id]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Check if the product is liked by the current user
  useEffect(() => {
    const checkIfLiked = async () => {
      try {
        const userId = currentUser?.uid;
        if (!userId || !product) return;

        const wishlistRef = collection(fireDB, "wishlist");
        const wishlistQuery = query(
          wishlistRef,
          where("userId", "==", userId),
          where("productId", "==", product.id)
        );
        const wishlistSnapshot = await getDocs(wishlistQuery);

        if (!wishlistSnapshot.empty) {
          setIsLiked(true);
        }
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };

    if (product) {
      checkIfLiked();
    }
  }, [product, currentUser]);

  // Add product to cart
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

  // Like or unlike a product
  const handleLike = async () => {
    if (!currentUser || !product) {
      toast.error("Please log in to like products");
      return;
    }

    try {
      const userId = currentUser.uid;
      const wishlistRef = collection(fireDB, "wishlist");

      // Query for wishlist items specific to this user and this product
      const wishlistQuery = query(
        wishlistRef,
        where("userId", "==", userId),
        where("productId", "==", product.id)
      );
      const wishlistSnapshot = await getDocs(wishlistQuery);

      if (wishlistSnapshot.empty) {
        // Add to wishlist with user-specific data
        await addDoc(wishlistRef, {
          userId: userId, // Explicitly store user ID
          productId: product.id, // Store product ID for quick querying
          product: {
            ...product,
            userId: userId, // Add user ID to the product data for additional security
          },
          timestamp: new Date(),
        });
        setIsLiked(true);
        toast.success("Added to wishlist");
      } else {
        // Remove from wishlist
        const docId = wishlistSnapshot.docs[0].id;
        await deleteDoc(doc(wishlistRef, docId));
        setIsLiked(false);
        toast.success("Removed from wishlist");
      }
    } catch (error) {
      toast.error("Error updating wishlist");
      console.error(error);
    }
  };

  // Share product
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

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Layout>
    );
  }

  // Product not found state
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
                  onError={() => setImageLoaded(true)}
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
                    ₹{product.price?.toLocaleString("en-IN") || "N/A"}
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
                    onClick={handleLike}
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
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
                    aria-label="Share product"
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

            {/* Recommended Products Section */}
            {recommendedProducts.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Recommended Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {recommendedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {product.category}
                        </p>
                        <p className="text-lg font-bold text-primary">
                          ₹{product.price?.toLocaleString() || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ProductInfo;

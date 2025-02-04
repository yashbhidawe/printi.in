import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout.jsx";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import { addToCart } from "../../redux/cartSlice.jsx";
import { Trash2 } from "lucide-react";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Get current user from localStorage
  const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  // Fetch wishlist data for the current user from Firebase
  const fetchWishlist = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      toast.error("Please log in to view wishlist");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const wishlistCollection = await getDocs(
        query(
          collection(fireDB, "wishlist"),
          where("userId", "==", currentUser.uid) // Filter by current user's ID
        )
      );

      const wishlistData = wishlistCollection.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        // Filter out items with missing product data
        .filter((item) => item.product?.imageUrl && item.product?.title);

      setWishlist(wishlistData);
    } catch (error) {
      toast.error("Failed to fetch wishlist items.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToCart = (item) => {
    if (!item.product) {
      toast.error("Invalid product data");
      return;
    }
    dispatch(addToCart(item.product));
    toast.success("Added to cart!");
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "wishlist", id));
      setWishlist(wishlist.filter((item) => item.id !== id));
      toast.info("Item removed from wishlist.");
    } catch (error) {
      toast.error("Failed to remove item.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <section className="text-gray-600 body-font bg-bgLight min-h-screen">
        <div className="container px-4 md:px-8 py-16 md:py-24 mx-auto">
          <h1 className="text-3xl font-bold text-textDark mb-8">
            Your Wishlist
          </h1>
          {loading ? (
            <div className="space-y-4">
              <div className="h-24 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-24 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              <div className="h-24 w-full bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          ) : wishlist.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded-lg shadow-md bg-white"
                >
                  {/* Use optional chaining */}
                  <img
                    src={item.product?.imageUrl || "/placeholder-image.jpg"}
                    alt={item.product?.title || "Product image"}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-medium text-textDark">
                    {item.product?.title || "Untitled Product"}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.product?.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-primary">
                      ₹{item.product?.price?.toLocaleString() || "N/A"}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primaryLight transition-colors duration-200"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="p-3 text-red-500 hover:bg-red-100 rounded-full transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default WishList;

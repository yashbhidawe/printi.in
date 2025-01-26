import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout.jsx";
import { getDocs, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import { addToCart } from "../../redux/cartSlice.jsx";
import { Trash2 } from "lucide-react";

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  // Fetch wishlist data from Firebase
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const wishlistCollection = await getDocs(collection(fireDB, "wishlist"));
      const wishlistData = wishlistCollection.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWishlist(wishlistData);
    } catch (error) {
      toast.error("Failed to fetch wishlist items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success("Added to cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
    toast.info("Item removed from wishlist.");
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
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-medium text-textDark">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-primary">
                      ₹{item.price?.toLocaleString()}
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

import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteFromCart, updateCartQuantity } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import { addDoc, collection, getDocs } from "firebase/firestore";
import MyContext from "../../context/data/MyContext.jsx"; // Ensure exact case match

function Cart() {
  const context = useContext(MyContext);
  const dispatch = useDispatch();
  const { mode } = context;
  const cartItems = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    houseNumber: "",
    streetName: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price) * cartItem.quantity; // Multiply by quantity
    });
    setTotalAmount(temp);
  }, [cartItems]);

  let shipping = parseInt(100);
  const grandTotal = shipping + totalAmount;

  const deleteCart = (item) => {
    dispatch(deleteFromCart({ id: item.id }));
    toast.success("Item deleted");
  };

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) return; // Prevent quantity less than 1
    dispatch(updateCartQuantity({ id: item.id, quantity })); // Dispatch update quantity action
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  const user = getUserFromLocalStorage();

  const isAddressEmpty = () => {
    if (user) {
      const { houseNumber, streetName, city, state, postalCode } = user;

      return !houseNumber || !streetName || !city || !state || !postalCode;
    }
    return true;
  };
  useEffect(() => {
    isAddressEmpty();
  }, []);

  const buyNow = async () => {
    if (isAddressEmpty()) {
      toast.error("Please add address to proceed further");
      setTimeout(() => {
        window.location.href = "/edituserinfo";
        console.log("Redirecting to edituserinfo");
      }, 100);
      return; // Ensure the function exits here
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const addressInfo = {
      name: user.displayName,
      address: `${user.houseNumber}, ${user.streetName}, ${user.city}, ${user.state} - ${user.postalCode}`,
      pincode: user.postalCode,
      phoneNumber: user.phoneNumber,
      date: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }),
    };

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + user.displayName,
      name: "printi.in",
      description: "for testing purpose",
      handler: async function (response) {
        console.log("Payment response:", response);
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;

        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: user.email,
          userid: user.uid,
          paymentId,
        };

        try {
          const orderRef = collection(fireDB, "order");
          await addDoc(orderRef, orderInfo);
        } catch (error) {
          console.error("Error adding order to Firestore:", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <Layout>
      <div className="h-screen bg-bgLight pt-5">
        <h1 className="mb-10 text-center text-2xl font-bold text-primary">
          Cart Items
        </h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 overflow-y-auto max-h-96">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl, quantity } = item;
              return (
                <div
                  key={index}
                  className="justify-between mb-6 rounded-lg border drop-shadow-xl bg-white p-6 sm:flex sm:justify-start"
                >
                  <img
                    src={imageUrl}
                    alt="product-image"
                    className="w-full rounded-lg sm:w-40"
                  />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-textDark">
                        {title}
                      </h2>
                      <h2 className="text-sm text-textDark">{description}</h2>
                      <p className="mt-1 text-xs font-semibold text-textLight">
                        ₹{price}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-col justify-between items-center sm:mt-0 sm:block sm:space-y-6">
                      <div className="flex items-center mb-2">
                        <button
                          onClick={() => handleQuantityChange(item, 300)}
                          className="px-2 py-1 bg-gray-200 rounded-md mr-1"
                        >
                          300
                        </button>
                        <button
                          onClick={() => handleQuantityChange(item, 500)}
                          className="px-2 py-1 bg-gray-200 rounded-md mx-1"
                        >
                          500
                        </button>
                        <button
                          onClick={() => handleQuantityChange(item, 1000)}
                          className="px-2 py-1 bg-gray-200 rounded-md ml-1"
                        >
                          1000
                        </button>
                      </div>
                      <div className="flex items-center mb-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(item, quantity - 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded-md"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="mx-2 text-lg border-2 border-gray-300 rounded-md w-16 text-center"
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(item, parseInt(e.target.value))
                          }
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(item, quantity + 1)
                          }
                          className="px-2 py-1 bg-gray-200 rounded-md"
                        >
                          +
                        </button>
                      </div>
                      <svg
                        onClick={() => deleteCart(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 overflow-y-auto max-h-96">
            {cartItems.map((item, index) => {
              return (
                <div key={index}>
                  <h2 className="text-lg font-bold">{item.title}</h2>
                  <span className="flex justify-between">
                    <p>{item.quantity}</p> <p> x ₹{item.price}</p>
                  </span>
                  <p>₹{item.quantity * item.price}</p>
                  <br />
                  <hr />
                </div>
              );
            })}
            <div className="mb-2 flex justify-between">
              <p className="text-textDark">Subtotal</p>
              <p className="text-textDark">₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-textDark">Shipping</p>
              <p className="text-textDark">₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold text-primary">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold text-primary">
                  ₹{grandTotal}
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-primary hover:bg-primaryLight py-2 text-center rounded-lg text-white font-bold"
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;

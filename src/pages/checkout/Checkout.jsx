import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import { addDoc, collection } from "firebase/firestore";
import { load } from "@cashfreepayments/cashfree-js";
import axios from "axios";
import MyContext from "../../context/data/MyContext";
import { v4 as uuidv4 } from "uuid";

function Checkout() {
  const context = useContext(MyContext);
  const { mode } = context;
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0);
  const [cashfree, setCashfree] = useState(null);
  const [orderId, setOrderId] = useState("");

  // Initialize Cashfree SDK
  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const instance = await load({ mode: "sandbox" });
        setCashfree(instance);
      } catch (error) {
        console.error("Cashfree SDK initialization failed:", error);
      }
    };
    initializeSDK();
  }, []);

  // Calculate total amount
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp += parseInt(item.price) * parseInt(item.quantity);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  let shipping = totalAmount > 1500 ? 0 : 100;
  const grandTotal = shipping + totalAmount;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Retrieve user details from localStorage
  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };
  const user = getUserFromLocalStorage();

  // Check if user address is complete
  const isAddressEmpty = () => {
    if (user) {
      const { houseNumber, streetName, city, state, postalCode } = user;
      return !houseNumber || !streetName || !city || !state || !postalCode;
    }
    return true;
  };

  // Generate a unique order ID
  const generateOrderId = () => uuidv4();

  // Clear the cart (both Redux store and localStorage)
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.setItem("cart", JSON.stringify([]));
  };

  // Create a Cashfree order by calling your backend /payment endpoint
  const createOrder = async () => {
    try {
      const paymentData = {
        amount: grandTotal,
        customerName: user.displayName,
        customerEmail: user.email,
        customerPhone: user.phoneNumber,
      };
      const response = await axios.post(
        "http://localhost:5000/payment",
        paymentData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data && response.data.payment_session_id) {
        setOrderId(response.data.order_id);
        // Save pending order details for later verification
        const orderDetails = {
          items: cartItems,
          amount: grandTotal,
          shipping,
          totalAmount,
          timestamp: new Date().toISOString(),
          status: "pending",
          customerName: user.displayName,
          customerEmail: user.email,
          customerPhone: user.phoneNumber,
          shippingAddress: {
            houseNumber: user.houseNumber,
            streetName: user.streetName,
            city: user.city,
            state: user.state,
            postalCode: user.postalCode,
          },
          orderId: response.data.order_id,
        };
        localStorage.setItem("pendingOrder", JSON.stringify(orderDetails));
        return response.data.payment_session_id;
      } else {
        throw new Error("Missing payment_session_id in response");
      }
    } catch (error) {
      console.error("Error creating Cashfree order:", error);
      toast.error("Failed to create order");
    }
  };

  // Verify payment by calling backend /process-payment?orderId=...
  const verifyPayment = async (orderIdParam) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/process-payment?orderId=${orderIdParam}`
      );
      if (response.data?.payment_status === "SUCCESS") {
        // Retrieve pending order details saved earlier
        const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));
        if (pendingOrder) {
          // Add order info to Firestore
          await addDoc(collection(fireDB, "orders"), {
            ...pendingOrder,
            userId: user.uid,
            status: "completed",
            paymentId: response.data.cf_payment_id,
            paymentStatus: response.data.payment_status,
          });
          clearCart();
          localStorage.removeItem("pendingOrder");
          toast.success("Order placed successfully!");
          navigate("/order");
        } else {
          toast.error("Pending order details not found");
        }
      } else {
        toast.error("Payment verification failed");
        localStorage.removeItem("pendingOrder");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Payment verification failed. Please contact support.");
      localStorage.removeItem("pendingOrder");
    }
  };

  // On mount, check if URL contains payment status and order ID
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment_status");
    const orderIdParam = params.get("order_id");
    if (paymentStatus === "SUCCESS" && orderIdParam) {
      verifyPayment(orderIdParam);
    }
  }, []);

  // Handle checkout process
  const handleCheckout = async () => {
    if (isAddressEmpty()) {
      toast.error("Please add address to proceed further");
      setTimeout(() => {
        navigate("/edituserinfo");
      }, 100);
      return;
    }
    if (!cashfree) {
      toast.error("Payment SDK not initialized");
      return;
    }
    const sessionId = await createOrder();
    if (sessionId) {
      const checkoutOptions = {
        paymentSessionId: sessionId,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <p className="mb-2">Subtotal: ₹{totalAmount}</p>
        <p className="mb-2">
          Shipping: ₹{shipping} {shipping === 0 && "(Free)"}
        </p>
        <p className="mb-4">Grand Total: ₹{grandTotal}</p>
        <button
          onClick={handleCheckout}
          className="w-full bg-primary text-white py-2 rounded"
        >
          Proceed to Payment
        </button>
      </div>
    </Layout>
  );
}

export default Checkout;

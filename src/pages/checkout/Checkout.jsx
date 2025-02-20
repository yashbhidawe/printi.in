import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig";
import Layout from "../../components/layout/Layout";
import { serverTimestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { load } from "@cashfreepayments/cashfree-js";
import { query, where, getDocs } from "firebase/firestore";
import axios from "axios";

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Calculate order totals
  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + parseInt(item.price || 0) * parseInt(item.quantity || 1),
    0
  );
  const shipping = totalAmount > 1500 ? 0 : 100;
  const grandTotal = totalAmount + shipping;

  // Initialize Cashfree SDK
  useEffect(() => {
    load({ mode: "production" })
      .then((instance) => setCashfree(instance))
      .catch((error) => {
        console.error("Cashfree init error:", error);
        toast.error("Payment system initialization failed");
      });
  }, []);

  // Payment verification handler
  useEffect(() => {
    const verifyPaymentOnLoad = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("order_id");

      if (orderId && !isProcessing) {
        await verifyPayment(orderId);
      }
    };
    verifyPaymentOnLoad();
  }, []);

  // Validate user address information
  const validateAddress = () => {
    console.log(user ?? "No user found");
    if (!user) return false;
    const requiredFields = [
      "houseNumber",
      "streetName",
      "city",
      "state",
      "postalCode",
    ];
    return requiredFields.every((field) => Boolean(user[field]));
  };

  // Payment verification function

  const verifyPayment = async (orderId) => {
    try {
      setIsProcessing(true);
      const response = await axios.post(
        `https://printi-in.onrender.com/verify-payment?orderId=${orderId}`
      );

      if (response.data.success && response.data.payment_status === "SUCCESS") {
        const pendingOrder =
          JSON.parse(localStorage.getItem("pendingOrder")) || {};

        const ordersRef = collection(fireDB, "orders");
        const q = query(
          ordersRef,
          where("orderId", "==", pendingOrder.orderId)
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          console.warn("Order already exists, skipping duplicate entry.");
          return; // Prevent duplicate order addition
        }

        // ✅ If the order doesn't exist, proceed
        const orderInfo = {
          addressInfo: {
            name: user.displayName || "Customer",
            address: `${user.houseNumber || ""}, ${user.streetName || ""}, ${
              user.city || ""
            }, ${user.state || ""} - ${user.postalCode || ""}`,
            pincode: user.postalCode || "N/A",
            phoneNumber: user.phoneNumber || "N/A",
            date: new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          },
          cartItems: (pendingOrder.cartItems || []).map((item) => ({
            category: item.category || "General",
            date: item.date || new Date().toISOString(),
            description: item.description || "No description",
            id: item.id || crypto.randomUUID(),
            imageUrl: item.imageUrl || "",
            price: parseFloat(item.price || 0),
            quantity: parseInt(item.quantity || 1),
            title: item.title || "Untitled Item",
          })),
          time: serverTimestamp(),
          email: user.email || "N/A",
          orderId: pendingOrder.orderId || "N/A",
          paymentId: response.data.cf_payment_id || "N/A",
          status: "pending",
          userId: user.uid || "unknown",
        };

        // ✅ Save the order in Firestore
        await addDoc(collection(fireDB, "orders"), orderInfo);

        // ✅ Cleanup storage after order is successfully placed
        dispatch({ type: "CLEAR_CART" });
        localStorage.setItem("cart", "[]");
        localStorage.removeItem("pendingOrder");

        toast.success("Order placed successfully!");
        navigate("/order");
      }
    } catch (error) {
      console.error("Order processing error:", error);
      toast.error(error.response?.data?.error || "Order processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle checkout initiation
  const handleCheckout = async () => {
    if (!validateAddress()) {
      toast.error("Please complete your address information first");
      navigate("/edituserinfo");
      return;
    }

    try {
      setIsProcessing(true);

      // Create Cashfree order
      const response = await axios.post(
        "https://printi-in.onrender.com/create-order",
        {
          amount: grandTotal,
          customerName: user.displayName || "Customer",
          customerEmail: user.email,
          customerPhone: user.phoneNumber || "9999999999",
        }
      );

      // Store pending order locally
      const pendingOrder = {
        cartItems: cartItems.map((item) => ({
          ...item,
          price: parseFloat(item.price),
          quantity: parseInt(item.quantity),
        })),
        grandTotal,
        userId: user.uid,
        orderId: response.data.order_id,
      };

      localStorage.setItem("pendingOrder", JSON.stringify(pendingOrder));

      // Initialize Cashfree checkout
      await cashfree.checkout({
        paymentSessionId: response.data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(
        error.response?.data?.error || "Checkout initialization failed"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto mt-10 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>
              ₹{shipping} {shipping === 0 && "(Free)"}
            </span>
          </div>
          <div className="flex justify-between font-bold border-t pt-2">
            <span>Grand Total:</span>
            <span>₹{grandTotal}</span>
          </div>
        </div>

        <button
          onClick={handleCheckout}
          disabled={!cashfree || isProcessing}
          className={`w-full py-2 rounded-md text-white transition-colors ${
            isProcessing || !cashfree
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-primary-dark"
          }`}
        >
          {isProcessing ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </Layout>
  );
}

export default Checkout;

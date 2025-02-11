// src/utils/paymentUtils.js
import axios from "axios";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../firebase/FirebaseConfig";
import { toast } from "react-toastify";

export const verifyPayment = async (orderId, user, navigate) => {
  try {
    const response = await axios.post("http://localhost:5000/verify", {
      orderId,
    });

    if (response.data?.payment_status === "SUCCESS") {
      const pendingOrder = JSON.parse(localStorage.getItem("pendingOrder"));

      if (pendingOrder) {
        try {
          await addDoc(collection(fireDB, "orders"), {
            ...pendingOrder,
            userId: user.uid,
            status: "completed",
            paymentId: response.data.cf_payment_id,
            paymentStatus: response.data.payment_status,
          });

          // Clear cart and pending order
          localStorage.removeItem("cart");
          localStorage.removeItem("pendingOrder");

          toast.success("Order placed successfully!");
          navigate("/order");
        } catch (error) {
          console.error("Error saving order:", error);
          toast.error("Error saving order details");
        }
      }
    } else {
      toast.error("Payment verification failed");
      localStorage.removeItem("pendingOrder");
    }
  } catch (error) {
    console.error("Verification error:", error);
    toast.error("Payment verification failed");
    localStorage.removeItem("pendingOrder");
  }
};

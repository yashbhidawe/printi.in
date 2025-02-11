import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/layout/Layout";

const OrderStatus = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to parse query parameters
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      paymentStatus: params.get("payment_status"),
      cfPaymentId: params.get("cf_payment_id"),
      orderId: params.get("order_id"),
    };
  };

  useEffect(() => {
    const { paymentStatus, cfPaymentId, orderId } = getQueryParams();
    if (paymentStatus === "SUCCESS" && cfPaymentId && orderId) {
      // Immediately call your backend verify endpoint
      axios
        .post("http://localhost:5000/verify", { orderId })
        .then((response) => {
          if (response.data?.payment_status === "SUCCESS") {
            toast.success("Payment verified successfully!");
            // Optionally clear the cart and update Firestore (if not already handled)
            // For example:
            // clearCart(); navigate("/order");

            navigate("/order"); // Navigate to the order summary page
          } else {
            toast.error("Payment verification failed");
          }
        })
        .catch((error) => {
          console.error("Verification error:", error);
          toast.error("Payment verification failed. Please contact support.");
        });
    } else {
      // If parameters are missing or not successful, you can show an error message or redirect
      toast.error("Invalid payment status or missing details");
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Verifying Payment...</h2>
      </div>
    </Layout>
  );
};

export default OrderStatus;

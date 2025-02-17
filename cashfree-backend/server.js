import express from "express";
import { Cashfree } from "cashfree-pg";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// Initialize Cashfree
Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;

// Create order endpoint
app.post("/create-order", async (req, res) => {
  try {
    const { amount, customerName, customerEmail, customerPhone } = req.body;

    // Validate input
    if (!amount || !customerEmail) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const orderId = crypto.randomBytes(12).toString("hex");
    const customerId = crypto.randomBytes(6).toString("hex");

    const orderData = {
      order_amount: parseFloat(amount),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_name: customerName || "Customer",
        customer_email: customerEmail,
        customer_phone: customerPhone || "9999999999",
      },
      order_meta: {
        return_url: `https://printi.in/checkout?order_id=${orderId}`,
        payment_methods: "cc,dc,upi",
      },
    };

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderData);

    res.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: orderId,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      error: "Order creation failed",
      details: error.response?.data || error.message,
    });
  }
});

// Verify payment endpoint
app.post("/verify-payment", async (req, res) => {
  try {
    const { orderId } = req.query;

    if (!orderId) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    const paymentDetails = await Cashfree.PGOrderFetchPayments(
      "2023-08-01",
      orderId
    );
    const payments = paymentDetails.data || [];

    if (payments.length === 0) {
      return res.status(404).json({ error: "No payments found" });
    }

    const latestPayment = payments[0];
    const paymentStatus = latestPayment.payment_status;

    res.json({
      success: paymentStatus === "SUCCESS",
      payment_status: paymentStatus,
      cf_payment_id: latestPayment.cf_payment_id,
      order_amount: latestPayment.order_amount,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      error: "Payment verification failed",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

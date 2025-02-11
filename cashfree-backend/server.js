import express from "express";
import { Cashfree } from "cashfree-pg";
import cors from "cors";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Debug logging for incoming requests
app.use((req, res, next) => {
  console.log(`Incoming ${req.method} request on ${req.path}`);
  next();
});

// Initialize Cashfree credentials
try {
  Cashfree.XClientId = process.env.CLIENT_ID;
  Cashfree.XClientSecret = process.env.CLIENT_SECRET;
  Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
  console.log("Cashfree initialized with Client ID:", process.env.CLIENT_ID);
} catch (error) {
  console.error("Cashfree initialization error:", error);
}

/**
 * Single endpoint for creating an order (if no orderId query parameter)
 * or verifying a payment (if orderId is provided in query params).
 */
app.post("/process-payment", async (req, res) => {
  // If an orderId is passed as a query parameter, verify the payment
  if (req.query.orderId) {
    const orderId = req.query.orderId;
    console.log("Verifying payment for orderId:", orderId);
    try {
      const response = await Cashfree.PGOrderFetchPayment(
        "2023-08-01",
        orderId
      );
      console.log("Verification response:", response.data);
      if (response.data.payment_status === "SUCCESS") {
        res.json({
          success: true,
          payment_status: "SUCCESS",
          data: response.data,
        });
      } else {
        res.json({
          success: false,
          payment_status: response.data.payment_status || "PENDING",
        });
      }
    } catch (error) {
      console.error(
        "Verification error:",
        error.response?.data || error.message
      );
      res.status(500).json({
        success: false,
        error: "Payment verification failed",
        details: error.response?.data || error.message,
      });
    }
    return;
  }

  // Otherwise, create a new Cashfree order
  try {
    console.log("Received order creation request with body:", req.body);
    const { amount, customerName, customerEmail, customerPhone } = req.body;
    if (!amount || !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate an orderId
    const orderId = crypto.randomBytes(16).toString("hex").substring(0, 12);
    console.log("Generated orderId:", orderId);

    const requestPayload = {
      order_amount: parseFloat(amount),
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: crypto.randomBytes(8).toString("hex"),
        customer_phone: customerPhone,
        customer_name: customerName,
        customer_email: customerEmail,
      },
      order_meta: {
        return_url: "http://localhost:5173/checkout", // Your client return URL
        payment_methods: "cc,dc,upi",
      },
    };

    console.log("Sending request to Cashfree:", requestPayload);
    const response = await Cashfree.PGCreateOrder("2023-08-01", requestPayload);
    console.log("Cashfree response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error creating Cashfree order:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to create order",
      details: error.response?.data || error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

import React from "react";
import Layout from "../../components/layout/Layout";

const ShippingDeliveryPolicy = () => {
  return (
    <Layout>
      {" "}
      <div className="max-w-xl mx-auto p-4 bg-white">
        <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
          Shipping & Delivery Policy
        </h1>

        <div className="bg-gray-100 p-3 rounded-lg mb-3">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Delivery Details
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Delivery: 5-7 business days</li>
            <li>Coverage: Nationwide</li>
            <li>Tracking: Email notification</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg mb-3">
          <h2 className="text-lg font-semibold mb-2 text-gray-700">
            Shipping Conditions
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Delivery to registered address</li>
            <li>Signature required</li>
            <li>No weekend/holiday delivery</li>
          </ul>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          © 2025 Image Galaxy
        </div>
      </div>
    </Layout>
  );
};

export default ShippingDeliveryPolicy;

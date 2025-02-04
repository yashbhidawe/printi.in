import Layout from "../../components/layout/Layout";

const CancellationPolicy = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Cancellation & Refund Policy
        </h1>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Product Cancellation Policy
          </h2>
          <p className="text-gray-600 mb-3">
            Image Galaxy {"the Company"} for Printi.in hereby declares that:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              No cancellations will be accepted once an order is confirmed and
              processed.
            </li>
            <li>
              No refunds will be issued under any circumstances for products
              ordered through Printi.in.
            </li>
          </ul>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">
            Customer Support
          </h2>
          <p className="text-gray-600">
            For any additional inquiries or clarifications regarding this
            policy, please contact our customer support team through the Contact
            Us page on our website.
          </p>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          © 2024 Image Galaxy. All Rights Reserved.
        </div>
      </div>
    </Layout>
  );
};

export default CancellationPolicy;

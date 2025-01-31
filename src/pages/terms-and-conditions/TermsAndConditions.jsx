import React from "react";
import Layout from "../../components/layout/Layout.jsx";

const TermsAndConditions = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to Printi.in! By accessing and using our website, you agree to
          comply with the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          1. General
        </h2>
        <p className="text-gray-700">
          These Terms govern your use of our website and services. We reserve
          the right to modify these terms at any time.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          2. User Responsibilities
        </h2>
        <p className="text-gray-700">
          - You must be at least 18 years old or have parental permission to use
          our services. <br />- You agree not to misuse our platform or engage
          in any fraudulent activities.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          3. Payments & Orders
        </h2>
        <p className="text-gray-700">
          - All payments must be completed before order processing. <br />-
          Custom products cannot be canceled or refunded after confirmation.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          4. Intellectual Property
        </h2>
        <p className="text-gray-700">
          All content, images, and designs on PrintIt.in are owned by us or our
          licensors. Unauthorized use is prohibited.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          5. Limitation of Liability
        </h2>
        <p className="text-gray-700">
          We are not liable for any indirect or incidental damages arising from
          the use of our platform.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          6. Contact Information
        </h2>
        <p className="text-gray-700">
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:support@printit.in"
            className="text-primary hover:underline"
          >
            imagegalaxy001@gmail.com{" "}
          </a>
          .
        </p>

        <p className="text-gray-600 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </Layout>
  );
};

export default TermsAndConditions;

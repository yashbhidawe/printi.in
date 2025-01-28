import React from "react";
import Layout from "../../components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            Welcome to <strong>Printi.in</strong>! Your privacy is important to
            us. This Privacy Policy outlines how we collect, use, and safeguard
            your information.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-600 mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Personal information like name, email, and phone number.</li>
            <li>Payment details for transactions.</li>
            <li>Usage data for improving our services.</li>
          </ul>

          {/* Section 2 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-600 mb-4">The data collected is used for:</p>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            <li>Processing orders and transactions.</li>
            <li>Improving our website and user experience.</li>
            <li>Communicating with you about updates or inquiries.</li>
          </ul>

          {/* Section 3 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            3. Data Sharing and Security
          </h2>
          <p className="text-gray-600 mb-6">
            Your data is not shared with third parties unless necessary for
            services or legal obligations. We use industry-standard security
            measures to protect your data.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            4. Your Rights
          </h2>
          <p className="text-gray-600 mb-6">
            You have the right to access, update, or delete your personal
            information. You can also opt-out of marketing communications.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            5. Updates to This Policy
          </h2>
          <p className="text-gray-600 mb-6">
            This Privacy Policy may be updated from time to time. Any changes
            will be posted on this page.
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            6. Contact Us
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <div className="text-gray-600 font-medium">
            <p>
              Email:{" "}
              <a
                href="mailto:support@printi.in"
                className="text-primary hover:underline"
              >
                support@printi.in
              </a>
            </p>
            <p>Phone: +91-80078-00493</p>
            <p>Address: 123 Business Street, City, Country</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;

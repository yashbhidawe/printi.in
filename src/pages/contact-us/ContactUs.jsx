import React, { useState } from "react";
import Layout from "../../components/layout/Layout";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Message Sent Successfully!");
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            Contact Us
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Have a question or need assistance? Feel free to reach out.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md font-semibold hover:bg-primaryLight transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">Email: imagegalaxy001@gmail.com</p>
            <p className="text-gray-600">Phone: +91 8007800493</p>
            <p className="text-gray-600">
              Address: e no 22 gh no 34 ji a pa pacharne, tinhewadi goanthan
              road, po o khed, sandbhorwadi(exptl), pune, pacharnewadi,
              maharashtra, india, 410505
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;

import React from "react";
import Layout from "../../components/layout/Layout.jsx";

const AboutUs = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-r from-blue-100 to-blue-200">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">About Us</h1>
        <div className="max-w-4xl text-center bg-white shadow-lg rounded-lg p-8">
          <p className="text-lg text-gray-800 leading-relaxed">
            Welcome to printi.in! We are dedicated to providing high-quality
            customized products that add a personal touch to your everyday life.
            At printi.in, our mission is to empower you with the ability to
            express yourself through personalized items that capture your unique
            style and creativity. We believe that every item you create should
            be a reflection of who you are—whether it's a custom mug for your
            office, a personalized t-shirt, or a beautifully designed notebook.
            Our team of passionate designers and state-of-the-art printing
            technology ensures that each product meets the highest standards of
            quality and durability. From initial concept to final creation, we
            are committed to delivering products that you will love and cherish
            for years to come. Thank you for choosing printi.in as your go-to
            destination for all your personalized product needs.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;

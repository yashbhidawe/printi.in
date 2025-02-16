import React from "react";
import {
  FaPrint,
  FaFlag,
  FaIdCard,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const ServiceCard = ({ icon: Icon, title, description, link }) => (
  <Link
    to={link}
    className="group relative p-6 rounded-xl bg-white hover:bg-bgLight border border-bgSecondary 
    transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
  >
    <div className="flex items-start gap-4">
      <div
        className="p-3 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-textLight 
        transition-all duration-300"
      >
        <Icon className="text-xl" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-textDark group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="mt-2 text-sm text-textDark/70">{description}</p>
      </div>
      <FaArrowRight className="text-primary/30 group-hover:text-primary transition-colors duration-300" />
    </div>
  </Link>
);

export default function Hero() {
  const services = [
    {
      icon: FaIdCard,
      title: "Business Cards",
      description: "Premium business cards that leave lasting impressions",
      link: "/category/business-cards",
    },
    {
      icon: FaFlag,
      title: "Banners & Signs",
      description: "Eye-catching displays that command attention",
      link: "/category/banners",
    },
    {
      icon: FaPrint,
      title: "Marketing Materials",
      description: "High-quality prints for your marketing needs",
      link: "/category/flyers",
    },
    {
      icon: FaImage,
      title: "ID Cards",
      description: "Professional identification solutions",
      link: "/category/id-cards",
    },
  ];

  return (
    <div className="relative bg-gradient-to-b from-bgLight via-white to-bgLight">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/5 text-primary mb-6">
            <FaPrint className="mr-2" />
            <span className="text-sm font-medium">
              Premium Printing Services
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Transform Your Ideas Into
            <span className="block text-accent mt-2">Print Reality</span>
          </h1>

          <p className="text-lg text-textDark/70 max-w-2xl mx-auto mb-8">
            Experience premium quality printing services tailored to your
            business needs. From business cards to large formats, we've got you
            covered.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/allproducts">
              <button
                className="px-8 py-4 rounded-lg bg-primary hover:bg-primaryLight text-textLight 
                font-medium flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary/20"
              >
                Start Shopping
                <FaArrowRight />
              </button>
            </Link>
          </div>
        </div>

        {/* Services Grid   <div className="grid md:grid-cols-2 gap-6 mt-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>*/}

        {/* Bottom Feature <div className="mt-12 p-6 rounded-xl bg-primary/5 border border-primary/10 text-center">
          <p className="text-primary font-medium">
            🎉 New Customer Special: Get 15% off your first order with code{" "}
            <span className="text-accent font-bold">WELCOME15</span>
          </p>
        </div> */}
      </div>
    </div>
  );
}

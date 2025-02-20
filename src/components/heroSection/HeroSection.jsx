import React from "react";
import { Link } from "react-router-dom";
import { FaPrint, FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-[#2d016a] ">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2d016a] via-[#491d87] to-[#380e72] opacity-80" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#f1a10a] blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#2d016a] blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-white mb-4">
            <FaPrint className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">
              Premium Printing Services
            </span>
          </div>
        </div>

        {/* Hero Text */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Transform Your Ideas Into{" "}
            <span className="text-[#f1a10a]">Print Reality</span>
          </h1>
          <p className="text-lg text-white/80 mb-6 max-w-2xl mx-auto">
            Experience premium quality printing services tailored to your
            business needs. From business cards to large formats, we've got you
            covered.
          </p>

          <div className="flex justify-center gap-4">
            <Link to="/allproducts">
              <button
                className="inline-flex items-center px-6 py-3 rounded-lg bg-[#f1a10a] text-white 
                hover:bg-[#f1a10a]/90 transition-colors duration-300 font-medium shadow-lg shadow-black/20"
              >
                Start Shopping
                <FaArrowRight className="ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

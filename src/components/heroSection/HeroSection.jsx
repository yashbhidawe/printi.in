import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-[#2d016a] via-[#5c01f9] to-primary text-textLight min-h-screen flex items-center justify-center animated-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-extrabold mb-6">
          Your Printing, <span className="text-accent">Our Passion</span>
        </h1>
        <p className="text-bgLight text-lg mb-8">
          Create custom prints effortlessly with fast delivery and premium
          quality.
        </p>
      </div>

      {/* Floating WhatsApp Icon */}
    </section>
  );
}

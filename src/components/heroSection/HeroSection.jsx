import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPrint, FaFlag, FaIdCard, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Hero() {
  const [activeItem, setActiveItem] = useState(null);

  const printOptions = [
    {
      name: "Business Cards",
      icon: FaIdCard,
      description: "Professional and stylish business cards",
      link: "/category/business-cards", // Add link to category
    },
    {
      name: "Banners",
      icon: FaFlag, // Changed from FaBanner to FaFlag
      description: "Large format prints for maximum impact",
      link: "/category/banners", // Add link to category
    },
    {
      name: "Flyers",
      icon: FaPrint,
      description: "Eye-catching marketing materials",
      link: "/category/flyers", // Add link to category
    },
    {
      name: "Custom Prints",
      icon: FaImage,
      description: "Unique designs tailored to your needs",
      link: "/category/custom-prints", // Add link to category
    },
  ];

  return (
    <section className="relative bg-gradient-to-br from-[#2d016a] via-[#5c01f9] to-primary text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#2d016a]/20 to-primary/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Print Your Vision,
            <span className="block text-accent mt-2">Bring Ideas to Life</span>
          </h1>

          <p className="text-lg text-white/80 max-w-xl">
            Transform your creative concepts into high-quality printed materials
            with our professional printing services.
          </p>

          <Link to={"/customization"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full 
            font-semibold shadow-lg transition-all flex items-center gap-2 mt-4"
            >
              <FaPrint />
              Start Your Print Project
            </motion.button>
          </Link>
        </motion.div>

        {/* Print Options Grid */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 gap-6"
        >
          {printOptions.map((option, index) => (
            <Link to={option.link} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setActiveItem(index)}
                onHoverEnd={() => setActiveItem(null)}
                className={`
                  p-6 rounded-xl backdrop-blur-sm border-2 
                  transition-all duration-300 cursor-pointer
                  ${
                    activeItem === index
                      ? "bg-white/20 border-accent/50"
                      : "bg-white/10 border-white/10"
                  }
                `}
              >
                <div className="flex items-center gap-4 mb-4">
                  <option.icon
                    className={`text-3xl ${
                      activeItem === index ? "text-accent" : "text-white/70"
                    }`}
                  />
                  <h3 className="font-semibold text-lg">{option.name}</h3>
                </div>
                {activeItem === index && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-white/80"
                  >
                    {option.description}
                  </motion.p>
                )}
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

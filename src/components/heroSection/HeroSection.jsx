import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPrint, FaFlag, FaIdCard, FaImage } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Hero() {
  const [activeItem, setActiveItem] = useState(null);

  const printOptions = [
    {
      name: "Business Cards",
      icon: FaIdCard,
      description:
        "Professional and stylish business cards for lasting impressions",
      link: "/category/business-cards",
    },
    {
      name: "Banners",
      icon: FaFlag,
      description: "Eye-catching large format prints for maximum visibility",
      link: "/category/banners",
    },
    {
      name: "Flyers",
      icon: FaPrint,
      description: "High-quality marketing materials that get noticed",
      link: "/category/flyers",
    },
    {
      name: "ID Cards",
      icon: FaImage,
      description: "Classic and timeless designs of ID cards",
      link: "/category/id-cards",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative bg-gradient-to-br from-[#2d016a] via-[#5c01f9] to-primary min-h-screen flex items-center text-white overflow-hidden">
      {/* Enhanced background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2d016a]/20 to-primary/20 blur-3xl animate-pulse" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content with enhanced animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Print Your Vision,
              <span className="block text-accent mt-2 bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/80">
                Bring Ideas to Life
              </span>
            </h1>

            <p className="text-base sm:text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
              Transform your creative concepts into stunning, high-quality
              printed materials with our professional printing services and
              expert craftsmanship.
            </p>

            <Link to="/customization" className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent hover:bg-accent/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full 
                font-semibold shadow-lg transition-all flex items-center gap-2 mx-auto lg:mx-0"
              >
                <FaPrint className="text-lg" />
                <span>Start Your Print Project</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Print Options Grid with enhanced animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {printOptions.map((option, index) => (
              <Link to={option.link} key={index} className="block">
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  onHoverStart={() => setActiveItem(index)}
                  onHoverEnd={() => setActiveItem(null)}
                  className={`
                    p-4 sm:p-6 rounded-xl backdrop-blur-sm border-2 
                    transition-all duration-300 cursor-pointer h-full
                    hover:shadow-xl hover:shadow-accent/10
                    ${
                      activeItem === index
                        ? "bg-white/20 border-accent/50"
                        : "bg-white/10 border-white/10 hover:border-white/30"
                    }
                  `}
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <option.icon
                      className={`text-2xl sm:text-3xl transition-colors duration-300
                        ${
                          activeItem === index ? "text-accent" : "text-white/70"
                        }
                      `}
                    />
                    <h3 className="font-semibold text-base sm:text-lg">
                      {option.name}
                    </h3>
                  </div>
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeItem === index ? 1 : 0,
                      height: activeItem === index ? "auto" : 0,
                    }}
                    className="text-sm text-white/80 overflow-hidden"
                  >
                    {option.description}
                  </motion.p>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

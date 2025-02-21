import React, { useState, useEffect } from "react";
import advertisment from "../../assets/advertisment.jpg";

const FloatingAd = () => {
  const [isVisible, setIsVisible] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center justify-center">
      <div className="w-80 h-96 rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-full">
          {/* Ad Content */}
          <div className="bg-white p-4 h-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-primary font-bold">
                {user
                  ? `Special offer for you, ${user.displayName}!`
                  : "Exclusive offer for Printi's beloved customer!"}
              </h3>
              <button
                onClick={handleClose}
                className="text-primary rounded-full w-6 h-6 flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col flex-grow">
              <img
                src={advertisment}
                alt="Advertisement"
                className="rounded mb-3 object-cover"
              />
              <p className="text-primary text-sm mb-3">
                Chance to buy the premium quality products at printi.in for a
                lower price. Limited time offer!
              </p>
              <button className="bg-primary text-[#ffffff] py-2 px-4 rounded mt-auto hover:bg-opacity-90 transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          {/* Progress bar to show time remaining */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#e3d9f1]">
            <div
              className="h-full bg-[#f1a10a] animate-shrink"
              style={{
                animationDuration: "15s",
                animationTimingFunction: "linear",
                animationFillMode: "forwards",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAd;

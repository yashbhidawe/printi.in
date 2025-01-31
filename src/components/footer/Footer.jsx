import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-primary py-10">
      <div className="container mx-auto px-6 text-white">
        <div className="flex flex-wrap justify-between items-start space-y-8 md:space-y-0">
          {/* Left Section: Logo, Navigation Links */}
          <div className="flex flex-col md:w-1/3 space-y-4">
            <div className="text-3xl font-semibold">
              <span className="text-accent">printi</span>
            </div>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="hover:text-accent">
                Home
              </Link>
              <Link to="/allproducts" className="hover:text-accent">
                Products
              </Link>
              <Link to="/about-us" className="hover:text-accent">
                About Us
              </Link>
              <Link to="/contact-us">Contact</Link>
            </div>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="flex flex-col md:w-1/3 space-y-4">
            <div className="text-lg font-semibold">Quick Links</div>
            <div className="flex flex-col space-y-2">
              <Link to="/faq" className="hover:text-accent">
                FAQ
              </Link>
              <Link to="/shipping" className="hover:text-accent">
                Shipping
              </Link>
              <Link to="/privacy" className="hover:text-accent">
                Privacy Policy
              </Link>
              <Link to="/blog" className="hover:text-accent">
                Blog
              </Link>
              <Link to="/careers" className="hover:text-accent">
                Careers
              </Link>
              <Link to="/terms-and-conditions" className="hover:text-accent">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Right Section: Customer Support */}
          <div className="flex flex-col md:w-1/3 space-y-4">
            <div className="text-lg font-semibold">Customer Support</div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">For inquiries, please reach us at:</p>
              <a
                href="mailto:support@instaprints.com"
                className="hover:text-accent"
              >
                imagegalaxy001@gmail.com
              </a>
              <p className="text-sm">Call us at:</p>
              <p className="hover:text-accent">+918007800493</p>
            </div>
          </div>
        </div>

        {/* Email Signup Section */}
        <div className="mt-12 flex justify-center">
          <div className="bg-bgSecondary p-8 rounded-lg shadow-md text-center w-full md:w-1/2">
            <h2 className="text-xl font-semibold mb-4 text-textDark">
              Stay Updated with printi.in
            </h2>
            <p className="text-sm mb-4 text-textDark">
              Subscribe to our newsletter for the latest products, offers, and
              news.
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-md w-full text-gray-900 border border-gray-300 focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-white font-semibold py-2 px-6 rounded-md hover:bg-primary hover:transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media and Copyright Section */}
        <div className="mt-8 text-center text-sm text-gray-300">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-accent">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-accent">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-accent">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-accent">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-accent">printi.in</span> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

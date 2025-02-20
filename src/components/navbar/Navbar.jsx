import React, { Fragment, useContext, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, Navigate } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import SearchAndDisplay from "../search/SearchAndDisplay";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [showLoginTooltip, setShowLoginTooltip] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const cartItems = useSelector((state) => state.cart);

  const logOut = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  // Handle showing the login reminder tooltip
  useEffect(() => {
    // Only show tooltip if user is not logged in
    if (!user) {
      // Show tooltip after 15 seconds
      const showTimer = setTimeout(() => {
        setShowLoginTooltip(true);

        // Auto-hide tooltip after 10 seconds
        const hideTimer = setTimeout(() => {
          setShowLoginTooltip(false);
        }, 10000);

        return () => clearTimeout(hideTimer);
      }, 15000);

      return () => clearTimeout(showTimer);
    }
  }, [user]);

  // Function to dismiss tooltip on user interaction
  const dismissTooltip = () => {
    setShowLoginTooltip(false);
  };

  // Add click listener to document to dismiss tooltip on any click
  useEffect(() => {
    if (showLoginTooltip) {
      document.addEventListener("click", dismissTooltip);
      document.addEventListener("keydown", dismissTooltip);

      return () => {
        document.removeEventListener("click", dismissTooltip);
        document.removeEventListener("keydown", dismissTooltip);
      };
    }
  }, [showLoginTooltip]);

  return (
    <div className="bg-white sticky top-0 z-50">
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to={"/"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Home
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to={"/categories"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Category
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to={"/allproducts"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Product
                    </Link>
                  </div>
                  {user && (
                    <>
                      <div className="flow-root">
                        <Link
                          to={"/order"}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Order
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to={"/wishlist"}
                          className="-m-2 block p-2 font-medium text-gray-900"
                        >
                          Wishlist
                        </Link>
                      </div>
                    </>
                  )}

                  {user?.role === "admin" && (
                    <div className="flow-root">
                      <Link
                        to={"/dashboard"}
                        className="text-sm font-medium text-gray-700"
                      >
                        Admin
                      </Link>
                    </div>
                  )}

                  {user && (
                    <Link to="/userinfo">
                      <div>
                        <img
                          src={
                            user.photoURL ||
                            "data:image/jpeg;base64,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"
                          }
                          className="w-12 h-12 rounded-full hover:cursor-pointer"
                          alt="User avatar"
                        />
                      </div>
                    </Link>
                  )}

                  <div className="flow-root">
                    <a
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                      onClick={logOut}
                    >
                      {user ? "Logout" : "Login"}
                    </a>
                  </div>

                  <div>
                    <Link to="/customization">
                      <div className="px-6 py-3 text-white font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out text-center uppercase tracking-wide">
                        Customize your order
                      </div>
                    </Link>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl"
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex">
                    <h1
                      className={`text-2xl font-bold px-2 py-1 rounded ${"text-primary"}`}
                    >
                      printi
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex gap-5 items-center">
                <div className="hidden md:flex">
                  <Link to="/customization">
                    <div className="px-6 py-3 text-white font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out text-center uppercase tracking-wide">
                      Customize your order
                    </div>
                  </Link>
                </div>

                <div className="">
                  <SearchAndDisplay />
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link to={"/"} className="text-sm font-medium text-gray-700">
                    Home
                  </Link>
                  <Link
                    to={"/categories"}
                    className="text-sm font-medium text-gray-700"
                  >
                    Category
                  </Link>
                  <Link
                    to={"/allproducts"}
                    className="text-sm font-medium text-gray-700"
                  >
                    Products
                  </Link>

                  {user && (
                    <>
                      <Link
                        to={"/order"}
                        className="text-sm font-medium text-gray-700"
                      >
                        Order
                      </Link>
                      <Link
                        to={"/wishlist"}
                        className="text-sm font-medium text-gray-700"
                      >
                        Wishlist
                      </Link>
                    </>
                  )}

                  {user?.role === "admin" && (
                    <Link
                      to={"/dashboard"}
                      className="text-sm font-medium text-gray-700"
                    >
                      Admin
                    </Link>
                  )}

                  {user && (
                    <Link to="/userinfo">
                      <div>
                        <img
                          src={
                            user.photoURL ||
                            "data:image/jpeg;base64,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"
                          }
                          alt="User avatar"
                          className="w-8 h-8 rounded-full hover:cursor-pointer"
                        />
                      </div>
                    </Link>
                  )}

                  <a
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                    onClick={logOut}
                  >
                    {user ? "Logout" : "Login"}
                  </a>
                </div>

                {/* Cart */}
                {user && (
                  <div className="ml-4 flow-root lg:ml-6">
                    <Link
                      to={"/cart"}
                      className="group -m-2 flex items-center p-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                      <span className="ml-2 text-sm font-medium text-gray-700 group-">
                        {cartItems.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Login Reminder Tooltip */}
      {showLoginTooltip && !user && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-4 rounded-lg shadow-xl max-w-xs animate-fadeIn">
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-200"
            onClick={(e) => {
              e.stopPropagation();
              dismissTooltip();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <h3 className="font-bold text-lg mb-2">Welcome to Printi!</h3>
          <p className="mb-4">
            Log in to access personalized features like orders, wishlist, and
            customization.
          </p>
          <Link to="/login">
            <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 w-full">
              Log In Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Add CSS for animation
const style = document.createElement("style");
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Navbar;

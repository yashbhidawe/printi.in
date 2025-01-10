import React, { Fragment, useContext, useState } from "react";
import MyContext from "../../context/data/myContext";
import { Dialog, Transition } from "@headlessui/react";
import { Link, Navigate } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { BsFillCloudSunFill } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import SearchBar from "../search/SearchBar";
function Navbar() {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const logOut = () => {
    localStorage.clear("user");
    window.location.href = "/login";
  };

  const cartItems = useSelector((state) => state.cart);
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
                  <Link
                    to={"/allproducts"}
                    className="text-sm font-medium text-gray-900 "
                  >
                    All Products
                  </Link>
                  <div className="flow-root">
                    <Link
                      to={"/order"}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Order
                    </Link>
                  </div>

                  <div className="flow-root">
                    {user?.role === "admin" ? (
                      <Link
                        to={"/dashboard"}
                        className="text-sm font-medium text-gray-700 "
                      >
                        Admin
                      </Link>
                    ) : (
                      ""
                    )}
                  </div>
                  <Link to="/userinfo">
                    <div>
                      <img
                        src={user?.photoURL}
                        className="w-12 h-12 rounded-full hover:cursor-pointer"
                      />
                    </div>
                  </Link>
                  <div className="flow-root">
                    <a
                      className="-m-2 block p-2 font-medium text-gray-900 cursor-pointer"
                      onClick={logOut}
                    >
                      Logout
                    </a>
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
          className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl  "
        >
          <div className="">
            <div className="flex h-16 items-center ">
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
              <div className="ml-4 flex  lg:ml-0">
                <Link to={"/"} className="flex">
                  <div className="flex ">
                    <h1
                      className={`text-2xl font-bold px-2 py-1 rounded ${"text-primary"}`}
                    >
                      printi
                    </h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex gap-5 items-center">
                <div className="">
                  <SearchBar />
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link
                    to={"/allproducts"}
                    className="text-sm font-medium text-gray-700 "
                  >
                    All Products
                  </Link>
                  <Link
                    to={"/order"}
                    className="text-sm font-medium text-gray-700 "
                  >
                    Order
                  </Link>

                  {user?.role === "admin" ? (
                    <Link
                      to={"/dashboard"}
                      className="text-sm font-medium text-gray-700 "
                    >
                      Admin
                    </Link>
                  ) : (
                    ""
                  )}
                  <Link to="/userinfo">
                    <div>
                      <img
                        src={user?.photoURL}
                        className="w-8 h-8 rounded-full hover:cursor-pointer"
                      />
                    </div>
                  </Link>
                  <a
                    className="text-sm font-medium text-gray-700 cursor-pointer  "
                    onClick={logOut}
                  >
                    Logout
                  </a>
                </div>

                {/* Search */}

                {/* Cart */}
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
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;

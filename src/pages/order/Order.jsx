import React, { useContext } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/data/myContext";
import Loader from "../../components/loader/Loader";
import { FaBoxOpen } from "react-icons/fa"; // Add this import for the icon

function Order() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user ? user.uid : null;
  const context = useContext(MyContext);
  const { order } = context;

  if (!userid) {
    return (
      <Layout>
        <h2 className="text-center text-2xl text-red-500">User not found</h2>
      </Layout>
    );
  }

  const filteredOrders = order.filter((obj) => obj.userid === userid);

  return (
    <Layout>
      {filteredOrders.length > 0 ? (
        <div className="h-full pt-10">
          {filteredOrders.map((order, orderIndex) => (
            <div
              key={orderIndex}
              className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0"
            >
              {order.cartItems.map((item, itemIndex) => (
                <div key={itemIndex} className="rounded-lg md:w-2/3">
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={item.imageUrl}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item.title}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-700">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen ">
          <FaBoxOpen className="text-primary mb-4 text-6xl" />
          <h2 className="text-2xl font-bold text-gray-700">No Orders Yet</h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven't placed any orders yet.
          </p>
          <button
            type="button"
            className="mt-6 bg-primary hover:bg-primaryLight text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-4 focus:ring-primaryLight"
            onClick={() => (window.location.href = "/")}
          >
            Start Shopping
          </button>
        </div>
      )}
    </Layout>
  );
}

export default Order;

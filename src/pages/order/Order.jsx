import React, { useContext } from "react";
import Layout from "../../components/layout/Layout.jsx";
import MyContext from "../../context/data/MyContext.jsx";
import { FaBoxOpen, FaShoppingCart } from "react-icons/fa"; // Combining imports

function Order() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user ? user.uid : null;
  const context = useContext(MyContext);
  const { order } = context;

  if (!userid) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <FaShoppingCart className="text-red-500 mb-4 text-6xl" />
          <h2 className="text-center text-2xl text-red-500">User not found</h2>
        </div>
      </Layout>
    );
  }

  const filteredOrders = order.filter((obj) => obj.userid === userid);

  return (
    <Layout>
      {filteredOrders.length > 0 ? (
        <div className="h-full pt-10 bg-gray-50">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-center text-primary mb-6">
              My Orders
            </h1>
            {filteredOrders.map((order, orderIndex) => (
              <div
                key={orderIndex}
                className="mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-6 mb-8"
              >
                <div className="text-gray-500 mb-4 text-sm font-medium">
                  Order Date:{" "}
                  <span className="font-semibold">{order.date}</span>
                </div>
                {order.cartItems.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="rounded-lg border border-gray-200 bg-gray-100 p-4 mb-4 shadow-sm transition-transform transform hover:scale-105"
                  >
                    <div className="sm:flex sm:items-start">
                      <img
                        src={item.imageUrl}
                        alt="product"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-6 mt-4 sm:mt-0 flex flex-col justify-between w-full">
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-2">
                            {item.title}
                          </h2>
                          <p className="text-sm text-gray-700">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <p className="text-lg font-semibold text-primary">
                            ₹{item.price}
                          </p>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">Quantity:</p>
                            <p className="text-sm font-bold text-gray-900">
                              {item.quantity}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Status:
                            </p>
                            <p className="text-sm font-bold text-green-600">
                              {order.status}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <FaBoxOpen className="text-primary mb-4 text-6xl" />
          <h2 className="text-2xl font-bold text-gray-700">No Orders Yet</h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven't placed any orders yet.
          </p>
          <button
            type="button"
            className="mt-6 bg-primary hover:bg-primaryLight text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-primaryLight shadow-lg"
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

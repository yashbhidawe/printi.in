import React, { useContext, useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import MyContext from "../../context/data/MyContext.jsx";
import {
  ShoppingBag,
  Package,
  Clock,
  CheckCircle,
  Truck,
  Home,
  Search,
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
} from "lucide-react";

function Order() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userid = user ? user.uid : null;
  const context = useContext(MyContext);
  const { order } = context;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedOrders, setExpandedOrders] = useState({});

  const addressInfo = {
    name: user.displayName || "Customer",
    address: `${user.houseNumber || ""}, ${user.streetName || ""}, ${
      user.city || ""
    }, ${user.state || ""} - ${user.postalCode || ""}`,
    pincode: user.postalCode || "N/A",
    phoneNumber: user.phoneNumber || "N/A",
  };

  if (!userid) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <ShoppingBag className="text-red-500 mb-4 h-16 w-16" />
          <h2 className="text-center text-2xl text-red-500">
            Please login to view your orders
          </h2>
          <button
            onClick={() => (window.location.href = "/login")}
            className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Login
          </button>
        </div>
      </Layout>
    );
  }

  const filteredOrders = order
    .filter((obj) => obj.userId === userid)
    .filter((order) =>
      order.cartItems.some((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const sortOrders = (orders) => {
    return [...orders].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
      }
      if (sortBy === "status") {
        return sortOrder === "desc"
          ? b.status.localeCompare(a.status)
          : a.status.localeCompare(b.status);
      }
      return 0;
    });
  };

  const sortedOrders = sortOrders(filteredOrders);

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "order placed":
        return <Clock className="text-yellow-500" />;
      case "processing":
        return <Clock className="text-yellow-500" />;
      case "shipped":
        return <Truck className="text-blue-500" />;
      case "out for delivery":
        return <Truck className="text-blue-500" />;
      case "delivered":
        return <CheckCircle className="text-green-500" />;
      default:
        return <Package className="text-gray-500" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/\s/g, " ");
  };
  console.log(order);
  return (
    <Layout>
      {filteredOrders.length > 0 ? (
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                  <ShoppingBag className="h-8 w-8" />
                  My Orders
                </h1>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  {/* Sort Controls */}
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="date">Sort by Date</option>
                      <option value="status">Sort by Status</option>
                    </select>
                    <button
                      onClick={() =>
                        setSortOrder((prev) =>
                          prev === "asc" ? "desc" : "asc"
                        )
                      }
                      className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      {sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-6">
                {sortedOrders.map((order, orderIndex) => (
                  <div
                    key={orderIndex}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Order Header */}
                    <div
                      className="bg-gray-50 p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => toggleOrderExpansion(orderIndex)}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(order.status)}
                          <div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              {order.addressInfo.date}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {order.addressInfo.address}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium
                            ${
                              order.status.toLowerCase() === "delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status.toLowerCase() === "shipped"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          {expandedOrders[orderIndex] ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Details */}
                    {expandedOrders[orderIndex] && (
                      <div className="p-4 border-t border-gray-200">
                        {order.cartItems.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex flex-col sm:flex-row gap-4 p-4 hover:bg-gray-50 transition-colors rounded-lg"
                          >
                            <img
                              src={item.customDesign || item.imageUrl}
                              alt={item.title}
                              className="w-full sm:w-40 h-40 object-cover rounded-lg"
                            />
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {item.title}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <div className="flex flex-wrap items-end justify-between gap-4 mt-4">
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Price per unit
                                  </p>
                                  <p className="text-lg font-bold text-primary">
                                    ₹{item.price}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">
                                    Quantity
                                  </p>
                                  <p className="text-lg font-semibold text-gray-900">
                                    {item.quantity}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-500">Total</p>
                                  <p className="text-lg font-bold text-primary">
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
          <Package className="text-primary mb-4 h-16 w-16" />
          <h2 className="text-2xl font-bold text-gray-700">No Orders Yet</h2>
          <p className="text-gray-500 mt-2 text-center max-w-md">
            Your order history is empty. Start shopping to see your orders here!
          </p>
          <button
            type="button"
            className="mt-6 bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-primary/20 shadow-lg transition-all"
            onClick={() => (window.location.href = "/")}
          >
            Browse Products
          </button>
        </div>
      )}
    </Layout>
  );
}

export default Order;

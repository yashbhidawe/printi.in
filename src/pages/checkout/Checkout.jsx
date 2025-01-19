import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";
import Layout from "../../components/layout/Layout.jsx";
import { addDoc, collection } from "firebase/firestore";
import MyContext from "../../context/data/MyContext.jsx";
import { v4 as uuidv4 } from "uuid";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Import the autotable plugin

function Checkout() {
  const context = useContext(MyContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  };

  const user = getUserFromLocalStorage();

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp += parseInt(cartItem.price) * parseInt(cartItem.quantity);
    });
    setTotalAmount(temp);
  }, [cartItems]);

  let shipping = totalAmount > 1500 ? 0 : 100;
  const grandTotal = shipping + totalAmount;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const isAddressEmpty = () => {
    if (user) {
      const { houseNumber, streetName, city, state, postalCode } = user;
      return !houseNumber || !streetName || !city || !state || !postalCode;
    }
    return true;
  };

  const generateOrderId = () => uuidv4();

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const handleCheckout = async () => {
    if (isAddressEmpty()) {
      toast.error("Please add address to proceed further");
      setTimeout(() => {
        navigate("/edituserinfo");
      }, 100);
      return;
    }

    const addressInfo = user
      ? {
          name: user.displayName,
          address: `${user.houseNumber}, ${user.streetName}, ${user.city}, ${user.state} - ${user.postalCode}`,
          pincode: user.postalCode,
          phoneNumber: user.phoneNumber,
          date: new Date().toLocaleString("en-IN", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }),
        }
      : null;

    if (!addressInfo) {
      toast.error("Address information is missing.");
      return;
    }

    const orderId = generateOrderId();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      key_secret: import.meta.env.VITE_RAZORPAY_KEY_SECRET,
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + user.displayName,
      name: "printi.in",
      description: "for testing purpose",
      handler: async (response) => {
        toast.success("Payment Successful");
        const paymentId = response.razorpay_payment_id;
        const orderInfo = {
          orderId,
          cartItems,
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: user.email,
          userid: user.uid,
          status: "pending",
          paymentId,
        };

        try {
          const orderRef = collection(fireDB, "orders");
          await addDoc(orderRef, orderInfo);
          localStorage.setItem("latestOrderId", orderId);
          clearCart();
          navigate("/order"); // Navigate to the order page
        } catch (error) {
          console.error("Error adding order to Firestore:", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const pay = new window.Razorpay(options);
    pay.open();
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Order Summary", 14, 20);

    // Table columns
    const columns = ["Item", "Quantity", "Price", "Total"];
    const rows = cartItems.map((item) => [
      item.title,
      item.quantity,
      `₹${item.price}`,
      `₹${item.quantity * item.price}`,
    ]);

    // Use autoTable to create a table
    doc.autoTable(columns, rows, { startY: 30 });

    // Add the totals below the table
    let yPosition = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: ₹${totalAmount}`, 14, yPosition);
    yPosition += 10;
    doc.text(`Shipping: ₹${shipping}`, 14, yPosition);
    yPosition += 10;
    doc.text(`Grand Total: ₹${grandTotal}`, 14, yPosition);

    doc.save("order-summary.pdf");
  };

  return (
    <Layout>
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 max-h-screen overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        {cartItems.map((item, index) => (
          <div key={index} className="mb-4 border-b pb-4 flex items-center">
            <img
              src={item.customDesign ? item.customDesign : item.imageUrl}
              alt={item.title}
              className="w-16 h-16 mr-4 rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h3>
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>Quantity: {item.quantity}</span>
                <span>Price: ₹{item.price}</span>
              </div>
              <p className="mt-1 text-right font-medium text-gray-700">
                Total: ₹{item.quantity * item.price}
              </p>
            </div>
          </div>
        ))}

        <div className="mb-4">
          <div className="flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="font-semibold text-gray-800">₹{totalAmount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p
              className={`font-semibold ${
                shipping === 0 ? "text-green-600" : "text-gray-800"
              }`}
            >
              ₹{shipping} {shipping === 0 && "(Free)"}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <p className="text-primary">Grand Total</p>
            <p className="text-primary">₹{grandTotal}</p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {shipping === 0
              ? "You’ve earned free shipping on this order!"
              : "Spend ₹1500 or more to get free shipping."}
          </p>
        </div>

        <button
          type="button"
          className="w-full bg-primary hover:bg-primaryLight transition-colors text-white text-center rounded-lg font-semibold py-3 mt-4"
          onClick={handleCheckout}
        >
          Buy Now
        </button>

        {/* Download PDF Button */}
        <button
          type="button"
          className="w-full bg-gray-700 hover:bg-gray-600 transition-colors text-white text-center rounded-lg font-semibold py-3 mt-4"
          onClick={downloadPDF}
        >
          Download PDF
        </button>
      </div>
    </Layout>
  );
}

export default Checkout;

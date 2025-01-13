import { jsPDF } from "jspdf";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig.jsx";

const BillGeneration = ({ providedOrderId }) => {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const fetchOrderFromFirestore = async (id) => {
      try {
        const orderDoc = await getDoc(doc(fireDB, "orders", id));
        if (orderDoc.exists()) {
          setOrder(orderDoc.data());
          console.log("Order data set successfully:", orderDoc.data()); // Debugging log
        } else {
          console.error("No such order found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    const determineOrderId = () => {
      const storedOrderId = localStorage.getItem("latestOrderId");
      console.log("Stored Order ID from LocalStorage:", storedOrderId); // Debugging log
      if (storedOrderId) {
        setOrderId(storedOrderId);
      } else {
        setOrderId(providedOrderId);
        console.error("No Order ID in LocalStorage, using providedOrderId"); // Debugging log
      }
    };

    determineOrderId();
    if (orderId) {
      fetchOrderFromFirestore(orderId);
    } else {
      console.error("Order ID is undefined or null"); // Debugging log
    }
  }, [providedOrderId, orderId]);

  const handleDownloadPdf = () => {
    if (order) {
      const doc = new jsPDF();
      doc.text("Bill Summary", 10, 10);
      doc.text(`Order ID: ${orderId}`, 10, 20);
      doc.text(`Customer Name: ${order.customerName}`, 10, 30);
      doc.text(`Order Date: ${order.date}`, 10, 40);

      let yOffset = 50; // Y offset for the items list
      order.items.forEach((item, index) => {
        doc.text(
          `${index + 1}. ${item.name} - $${item.price.toFixed(2)}`,
          10,
          yOffset
        );
        yOffset += 10;
      });

      doc.text(`Total Amount: $${order.total.toFixed(2)}`, 10, yOffset + 10);
      doc.save("bill.pdf");
    } else {
      console.error("No order data to generate PDF");
    }
  };

  return (
    <div>
      <h2>Bill Generation</h2>
      {order ? (
        <>
          <p>Order ID: {orderId}</p>
          <p>Customer Name: {order.customerName}</p>
          <p>Order Date: {order.date}</p>
          <h3>Items:</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p>Total Amount: ${order.total.toFixed(2)}</p>
          <button
            onClick={handleDownloadPdf}
            className="bg-primary text-textLight font-bold px-6 py-2 rounded-lg hover:bg-primaryLight focus:ring-2 focus:ring-bgPrimary transition"
          >
            Download PDF
          </button>
        </>
      ) : (
        <p>Loading order details...</p>
      )}
    </div>
  );
};

export default BillGeneration;

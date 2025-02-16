import React, { useContext, useEffect, useMemo, useState } from "react";
import Layout from "../../components/layout/Layout.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, updateCartQuantity } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Cart() {
  const context = useContext(MyContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const deleteCart = (item) => {
    dispatch(deleteFromCart({ id: item.id }));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (item, newQuantity) => {
    // Convert input to number immediately to prevent string operations
    const quantity = Number(newQuantity);

    // Validate quantity
    if (!Number.isInteger(quantity) || quantity < 1) {
      toast.error("Please enter a valid quantity");
      dispatch(updateCartQuantity({ id: item.id, quantity: item.quantity }));
      return;
    }

    if (quantity > 10000) {
      toast.warning("Maximum quantity limit is 10,000");
      return;
    }

    dispatch(updateCartQuantity({ id: item.id, quantity }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Header
    doc.setFontSize(20);
    doc.text("Invoice", 14, 22);

    // Add Date
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);

    // Prepare table data
    const tableData = cartItems.map((item) => [
      item.title,
      item.quantity,
      `₹${item.price.toLocaleString()}`,
      `₹${(item.price * item.quantity).toLocaleString()}`,
    ]);

    // Add items table
    autoTable(doc, {
      head: [["Item", "Quantity", "Price", "Total"]],
      body: tableData,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [66, 66, 66] },
    });

    // Add total
    const finalY = doc.lastAutoTable.finalY || 40;
    doc.setFontSize(12);
    doc.text(`Subtotal: ₹${subtotal.toLocaleString()}`, 14, finalY + 20);

    // Save PDF
    doc.save("shopping-cart.pdf");
    toast.success("Invoice downloaded successfully!");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const proceedToCheckout = () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty. Add items before proceeding.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/checkout", { state: { cartItems } });
    }, 800);
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => acc + Number(item.price) * Number(item.quantity),
        0
      ),
    [cartItems]
  );

  const CartItem = ({ item }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [localQuantity, setLocalQuantity] = useState(item.quantity);

    useEffect(() => {
      setLocalQuantity(item.quantity);
    }, [item.quantity]);

    const handleDelete = () => {
      setIsDeleting(true);
      setTimeout(() => {
        deleteCart(item);
      }, 300);
    };

    const handleQuantityInputChange = (e) => {
      const value = e.target.value;
      setLocalQuantity(value);
      // Only update redux if the value is valid
      if (value && Number(value) >= 1) {
        handleQuantityChange(item, Number(value));
      }
    };

    const handleQuantityInputBlur = () => {
      // Reset to last valid quantity if current input is invalid
      if (!localQuantity || Number(localQuantity) < 1) {
        setLocalQuantity(item.quantity);
      }
    };

    return (
      <div
        className={`transform transition-all duration-300 ${
          isDeleting ? "scale-95 opacity-0" : "scale-100 opacity-100"
        } bg-white rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow`}
      >
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative group w-32 h-32">
            <img
              src={item.customDesign || item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {item.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-900">
                ₹{Number(item.price).toLocaleString()}
              </span>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-gray-200">
                  <button
                    onClick={() =>
                      handleQuantityChange(item, Number(item.quantity) - 1)
                    }
                    className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    className="w-16 text-center bg-transparent border-none focus:outline-none text-gray-800"
                    value={localQuantity}
                    onChange={handleQuantityInputChange}
                    onBlur={handleQuantityInputBlur}
                    min="1"
                    max="10000"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(item, Number(item.quantity) + 1)
                    }
                    className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleDelete}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="min-h-screen bg-bgLight py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-primary">Shopping Cart</h1>
            <div className="flex items-center gap-4">
              {cartItems.length > 0 && (
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary hover:text-white rounded-lg transition-colors"
                >
                  <Download size={18} />
                  Download Invoice
                </button>
              )}
              <span className="text-sm text-gray-500">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
              </span>
            </div>
          </div>

          {cartItems.length > 0 ? (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium text-gray-900">
                        ₹{subtotal.toLocaleString()}
                      </span>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <button
                        onClick={proceedToCheckout}
                        disabled={isLoading}
                        className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium
                          hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                          disabled:opacity-70 disabled:cursor-not-allowed transition-colors
                          flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <ShoppingBag size={18} />
                            Proceed to Checkout
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg
                  hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Cart;

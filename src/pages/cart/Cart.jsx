import React, { useContext, useEffect, useMemo } from "react";
import Layout from "../../components/layout/Layout.jsx";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, updateCartQuantity } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import MyContext from "../../context/data/MyContext.jsx";
import { useNavigate } from "react-router-dom";

function Cart() {
  const context = useContext(MyContext);
  const { mode } = context;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const deleteCart = (item) => {
    dispatch(deleteFromCart({ id: item.id }));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (item, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id: item.id, quantity }));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const proceedToCheckout = () => {
    if (!cartItems.length) {
      toast.error("Your cart is empty. Add items before proceeding.");
      return;
    }
    navigate("/checkout", { state: { cartItems } });
  };

  const subtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  return (
    <Layout>
      <div className="min-h-screen bg-bgLight pt-5 pb-5">
        <h1 className="mb-10 text-center text-2xl font-bold text-primary">
          Cart Items
        </h1>
        {cartItems.length > 0 ? (
          <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
            {/* Cart Items */}
            <div className="rounded-lg md:w-2/3 overflow-y-auto max-h-96">
              {cartItems.map((item, index) => {
                const {
                  title,
                  price,
                  description,
                  customDesign,
                  imageUrl,
                  quantity,
                } = item;
                console.log("Cart Item Image URL:", customDesign); // Log to ensure URL is set
                return (
                  <div
                    key={index}
                    className="justify-between mb-6 rounded-lg border shadow-lg bg-white p-6 sm:flex sm:justify-start"
                  >
                    <img
                      src={customDesign ? customDesign : imageUrl}
                      alt="product"
                      className="w-40 h-40 aspect-square rounded-lg "
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-textDark">
                          {title}
                        </h2>
                        <p className="text-sm text-textDark">{description}</p>
                        <p className="mt-1 text-sm font-semibold text-textLight">
                          ₹{price}
                        </p>
                      </div>
                      <div className="mt-4 flex flex-col justify-between items-center sm:mt-0 sm:block sm:space-y-6">
                        <div className="flex items-center mb-2 space-x-2">
                          {[300, 500, 1000].map((preset) => (
                            <button
                              key={preset}
                              onClick={() => handleQuantityChange(item, preset)}
                              className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                              title={`Set quantity to ${preset}`}
                            >
                              {preset}
                            </button>
                          ))}
                        </div>
                        <div className="flex items-center mb-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(item, quantity - 1)
                            }
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="mx-2 text-lg border-2 border-gray-300 rounded-md w-16 text-center"
                            value={quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item,
                                parseInt(e.target.value)
                              )
                            }
                          />
                          <button
                            onClick={() =>
                              handleQuantityChange(item, quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded-md"
                          >
                            +
                          </button>
                        </div>
                        <svg
                          onClick={() => deleteCart(item)}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 cursor-pointer hover:text-red-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtotal Card */}
            <div className="mt-6 md:mt-0 md:w-1/3">
              <div className="sticky top-5 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order Summary
                </h2>
                <div className="mt-4 flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="mt-4">
                  <button
                    onClick={proceedToCheckout}
                    className="w-full px-4 py-2 bg-primary text-white font-semibold rounded-md"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-600">
              Your cart is empty.
            </h2>
            <button
              onClick={() => navigate("/")}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Cart;

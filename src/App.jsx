import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Dashboard from "./pages/admin/dashbord/Dashbord.jsx";
import NoPage from "./pages/nopage/NoPage.jsx";
import Login from "./pages/registration/Login.jsx";
import Signup from "./pages/registration/Signup.jsx";
import ProductInfo from "./pages/productInfo/ProductInfo.jsx";
import AddProduct from "./pages/admin/page/AddProduct.jsx";
import UpdateProduct from "./pages/admin/page/UpdateProduct.jsx";
import UserInfo from "./pages/userinfo/UserInfo.jsx";
import EditUserInfo from "./pages/userinfo/EditUserInfo.jsx";
import MyState from "./context/data/MyState.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allproducts from "./pages/allproducts/AllProducts.jsx";
import { FaWhatsapp } from "react-icons/fa";
import ResetPassword from "./pages/registration/ResetPassword.jsx";
import Category from "./pages/category/Category.jsx";
import Checkout from "./pages/checkout/Checkout.jsx";
import Customization from "./pages/customization/Customization.jsx";
import AboutUs from "./pages/about-us/AboutUs.jsx";
import IDCardGenerator from "./pages/idcardgenerator/IDCardGenerator.jsx";
import Wishlist from "./pages/wishlist/WishList.jsx";
import FAQ from "./pages/faq/FAQ.jsx";
import Careers from "./pages/careers/Careers.jsx";
import Privacy from "./pages/privacy/Privacy.jsx";
import Blog from "./pages/blog/Blog.jsx";
import ContactUs from "./pages/contact-us/ContactUs.jsx";
import TermsAndConditions from "./pages/terms-and-conditions/TermsAndConditions.jsx";
import CancellationPolicy from "./pages/cancelation/CancelationPolicy.jsx";
import ShippingDeliveryPolicy from "./pages/shipping-delivery-policy/ShippingDeliveryPolicy.jsx";
import ScrollToTop from "./components/scrollToTop/ScrollToTop.jsx";
import OrderStatus from "./pages/order-status/OrderStatus.jsx";
import Categories from "./pages/categories/Categories.jsx";
function App() {
  return (
    <MyState>
      <Router>
        <ScrollToTop /> {/* Add this inside Router */}
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/*" element={<NoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/edituserinfo" element={<EditUserInfo />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/customization" element={<Customization />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/id-card-generator" element={<IDCardGenerator />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/cancelation" element={<CancellationPolicy />} />
          <Route path="order-status" element={<OrderStatus />} />
          <Route
            path="/shpping-deliver-policy"
            element={<ShippingDeliveryPolicy />}
          />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route
            path="/addProduct"
            element={
              <ProtectedRoute requiredRole="admin">
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/updateProduct"
            element={
              <ProtectedRoute requiredRole="admin">
                <UpdateProduct />
              </ProtectedRoute>
            }
          />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/category/:category" element={<Category />} />
        </Routes>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar
          closeOnClick
          theme="dark"
          pauseOnHover
        />{" "}
      </Router>
      <div className="fixed bottom-8 right-8 bg-green-500 text-white rounded-full p-4 cursor-pointer shadow-lg transition transform hover:scale-105">
        <a
          href="https://wa.me/918007800493"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="w-8 h-8" />
        </a>
      </div>
    </MyState>
  );
}

export default App;

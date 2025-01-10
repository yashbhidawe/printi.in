import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashbord/Dashbord";
import NoPage from "./pages/nopage/NoPage";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/page/AddProduct";
import UpdateProduct from "./pages/admin/page/UpdateProduct";
import UserInfo from "./pages/userinfo/UserInfo";
import EditUserInfo from "./pages/userinfo/EditUserInfo";
import MyState from "./context/data/MyState";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Allproducts from "./pages/allproducts/AllProducts";
import { FaWhatsapp } from "react-icons/fa";

function App() {
  return (
    <MyState>
      <Router>
        <Routes>
          {" "}
          <Route path="/" element={<Home />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
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
        </Routes>
        <ToastContainer />
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

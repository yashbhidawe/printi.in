import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="containt">{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;

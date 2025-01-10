import React from "react";
import Navbar from "../navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";

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

import React from "react";
import Header from "../modules/Header/Header";
import Footer from "../modules/Footer/Footer";

const LayoutHome = ({ children }) => {
  return (
    <div className="items-center w-full isolate bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-r">
      <Header></Header>
      <div className="min-h-screen">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default LayoutHome;

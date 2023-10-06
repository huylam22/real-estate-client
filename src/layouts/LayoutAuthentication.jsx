import { Link, useNavigate } from "react-router-dom";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../components/common/ErrorComponent";
import PropType from "prop-types";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
const LayoutAuthentication = (props) => {
  const { children, heading } = props;
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.email) {
      navigate("/");
    }
  }, [user]);
  if (user && user.email) return null;

  return (
    <div className="relative w-full min-h-screen p-10 bg-lite isolate dark:from-gray-900 dark:to-gray-600 dark:bg-gradient-to-r">
      <Link to="/" className="inline-block mb-5 lg:mb-16">
        <img srcSet="/logo-bright.png 2x" alt="crowdfunding-app" />
      </Link>
      <motion.div
        className="w-full max-w-[556px] dark:bg-darkSecondary bg-white rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="mb-1 text-lg font-semibold text-center dark:text-white lg:text-xl lg:mb-3">
          {heading}
        </h1>
        {children}
      </motion.div>
    </div>
  );
};

LayoutAuthentication.propTypes = {
  heading: PropType.string,
  children: PropType.node,
};
export default withErrorBoundary(LayoutAuthentication, {
  FallbackComponent: ErrorComponent,
});

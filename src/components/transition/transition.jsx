import React from "react";
import { motion } from "framer-motion";
const transition = (OgComponent) => {
  return (
    <>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <OgComponent />
      </motion.div>
    </>
  );
};

export default transition;

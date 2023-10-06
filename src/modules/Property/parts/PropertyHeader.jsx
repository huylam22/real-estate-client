import React from "react";

const PropertyHeader = ({ children }) => {
  return (
    <h3
      className={`font-medium text-lg text-ellipsis whitespace-nowrap overflow-hidden hover:text-red-400`}
      style={{ whiteSpace: "nowrap" }}
    >
      {" "}
      {children}
    </h3>
  );
};

export default PropertyHeader;

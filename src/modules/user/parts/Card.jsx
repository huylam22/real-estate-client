import React from "react";
import "./card.css";
const CardWrapper = ({ children }) => {
  return <div className="card mx-auto">{children}</div>;
};

export default CardWrapper;

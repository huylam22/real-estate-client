import React from "react";
import "./card.css";
const Card = ({ children }) => {
  return <div className="card mx-auto">{children}</div>;
};

export default Card;

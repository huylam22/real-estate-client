import React from "react";

const LoadingSkeleton = (props) => {
  return (
    <div
      className="skeleton"
      style={{
        height: props.height,
        width: props.width || "100%",
        borderRadius: props.radius || "0px",
      }}
    ></div>
  );
};

export default LoadingSkeleton;

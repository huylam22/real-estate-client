import React from "react";
import PropTypes from "prop-types";

const Label = (props) => {
  const { children, htmlFor = "", className = "" } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={`inline-block text-md font-medium cursor-pointer text-text2 dark:text-graySoft ${className}`}
      // className={`inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text4 ${className}`}
    >
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
  className: PropTypes.string,
};
export default Label;

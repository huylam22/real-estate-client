import React from "react";
import PropType from "prop-types";
import { Link } from "react-router-dom";

const Button = ({
  type = "button",
  children,
  className = "",
  isLoading = false,
  ...rest
}) => {
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  let defaultButtonClassName =
    "transition-all flex items-center justify-center text-base font-normal rounded-xl";
  switch (rest.kind) {
    case "primary":
      defaultButtonClassName =
        defaultButtonClassName + " bg-green px-2 py-4 text-white";
      break;
    case "secondary":
      defaultButtonClassName =
        defaultButtonClassName +
        " bg-gradient-to-r from-secondary to-gray-500 text-white px-4 py-3 border border-secondary hover:border-white";
      break;
    case "transparent":
      defaultButtonClassName =
        defaultButtonClassName +
        " px-4 py-3 mx-2 dark:text-white text-black hover:text-green border dark:border-white border-black hover:bg-white hover:text-secondary";
      break;
    default:
      break;
  }

  if (rest.href) {
    return (
      <Link to={rest.href} className={`${defaultButtonClassName} ${className}`}>
        {child}
      </Link>
    );
  }
  return (
    <button
      className={`${defaultButtonClassName} 
       ${!!isLoading ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
      type={type}
      {...rest}
    >
      {child}
    </button>
  );
};

const LoadingSpinner = () => {
  return (
    // <div class="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
    //   <div class={`h-6 w-6 rounded-full ${className}`}></div>
    // </div>
    // <div className="w-10 h-10 border-4 border-white rounded-full border-t-transparent animate-spin"></div>

    <div className="grid gap-2">
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </div>
    </div>
  );
};

Button.prototype = {
  type: PropType.string.isRequired,
  chidlren: PropType.node,
  className: PropType.string,
  isLoading: PropType.bool,
  href: PropType.string,
  kind: PropType.oneOf(["primary", "secondary", "ghost"]).isRequired,
};
export default Button;

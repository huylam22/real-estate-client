import React from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children, className, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className={`relative inline-block w-full ${className}`}>
        {children}
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;

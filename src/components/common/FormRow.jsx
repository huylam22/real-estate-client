import React from "react";

const FormRow = ({ children, grid = "grid-cols-2" }) => {
  return (
    <div className={`grid lg:${grid} grid-cols-1 gap-x-[45px]`}>{children}</div>
  );
};

export default FormRow;

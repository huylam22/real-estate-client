import React from "react";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../common/ErrorComponent";

const Input = (props) => {
  const {
    control,
    name,
    type = "text",
    error = "",
    placeholder = "",
    children,

    ...rest
  } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <div className="relative">
      <input
        id={name}
        type={type}
        placeholder={error.length <= 0 ? placeholder : ""}
        className={`w-full px-6 py-4 font-medium border rounded-xl bg-transparent border-darkStroke dark:border-graySoft placeholder:text-text2 dark:placeholder:text-text3 dark:text-white placeholder:font-normal
          ${
            error.length > 0
              ? "border-error text-error"
              : "border-darkStroke text-text1"
          }
          ${children ? "pr-16" : ""}`}
        {...rest}
        {...field}
      />
      {error.length > 0 && (
        <span className="absolute top-0 right-0 mt-3 mr-3 text-xs font-normal pointer-events-none text-error error-input">
          {error}
        </span>
      )}
      {children && error.length <= 0 && (
        <div className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
          {children}
        </div>
      )}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  control: PropTypes.any.isRequired,
  error: PropTypes.string,
};
export default withErrorBoundary(Input, {
  FallbackComponent: ErrorComponent,
});

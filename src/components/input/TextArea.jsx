import React from "react";
import { useController } from "react-hook-form";

const TextArea = (props) => {
  const { control, name, placeholder = "", children, ...rest } = props;
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      placeholder={placeholder}
      {...rest}
      {...field}
      className="resize-none min-h-[140px] outline-none w-full px-6 py-4 font-medium bg-transparent border rounded-xl border-darkStroke dark:border-graySoft placeholder:text-text4 dark:placeholder:text-text-2 dark:text-white placeholder:font-normal"
    ></textarea>
  );
};

export default TextArea;

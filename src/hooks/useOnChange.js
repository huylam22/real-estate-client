import { debounce } from "lodash";
import { useState } from "react";

export default function useOnChange(time = 0) {
  const [value, setValue] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const handleOnChange = debounce((e) => {
    setShowSearch(true);
    setValue(e.target.value);
  }, time);
  return [value, handleOnChange, showSearch];
}

import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
  const { search } = useLocation();
  // console.log(search);
  return useMemo(() => new URLSearchParams(search), [search]);
}

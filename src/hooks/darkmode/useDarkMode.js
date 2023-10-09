import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import useMedia from "./useMedia";
// import { useDispatch } from "react-redux";
// import { toggleDarkMode } from "../redux-toolkit/globalSlice";

export default function useDarkMode() {
  // Use our useLocalStorage hook to persist state through a page refresh.
  // Read the recipe for this hook to learn more: usehooks.com/useLocalStorage
  // render 2 lan khi dispatch
  // const dispatch = useDispatch();
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode-enabled");
  // See if user has set a browser or OS preference for dark mode.

  // The usePrefersDarkMode hook composes a useMedia hook (see code below).
  const prefersDarkMode = usePrefersDarkMode(); // ==> same as system theme (dark or light)

  // If enabledState is defined use it, otherwise fallback to prefersDarkMode.
  // This allows user to override OS level setting on our website.
  const enabled = typeof enabledState !== "undefined" ? enabledState : false;
  // Fire off effect that add/removes dark mode class
  useEffect(
    () => {
      const className = "dark";
      const element = window.document.documentElement;
      if (enabled) {
        element.classList.add(className);
        // dispatch(toggleDarkMode(true));
      } else {
        element.classList.remove(className);
        // dispatch(toggleDarkMode(false));
      }
    },
    [enabled] // Only re-call effect when value changes
  );
  // Return enabled state and setter
  return [enabled, setEnabledState];
}
// Compose our useMedia hook to detect dark mode preference.
// The API for useMedia looks a bit weird, but that's because ...
// ... it was designed to support multiple media queries and return values.
// Thanks to hook composition we can hide away that extra complexity!
// Read the recipe for useMedia to learn more: usehooks.com/useMedia
function usePrefersDarkMode() {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
}

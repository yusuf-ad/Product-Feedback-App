import { useEffect, useRef } from "react";

export function useClickOutside(handler) {
  const menu = useRef();
  const button = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        menu.current &&
        !menu.current.contains(e.target) &&
        !button.current.contains(e.target)
      ) {
        handler();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler, menu, button]);

  return { menu, button };
}

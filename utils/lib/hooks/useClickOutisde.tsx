"use client";

import { useEffect } from "react";

const useClickOutside = (
  isOpen: boolean,
  toggleFunction: (arg0: boolean) => void,
  ref: React.RefObject<HTMLElement>
) => {
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        event.stopPropagation();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("wheel", handleScroll);
    }

    // Cleanup function to remove overflow class when unmounting or modal is closed
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow style
      document.removeEventListener("wheel", handleScroll);
    };
  }, [isOpen, ref]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleFunction(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleFunction, ref]);
};

export default useClickOutside;

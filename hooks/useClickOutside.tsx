"use client";

import { MutableRefObject, useEffect } from "react";

const useClickOutside = (
  isOpen: boolean,
  toggleFunction: (arg0: boolean) => void,
  ref: React.RefObject<HTMLElement | null>,
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

    return () => {
      document.body.style.overflow = "auto";
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

export const useMoreButtonClickOutside = (
  buttonRef: MutableRefObject<HTMLButtonElement | null>,
  setIsOpen: (arg0: boolean) => void,
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [buttonRef, setIsOpen]);
};

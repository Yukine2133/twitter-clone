import { ITweetProps } from "@/types/tweet.interface";
import React, { useRef, useEffect, ReactNode } from "react";

interface IModalProps {
  isModalOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  children: ReactNode;
}

const Modal = ({ isModalOpen, toggleModal, children }: IModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (ref.current && ref.current.contains(event.target as Node)) {
        event.stopPropagation();
      }
    };

    if (isModalOpen) {
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
  }, [isModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        toggleModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
          <div
            ref={ref}
            className="bg-black shadow-sm w-[700px] rounded-lg mx-2 md:mx-0 p-5 md:p-8"
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

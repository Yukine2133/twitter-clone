import { ITweetProps } from "@/types/tweet.interface";
import useClickOutside from "@/utils/lib/hooks/useClickOutisde";
import React, { useRef, useEffect, ReactNode } from "react";

interface IModalProps {
  isModalOpen: boolean;
  toggleModal: (isOpen: boolean) => void;
  children: ReactNode;
}

const Modal = ({ isModalOpen, toggleModal, children }: IModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(isModalOpen, toggleModal, ref);

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

import Image from "next/image";
import React from "react";
import { createPortal } from "react-dom";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageModal = ({ src, alt, onClose }: ImageModalProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#242d34] bg-opacity-65 px-4"
      onClick={onClose}
    >
      <div className="relative">
        <Image
          width={600}
          height={600}
          src={src}
          alt={alt}
          className="rounded-lg w-fit"
        />
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;

import React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalImages: number; // New prop to pass total number of images
}

const ImageModal = ({
  src,
  alt,
  onClose,
  onNext,
  onPrev,
  totalImages,
}: ImageModalProps) => {
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#242d34] bg-opacity-65 px-7"
      onClick={onClose}
    >
      <div className="relative">
        {totalImages > 1 && ( // Conditionally render arrows only if more than one image
          <button
            className="absolute top-1/2 p-4 -left-10 sm:-left-12 md:-left-20 transform -translate-y-1/2"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ArrowLeftIcon className="size-6 text-4xl" />
          </button>
        )}
        <Image
          width={600}
          height={600}
          src={src}
          alt={alt}
          className="rounded-lg w-fit md:max-w-[600px]"
        />
        {totalImages > 1 && ( // Conditionally render arrows only if more than one image
          <button
            className="absolute top-1/2 p-4 -right-10 sm:-right-12 md:-right-20 transform -translate-y-1/2"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ArrowRightIcon className="size-6 text-4xl" />
          </button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;

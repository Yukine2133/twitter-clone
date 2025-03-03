import React from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import { TweetMediaModalProps } from "@/interfaces/tweet.interface";

const TweetMediaModal = ({
  srcImage,
  srcVideo,
  onClose,
  onNext,
  onPrev,
  totalImages,
  totalVideos,
}: TweetMediaModalProps) => {
  const isImage = !!srcImage;
  const isVideo = !!srcVideo;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="relative">
        {(totalImages && totalImages > 1 && isImage) ||
        (totalVideos && totalVideos > 1 && isVideo) ? (
          <button
            className="absolute top-1/2 p-4 -left-10 sm:-left-12 md:-left-20 transform -translate-y-1/2"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ArrowLeftIcon className="size-6 text-4xl" />
          </button>
        ) : null}
        {isImage ? (
          <Image
            width={600}
            height={600}
            src={srcImage as string}
            alt="Selected Image"
            className="rounded-lg w-fit md:max-w-[600px]"
          />
        ) : isVideo ? (
          <video
            className="rounded-lg md:max-h-[400px] md:max-w-[650px]"
            controls
            autoPlay
            src={srcVideo as string}
          />
        ) : null}
        {(totalImages && totalImages > 1 && isImage) ||
        (totalVideos && totalVideos > 1 && isVideo) ? (
          <button
            className="absolute top-1/2 p-4 -right-10 sm:-right-12 md:-right-20 transform -translate-y-1/2"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ArrowRightIcon className="size-6 text-4xl" />
          </button>
        ) : null}
      </div>
    </div>,
    document.body
  );
};

export default TweetMediaModal;

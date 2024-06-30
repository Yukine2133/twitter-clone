"use client";

import React, { useState } from "react";
import { IReply, ITweet } from "@/types/tweet.interface";
import Image from "next/image";
import ImageModal from "./ImageModal";

const TweetMedia = ({
  data,
  neededMarginLeft,
}: {
  data: ITweet | IReply;
  neededMarginLeft?: boolean;
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex: any) => (prevIndex + 1) % data.images.length
      );
    }
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (prevIndex: any) =>
          (prevIndex - 1 + data.images.length) % data.images.length
      );
    }
  };

  return (
    <>
      {data.images.length > 1 ? (
        <div
          className={`grid grid-cols-2 gap-1 mt-1 ${
            neededMarginLeft && "sm:ml-12 sm:-translate-y-3"
          }`}
        >
          {data.images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt="User Image"
              width={400}
              height={400}
              className="object-cover rounded-lg cursor-pointer"
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      ) : (
        <div
          className={`${neededMarginLeft && "sm:ml-12 sm:-translate-y-3"} mt-1`}
        >
          {data.images.length > 0 && (
            <Image
              key={data.images[0]}
              src={data.images[0]}
              alt="User Image"
              width={700}
              height={700}
              className="object-cover h-[360px] sm:w-full rounded-lg cursor-pointer"
              onClick={() => handleImageClick(0)}
            />
          )}
        </div>
      )}
      <div
        className={`${neededMarginLeft && "sm:ml-12 sm:-translate-y-3"} mt-1`}
      >
        {data.videos &&
          data.videos.map((video, index) => (
            <video
              key={video}
              className="rounded-lg h-[300px] max-w-[545px]"
              controls
              src={video}
            />
          ))}
      </div>

      {selectedImageIndex !== null && (
        <ImageModal
          src={data.images[selectedImageIndex]}
          alt="Selected Image"
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          totalImages={data.images.length}
        />
      )}
    </>
  );
};

export default TweetMedia;

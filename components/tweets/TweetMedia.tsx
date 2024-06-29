"use client";

import React, { useState } from "react";
import { IReply, ITweet } from "@/types/tweet.interface";
import Image from "next/image";
import ImageModal from "./ImageModal"; // Import the ImageModal component

const TweetMedia = ({
  data,
  neededMarginLeft,
}: {
  data: ITweet | IReply;
  neededMarginLeft?: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (src: string) => {
    setSelectedImage(src);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {data.images.length > 1 ? (
        <div
          className={`grid grid-cols-2 gap-1 mt-1 ${
            neededMarginLeft && "sm:ml-12 sm:-translate-y-3"
          }`}
        >
          {data.images.map((image) => (
            <Image
              key={image}
              src={image}
              alt="User Image"
              width={400}
              height={400}
              className="object-cover  rounded-lg  cursor-pointer"
              onClick={(event) => handleImageClick(image)}
            />
          ))}
        </div>
      ) : (
        <div
          className={`${
            neededMarginLeft && "sm:ml-12 sm:-translate-y-3 "
          } mt-1`}
        >
          {data.images.length > 0 && (
            <Image
              key={data.images[0]}
              src={data.images[0]}
              alt="User Image"
              width={700}
              height={700}
              className="object-cover  h-[360px] sm:w-full rounded-lg  cursor-pointer"
              onClick={(event) => handleImageClick(data.images[0])}
            />
          )}
        </div>
      )}
      <div
        className={`${neededMarginLeft && "sm:ml-12 sm:-translate-y-3"} mt-1`}
      >
        {data.videos &&
          data.videos.map((video) => (
            <video
              key={video}
              className="rounded-lg h-[300px] max-w-[545px] "
              controls
              src={video}
            />
          ))}
      </div>

      {selectedImage && (
        <ImageModal
          src={selectedImage}
          alt="Selected Image"
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TweetMedia;

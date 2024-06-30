"use client";

import React, { useState } from "react";
import { IReply, ITweet } from "@/types/tweet.interface";
import Image from "next/image";
import TweetMediaModal from "./TweetMediaModal";

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
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleVideoClick = (
    index: number,
    event:
      | React.MouseEvent<HTMLVideoElement, MouseEvent>
      | React.TouchEvent<HTMLVideoElement>
  ) => {
    // prevent video from playing when clicked
    event.preventDefault();
    event.stopPropagation();
    const video = event.currentTarget as HTMLVideoElement;
    video.pause();
    setSelectedVideoIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setSelectedVideoIndex(null);
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

  const handleNextVideo = () => {
    if (selectedVideoIndex !== null) {
      setSelectedVideoIndex(
        (prevIndex: any) => (prevIndex + 1) % data.videos.length
      );
    }
  };

  const handlePrevVideo = () => {
    if (selectedVideoIndex !== null) {
      setSelectedVideoIndex(
        (prevIndex: any) =>
          (prevIndex - 1 + data.videos.length) % data.videos.length
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
        className={`${
          neededMarginLeft && "sm:ml-12 sm:-translate-y-3"
        } mt-2 md:mt-1`}
      >
        {data.videos &&
          data.videos.map((video, index) => (
            <video
              key={video}
              className="rounded-lg md:h-[300px] md:max-w-[545px] cursor-pointer"
              controls
              src={video}
              onClick={(e) => handleVideoClick(index, e)}
              onTouchEnd={(e) => handleVideoClick(index, e)}
            />
          ))}
      </div>

      {selectedImageIndex !== null && (
        <TweetMediaModal
          srcImage={data.images[selectedImageIndex] as string}
          onClose={handleCloseModal}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          totalImages={data.images.length}
        />
      )}
      {selectedVideoIndex !== null && (
        <TweetMediaModal
          srcVideo={data.videos[selectedVideoIndex]}
          onClose={handleCloseModal}
          onNext={handleNextVideo}
          onPrev={handlePrevVideo}
          totalVideos={data.videos.length}
        />
      )}
    </>
  );
};

export default TweetMedia;

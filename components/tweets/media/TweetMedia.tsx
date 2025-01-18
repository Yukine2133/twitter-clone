"use client";

import React from "react";
import { IReply, ITweet } from "@/interfaces/tweet.interface";
import Image from "next/image";
import TweetMediaModal from "./TweetMediaModal";
import useTweetMedia from "@/hooks/tweetsLogic/useTweetMedia";

const TweetMedia = ({
  data,
  neededMarginLeft,
}: {
  data: ITweet | IReply;
  neededMarginLeft?: boolean;
}) => {
  const {
    selectedImageIndex,
    selectedVideoIndex,
    handleImageClick,
    handleVideoClick,
    handleCloseModal,
    handleNextImage,
    handlePrevImage,
    handleNextVideo,
    handlePrevVideo,
  } = useTweetMedia({ data });
  return (
    <>
      {data.images.length > 1 ? (
        <div
          className={`columns-2  gap-2 mt-1 ${
            neededMarginLeft && "sm:ml-12 sm:-translate-y-3"
          }`}
        >
          {data.images.map((image, index) => (
            <div key={image} className="w-full mb-[10px] break-inside-avoid">
              <Image
                src={image}
                alt="User Image"
                width={400}
                height={400}
                className="object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
            </div>
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

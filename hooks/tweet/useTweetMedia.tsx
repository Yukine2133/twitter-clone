import { IReply, ITweet } from "@/interfaces/tweet.interface";
import { useState } from "react";

const useTweetMedia = ({ data }: { data: ITweet | IReply }) => {
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

  return {
    selectedImageIndex,
    selectedVideoIndex,
    handleImageClick,
    handleVideoClick,
    handleCloseModal,
    handleNextImage,
    handlePrevImage,
    handleNextVideo,
    handlePrevVideo,
  };
};

export default useTweetMedia;

"use client";

import useTweetFormLogic from "@/utils/lib/hooks/useTweetFormLogic";
import { IUser } from "@/types/user.interface";
import TweetFormUI from "./TweetFormUI";

const TweetForm = ({
  user,
  id,
  toggleModal,
}: {
  user: IUser;
  id?: string;
  toggleModal?: (arg0: boolean) => void;
}) => {
  const {
    ref,
    handleSubmit,
    imageUrl,
    setImageUrl,
    videoUrl,
    setVideoUrl,
    setIsOpen,
    isOpen,
    setIsOpenVideo,
    isOpenVideo,
    loading,
  } = useTweetFormLogic({ toggleModal, id });

  return (
    <TweetFormUI
      handleSubmit={handleSubmit}
      id={id}
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      videoUrl={videoUrl}
      setVideoUrl={setVideoUrl}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      loading={loading}
      isOpenVideo={isOpenVideo}
      setIsOpenVideo={setIsOpenVideo}
      ref={ref}
      user={user}
    />
  );
};

export default TweetForm;

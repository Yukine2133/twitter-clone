"use client";

import useTweetFormLogic from "@/utils/lib/hooks/useTweetFormLogic";
import { IUser } from "@/types/user.interface";
import TweetFormUI from "./TweetFormUI";
import { useRef } from "react";

const TweetForm = ({
  user,
  id,
  toggleModal,
}: {
  user: IUser;
  id?: string;
  toggleModal?: (arg0: boolean) => void;
}) => {
  const ref = useRef<HTMLFormElement>(null);

  const {
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
    text,
    setText,
  } = useTweetFormLogic({ toggleModal, id, ref });

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
      text={text}
      setText={setText}
    />
  );
};

export default TweetForm;

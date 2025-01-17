"use client";

import useTweetFormLogic from "@/hooks/useTweetFormLogic";
import { IUser } from "@/interfaces/user.interface";
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
    imageUrls,
    setImageUrls,
    videoUrls,
    setVideoUrls,
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
      imageUrls={imageUrls!}
      setImageUrls={setImageUrls!}
      videoUrls={videoUrls}
      setVideoUrls={setVideoUrls}
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

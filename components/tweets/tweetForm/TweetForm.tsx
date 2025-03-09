"use client";

import useTweetFormLogic from "@/hooks/tweetsLogic/useTweetFormLogic";
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

    loading,
    text,
    setText,
    uploadImageButtonRef,
    uploadVideoButtonRef,
    imageProgress,
    setImageProgress,
    videoProgress,
    setVideoProgress,
  } = useTweetFormLogic({ toggleModal, id, ref });

  return (
    <TweetFormUI
      handleSubmit={handleSubmit}
      id={id}
      imageUrls={imageUrls!}
      setImageUrls={setImageUrls!}
      videoUrls={videoUrls}
      setVideoUrls={setVideoUrls}
      loading={loading}
      ref={ref}
      user={user}
      text={text}
      setText={setText}
      uploadImageButtonRef={uploadImageButtonRef}
      uploadVideoButtonRef={uploadVideoButtonRef}
      imageProgress={imageProgress}
      setImageProgress={setImageProgress}
      videoProgress={videoProgress}
      setVideoProgress={setVideoProgress}
    />
  );
};

export default TweetForm;

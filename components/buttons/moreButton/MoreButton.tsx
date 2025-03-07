"use client";

import { IMoreButtonProps } from "@/interfaces/tweet.interface";
import useMoreButtonLogic from "@/hooks/buttonsLogic/useMoreButtonLogic";
import MoreButtonUI from "./MoreButtonUI";

const MoreButton = ({
  id,
  reply,
  tweet,
  replyId,
  replyTweet,
}: IMoreButtonProps) => {
  const {
    isOwner,
    buttonRef,
    setIsOpen,
    isOpen,
    setEdit,
    edit,
    handleDelete,
    text,
    setText,
    handleSubmit,
    setTweetImageUrls,
    tweetImageUrls,
    tweetVideoUrls,
    setTweetVideoUrls,
  } = useMoreButtonLogic({
    id,
    reply,
    tweet,
    replyId,
    replyTweet,
  });
  return (
    <MoreButtonUI
      isOwner={isOwner}
      buttonRef={buttonRef}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      setEdit={setEdit}
      edit={edit}
      handleDelete={handleDelete}
      text={text}
      setText={setText}
      handleSubmit={handleSubmit}
      setTweetImageUrls={setTweetImageUrls}
      tweetImageUrls={tweetImageUrls}
      tweetVideoUrls={tweetVideoUrls}
      setTweetVideoUrls={setTweetVideoUrls}
    />
  );
};

export default MoreButton;

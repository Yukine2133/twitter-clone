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
  messageId,
  message,
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
    setImageUrl,
    handleSubmit,
    imageUrl,
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
    messageId,
    message,
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
      imageUrl={imageUrl}
      setImageUrl={setImageUrl}
      handleSubmit={handleSubmit}
      messageId={messageId}
      setTweetImageUrls={setTweetImageUrls}
      tweetImageUrls={tweetImageUrls}
      tweetVideoUrls={tweetVideoUrls}
      setTweetVideoUrls={setTweetVideoUrls}
    />
  );
};

export default MoreButton;

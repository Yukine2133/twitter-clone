"use client";

import { IMoreButtonProps } from "@/types/tweet.interface";
import useMoreButtonLogic from "@/utils/lib/hooks/useMoreButtonLogic";
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
    replyImageUrls,
    setReplyImageUrls,
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
      replyImageUrls={replyImageUrls as string[]}
      setReplyImageUrls={setReplyImageUrls}
      replyId={replyId as string | undefined}
    />
  );
};

export default MoreButton;

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
    />
  );
};

export default MoreButton;

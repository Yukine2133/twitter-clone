import { deleteReply, editReply } from "@/actions/reply.actions";
import { deleteTweet, updateTweet } from "@/actions/tweet.actions";
import { IMoreButtonProps } from "@/interfaces/tweet.interface";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { tweetTextSchema } from "@/utils/lib/validation";
import { z } from "zod";
import { useMoreButtonClickOutside } from "../useClickOutside";
import { useUser } from "@clerk/nextjs";

const useMoreButtonLogic = ({
  id,
  reply,
  tweet,
  replyId,
  replyTweet,
}: Omit<IMoreButtonProps, "isAdmin">) => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState<string | null>(
    replyTweet ? replyTweet : (tweet?.text as string)
  );

  const [edit, setEdit] = useState(false);

  const [tweetImageUrls, setTweetImageUrls] = useState<
    string[] | undefined | any
  >(reply ? reply.images : tweet?.images);
  const [tweetVideoUrls, setTweetVideoUrls] = useState<
    string[] | undefined | any
  >(reply ? reply.videos : tweet?.videos);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { user } = useUser();

  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const handleEdit = async (tweetId: string, text: string) => {
    try {
      if (replyId) {
        const res = await editReply(
          replyId as string,
          tweetId,
          text,
          tweetImageUrls as string[]
        );
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Reply was updated.");
        }
      } else {
        // If there's neither text nor image, throw an error
        if (!text && !tweetImageUrls) {
          throw new Error("Tweet must contain text or an image.");
        }

        // If there's text, validate it
        if (text && text.trim().length > 0) {
          tweetTextSchema.parse(text);
        }

        const res = await updateTweet(
          tweetId,
          text,
          tweetImageUrls as string[],
          tweetVideoUrls as string[]
        );
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Tweet was updated.");
        }
      }
      setEdit(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage);
      } else {
        toast.error(String(error));
      }
    }
  };

  const handleSubmit = () => {
    handleEdit(id as string, text as string);
  };

  const handleDelete = async () => {
    if (replyId) {
      const res = await deleteReply(id as string, replyId);
      if (res?.message) {
        toast.error(res?.message);
      } else {
        toast.success("Reply was deleted.");
      }
    } else {
      const res = await deleteTweet(id as string);
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Tweet was deleted.");
      }
    }
  };

  const isOwner = user?.id === tweet?.userId || reply?.userId;

  return {
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
  };
};

export default useMoreButtonLogic;

"use client";

import { deleteReply, editReply } from "@/actions/reply.actions";
import { deleteTweet, updateTweet } from "@/actions/tweet.actions";
import { IMoreButtonProps } from "@/types/tweet.interface";
import { combineUsername } from "@/utils/combineUsername";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { tweetTextSchema } from "@/utils/lib/validation";
import { z } from "zod";

const useMoreButtonLogic = ({
  id,
  reply,
  tweet,
  replyId,
  replyTweet,
}: IMoreButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [text, setText] = useState<string | null>(
    replyTweet ? replyTweet : tweet.text
  );

  const [edit, setEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(
    replyTweet ? (reply?.image as string) : tweet.image
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const { user } = useKindeBrowserClient();

  const fullUsername =
    user && combineUsername(user?.given_name, user?.family_name);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleEdit = async (tweetId: string, text: string) => {
    try {
      if (replyId) {
        const res = await editReply(
          replyId as string,
          tweetId,
          text,
          imageUrl as string
        );
        if (res?.message) {
          toast.error(res.message);
        } else {
          toast.success("Reply was updated.");
        }
      } else {
        // If there's neither text nor image, throw an error
        if (!text && !imageUrl) {
          throw new Error("Tweet must contain text or an image.");
        }

        // If there's text, validate it
        if (text && text.trim().length > 0) {
          tweetTextSchema.parse(text);
        }
        const res = await updateTweet(tweetId, text, imageUrl as string);
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
    handleEdit(id, text as string);
  };

  const handleDelete = async () => {
    if (replyId) {
      const res = await deleteReply(id, replyId);
      if (res?.message) {
        toast.error(res?.message);
      } else {
        toast.success("Reply was deleted.");
      }
    } else {
      const res = await deleteTweet(id);
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Tweet was deleted.");
      }
    }
  };

  const isOwner = user?.id === tweet.userId || reply?.userId;
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
    setImageUrl,
    imageUrl,
    handleSubmit,
  };
};

export default useMoreButtonLogic;

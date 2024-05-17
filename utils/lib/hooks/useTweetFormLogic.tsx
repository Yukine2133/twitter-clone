"use client";

import { RefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { createTweet } from "@/actions/tweet.actions";
import { tweetTextSchema } from "@/utils/lib/validation";
import { replyTweet } from "@/actions/reply.actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  createTweetAsync,
  replyTweetAsync,
} from "@/store/slices/tweetFormSlice";

const useTweetFormLogic = ({
  toggleModal,
  id,
  ref,
}: {
  toggleModal?: (arg0: boolean) => void;
  id?: string;
  ref: RefObject<HTMLFormElement>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.tweetForm);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      formData.append("text", text || "");
      formData.append("image", imageUrl || "");
      formData.append("video", videoUrl || "");

      const hasImageUrl = !!imageUrl;
      const hasVideoUrl = !!videoUrl;

      // If there's neither text nor image, throw an error
      if (!text && !hasImageUrl && !hasVideoUrl) {
        throw new Error("Tweet must contain text or an image.");
      }

      // If there's text, validate it
      if (text && text.trim().length > 0) {
        tweetTextSchema.parse(text);
      }
      if (id) {
        dispatch(replyTweetAsync({ formData, id }));
      } else {
        dispatch(createTweetAsync(formData));
      }
      if (error) {
        toast.error(error);
      } else {
        toast.success(id ? "Reply was added." : "Tweet was created.");
      }
      ref.current?.reset();
      setText(null);
      toggleModal && toggleModal(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0].message;
        toast.error(errorMessage);
      } else {
        toast.error(String(error));
      }
    } finally {
      setImageUrl(null);
      setVideoUrl(null);
    }
  };

  return {
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
    setText,
    text,
  };
};

export default useTweetFormLogic;

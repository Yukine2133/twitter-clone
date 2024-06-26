"use client";

import { RefObject, useRef, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { createTweet } from "@/actions/tweet.actions";
import { tweetTextSchema } from "@/utils/lib/validation";
import { replyTweet } from "@/actions/reply.actions";

const useTweetFormLogic = ({
  toggleModal,
  id,
  ref,
}: {
  toggleModal?: (arg0: boolean) => void;
  id?: string;
  ref: RefObject<HTMLFormElement>;
}) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [text, setText] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      formData.append("text", text || "");

      imageUrls.forEach((imageUrl, index) => {
        formData.append(`images`, imageUrl);
      });
      formData.append("video", videoUrl || "");

      const hasImageUrls = imageUrls.length > 0;
      const hasVideoUrl = !!videoUrl;

      if (!text && !hasImageUrls && !hasVideoUrl) {
        throw new Error("Tweet must contain text or an image.");
      }

      if (text && text.trim().length > 0) {
        tweetTextSchema.parse(text);
      }

      let res;
      if (id) {
        res = await replyTweet(formData, id);
      } else {
        res = await createTweet(formData);
      }

      if (res.error) {
        toast.error(res.error);
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
      setLoading(false);
      setImageUrls([]);
      setVideoUrl(null);
    }
  };

  return {
    ref,
    handleSubmit,
    imageUrls,
    setImageUrls,
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

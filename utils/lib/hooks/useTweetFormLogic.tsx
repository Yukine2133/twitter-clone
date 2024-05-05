"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { createTweet } from "@/actions/tweet.actions";
import { tweetTextSchema } from "@/utils/lib/validation";
import { replyTweet } from "@/actions/reply.actions";

const useTweetFormLogic = ({
  toggleModal,
  id,
}: {
  toggleModal?: (arg0: boolean) => void;
  id?: string;
}) => {
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const tweetText = formData.get("text") as string;
      formData.append("image", imageUrl || "");
      formData.append("video", videoUrl || "");

      const hasImageUrl = !!imageUrl;
      const hasVideoUrl = !!videoUrl;

      // If there's neither text nor image, throw an error
      if (!tweetText && !hasImageUrl && !hasVideoUrl) {
        throw new Error("Tweet must contain text or an image.");
      }

      // If there's text, validate it
      if (tweetText && tweetText.trim().length > 0) {
        tweetTextSchema.parse(tweetText);
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
      setImageUrl(null);
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
  };
};

export default useTweetFormLogic;

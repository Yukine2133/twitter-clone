"use client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { z } from "zod";

import { UploadDropzone } from "@/utils/lib/uploadthing";
import { createTweet } from "@/actions/tweet.actions";
import {
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import { tweetTextSchema } from "@/utils/lib/validation";
import Modal from "./Modal";
import { replyTweet } from "@/actions/reply.actions";

const TweetForm = ({
  user,
  id,
  toggleModal,
}: {
  user: any;
  id?: string;
  toggleModal?: (arg0: boolean) => void;
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

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={` mt-1 p-3 ${!id && "border-b border-[#2f3336]"} `} // If id property not passed then apply border
    >
      <div className="flex items-start gap-2 mt-1">
        <Image
          src={user?.avatar!}
          alt={user?.username!}
          width={48}
          height={48}
          className="rounded-full"
        />
        <ReactTextareaAutosize
          name="text"
          maxRows={6}
          maxLength={280}
          wrap="soft"
          placeholder={id ? "Post your reply" : "What is happening?!"}
          className="bg-transparent overflow-auto  resize-none placeholder:text-zinc-600 outline-none w-full"
        />
      </div>
      {imageUrl && (
        <div className="mt-4 relative flex justify-center items-center">
          <button className="absolute top-0 left-8">
            <XMarkIcon onClick={() => setImageUrl(null)} className="h-5 w-5" />
          </button>
          <Image
            className="rounded-lg w-fit object-cover"
            src={imageUrl}
            alt="Uploaded image "
            width={300}
            height={300}
          />
        </div>
      )}
      {videoUrl && (
        <div className="mt-4 relative flex justify-center items-center">
          <button className="absolute top-0 left-2">
            <XMarkIcon onClick={() => setVideoUrl(null)} className="h-5 w-5" />
          </button>
          <video
            className="rounded-lg "
            width={500}
            height={500}
            controls
            src={videoUrl}
          />
        </div>
      )}
      <div className="mt-2 flex justify-between items-end px-6">
        <div className="flex gap-2 items-center">
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <PhotoIcon className="h-5 w-5 text-blue-500" />
          </button>
          <button type="button" onClick={() => setIsOpenVideo(true)}>
            <VideoCameraIcon className="h-5 w-5 text-blue-500" />
          </button>
        </div>
        <button
          disabled={loading}
          className="bg-blue-500 rounded-full px-3 py-1 hover:opacity-80   font-semibold "
          type="submit"
        >
          {id ? "Reply" : "Tweet"}
        </button>
      </div>
      {isOpen && (
        <Modal isModalOpen={isOpen} toggleModal={setIsOpen}>
          <UploadDropzone
            endpoint={"media"}
            onClientUploadComplete={(res) => {
              if (res?.[0].url) {
                setImageUrl(res[0].url);
                setIsOpen(false);
                toast.success("Image was added successfully.");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(String(error));
            }}
          />
        </Modal>
      )}
      {isOpenVideo && (
        <Modal isModalOpen={isOpenVideo} toggleModal={setIsOpenVideo}>
          <UploadDropzone
            endpoint={"video"}
            onClientUploadComplete={(res) => {
              if (res?.[0].url) {
                setVideoUrl(res[0].url);
                setIsOpenVideo(false);
                toast.success("Video was added successfully.");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(String(error));
            }}
          />
        </Modal>
      )}
    </form>
  );
};

export default TweetForm;

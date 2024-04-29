"use client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { z } from "zod";

import { UploadDropzone } from "@/utils/lib/uploadthing";
import { createTweet, replyTweet } from "@/actions/tweet.actions";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import { tweetTextSchema } from "@/utils/lib/validation";

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
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const tweetText = formData.get("text") as string;
      formData.append("image", imageUrl || "");

      const hasImageUrl = !!imageUrl;

      // If there's neither text nor image, throw an error
      if (!tweetText && !hasImageUrl) {
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
      <div className="mt-2 flex justify-between items-end px-6">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <PhotoIcon className="h-5 w-5 text-blue-500" />
        </button>
        <button
          disabled={loading}
          className="bg-blue-500 rounded-full px-3 py-1 hover:opacity-80   font-semibold "
          type="submit"
        >
          {id ? "Reply" : "Tweet"}
        </button>
      </div>
      {isOpen && (
        <div className="fixed  top-0 left-0 z-50 w-full h-full bg-gray-800 bg-opacity-80 flex justify-center items-center">
          <div className="bg-black shadow-sm w-[700px] rounded-lg mx-2 md:mx-0 p-5 md:p-8">
            <h6
              className="cursor-pointer text-slate-500 flex justify-end"
              onClick={() => setIsOpen(false)}
            >
              X
            </h6>
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
          </div>
        </div>
      )}
    </form>
  );
};

export default TweetForm;

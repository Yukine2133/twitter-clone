"use client";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { z } from "zod";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { createTweet, replyTweet } from "@/actions/tweet.actions";

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
      const tweetTextSchema = z
        .string()
        .min(2, "Tweet must be at least 2 characters long")
        .max(280, "Tweet must not exceed the 280 characters limit");
      tweetTextSchema.parse(tweetText);

      // Append image URL to the form data
      formData.append("image", imageUrl || "");

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
        console.error(error);
        toast.error("An unexpected error occurred.");
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
      className={` mt-1 p-3 ${!id && "border-y border-[#2f3336]"} `} // If id property not passed then apply border
    >
      <div className="flex gap-2 mt-1">
        <Image
          src={user?.avatar!}
          alt={user?.username!}
          width={48}
          height={48}
          className="rounded-full"
        />
        <input
          type="text"
          name="text"
          placeholder={id ? "Post your reply" : "What is happening?!"}
          className="bg-transparent  placeholder:text-zinc-600 outline-none w-full"
        />
      </div>
      <div className="mt-2 flex justify-between items-end px-6">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          <Image src="/image.png" alt="Image icon" width={20} height={20} />
        </button>
        <button
          disabled={loading}
          className="bg-blue-500 rounded-full px-3 py-1  font-semibold "
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

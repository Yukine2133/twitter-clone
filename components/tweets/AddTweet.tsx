"use client";

import { createTweet } from "@/actions/tweet.actions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { z } from "zod";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  UploadButton,
  UploadDropzone,
  useUploadThing,
} from "@/utils/lib/uploadthing";

const AddTweet = ({ user }: { user: KindeUser }) => {
  const ref = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const addTweet = async (formData: FormData) => {
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

      const res = await createTweet(formData);
      if (res.message) {
        toast.error(res.message);
      } else {
        toast.success("Tweet was created.");
      }
      ref.current?.reset();
      setImageUrl(null);
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
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={(event) => {
        event.preventDefault();
        addTweet(new FormData(event.currentTarget));
      }}
      className="border-y mt-1 p-3 border-[#2f3336]"
    >
      <div className="flex gap-2 mt-1">
        <Image
          src={user?.picture!}
          alt={user?.given_name!}
          width={48}
          height={48}
          className="rounded-full"
        />

        <input
          type="text"
          name="text"
          placeholder="What is happening?!"
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
          Tweet
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
                console.error("Ooops something is wrong", error);
              }}
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default AddTweet;

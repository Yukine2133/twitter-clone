"use client";

import { replyTweet } from "@/actions/tweet.actions";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as z from "zod";

interface IReplyForm {
  id: string;
  toggleModal?: (arg0: boolean) => void;
  user: KindeUser;
}

const ReplyForm = ({ id, toggleModal, user }: IReplyForm) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleReplyTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const text = formData.get("text") as string;
      formData.append("image", imageUrl || "");
      const textSchema = z
        .string()
        .min(2, "Reply must be at least 2 characters long")
        .max(280, "Reply must not exceed the 280 characters limit");
      textSchema.parse(text);

      const res = await replyTweet(formData, id);
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Reply was added.");
      }
      formRef.current?.reset();
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
    }
  };

  return (
    <form onSubmit={handleReplyTweet} ref={formRef} className=" mt-1 p-3 ">
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
          placeholder="Post your reply"
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
          Reply
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

export default ReplyForm;

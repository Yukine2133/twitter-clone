"use client";

import { replyTweet } from "@/actions/tweet.actions";
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

  const handleReplyTweet = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    try {
      setLoading(true);
      const text = formData.get("text") as string;
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
        <button>Image</button>
        <button
          disabled={loading}
          className="bg-blue-500 rounded-full px-3 py-1  font-semibold "
          type="submit"
        >
          Reply
        </button>
      </div>
    </form>
  );
};

export default ReplyForm;

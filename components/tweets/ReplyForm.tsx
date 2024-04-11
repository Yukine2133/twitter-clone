"use client";

import { replyTweet } from "@/actions/tweet.actions";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import Image from "next/image";
import { useRef } from "react";
import { toast } from "react-toastify";

interface IReplyForm {
  id: string;
  toggleModal?: (arg0: boolean) => void;
  user: KindeUser;
}

const ReplyForm = ({ id, toggleModal, user }: IReplyForm) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleReplyTweet = async (formData: FormData) => {
    const res = await replyTweet(formData, id);
    if (res?.message) {
      toast.error(res.message);
    } else {
      toast.success("Reply was added.");
    }
    formRef.current?.reset();
    toggleModal && toggleModal(false);
  };

  return (
    <form ref={formRef} action={handleReplyTweet} className=" mt-1 p-3 ">
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

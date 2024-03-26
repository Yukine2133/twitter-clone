"use client";

import { createTweet } from "@/lib/actions/tweet.actions";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { useRef } from "react";

const AddTweet = () => {
  const { user } = useKindeBrowserClient();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <form
      ref={ref}
      action={async (formData) => {
        await createTweet(formData);
        ref.current?.reset();
      }}
      className="border-y mt-1 p-3 border-[#2f3336]"
    >
      <div className="flex gap-2 mt-1">
        <Image
          src={user?.picture!}
          alt={user?.given_name!}
          width={34}
          height={34}
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
        <button>Image</button>
        <button
          className="bg-blue-500 rounded-full px-3 py-1  font-semibold "
          type="submit"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default AddTweet;

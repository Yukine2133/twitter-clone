"use server";

import { fetchUser } from "@/actions/user.actions";
import MessageForm from "@/components/messages/MessageForm";
import Image from "next/image";

const MessageWithTheUser = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const username = params.username;
  const recipient = await fetchUser(undefined, username);

  return (
    <div className=" h-[5000px]">
      <div className="flex border-b pb-2 border-[#2f3336] w-[620px] fixed top-4 items-center gap-3 ">
        <Image
          src={recipient.avatar}
          alt="Recipient avatar"
          width={50}
          height={50}
          className="rounded-full "
        />
        <div>
          <h2 className="font-semibold  mb-1">{recipient.displayName}</h2>
          <h2 className=" text-gray-500 text-sm">@{recipient.username}</h2>
        </div>
      </div>
      <MessageForm recipientUserId={recipient._id} />
    </div>
  );
};

export default MessageWithTheUser;

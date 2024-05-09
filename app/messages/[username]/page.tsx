"use server";

import { getMessages } from "@/actions/message.actions";
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
  const getConversationMessages = await getMessages(recipient._id);

  console.log(getConversationMessages);

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
      {getConversationMessages.map((message) => (
        <div key={message._id}>
          <h1>{message.content}</h1>
        </div>
      ))}
      <MessageForm recipientUserId={recipient._id} />
    </div>
  );
};

export default MessageWithTheUser;

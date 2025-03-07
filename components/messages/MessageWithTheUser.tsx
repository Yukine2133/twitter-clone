"use client";

import type { IMessage } from "@/interfaces/message.interface";
import Image from "next/image";
import MessageForm from "@/components/messages/MessageForm";
import GoBackButton from "@/components/buttons/GoBackButton";
import Link from "next/link";
import MessageCard from "@/components/messages/MessageCard";
import AutoScrollMessages from "@/components/messages/AutoScrollMessages";
import { IUser } from "@/interfaces/user.interface";
import useRealTimeMessages from "@/hooks/useRealTimeMessages";

const MessageWithTheUser = ({
  initialMessages,
  recipientId,
  currentUser,
  recipient,
}: {
  initialMessages: IMessage[];
  recipientId: string;
  currentUser: IUser;
  recipient: IUser;
}) => {
  const { messages, isTyping } = useRealTimeMessages(
    initialMessages,
    recipientId,
    currentUser._id
  );
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-black px-4 py-3 border-b border-neutral-800 sticky top-0 z-10 flex items-center gap-4">
        <GoBackButton />
        <Link
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          href={`/profile/${recipient.username}`}
        >
          <Image
            src={recipient.avatar}
            alt={recipient.displayName}
            width={40}
            height={40}
            className="rounded-full max-h-10 object-cover"
          />
          <div>
            <h2 className="font-bold text-lg">{recipient.displayName}</h2>
            <p className="text-neutral-500 text-sm">@{recipient.username}</p>
          </div>
        </Link>
      </header>

      <AutoScrollMessages>
        <div className="flex-grow p-4 space-y-4">
          {messages.map((message: IMessage) => {
            return (
              <MessageCard
                key={message._id}
                message={message}
                recipientId={recipientId}
                currentUserId={currentUser._id}
                isCurrentUserSender={
                  message.sender.userId === currentUser?.userId
                }
              />
            );
          })}
          {isTyping && (
            <div className="text-neutral-500 text-sm">
              {recipient.displayName} is typing...
            </div>
          )}
        </div>
      </AutoScrollMessages>

      <MessageForm
        currentUserId={currentUser._id}
        recipientUserId={recipientId}
      />
    </div>
  );
};

export default MessageWithTheUser;

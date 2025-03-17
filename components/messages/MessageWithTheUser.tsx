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
import { VerifiedBadge } from "../badges/VerifiedBadge";
import AdminBadge from "../badges/AdminBadge";
import { EnvelopeIcon } from "@heroicons/react/24/solid";

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
          href={`/profile/${recipient.username}?userId=${recipient.userId}`}
        >
          <Image
            src={recipient.avatar}
            alt={recipient.displayName}
            width={40}
            height={40}
            className="rounded-full max-h-10 object-cover"
          />
          <div>
            <div className="flex items-center gap-1">
              <h2 className="font-bold text-lg">{recipient.displayName}</h2>
              {recipient.isAdmin && <AdminBadge />}
              {!recipient.isAdmin && (
                <VerifiedBadge isSubscribed={recipient.isSubscribed} />
              )}
            </div>
            <p className="text-neutral-500 text-sm">@{recipient.username}</p>
          </div>
        </Link>
      </header>

      <AutoScrollMessages>
        <div className="flex-grow p-4 space-y-4">
          {messages.length > 0 ? (
            <>
              {messages.map((message: IMessage) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  recipientId={recipientId}
                  currentUserId={currentUser._id}
                  isCurrentUserSender={
                    message.sender.userId === currentUser?.userId
                  }
                />
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="bg-blue-500/10 p-4 rounded-full mb-4">
                <EnvelopeIcon className="size-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">No messages yet</h3>
              <p className="text-neutral-500 max-w-sm">
                Start a conversation with {recipient.displayName}. Say hello or
                share something interesting!
              </p>
            </div>
          )}
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

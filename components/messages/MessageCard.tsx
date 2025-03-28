"use client";

import type { IMessage } from "@/interfaces/message.interface";
import { formatMessageCreatedAt } from "@/utils/formatTimestamp";
import Image from "next/image";
import MoreButtonMessage from "./moreButton/MoreButtonMessage";

const MessageCard = ({
  message,
  isCurrentUserSender,
  recipientId,
  currentUserId,
}: {
  message: IMessage;
  isCurrentUserSender: boolean;
  recipientId: string;
  currentUserId: string;
}) => {
  return (
    <div
      className={`flex  ${
        isCurrentUserSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`group flex flex-col ${
          isCurrentUserSender ? "items-end" : "items-start"
        }`}
      >
        {message.image && (
          <Image
            src={message.image || "/placeholder.svg"}
            alt="Message image"
            width={270}
            height={270}
            className="rounded-lg mb-2"
          />
        )}
        {message.content && (
          <div className="flex relative items-center gap-2">
            {isCurrentUserSender && (
              <MoreButtonMessage
                messageId={message._id.toString()}
                message={message}
                recipientId={recipientId}
                currentUserId={currentUserId}
              />
            )}
            <div
              className={`rounded-2xl px-4 py-2 mb-1 ${
                isCurrentUserSender
                  ? "bg-blue-500 text-white"
                  : "bg-neutral-800 text-white"
              }`}
            >
              <p style={{ overflowWrap: "anywhere" }} className="break-words">
                {message.content}
              </p>
            </div>
          </div>
        )}
        <div
          className={`flex mt-1 items-center ${
            isCurrentUserSender ? "justify-end" : "justify-start"
          } gap-2 text-xs text-neutral-500`}
        >
          {message.isEdited && <span>• Edited</span>}

          <span>{formatMessageCreatedAt(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;

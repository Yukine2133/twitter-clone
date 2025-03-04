"use client";

import type { IMessage } from "@/interfaces/message.interface";
import { formatMessageCreatedAt } from "@/utils/formatTimestamp";
import Image from "next/image";
import MoreButton from "../buttons/moreButton/MoreButton";

const MessageCard = ({
  message,
  isCurrentUserSender,
}: {
  message: IMessage;
  isCurrentUserSender: boolean;
}) => {
  return (
    <div
      className={`flex group ${
        isCurrentUserSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] ${
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
              <MoreButton
                messageId={message._id.toString()}
                message={message}
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

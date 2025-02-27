"use client";

import { IMessage } from "@/interfaces/message.interface";
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
      className={`flex mt-4 group px-2 md:px-3  ${
        isCurrentUserSender ? "justify-end " : "justify-start"
      }`}
    >
      <div>
        {message.image && (
          <Image
            src={message.image}
            alt="Image"
            width={270}
            height={270}
            className={`rounded-lg flex justify-end ${
              isCurrentUserSender ? "ml-auto" : ""
            }`}
          />
        )}
        <div className="flex items-center   gap-2">
          <div className="relative ">
            {isCurrentUserSender && (
              <MoreButton
                messageId={message._id.toString() as string}
                message={message}
              />
            )}
          </div>
          {message.content && (
            <div
              className={`bg-blue-500 max-w-[290px]  rounded-xl px-2 py-1 my-2 text-[15px] ${
                isCurrentUserSender ? "ml-auto" : "bg-zinc-900"
              }`}
            >
              <h3 style={{ overflowWrap: "anywhere" }}>{message.content}</h3>
            </div>
          )}
        </div>
        <div
          className={`flex gap-1 items-center text-[13px] text-zinc-600  ${
            isCurrentUserSender ? "ml-auto flex justify-end" : ""
          }`}
        >
          <p>{formatMessageCreatedAt(message.createdAt)}</p>
          {message.isEdited && (
            <>
              <span className="text-sm">&middot;</span>
              <p>Edited</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageCard;

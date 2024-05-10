"use client";

import { sendMessage } from "@/actions/message.actions";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";

const MessageForm = ({ recipientUserId }: { recipientUserId: string }) => {
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      formData.append("content", content);
      await sendMessage(recipientUserId, formData);
      setContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="fixed bottom-0 bg-black border-t border-[#2f3336] w-[620px] py-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#202327] flex gap-2 justify-between items-center w-full rounded-xl p-3"
      >
        <ReactTextareaAutosize
          maxRows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-transparent outline-none w-full resize-none placeholder:text-zinc-500"
          placeholder="Send a message"
        />
        <button type="submit">
          <PaperAirplaneIcon className="text-blue-500 h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageForm;

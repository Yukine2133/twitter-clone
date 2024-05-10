"use client";

import { deleteMessage } from "@/actions/message.actions";
import { TrashIcon } from "@heroicons/react/24/outline";

const DeleteMessageButton = ({ messageId }: { messageId: string }) => {
  const handleClick = async () => {
    try {
      await deleteMessage(messageId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button onClick={handleClick}>
      <TrashIcon className="w-5 h-5" />
    </button>
  );
};

export default DeleteMessageButton;

"use client";

import { deleteMessage } from "@/actions/message.actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

const DeleteMessageButton = ({ messageId }: { messageId: string }) => {
  const handleClick = async () => {
    try {
      const res = await deleteMessage(messageId);
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Message deleted successfully");
      }
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

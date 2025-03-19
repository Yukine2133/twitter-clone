import React from "react";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteMessage, editMessage } from "@/actions/message.actions";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutside";
import { useUser } from "@clerk/nextjs";
import { IMoreButtonMessageProps } from "@/interfaces/message.interface";
export const useMoreButtonMessage = ({
  message,
  messageId,
  recipientId,
  currentUserId,
}: IMoreButtonMessageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(message?.content || "");
  const [imageUrl, setImageUrl] = useState(message?.image || "");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  useMoreButtonClickOutside(buttonRef, setIsOpen);

  const { user } = useUser();

  const isOwner = user?.id === message.sender.userId;

  const handleDelete = async () => {
    try {
      const res = await deleteMessage(messageId, recipientId, currentUserId);
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await editMessage(
        messageId,
        text,
        imageUrl,
        recipientId,
        currentUserId
      );
      if (res?.message) {
        toast.error(res.message);
      } else {
        toast.success("Message updated successfully.");
      }
      setEdit(false);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    isOpen,
    setIsOpen,
    isOwner,
    buttonRef,
    handleDelete,
    handleSubmit,
    edit,
    setEdit,
    text,
    setText,
    imageUrl,
    setImageUrl,
  };
};

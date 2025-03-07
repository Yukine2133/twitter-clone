import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { deleteMessage, editMessage } from "@/actions/message.actions";
import Modal from "../../tweets/Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import MoreButtonMessageMediaUpload from "./MoreButtonMessageMediaUpload";
import { IMessage } from "@/interfaces/message.interface";
import { useUser } from "@clerk/nextjs";
import { useMoreButtonClickOutside } from "@/hooks/useClickOutisde";

interface IMoreButtonMessageProps {
  messageId: string;
  message: IMessage;
  recipientId: string;
  currentUserId: string;
}

const MoreButtonMessage = ({
  messageId,
  message,
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

  return (
    <>
      {isOwner && (
        <>
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-blue-500/10 hover:text-blue-500 lg:opacity-0 group-hover:opacity-100"
          >
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </button>
          {isOpen && (
            <div className="absolute z-10 min-w-[180px] rounded-xl bg-black shadow-lg ring-1 ring-white/10 right-0 top-0">
              <div className="py-1">
                <button
                  onClick={() => setEdit(true)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10"
                >
                  <PencilIcon className="h-5 w-5 text-blue-500" />
                  <span className="text-white">Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors hover:bg-white/10"
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                  <span className="text-red-500">Delete</span>
                </button>
              </div>
            </div>
          )}
          {edit && (
            <Modal isModalOpen={edit} toggleModal={setEdit}>
              <div className="space-y-4 p-4">
                <ReactTextareaAutosize
                  maxRows={6}
                  value={text}
                  maxLength={280}
                  wrap="soft"
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-800 bg-transparent p-4 outline-none transition-colors focus:border-neutral-600"
                />
                <MoreButtonMessageMediaUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-full bg-blue-500 px-4 py-2 font-bold transition-colors hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default MoreButtonMessage;

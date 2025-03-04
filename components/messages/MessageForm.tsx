"use client";

import {
  PaperAirplaneIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import Image from "next/image";
import useMessageForm from "@/hooks/useMessageForm";
import { useEffect, useState } from "react";
import { triggerTypingEvent } from "@/actions/message.actions";

const MessageForm = ({
  recipientUserId,
  currentUserId,
}: {
  recipientUserId: string;
  currentUserId: string;
}) => {
  const {
    content,
    setContent,
    imageUrl,
    setImageUrl,
    isOpen,
    setIsOpen,
    handleSubmit,
    handleKeyDown,
  } = useMessageForm({ recipientUserId });

  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Create the shared channel name
  const channelName = [currentUserId, recipientUserId].sort().join("-");

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      // Trigger "typing" event via server action
      triggerTypingEvent(channelName, currentUserId, true);
    }

    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to trigger "stopped typing" after 2 seconds of inactivity
    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
        // Trigger "stopped typing" event via server action
        triggerTypingEvent(channelName, currentUserId, false);
      }, 2000)
    );
  };

  return (
    <>
      <div className="sticky bottom-0 bg-black border-t border-neutral-800 pb-[calc(1rem+60px)] min-[800px]:p-4">
        <form className="bg-neutral-900 rounded-2xl p-3">
          {imageUrl && (
            <div className="relative mb-3">
              <button
                type="button"
                onClick={() => setImageUrl(null)}
                className="absolute -top-2 -left-2 bg-neutral-800 rounded-full p-1"
              >
                <XMarkIcon className="h-4 w-4 text-white" />
              </button>
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt="Upload preview"
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors"
            >
              <PhotoIcon className="h-5 w-5" />
            </button>
            <ReactTextareaAutosize
              maxRows={5}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                handleTyping(); // Trigger typing event
              }}
              onKeyDown={handleKeyDown}
              className="bg-transparent flex-grow outline-none resize-none placeholder:text-neutral-500"
              placeholder="Send a message"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
      {isOpen && (
        <Modal isModalOpen={isOpen} toggleModal={setIsOpen}>
          <UploadDropzone
            endpoint="messageMedia"
            onClientUploadComplete={(res) => {
              if (res?.[0].url) {
                setImageUrl(res[0].url);
                setIsOpen(false);
                toast.success("Image was added successfully.");
              }
            }}
            onUploadError={(error: Error) => {
              toast.error(String(error));
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default MessageForm;

"use client";

import {
  PaperAirplaneIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import Image from "next/image";
import useMessageForm from "@/hooks/useMessageForm";

const MessageForm = ({ recipientUserId }: { recipientUserId: string }) => {
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
  return (
    <>
      <div className="px-2 md:px-4 fixed bottom-12 min-[800px]:bottom-0 w-full pb-2 sm:w-[640px]  z-10  bg-black border-t border-[#2f3336]  pt-4">
        <form className="bg-[#202327]  w-full rounded-xl p-3">
          {imageUrl && (
            <div className="my-4 relative flex items-center">
              <button className="absolute -top-6 -left-2">
                <XMarkIcon
                  onClick={() => setImageUrl(null)}
                  className="h-5 w-5"
                />
              </button>
              <Image
                className="rounded-lg w-fit object-cover"
                src={imageUrl}
                alt="Uploaded image "
                width={150}
                height={150}
              />
            </div>
          )}
          <div className="flex gap-2 justify-between items-center">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <PhotoIcon className="h-5 w-5 text-blue-500" />
            </button>
            <ReactTextareaAutosize
              maxRows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent h-6 outline-none w-full resize-none placeholder:text-zinc-500"
              placeholder="Send a message"
            />
            <button type="button" onClick={handleSubmit}>
              <PaperAirplaneIcon className="text-blue-500 h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
      {isOpen && (
        <Modal isModalOpen={isOpen} toggleModal={setIsOpen}>
          <UploadDropzone
            endpoint={"messageMedia"}
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

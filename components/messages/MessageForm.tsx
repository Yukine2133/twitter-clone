"use client";

import { sendMessage } from "@/actions/message.actions";
import {
  PaperAirplaneIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import Modal from "../tweets/Modal";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import Image from "next/image";

const MessageForm = ({ recipientUserId }: { recipientUserId: string }) => {
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const hasImageUrl = !!imageUrl;

      // If there's neither text nor image, throw an error
      if (!content && !hasImageUrl) {
        throw new Error("Message must contain text or an image.");
      }
      formData.append("content", content);
      formData.append("image", imageUrl as string);
      const res = await sendMessage(recipientUserId, formData);
      if (res?.message) {
        toast.error(res.message);
      }

      setContent("");
      setImageUrl(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <div className="fixed bottom-0 bg-black border-t border-[#2f3336] w-[620px] py-4">
        <form
          onSubmit={handleSubmit}
          className="bg-[#202327]  w-full rounded-xl p-3"
        >
          {imageUrl && (
            <div className="my-4 relative flex items-center">
              <button className="absolute -top-6 -left-2">
                <XMarkIcon
                  onClick={() => setImageUrl(null)}
                  className="h-5 w-5"
                />
              </button>
              <Image
                className="rounded-lg w-auto object-cover"
                src={imageUrl}
                alt="Uploaded image "
                width={300}
                height={300}
              />
            </div>
          )}
          <div className="flex gap-2 justify-between items-center">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <PhotoIcon className="h-5 w-5 text-blue-500" />
            </button>
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
          </div>
        </form>
      </div>
      {isOpen && (
        <Modal isModalOpen={isOpen} toggleModal={setIsOpen}>
          <UploadDropzone
            endpoint={"media"}
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

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
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      const hasImageUrl = !!imageUrl;

      // If there's neither text nor image, throw an error
      if (!content && !hasImageUrl) {
        throw new Error("Message must contain text or an image.");
      }

      formData.append("content", content);
      if (imageUrl) {
        formData.append("image", imageUrl);
      }

      const res = await sendMessage(recipientUserId, formData);
      if (res?.message) {
        toast.error(res.message);
      }

      setContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setImageUrl(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Check if the pressed key is Enter and not holding down Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline in textarea
      handleSubmit();
    }
  };

  return (
    <>
      <div className="absolute -bottom-8 min-[800px]:-bottom-16 w-full   bg-black border-t border-[#2f3336] pt-4">
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

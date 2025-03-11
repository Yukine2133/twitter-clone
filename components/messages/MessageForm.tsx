"use client";

import {
  PaperAirplaneIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import { toast } from "react-toastify";
import { UploadButton } from "@/utils/lib/uploadthing";
import Image from "next/image";
import useMessageForm from "@/hooks/useMessageForm";
import { handleImageClick } from "@/utils/handleImageClick";
import Loading from "../loaders/Loading";

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
    imageProgress,
    setImageProgress,
    uploadImageButtonRef,
    handleSubmit,
    handleKeyDown,
    handleTyping,
  } = useMessageForm({ recipientUserId, currentUserId });

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
          {imageProgress > 0 && (
            <div className="size-24">
              <Loading />
            </div>
          )}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleImageClick(uploadImageButtonRef)}
              className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors"
            >
              <PhotoIcon className="h-5 w-5" />
            </button>
            <ReactTextareaAutosize
              maxRows={5}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                handleTyping();
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
      <div ref={uploadImageButtonRef}>
        <UploadButton
          className="hidden"
          endpoint="messageMedia"
          onClientUploadComplete={(res: any) => {
            if (res?.[0].url) setImageUrl(res[0].url);
            setImageProgress(0);
          }}
          onUploadProgress={setImageProgress}
          onUploadError={(error: Error) => {
            toast.error(`Upload error: ${error.message}`);
          }}
        />
      </div>
    </>
  );
};

export default MessageForm;

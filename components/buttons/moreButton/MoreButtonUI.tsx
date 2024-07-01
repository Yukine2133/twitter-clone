"use client";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import Modal from "../../tweets/Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import { MutableRefObject } from "react";
import MediaUploadDropZone from "@/components/tweets/media/MediaUploadDropZone";
import MoreButtonMediaUpload from "./MoreButtonTweetMediaUpload";
import MessageMediaUpload from "./MoreButtonMessageMediaUpload";
import TweetMediaUpload from "./MoreButtonTweetMediaUpload";
import MoreButtonMessageMediaUpload from "./MoreButtonMessageMediaUpload";

interface IMoreButtonUIProps {
  isOwner: true | string | undefined;
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  setIsOpen: (arg0: boolean) => void;
  isOpen: boolean;
  setEdit: (arg0: boolean) => void;
  edit: boolean;
  handleDelete: () => void;
  text: string | null;
  setText: (arg0: string) => void;
  setImageUrl: (arg0: string) => void;
  imageUrl: string | null;
  handleSubmit: () => void;
  messageId: string | undefined;
  tweetImageUrls: string[];
  setTweetImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  tweetVideoUrls: string[];
  setTweetVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const MoreButtonUI = ({
  isOwner,
  buttonRef,
  setIsOpen,
  isOpen,
  setEdit,
  edit,
  handleDelete,
  text,
  setText,
  setImageUrl,
  handleSubmit,
  imageUrl,
  messageId,
  setTweetImageUrls,
  tweetImageUrls,
  tweetVideoUrls,
  setTweetVideoUrls,
}: IMoreButtonUIProps) => {
  return (
    <>
      {isOwner && (
        <>
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="rotate-90 text-gray-500 hover:text-blue-400 duration-300 transition-all relative lg:opacity-0 group-hover:opacity-100"
          >
            &#10247;
          </button>
          {isOpen && (
            <div
              className={`${
                messageId ? "top-4 -left-10" : "-top-9 right-3"
              } absolute p-3 z-10 bg-black`}
            >
              <button
                onClick={() => {
                  setEdit(!edit);
                  setIsOpen(false);
                }}
                className="text-blue-500 flex items-center gap-2"
              >
                <PencilIcon className="h-5 w-5" /> Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 flex items-center gap-2"
              >
                <TrashIcon className="h-5 w-5" /> Delete
              </button>
            </div>
          )}
          {edit && (
            <Modal isModalOpen={edit} toggleModal={setEdit}>
              <ReactTextareaAutosize
                maxRows={6}
                value={text as string}
                maxLength={280}
                wrap="soft"
                onChange={(e) => setText(e.target.value)}
                className="bg-transparent border border-gray-800 shadow-sm outline-none rounded-md flex justify-center w-full mx-auto p-2"
              />

              {messageId ? (
                <MoreButtonMessageMediaUpload
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                />
              ) : (
                <MoreButtonMediaUpload
                  tweetImageUrls={tweetImageUrls}
                  setTweetImageUrls={setTweetImageUrls}
                  tweetVideoUrls={tweetVideoUrls}
                  setTweetVideoUrls={setTweetVideoUrls}
                />
              )}

              <button
                onClick={handleSubmit}
                className="px-3 py-2 rounded-md flex justify-center mx-auto bg-blue-600"
              >
                Submit
              </button>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default MoreButtonUI;

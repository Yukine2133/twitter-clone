"use client";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../tweets/Modal";
import ReactTextareaAutosize from "react-textarea-autosize";
import { MutableRefObject } from "react";
import MoreButtonMediaUpload from "./MoreButtonTweetMediaUpload";
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
            className="relative rounded-full p-2 text-neutral-500 transition-colors hover:bg-blue-500/10 hover:text-blue-500 lg:opacity-0 group-hover:opacity-100"
          >
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </button>
          {isOpen && (
            <div
              className={`absolute z-10 min-w-[180px] rounded-xl bg-black shadow-lg ring-1 ring-white/10 ${
                messageId ? "right-0 top-10" : "right-0 top-0"
              }`}
            >
              <div className="py-1">
                <button
                  onClick={() => {
                    setEdit(!edit);
                    setIsOpen(false);
                  }}
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
                  value={text as string}
                  maxLength={280}
                  wrap="soft"
                  onChange={(e) => setText(e.target.value)}
                  className="w-full rounded-2xl border border-neutral-800 bg-transparent p-4 outline-none transition-colors focus:border-neutral-600"
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

export default MoreButtonUI;

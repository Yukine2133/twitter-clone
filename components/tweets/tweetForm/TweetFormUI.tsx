import { forwardRef } from "react";
import Image from "next/image";
import {
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import Modal from "../Modal";
import { IUser } from "@/types/user.interface";
import MediaUploadDropZone from "../MediaUploadDropZone";

interface ITweetFormUIProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  videoUrls: string[];
  setVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setIsOpen: (arg0: boolean) => void;
  isOpen: boolean;
  setIsOpenVideo: (arg0: boolean) => void;
  isOpenVideo: boolean;
  loading: boolean;
  user: IUser;
  id: string | undefined;
  text: string | null;
  setText: (arg0: string | null) => void;
}

const TweetFormUI = forwardRef<HTMLFormElement, ITweetFormUIProps>(
  function TweetFormUI(
    {
      handleSubmit,
      imageUrls,
      setImageUrls,
      videoUrls,
      setVideoUrls,
      setIsOpen,
      isOpen,
      setIsOpenVideo,
      isOpenVideo,
      loading,
      user,
      id,
      text,
      setText,
    },
    ref
  ) {
    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={` mt-1 px-2 md:px-4 p-3 ${
          !id && "border-b border-[#2f3336]"
        } `}
      >
        <div className="flex items-start gap-2 mt-1">
          <Image
            src={user?.avatar!}
            alt={user?.username!}
            width={48}
            height={48}
            className="rounded-full"
          />
          <ReactTextareaAutosize
            onChange={(e) => setText(e.target.value)}
            value={text || ""}
            maxRows={6}
            maxLength={280}
            wrap="soft"
            placeholder={id ? "Post your reply" : "What is happening?!"}
            className="bg-transparent overflow-auto  resize-none placeholder:text-zinc-600 outline-none w-full"
          />
        </div>
        {/* Handle image and video rendering */}
        <div className="grid grid-cols-2 gap-1 ">
          {imageUrls.map((imageUrl, index) => (
            <div
              key={index}
              className="relative mt-4 flex justify-center items-center"
            >
              <button
                type="button"
                className="absolute cursor-pointer right-1 top-1 "
                onClick={() => {
                  setImageUrls(imageUrls.filter((url, i) => i !== index));
                }}
              >
                <XMarkIcon className="h-5 w-5 text-red-600" />
              </button>
              <Image
                className="rounded-lg w-fit object-cover"
                src={imageUrl}
                alt="Uploaded image"
                width={300}
                height={300}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2  gap-1">
          {videoUrls &&
            videoUrls.map((videoUrl, index) => (
              <div
                key={index}
                className="relative mt-4 flex justify-center items-center"
              >
                <button
                  type="button"
                  className="absolute cursor-pointer right-1 top-1 "
                  onClick={(e) => {
                    e.stopPropagation();
                    setVideoUrls(videoUrls.filter((url, i) => i !== index));
                  }}
                >
                  <XMarkIcon className="h-5 w-5 text-red-600" />
                </button>

                <video
                  className="rounded-lg w-fit mt-1"
                  controls
                  src={videoUrl}
                />
              </div>
            ))}
        </div>
        {/* Handle button rendering */}
        <div className="mt-2 flex justify-between items-end px-6">
          <div className="flex gap-2 items-center">
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              <PhotoIcon className="h-5 w-5 text-blue-500" />
            </button>
            <button type="button" onClick={() => setIsOpenVideo(true)}>
              <VideoCameraIcon className="h-5 w-5 text-blue-500" />
            </button>
          </div>
          <button
            disabled={loading}
            className="bg-blue-500 rounded-full px-3 py-1 hover:opacity-80 font-semibold"
            type="submit"
          >
            {id ? "Reply" : "Tweet"}
          </button>
        </div>
        {/* Handle modal rendering */}
        {isOpen && (
          <Modal isModalOpen={isOpen} toggleModal={setIsOpen}>
            <MediaUploadDropZone
              endpoint="media"
              setStateFunction={setImageUrls}
              toastMsgTypeMedia="Images"
              onClose={setIsOpen}
            />
          </Modal>
        )}

        {isOpenVideo && (
          <Modal isModalOpen={isOpenVideo} toggleModal={setIsOpenVideo}>
            <MediaUploadDropZone
              endpoint="video"
              setStateFunction={setVideoUrls}
              toastMsgTypeMedia="Videos"
              onClose={setIsOpenVideo}
            />
          </Modal>
        )}
      </form>
    );
  }
);

TweetFormUI.displayName = "TweetFormUI";

export default TweetFormUI;

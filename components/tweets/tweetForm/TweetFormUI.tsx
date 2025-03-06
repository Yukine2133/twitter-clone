import { forwardRef } from "react";
import Image from "next/image";
import {
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import Modal from "../Modal";
import MediaUploadDropZone from "../media/MediaUploadDropZone";
import { usePathname } from "next/navigation";
import { ITweetFormUIProps } from "@/interfaces/tweet.interface";

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
    const pathname = usePathname();
    return (
      <form
        ref={ref}
        onSubmit={handleSubmit}
        className={` mt-1 px-2 md:px-4 p-3 ${
          !id && "border-b border-[#2f3336]"
        } `}
      >
        {/* If reply and not on tweet page show only the textarea */}
        {id && !pathname.includes("tweet") ? (
          <ReactTextareaAutosize
            onChange={(e) => setText(e.target.value)}
            placeholder="Post your reply"
            value={text || ""}
            maxRows={6}
            maxLength={280}
            wrap="soft"
            className="min-h-[120px] w-full resize-none bg-transparent text-xl placeholder:text-neutral-600 focus:outline-none border-b border-neutral-800  "
          />
        ) : (
          <div className="flex items-start gap-2 mt-1">
            <Image
              src={user?.avatar!}
              alt={user?.username!}
              width={40}
              height={48}
              className="rounded-full max-h-10 object-cover"
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
        )}

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

        {/* Handle tweet buttons */}
        <div className="mt-2 flex justify-between items-center px-6">
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
            className="rounded-full bg-blue-500 px-4 py-1.5 font-bold transition-colors hover:bg-blue-600 disabled:opacity-50"
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

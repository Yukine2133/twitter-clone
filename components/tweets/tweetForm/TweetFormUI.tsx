import { forwardRef } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import {
  PhotoIcon,
  VideoCameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";
import Modal from "../Modal";
import { IUser } from "@/types/user.interface";

interface ITweetFormUIProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  imageUrl: string | null;
  setImageUrl: (arg0: string | null) => void;
  videoUrl: string | null;
  setVideoUrl: (arg0: string | null) => void;
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
      imageUrl,
      setImageUrl,
      videoUrl,
      setVideoUrl,
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
        className={` mt-1 p-3 ${!id && "border-b border-[#2f3336]"} `}
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
        {imageUrl && (
          <div className="mt-4 relative flex justify-center items-center">
            <button className="absolute top-0 left-8">
              <XMarkIcon
                onClick={() => setImageUrl(null)}
                className="h-5 w-5"
              />
            </button>
            <Image
              className="rounded-lg w-fit object-cover"
              src={imageUrl}
              alt="Uploaded image "
              width={300}
              height={300}
            />
          </div>
        )}
        {videoUrl && (
          <div className="mt-4 relative flex justify-center items-center">
            <button className="absolute top-0 left-2">
              <XMarkIcon
                onClick={() => setVideoUrl(null)}
                className="h-5 w-5"
              />
            </button>
            <video
              className="rounded-lg "
              width={500}
              height={500}
              controls
              src={videoUrl}
            />
          </div>
        )}
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
            className="bg-blue-500 rounded-full px-3 py-1 hover:opacity-80   font-semibold "
            type="submit"
          >
            {id ? "Reply" : "Tweet"}
          </button>
        </div>
        {/* Handle modal rendering */}
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
        {isOpenVideo && (
          <Modal isModalOpen={isOpenVideo} toggleModal={setIsOpenVideo}>
            <UploadDropzone
              endpoint={"video"}
              onClientUploadComplete={(res) => {
                if (res?.[0].url) {
                  setVideoUrl(res[0].url);
                  setIsOpenVideo(false);
                  toast.success("Video was added successfully.");
                }
              }}
              onUploadError={(error: Error) => {
                toast.error(String(error));
              }}
            />
          </Modal>
        )}
      </form>
    );
  }
);

TweetFormUI.displayName = "TweetFormUI";

export default TweetFormUI;

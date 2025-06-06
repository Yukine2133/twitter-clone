import { forwardRef } from "react";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ReactTextareaAutosize from "react-textarea-autosize";

import { usePathname } from "next/navigation";
import { ITweetFormUIProps } from "@/interfaces/tweet.interface";
import { TweetFormMediaUpload } from "./TweetFormMediaUpload";
import { MediaSkeleton } from "@/components/loaders/MediaSkeleton";

const TweetFormUI = forwardRef<HTMLFormElement, ITweetFormUIProps>(
  function TweetFormUI(
    {
      handleSubmit,
      imageUrls,
      setImageUrls,
      videoUrls,
      setVideoUrls,
      loading,
      user,
      id,
      text,
      setText,
      uploadVideoButtonRef,
      uploadImageButtonRef,
      imageProgress,
      setImageProgress,
      videoProgress,
      setVideoProgress,
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
          {imageProgress > 0 && (
            <div>
              <MediaSkeleton image />
            </div>
          )}
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
          {videoProgress > 0 && (
            <div>
              <MediaSkeleton />
            </div>
          )}
        </div>

        {/* Handle tweet and media buttons */}

        <div className="mt-2 flex justify-between items-center px-6">
          <TweetFormMediaUpload
            uploadImageButtonRef={uploadImageButtonRef}
            uploadVideoButtonRef={uploadVideoButtonRef}
            setImageUrls={setImageUrls}
            setVideoUrls={setVideoUrls}
            setImageProgress={setImageProgress}
            setVideoProgress={setVideoProgress}
          />
          <button
            disabled={loading}
            className="rounded-full bg-blue-500 px-4 py-1.5 font-bold transition-colors hover:bg-blue-600 disabled:opacity-50"
            type="submit"
          >
            {id ? "Reply" : "Tweet"}
          </button>
        </div>
      </form>
    );
  }
);

TweetFormUI.displayName = "TweetFormUI";

export default TweetFormUI;

import { UploadButton } from "@/utils/lib/uploadthing";
import { toast } from "react-toastify";
import { handleImageClick } from "@/utils/handleImageClick";
import { handleUploadComplete } from "@/utils/handleUploadComplete";

import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/outline";
import { ITweetFormMediaUploadProps } from "@/interfaces/tweet.interface";
export const TweetFormMediaUpload = ({
  uploadImageButtonRef,
  uploadVideoButtonRef,
  setImageUrls,
  setVideoUrls,
  setImageProgress,
  setVideoProgress,
}: ITweetFormMediaUploadProps) => {
  return (
    <>
      <div className="flex gap-2 items-center">
        <button
          type="button"
          onClick={() => handleImageClick(uploadImageButtonRef)}
        >
          <PhotoIcon className="h-5 w-5 text-blue-500" />
        </button>
        <button
          type="button"
          onClick={() => handleImageClick(uploadVideoButtonRef)}
        >
          <VideoCameraIcon className="h-5 w-5 text-blue-500" />
        </button>
      </div>

      {/* Upload Buttons for media */}
      <div ref={uploadImageButtonRef}>
        <UploadButton
          className="hidden"
          endpoint="media"
          onClientUploadComplete={(res: any) => {
            handleUploadComplete({
              res,
              setStateFunction: setImageUrls,
              toastMsgTypeMedia: "Images",
            });
            setImageProgress(0);
          }}
          onUploadProgress={setImageProgress}
          onUploadError={(error: Error) => {
            toast.error(`Upload error: ${error.message}`);
          }}
        />
      </div>
      <div ref={uploadVideoButtonRef}>
        <UploadButton
          className="hidden"
          endpoint="video"
          onClientUploadComplete={(res: any) => {
            handleUploadComplete({
              res,
              setStateFunction: setVideoUrls,
              toastMsgTypeMedia: "Videos",
            });
            setVideoProgress(0);
          }}
          onUploadProgress={setVideoProgress}
          onUploadError={(error: Error) => {
            toast.error(`Upload error: ${error.message}`);
          }}
        />
      </div>
    </>
  );
};

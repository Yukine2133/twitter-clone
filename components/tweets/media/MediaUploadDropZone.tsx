import React from "react";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import { toast } from "react-toastify";
import { IMediaUploadDropZone } from "@/interfaces/tweet.interface";
import { handleUploadComplete } from "@/utils/handleUploadComplete";

const MediaUploadDropZone = ({
  endpoint,
  setStateFunction,
  toastMsgTypeMedia,
}: IMediaUploadDropZone) => {
  return (
    <UploadDropzone
      endpoint={endpoint as "video" | "media"}
      onClientUploadComplete={(res: any) => {
        handleUploadComplete({
          res,
          setStateFunction,
          toastMsgTypeMedia,
        });
      }}
      onUploadError={(error: Error) => {
        toast.error(String(error));
      }}
    />
  );
};

export default MediaUploadDropZone;

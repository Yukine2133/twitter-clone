import React from "react";
import { UploadDropzone } from "@/utils/lib/uploadthing";
import { toast } from "react-toastify";
import { IMediaUploadDropZone } from "@/interfaces/tweet.interface";
import useMediaUploadDropZone from "@/hooks/useMediaUploadDropZone";

const MediaUploadDropZone = ({
  endpoint,
  setStateFunction,
  toastMsgTypeMedia,
  onClose,
}: IMediaUploadDropZone) => {
  const { handleUploadComplete } = useMediaUploadDropZone({
    setStateFunction,
    toastMsgTypeMedia,
    onClose,
  });
  return (
    <UploadDropzone
      endpoint={endpoint as "video" | "media"}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(error: Error) => {
        toast.error(String(error));
      }}
    />
  );
};

export default MediaUploadDropZone;

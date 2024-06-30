import { UploadDropzone } from "@/utils/lib/uploadthing";
import React from "react";
import { toast } from "react-toastify";

interface IMediaUploadDropZone {
  endpoint: "video" | "media";
  setStateFunction: React.Dispatch<React.SetStateAction<string[]>>;
  toastMsgTypeMedia: "Videos" | "Images";
  onClose?: (arg0: boolean) => void | undefined;
}

const MediaUploadDropZone = ({
  endpoint,
  setStateFunction,
  toastMsgTypeMedia,
  onClose,
}: IMediaUploadDropZone) => {
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (res && res.length > 0) {
          setStateFunction((prevUrls: string[]) => [
            ...prevUrls,
            ...res.map((file) => file.url),
          ]);
          onClose?.(false);
          toast.success(`${toastMsgTypeMedia} were added successfully`);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(String(error));
      }}
    />
  );
};

export default MediaUploadDropZone;

import React from "react";
import { UploadDropzone } from "@/utils/lib/uploadthing";
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
  const handleUploadComplete = (res: any) => {
    if (res && res.length > 0) {
      setStateFunction((prevUrls: string[]) => {
        let updatedUrls = [...prevUrls];
        const newImageUrls = res.map((file: any) => file.url);

        // If the total number of images exceeds 4, manage the replacement logic
        if (updatedUrls.length + newImageUrls.length > 4) {
          const excessCount = updatedUrls.length + newImageUrls.length - 4;

          // Remove the excess images from the beginning of the previous URLs
          updatedUrls = updatedUrls.slice(excessCount);

          // Add the new images, but only up to 4 in total
          updatedUrls = [
            ...updatedUrls,
            ...newImageUrls.slice(0, 4 - updatedUrls.length),
          ];
        } else {
          // If total number of images does not exceed 4, simply add the new images
          updatedUrls = [...updatedUrls, ...newImageUrls];
        }

        // Ensure the updated URLs array contains no more than 4 images
        if (updatedUrls.length > 4) {
          updatedUrls = updatedUrls.slice(-4);
        }

        return updatedUrls;
      });

      onClose?.(false);
      toast.success(`${toastMsgTypeMedia} were added successfully`);
    }
  };

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(error: Error) => {
        toast.error(String(error));
      }}
    />
  );
};

export default MediaUploadDropZone;

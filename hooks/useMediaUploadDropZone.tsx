import { IMediaUploadDropZone } from "@/interfaces/tweet.interface";
import { toast } from "react-toastify";

const useMediaUploadDropZone = ({
  setStateFunction,
  toastMsgTypeMedia,
  onClose,
}: IMediaUploadDropZone) => {
  const handleUploadComplete = (res: any) => {
    if (res && res.length > 0) {
      setStateFunction((prevUrls: string[]) => {
        let updatedUrls = [...prevUrls];
        const newMediaUrls = res.map((file: any) => file.url);

        // If the total number of medias exceeds 4, manage the replacement logic
        if (updatedUrls.length + newMediaUrls.length > 4) {
          const excessCount = updatedUrls.length + newMediaUrls.length - 4;

          // Remove the excess media from the beginning of the previous URLs
          updatedUrls = updatedUrls.slice(excessCount);

          // Add the new media, but only up to 4 in total
          updatedUrls = [
            ...updatedUrls,
            ...newMediaUrls.slice(0, 4 - updatedUrls.length),
          ];
        } else {
          // If total number of media does not exceed 4, simply add the new media
          updatedUrls = [...updatedUrls, ...newMediaUrls];
        }

        // Ensure the updated URLs array contains no more than 4 media
        if (updatedUrls.length > 4) {
          updatedUrls = updatedUrls.slice(-4);
        }

        return updatedUrls;
      });

      onClose?.(false);
      toast.success(`${toastMsgTypeMedia} were added successfully`);
    }
  };
  return {
    handleUploadComplete,
  };
};

export default useMediaUploadDropZone;

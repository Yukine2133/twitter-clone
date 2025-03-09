import { toast } from "react-toastify";

interface IHandleUploadCompleteProps {
  res: any;
  setStateFunction: React.Dispatch<React.SetStateAction<string[]>>;
  toastMsgTypeMedia: "Videos" | "Images";
}

export const handleUploadComplete = ({
  res,
  setStateFunction,
  toastMsgTypeMedia,
}: IHandleUploadCompleteProps) => {
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

    toast.success(`${toastMsgTypeMedia} were added successfully`);
  }
};

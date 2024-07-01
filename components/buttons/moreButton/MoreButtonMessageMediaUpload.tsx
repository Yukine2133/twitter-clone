import { UploadDropzone } from "@/utils/lib/uploadthing";
import { toast } from "react-toastify";
import Image from "next/image";

interface MoreButtonMessageMediaUploadProps {
  imageUrl: string | null;
  setImageUrl: (arg0: string) => void;
}

const MoreButtonMessageMediaUpload = ({
  imageUrl,
  setImageUrl,
}: MoreButtonMessageMediaUploadProps) => {
  return (
    <>
      <UploadDropzone
        endpoint={"messageMedia"}
        onClientUploadComplete={(res) => {
          if (res?.[0].url) {
            setImageUrl(res[0].url);
            toast.success("Image was added successfully.");
          }
        }}
        onUploadError={(error: Error) => {
          toast.error(String(error));
        }}
      />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded image"
          width={250}
          height={250}
          className="rounded-lg mx-auto mb-6"
        />
      )}
    </>
  );
};

export default MoreButtonMessageMediaUpload;

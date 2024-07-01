import MediaUploadDropZone from "@/components/tweets/media/MediaUploadDropZone";
import Image from "next/image";

interface MoreButtonTweetMediaUploadProps {
  tweetImageUrls: string[];
  setTweetImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  tweetVideoUrls: string[];
  setTweetVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

const MoreButtonTweetMediaUpload = ({
  tweetImageUrls,
  setTweetImageUrls,
  tweetVideoUrls,
  setTweetVideoUrls,
}: MoreButtonTweetMediaUploadProps) => {
  return (
    <>
      {tweetImageUrls.length > 0 ? (
        <>
          <MediaUploadDropZone
            endpoint="media"
            setStateFunction={setTweetImageUrls}
            toastMsgTypeMedia="Images"
          />
          <div className="grid grid-cols-2 gap-1">
            {tweetImageUrls.map((image) => (
              <Image
                key={image}
                src={image}
                alt="Uploaded image"
                width={250}
                height={250}
                className="rounded-lg mx-auto mb-6"
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <MediaUploadDropZone
            endpoint="video"
            setStateFunction={setTweetVideoUrls}
            toastMsgTypeMedia="Videos"
          />
          <div className="grid grid-cols-2 gap-1">
            {tweetVideoUrls.map((videoUrl, index) => (
              <div
                key={index}
                className="relative mt-4 flex justify-center items-center"
              >
                <video
                  className="rounded-lg w-fit mt-1"
                  controls
                  src={videoUrl}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default MoreButtonTweetMediaUpload;

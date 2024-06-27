import { IReply, ITweet } from "@/types/tweet.interface";
import Image from "next/image";

const TweetMedia = ({ data }: { data: ITweet | IReply }) => {
  return (
    <>
      {data.images.length > 1 ? (
        <div className="grid  grid-cols-2 gap-1">
          {data.images &&
            data.images.map((image) => (
              <Image
                key={image}
                src={image}
                alt="User Image"
                width={400}
                height={400}
                className="object-cover   rounded-lg mt-1"
              />
            ))}
        </div>
      ) : (
        data.images.length > 0 && (
          <Image
            key={data.images[0]}
            src={data.images[0]}
            alt="User Image"
            width={700}
            height={700}
            className="object-cover h-[360px] w-full rounded-lg mt-1"
          />
        )
      )}
      {data.videos &&
        data.videos.map((video) => (
          <video
            key={video}
            className="rounded-lg h-[300px] max-w-[545px] mt-1"
            controls
            src={video}
          />
        ))}
    </>
  );
};

export default TweetMedia;

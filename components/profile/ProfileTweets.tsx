import { IUser } from "@/interfaces/user.interface";
import ClientOnly from "../loaders/ClientOnly";
import TweetCard from "../tweets/TweetCard";

export const ProfileTweets = ({
  combinedPosts,
  user,
}: {
  combinedPosts: any[];
  user: IUser;
}) => {
  return (
    <>
      <h4 className="mt-10 px-4">Tweets:</h4>
      <ClientOnly>
        {combinedPosts?.length > 0 ? (
          combinedPosts.map((post) => (
            <TweetCard
              type={post.type}
              key={post._doc_id}
              tweet={post._doc}
              owner={post._doc.user}
              retweetedUser={user}
            />
          ))
        ) : (
          <div className="text-center mt-16">
            <h2 className="text-3xl font-bold">{`@${user.username} hasn't posted.`}</h2>
            <p className="text-neutral-500 mt-2">
              When they do, their posts will show up here.
            </p>
          </div>
        )}
      </ClientOnly>
    </>
  );
};

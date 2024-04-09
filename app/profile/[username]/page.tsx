import TweetCard from "@/components/tweets/TweetCard";
import { fetchUser, fetchUserTweets } from "@/actions/user.actions";
import Image from "next/image";
import GoBackButton from "@/utils/GoBackButton";

const ProfilePage = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const username = params.username;
  const user = await fetchUser(undefined, username);
  const tweets = await fetchUserTweets(user.userId);

  if (!user)
    return (
      <h1 className="text-xl pt-3">
        User with this username {username} does not exist.{" "}
      </h1>
    );

  if (!tweets) {
    return (
      <h2 className="p-6 text-center text-xl">
        Something went wrong. Please reload page.
      </h2>
    );
  }
  return (
    <div>
      <div className=" mb-10 flex items-center">
        <GoBackButton />
        <div className="pl-6">
          <h3 className="font-semibold text-lg">{user.username}</h3>
          <h4 className="text-slate-500 text-sm">{tweets.length} Tweets</h4>
        </div>
      </div>
      <div>
        <Image
          className="rounded-full"
          src={user.avatar}
          alt={user.username}
          width={78}
          height={78}
        />
        <h2 className="font-semibold text-lg mt-1">{user.username}</h2>
      </div>

      {tweets?.length > 0 && (
        <>
          <h4 className="mt-10"> Tweets:</h4>

          {tweets.map((tweet) => (
            <TweetCard key={tweet._id} tweet={tweet} owner={user} />
          ))}
        </>
      )}

      {tweets.length === 0 && (
        <h2 className="mt-16 text-lg">User has not added any tweets yet.</h2>
      )}
    </div>
  );
};

export default ProfilePage;

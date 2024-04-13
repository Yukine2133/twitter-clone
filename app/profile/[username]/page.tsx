import TweetCard from "@/components/tweets/TweetCard";
import { fetchUser, fetchUserTweets } from "@/actions/user.actions";
import Image from "next/image";
import GoBackButton from "@/utils/GoBackButton";
import FollowButton from "@/components/buttons/FollowButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Follow from "@/components/follow/Follow";

const ProfilePage = async ({
  params,
}: {
  params: {
    username: string;
  };
}) => {
  const { getUser } = getKindeServerSession();
  const currentSessionUser = await getUser();
  const username = params.username;
  const user = await fetchUser(undefined, username);
  const currentUser = await fetchUser(currentSessionUser?.id);
  const tweets = await fetchUserTweets(user.userId);

  const followers = user.followers;
  const following = user.following;

  const followersOfTheUser = await Promise.all(
    followers.map(async (follower: any) => await fetchUser(follower))
  );

  const isFollowing = followers?.includes(currentSessionUser?.id as string);

  if (!user) {
    throw new Error("User doesn't exist.");
  }

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
        <div className="flex items-center my-2 gap-4 ">
          <h2 className="font-semibold text-lg">{user.username}</h2>
          <Follow
            followersOfTheUser={JSON.parse(JSON.stringify(followersOfTheUser))}
            followers={followers}
            following={following}
          />
        </div>
        <div className="mt-2">
          {currentSessionUser?.id === user.userId ? null : (
            <FollowButton
              username={username}
              isFollowing={isFollowing}
              userId={user.id}
              currentUserId={currentUser.id}
            />
          )}
        </div>
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

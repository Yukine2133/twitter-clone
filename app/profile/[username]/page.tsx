import TweetCard from "@/components/tweets/TweetCard";
import {
  fetchUser,
  fetchUserById,
  fetchUserTweets,
} from "@/actions/user.actions";
import Image from "next/image";
import GoBackButton from "@/utils/GoBackButton";
import FollowButton from "@/components/buttons/FollowButton";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Follow from "@/components/follow/Follow";
import UpdateProfileButton from "@/components/buttons/UpdateProfileButton";
import { IUser } from "@/types/user.interface";
import { ITweet } from "@/types/tweet.interface";

export const generateMetadata = async ({
  params,
}: {
  params: { username: string };
}) => {
  const user = await fetchUser(undefined, params.username);
  return {
    title: user.username,
  };
};

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

  if (!user) {
    throw new Error("User doesn't exist.");
  }
  const currentUser = await fetchUser(currentSessionUser?.id);
  const tweets = await fetchUserTweets(user.userId);

  const followers = user.followers;
  const following = user.following;

  const followersOfTheUser = await Promise.all(
    followers.map(async (follower: string) => await fetchUser(follower))
  );
  const followingsOfTheUser = await Promise.all(
    following.map(async (following: string) => await fetchUserById(following))
  );

  const isFollowing = followers?.includes(currentSessionUser?.id as string);

  if (!tweets) {
    return (
      <h2 className="p-6 text-center text-xl">
        Something went wrong. Please reload page.
      </h2>
    );
  }

  const isOwner = user.userId === currentUser.userId;

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
        <div className="flex justify-between items-center my-2 ">
          <div className="flex items-center gap-4">
            <h2 className="font-semibold text-lg">{user.username}</h2>
            <Follow
              followersOfTheUser={JSON.parse(
                JSON.stringify(followersOfTheUser)
              )}
              followingsOfTheUser={JSON.parse(
                JSON.stringify(followingsOfTheUser)
              )}
              followers={followers}
              following={following}
              username={user.username}
            />
          </div>
          {isOwner && <UpdateProfileButton user={user} />}
        </div>
        <div className="mt-2">
          {isOwner ? null : (
            <FollowButton
              username={username}
              isFollowing={isFollowing}
              userId={user._id.toString()}
              currentUserId={currentUser._id.toString()}
            />
          )}
        </div>
      </div>

      {tweets?.length > 0 && (
        <>
          <h4 className="mt-10"> Tweets:</h4>

          {tweets.map((tweet: ITweet) => (
            <TweetCard key={tweet._id} tweet={tweet} owner={user} />
          ))}
        </>
      )}

      {tweets.length === 0 && (
        <h2 className="mt-16 text-lg">
          {currentSessionUser?.id === user.userId
            ? `You have not added any tweets yet.`
            : `${user.username} has not added any tweets yet.`}
        </h2>
      )}
    </div>
  );
};

export default ProfilePage;

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
import EditProfileButton from "@/components/buttons/EditProfileButton";
import { ITweet } from "@/types/tweet.interface";
import {
  CalendarDaysIcon,
  MapIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

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

  const formatJoinedDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `Joined ${month} ${year}`;
  };

  const isOwner = user.userId === currentUser.userId;

  return (
    <div>
      <div className=" mb-10 flex items-center">
        <GoBackButton />
        <div className="pl-6">
          <h3 className="font-semibold text-lg mt-1">{user.displayName}</h3>
          <h4 className="text-slate-500 text-sm">{tweets.length} Tweets</h4>
        </div>
      </div>
      <div>
        <Image
          className="rounded-full"
          src={user.avatar}
          alt={user.username}
          width={100}
          height={100}
        />
        <div className="flex justify-between items-center my-2 ">
          <div className="mt-4 ">
            <h2 className="font-semibold text-lg mb-1">{user.displayName}</h2>
            <h2 className=" text-gray-500">@{user.username}</h2>
          </div>
          {isOwner && <EditProfileButton user={user} />}
        </div>
        <div className="space-y-2 ">
          <h3>{user.bio}</h3>

          <div className="flex items-center gap-4">
            {user.location && (
              <div className="flex items-center gap-1  text-gray-500">
                <MapPinIcon className="h-5 w-5" />
                <h3>{user.location}</h3>
              </div>
            )}
            <div className="text-gray-500 flex items-center gap-2">
              <CalendarDaysIcon className="h-5 w-5" />
              <h3>{formatJoinedDate(user.createdAt)}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4">
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
        <div className="text-center mt-16 ">
          <h2 className="text-3xl font-semibold ">{`@${user.username} hasn't tweeted.`}</h2>
          <p className="text-zinc-500 mt-2">
            When they do, their Tweets will show up here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

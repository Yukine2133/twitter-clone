import Image from "next/image";
import TweetCard from "@/components/tweets/TweetCard";

import GoBackButton from "@/components/buttons/GoBackButton";
import FollowButton from "@/components/buttons/FollowButton";
import Follow from "@/components/follow/Follow";
import EditProfileButton from "@/components/buttons/EditProfileButton";
import { ITweet } from "@/types/tweet.interface";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { formatJoinedDate } from "@/utils/formatTimestamp";
import { IUser } from "@/types/user.interface";
import { fetchUser } from "@/actions/user.actions";
import Link from "next/link";

interface ProfileDataProps {
  user: IUser;
  tweets: ITweet[];
  isOwner: boolean;
  followers: string[];
  following: string[];
  followersOfTheUser: IUser[];
  followingsOfTheUser: IUser[];
  username: string;
  isFollowing: boolean;
  currentUser: IUser;
  retweets: string[];
}

const ProfileData = ({
  user,
  tweets,
  isOwner,
  followers,
  following,
  followersOfTheUser,
  followingsOfTheUser,
  username,
  isFollowing,
  currentUser,
  retweets,
}: ProfileDataProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center">
        <GoBackButton />
        <div className="pl-6">
          <h3 className="font-semibold text-lg mt-1">{user.displayName}</h3>
          <h4 className="text-slate-500 text-sm">{tweets.length} Tweets</h4>
        </div>
      </div>
      <div className=" relative ">
        {user.backgroundImage ? (
          <Image
            src={user.backgroundImage}
            alt="Background image"
            width={300}
            height={20}
            className="w-full h-48 md:h-56  object-cover"
          />
        ) : (
          <div className="w-full h-48 md:h-56  bg-[#333639] object-cover" />
        )}
        <Image
          className="rounded-full absolute top-[65%] md:top-[75%] "
          src={user.avatar}
          alt={user.username}
          width={125}
          height={125}
        />
      </div>
      <div className="mt-4 gap-4 flex items-center justify-end ">
        {!isOwner && (
          <Link
            className="p-2 border border-[#38444d] rounded-full bg-"
            href={`/messages/${username}`}
          >
            <EnvelopeIcon className="h-6 w-6" />
          </Link>
        )}
        <FollowButton
          username={username}
          isFollowing={isFollowing}
          userId={user._id.toString()}
          currentUserId={currentUser._id.toString()}
        />
        {isOwner && <EditProfileButton user={user} />}
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center my-2 ">
          <div className="mt-4 ">
            <h2 className="font-semibold text-lg mb-1">{user.displayName}</h2>
            <h2 className=" text-gray-500">@{user.username}</h2>
          </div>
        </div>
        <div className="space-y-2 ">
          <h3 style={{ overflowWrap: "anywhere" }}>{user.bio}</h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
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
      </div>

      {tweets?.length > 0 && (
        <>
          <h4 className="mt-10"> Tweets:</h4>

          {tweets.map((tweet: ITweet) => (
            <TweetCard key={tweet._id} tweet={tweet} owner={user} />
          ))}
        </>
      )}

      {retweets?.length > 0 && (
        <>
          <h4 className="mt-10">Retweeted:</h4>
          {retweets &&
            retweets.map(async (retweet: any) => {
              const owner = await fetchUser(retweet.userId);
              return (
                <TweetCard key={retweet._id} tweet={retweet} owner={owner} />
              );
            })}
        </>
      )}

      {tweets.length === 0 && retweets.length === 0 && (
        <div className="text-center mt-16">
          <h2 className="text-3xl font-semibold">{`@${user.username} hasn't tweeted.`}</h2>
          <p className="text-zinc-500 mt-2">
            When they do, their Tweets will show up here.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileData;

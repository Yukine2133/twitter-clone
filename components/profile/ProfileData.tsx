import Image from "next/image";
import TweetCard from "@/components/tweets/TweetCard";
import GoBackButton from "@/components/buttons/GoBackButton";
import FollowButton from "@/components/buttons/FollowButton";
import Follow from "@/components/follow/Follow";
import EditProfileButton from "@/components/buttons/EditProfileButton";
import { ITweet } from "@/interfaces/tweet.interface";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { formatJoinedDate } from "@/utils/formatTimestamp";
import { ProfileDataProps } from "@/interfaces/user.interface";
import Link from "next/link";
import ClientOnly from "../ClientOnly";

const ProfileData = ({
  user,
  combinedPosts,
  isOwner,
  followers,
  following,
  followersOfTheUser,
  followingsOfTheUser,
  username,
  isFollowing,
  currentUser,
  privateProfile,
}: ProfileDataProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center px-2 md:px-4 mt-2">
        <GoBackButton />
        <div className="pl-6">
          <h3 className="font-semibold text-lg ">{user.displayName}</h3>
        </div>
      </div>
      <div className="relative ">
        {user.backgroundImage ? (
          <Image
            src={user.backgroundImage}
            alt="Background image"
            width={1200}
            height={20}
            className="w-full h-48 md:h-56  object-cover"
          />
        ) : (
          <div className="w-full h-48 md:h-56  bg-[#333639] object-cover" />
        )}
        <Image
          className="rounded-full max-h-28 object-cover left-4 absolute top-[65%] md:top-[75%] "
          src={user.avatar}
          alt={user.username}
          width={120}
          height={124}
        />
      </div>
      <div className="mt-4 px-2 md:px-4  gap-4 flex items-center justify-end ">
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
      <div className="mt-5 px-2 md:px-4">
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
              followersOfTheUser={followersOfTheUser}
              followingsOfTheUser={followingsOfTheUser}
              followers={followers}
              following={following}
              username={user.username}
              userPrivate={privateProfile}
            />
          </div>
        </div>
      </div>
      {privateProfile === true ? (
        <h4 className="mt-10  text-xl px-2 md:px-4">
          This profile is private. You can follow them to see their tweets.
        </h4>
      ) : (
        <>
          <h4 className="mt-10 px-2 md:px-4">Tweets:</h4>
          <ClientOnly>
            {combinedPosts?.length > 0 &&
              combinedPosts.map((post: ITweet | any) => {
                return (
                  <TweetCard
                    type={post.type}
                    key={post._doc_id}
                    tweet={post._doc}
                    owner={post._doc.user}
                    retweetedUser={user}
                  />
                );
              })}
          </ClientOnly>
          {combinedPosts.length === 0 && (
            <div className="text-center mt-16">
              <h2 className="text-3xl font-semibold">{`@${user.username} hasn't posted.`}</h2>
              <p className="text-zinc-500 mt-2">
                When they do, their posts will show up here.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfileData;

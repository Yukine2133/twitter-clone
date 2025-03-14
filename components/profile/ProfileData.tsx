import Image from "next/image";
import TweetCard from "@/components/tweets/TweetCard";
import FollowButton from "@/components/buttons/FollowButton";
import Follow from "@/components/follow/Follow";
import EditProfileButton from "@/components/buttons/EditProfileButton";
import type { ITweet } from "@/interfaces/tweet.interface";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { formatJoinedDate } from "@/utils/formatTimestamp";
import type { ProfileDataProps } from "@/interfaces/user.interface";
import Link from "next/link";
import { ProfileHeader } from "./ProfileHeader";
import { VerifiedBadge } from "../premium/VerifiedBadge";
import ClientOnly from "../loaders/ClientOnly";

const ProfileData = ({
  user,
  combinedPosts,
  isOwner,
  followers,
  following,
  followersOfTheUser,
  followingsOfTheUser,
  isFollowing,
  currentUser,
  privateProfile,
}: ProfileDataProps) => {
  return (
    <div>
      <ProfileHeader
        user={user}
        isOwner={isOwner}
        isFollowing={isFollowing}
        currentUser={currentUser}
        combinedPostsLength={combinedPosts.length}
      />

      <div className="relative">
        {user.backgroundImage ? (
          <Image
            src={user.backgroundImage || "/placeholder.svg"}
            alt="Background image"
            width={1200}
            height={20}
            className="w-full h-48 md:h-56 object-cover"
          />
        ) : (
          <div className="w-full h-48 md:h-56 bg-[#333639]" />
        )}
        <Image
          className="rounded-full absolute left-4 border-4 border-black object-cover"
          style={{
            width: "120px",
            height: "120px",
            bottom: "-60px",
          }}
          src={user.avatar || "/placeholder.svg"}
          alt={user.username}
          width={120}
          height={120}
        />
      </div>

      <div className="mt-4 px-4 flex items-center justify-end gap-4">
        {!isOwner && (
          <>
            <Link
              className="p-2 border border-neutral-700 rounded-full hover:bg-neutral-900 transition-colors"
              href={`/messages/${user.username}?userId=${user.userId}`}
            >
              <EnvelopeIcon className="h-5 w-5" />
            </Link>
            <FollowButton
              username={user.username}
              isFollowing={isFollowing}
              userId={user._id.toString()}
              currentUserId={currentUser._id.toString()}
            />
          </>
        )}
        {isOwner && <EditProfileButton user={user} />}
      </div>

      <div className="mt-3 px-4">
        <div className="flex justify-between items-center my-2">
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-xl mb-1">{user.displayName}</h2>
              <VerifiedBadge
                isOwner={isOwner}
                isSubscribed={user.isSubscribed}
                profileLink
              />
            </div>
            <h2 className="text-neutral-500">@{user.username}</h2>
          </div>
        </div>
        <div className="space-y-2">
          <h3 style={{ overflowWrap: "anywhere" }}>{user.bio}</h3>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {user.location && (
              <div className="flex items-center gap-1 text-neutral-500">
                <MapPinIcon className="h-5 w-5" />
                <h3>{user.location}</h3>
              </div>
            )}
            <div className="text-neutral-500 flex items-center gap-2">
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

      {privateProfile ? (
        <h4 className="mt-10 text-xl px-4">This profile is private.</h4>
      ) : (
        <>
          <h4 className="mt-10 px-4">Tweets:</h4>
          <ClientOnly>
            {combinedPosts?.length > 0 &&
              combinedPosts.map((post: ITweet | any) => (
                <TweetCard
                  type={post.type}
                  key={post._doc_id}
                  tweet={post._doc}
                  owner={post._doc.user}
                  retweetedUser={user}
                />
              ))}
          </ClientOnly>
          {combinedPosts.length === 0 && (
            <div className="text-center mt-16">
              <h2 className="text-3xl font-bold">{`@${user.username} hasn't posted.`}</h2>
              <p className="text-neutral-500 mt-2">
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

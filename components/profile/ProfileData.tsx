import Image from "next/image";
import TweetCard from "@/components/tweets/TweetCard";
import FollowButton from "@/components/buttons/FollowButton";
import Follow from "@/components/follow/Follow";
import type { ITweet } from "@/interfaces/tweet.interface";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  LockClosedIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { formatJoinedDate } from "@/utils/formatTimestamp";
import type { ProfileDataProps } from "@/interfaces/user.interface";
import Link from "next/link";
import { ProfileHeader } from "./ProfileHeader";
import { VerifiedBadge } from "../badges/VerifiedBadge";
import ClientOnly from "../loaders/ClientOnly";
import AdminBadge from "../badges/AdminBadge";
import BannedUserMessage from "./BannedUserMessage";
import { MoreButtonProfile } from "./moreButton/MoreButtonProfile";
import { ProfileBackground } from "./ProfileBackground";
import { ProfileActions } from "./ProfileActions";
import { ProfileInfo } from "./ProfileInfo";
import { PrivateProfileMessage } from "./PrivateProfileMessage";
import { ProfileTweets } from "./ProfileTweets";

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

      <ProfileBackground user={user} />

      <ProfileActions
        user={user}
        isOwner={isOwner}
        isFollowing={isFollowing}
        currentUser={currentUser}
      />

      <ProfileInfo user={user} isOwner={isOwner} />

      <Follow
        followersOfTheUser={followersOfTheUser}
        followingsOfTheUser={followingsOfTheUser}
        followers={followers}
        following={following}
        username={user.username}
        userPrivate={privateProfile}
      />

      {privateProfile && !currentUser.isAdmin && (
        <PrivateProfileMessage username={user.username} />
      )}
      {!user.isBanned && (isOwner || currentUser.isAdmin) && (
        <ProfileTweets combinedPosts={combinedPosts} user={user} />
      )}
      {user.isBanned && (
        <BannedUserMessage
          username={user.username}
          banReason={user.banReason}
        />
      )}
    </div>
  );
};

export default ProfileData;

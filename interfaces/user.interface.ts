import { ITweet } from "./tweet.interface";

export interface IUser {
  username: string;
  avatar: string;
  userId: string;
  _id: string;
  location: string;
  displayName: string;
  bio: string;
  followers: string[];
  following: string[];
  createdAt: string;
  backgroundImage: string;
  private: boolean;
  onboarded: boolean;
  isSubscribed: boolean;
}

export interface ProfileDataProps {
  user: IUser;
  isOwner: boolean;
  followers: string[];
  following: string[];
  followersOfTheUser: IUser[];
  followingsOfTheUser: IUser[];
  // username: string;
  isFollowing: boolean;
  currentUser: IUser;
  combinedPosts: ITweet[] | [];
  privateProfile: boolean;
}

export interface IProfileHeaderProps {
  user: IUser;
  isOwner: boolean;
  currentUser: IUser;
  combinedPostsLength: number;
  isFollowing: boolean;
}

export interface IUsersData {
  parsedJSONRandomUsersData: IUser[];
  parsedJSONCurrentUserData: IUser;
}

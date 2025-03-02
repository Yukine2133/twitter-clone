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

export interface IUsersData {
  randomUsersData: IUser[];
  currentUserData: IUser;
}

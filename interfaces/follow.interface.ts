import { IUser } from "./user.interface";

export interface IFollow {
  following: {
    length: number;
  };
  followers: {
    length: number;
  };
  followersOfTheUser: IUser[];
  followingsOfTheUser: IUser[];
  username: string;
  userPrivate: boolean;
}

export interface IFollowModal {
  setIsOpenFollowers: (arg0: boolean) => void;
  setIsOpenFollowing: (arg0: boolean) => void;
  isOpenFollowers: boolean;
  isOpenFollowing: boolean;
  follow: IUser[];
  isFollowers: boolean;
  username: string;
}

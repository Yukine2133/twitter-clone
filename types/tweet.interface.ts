import { IUser } from "./user.interface";

export interface ITweetProps {
  tweet: ITweet;
  owner: IUser;
}

export interface ITweet {
  _id: string;
  text: string;
  userId: string;
  bookmarks: string[];
  likes: string[];
  replies: string[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface ISingleTweetProps {
  _id: string;
  text: string;
  userId: string;
  image: string;
  replies: IReply[];
}

export interface IReply {
  user: string;
  text: string;
  _id: string;
  image: string;
}

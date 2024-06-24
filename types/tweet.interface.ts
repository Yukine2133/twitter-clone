import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface ITweetProps {
  tweet: ITweet;
  owner: IUser;
  type?: string;
}

export interface ITweet {
  _id: string;
  text: string;
  userId: string;
  user: IUser;
  bookmarks: string[];
  likes: string[];
  replies: string[];
  retweets: string[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
  video: string;
}

export interface ISingleTweetProps {
  _id: string;
  text: string;
  userId: string;
  image: string;
  replies: IReply[];
}

export interface IReply {
  userId: string;
  text: string;
  _id: string;
  image: string;
  video: string;
  tweetId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMoreButtonProps {
  id?: string;
  tweet?: ITweet;
  reply?: IReply;
  replyId?: string;
  replyTweet?: string;
  messageId?: string;
  message?: IMessage;
}

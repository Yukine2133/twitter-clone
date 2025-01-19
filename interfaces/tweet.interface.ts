import { IMessage } from "./message.interface";
import { IUser } from "./user.interface";

export interface ITweetProps {
  tweet: ITweet;
  owner: IUser;
  type?: string;
  retweetedUser?: IUser;
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
  images: string[];
  videos: string[];
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
  images: string[];
  videos: string[];
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

export interface IMediaUploadDropZone {
  endpoint?: "video" | "media";
  setStateFunction: React.Dispatch<React.SetStateAction<string[]>>;
  toastMsgTypeMedia: "Videos" | "Images";
  onClose?: (arg0: boolean) => void | undefined;
}

import { MutableRefObject } from "react";
import { IBookmarkFolder } from "./bookmark.interface";
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

export interface SingleTweetProps {
  owner: IUser;
  currentUser: IUser;
  singleTweet: ITweet;
  isBookmarked: boolean;
  isLiked: boolean;
  isRetweeted: boolean;
  userBookmarkFolders: IBookmarkFolder[];
}

export interface TweetActionsProps extends ITweetProps {
  isBookmarked: boolean;
  isLiked: boolean;
  id: string;
  user: any;
  isRetweeted: boolean;
  userBookmarkFolders: any;
}

export interface TweetMediaModalProps {
  srcImage?: string;
  srcVideo?: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  totalImages?: number;
  totalVideos?: number;
}

export interface ITweetFormUIProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  videoUrls: string[];
  setVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
  loading: boolean;
  user: IUser;
  id: string | undefined;
  text: string | null;
  setText: (arg0: string | null) => void;
  uploadVideoButtonRef: MutableRefObject<HTMLDivElement | null>;
  uploadImageButtonRef: MutableRefObject<HTMLDivElement | null>;
  imageProgress: number;
  setImageProgress: React.Dispatch<React.SetStateAction<number>>;
  videoProgress: number;
  setVideoProgress: React.Dispatch<React.SetStateAction<number>>;
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
  isAdmin: boolean;
}

export interface IMoreButtonUIProps {
  isOwner: true | string | undefined;
  buttonRef: MutableRefObject<HTMLButtonElement | null>;
  setIsOpen: (arg0: boolean) => void;
  isOpen: boolean;
  setEdit: (arg0: boolean) => void;
  edit: boolean;
  handleDelete: () => void;
  text: string | null;
  setText: (arg0: string) => void;
  handleSubmit: () => void;
  tweetImageUrls: string[];
  setTweetImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  tweetVideoUrls: string[];
  setTweetVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
  isAdmin: boolean;
}

export interface IMediaUploadDropZone {
  endpoint?: "video" | "media";
  setStateFunction: React.Dispatch<React.SetStateAction<string[]>>;
  toastMsgTypeMedia: "Videos" | "Images";
}

export interface ITweetFormMediaUploadProps {
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setVideoUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setImageProgress: React.Dispatch<React.SetStateAction<number>>;
  setVideoProgress: React.Dispatch<React.SetStateAction<number>>;
  uploadImageButtonRef: MutableRefObject<HTMLDivElement | null>;
  uploadVideoButtonRef: MutableRefObject<HTMLDivElement | null>;
}

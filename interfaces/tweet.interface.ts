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
  setIsOpen: (arg0: boolean) => void;
  isOpen: boolean;
  setIsOpenVideo: (arg0: boolean) => void;
  isOpenVideo: boolean;
  loading: boolean;
  user: IUser;
  id: string | undefined;
  text: string | null;
  setText: (arg0: string | null) => void;
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

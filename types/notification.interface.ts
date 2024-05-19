import { ITweet } from "./tweet.interface";

type NotificationType = "like" | "reply" | "retweet" | "follow";

export interface INotification {
  _id: string;
  type: NotificationType;
  userId: string;
  affectedUserId: string;
  tweetId?: ITweet;
  read: boolean;
  createdAt: Date;
}

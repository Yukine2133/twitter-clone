export interface TweetProps {
  tweet: {
    text: string;
    _id: string;
    likes: string[];
    replies: string[];
  };
  owner: {
    avatar: string;
    username: string;
  };
}

export interface SingleTweetProps {
  _id: string;
  text: string;
  userId: string;
  replies: Reply[];
}

export interface Reply {
  user: string;
  text: string;
  _id: string;
}

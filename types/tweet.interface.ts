export interface ITweetProps {
  tweet: {
    text: string;
    _id: string;
    likes: string[];
    replies: string[];
    image: string;
  };
  owner: {
    avatar: string;
    username: string;
  };
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

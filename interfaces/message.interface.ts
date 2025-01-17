import { IUser } from "./user.interface";

export interface IMessage {
  _id: string;
  sender: IUser;
  recipient: IUser;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
}

export interface IUserConversations {
  user: IUser;
  lastMessage: string;
  lastMessageCreatedAt: Date;
}

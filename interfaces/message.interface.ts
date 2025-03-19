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
  read: boolean;
}

export interface IUserConversations {
  user: IUser;
  lastMessage: string;
  lastMessageCreatedAt: Date;
}

export interface IMoreButtonMessageProps {
  messageId: string;
  message: IMessage;
  recipientId: string;
  currentUserId: string;
}

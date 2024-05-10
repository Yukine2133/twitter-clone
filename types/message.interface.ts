import { IUser } from "./user.interface";

export interface IMessage {
  _id: string;
  sender: IUser;
  recipient: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

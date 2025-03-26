import { IUser } from "./user.interface";

export interface IAppeal {
  user: string | IUser;
  banReason: string;
  text: string;
  status: "Pending" | "Approved" | "Rejected";
}

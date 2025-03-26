import mongoose from "mongoose";
import { IUser } from "./user.interface";

export type AppealStatus = "Pending" | "Approved" | "Rejected";
export type AppealFilter = "All" | AppealStatus;

export interface IAppeal {
  user: string | IUser;
  banReason: string;
  text: string;
  status: AppealStatus;
  createdAt: string;
}

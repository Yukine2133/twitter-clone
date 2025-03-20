import { z } from "zod";

export const tweetTextSchema = z
  .string()
  .min(2, "Tweet must be at least 2 characters long")
  .max(280, "Tweet must not exceed the 280 characters limit");

export const nameSchema = z
  .string()
  .max(50, "Name must be at most 50 characters long.");
export const bioSchema = z
  .string()
  .max(160, "Bio must be at most 160 characters long.");
export const locationSchema = z
  .string()
  .max(30, "Location must be at most 30 characters long.");
export const usernameSchema = z
  .string()
  .max(20, "Username must be at most 20 characters long.");
export const banReasonSchema = z
  .string()
  .min(3, "Ban reason must be at least 3 characters long")
  .max(160, "Ban reason must not exceed 160 characters limit.");

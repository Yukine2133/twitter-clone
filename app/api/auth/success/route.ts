export const dynamic = "force-dynamic";

import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/user.model";

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

const isDevelopment = process.env.NODE_ENV === "development";
const PRODUCTION_URL = "https://twitter-clone-213.vercel.app";
const BASE_URL = isDevelopment ? "http://localhost:3000" : PRODUCTION_URL;

export async function GET() {
  try {
    await connectDb();
    const user = await currentUser();

    const username = user?.firstName;

    let dbUser = await User.findOne({ userId: user?.id });

    if (!dbUser) {
      dbUser = await User.create({
        username,
        displayName: `${user?.firstName ?? ""} ${user?.lastName ?? ""}`,
        avatar: user?.imageUrl,
        userId: user?.id,
      });
    }

    return NextResponse.redirect(`${BASE_URL}`);
  } catch (error) {
    console.error(error);
    return new Response(String(error));
  }
}

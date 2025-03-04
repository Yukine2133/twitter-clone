import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { combineUsername } from "@/utils/combineUsername";
import { NextResponse } from "next/server";

function isValidUsername(username: string): boolean {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(username);
}

function getUsernameFromEmail(email: string | any): string {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.substring(0, atIndex);
  }
  return email;
}

const isDevelopment = process.env.NODE_ENV === "development";

export async function GET(req: Request, res: Response) {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    let username = combineUsername(user?.given_name!, user?.family_name!);

    if (!isValidUsername(username)) {
      username = getUsernameFromEmail(user?.email);
    }

    let dbUser = await User.findOne({ userId: user?.id });

    if (!dbUser) {
      dbUser = await User.create({
        displayName: `${user?.given_name ?? ""} ${user?.family_name ?? ""}`,
        username,
        avatar: user?.picture,
        userId: user?.id,
      });
    }

    if (isDevelopment) return NextResponse.redirect("http://localhost:3000");

    return NextResponse.redirect("https://twitter-clone-213.vercel.app");
  } catch (error) {
    console.error(error);
    return new Response(String(error));
  }
}

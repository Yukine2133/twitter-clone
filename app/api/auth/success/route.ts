import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { NextResponse } from "next/server";

const isDevelopment = process.env.NODE_ENV === "development";
const PRODUCTION_URL = "https://twitter-clone-213.vercel.app";
const BASE_URL = isDevelopment ? "http://localhost:3000" : PRODUCTION_URL;

// function generateUsername(user: any): string {
//   if (user?.given_name && user?.family_name) {
//     return `${user.given_name}${user.family_name}`.toLowerCase();
//   }
//   if (user?.email) {
//     const emailUsername = user.email.split("@")[0];
//     return emailUsername.toLowerCase();
//   }
//   return `user_${Math.floor(Math.random() * 10000)}`; // Last fallback
// }

// export async function GET(req: Request, res: Response) {
//   try {
//     await connectDb();
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();

//     const username = generateUsername(user);

//     let dbUser;
//     if (user) {
//       dbUser = await User.findOne({ userId: user.id });
//     }

//     if (!dbUser) {
//       dbUser = await User.create({
//         displayName: `${user?.given_name ?? ""} ${user?.family_name ?? ""}`,
//         username,
//         avatar: user?.picture,
//         userId: user?.id,
//       });
//     }

//     if (isDevelopment) return NextResponse.redirect("http://localhost:3000");

//     return NextResponse.redirect("https://twitter-clone-213.vercel.app");
//   } catch (error) {
//     console.error(error);
//     return new Response(String(error));
//   }
// }

export async function GET() {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const username = user?.given_name;

    let dbUser = await User.findOne({ userId: user?.id });

    if (!dbUser) {
      dbUser = await User.create({
        username,
        displayName: `${user?.given_name ?? ""} ${user?.family_name ?? ""}`,
        avatar: user?.picture,
        userId: user?.id,
      });
    }
    switch (true) {
      case dbUser.onboarding === true:
        return NextResponse.redirect(`${BASE_URL}/onboarding`);

      default:
        return NextResponse.redirect(`${BASE_URL}`);
    }
  } catch (error) {
    console.error(error);
    return new Response(String(error));
  }
}

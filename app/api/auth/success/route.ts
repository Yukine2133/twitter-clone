import { connectDb } from "@/utils/connectDb";
import { User } from "@/models/user.model";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { combineUsername } from "@/utils/combineUsername";

function isValidUsername(username: string): boolean {
  // Regular expression to match only alphanumeric characters
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

export async function GET() {
  try {
    await connectDb();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    let username = combineUsername(user?.given_name!, user?.family_name!);

    // Check if the username consists of English letters and numbers
    if (!isValidUsername(username)) {
      // If not, use the username from the email address
      username = getUsernameFromEmail(user?.email);
    }

    let dbUser = await User.findOne({ userId: user?.id });

    if (!dbUser) {
      dbUser = await User.create({
        username,
        avatar: user?.picture,
        userId: user?.id,
      });
    }

    return redirect("https://twitter-clone-213.vercel.app");
  } catch (error) {
    console.error(error);
    // return new Response("Internal Server Error", { status: 500 });
  }
}
